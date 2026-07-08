// src/components/projects/project-modal.tsx
"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, Github, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/projects/project-card";
import type { Project } from "@/lib/constants/projects";

function getInitials(title: string): string {
  return title
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0] as string)
    .join("")
    .slice(0, 2);
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps): ReactNode {
  const initials = getInitials(project.title);

  // Lock body scroll — compensate for scrollbar width to prevent layout shift
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Full-screen modal: stacked on mobile, two-column on desktop */}
      <motion.div
        layoutId={`project-${project.title}`}
        className="bg-card md:border-border fixed inset-0 z-[100] flex flex-col overflow-hidden md:inset-4 md:flex-row md:rounded-2xl md:border md:shadow-2xl"
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Image panel — aspect-video on mobile, fills height on desktop */}
        <div className="bg-muted relative aspect-video w-full shrink-0 overflow-hidden md:aspect-auto md:w-[45%]">
          {project.thumbnail ? (
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span
                className="font-heading text-foreground/10 leading-none font-bold select-none"
                style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
              >
                {initials}
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            className="bg-background/80 hover:bg-background absolute top-3 right-3 rounded-lg p-1.5 backdrop-blur-sm transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable content panel */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            {project.featured && <span className="text-primary font-mono text-xs">✦ Featured</span>}
          </div>

          <div>
            <h2 className="font-heading text-foreground text-2xl font-bold">{project.title}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{project.subtitle}</p>
          </div>

          <p className="text-foreground/80 text-sm leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.github ?? project.preview) && (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-1.5"
                  >
                    <Github className="size-3.5" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.preview && (
                <Button asChild size="sm">
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-1.5"
                  >
                    <ExternalLink className="size-3.5" />
                    Live Preview
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
