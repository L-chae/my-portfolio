import { useRef, DependencyList } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(deps: DependencyList = []) {
  const containerRef = useRef<T>(null);
  void deps;

  return containerRef;
}
