"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/AppIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/90 backdrop-blur-md overflow-y-auto py-8 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-card border border-border rounded-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-border">
              {title && (
                <h2 className="font-mono text-base font-semibold text-foreground leading-tight">
                  {title}
                </h2>
              )}
              <button
                ref={closeRef}
                onClick={onClose}
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded border border-border text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors ml-auto"
                aria-label="Close modal"
              >
                <Icon name="XMarkIcon" size={14} variant="outline" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[72vh]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}