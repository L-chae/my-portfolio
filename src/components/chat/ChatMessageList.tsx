"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { useChat } from "@/hooks/useChat";

import ChatMessageItem from "./ChatMessageItem";
import ChatSuggestions from "./ChatSuggestions";
import TypingIndicator from "./TypingIndicator";

interface ChatMessageListProps {
  activeSection: string;
  isExpanded: boolean;
  isFullScreen?: boolean;
}

const SCROLL_BOTTOM_THRESHOLD = 40;
const SHORT_STREAM_FOLLOW_LIMIT = 520;
const STREAM_FOLLOW_INTERVAL = 220;

function isAssistantRole(role: string) {
  return role === "assistant" || role === "bot";
}

function isNearBottom(element: HTMLDivElement) {
  return (
    element.scrollHeight - element.scrollTop - element.clientHeight <=
    SCROLL_BOTTOM_THRESHOLD
  );
}

export default function ChatMessageList({
  activeSection,
  isExpanded,
  isFullScreen = false,
}: ChatMessageListProps) {
  const messages = useChat((state) => state.messages);
  const isTyping = useChat((state) => state.isTyping);
  const isStreaming = useChat((state) => state.isStreaming);
  const handleSend = useChat((state) => state.handleSend);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messageElementMapRef = useRef(new Map<string | number, HTMLDivElement>());
  const autoScrollEnabledRef = useRef(true);
  const shortStreamFollowRef = useRef(true);
  const userScrollIntentRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lastStreamFollowAtRef = useRef(0);
  const previousStreamingRef = useRef(isStreaming);
  const previousTypingRef = useRef(isTyping);
  const previousSnapshotRef = useRef({
    count: messages.length,
    lastMessageId: messages[messages.length - 1]?.id ?? null,
    lastMessageRole: messages[messages.length - 1]?.role ?? null,
    lastMessageContent: messages[messages.length - 1]?.content ?? "",
  });

  const userMessages = useMemo(
    () =>
      messages
        .filter((message) => message.role === "user")
        .map((message) => message.content),
    [messages],
  );

  const lastAssistantMessageId = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const message = messages[index];

      if (isAssistantRole(message.role)) {
        return message.id;
      }
    }

    return null;
  }, [messages]);

  const registerMessageElement = useCallback(
    (messageId: string | number, element: HTMLDivElement | null) => {
      if (element) {
        messageElementMapRef.current.set(messageId, element);
        return;
      }

      messageElementMapRef.current.delete(messageId);
    },
    [],
  );

  const scheduleScrollToBottom = useCallback((behavior: ScrollBehavior) => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      viewport.scrollTo({ top: viewport.scrollHeight, behavior });
    });
  }, []);

  const scheduleScrollToMessage = useCallback(
    (messageId: string | number, behavior: ScrollBehavior) => {
      const element = messageElementMapRef.current.get(messageId);
      if (!element) return;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        element.scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior,
        });
      });
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    autoScrollEnabledRef.current = true;
    shortStreamFollowRef.current = true;
    scheduleScrollToBottom("auto");
  }, [isExpanded, scheduleScrollToBottom]);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport || !isExpanded) return;

    const previousSnapshot = previousSnapshotRef.current;
    const lastMessage = messages[messages.length - 1];

    const nextSnapshot = {
      count: messages.length,
      lastMessageId: lastMessage?.id ?? null,
      lastMessageRole: lastMessage?.role ?? null,
      lastMessageContent: lastMessage?.content ?? "",
    };

    const hasNewMessage =
      nextSnapshot.count !== previousSnapshot.count ||
      nextSnapshot.lastMessageId !== previousSnapshot.lastMessageId;

    const hasContentUpdate =
      nextSnapshot.lastMessageContent !== previousSnapshot.lastMessageContent;

    const isStreamingUpdate =
      !hasNewMessage &&
      hasContentUpdate &&
      isStreaming &&
      Boolean(lastMessage) &&
      isAssistantRole(lastMessage.role);

    const hasStreamingJustEnded = previousStreamingRef.current && !isStreaming;

    previousSnapshotRef.current = nextSnapshot;
    previousStreamingRef.current = isStreaming;

    if (hasNewMessage && lastMessage) {
      if (lastMessage.role === "user") {
        autoScrollEnabledRef.current = true;
        shortStreamFollowRef.current = true;
        userScrollIntentRef.current = false;
        scheduleScrollToBottom("smooth");
        return;
      }

      if (!autoScrollEnabledRef.current && !shortStreamFollowRef.current) {
        return;
      }

      if (isAssistantRole(lastMessage.role)) {
        shortStreamFollowRef.current = autoScrollEnabledRef.current;
        scheduleScrollToMessage(lastMessage.id, "smooth");
        return;
      }

      scheduleScrollToBottom("smooth");
      return;
    }

    if (isStreamingUpdate && lastMessage) {
      if (
        !shortStreamFollowRef.current ||
        lastMessage.content.length > SHORT_STREAM_FOLLOW_LIMIT
      ) {
        return;
      }

      const now = performance.now();

      if (now - lastStreamFollowAtRef.current < STREAM_FOLLOW_INTERVAL) return;

      lastStreamFollowAtRef.current = now;
      scheduleScrollToBottom("auto");
      return;
    }

    if (
      hasStreamingJustEnded &&
      lastMessage &&
      shortStreamFollowRef.current &&
      lastMessage.content.length <= SHORT_STREAM_FOLLOW_LIMIT
    ) {
      scheduleScrollToBottom("auto");
    }
  }, [
    isExpanded,
    isStreaming,
    messages,
    scheduleScrollToBottom,
    scheduleScrollToMessage,
  ]);

  useEffect(() => {
    if (!isExpanded) {
      previousTypingRef.current = isTyping;
      return;
    }

    if (isTyping && !previousTypingRef.current && autoScrollEnabledRef.current) {
      scheduleScrollToBottom("smooth");
    }

    previousTypingRef.current = isTyping;
  }, [isExpanded, isTyping, scheduleScrollToBottom]);

  const markUserScrollIntent = useCallback(() => {
    userScrollIntentRef.current = true;
  }, []);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const nearBottom = isNearBottom(event.currentTarget);
    autoScrollEnabledRef.current = nearBottom;

    if (nearBottom) {
      shortStreamFollowRef.current = true;
      userScrollIntentRef.current = false;
      return;
    }

    if (userScrollIntentRef.current) {
      shortStreamFollowRef.current = false;
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      onWheel={markUserScrollIntent}
      onTouchMove={markUserScrollIntent}
      onPointerDown={markUserScrollIntent}
      onKeyDown={markUserScrollIntent}
      className={[
        "flex flex-1 flex-col overflow-y-auto bg-transparent px-4 transition-opacity duration-300 sm:px-5",
        "pt-24 pb-32 sm:pt-24 sm:pb-36",
        "[scrollbar-gutter:stable]",
        isExpanded ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-atomic="false"
      aria-busy={isTyping || isStreaming}
    >
      <div
        className={[
          "mx-auto flex min-h-full w-full flex-col justify-end gap-4 sm:gap-5",
          isFullScreen ? "max-w-4xl" : "max-w-3xl",
        ].join(" ")}
      >
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : undefined;
          const showAssistantAvatar =
            !isAssistantRole(message.role) ||
            !previousMessage ||
            !isAssistantRole(previousMessage.role);

          return (
            <div
              key={message.id}
              ref={(element) => registerMessageElement(message.id, element)}
              data-message-id={String(message.id)}
              className="chat-message-enter"
            >
              <ChatMessageItem
                message={message}
                onSuggestedActionSelect={handleSend}
                showAssistantAvatar={showAssistantAvatar}
                isStreamingMessage={
                  isStreaming && message.id === lastAssistantMessageId
                }
              />
            </div>
          );
        })}

        {isTyping && (
          <TypingIndicator
            showAvatar={
              messages.length === 0 ||
              !isAssistantRole(messages[messages.length - 1]?.role ?? "")
            }
          />
        )}

        <ChatSuggestions
          activeSection={activeSection}
          messageCount={messages.length}
          onSelect={handleSend}
          userMessages={userMessages}
          isTyping={isTyping}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
}