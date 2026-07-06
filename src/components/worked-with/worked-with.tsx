"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { NumberTicker } from "@/components/ui/number-ticker";
import { COMPANIES, STATS } from "./constants";

export function WorkedWith() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-primary rounded-3xl p-10 md:p-14"
        >
          {/* Header */}
          <div className="mb-12">
            <p className="text-primary-foreground/50 mb-3 font-mono text-sm">$ ls ./clients</p>
            <h2
              className="font-heading text-primary-foreground font-bold"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              You may see me or my work
            </h2>
          </div>

          {/* Company logos */}
          <div className="mb-12 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 md:grid-cols-4">
            {COMPANIES.map((company, i) => (
              <motion.a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {company.noFilter ? (
                  <span className="flex items-center justify-center rounded-md bg-white/90 px-3 py-1.5">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={160}
                      height={60}
                      style={{ width: "auto", height: "38px" }}
                      className="object-contain"
                    />
                  </span>
                ) : (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={160}
                    height={60}
                    style={{ width: "auto", height: "48px" }}
                    className="object-contain [filter:brightness(0)_invert(1)]"
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="bg-primary-foreground/20 mb-12 h-px" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="text-primary-foreground font-heading font-bold tabular-nums"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  {stat.value !== null ? (
                    <>
                      <NumberTicker
                        value={stat.value}
                        delay={0.3 + i * 0.08}
                        className="text-primary-foreground font-heading font-bold"
                      />
                      {stat.suffix}
                    </>
                  ) : (
                    <span style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}>{stat.suffix}</span>
                  )}
                </div>
                <div className="text-primary-foreground/60 mt-1 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
