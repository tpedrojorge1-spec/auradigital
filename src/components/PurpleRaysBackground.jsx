import React, { useEffect, useRef } from "react";

export default function PurpleRaysBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rays = Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      speed: 0.0003 + Math.random() * 0.0004,
      width: 0.012 + Math.random() * 0.018,
      color1: `hsla(${265 + Math.random() * 40}, 85%, ${50 + Math.random() * 20}%, `,
      phase: Math.random() * Math.PI * 2,
      length: 0.65 + Math.random() * 0.35,
    }));

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.52;
      const maxR = Math.sqrt(cx * cx + cy * cy) * 1.2;

      // Deep background
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      bg.addColorStop(0, "rgba(30, 5, 55, 0.95)");
      bg.addColorStop(0.4, "rgba(12, 2, 25, 0.97)");
      bg.addColorStop(1, "rgba(3, 0, 8, 1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rays
      rays.forEach((ray) => {
        const a = ray.angle + time * ray.speed;
        const pulse = 0.45 + 0.55 * Math.sin(time * 0.012 + ray.phase);

        const x2 = cx + Math.cos(a) * maxR * ray.length;
        const y2 = cy + Math.sin(a) * maxR * ray.length;

        const grad = ctx.createLinearGradient(cx, cy, x2, y2);
        grad.addColorStop(0, ray.color1 + (0.0) + ")");
        grad.addColorStop(0.08, ray.color1 + (0.55 * pulse) + ")");
        grad.addColorStop(0.35, ray.color1 + (0.28 * pulse) + ")");
        grad.addColorStop(0.7, ray.color1 + (0.1 * pulse) + ")");
        grad.addColorStop(1, ray.color1 + "0)");

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
      });

      // Central glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      cg.addColorStop(0, "rgba(168, 85, 247, 0.18)");
      cg.addColorStop(0.3, "rgba(124, 58, 237, 0.08)");
      cg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, 200, 0, Math.PI * 2);
      ctx.fill();

      // Scan line effect
      const scanY = ((time * 0.5) % (canvas.height + 80)) - 40;
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, "rgba(168,85,247,0)");
      scanGrad.addColorStop(0.5, "rgba(168,85,247,0.025)");
      scanGrad.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, canvas.width, 80);

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}