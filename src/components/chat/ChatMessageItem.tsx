/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import { User } from "lucide-react";
import {
  getEvidenceImageGroupByIds,
  getEvidenceImagesByIds,
} from "@/lib/evidenceImages";
import type { SuggestedAction } from "@/lib/evidenceImages";

import ChatAiLogo from "./ChatAiLogo";
import {
  markdownComponents,
  markdownRemarkPlugins,
} from "./MessageMarkdown";
import StreamingAssistantContent from "./StreamingAssistantContent";

type MessageRole = "user" | "bot" | "assistant";

interface Message {
  id: string | number;
  role: MessageRole;
  content: string;
  evidenceImageIds?: string[];
  suggestedActions?: SuggestedAction[];
  suggestedActionsDescription?: string;
  suggestedActionsTitle?: string;
}

interface ChatMessageItemProps {
  message: Message;
  onSuggestedActionSelect?: (prompt: string) => void;
  showAssistantAvatar?: boolean;
  isStreamingMessage?: boolean;
}

function StreamingStatus({ label }: { label: string }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
      <div className="flex items-center gap-1" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-faint motion-reduce:animate-none"
            style={{ animationDelay: `${index * 160}ms` }}
          />
        ))}
      </div>
      <span>{label}</span>
    </div>
  );
}

function EvidenceImageCards({ ids }: { ids?: readonly string[] }) {
  const images = getEvidenceImagesByIds(ids);
  const group = getEvidenceImageGroupByIds(ids);

  if (images.length === 0) return null;

  return (
    <div className="mt-4">
      {group ? (
        <div className="mb-3 rounded-xl border border-line bg-surface-soft px-3.5 py-3">
          <p className="mb-1 text-[12px] font-semibold text-navy">
            {group.title}
          </p>
          <p className="text-[12px] leading-relaxed text-ink-muted">
            {group.description}
          </p>
        </div>
      ) : null}
      <div className="grid gap-3">
        {images.map((image) => (
          <figure
            key={image.id}
            className="overflow-hidden rounded-xl border border-line bg-surface-soft"
          >
            <img
              src={image.src}
              alt={image.alt}
              title={image.title}
              loading="lazy"
              className="block h-auto max-w-full border-b border-line/70 bg-white"
            />
            <figcaption className="px-3.5 py-2.5 text-[12px] leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">{image.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function SuggestedActionButtons({
  actions,
  description,
  onSelect,
  title,
}: {
  actions?: readonly SuggestedAction[];
  description?: string;
  onSelect?: (prompt: string) => void;
  title?: string;
}) {
  if (!actions || actions.length === 0 || !onSelect) return null;

  return (
    <div className="mt-4 rounded-xl border border-line bg-surface-soft px-3.5 py-3">
      {title ? (
        <p className="mb-1 text-[12px] font-semibold text-navy">{title}</p>
      ) : null}
      {description ? (
        <p className="mb-2.5 text-[12px] leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelect(action.prompt)}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-ink-muted transition-colors hover:border-accent hover:bg-accent-pale hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatMessageItem({
  message,
  onSuggestedActionSelect,
  showAssistantAvatar = true,
  isStreamingMessage = false,
}: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const shouldRenderAssistantAvatar = !isUser && showAssistantAvatar;

  return (
    <div
      className={`flex w-full gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {isUser ? (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-soft">
          <User size={13} className="text-white" strokeWidth={2.5} />
        </div>
      ) : shouldRenderAssistantAvatar ? (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-soft bg-brand-pale shadow-sm">
          <ChatAiLogo decorative size={16} className="h-4 w-4 text-brand" />
        </div>
      ) : (
        <div aria-hidden="true" className="mt-0.5 h-7 w-7 shrink-0" />
      )}

      <div
        className={`relative max-w-[88%] ${
          isUser
            ? "rounded-2xl rounded-tr-sm bg-navy-soft px-4 py-3 text-[14px] leading-relaxed text-white shadow-sm"
            : "rounded-2xl rounded-tl-sm border border-line bg-surface px-5 py-4 text-ink shadow-sm"
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <div className="min-w-0 break-words">
            <StreamingAssistantContent
              content={message.content}
              isStreaming={isStreamingMessage}
              components={markdownComponents}
              remarkPlugins={markdownRemarkPlugins}
            />
            {!isStreamingMessage ? (
              <>
                <SuggestedActionButtons
                  actions={message.suggestedActions}
                  description={message.suggestedActionsDescription}
                  onSelect={onSuggestedActionSelect}
                  title={message.suggestedActionsTitle}
                />
                <EvidenceImageCards ids={message.evidenceImageIds} />
              </>
            ) : null}
            {isStreamingMessage ? (
              <StreamingStatus label="답변 생성 중" />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ChatMessageItem, (prev, next) => {
  if (
    prev.message.id !== next.message.id ||
    prev.message.content !== next.message.content
  ) {
    return false;
  }

  const prevEvidIds = prev.message.evidenceImageIds ?? [];
  const nextEvidIds = next.message.evidenceImageIds ?? [];
  if (
    prevEvidIds.length !== nextEvidIds.length ||
    prevEvidIds.join(",") !== nextEvidIds.join(",")
  ) {
    return false;
  }

  const prevActions = prev.message.suggestedActions ?? [];
  const nextActions = next.message.suggestedActions ?? [];
  if (
    prevActions.length !== nextActions.length ||
    prevActions.map((action) => action.id).join(",") !==
      nextActions.map((action) => action.id).join(",")
  ) {
    return false;
  }

  return (
    prev.message.suggestedActionsDescription ===
      next.message.suggestedActionsDescription &&
    prev.message.suggestedActionsTitle ===
      next.message.suggestedActionsTitle &&
    prev.onSuggestedActionSelect === next.onSuggestedActionSelect &&
    prev.showAssistantAvatar === next.showAssistantAvatar &&
    prev.isStreamingMessage === next.isStreamingMessage
  );
});
