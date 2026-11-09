import { useEffect, useRef } from 'react';
import { drawHandDrawnCat } from './catDrawing';
import type { CatPose } from './catDrawing';
import './particle-cat.css';

type Spark = { x: number; y: number; life: number; vx: number; vy: number };
const WIDTH = 208;
const HEIGHT = 156;
const random = (n: number) => { const r = Math.sin(n * 127.1 + 311.7) * 43758.5453; return r - Math.floor(r); };
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const reactionPoses: CatPose[] = ['stand', 'music', 'box', 'star', 'tongue'];
const interactiveSelector = [
  'a[href]', 'button', 'input:not([type="hidden"])', 'select', 'textarea', 'summary',
  '[role="button"]', '[role="link"]', '[role="tab"]', '[role="menuitem"]',
  '[role="checkbox"]', '[role="switch"]', '[contenteditable="true"]',
  '[data-cat-interactive]', 'video[controls]', 'audio[controls]',
  '.visual-snippet-carousel', '.liquid-stage',
].join(',');

export default function ParticleCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const canvas = element;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const fine = window.matchMedia('(any-pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, last = 0, lastPaint = 0, lastSurface = -1000, lastSpark = 0;
    let seen = false, active = false, opacity = 0, facing = 1, gait = 0, running = 0, dark = false;
    let x = 0, y = 0, vx = 0, vy = 0, dpr = 1, pointerX = 0, pointerY = 0;
    let viewportWidth = innerWidth, viewportHeight = innerHeight;
    let poseBlend = 1;
    let pose: CatPose = 'run', previousPose: CatPose = 'run';
    let hoveredTarget: Element | null = null;
    let reaction: CatPose = 'stand';
    let lastReaction: CatPose | null = null;
    const sparks: Spark[] = [];

    function updateHover(target: EventTarget | null) {
      const element = target instanceof Element ? target : null;
      const next = element?.closest('[inert], [aria-disabled="true"], :disabled')
        ? null : element?.closest(interactiveSelector) ?? null;
      // Children of the same control share one reaction, even while its contents animate.
      if (next === hoveredTarget) return;
      hoveredTarget = next;
      if (next) {
        const choices = reactionPoses.filter(value => value !== lastReaction);
        reaction = choices[Math.floor(Math.random() * choices.length)];
        lastReaction = reaction;
      }
    }

    const resize = () => {
      viewportWidth = innerWidth; viewportHeight = innerHeight;
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(WIDTH * dpr); canvas.height = Math.round(HEIGHT * dpr);
      x = clamp(x, 74, viewportWidth - 74); y = clamp(y, 58, viewportHeight - 40);
      wake();
    };
    const sampleSurface = () => {
      let element = document.elementFromPoint(clamp(x, 0, viewportWidth - 1), clamp(y, 0, viewportHeight - 1));
      dark = false;
      while (element) {
        const color = getComputedStyle(element).backgroundColor.match(/[\d.]+/g)?.map(Number);
        if (color && color.length >= 3 && (color[3] === undefined || color[3] > .65)) {
          dark = color[0] * .2126 + color[1] * .7152 + color[2] * .0722 < 128;
          break;
        }
        element = element.parentElement;
      }
      canvas.dataset.surface = dark ? 'dark' : 'light';
    };

    function tick(time: number) {
      frame = 0;
      if (document.hidden || !fine.matches) return;
      const dt = Math.min((time - (last || time - 16)) / 1000, .033);
      last = time;
      if (!active && opacity < .015) {
        opacity = 0; canvas.style.opacity = '0'; canvas.dataset.state = 'hidden'; return;
      }
      // Also notice targets that move beneath a stationary pointer during scrolling or routing.
      if (active && time - lastSurface > 180) {
        updateHover(document.elementFromPoint(pointerX, pointerY));
        sampleSurface(); lastSurface = time;
      }
      if (active) {
        if (pointerX - x > 62) facing = 1;
        else if (pointerX - x < -62) facing = -1;
        const targetX = clamp(pointerX - facing * 60, 74, viewportWidth - 74);
        const targetY = clamp(pointerY + 38, 58, viewportHeight - 40);
        if (reduced.matches) { x = targetX; y = targetY; vx = 0; vy = 0; }
        else {
          vx += ((targetX - x) * 48 - vx * 12) * dt;
          vy += ((targetY - y) * 48 - vy * 12) * dt;
          const speed = Math.hypot(vx, vy);
          if (speed > 1100) { vx *= 1100 / speed; vy *= 1100 / speed; }
          x = clamp(x + vx * dt, 74, viewportWidth - 74);
          y = clamp(y + vy * dt, 58, viewportHeight - 40);
        }
      }
      const speed = Math.hypot(vx, vy);
      running = reduced.matches ? 0 : running + ((active ? clamp(speed / 110, 0, 1) : 0) - running) * (1 - Math.exp(-dt * 9));
      gait += dt * (6 + Math.min(speed, 500) * .025);
      const nextPose = hoveredTarget ? reaction : 'run';
      if (nextPose !== pose) { previousPose = pose; pose = nextPose; poseBlend = reduced.matches ? 1 : 0; }
      poseBlend = Math.min(1, poseBlend + dt / .12);
      canvas.dataset.pose = pose;
      canvas.dataset.mode = hoveredTarget ? 'reaction' : 'chase';
      opacity = reduced.matches ? Number(active) : opacity + ((active ? 1 : 0) - opacity) * (1 - Math.exp(-dt * 9));
      canvas.style.opacity = opacity.toFixed(3);
      canvas.style.transform = `translate3d(${(x - WIDTH / 2).toFixed(2)}px,${(y - HEIGHT / 2).toFixed(2)}px,0)`;
      const state = running > .15 ? 'running' : 'resting';
      if (canvas.dataset.state !== state) canvas.dataset.state = state;

      if (speed > 130 && active && time - lastSpark > 55 && !reduced.matches) {
        lastSpark = time;
        sparks.push({ x: x - facing * 28, y: y + 14, life: 1, vx: -facing * 14, vy: -8 - random(time) * 14 });
        if (sparks.length > 16) sparks.shift();
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i]; spark.life -= dt * 2; spark.x += spark.vx * dt; spark.y += spark.vy * dt;
        if (spark.life <= 0) sparks.splice(i, 1);
      }
      // The drawings animate at 30 fps while resting; the chase follows the display refresh rate.
      if (running > .15 || time - lastPaint >= 32 || reduced.matches) {
        lastPaint = time;
        paint(time / 1000);
      }
      if (!reduced.matches && (active || opacity > .015)) frame = requestAnimationFrame(tick);
    }

    function paint(time: number) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.translate(WIDTH / 2, HEIGHT / 2);
      const glint = dark ? '#95b9c9' : '#7898aa';
      for (const spark of sparks) {
        ctx.globalAlpha = spark.life * .45; ctx.fillStyle = glint;
        ctx.beginPath(); ctx.arc(spark.x - x, spark.y - y, .65 + spark.life * .8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.rotate(clamp(vy / 1800, -.13, .13) * facing);
      ctx.scale(.9, .9);
      const options = { time, gait, facing, dark, reduced: reduced.matches };
      if (poseBlend < 1) {
        ctx.globalAlpha = 1 - poseBlend;
        drawHandDrawnCat(ctx, { ...options, pose: previousPose });
      }
      ctx.globalAlpha = poseBlend;
      drawHandDrawnCat(ctx, { ...options, pose });
      ctx.globalAlpha = 1;
    }

    function wake() { if (!frame && !document.hidden && fine.matches && seen) { last = 0; frame = requestAnimationFrame(tick); } }
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !fine.matches) return;
      pointerX = event.clientX; pointerY = event.clientY;
      if (!seen) { x = clamp(pointerX - 115, 74, viewportWidth - 74); y = clamp(pointerY + 50, 58, viewportHeight - 40); seen = true; }
      active = true; updateHover(event.target); wake();
    };
    const out = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' && fine.matches) { updateHover(event.relatedTarget); wake(); }
    };
    const scroll = () => {
      if (active) { updateHover(document.elementFromPoint(pointerX, pointerY)); wake(); }
    };
    const leave = () => { active = false; updateHover(null); if (reduced.matches) { opacity = 0; canvas.style.opacity = '0'; canvas.dataset.state = 'hidden'; } else wake(); };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); };
    const preference = () => { if (!fine.matches) { cancelAnimationFrame(frame); frame = 0; leave(); } else wake(); };
    resize();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', move, { passive: true });
    window.addEventListener('pointerout', out, { passive: true });
    document.addEventListener('scroll', scroll, { capture: true, passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('resize', resize, { passive: true });
    fine.addEventListener('change', preference); reduced.addEventListener('change', preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerover', move); window.removeEventListener('pointerout', out);
      document.removeEventListener('scroll', scroll, true);
      window.removeEventListener('blur', leave); document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('resize', resize); fine.removeEventListener('change', preference); reduced.removeEventListener('change', preference);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-cat" width={WIDTH} height={HEIGHT} aria-hidden="true" data-state="hidden"/>;
}
