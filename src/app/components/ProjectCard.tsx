"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="project-cell p-7 flex flex-col gap-5 cursor-pointer group"
      onClick={() => onOpen(project)}
    >
      {/* Index + arrow row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground" style={{ opacity: 0.4 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <motion.span
          className="font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          Open →
        </motion.span>
      </div>

      {/* Title */}
      <h3 className="font-mono text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
        {project.title}
      </h3>

      {/* Short description */}
      <p className="text-muted-foreground text-xs leading-relaxed flex-1" style={{ opacity: 0.7 }}>
        {project.shortDescription}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-badge">
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom line reveal */}
      <div className="h-px w-0 group-hover:w-full bg-primary/30 transition-all duration-500 ease-out" />
    </motion.div>
  );
}