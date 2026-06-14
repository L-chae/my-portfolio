<!-- BEGIN:global-design-extension-rules -->

# Global Design Extension Rules
- 모든 파일 읽기/쓰기 작업은 **UTF-8 (BOM 없음)** 인코딩을 기준으로 한다.
- 터미널 출력 시 인코딩 오류 방지를 위해, 시스템 호출 시 항상 다음 인코딩 플래그를 준수한다:
  - PowerShell/CMD 실행 시: `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`
  - Python 등 외부 스크립트 실행 시: `PYTHONIOENCODING=utf-8` 환경 변수 주입
  
작업 중 기존 전역 디자인 토큰만으로 해결할 수 없어 새 디자인 효과, 유틸리티, 토큰을 추가해야 한다면 반드시 아래 규칙을 따르세요.

## 기준 파일

새 디자인 정의는 반드시 아래 파일에만 추가합니다.

```txt
C:\lce\my-portfolio\src\app\globals.css
```

또는 프로젝트 상대 경로 기준:

```txt
src/app/globals.css
```

컴포넌트 내부에 색상, shadow, gradient, animation, radius, transition 값을 직접 하드코딩하지 마세요.

## 기본 원칙

새 디자인 값은 컴포넌트에 바로 작성하지 말고, `globals.css`에 먼저 등록한 뒤 className으로 적용합니다.

허용되는 추가 위치:

```css
@theme {
  /* 색상, shadow, radius, animation token */
}

@layer components {
  /* 재사용 가능한 컴포넌트성 class */
}

@layer utilities {
  /* 작은 효과 utility class */
}
```

## 추가 전 확인

새 값을 추가하기 전에 기존 토큰으로 대체 가능한지 먼저 확인하세요.

우선 사용해야 할 기존 토큰:

```txt
bg-base
bg-surface
bg-surface-soft
bg-surface-muted
bg-surface-glass

text-navy
text-ink
text-ink-muted
text-brand
text-accent

border-line
border-line-soft
border-line-dark

shadow-card
shadow-soft
shadow-brand
shadow-glow
shadow-accent

rounded-card
rounded-panel
rounded-pill
```

기존 토큰 조합으로 충분하면 새 토큰을 추가하지 마세요.

## 새 토큰 추가 허용 기준

아래 조건 중 하나를 만족할 때만 `@theme`에 새 토큰을 추가합니다.

```txt
1. 동일한 색상/효과가 2곳 이상에서 반복될 예정
2. 특정 섹션 전용이 아니라 사이트 전체에서 재사용 가능
3. 기존 토큰으로 의미를 표현하기 어려움
4. 디자인 시스템의 역할이 명확함
```

예시:

```css
@theme {
  --shadow-lift: 0 14px 36px rgba(15, 23, 42, 0.07);
  --color-brand-aura: rgba(37, 99, 235, 0.12);
}
```

금지 예시:

```css
@theme {
  --color-project-card-hover-only: #eef5ff;
  --shadow-random-card-effect: 0 0 33px blue;
}
```

이름이 특정 컴포넌트에 묶이거나 의미가 불명확하면 추가하지 마세요.

## 새 component class 추가 기준

복합 효과가 반복되면 `@layer components`에 추가합니다.

허용 예시:

```css
@layer components {
  .interactive-card {
    position: relative;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      border-color 0.3s ease;
  }

  .interactive-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow);
    border-color: var(--color-brand-ring);
  }
}
```

적용 예시:

```tsx
className="interactive-card rounded-card border border-line-soft bg-surface-glass"
```

## 새 utility class 추가 기준

작고 독립적인 효과만 `@layer utilities`에 추가합니다.

허용 예시:

```css
@layer utilities {
  .text-balance-safe {
    text-wrap: balance;
  }

  .motion-lift {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .motion-lift:hover {
    transform: translateY(-2px);
  }
}
```

