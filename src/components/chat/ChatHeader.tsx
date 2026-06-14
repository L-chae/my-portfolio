import { Maximize2, Minimize2, X } from "lucide-react";

interface ChatHeaderProps {
  isExpanded: boolean;
  isFullScreen: boolean;
  setIsFullScreen: (val: boolean) => void;
  onClose: () => void;
}

export default function ChatHeader({ isExpanded, isFullScreen, setIsFullScreen, onClose }: ChatHeaderProps) {
  return (
    <div className={`shrink-0 bg-base/90 backdrop-blur-md px-5 sm:px-6 py-3 flex justify-between items-center border-b border-line/70 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
      <h3 className="font-bold text-[15px] text-navy">Portfolio AI</h3>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFullScreen(!isFullScreen);
          }}
          className="text-ink-faint hover:text-ink hover:bg-surface-muted rounded-full p-2 transition-colors"
        >
          {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-ink-faint hover:text-ink hover:bg-surface-muted rounded-full p-2 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
