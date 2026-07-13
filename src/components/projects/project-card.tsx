// src/components/projects/project-card.tsx
"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { HobbyProject, Project, ProjectStatus } from "@/lib/constants/projects";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  wip: { label: "WIP", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  archived: { label: "Archived", className: "bg-muted text-muted-foreground border-border" },
  "closed-beta": {
    label: "Closed Beta",
    className: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
};

export function StatusBadge({ status }: { status: ProjectStatus }): ReactNode {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

function getInitials(title: string): string {
  return title
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0] as string)
    .join("")
    .slice(0, 2);
}

export function ProjectThumbnail({ project }: { project: Project }): ReactNode {
  const initials = getInitials(project.title);

  if (project.thumbnail) {
    return (
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="bg-muted relative flex aspect-video w-full items-center justify-center overflow-hidden">
      <span
        className="font-heading text-foreground/10 leading-none font-bold select-none"
        style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
      >
        {initials}
      </span>
    </div>
  );
}

export function CardInner({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}): ReactNode {
  const initials = getInitials(project.title);

  return (
    <>
      {/* Image — clickable, scales on hover */}
      <div className="group cursor-pointer p-3" onClick={onSelect}>
        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-lg"
          data-cursor-expand
          whileTap={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="bg-muted flex h-full items-center justify-center">
              <span
                className="font-heading text-foreground/10 leading-none font-bold select-none"
                style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
              >
                {initials}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="flex items-start justify-between gap-3 px-4 pb-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-heading text-foreground truncate text-lg leading-tight font-bold">
            {project.title}
          </h3>
          <p className="text-muted-foreground truncate text-sm">{project.subtitle}</p>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={project.status} />
            {project.featured && <span className="text-primary font-mono text-xs">✦ Featured</span>}
          </div>
        </div>

        <div className="flex shrink-0 gap-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-muted text-muted-foreground hover:bg-accent hover:text-foreground rounded-xl p-2.5 transition-colors"
              aria-label="View source code"
            >
              <Code2 className="size-4" />
            </a>
          )}
          {project.preview && (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-muted text-muted-foreground hover:bg-accent hover:text-foreground rounded-xl p-2.5 transition-colors"
              aria-label="View live preview"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isSelected: boolean;
  onSelect: (project: Project) => void;
}

interface HobbyProjectCardProps {
  project: HobbyProject;
  index: number;
}

export function HobbyProjectCard({ project, index }: HobbyProjectCardProps): ReactNode {
  const Icon = project.icon;

  return (
    <motion.div
      className="bg-card border-border overflow-hidden rounded-xl border backdrop-blur-sm"
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.65 + index * 0.08,
      }}
    >
      {/* Icon thumbnail */}
      <div className="bg-muted relative flex aspect-video w-full items-center justify-center overflow-hidden p-3">
        <div className="bg-card/60 flex items-center justify-center rounded-2xl p-6">
          <Icon className="text-muted-foreground size-36 stroke-[1.25]" />
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-start justify-between gap-3 px-4 py-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-heading text-foreground truncate text-lg leading-tight font-bold">
            {project.title}
          </h3>
          <p className="text-muted-foreground truncate text-sm">{project.subtitle}</p>
        </div>

        <div className="flex shrink-0 gap-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted text-muted-foreground hover:bg-accent hover:text-foreground rounded-xl p-2.5 transition-colors"
              aria-label="View source code"
            >
              <Code2 className="size-4" />
            </a>
          )}
          {project.preview && (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted text-muted-foreground hover:bg-accent hover:text-foreground rounded-xl p-2.5 transition-colors"
              aria-label="View live preview"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectCard({ project, index, isSelected, onSelect }: ProjectCardProps): ReactNode {
  const hasAnimatedIn = useRef(false);

  const sharedClass = cn(
    "bg-card border-border rounded-xl border overflow-hidden backdrop-blur-sm",
    project.featured && "border-primary/25",
  );

  return (
    <div>
      {isSelected ? (
        // Invisible placeholder — maintains exact grid space while card is shown as modal
        <div className={cn(sharedClass, "invisible")} aria-hidden>
          <CardInner project={project} onSelect={() => {}} />
        </div>
      ) : (
        <motion.div
          layoutId={`project-${project.title}`}
          className={sharedClass}
          // eslint-disable-next-line react-hooks/refs
          initial={hasAnimatedIn.current ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            // eslint-disable-next-line react-hooks/refs
            delay: hasAnimatedIn.current ? 0 : 0.65 + index * 0.08,
          }}
          onAnimationComplete={() => {
            hasAnimatedIn.current = true;
          }}
        >
          <CardInner project={project} onSelect={() => onSelect(project)} />
        </motion.div>
      )}
    </div>
  );
}
