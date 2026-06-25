"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { projects, type Project } from "@/data/content";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import Icon from "@/components/ui/AppIcon";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block w-8 h-px bg-primary opacity-60" />
            <span className="section-label">03 — Projects</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="section-heading text-gradient-primary">My Works</h2>
            <p className="text-muted-foreground text-xs max-w-xs leading-relaxed" style={{ opacity: 0.6 }}>
              Security research, pentest write-ups, and lab builds.
              Click any card to read the full technical write-up.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setActiveProject}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title}
      >
        {activeProject && (
          <div>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="tag-badge">{tag}</span>
              ))}
            </div>
            <div className="markdown-content">
              <ReactMarkdown>{activeProject.fullWriteup}</ReactMarkdown>
            </div>
            {activeProject.mediumUrl && (
              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href={activeProject.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-accent inline-flex"
                >
                  <Icon name="ArrowTopRightOnSquareIcon" size={14} variant="outline" />
                  Read on Medium
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
