'use client';

import { useLayoutEffect } from 'react';

export default function ScrollToTopInstant() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    window.requestAnimationFrame(() => {
      html.style.scrollBehavior = previousScrollBehavior;
    });
  }, []);

  return null;
}
