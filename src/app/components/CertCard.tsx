"use client";

import React from "react";
import { motion } from "framer-motion";
import AppImage from "@/components/ui/AppImage";
import type { Cert } from "@/data/content";

interface CertCardProps {
  cert: Cert;
  onOpen: (cert: Cert) => void;
  index: number;
}

export default function CertCard({ cert, onOpen, index }: CertCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      onClick={() => onOpen(cert)}
      className="glass-card rounded-md overflow-hidden text-left group w-full"
      style={{
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
      aria-label={`View ${cert.name}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <AppImage
          src={cert.image}
          alt={`${cert.name} certification badge`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-103"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <span className="absolute top-2.5 right-2.5 tag-badge bg-black/70 backdrop-blur-sm text-[0.6rem]">
          {cert.category}
        </span>
      </div>

      {/* Name */}
      <div className="px-4 py-3 border-t border-border">
        <p className="font-mono text-xs font-medium text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-300">
          {cert.name}
        </p>
      </div>
    </motion.button>
  );
}