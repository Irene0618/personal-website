import { useEffect, useRef } from 'react';

type Flower = {
  x: number; y: number; size: number; depth: number; phase: number; period: number;
  angle: number; tone: number; opacity: number; dx: number; dy: number; dissolve: number;
};
type Ripple = { x: number; y: number; born: number; strength: number };
const TAU = Math.PI * 2;
const random = (n: number) => { const value = Math.sin(n * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };

// Cache the gradient petals so animation only composites small textures each frame.
function createSprite(tone: number, fragment: boolean) {
  const sprite = document.createElement('canvas'); sprite.width = sprite.height = 64;
  const ctx = sprite.getContext('2d')!;
  const colors = [['#eff1ce', '#99b47a', '#496f58'], ['#fff4d8', '#c6b886', '#899768'], ['#eef1df', '#afc8a7', '#6b9b84']][tone];
  ctx.translate(32, 32);
  const gradient = ctx.createLinearGradient(-16, -22, 16, 22);
  gradient.addColorStop(0, colors[0]); gradient.addColorStop(.4, colors[1]); gradient.addColorStop(1, colors[2]);
  ctx.fillStyle = gradient;
  for (let i = 0; i < (fragment ? 1 : 5); i++) {
    ctx.save(); ctx.rotate(i * TAU / 5);
    ctx.beginPath(); ctx.ellipse(fragment ? 0 : 11, 0, 12, 6.5, .15, 0, TAU); ctx.fill(); ctx.restore();
  }
  if (!fragment) {
    ctx.fillStyle = '#fff9e7'; ctx.beginPath(); ctx.arc(0, 0, 3, 0, TAU); ctx.fill();
  }
  return sprite;
}

export default function FlowerRipples() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.closest<HTMLElement>('.portrait-stage');
    if (!canvas || !stage) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sprites = [0, 1, 2].map(tone => [createSprite(tone, false), createSprite(tone, true)]);
    let width = 0, height = 0, frame = 0, visible = false, clock = 0, lastTime = 0;
    let flowers: Flower[] = [], ripples: Ripple[] = [], lastEmission = -1;
    let lastPoint = { x: -1000, y: -1000 };
    const pointer = { x: -1000, y: -1000, tx: -1000, ty: -1000, strength: 0, active: false };

    function render(now: number) {
      frame = 0;
      if (!ctx || !canvas) return;
      const dt = Math.min((now - (lastTime || now)) / 1000, .04); lastTime = now;
      if (!reduced.matches) clock += dt;
      const time = reduced.matches ? 0 : clock;
      const ease = 1 - Math.exp(-dt * 5.5);
      pointer.x += (pointer.tx - pointer.x) * ease; pointer.y += (pointer.ty - pointer.y) * ease;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * ease;
      ripples = ripples.filter(r => time - r.born < 3.6);
      ctx.clearRect(0, 0, width, height);
      for (const f of flowers) {
        const age = (time / f.period + f.phase) % 1;
        const life = Math.pow(Math.max(0, Math.sin(age * Math.PI)), 1.4);
        const drift = time * (.18 + f.depth * .12);
        const x = f.x + Math.sin(drift + f.phase * TAU + f.y * .006) * (12 + f.depth * 13);
        const y = f.y + Math.cos(drift * .8 + f.x * .008) * (8 + f.depth * 12) - (age - .5) * 24;
        let dx = 0, dy = 0, dissolve = 0;
        if (!reduced.matches) {
          const mx = x - pointer.x, my = y - pointer.y, distance = Math.hypot(mx, my);
          const influence = Math.exp(-distance * distance / 16000) * pointer.strength;
          dx = (mx - my * .4) / (distance || 1) * influence * 37;
          dy = (my + mx * .4) / (distance || 1) * influence * 37;
          dissolve = influence * .8;
          for (const r of ripples) {
            const elapsed = time - r.born;
            const rx = x - r.x, ry = y - r.y, distance = Math.hypot(rx, ry);
            const band = distance - elapsed * 190;
            const envelope = Math.exp(-band * band / 10500) * Math.pow(1 - elapsed / 3.6, 2);
            const force = Math.sin(band / 43) * envelope * 25 * r.strength;
            dx += rx / (distance || 1) * force; dy += ry / (distance || 1) * force;
            dissolve += envelope * .35;
          }
        }
        f.dx += (dx - f.dx) * ease; f.dy += (dy - f.dy) * ease;
        f.dissolve += (Math.min(.95, dissolve) - f.dissolve) * ease;
        const edge = Math.max(0, Math.min(1, x / 70, (width - x) / 70, y / 35, (height - y) / 35));
        const alpha = f.opacity * life * edge;
        const size = f.size * (.7 + life * .3);
        const angle = f.angle + Math.sin(drift + f.phase * TAU) * .35 + (f.dx - f.dy) * .012;
        ctx.save(); ctx.translate(x + f.dx, y + f.dy); ctx.rotate(angle);
        ctx.globalAlpha = alpha * (1 - f.dissolve);
        ctx.drawImage(sprites[f.tone][0], -size, -size, size * 2, size * 2);
        // A passing wave separates the blossom into translucent petal fragments.
        if (f.dissolve > .015) {
          for (let j = 0; j < 3; j++) {
            const a = j * TAU / 3 + f.phase * TAU;
            const distance = f.dissolve * (12 + f.depth * 15);
            const px = Math.cos(a) * distance, py = Math.sin(a) * distance;
            ctx.globalAlpha = alpha * f.dissolve * (1 - f.dissolve * .65);
            ctx.drawImage(sprites[f.tone][1], px - size * .65, py - size * .65, size * 1.3, size * 1.3);
          }
        }
        ctx.restore();
      }
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(render);
    }
    const pause = () => { cancelAnimationFrame(frame); frame = 0; lastTime = 0; pointer.active = false; };
    const wake = () => { if (!frame && visible && !document.hidden) { lastTime = 0; frame = requestAnimationFrame(render); } };
    const resize = () => {
      pause();
      const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(1050, Math.round(width * height / 640));
      flowers = Array.from({ length: count }, (_, i) => {
        // Irregular curved streams, instead of a repeating grid of identical flowers.
        const x = random(i + 1) * width;
        const band = i % 3;
        const center = height * (.18 + band * .3) + Math.sin(x / width * TAU + band * 1.8) * height * .1;
        const y = center + (random(i + 1001) + random(i + 2001) - 1) * height * .3;
        const depth = random(i + 5001);
        return { x, y, size: 2.4 + depth * depth * 7, depth, phase: random(i + 3001), period: 9 + random(i + 4001) * 9,
          angle: random(i + 6001) * TAU, tone: i % 3, opacity: .2 + depth * .4, dx: 0, dy: 0, dissolve: 0 };
      });
      ripples = []; render(performance.now());
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || !visible || document.hidden) return;
      const rect = canvas.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      if (!pointer.active) { pointer.x = x; pointer.y = y; }
      pointer.tx = x; pointer.ty = y; pointer.active = true;
      const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);
      if (clock - lastEmission > .16 && distance > 18) {
        lastEmission = clock; lastPoint = { x, y };
        ripples.push({ x, y, born: clock, strength: Math.min(1.3, .5 + distance / 160) });
        ripples = ripples.slice(-7);
      }
      wake();
    };
    const leave = () => { pointer.active = false; };
    const visibilityChange = () => { if (document.hidden) pause(); else wake(); };
    const motionChange = () => { pause(); ripples = []; for (const f of flowers) { f.dx = f.dy = f.dissolve = 0; } wake(); };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else pause(); }); observer.observe(stage);
    stage.addEventListener('pointermove', move, { passive: true }); stage.addEventListener('pointerdown', move, { passive: true });
    stage.addEventListener('pointerleave', leave); stage.addEventListener('pointercancel', leave);
    document.addEventListener('visibilitychange', visibilityChange); reduced.addEventListener('change', motionChange);
    return () => {
      pause(); resizeObserver.disconnect(); observer.disconnect();
      stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerdown', move);
      stage.removeEventListener('pointerleave', leave); stage.removeEventListener('pointercancel', leave);
      document.removeEventListener('visibilitychange', visibilityChange); reduced.removeEventListener('change', motionChange);
    };
  }, []);
  return <canvas className="portrait-flower-field" ref={canvasRef} aria-hidden="true" />;
}
