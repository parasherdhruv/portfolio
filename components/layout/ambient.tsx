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
    const pointer = { x: -9999, y: -9999 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = media.matches ? 26 : 58;
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.35 + 0.35,
        a: Math.random() * 0.42 + 0.12,
      }));
    }

    function draw() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

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
        ctx!.fillStyle = `rgba(160, 148, 255, ${p.a + proximity * 0.3})`;
        ctx!.fill();

        if (proximity > 0.15) {
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.strokeStyle = `rgba(143, 124, 255, ${proximity * 0.06})`;
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

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}

export function AmbientGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-[18%] -top-[22%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(88,72,200,0.16),transparent_62%)] blur-[30px]" />
      <div className="absolute -right-[14%] top-[8%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(50,90,220,0.12),transparent_64%)] blur-[30px]" />
      <div className="absolute bottom-[-16%] left-[32%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(120,80,220,0.09),transparent_66%)] blur-[30px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,255,255,0.045),transparent_55%)]" />
      <div className="absolute inset-0 grid-lines opacity-[0.55] mask-fade-b" />
    </div>
  );
}
