'use client';

export default function Background() {
  return (
    // fixed와 z-[-1]을 사용하여 모든 콘텐츠의 뒤에 깔리도록 설정
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
      <style>{`
        @keyframes fluid-1 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50% { transform: translate3d(5vw, -5vh, 0) rotate(180deg) scale(1.1); }
        }
        @keyframes fluid-2 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50% { transform: translate3d(-5vw, 5vh, 0) rotate(-180deg) scale(1.2); }
        }
        @keyframes fluid-3 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          50% { transform: translate3d(5vw, 5vh, 0) rotate(90deg) scale(0.9); }
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: multiply;
          opacity: 0.6;
          will-change: transform; /* 하드웨어 가속 유도 */
        }
        .blob-purple {
          background: radial-gradient(circle, rgba(216,180,254,0.8) 0%, rgba(216,180,254,0) 70%);
          animation: fluid-1 12s infinite ease-in-out;
        }
        .blob-cyan {
          background: radial-gradient(circle, rgba(103,232,249,0.8) 0%, rgba(103,232,249,0) 70%);
          animation: fluid-2 15s infinite ease-in-out reverse;
        }
        .blob-blue {
          background: radial-gradient(circle, rgba(191,219,254,0.8) 0%, rgba(191,219,254,0) 70%);
          animation: fluid-3 14s infinite ease-in-out;
        }
      `}</style>
      
      <div className="blob blob-purple -top-10 -left-10 w-[50vw] h-[50vw] max-w-150 max-h-150" />
      <div className="blob blob-cyan top-1/4 -right-10 w-[60vw] h-[60vw] max-w-175 max-h-175" />
      <div className="blob blob-blue -bottom-1/4 left-1/4 w-[70vw] h-[70vw] max-w-200 max-h-200" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size[40px_40px]" />
    </div>
  );
}