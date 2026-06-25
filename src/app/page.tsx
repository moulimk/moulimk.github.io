import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";

export const metadata: Metadata = {
  title: "MKPortfolio — Mouli Kesavan, Cybersecurity",
  description:
    "Cybersecurity portfolio of Mouli Kesavan — penetration testing, red teaming, detection engineering, and CTF write-ups.",
  keywords: [
    "cybersecurity",
    "penetration testing",
    "red teaming",
    "detection engineering",
    "CTF",
    "security research",
    "portfolio",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "MKPortfolio — Mouli Kesavan, Cybersecurity",
    description:
      "Cybersecurity portfolio of Mouli Kesavan — penetration testing, red teaming, detection engineering, and CTF write-ups.",
    url: baseUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "MKPortfolio",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "Person",
      name: "Mouli Kesavan",
      url: baseUrl,
      jobTitle: "Cybersecurity Professional",
      description:
        "Penetration tester, red teamer, and detection engineer specializing in offensive and defensive security.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <div className="min-h-screen bg-background text-foreground">
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Scan line effect */}
        <div className="scan-line" aria-hidden="true" />

        <Header />

        <main>
          <HeroSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10" aria-hidden="true">
            <div className="glow-line" />
          </div>

          <AboutSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10" aria-hidden="true">
            <div className="h-px bg-border" />
          </div>

          <EducationSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10" aria-hidden="true">
            <div className="h-px bg-border" />
          </div>

          <ProjectsSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10" aria-hidden="true">
            <div className="h-px bg-border" />
          </div>

          <CertificationsSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10" aria-hidden="true">
            <div className="glow-line" />
          </div>

          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}