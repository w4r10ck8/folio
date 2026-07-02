"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

export type DockChildItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

export type DockNavItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: Array<DockChildItem>;
};

export type DockSeparator = { type: "separator" };

export type DockItem = DockNavItem | DockSeparator;

interface DockProps {
  items: Array<DockItem>;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function isSeparator(item: DockItem): item is DockSeparator {
  return "type" in item && item.type === "separator";
}

function isExternal(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function computeIsActive(href: string | undefined, pathname: string): boolean {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// ── Animation variants ─────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 22 },
  },
};

const popoverVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 28 },
  },
};

// ── DockItemButton (internal) ──────────────────────────────────────────────

function DockItemButton({ item }: { item: DockNavItem }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const hasChildren = Boolean(item.children?.length);
  const isActive = computeIsActive(item.href, pathname);

  // Close popover on outside click or Escape
  useEffect(() => {
    if (!isPopoverOpen) return;

    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPopoverOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isPopoverOpen]);

  const buttonClassName = cn(
    "flex w-16 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium leading-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
    isActive
      ? "bg-accent text-accent-foreground"
      : "text-foreground/70 hover:bg-accent/50 hover:text-foreground",
  );

  const itemIcon =
    item.icon !== null && item.icon !== undefined ? (
      <span className="flex size-8 shrink-0 items-center justify-center">{item.icon}</span>
    ) : null;

  let dockElement: ReactNode;
  if (hasChildren) {
    dockElement = (
      <button
        type="button"
        aria-expanded={isPopoverOpen}
        aria-haspopup="menu"
        onClick={() => setIsPopoverOpen((v) => !v)}
        className={buttonClassName}
      >
        {itemIcon}
        <span className="w-full truncate text-center">{item.label}</span>
      </button>
    );
  } else if (item.href !== undefined && isExternal(item.href)) {
    dockElement = (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
        {itemIcon}
        <span className="w-full truncate text-center">{item.label}</span>
      </a>
    );
  } else {
    dockElement = (
      <Link href={(item.href ?? "/") as Route} className={buttonClassName}>
        {itemIcon}
        <span className="w-full truncate text-center">{item.label}</span>
      </Link>
    );
  }

  return (
    <motion.div ref={containerRef} variants={itemVariants} className="relative">
      {/* Children popover — fan card above the dock item */}
      <AnimatePresence>
        {isPopoverOpen && hasChildren && (
          <motion.div
            key="popover"
            variants={popoverVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute bottom-full left-1/2 z-60 mb-3 -translate-x-1/2"
          >
            <div className="border-border bg-popover flex min-w-37.5 flex-col gap-0.5 rounded-2xl border p-1 shadow-lg">
              {item.children?.map((child, i) => (
                <motion.div
                  key={child.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.045, duration: 0.2, ease: "easeOut" as const },
                  }}
                >
                  {isExternal(child.href) ? (
                    <a
                      href={child.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsPopoverOpen(false)}
                      className="text-foreground/80 hover:bg-accent hover:text-accent-foreground flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors"
                    >
                      {child.icon !== null && child.icon !== undefined && (
                        <span className="flex size-5 shrink-0 items-center justify-center">
                          {child.icon}
                        </span>
                      )}
                      {child.label}
                    </a>
                  ) : (
                    <Link
                      href={child.href as Route}
                      onClick={() => setIsPopoverOpen(false)}
                      className="text-foreground/80 hover:bg-accent hover:text-accent-foreground flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors"
                    >
                      {child.icon !== null && child.icon !== undefined && (
                        <span className="flex size-5 shrink-0 items-center justify-center">
                          {child.icon}
                        </span>
                      )}
                      {child.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock item — button for children items, Link for nav items */}
      {dockElement}
    </motion.div>
  );
}

// ── DockThemeButton (internal) ─────────────────────────────────────────────

function DockThemeButton({ duration = 400 }: { duration?: number }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      { duration, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
    );
  }, [isDark, setTheme, duration]);

  let themeLabel = "Theme";
  if (mounted) {
    themeLabel = isDark ? "Light" : "Dark";
  }

  return (
    <motion.div variants={itemVariants}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          void toggleTheme();
        }}
        aria-label="Toggle theme"
        className="text-foreground/70 hover:bg-accent/50 hover:text-foreground focus-visible:ring-ring flex w-16 flex-col items-center gap-1 rounded-xl py-2 text-[10px] leading-none font-medium transition-colors outline-none focus-visible:ring-2"
      >
        <span className="flex size-10 shrink-0 items-center justify-center">
          {mounted && isDark ? <Sun size={24} /> : <Moon size={24} />}
        </span>
        <span className="w-full truncate text-center">{themeLabel}</span>
      </button>
    </motion.div>
  );
}

// ── Dock ───────────────────────────────────────────────────────────────────

interface DockProps {
  items: Array<DockItem>;
  themeToggle?: boolean;
}

export function Dock({ items, themeToggle = false }: DockProps) {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="border-border/60 bg-background/80 flex items-center gap-1 rounded-2xl border px-3 py-2 backdrop-blur-xl"
      >
        {items.map((item, i) => {
          if (isSeparator(item)) {
            return (
              <motion.div
                key={`sep-${i}`}
                variants={itemVariants}
                className="bg-border mx-1 h-8 w-px shrink-0"
              />
            );
          }
          return <DockItemButton key={item.href ?? item.label} item={item} />;
        })}
        {themeToggle && (
          <>
            <motion.div variants={itemVariants} className="bg-border mx-1 h-8 w-px shrink-0" />
            <DockThemeButton />
          </>
        )}
      </motion.div>
    </div>
  );
}
