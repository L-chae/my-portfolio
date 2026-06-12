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
    id: 'core-values',
    label: 'Core Values',
    href: '/#core-values',
    sectionId: 'core-values',
    type: 'section',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/#projects',
    sectionId: 'projects',
    type: 'section',
  },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type NavId = NavItem['id'];

const HEADER_HEIGHT = 64;

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

  const navRef = useRef<HTMLElement>(null);
  const sectionOffsets = useRef<{ id: NavId; top: number }[]>([]);
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

  const calculateOffsets = useCallback(() => {
    if (!isHomePage) {
      sectionOffsets.current = [];
      return;
    }

    sectionOffsets.current = NAV_ITEMS.flatMap((item) => {
      if (item.type !== 'section') return [];

      const el = document.getElementById(item.sectionId);
      if (!el) return [];

      return [
        {
          id: item.id,
          top: el.getBoundingClientRect().top + window.scrollY,
        },
      ];
    });
  }, [isHomePage]);

  const evaluateScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;

    setIsScrolled(scrollY > 16);

    if (!isHomePage) return;
    if (isClickScrolling.current) return;
    if (sectionOffsets.current.length === 0) return;

    const triggerPoint = scrollY + window.innerHeight * 0.38;
    const isBottomReached =
      Math.ceil(scrollY + window.innerHeight) >=
      document.documentElement.scrollHeight;

    let current: NavId = sectionOffsets.current[0]?.id ?? 'hero';

    if (isBottomReached) {
      current = sectionOffsets.current[sectionOffsets.current.length - 1].id;
    } else {
      for (const { id, top } of sectionOffsets.current) {
        if (triggerPoint >= top) current = id;
      }
    }

    setActiveSection(current);
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) {
      sectionOffsets.current = [];
      return;
    }

    calculateOffsets();

    const initTimer = setTimeout(() => {
      calculateOffsets();
      evaluateScrollPosition();
      updateIndicator();
    }, 80);

    const handleResize = () => {
      calculateOffsets();
      evaluateScrollPosition();
      updateIndicator();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    calculateOffsets,
    evaluateScrollPosition,
    updateIndicator,
    isHomePage,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current) return;

      scrollRafRef.current = requestAnimationFrame(() => {
        evaluateScrollPosition();
        scrollRafRef.current = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [evaluateScrollPosition]);

  const handleNavClick = useCallback(
    (item: NavItem, event: MouseEvent<HTMLAnchorElement>) => {
      setIsMobileMenuOpen(false);

      if (!isHomePage || item.type !== 'section') return;

      const el = document.getElementById(item.sectionId);
      if (!el) return;

      event.preventDefault();

      isClickScrolling.current = true;
      setActiveSection(item.id);

      const offsetTop =
        el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;

      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth',
      });

      window.history.replaceState(
        null,
        '',
        item.sectionId === 'hero' ? '/' : `#${item.sectionId}`
      );

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      clickTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
        calculateOffsets();
        evaluateScrollPosition();
      }, 700);
    },
    [calculateOffsets, evaluateScrollPosition, isHomePage]
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'border-line/80 bg-base/80 shadow-soft backdrop-blur-xl'
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
                className={`relative py-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
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
            className="pointer-events-none absolute bottom-3.5 left-0 h-[2px] rounded-full bg-navy transition-all duration-300 ease-out"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:hidden"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full overflow-hidden border-t border-line/70 bg-base/90 shadow-soft backdrop-blur-xl transition-all duration-300 ease-out md:hidden ${
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
