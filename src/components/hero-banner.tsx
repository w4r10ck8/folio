"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { HyperText } from "@/components/ui/hyper-text";
import { TypingAnimation } from "@/components/ui/typing-animation";

const ROLES = [
  "Full Stack Developer",
  "Computer Scientist",
  "Web Wizard",
  "TypeScript Alchemist",
  "Tailwind Sorcerer",
  "Vim Enthusiast",
  "Caffeine-Fueled Coder",
  "Prolific Emoji Conjurer",
];

export function HeroBanner() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentRole = ROLES[currentRoleIndex] as string;

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Left-aligned content within centered padded container */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-start gap-3 px-6">
        {/* whoami with block cursor */}
        <div className="flex items-center gap-1.5" style={{ color: "var(--matrix-green)" }}>
          <span className="font-mono text-base md:text-lg">$</span>
          <TypingAnimation
            className="font-mono text-base tracking-widest md:text-lg"
            cursorStyle="block"
            showCursor
            blinkCursor
            loop
            pauseDelay={9999999}
            startOnView={false}
          >
            whoami
          </TypingAnimation>
        </div>

        {/* Jay Pancholi */}
        <h1
          className="font-heading leading-none font-bold"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          <span className="text-foreground block">Jay</span>
          <span className="text-primary block">Pancholi</span>
        </h1>

        {/* I'm a <role> */}
        <div className="text-muted-foreground flex flex-col items-start gap-0.5 md:flex-row md:items-center md:gap-2">
          <span className="text-base md:text-lg">I&apos;m a</span>
          <HyperText
            key={currentRole}
            as="span"
            className="text-primary fon text-base"
            startOnView={false}
            animateOnHover={false}
            duration={600}
          >
            {currentRole}
          </HyperText>
        </div>
      </div>

      {/* Muggle + BORN — unified container slides up from below */}
      <motion.div
        className="pointer-events-none absolute bottom-0 flex items-end select-none"
        style={{ left: "50%" }}
        initial={{ x: "-50%", y: "100%" }}
        animate={{ x: "-50%", y: "15%" }}
        transition={{ duration: 2, ease: [0.16, 1, 0.2, 1], delay: 1 }}
      >
        <span
          className="font-heading text-foreground/30 leading-none font-bold"
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
    </section>
  );
}
