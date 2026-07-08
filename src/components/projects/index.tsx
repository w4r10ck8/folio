// src/components/projects/index.tsx
"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { PROJECTS } from "@/lib/constants/projects";
import type { Project } from "@/lib/constants/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { ProjectFilters } from "@/components/projects/project-filters";
import type { StatusFilter } from "@/components/projects/project-filters";

export function Projects(): ReactNode {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = [...PROJECTS]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .filter((p) => statusFilter === "all" || p.status === statusFilter);

  return (
    <section className="container px-6 pb-24">
      <div className="flex flex-col gap-8">
        <ProjectFilters statusFilter={statusFilter} onStatusChange={setStatusFilter} />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.title}
                index={index}
                project={project}
                isSelected={selectedProject?.title === project.title}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-16 text-center font-mono text-sm">
            No projects match the current filters.
          </p>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
