"use client";

import { ArrowUpRight, Github, Info, Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

import { ContactForm } from "./contact-form";

const EASE = [0.16, 1, 0.3, 1] as const;

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: Linkedin, href: ROUTE_MANAGER.external.linkedin },
  { label: "GitHub", icon: Github, href: ROUTE_MANAGER.external.github },
  { label: "Instagram", icon: Instagram, href: ROUTE_MANAGER.external.instagram },
];

export function Contact() {
  return (
    <section className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20 text-center"
        >
          <h1
            className="font-heading text-foreground mb-4 font-bold [text-wrap:balance]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Let&rsquo;s work together.
          </h1>
          <p className="text-muted-foreground -a mx-auto max-w-lg text-balance">
            Whether you have a specific project in mind or just want to chat about technical
            precision and modern design, I&rsquo;m always open to new connections.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: Direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="space-y-4"
          >
            <p className="text-primary idest font-mono text-xs font-semibold uppercase">
              Direct Channels
            </p>

            <a
              href={ROUTE_MANAGER.external.email}
              className="border-border/60 bg-background hover:bg-muted/40 group flex items-center justify-between rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-muted-foreground text-muted-foregroono trawppdpcasp text-xs">
                    Email
                  </p>
                  <p className="text-foreground font-medium">
                    {ROUTE_MANAGER.external.email.replace("mailto:", "")}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-muted-foreground group-hover:text-foreground shrink-0 transition-colors"
              />
            </a>

            <div className="grid grid-cols-3 gap-3">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border/60 bg-background hover:bg-muted/40 flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors"
                >
                  <Icon size={20} className="text-foreground" />
                  <span className="text-muted-foreground text-xs">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="border-border/60 bg-background/60 flex flex-col rounded-2xl border p-6 backdrop-blur-sm sm:p-8"
          >
            <h2 className="font-heading text-foreground mb-6 text-xl font-semibold">
              Send a message
            </h2>
            <ContactForm />
            <Alert className="mt-6">
              <Info size={14} />
              <AlertDescription>
                Typically responding within 24 hours. For urgent matters, please reach out directly
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
