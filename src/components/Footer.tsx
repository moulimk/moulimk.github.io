import React from "react";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";
import { socialLinks } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-6 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + copyright */}
        <div className="flex items-center gap-2">
          <AppLogo size={20} />
          <span className="font-mono text-sm font-bold tracking-tighter text-muted-foreground">
            MK.
          </span>
          <span className="text-muted-foreground text-xs ml-2" style={{ opacity: 0.4 }}>
            © 2026 Mouli Kesavan
          </span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${socialLinks?.email}`}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Email"
            style={{ opacity: 0.5 }}
          >
            <Icon name="EnvelopeIcon" size={16} variant="outline" />
          </a>
          <a
            href={socialLinks?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
            aria-label="LinkedIn"
            style={{ opacity: 0.5 }}
          >
            <Icon name="LinkIcon" size={16} variant="outline" />
          </a>
          <a
            href={socialLinks?.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="GitHub"
            style={{ opacity: 0.5 }}
          >
            <Icon name="CodeBracketIcon" size={16} variant="outline" />
          </a>
        </div>
      </div>
    </footer>
  );
}