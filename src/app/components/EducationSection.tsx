"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  rank: string;
  rankLabel: string;
  grade?: string;
  modules: string[];
}

const education: EducationEntry[] = [
  {
    degree: "MSc Cybersecurity",
    institution: "University of Birmingham",
    location: "Birmingham, UK",
    period: "2023 — 2024",
    rank: "#81",
    rankLabel: "QS World 2025",
    modules: [
      "Penetration Testing",
      "Malware Analysis",
      "Digital Forensics",
      "Network Security",
      "Cloud Security",
      "Embedded Systems Security",
    ],
  },
  {
    degree: "BTech — Computer Science & Engineering",
    institution: "SRM Institute of Science and Technology",
    location: "Chennai, India",
    period: "2018 — 2022",
    rank: "Top 20",
    rankLabel: "Engineering (NIRF 2024)",
    grade: "First Class with Distinction · Dean's List",
    modules: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Database Management",
      "Software Engineering",
      "Cryptography",
    ],
  },
];

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" ref={ref} className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block w-8 h-px bg-primary opacity-60" />
            <span className="section-label">02 — Education</span>
          </div>
          <h2 className="section-heading text-gradient-primary">Academic Background</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((entry, i) => (
            <motion.div
              key={entry.institution}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-lg p-6 flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase mb-1.5">
                    {entry.period}
                  </p>
                  <h3 className="font-mono text-sm font-semibold text-foreground leading-snug">
                    {entry.degree}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    {entry.institution}
                  </p>
                  <p className="font-mono text-[0.65rem] text-muted-foreground/50 mt-0.5">
                    {entry.location}
                  </p>
                </div>

                {/* Rank badge */}
                <div className="flex-shrink-0 text-right">
                  <div
                    className="inline-flex flex-col items-end px-3 py-2 rounded border border-primary/20"
                    style={{ background: "rgba(57,219,48,0.05)" }}
                  >
                    <span className="font-mono text-base font-bold text-primary leading-none">
                      {entry.rank}
                    </span>
                    <span className="font-mono text-[0.55rem] text-muted-foreground/60 mt-1 leading-tight text-right">
                      {entry.rankLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grade if present */}
              {entry.grade && (
                <p className="font-mono text-[0.65rem] text-primary/60 tracking-wide">
                  {entry.grade}
                </p>
              )}

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Modules */}
              <div>
                <p className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-3">
                  Key Modules
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.modules.map((mod) => (
                    <span key={mod} className="tag-badge">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
