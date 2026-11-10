"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

function readAccentRGB() {
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue("--accent").trim();

  const rgbMatch = accent.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i,
  );
  if (rgbMatch) {
    return {
      r: Math.round(Number(rgbMatch[1])),
      g: Math.round(Number(rgbMatch[2])),
      b: Math.round(Number(rgbMatch[3])),
    };
  }

  const hex = accent.replace("#", "");
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  return { r: 124, g: 140, b: 255 };
}

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(max-width: 768px)");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let tint = readAccentRGB();
    const pointer = { x: -9999, y: -9999 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = media.matches ? 22 : 46;
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.35 + 0.35,
        a: Math.random() * 0.38 + 0.1,
      }));
    }

    function draw() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);
      const { r, g, b } = tint;
      const isLight = document.documentElement.dataset.mode === "light";
      const baseAlpha = isLight ? 0.55 : 1;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        const proximity = dist < 160 ? 1 - dist / 160 : 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r + proximity * 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${
          (p.a + proximity * 0.28) * baseAlpha
        })`;
        ctx!.fill();

        if (proximity > 0.15) {
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${proximity * 0.06})`;
          ctx!.lineWidth = 0.6;
          ctx!.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onPointerMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function onVisibility() {
      running = !document.hidden;
      if (running) {
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    }

    const observer = new MutationObserver(() => {
      tint = readAccentRGB();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-mode"],
    });

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}

export function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: "var(--ambient-opacity)" }}
    >
      <div className="ambient-glow-a absolute -left-[18%] -top-[22%] h-[46rem] w-[46rem] rounded-full blur-[40px]" />
      <div className="ambient-glow-b absolute -right-[14%] top-[8%] h-[38rem] w-[38rem] rounded-full blur-[40px]" />
      <div className="ambient-glow-c absolute bottom-[-16%] left-[32%] h-[40rem] w-[40rem] rounded-full blur-[40px]" />
      <div className="ambient-top absolute inset-0" />
      <div className="grid-lines mask-fade-b absolute inset-0 opacity-60" />
    </div>
  );
}
