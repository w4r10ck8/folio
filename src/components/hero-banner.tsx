"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { ArrowUpRight } from "lucide-react";

import { CURRENT_EMPLOYER, CURRENT_EMPLOYER_URL } from "@/lib/constants";
import { HyperText } from "@/components/ui/hyper-text";
import { TerminalCommand } from "@/components/ui/terminal-command";

const ROLES = [
  "Full Stack Developer",
  "Computer Scientist",
  "Software Engineer",
  "TypeScript Alchemist",
  "React Specialist",
  "Next.js Architect",
  "JavaScript Craftsman",
  "Accessibility Advocate",
  "DX Enthusiast",
  "CSS Wizard",
  "Tailwind Sorcerer",
  "Pixel Perfectionist",
  "Animation Magician",
  "Git Archaeologist",
  "CI/CD Tinkerer",
  "Automation Addict",
  "Clean Code Believer",
  "Problem Solver",
  "Architecture Enthusiast",
  "Tech Explorer",
  "Lifelong Learner",
  "Open Source Admirer",
  "CLI Power User",
  "Terminal Dweller",
  "Vim Enthusiast",
  "Keyboard Aficionado",
  "Coffee-Powered Developer",
  "Rubber Duck Negotiator",
  "Caffeine-Fueled Coder",
  "Merge Conflict Survivor",
  "Prolific Emoji Conjurer",
  "Digital Craftsman",
  "Code Artisan",
  "Build Once Improve Forever",
];

export function HeroBanner() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const { scrollY } = useScroll();
  // Starts sliding down and out as soon as scroll begins - the reverse of
  // the bottom-up entrance. clamp:false keeps extrapolating past 400px so
  // it never scrolls back into view once it's gone.
  const exitY = useTransform(scrollY, [0, 400], [0, 900], { clamp: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentRole = ROLES[currentRoleIndex] as string;

  return (
    <>
      <section className="relative flex h-screen items-center justify-center">
        {/* Left-aligned content within centered padded container */}
        <div className="f relative z-10 container flex-col items-start gap-3 px-6">
          {/* whoami with block cursor */}
          <TerminalCommand size="base">whoami</TerminalCommand>

          {/* Jay Pancholi */}
          <h1
            className="font-heading leading-none font-bold"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
          >
            <span className="text-foreground block">Jay</span>
            <span className="text-primary block">Pancholi</span>
          </h1>

          {/* I'm a <role> */}
          <div className="mt-8 flex items-center gap-6">
            <a
              href={CURRENT_EMPLOYER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border bg-card hover:border-primary/50 relative inline-flex flex-col gap-0.5 rounded border px-3 py-2 backdrop-blur-xs"
            >
              <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                Current Session
              </span>
              <span className="text-primary font-mono text-sm font-bold">
                @ {CURRENT_EMPLOYER.toUpperCase()}
              </span>
              <ArrowUpRight className="text-primary absolute top-2 right-2 size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="text-muted-foreground gap flex flex-row items-center gap-1">
              <span className="text-base md:text-lg">$</span>
              <HyperText
                key={currentRole}
                as="span"
                className="text-primary font-mono text-base"
                startOnView={false}
                animateOnHover={false}
                duration={600}
              >
                {currentRole}
              </HyperText>
            </div>
          </div>
        </div>

        {/* Muggle + BORN - fixed+clipped to the viewport so the exit slide never
            inflates document scroll height, then slides down the way it entered */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden select-none" aria-hidden>
          <motion.div
            className="absolute bottom-0 flex items-end"
            style={{ left: "50%", x: "-50%", y: exitY }}
          >
            <motion.div
              className="flex items-end"
              initial={{ y: "100%" }}
              animate={{ y: "15%" }}
              transition={{ duration: 2, ease: [0.16, 1, 0.2, 1], delay: 1 }}
            >
              <span
                className="font-heading text-foreground/10 leading-none font-bold"
                style={{ fontSize: "clamp(6rem, 22vw, 26rem)" }}
              >
                Muggle
              </span>
              {/* BORN stacked vertically, height matches Muggle */}
              <div
                className="font-heading flex flex-col leading-none font-bold"
                style={{
                  fontSize: "clamp(1.5rem, 4.5vw, 6.5rem)",
                  marginBottom: "clamp(1rem, 3vw, 3rem)",
                }}
              >
                {(["B", "O", "R", "N"] as const).map((letter, i) => (
                  <motion.span
                    key={letter}
                    style={{
                      WebkitTextStroke: "2px var(--color-primary)",
                      color: "transparent",
                      display: "block",
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.4 }}
                    transition={{
                      duration: 1.0,
                      delay: 1.5 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
