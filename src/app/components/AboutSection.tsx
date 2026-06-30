"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "4+", label: "Years in IT & Security" },
  { value: "7+", label: "Projects Built" },
  { value: "50+", label: "CTF / THM Rooms" },
];

type Stop = {
  num: string;
  title: string;
  color: string;
  icon: "network" | "code" | "pen" | "fork" | "shield";
  body: string;
};

const journey: Stop[] = [
  {
    num: "01",
    title: "The first network",
    color: "#39db30",
    icon: "network",
    body: "I got my start somewhere most people wouldn't volunteer to: a government office that needed its machines — and the schools under it — actually talking to each other. No title, no pay, just me, a stack of cables, and a network to bring up. That's where I learned a system is only something someone built — which means it's something you can take apart and understand.",
  },
  {
    num: "02",
    title: "Quitting medicine for a compiler",
    color: "#00bfff",
    icon: "code",
    body: "I was on the doctor track — med school, the sensible plan. But I kept drifting toward the screen, wondering how the software underneath actually worked. One Python crash course was all it took. I left medicine, switched to engineering, and fell for computers all over again.",
  },
  {
    num: "03",
    title: "The design desk",
    color: "#b46bff",
    icon: "pen",
    body: "Engineering handed me a second craft. I became my university's design lead — every asset we shipped, from web pages to printed posters, came through me for approval first. It sharpened an instinct I lean on in security: judging how something holds up the moment you look at it closely.",
  },
  {
    num: "04",
    title: "The fork",
    color: "#f5a623",
    icon: "fork",
    body: "Then the safe path showed up — a software-engineering offer to stay and build in India. I turned it down. Not because it wasn't a good offer, but because I'd found what I actually wanted to chase. I pointed myself at cybersecurity, moved to the UK for an MSc in it, and committed.",
  },
  {
    num: "05",
    title: "Now",
    color: "#39db30",
    icon: "shield",
    body: "By day I'm an IT Systems Analyst; by night and weekend I build the side I'm aiming for — detection-and-response tooling, labs I break on purpose, threat-hunting for fun. I'm after the role where that becomes the job: SOC, detection engineering, blue team. Same pull as that first office network — higher stakes.",
  },
];

function StopIcon({ icon, color }: { icon: Stop["icon"]; color: string }) {
  const p = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (icon === "network")
    return (
      <svg {...p}>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M7.6 7.4 10.7 16M16.4 7.4 13.3 16M8 6h8" />
      </svg>
    );
  if (icon === "code")
    return (
      <svg {...p}>
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      </svg>
    );
  if (icon === "pen")
    return (
      <svg {...p}>
        <path d="M4 20l4-1L18 8l-3-3L5 15l-1 5z" />
        <path d="M14 6l3 3" />
      </svg>
    );
  if (icon === "fork")
    return (
      <svg {...p}>
        <circle cx="7" cy="5" r="2" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="16" cy="13" r="2" />
        <path d="M7 7v10M7 11c0 2 1.9 3 4.2 3H13" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M12 3l7 3v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" ref={ref} className="py-28 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block w-8 h-px bg-primary opacity-60" />
            <span className="section-label">01 — About</span>
          </div>
          <h2 className="section-heading text-gradient-primary">Backstory</h2>
          <p className="text-muted-foreground text-xs mt-3" style={{ opacity: 0.55 }}>
            Five pit-stops from a stack of cables to a security career.
          </p>
        </motion.div>

        {/* Journey timeline */}
        <div ref={lineRef} className="relative pl-1">
          {/* route line (draws on scroll) */}
          <div className="absolute left-[23px] top-3 bottom-6 w-px bg-border" />
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className="absolute left-[23px] top-3 bottom-6 w-px bg-gradient-to-b from-primary via-accent to-primary"
          />

          <div className="flex flex-col gap-9">
            {journey.map((stop) => (
              <motion.div
                key={stop.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-5"
              >
                {/* checkpoint node */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                    style={{
                      background: `${stop.color}14`,
                      border: `1px solid ${stop.color}59`,
                      boxShadow: `0 0 22px ${stop.color}26`,
                    }}
                  >
                    <StopIcon icon={stop.icon} color={stop.color} />
                  </div>
                </div>

                {/* chapter content */}
                <div className="pt-1 pb-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className="font-mono text-[0.62rem] tracking-[0.25em]"
                      style={{ color: stop.color, opacity: 0.85 }}
                    >
                      {stop.num}
                    </span>
                    <h3 className="font-mono text-sm font-semibold text-foreground">
                      {stop.title}
                    </h3>
                  </div>
                  <p
                    className="text-muted-foreground text-sm leading-relaxed"
                    style={{ opacity: 0.75 }}
                  >
                    {stop.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-8 pt-10 mt-14 border-t border-border"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <p className="stat-value text-gradient-primary">{stat.value}</p>
              <p className="section-label" style={{ opacity: 0.5, fontSize: "0.62rem" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
