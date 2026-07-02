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
    transition: { staggerChildren: 0.065, delayChildren: 0.75 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 22 },
  },
};

const popoverVariants = {
  hidden: { opacity: 0, scaleY: 0.2, scaleX: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.1 },
      scaleY: { type: "spring" as const, stiffness: 440, damping: 26 },
      scaleX: { type: "spring" as const, stiffness: 440, damping: 26 },
      staggerChildren: 0.045,
      delayChildren: 0.07,
    },
  },
};

const popoverItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
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
            style={{ transformOrigin: "bottom center" }}
            className="border-border/60 bg-background/80 absolute bottom-full left-1/2 z-60 mb-4 flex min-w-44 -translate-x-1/2 flex-col gap-0.5 rounded-2xl border p-2 shadow-xs backdrop-blur-xs"
          >
            {item.children?.map((child) => (
              <motion.div key={child.href} variants={popoverItemVariants}>
                {isExternal(child.href) ? (
                  <a
                    href={child.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsPopoverOpen(false)}
                    className="text-foreground/80 hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors"
                  >
                    {child.icon !== null && child.icon !== undefined && (
                      <span className="flex size-5 shrink-0 items-center justify-center">
                        {child.icon}
                      </span>
                    )}
                    <span>{child.label}</span>
                  </a>
                ) : (
                  <Link
                    href={child.href as Route}
                    onClick={() => setIsPopoverOpen(false)}
                    className="text-foreground/80 hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors"
                  >
                    {child.icon !== null && child.icon !== undefined && (
                      <span className="flex size-5 shrink-0 items-center justify-center">
                        {child.icon}
                      </span>
                    )}
                    <span>{child.label}</span>
                  </Link>
                )}
              </motion.div>
            ))}
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
    themeLabel = isDark ? "Lumos" : "Nox";
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
        <span className="flex size-8 shrink-0 items-center justify-center">
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
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 shadow-xs">
      {/* Slide-in + expanding pill — border/bg here so they're always visible as it grows */}
      <motion.div
        initial={{ opacity: 0, y: 28, width: "3.5rem" }}
        animate={{ opacity: 1, y: 0, width: "auto" }}
        transition={{
          opacity: { duration: 0.25, ease: "easeOut" as const },
          y: { type: "spring" as const, stiffness: 320, damping: 28 },
          width: { delay: 0.4, duration: 0.5, ease: [0.25, 0, 0, 1] as const },
        }}
        className="border-border/60 bg-background/80 rounded-2xl border p-2 backdrop-blur-xs"
      >
        {/* Inner row — always at natural width; clipped by parent during expansion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-1"
          style={{ width: "max-content" }}
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
          {themeToggle && <DockThemeButton />}
        </motion.div>
      </motion.div>
    </div>
  );
}
