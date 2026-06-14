"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { useChat } from "@/hooks/useChat";
import { useActiveSection } from "@/hooks/useActiveSection";

import ChatFloatingButton from "./ChatFloatingButton";
import ChatPanel from "./ChatPanel";

const SECTION_IDS = ["hero", "experience", "core-values", "projects"];

export default function ChatBar() {
  const isExpanded = useChat((state) => state.isExpanded);
  const setIsExpanded = useChat((state) => state.setIsExpanded);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeSection = useActiveSection(SECTION_IDS);
  const titleId = useId();

  const toggleExpanded = useCallback(
    (expanded: boolean) => {
      if (!expanded) {
        setIsFullScreen(false);
      }

      setIsExpanded(expanded);

      if (!expanded) {
        window.setTimeout(() => {
          const floatingButton = document.querySelector<HTMLButtonElement>(
            '[data-chat-floating-button="true"]',
          );
          floatingButton?.focus();
        }, 0);
      }
    },
    [setIsExpanded],
  );

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleChatIntent = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest('[data-chat-intent="open"]');

      if (!trigger) return;

      event.preventDefault();

      const topic = trigger.getAttribute("data-chat-topic")?.trim();

      toggleExpanded(true);

      if (!topic || useChat.getState().isTyping) return;

      window.setTimeout(() => {
        void useChat.getState().handleSend(topic);
      }, 0);
    };

    document.addEventListener("click", handleChatIntent);

    return () => document.removeEventListener("click", handleChatIntent);
  }, [toggleExpanded]);

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || useChat.getState().isTyping) return;

      event.preventDefault();
      toggleExpanded(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, toggleExpanded]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-navy/10 backdrop-blur-sm transition-opacity duration-400 ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          if (!useChat.getState().isTyping) toggleExpanded(false);
        }}
      />

      <ChatFloatingButton
        isExpanded={isExpanded}
        isScrolled={isScrolled}
        onOpen={() => toggleExpanded(true)}
      />

      <ChatPanel
        activeSection={activeSection}
        isExpanded={isExpanded}
        isFullScreen={isFullScreen}
        onClose={() => toggleExpanded(false)}
        onExpand={() => toggleExpanded(true)}
        setIsFullScreen={setIsFullScreen}
        titleId={titleId}
      />
    </>
  );
}
