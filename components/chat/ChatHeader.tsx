import { Maximize2, Minimize2, Sparkles, X } from "lucide-react";

interface ChatHeaderProps {
  isExpanded: boolean;
  isFullScreen: boolean;
  setIsFullScreen: (val: boolean) => void;
  onClose: () => void;
}

export default function ChatHeader({ isExpanded, isFullScreen, setIsFullScreen, onClose }: ChatHeaderProps) {
  return (
    <div className={`shrink-0 bg-slate-50/90 backdrop-blur-md px-5 sm:px-6 py-3 flex justify-between items-center border-b border-slate-200/60 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
            <Sparkles size={16} /> 
          </div>
          <h3 className="font-bold text-[15px] text-slate-900">
            Portfolio AI
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFullScreen(!isFullScreen);
          }}
          className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full p-2 transition-colors"
        >
          {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full p-2 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}