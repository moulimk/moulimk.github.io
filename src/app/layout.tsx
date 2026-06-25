import React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "../styles/tailwind.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
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
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "MKPortfolio — Mouli Kesavan",
    description:
      "Penetration testing, red teaming, and detection engineering portfolio.",
    images: [
      {
        url: "/assets/images/app_logo.png",
        width: 1200,
        height: 630,
        alt: "MKPortfolio — Cybersecurity Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MKPortfolio",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    description:
      "Cybersecurity portfolio of Mouli Kesavan — penetration testing, red teaming, detection engineering, and CTF write-ups.",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/assets/images/app_logo.png`,
    sameAs: [
      "https://linkedin.com/in/moulikesavan",
      "https://github.com/moulikesavan",
    ],
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

      </head>
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  );
}