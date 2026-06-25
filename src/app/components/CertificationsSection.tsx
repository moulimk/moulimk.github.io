"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { certifications, isCertGroup, type Cert, type CertGroup } from "@/data/content";
import CertCard from "./CertCard";
import Modal from "./Modal";
import AppImage from "@/components/ui/AppImage";

type ModalState =
  | { kind: "cert"; cert: Cert }
  | { kind: "group"; group: CertGroup }
  | null;

export default function CertificationsSection() {
  const [modal, setModal] = useState<ModalState>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" ref={ref} className="py-28 px-6 md:px-10">
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
            <span className="section-label">04 — Credentials</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="section-heading text-gradient-primary">
              Certifications & Badges
            </h2>
            <p className="text-muted-foreground text-xs max-w-xs leading-relaxed" style={{ opacity: 0.6 }}>
              Industry certifications and training completions.
              Click any card to view — ICS/SCADA group expands to all 8 certs.
            </p>
          </div>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certifications.map((item, i) =>
            isCertGroup(item) ? (
              // Group card
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => setModal({ kind: "group", group: item })}
                className="glass-card rounded-md overflow-hidden text-left group w-full"
                aria-label={`View ${item.groupName}`}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <AppImage
                    src={item.groupImage}
                    alt={item.groupName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <span className="absolute top-2.5 right-2.5 tag-badge bg-black/70 backdrop-blur-sm text-[0.6rem]">
                    {item.count} certs
                  </span>
                </div>
                <div className="px-4 py-3 border-t border-border">
                  <p className="font-mono text-xs font-medium text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-300">
                    {item.groupName}
                  </p>
                </div>
              </motion.button>
            ) : (
              // Individual cert card
              <CertCard
                key={item.id}
                cert={item}
                index={i}
                onOpen={(cert) => setModal({ kind: "cert", cert })}
              />
            )
          )}
        </div>
      </div>

      {/* Individual cert lightbox */}
      <Modal
        isOpen={modal?.kind === "cert"}
        onClose={() => setModal(null)}
        title={modal?.kind === "cert" ? modal.cert.name : ""}
      >
        {modal?.kind === "cert" && (
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
              <AppImage
                src={modal.cert.image}
                alt={modal.cert.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 760px"
                priority
              />
            </div>
            <span className="tag-badge">{modal.cert.category}</span>
          </div>
        )}
      </Modal>

      {/* ICS group modal */}
      <Modal
        isOpen={modal?.kind === "group"}
        onClose={() => setModal(null)}
        title={modal?.kind === "group" ? modal.group.groupName : ""}
      >
        {modal?.kind === "group" && (
          <div className="space-y-5">
            <p className="font-mono text-xs text-muted-foreground" style={{ opacity: 0.6 }}>
              {modal.group.count} training certificates completed via CISA ICS-CERT. Click any to view full size.
            </p>
            <div className="flex flex-col divide-y divide-border">
              {modal.group.certs.map((cert, i) => (
                <button
                  key={cert.id}
                  onClick={() => setModal({ kind: "cert", cert })}
                  className="flex items-center gap-4 py-3 px-1 text-left group hover:bg-white/[0.03] transition-colors duration-200 rounded"
                >
                  <span className="font-mono text-xs text-primary/40 w-5 flex-shrink-0 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative w-12 h-9 rounded overflow-hidden flex-shrink-0 border border-white/10">
                    <AppImage
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground leading-snug group-hover:text-foreground transition-colors flex-1">
                    {cert.name}
                  </p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
