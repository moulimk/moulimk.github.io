"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";

const navItems = [
  { label: "About", section: "about" },
  { label: "Education", section: "education" },
  { label: "Projects", section: "projects" },
  { label: "Certs", section: "certifications" },
  { label: "Contact", section: "contact" },
];

const RESUME_URL = "/assets/Mouli_Kesavan_CV.docx";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navItems.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <AppLogo size={28} />
          <span className="font-mono text-lg font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-200">
            MK.
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map(({ label, section }) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className="relative nav-link-mono group"
            >
              <span
                className={`transition-colors duration-200 ${
                  activeSection === section ? "text-primary" : ""
                }`}
              >
                {label}
              </span>
              <span
                className="absolute left-0 -bottom-0.5 h-px bg-primary transition-all duration-300 ease-out"
                style={{ width: activeSection === section ? "100%" : "0%" }}
              />
            </button>
          ))}
          <a
            href={RESUME_URL}
            download="Mouli_Kesavan_CV.docx"
            className="btn-ghost-neon"
            style={{ padding: "0.35rem 0.9rem", fontSize: "0.7rem" }}
          >
            Resume
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Icon
            name={mobileOpen ? "XMarkIcon" : "Bars3Icon"}
            size={20}
            variant="outline"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map(({ label, section }) => (
                <button
                  key={section}
                  onClick={() => scrollTo(section)}
                  className={`nav-link-mono text-left ${
                    activeSection === section ? "text-primary" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
              <a
                href={RESUME_URL}
                download="Mouli_Kesavan_CV.docx"
                className="nav-link-mono text-left text-primary"
                onClick={() => setMobileOpen(false)}
              >
                Resume ↓
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
