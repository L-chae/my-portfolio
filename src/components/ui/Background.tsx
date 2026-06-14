'use client';

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base contain-layout contain-paint">
      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% {
            transform: translate3d(-4vw, -2vh, 0) rotate(-16deg) scale(1);
          }
          50% {
            transform: translate3d(6vw, 3vh, 0) rotate(-7deg) scale(1.16);
          }
        }

        @keyframes aurora-drift-2 {
          0%, 100% {
            transform: translate3d(5vw, 1vh, 0) rotate(12deg) scale(1);
          }
          50% {
            transform: translate3d(-6vw, 4vh, 0) rotate(4deg) scale(1.18);
          }
        }

        @keyframes aurora-drift-3 {
          0%, 100% {
            transform: translate3d(0, 3vh, 0) rotate(8deg) scale(1);
          }
          50% {
            transform: translate3d(4vw, -4vh, 0) rotate(16deg) scale(1.14);
          }
        }

        .aurora-beam {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          will-change: transform;
          transform-origin: center;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .beam-purple {
          top: -4%;
          left: -16%;
          width: 70vw;
          height: 30vw;
          min-width: 680px;
          min-height: 280px;
          background: radial-gradient(
            ellipse at center,
            rgba(168, 85, 247, 0.36) 0%,
            rgba(192, 132, 252, 0.24) 42%,
            rgba(192, 132, 252, 0) 76%
          );
          animation-name: aurora-drift-1;
          animation-duration: 24s;
        }

        .beam-cyan {
          top: 18%;
          right: -18%;
          width: 78vw;
          height: 32vw;
          min-width: 760px;
          min-height: 320px;
          background: radial-gradient(
            ellipse at center,
            rgba(34, 211, 238, 0.38) 0%,
            rgba(125, 211, 252, 0.24) 44%,
            rgba(125, 211, 252, 0) 78%
          );
          animation-name: aurora-drift-2;
          animation-duration: 28s;
        }

        .beam-blue {
          bottom: -14%;
          left: 4%;
          width: 84vw;
          height: 34vw;
          min-width: 780px;
          min-height: 340px;
          background: radial-gradient(
            ellipse at center,
            rgba(96, 165, 250, 0.32) 0%,
            rgba(147, 197, 253, 0.2) 42%,
            rgba(147, 197, 253, 0) 76%
          );
          animation-name: aurora-drift-3;
          animation-duration: 30s;
        }

        .aurora-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.16), transparent 30%),
            linear-gradient(
              180deg,
              rgba(247, 251, 255, 0.02) 0%,
              rgba(247, 251, 255, 0.12) 32%,
              rgba(247, 251, 255, 0.38) 68%,
              rgba(247, 251, 255, 0.66) 100%
            );
        }

        .aurora-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 0%, transparent 0%, rgba(255,255,255,0.14) 62%, rgba(255,255,255,0.42) 100%);
        }

        .aurora-grid {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.12) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(
            180deg,
            rgba(0,0,0,0.7) 0%,
            rgba(0,0,0,0.45) 42%,
            rgba(0,0,0,0.16) 100%
          );
        }

        @media (min-width: 768px) {
          .aurora-beam {
            mix-blend-mode: multiply;
          }
        }

        @media (max-width: 767px) {
          .aurora-beam {
            filter: blur(88px);
            mix-blend-mode: normal;
          }

          .beam-purple {
            top: 2%;
            left: -42%;
            width: 122vw;
            height: 58vw;
            min-width: 0;
            min-height: 0;
          }

          .beam-cyan {
            top: 28%;
            right: -46%;
            width: 132vw;
            height: 64vw;
            min-width: 0;
            min-height: 0;
          }

          .beam-blue {
            bottom: -8%;
            left: -22%;
            width: 130vw;
            height: 66vw;
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
      <div className="aurora-vignette" />
      <div className="aurora-grid" />
    </div>
  );
}
