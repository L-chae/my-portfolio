"use client";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f7fbff] contain-layout contain-paint">
      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% {
            transform: translate3d(-6vw, -2vh, 0) rotate(-18deg) scale(1);
          }
          50% {
            transform: translate3d(8vw, 4vh, 0) rotate(-8deg) scale(1.24);
          }
        }

        @keyframes aurora-drift-2 {
          0%, 100% {
            transform: translate3d(6vw, 2vh, 0) rotate(14deg) scale(1);
          }
          50% {
            transform: translate3d(-8vw, 5vh, 0) rotate(5deg) scale(1.28);
          }
        }

        @keyframes aurora-drift-3 {
          0%, 100% {
            transform: translate3d(0, 4vh, 0) rotate(10deg) scale(1);
          }
          50% {
            transform: translate3d(5vw, -5vh, 0) rotate(20deg) scale(1.2);
          }
        }

        .aurora-beam {
          position: absolute;
          border-radius: 9999px;
          filter: blur(150px);
          will-change: transform;
          transform-origin: center;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .beam-purple {
          top: 2%;
          left: -18%;
          width: 74vw;
          height: 28vw;
          min-width: 680px;
          min-height: 260px;
          background: radial-gradient(
            ellipse at center,
            rgba(168, 85, 247, 0.42) 0%,
            rgba(192, 132, 252, 0.24) 42%,
            rgba(192, 132, 252, 0) 76%
          );
          animation-name: aurora-drift-1;
          animation-duration: 22s;
        }

        .beam-cyan {
          top: 22%;
          right: -22%;
          width: 82vw;
          height: 30vw;
          min-width: 760px;
          min-height: 300px;
          background: radial-gradient(
            ellipse at center,
            rgba(34, 211, 238, 0.46) 0%,
            rgba(125, 211, 252, 0.26) 44%,
            rgba(125, 211, 252, 0) 78%
          );
          animation-name: aurora-drift-2;
          animation-duration: 26s;
        }

        .beam-blue {
          bottom: -12%;
          left: 8%;
          width: 86vw;
          height: 32vw;
          min-width: 780px;
          min-height: 320px;
          background: radial-gradient(
            ellipse at center,
            rgba(96, 165, 250, 0.36) 0%,
            rgba(147, 197, 253, 0.22) 42%,
            rgba(147, 197, 253, 0) 76%
          );
          animation-name: aurora-drift-3;
          animation-duration: 28s;
        }

        .aurora-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.22), transparent 28%),
            linear-gradient(
              180deg,
              rgba(247, 251, 255, 0.08) 0%,
              rgba(247, 251, 255, 0.22) 36%,
              rgba(247, 251, 255, 0.54) 72%,
              rgba(247, 251, 255, 0.78) 100%
            );
        }

        .aurora-grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.08) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        @media (min-width: 768px) {
          .aurora-beam {
            mix-blend-mode: multiply;
          }
        }

        @media (max-width: 767px) {
          .aurora-beam {
            filter: blur(96px);
            mix-blend-mode: normal;
          }

          .beam-purple {
            top: 4%;
            left: -38%;
            width: 120vw;
            height: 56vw;
            min-width: 0;
            min-height: 0;
          }

          .beam-cyan {
            top: 30%;
            right: -42%;
            width: 128vw;
            height: 62vw;
            min-width: 0;
            min-height: 0;
          }

          .beam-blue {
            bottom: -6%;
            left: -18%;
            width: 126vw;
            height: 64vw;
            min-width: 0;
            min-height: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-beam {
            animation: none;
          }
        }
      `}</style>

      <div className="aurora-beam beam-purple" />
      <div className="aurora-beam beam-cyan" />
      <div className="aurora-beam beam-blue" />

      <div className="aurora-wash" />
      <div className="aurora-grid" />
    </div>
  );
}
