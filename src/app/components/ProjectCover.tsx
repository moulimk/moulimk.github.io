"use client";

import React from "react";
import type { Project } from "@/data/content";

/** Per-project accent + label for the generated cover art. */
const THEMES: Record<string, { color: string; label: string }> = {
  "aws-soar": { color: "#39db30", label: "CLOUD · SOAR" },
  "soc-lab-gcp": { color: "#00bfff", label: "BLUE TEAM · SOC" },
  "iot-pentest-alexa": { color: "#b46bff", label: "IOT · PENTEST" },
  "arm-emulation": { color: "#f5a623", label: "REVERSE ENGINEERING" },
  "malware-analysis": { color: "#ff4d4d", label: "MALWARE ANALYSIS" },
  "university-network": { color: "#4d8bff", label: "NETWORK DESIGN" },
  "soho-network": { color: "#2ee6c6", label: "NETWORK DESIGN" },
};

const FALLBACK = { color: "#39db30", label: "SECURITY" };

export default function ProjectCover({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { color, label } = THEMES[project.id] ?? FALLBACK;
  const n = String(index + 1).padStart(2, "0");
  const uid = project.id.replace(/[^a-z0-9]/gi, "");

  return (
    <div
      className="project-cover"
      style={{ borderBottom: `2px solid ${color}59` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`glow-${uid}`} cx="78%" cy="28%" r="85%">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="45%" stopColor={color} stopOpacity="0.08" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`dots-${uid}`}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill={color} opacity="0.16" />
          </pattern>
        </defs>

        <rect width="400" height="150" fill="#0b0b0c" />
        <rect width="400" height="150" fill={`url(#dots-${uid})`} />
        <rect width="400" height="150" fill={`url(#glow-${uid})`} />

        {/* node-graph constellation */}
        <g stroke={color} strokeOpacity="0.45" strokeWidth="1">
          <line x1="296" y1="36" x2="344" y2="66" />
          <line x1="344" y1="66" x2="312" y2="108" />
          <line x1="344" y1="66" x2="384" y2="40" />
          <line x1="296" y1="36" x2="312" y2="108" />
          <line x1="312" y1="108" x2="372" y2="118" />
        </g>
        <g fill={color}>
          <circle cx="296" cy="36" r="2.5" fillOpacity="0.8" />
          <circle cx="344" cy="66" r="4" fillOpacity="0.95" />
          <circle cx="312" cy="108" r="2.5" fillOpacity="0.7" />
          <circle cx="384" cy="40" r="2" fillOpacity="0.6" />
          <circle cx="372" cy="118" r="2" fillOpacity="0.6" />
        </g>

        {/* big faint index */}
        <text
          x="16"
          y="128"
          fontFamily="JetBrains Mono, monospace"
          fontSize="62"
          fontWeight="800"
          fill={color}
          fillOpacity="0.09"
        >
          {n}
        </text>

        {/* category label */}
        <text
          x="22"
          y="36"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          letterSpacing="3.5"
          fill={color}
          fillOpacity="0.9"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
