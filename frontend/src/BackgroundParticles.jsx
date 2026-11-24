
import React, { useEffect, useRef } from "react";

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationId;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function resize() {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        65,
        Math.max(
          15,
          Math.floor((width * height) / 18000)
        )
      );

      particles = Array.from(
        { length: count },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 0.7 + 0.6,
        })
      );
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const dark = canvas
        .closest(".campus-app")
        ?.classList.contains("theme-dark");

      const color = dark
        ? "230,230,230"
        : "30,30,30";

      particles.forEach((particle, index) => {
        if (!reducedMotion.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${color}, 0.75)`;
        ctx.fill();

        for (
          let j = index + 1;
          j < particles.length;
          j++
        ) {
          const other = particles[j];

          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y
          );

          if (distance < 115) {
            ctx.beginPath();

            ctx.moveTo(
              particle.x,
              particle.y
            );

            ctx.lineTo(
              other.x,
              other.y
            );

            ctx.strokeStyle = `rgba(${color}, ${
              0.22 * (1 - distance / 115)
            })`;

            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      });

      animationId =
        requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(resize);

    observer.observe(canvas);

    resize();
    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="portfolio-particles"
      aria-hidden="true"
    />
  );
}
