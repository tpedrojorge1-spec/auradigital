import React, { useEffect, useRef } from "react";

export default function PurpleRaysBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    let animFrame;
    let time = 0;
    let lastTs = 0;
    const TARGET_FPS = 24;
    const INTERVAL = 1000 / TARGET_FPS;

    // Reduz número de raios e evita recriação de gradientes a cada frame
    const rays = Array.from({ length: 10 }, (_, i) => ({
      angle: (i / 10) * Math.PI * 2,
      speed: 0.00025 + (i % 3) * 0.00015,
      width: 0.014 + (i % 4) * 0.006,
      hue: 265 + (i % 5) * 8,
      light: 50 + (i % 3) * 10,
      phase: (i / 10) * Math.PI * 2,
      length: 0.7 + (i % 3) * 0.1,
    }));

    let cx = 0, cy = 0, maxR = 0;

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * 0.75);
      canvas.height = Math.round(window.innerHeight * 0.75);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      cx = canvas.width / 2;
      cy = canvas.height * 0.52;
      maxR = Math.sqrt(cx * cx + cy * cy) * 1.2;
    };
    resize();

    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); };
    window.addEventListener("resize", onResize);

    const draw = (ts) => {
      animFrame = requestAnimationFrame(draw);
      if (ts - lastTs < INTERVAL) return;
      lastTs = ts;
      time += 1;

      // Background
      ctx.fillStyle = "#05020a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rays
      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];
        const a = ray.angle + time * ray.speed;
        const pulse = 0.45 + 0.55 * Math.sin(time * 0.01 + ray.phase);

        const x2 = cx + Math.cos(a) * maxR * ray.length;
        const y2 = cy + Math.sin(a) * maxR * ray.length;

        const grad = ctx.createLinearGradient(cx, cy, x2, y2);
        const c = `hsla(${ray.hue}, 80%, ${ray.light}%, `;
        grad.addColorStop(0, c + "0)");
        grad.addColorStop(0.08, c + (0.5 * pulse) + ")");
        grad.addColorStop(0.4, c + (0.22 * pulse) + ")");
        grad.addColorStop(1, c + "0)");

        const hw = maxR * ray.width * 0.5;
        const nx = -Math.sin(a) * hw;
        const ny = Math.cos(a) * hw;

        ctx.beginPath();
        ctx.moveTo(cx + nx * 0.1, cy + ny * 0.1);
        ctx.lineTo(x2 + nx, y2 + ny);
        ctx.lineTo(x2 - nx, y2 - ny);
        ctx.lineTo(cx - nx * 0.1, cy - ny * 0.1);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Central glow (estático, não recria a cada frame)
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160);
      cg.addColorStop(0, "rgba(168,85,247,0.14)");
      cg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, 0, Math.PI * 2);
      ctx.fill();
    };

    animFrame = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}