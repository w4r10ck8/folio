"use client";

import { motion } from "motion/react";

import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="mb-2 font-mono text-sm" style={{ color: "var(--matrix-green)" }}>
            $ mail --compose
          </p>
          <h2
            className="font-heading text-foreground font-bold"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Get in touch
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
