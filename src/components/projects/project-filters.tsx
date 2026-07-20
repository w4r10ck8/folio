// src/components/projects/project-filters.tsx
"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/constants/projects";

export type StatusFilter = "all" | ProjectStatus;

const STATUS_OPTIONS: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "wip", label: "WIP" },
  { value: "closed-beta", label: "Closed Beta" },
  { value: "archived", label: "Archived" },
];

interface ProjectFiltersProps {
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}): ReactNode {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-border rounded-full border px-3 py-1 font-mono text-xs transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export function ProjectFilters({ statusFilter, onStatusChange }: ProjectFiltersProps): ReactNode {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_OPTIONS.map(({ value, label }) => (
        <FilterPill
          key={value}
          label={label}
          active={statusFilter === value}
          onClick={() => onStatusChange(value)}
        />
      ))}
    </div>
  );
}