단, Tailwind 기본 class 조합으로 충분하면 새 utility를 만들지 마세요.

## 컴포넌트에서 금지되는 패턴

아래 패턴을 새로 추가하지 마세요.

```tsx
className="bg-[#F8FBFF]"
className="shadow-[0_10px_30px_rgba(...)]"
className="rounded-[24px]"
className="border-[rgba(...)]"
style={{ background: "radial-gradient(...)" }}
style={{ boxShadow: "..." }}
```

대신 전역 CSS에 등록 후 사용합니다.

```tsx
className="bg-base shadow-card rounded-card border border-line"
```

## 예외

아래 inline style은 유지할 수 있습니다.

```txt
- 마우스 좌표 기반 CSS 변수
- 동적 transform 값
- 동적 width/height 계산
- animationDelay
- 위치 계산용 left/top/width
```

예시:

```tsx
style={{ "--mouse-x": `${x}px`, "--mouse-y": `${y}px` }}
style={{ animationDelay: `${index * 80}ms` }}
```

이 경우 색상, shadow, border, radius 값은 inline으로 넣지 마세요.

## motion 접근성

새 animation 또는 transition을 추가했다면 반드시 `prefers-reduced-motion`에서 무력화되도록 처리합니다.

```css
@media (prefers-reduced-motion: reduce) {
  .motion-lift,
  .interactive-card {
    transition: none;
    transform: none;
  }
}
```

무한 애니메이션은 꼭 필요한 경우에만 사용하고, 텍스트 가독성을 방해하면 안 됩니다.

## naming 규칙

전역 class 이름은 역할 중심으로 작성합니다.

좋은 이름:

```txt
interactive-card
motion-lift
soft-aura
section-divider
glass-panel
focus-ring-brand
```

나쁜 이름:

```txt
project-card-new
pretty-hover
blue-thing
test-effect
main-fix
```

## 추가 후 적용 규칙

새 디자인 class를 만들었다면 반드시 실제 컴포넌트에 적용되어야 합니다.

금지:

```txt
globals.css에 추가만 하고 아무 곳에서도 사용하지 않음
```

확인 명령:

```bash
grep -RIn "추가한-class-name" src/app src/components
```

## 수정 금지 파일

새 디자인 효과를 추가하더라도 아래 파일은 수정하지 마세요.

```txt
src/lib/searchKnowledge.ts
src/lib/contextBuilder.ts
src/lib/systemPrompt.ts
src/lib/evidenceImages.ts
src/lib/preparedAnswers.ts
src/hooks/useChat.ts
src/components/chat/*
src/app/api/chat/route.ts
src/content/knowledge/*
src/content/suggestions.ts
src/content/projectsMock.ts
```

## 검증 명령

변경 후 반드시 실행합니다.

```bash
npm run lint
npm run build
npx tsc --noEmit
```

## 보고 형식

새 전역 디자인을 추가했다면 아래 형식으로 보고하세요.

```txt
globals.css 추가 내용:
- @theme:
  - ...
- @layer components:
  - ...
- @layer utilities:
  - ...

추가 이유:
- 기존 토큰으로 해결 불가했던 이유:
- 재사용 가능 범위:

적용 위치:
- ...

하드코딩 방지 확인:
- 컴포넌트 내부 색상/shadow/radius 하드코딩 추가 없음

접근성/성능:
- prefers-reduced-motion 대응:
- transform/opacity 중심 적용 여부:
- layout shift 여부:

검증:
- lint:
- build:
- tsc:
```

## 완료 기준

```txt
1. 새 디자인 값은 globals.css에만 정의됨
2. 컴포넌트는 전역 class 또는 토큰 class만 사용함
3. 기존 UI 기능과 데이터 흐름은 변경되지 않음
4. AI/chat/knowledge 관련 파일은 수정되지 않음
5. lint/build/tsc 통과
```

<!-- END:global-design-extension-rules -->
