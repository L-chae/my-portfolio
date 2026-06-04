import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3.5 w-full self-start animate-in fade-in duration-300">
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
        <Sparkles size={15} className="text-white animate-pulse" />
      </div>
      <div className="flex-1 py-1.5 flex items-center">
        <span className="text-[14.5px] font-medium text-slate-400 animate-pulse tracking-tight">
          답변을 생성하고 있습니다...
        </span>
      </div>
    </div>
  );
}