"use client";

import { useEffect, useState } from "react";

type TypingTitleProps = {
  text: string;
  intervalMs?: number;
};

export default function TypingTitle({
  text,
  intervalMs = 100,
}: TypingTitleProps) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = window.setInterval(() => {
      setTypedText(text.slice(0, currentIndex + 1));
      currentIndex += 1;

      if (currentIndex >= text.length) {
        window.clearInterval(interval);
      }
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, text]);

  return (
    <div
      className="hero-item text-sm font-semibold text-brand"
      style={{ animationDelay: "0ms" }}
      role="text"
      aria-label={text}
    >
      {typedText}
      <span className="text-brand motion-reduce:animate-none animate-pulse">|</span>
    </div>
  );
}
