"use client";

import React, { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    type Orb = {
      x: number;
      y: number;
      r: number;
      speed: number;
      phase: number;
      color: string;
    };

    let orbs: Orb[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      orbs = [
        {
          x: canvas.width * 0.15,
          y: canvas.height * 0.3,
          r: Math.min(canvas.width, canvas.height) * 0.45,
          speed: 0.0004,
          phase: 0,
          color: "57,219,48",
        },
        {
          x: canvas.width * 0.85,
          y: canvas.height * 0.7,
          r: Math.min(canvas.width, canvas.height) * 0.35,
          speed: 0.0006,
          phase: Math.PI,
          color: "0,191,255",
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5,
          r: Math.min(canvas.width, canvas.height) * 0.55,
          speed: 0.0003,
          phase: Math.PI / 2,
          color: "57,219,48",
        },
      ];
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      for (const orb of orbs) {
        const drift = Math.sin(t * orb.speed + orb.phase) * 0.08;
        const cx = orb.x + Math.cos(t * orb.speed * 0.7 + orb.phase) * canvas.width * 0.04;
        const cy = orb.y + Math.sin(t * orb.speed * 0.9 + orb.phase) * canvas.height * 0.04;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        grad.addColorStop(0, `rgba(${orb.color},${0.06 + drift * 0.02})`);
        grad.addColorStop(0.4, `rgba(${orb.color},${0.025 + drift * 0.01})`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" />;
}