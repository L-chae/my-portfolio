'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'hero',
    label: 'Home',
    href: '/',
    sectionId: 'hero',
    type: 'section',
  },
  {
    id: 'experience',
    label: 'Experience',
    href: '/#experience',
    sectionId: 'experience',
    type: 'section',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/#projects',
    sectionId: 'projects',
    type: 'section',
  },
  {
    id: 'core-values',
    label: 'Core Values',
    href: '/#core-values',
    sectionId: 'core-values',
    type: 'section',
  },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type NavId = NavItem['id'];

const HEADER_HEIGHT = 80;
const SECTION_THRESHOLDS = [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1];

function getPreferredScrollBehavior(): ScrollBehavior {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'auto';
  }

  return 'smooth';
}

export default function Header() {
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState<NavId>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sectionRatiosRef = useRef<Map<NavId, number>>(new Map());
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  const isHomePage = pathname === '/';

  const activeNavId: NavId =
    pathname.startsWith('/projects/')
      ? 'projects'
      : isHomePage
        ? activeSection
        : 'hero';

  const getItemHref = useCallback(
    (item: NavItem) => {
      if (item.sectionId === 'hero') return '/';

      return isHomePage ? `#${item.sectionId}` : `/#${item.sectionId}`;
    },
    [isHomePage]
  );

  const pickMostVisibleSection = useCallback(() => {
    let nextActive: NavId = 'hero';
    let maxRatio = 0;

    sectionRatiosRef.current.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        nextActive = id;
      }
    });

    if (maxRatio > 0) {
      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    }
  }, []);

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeEl = nav.querySelector(
      `[data-id="${activeNavId}"]`
    ) as HTMLElement | null;

    if (!activeEl) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setIndicator({
      left: activeRect.left - navRect.left,
      width: activeRect.width,
      opacity: 1,
    });
  }, [activeNavId]);

  const updateScrollState = useCallback(() => {
    const scrollingElement = document.scrollingElement ?? document.documentElement;
    const scrollY = window.scrollY;
    const maxScroll = scrollingElement.scrollHeight - window.innerHeight;
    const progress =
      maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    setIsScrolled(scrollY > 16);
    headerRef.current?.style.setProperty('--scroll-progress', progress.toString());
  }, []);

  useEffect(() => {
    updateIndicator();

    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateIndicator]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) {
      sectionRatiosRef.current = new Map();
      return;
    }

    const sections = NAV_ITEMS.flatMap((item) => {
      if (item.type !== 'section') return [];

      const el = document.getElementById(item.sectionId);
      if (!el) return [];

      return [
        {
          id: item.id,
          el,
        },
      ];
    });

    if (sections.length === 0) return;

    sectionRatiosRef.current = new Map<NavId, number>(
      sections.map(({ id }) => [id, 0])
    );

    const syncRatiosFromViewport = () => {
      const viewportTop = HEADER_HEIGHT;
      const viewportBottom = window.innerHeight;

      sections.forEach(({ id, el }) => {
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, viewportTop);
        const visibleBottom = Math.min(rect.bottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = rect.height > 0 ? Math.min(1, visibleHeight / rect.height) : 0;

        sectionRatiosRef.current.set(id, ratio);
      });

      if (!isClickScrolling.current) {
        pickMostVisibleSection();
      }
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

        if (isClickScrolling.current) return;
        pickMostVisibleSection();
      },
      {
        root: null,
        rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
        threshold: SECTION_THRESHOLDS,
      }
    );

    sections.forEach(({ el }) => {
      observer.observe(el);
    });

    const initFrame = requestAnimationFrame(syncRatiosFromViewport);

    return () => {
      cancelAnimationFrame(initFrame);
      observer.disconnect();
    };
  }, [isHomePage, pickMostVisibleSection]);

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

      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [pathname, updateScrollState]);

  const handleNavClick = useCallback(
    (item: NavItem, event: MouseEvent<HTMLAnchorElement>) => {
      setIsMobileMenuOpen(false);

      if (!isHomePage || item.type !== 'section') return;

      const el = document.getElementById(item.sectionId);
      if (!el) return;

      event.preventDefault();

      isClickScrolling.current = true;
      setActiveSection(item.id);

      el.scrollIntoView({
        behavior: getPreferredScrollBehavior(),
        block: 'start',
      });

      window.history.replaceState(
        null,
        '',
        item.sectionId === 'hero' ? '/' : `/#${item.sectionId}`
      );

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      clickTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
        pickMostVisibleSection();
      }, 650);
    },
    [isHomePage, pickMostVisibleSection]
  );

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'border-line-soft bg-surface-glass shadow-soft backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={(event) => handleNavClick(NAV_ITEMS[0], event)}
          aria-label="Lee.dev 홈으로 이동"
          className="text-[17px] font-extrabold tracking-tight text-navy transition-opacity hover:opacity-70"
        >
          Lee<span className="text-brand">.dev</span>
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary navigation"
          className="relative hidden items-center gap-8 text-[12px] font-bold uppercase tracking-[0.14em] text-ink-muted md:flex"
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
                className={`relative py-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring ${
                  isActive
                    ? 'text-navy'
                    : 'hover:text-navy'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <span
            className="pointer-events-none absolute bottom-3.5 left-0 h-0.5 rounded-full bg-navy transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.34,1.28,0.64,1)]"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />
        </nav>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-navy transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring md:hidden"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <span aria-hidden="true" className="header-scroll-progress" />

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full overflow-hidden border-t border-line-soft bg-surface-glass shadow-soft backdrop-blur-xl transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen
            ? 'max-h-72 opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNavId === item.id;

            return (
              <Link
                key={item.id}
                href={getItemHref(item)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => handleNavClick(item, event)}
                className={`relative rounded-xl px-1 py-3 text-left transition-colors duration-200 ${
                  isActive
                    ? 'text-navy'
                    : 'hover:text-navy'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
