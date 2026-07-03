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
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        {/* whoami with block cursor */}
        <TypingAnimation
          className="text-muted-foreground font-mono text-base tracking-widest md:text-lg"
          cursorStyle="block"
          showCursor
          blinkCursor
          loop
          pauseDelay={9999999}
          startOnView={false}
        >
          whoami
        </TypingAnimation>

        {/* Jay Pancholi */}
        <h1
          className="font-heading text-foreground leading-none font-bold"
          style={{ fontSize: "clamp(4rem, 12vw, 14rem)" }}
        >
          Jay Pancholi
        </h1>

        {/* I'm a <role> */}
        <div className="text-muted-foreground flex items-center gap-2 text-2xl md:text-3xl">
          <span>I&apos;m a</span>
          <HyperText
            key={currentRole}
            as="span"
            className="text-primary font-semibold"
            startOnView={false}
            animateOnHover={false}
            duration={600}
          >
            {currentRole}
          </HyperText>
        </div>
      </div>

      {/* Muggle watermark — slides up from below, stops 65% visible */}
      <motion.div
        className="font-heading text-foreground/12 pointer-events-none absolute bottom-0 leading-none font-bold select-none"
        style={{ left: "50%", fontSize: "clamp(6rem, 22vw, 26rem)" }}
        initial={{ x: "-50%", y: "100%" }}
        animate={{ x: "-50%", y: "35%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        Muggle
      </motion.div>
    </section>
  );
}
