"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { TiltedCard } from "@/components/ui/tilted-card";
import { TerminalCommand } from "@/components/ui/terminal-command";
import { CONTACT_CARDS, type ContactCardEntry } from "./constants";

const ctaOverlay = (
  <div className="flex h-full w-full flex-col items-center justify-end pb-10 md:pb-14">
    <div className="from-primary/0 to-primary/80 flex w-full flex-wrap justify-center gap-4 bg-linear-to-b px-10 pt-12">
      <Button
        asChild
        size="lg"
        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
      >
        <a href="#contact">Start a project</a>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
      >
        <a href="#contact">Let&ampos;s talk</a>
      </Button>
    </div>
  </div>
);

export function ContactCard() {
  const [card, setCard] = useState<ContactCardEntry>(CONTACT_CARDS[0]!);

  useEffect(() => {
    const entry = CONTACT_CARDS[Math.floor(Math.random() * CONTACT_CARDS.length)];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pick must happen post-mount to avoid SSR/client hydration mismatch
    if (entry) setCard(entry);
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltedCard
            containerHeight="auto"
            containerWidth="100%"
            scaleOnHover={1.02}
            rotateAmplitude={8}
            showMobileWarning={false}
            showTooltip={false}
            overlayContent={ctaOverlay}
            displayOverlayContent={true}
          >
            <div className="bg-primary flex w-full flex-col items-center rounded-3xl p-10 text-center md:p-14">
              {/* Header */}
              <div className="mb-8">
                <TerminalCommand variant="onPrimary" className="mb-3">
                  brew --idea brew --idea
                </TerminalCommand>
                <h2
                  className="font-heading text-primary-foreground font-bold"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
                >
                  {card.title}
                </h2>
                <p className="text-primary-foreground/60 mt-4 max-w-lg text-base leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Spacer so content doesn't sit behind the overlay buttons */}
              <div className="h-20" />
            </div>
          </TiltedCard>
        </motion.div>
      </div>
    </section>
  );
}
