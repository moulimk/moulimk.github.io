"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "4+", label: "Years in IT & Security" },
  { value: "7+", label: "Projects Built" },
  { value: "50+", label: "CTF / THM Rooms" },
];

const story = [
  `Honestly, I wasn't supposed to end up in tech. I started 11th grade as a biology major — the safe, sensible path. But all my friends were in Computer Science and watching them code made me restless. I borrowed their C++ textbook over the summer, failed at it pretty spectacularly, and somehow got more curious instead of less. They started teaching me. One thing led to another, and I turned down a medical college seat to switch to CS — a decision most people around me thought was a bad idea at the time.`,

  `In my second year, I stumbled into an ethical hacking workshop. Phishing simulations, CTF puzzles, red vs. blue team stuff — it clicked immediately in a way nothing else had. I went deep on networking, built university-scale networks in Packet Tracer just to actually understand how it all fits together. When COVID hit, I used the lockdown to get my CEH. That cert was the first thing I'd worked toward entirely on my own terms, and finishing it felt different. After my BTech I applied to Birmingham for an MSc in Cybersecurity — penetration testing, malware analysis, digital forensics, embedded security. Exactly what I wanted.`,

  `Since graduating I've been working as an IT Systems Analyst in Birmingham — M365, Entra ID, Hyper-V, multi-site infrastructure. Real work, and I've learned a lot from it. But the security side is where I build on the side and where I want to go full-time: a SOC lab on GCP, an AWS CloudTrail threat detection platform, IoT pentesting on Alexa hardware, ARM firmware reversing on a Raspberry Pi. SOC analyst, detection engineer, junior pentester — somewhere I can dig into the actual threat side properly.`,
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const paragraphVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.15 + i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="about" ref={ref} className="py-28 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-px overflow-hidden hidden md:block">
        <motion.div
          style={{ scaleY: lineScale, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block w-8 h-px bg-primary opacity-60" />
            <span className="section-label">01 — About</span>
          </div>
          <h2 className="section-heading text-gradient-primary">Backstory</h2>
        </motion.div>

        <div className="space-y-6" style={{ lineHeight: "1.9" }}>
          {story.map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={paragraphVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-muted-foreground text-sm leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-8 pt-10 mt-10 border-t border-border"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.7 + i * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
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
