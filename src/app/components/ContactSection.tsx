"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/data/content";

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitState = "idle" | "submitting" | "success";

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.message.trim()) errors.message = "Message cannot be empty.";
  else if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [fields, setFields] = useState<FormFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitState("submitting");
    // Redirect to mailto as a static-site fallback
    const mailto = `mailto:${socialLinks.email}?subject=Opportunity for Mouli Kesavan&body=${encodeURIComponent(`Hi Mouli,\n\n${fields.message}\n\n— ${fields.name} (${fields.email})`)}`;
    setTimeout(() => {
      window.location.href = mailto;
      setSubmitState("success");
      setFields({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    }, 800);
  };

  const inputBase =
    "w-full bg-white/[0.04] border rounded-md px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-300 focus:bg-white/[0.07] backdrop-blur-sm";
  const inputBorder = (field: keyof FormErrors) =>
    errors[field]
      ? "border-red-500/60 focus:border-red-500"
      : touched[field] && !errors[field]
      ? "border-primary/50 focus:border-primary"
      : "border-white/10 focus:border-primary/50";

  return (
    <section id="contact" ref={ref} className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block w-8 h-px bg-primary opacity-60" />
            <span className="section-label">05 — Contact</span>
          </div>
          <h2 className="section-heading text-gradient-primary max-w-md">
            Open to Opportunities
          </h2>
          <p className="text-muted-foreground text-sm mt-4 max-w-sm leading-relaxed" style={{ opacity: 0.6 }}>
            Currently working as an IT Systems Analyst in Birmingham, actively looking to transition
            into a security-focused role — SOC analyst, threat detection engineer, or junior
            pentester. If you have an opening or just want to connect, I&apos;d love to hear from you.
          </p>
          {/* Quick contact links */}
          <div className="flex gap-4 mt-6">
            <a href={`mailto:${socialLinks.email}`} className="btn-ghost-neon text-xs">
              {socialLinks.email}
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost-accent text-xs">
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <AnimatePresence mode="wait">
            {submitState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center gap-5 py-16 px-8 rounded-lg border border-primary/20 bg-white/[0.03] backdrop-blur-sm text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                  className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center"
                  style={{ background: "rgba(57,219,48,0.08)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-mono text-primary text-base font-medium">Message sent.</p>
                  <p className="text-muted-foreground text-xs mt-1.5" style={{ opacity: 0.55 }}>
                    Your email client should have opened. I&apos;ll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitState("idle")}
                  className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
                noValidate
              >
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted-foreground" style={{ opacity: 0.6 }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jane Smith"
                    autoComplete="name"
                    className={`${inputBase} ${inputBorder("name")}`}
                  />
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p key="name-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="font-mono text-xs text-red-400">
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted-foreground" style={{ opacity: 0.6 }}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="jane@company.com"
                    autoComplete="email"
                    className={`${inputBase} ${inputBorder("email")}`}
                  />
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p key="email-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="font-mono text-xs text-red-400">
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted-foreground" style={{ opacity: 0.6 }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about the role or opportunity you have in mind..."
                    rows={5}
                    className={`${inputBase} resize-none ${inputBorder("message")}`}
                  />
                  <AnimatePresence>
                    {errors.message && touched.message && (
                      <motion.p key="msg-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="font-mono text-xs text-red-400">
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={submitState === "submitting"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full font-mono text-sm font-medium py-3 px-6 rounded-md border border-primary/40 text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/70 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "rgba(57,219,48,0.05)" }}
                >
                  {submitState === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-3.5 h-3.5 border border-primary/60 border-t-primary rounded-full"
                      />
                      Opening email client...
                    </span>
                  ) : (
                    "Get in Touch â†’"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
