'use client';

import { useState, useEffect, useRef, useCallback, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', href: '/', sectionId: 'hero', type: 'section' },
  { id: 'experience', label: 'Experience', href: '/#experience', sectionId: 'experience', type: 'section' },
  { id: 'projects', label: 'Projects', href: '/#projects', sectionId: 'projects', type: 'section' },
  { id: 'core-values', label: 'Core Values', href: '/#core-values', sectionId: 'core-values', type: 'section' },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type NavId = NavItem['id'];

const HEADER_HEIGHT = 64;
const SECTION_THRESHOLDS = [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1];

function getPreferredScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function getScrollOffset() {
  return HEADER_HEIGHT;
}

export default function Header() {
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState<NavId>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const sectionRatiosRef = useRef<Map<NavId, number>>(new Map());
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);
  const focusRafRef = useRef<number | null>(null);
  const activeSectionRef = useRef<NavId>('hero');

  const isHomePage = pathname === '/';

  const activeNavId: NavId =
    pathname.startsWith('/projects/')
      ? 'projects'
      : isHomePage
        ? activeSection
        : 'hero';

  const getItemHref = useCallback(
    (item: NavItem) =>
      item.sectionId === 'hero' ? '/' : isHomePage ? `#${item.sectionId}` : `/#${item.sectionId}`,
    [isHomePage]
  );

  const updateIndicator = useCallback((navId: NavId) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const activeEl = nav.querySelector(`[data-id="${navId}"]`) as HTMLElement | null;
    if (!activeEl) {
      indicator.style.opacity = '0';
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    indicator.style.transform = `translateX(${activeRect.left - navRect.left}px)`;
    indicator.style.width = `${activeRect.width}px`;
    indicator.style.opacity = '1';
  }, []);

  const updateScrollState = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;

    const scrollY = window.scrollY;
    const scrollEl = document.scrollingElement ?? document.documentElement;
    const maxScroll = scrollEl.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    header.style.setProperty('--scroll-progress', progress.toString());

    if (scrollY > 16) {
      header.dataset.scrolled = 'true';
    } else {
      delete header.dataset.scrolled;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHeaderFocus = header.contains(document.activeElement);
    const shouldShowHeader =
      prefersReducedMotion ||
      isMobileMenuOpenRef.current ||
      hasHeaderFocus ||
      scrollY <= 16 ||
      scrollY < lastScrollYRef.current;

    if (shouldShowHeader) {
      setIsHeaderHidden(false);
    } else if (scrollY > lastScrollYRef.current) {
      setIsHeaderHidden(true);
    }

    lastScrollYRef.current = scrollY;
  }, []);

  const pickMostVisibleSection = useCallback(() => {
    let nextActive: NavId = 'hero';
    let maxRatio = 0;

    sectionRatiosRef.current.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        nextActive = id;
      }
    });

    if (maxRatio > 0 && activeSectionRef.current !== nextActive) {
      activeSectionRef.current = nextActive;
      setActiveSection(nextActive);
    }
  }, []);

  const scrollToSection = useCallback((item: NavItem) => {
    const el = document.getElementById(item.sectionId);
    if (!el) return;

    const behavior = getPreferredScrollBehavior();
    const offset = item.sectionId === 'hero' ? 0 : getScrollOffset();

    isClickScrolling.current = true;
    activeSectionRef.current = item.id;
    setActiveSection(item.id);

    if (item.sectionId === 'hero') {
      window.scrollTo({ top: 0, left: 0, behavior });
    } else {
      window.scrollTo({
        top: Math.max(0, window.scrollY + el.getBoundingClientRect().top - offset),
        left: 0,
        behavior,
      });
    }

    window.history.replaceState(null, '', item.sectionId === 'hero' ? '/' : `#${item.sectionId}`);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, behavior === 'smooth' ? 750 : 0);
  }, []);

  const handleNavClick = useCallback(
    (item: NavItem, event: MouseEvent<HTMLAnchorElement>) => {
      setIsMobileMenuOpen(false);
      if (item.type !== 'section' || !isHomePage) return;
      event.preventDefault();
      scrollToSection(item);
    },
    [isHomePage, scrollToSection]
  );

  const toggleMobileMenu = () => {
    setIsHeaderHidden(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    updateIndicator(activeNavId);
  }, [activeNavId, updateIndicator]);

  useEffect(() => {
    const onResize = () => updateIndicator(activeNavId);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeNavId, updateIndicator]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        updateScrollState();
        scrollRafRef.current = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [pathname, updateScrollState]);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMobileMenuOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    focusRafRef.current = requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMobileMenuOpen(false);
      requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (focusRafRef.current) cancelAnimationFrame(focusRafRef.current);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isHomePage) {
      sectionRatiosRef.current = new Map();
      return;
    }

    const sections = NAV_ITEMS.flatMap((item) => {
      if (item.type !== 'section') return [];
      const el = document.getElementById(item.sectionId);
      return el ? [{ id: item.id, el }] : [];
    });

    if (sections.length === 0) return;

    sectionRatiosRef.current = new Map<NavId, number>(sections.map(({ id }) => [id, 0]));

    const offset = getScrollOffset();

    const syncRatiosFromViewport = () => {
      const viewportTop = offset;
      const viewportBottom = window.innerHeight;

      sections.forEach(({ id, el }) => {
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, viewportTop);
        const visibleBottom = Math.min(rect.bottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = rect.height > 0 ? Math.min(1, visibleHeight / rect.height) : 0;
        sectionRatiosRef.current.set(id, ratio);
      });

      if (!isClickScrolling.current) pickMostVisibleSection();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const matched = sections.find(({ el }) => el === entry.target);
          if (!matched) return;
          sectionRatiosRef.current.set(
            matched.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        if (!isClickScrolling.current) pickMostVisibleSection();
      },
      { root: null, rootMargin: `-${offset}px 0px 0px 0px`, threshold: SECTION_THRESHOLDS }
    );

    sections.forEach(({ el }) => observer.observe(el));
    const initFrame = requestAnimationFrame(syncRatiosFromViewport);

    return () => {
      cancelAnimationFrame(initFrame);
      observer.disconnect();
    };
  }, [isHomePage, pickMostVisibleSection]);

  useEffect(() => {
    if (!isHomePage) return;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const matchedItem = NAV_ITEMS.find((item) => item.sectionId === hash);
    if (!matchedItem) return;

    const timer = window.setTimeout(() => {
      scrollToSection(matchedItem);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [isHomePage, pathname, scrollToSection]);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      if (focusRafRef.current) cancelAnimationFrame(focusRafRef.current);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        onFocusCapture={() => setIsHeaderHidden(false)}
        className={`header-root fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isMobileMenuOpen
            ? 'border-line-soft bg-surface-glass shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-transparent data-[scrolled=true]:border-line-soft data-[scrolled=true]:bg-surface-glass data-[scrolled=true]:shadow-soft data-[scrolled=true]:backdrop-blur-xl'
        } ${isHeaderHidden && !isMobileMenuOpen ? '-translate-y-full pointer-events-none' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            onClick={(event) => handleNavClick(NAV_ITEMS[0], event)}
            aria-label="Lee.dev 홈으로 이동"
            className="font-extrabold tracking-tight text-navy transition-opacity duration-150 hover:opacity-70"
          >
            Lee<span className="text-brand">.dev</span>
          </Link>

          <nav
            ref={navRef}
            aria-label="Primary navigation"
            className="relative hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-ink-muted md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeNavId === item.id;

              return (
                <Link
                  key={item.id}
                  href={getItemHref(item)}
                  data-id={item.id}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => handleNavClick(item, event)}
                  className={`relative py-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring ${
                    isActive ? 'text-navy' : 'hover:text-navy'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="motion-indicator pointer-events-none absolute bottom-3.5 left-0 h-0.5 rounded-full bg-navy"
              style={{
                opacity: 0,
                width: 0,
                transform: 'translateX(0px)',
              }}
            />
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMobileMenu}
            className={`mobile-toggle inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line-soft transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring md:hidden ${
              isMobileMenuOpen
                ? 'bg-surface shadow-soft'
                : 'bg-surface-glass shadow-soft backdrop-blur-md'
            }`}
          >
            <span className="relative flex h-5 w-5 items-center justify-center text-navy">
              <Menu
                size={20}
                aria-hidden="true"
                className={`absolute transition-all duration-200 ${
                  isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
              />
              <X
                size={20}
                aria-hidden="true"
                className={`absolute transition-all duration-200 ${
                  isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
              />
            </span>
          </button>
        </div>

        <span aria-hidden="true" className="header-scroll-progress" />
      </header>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-4 top-20 z-40 overflow-hidden rounded-card border border-line-soft bg-surface-glass shadow-soft backdrop-blur-xl transition-all duration-200 ease-out md:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 px-4 py-4 text-sm font-semibold text-ink-muted"
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeNavId === item.id;

            return (
              <Link
                key={item.id}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                href={getItemHref(item)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => handleNavClick(item, event)}
                className={`rounded-panel px-4 py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                } ${isActive ? 'bg-surface text-navy' : 'hover:bg-surface-soft hover:text-navy'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
