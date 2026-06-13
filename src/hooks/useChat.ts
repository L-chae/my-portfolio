import { create } from "zustand";
import type { SuggestedAction } from "@/lib/evidenceImages";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  evidenceImageIds?: string[];
  suggestedActions?: SuggestedAction[];
  suggestedActionsDescription?: string;
  suggestedActionsTitle?: string;
}

interface ChatStore {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isTyping: boolean;
  isStreaming: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  messages: Message[];
  currentTopicHint: string | null;
  handleSend: (content: string) => Promise<void>;
  resetChat: () => void;
}

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function parseEvidenceImageIds(headerValue: string | null) {
  if (!headerValue) return undefined;

  const ids = headerValue
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return ids.length > 0 ? ids : undefined;
}

function isSuggestedAction(value: unknown): value is SuggestedAction {
  if (typeof value !== "object" || value === null) return false;

  const action = value as Partial<SuggestedAction>;
  return (
    typeof action.id === "string" &&
    typeof action.label === "string" &&
    typeof action.prompt === "string"
  );
}

function parseSuggestedActions(headerValue: string | null) {
  if (!headerValue) return undefined;

  try {
    const parsed = JSON.parse(decodeURIComponent(headerValue));
    if (!Array.isArray(parsed)) return undefined;

    const actions = parsed.filter(isSuggestedAction);
    return actions.length > 0 ? actions : undefined;
  } catch {
    return undefined;
  }
}

function parseHeaderText(headerValue: string | null) {
  if (!headerValue) return undefined;

  try {
    return decodeURIComponent(headerValue);
  } catch {
    return undefined;
  }
}

function normalizeIntentText(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function isExplicitEvidenceReplayRequest(value: string) {
  const text = normalizeIntentText(value);

  return [
    "다시보여줘",
    "또보여줘",
    "다시캡처",
    "캡처다시",
    "캡처보여줘",
    "캡쳐보여줘",
    "이미지보여줘",
    "스크린샷보여줘",
  ].some((term) => text.includes(term));
}

function getDisplayedEvidenceImageIds(messages: readonly Message[]) {
  return new Set(
    messages
      .filter((message) => message.role === "assistant")
      .flatMap((message) => message.evidenceImageIds ?? []),
  );
}

function removeDisplayedEvidenceImageIds(
  ids: string[] | undefined,
  displayedIds: ReadonlySet<string>,
) {
  if (!ids) return undefined;

  const filteredIds = ids.filter((id) => !displayedIds.has(id));
  return filteredIds.length > 0 ? filteredIds : undefined;
}

export function getNextEvidenceImageIdsForMessage(params: {
  evidenceImageIds: string[] | undefined;
  messages: readonly Message[];
  userContent: string;
}) {
  if (isExplicitEvidenceReplayRequest(params.userContent)) {
    return params.evidenceImageIds;
  }

  return removeDisplayedEvidenceImageIds(
    params.evidenceImageIds,
    getDisplayedEvidenceImageIds(params.messages),
  );
}

const INITIAL_MESSAGE: Message = {
  id: createId(),
  role: "assistant",
  content: "안녕하세요. 기능 구현을 넘어 예외 상황을 통제하는 프론트엔드 개발자 이채은의 AI입니다. 무엇이든 물어보세요!",
};

export const useChat = create<ChatStore>((set, get) => ({
  isExpanded: false,
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  isTyping: false,
  isStreaming: false,
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
  messages: [INITIAL_MESSAGE],
  currentTopicHint: null,

  resetChat: () =>
    set({
      messages: [{ ...INITIAL_MESSAGE, id: createId() }],
      currentTopicHint: null,
    }),

  handleSend: async (content) => {
    const { currentTopicHint, isTyping, isStreaming } = get();
    const trimmedContent = content.trim();
    if (!trimmedContent || isTyping || isStreaming) return;

    set((state) => ({
      messages: [...state.messages, { id: createId(), role: "user", content: trimmedContent }],
      inputValue: "",
      isTyping: true,
    }));

    const assistantId = createId();

    try {
      const currentMessages = get().messages.slice(-5).map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentTopicHint,
          messages: currentMessages,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error("No response body");

      const nextTopicHint = res.headers.get("X-Current-Topic-Hint");
      if (nextTopicHint) set({ currentTopicHint: nextTopicHint });
      const evidenceImageIds = parseEvidenceImageIds(
        res.headers.get("X-Evidence-Image-Ids"),
      );
      const suggestedActions = parseSuggestedActions(
        res.headers.get("X-Suggested-Actions"),
      );
      const suggestedActionsTitle = parseHeaderText(
        res.headers.get("X-Suggested-Actions-Title"),
      );
      const suggestedActionsDescription = parseHeaderText(
        res.headers.get("X-Suggested-Actions-Description"),
      );
      const nextEvidenceImageIds = getNextEvidenceImageIdsForMessage({
        evidenceImageIds,
        messages: get().messages,
        userContent: trimmedContent,
      });

      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: assistantId,
            role: "assistant",
            content: "",
            evidenceImageIds: nextEvidenceImageIds,
            suggestedActions,
            suggestedActionsDescription,
            suggestedActionsTitle,
          },
        ],
        isTyping: false,
        isStreaming: true,
      }));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let rafId: number | null = null;

      const flushBuffer = () => {
        if (!buffer) return;

        const text = buffer;
        buffer = "";
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === assistantId ? { ...msg, content: msg.content + text } : msg
          ),
        }));
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          rafId = null;
          flushBuffer();
        });
      }

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      flushBuffer();

      set({ isStreaming: false });
    } catch (error) {
      console.error("Chat error:", error);
      set((state) => ({
        messages: state.messages
          .filter((msg) => msg.id !== assistantId)
          .concat({
            id: createId(),
            role: "assistant",
            content: "응답 생성 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
          }),
        isTyping: false,
        isStreaming: false,
      }));
    }
  },
}));
