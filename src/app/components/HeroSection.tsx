"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Icon from "@/components/ui/AppIcon";
import AmbientBackground from "./MatrixCanvas";
import TypingEffect from "./TypingEffect";
import { socialLinks } from "@/data/content";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Ambient background */}
      <AmbientBackground />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 20%, #080808 80%)",
        }}
      />
      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <motion.div variants={lineVariants} className="mb-8 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-primary opacity-60" />
            <span className="section-label">Cybersecurity Professional</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={lineVariants}
            className="font-mono text-xl md:text-2xl text-muted-foreground mb-2 tracking-tight"
          >
            Hey, I&apos;m
          </motion.p>

          {/* Name — split into chars for dramatic entrance */}
          <motion.div variants={lineVariants}>
            <h1 className="hero-name text-gradient-primary mb-8 overflow-hidden">
              Mouli Kesavan
            </h1>
          </motion.div>

          {/* Typing line */}
          <motion.div
            variants={lineVariants}
            className="font-mono text-xl md:text-2xl text-foreground mb-8 flex items-baseline gap-2 flex-wrap"
          >
            <span className="text-muted-foreground">I</span>
            <TypingEffect />
            <span className="text-muted-foreground">things.</span>
          </motion.div>

          {/* Subtext */}
          <motion.div variants={lineVariants} className="max-w-lg space-y-2 mb-10">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Offensive security specialist with a passion for breaking systems
              to make them stronger.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Red teaming, web app pentesting, AD attacks, and detection
              engineering — I operate across the full kill chain.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={lineVariants} className="flex flex-wrap gap-3">
            <a href={`mailto:${socialLinks?.email}`} className="btn-ghost-neon">
              <Icon name="EnvelopeIcon" size={14} variant="outline" />
              Send an Email
            </a>
            <a
              href={socialLinks?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-accent"
            >
              <Icon name="LinkIcon" size={14} variant="outline" />
              LinkedIn
            </a>
            <a
              href={socialLinks?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-neon"
            >
              <Icon name="CodeBracketIcon" size={14} variant="outline" />
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToProjects}
      >
        <span className="section-label" style={{ fontSize: "0.6rem" }}>Scroll</span>
        <div className="scroll-indicator text-muted-foreground">
          <Icon name="ChevronDownIcon" size={16} variant="outline" />
        </div>
      </motion.div>
    </section>
  );
}