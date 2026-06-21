'use client';

export default function Background() {
  return (
    <div className="site-background pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#eaf1ff] contain-layout contain-paint">
      <style>{`
        @keyframes aurora-float-a {
          0%, 100% {
            transform: translate3d(-3vw, -2vh, 0) rotate(-14deg) scale(1);
          }
          50% {
            transform: translate3d(4vw, 3vh, 0) rotate(-6deg) scale(1.08);
          }
        }

        @keyframes aurora-float-b {
          0%, 100% {
            transform: translate3d(3vw, 1vh, 0) rotate(10deg) scale(1);
          }
          50% {
            transform: translate3d(-4vw, 3vh, 0) rotate(4deg) scale(1.1);
          }
        }

        @keyframes aurora-float-c {
          0%, 100% {
            transform: translate3d(0, 2vh, 0) rotate(8deg) scale(1);
          }
          50% {
            transform: translate3d(3vw, -3vh, 0) rotate(14deg) scale(1.07);
          }
        }

        .aurora-beam {
          position: absolute;
          border-radius: 9999px;
          filter: blur(96px);
          opacity: 0.95;
          transform: translate3d(0, 0, 0);
          transform-origin: center;
          will-change: transform;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          backface-visibility: hidden;
        }

        .beam-violet {
          top: -10%;
          left: -18%;
          width: 68vw;
          height: 30vw;
          min-width: 620px;
          min-height: 280px;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 92, 246, 0.34) 0%,
            rgba(167, 139, 250, 0.18) 44%,
            rgba(167, 139, 250, 0) 78%
          );
          animation-name: aurora-float-a;
          animation-duration: 34s;
        }

        .beam-cyan {
          top: 14%;
          right: -20%;
          width: 74vw;
          height: 32vw;
          min-width: 700px;
          min-height: 300px;
          background: radial-gradient(
            ellipse at center,
            rgba(6, 182, 212, 0.3) 0%,
            rgba(125, 211, 252, 0.17) 45%,
            rgba(125, 211, 252, 0) 80%
          );
          animation-name: aurora-float-b;
          animation-duration: 38s;
        }

        .beam-coral {
          bottom: -18%;
          left: -8%;
          width: 72vw;
          height: 30vw;
          min-width: 680px;
          min-height: 280px;
          background: radial-gradient(
            ellipse at center,
            rgba(251, 146, 60, 0.18) 0%,
            rgba(244, 114, 182, 0.13) 46%,
            rgba(244, 114, 182, 0) 80%
          );
          animation-name: aurora-float-c;
          animation-duration: 42s;
        }

        .beam-blue {
          bottom: -14%;
          right: -16%;
          width: 78vw;
          height: 34vw;
          min-width: 720px;
          min-height: 320px;
          background: radial-gradient(
            ellipse at center,
            rgba(59, 130, 246, 0.24) 0%,
            rgba(147, 197, 253, 0.15) 44%,
            rgba(147, 197, 253, 0) 80%
          );
          animation-name: aurora-float-b;
          animation-duration: 46s;
          animation-delay: -12s;
        }

        .aurora-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.18), transparent 38%),
            linear-gradient(
              180deg,
              rgba(248, 251, 255, 0.08) 0%,
              rgba(226, 236, 248, 0.16) 48%,
              rgba(205, 219, 238, 0.26) 100%
            );
        }

        .aurora-depth {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 50% 42%,
              transparent 38%,
              rgba(15, 23, 42, 0.04) 74%,
              rgba(15, 23, 42, 0.1) 100%
            );
        }

        .aurora-grid {
          position: absolute;
          inset: 0;
          opacity: 0.028;
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.18) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.32) 55%,
            rgba(0, 0, 0, 0.08) 100%
          );
        }

        .aurora-noise {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
        }

        @media (max-width: 767px) {
          .aurora-beam {
            filter: blur(72px);
            animation: none;
            will-change: auto;
          }

          .beam-violet {
            top: -4%;
            left: -48%;
            width: 122vw;
            height: 62vw;
            min-width: 0;
            min-height: 0;
          }

          .beam-cyan {
            top: 28%;
            right: -52%;
            width: 130vw;
            height: 66vw;
            min-width: 0;
            min-height: 0;
          }

          .beam-coral {
            bottom: -10%;
            left: -36%;
            width: 124vw;
            height: 62vw;
            min-width: 0;
            min-height: 0;
          }

          .beam-blue {
            bottom: -16%;
            right: -44%;
            width: 130vw;
            height: 68vw;
            min-width: 0;
            min-height: 0;
          }

          .aurora-grid {
            opacity: 0.018;
            background-size: 48px 48px;
          }

          .aurora-noise {
            opacity: 0.05;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-beam {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>

      <div className="aurora-beam beam-violet" />
      <div className="aurora-beam beam-cyan" />
      <div className="aurora-beam beam-coral" />
      <div className="aurora-beam beam-blue" />

      <div className="aurora-wash" />
      <div className="aurora-depth" />
      <div className="aurora-grid" />
      <div className="aurora-noise" />
    </div>
  );
}