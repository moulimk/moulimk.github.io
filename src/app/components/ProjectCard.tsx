"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import ProjectCover from "./ProjectCover";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  const visibleTags = project.tags.slice(0, 5);
  const extra = project.tags.length - visibleTags.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="project-cell flex flex-col cursor-pointer group overflow-hidden"
      onClick={() => onOpen(project)}
    >
      {/* Generated cover art */}
      <ProjectCover project={project} index={index} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Title */}
        <h3 className="font-mono text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Short description */}
        <p
          className="text-muted-foreground text-xs leading-relaxed clamp-3"
          style={{ opacity: 0.7 }}
        >
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
          {extra > 0 && <span className="tag-badge">+{extra}</span>}
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex items-center justify-between pt-1">
            <span
              className="font-mono text-[0.62rem] tracking-[0.18em] text-muted-foreground"
              style={{ opacity: 0.45 }}
            >
              VIEW WRITE-UP
            </span>
            <span className="font-mono text-xs text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Open →
            </span>
          </div>
          {/* Bottom line reveal */}
          <div className="mt-3 h-px w-0 group-hover:w-full bg-primary/30 transition-all duration-500 ease-out" />
        </div>
      </div>
    </motion.div>
  );
}
