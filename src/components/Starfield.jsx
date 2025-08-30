import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    let h = canvas.height = Math.max(200, canvas.offsetHeight) * devicePixelRatio;

    const STAR_COUNT = Math.min(220, Math.floor((w * h) / 30000));

    function reset() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = Math.max(200, canvas.offsetHeight) * devicePixelRatio;
      starsRef.current = new Array(STAR_COUNT).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        tw: Math.random() * 0.6 + 0.1,
        off: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.3,
      }));
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(0,0,0,0)';

      for (const s of starsRef.current) {
        const twinkle = 0.6 + Math.sin(t * 0.002 + s.off) * s.tw;
        const jitterX = Math.sin(t * 0.0007 + s.off) * s.drift;
        const jitterY = Math.cos(t * 0.0006 + s.off) * s.drift;
        ctx.beginPath();
        const grad = ctx.createRadialGradient(s.x + jitterX, s.y + jitterY, 0, s.x + jitterX, s.y + jitterY, s.r * 3);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * twinkle})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.arc(s.x + jitterX, s.y + jitterY, s.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const onResize = () => reset();

    reset();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-0 opacity-70">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
    </div>
  );
}
