import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import MessageMarkdown from "./MessageMarkdown";

interface StreamingAssistantContentProps {
  content: string;
  isStreaming: boolean;
  components?: React.ComponentProps<typeof ReactMarkdown>["components"];
  remarkPlugins?: React.ComponentProps<typeof ReactMarkdown>["remarkPlugins"];
}

function getStepSize(gap: number) {
  if (gap > 1200) return 240;
  if (gap > 600) return 160;
  if (gap > 240) return 96;
  if (gap > 80) return 48;
  return 18;
}

function getNextLength(currentLength: number, target: string) {
  const gap = target.length - currentLength;
  const stepSize = getStepSize(gap);
  const proposedLength = Math.min(target.length, currentLength + stepSize);

  if (proposedLength >= target.length || stepSize < 24) {
    return proposedLength;
  }

  const minimumLength = currentLength + Math.floor(stepSize * 0.55);
  const segment = target.slice(currentLength, proposedLength);
  const lastBreak = Math.max(
    segment.lastIndexOf(" "),
    segment.lastIndexOf("\n"),
    segment.lastIndexOf("\t"),
  );

  if (lastBreak > 0 && currentLength + lastBreak + 1 >= minimumLength) {
    return currentLength + lastBreak + 1;
  }

  return proposedLength;
}

export default function StreamingAssistantContent({
  content,
  isStreaming,
  components,
  remarkPlugins,
}: StreamingAssistantContentProps) {
  const [displayContent, setDisplayContent] = useState(() =>
    isStreaming ? "" : content,
  );
  const contentRef = useRef(content);
  const displayRef = useRef(displayContent);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    displayRef.current = displayContent;
  }, [displayContent]);

  useEffect(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (!isStreaming) {
      displayRef.current = content;
      return;
    }

    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      const target = contentRef.current;
      let current = displayRef.current;

      if (!target.startsWith(current)) {
        current = target.slice(0, Math.min(current.length, target.length));
        displayRef.current = current;
        setDisplayContent(current);
      }

      if (current.length < target.length) {
        const next = target.slice(0, getNextLength(current.length, target));
        displayRef.current = next;
        setDisplayContent(next);
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [content, isStreaming]);

  if (!isStreaming) {
    return (
      <MessageMarkdown
        content={content}
        components={components}
        remarkPlugins={remarkPlugins}
      />
    );
  }

  return (
    <div className="whitespace-pre-wrap break-words text-[14px] leading-[1.75] text-ink">
      {displayContent}
    </div>
  );
}
