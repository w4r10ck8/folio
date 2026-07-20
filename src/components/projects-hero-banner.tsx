// src/components/projects-hero-banner.tsx
"use client";

import { motion } from "motion/react";

const TAGLINE =
  "A selection of digital tools, experiments, and technical curiosities. From secure vanishing secrets to goblin-grade financial vaults.";

export function ProjectsHeroBanner() {
  return (
    <section className="container px-6 pt-32 pb-12">
      <motion.div
        className="flex flex-col gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="font-heading text-foreground leading-none font-bold"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Crafted <span className="text-primary">Incantations</span>
        </h1>
        <p className="text-muted-foreground max-w-xl text-base md:text-lg">{TAGLINE}</p>
      </motion.div>
    </section>
  );
}
