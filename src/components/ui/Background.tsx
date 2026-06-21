'use client';

export default function Background() {
  return (
    <div className="site-background pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base contain-layout contain-paint">
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
          filter: blur(100px); /* 블러를 살짝 줄여 빛을 더 선명하게 */
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
          /* 중심부 농도를 올려 색채감을 채움 */
          background: radial-gradient(
            ellipse at center,
            rgba(168, 85, 247, 0.45) 0%,
            rgba(192, 132, 252, 0.28) 42%,
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
            rgba(34, 211, 238, 0.45) 0%,
            rgba(125, 211, 252, 0.28) 44%,
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
            rgba(96, 165, 250, 0.4) 0%,
            rgba(147, 197, 253, 0.25) 42%,
            rgba(147, 197, 253, 0) 76%
          );
          animation-name: aurora-drift-3;
          animation-duration: 30s;
        }

        .aurora-wash {
          position: absolute;
          inset: 0;
          /* 하단을 하얗게 덮는 대신, 약간 쿨톤(푸른빛)의 차분한 색으로 변경 */
          background:
            radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.2), transparent 40%),
            linear-gradient(
              180deg,
              rgba(240, 245, 255, 0) 0%,
              rgba(235, 242, 255, 0.15) 40%,
              rgba(226, 236, 248, 0.4) 100%
            );
        }

        .aurora-vignette {
          position: absolute;
          inset: 0;
          /* 가장자리에 흰색 대신 어두운 네이비톤을 깔아 중앙의 빛을 강조 */
          background:
            radial-gradient(circle at 50% 50%, transparent 50%, rgba(15, 23, 42, 0.03) 75%, rgba(15, 23, 42, 0.08) 100%);
        }

        .aurora-noise {
          position: absolute;
          inset: 0;
          /* 미세한 노이즈로 텅 빈 느낌을 없애고 질감을 추가 */
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.25;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .aurora-grid {
          position: absolute;
          inset: 0;
          opacity: 0.045; /* 그리드 선명도 약간 증가 */
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.15) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(
            180deg,
            rgba(0,0,0,0.8) 0%,
            rgba(0,0,0,0.5) 50%,
            rgba(0,0,0,0.15) 100%
          );
        }

        @media (min-width: 768px) {
          .aurora-beam {
            mix-blend-mode: multiply;
          }
        }

        @media (max-width: 767px) {
          .aurora-beam {
            filter: blur(72px);
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

      <div className="ambient-beam ambient-beam-primary aurora-beam beam-purple" />
      <div className="ambient-beam ambient-beam-secondary aurora-beam beam-cyan" />
      <div className="ambient-beam ambient-beam-tertiary aurora-beam beam-blue" />

      <div className="ambient-noise aurora-noise" />
      <div className="ambient-wash aurora-wash" />
      <div className="ambient-vignette aurora-vignette" />
      <div className="ambient-grid aurora-grid" />
    </div>
  );
}
