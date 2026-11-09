import { useEffect, useRef, type PointerEvent, type MouseEvent } from 'react';

// Eight real video elements circulate on two tracks; no duplicate video decoders.
export function useFilmWall({ paused, near, active, reduced }: { paused: boolean; near: boolean; active: number | null; reduced: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const offset = useRef([0, 0]);
  const velocity = useRef([0, 0]);
  const shift = useRef([0, 0]);
  const dimensions = useRef([{ step: 300, cardWidth: 280, y: 0, width: 900 }, { step: 240, cardWidth: 220, y: 230, width: 720 }]);
  const initialized = useRef(false);
  const wake = useRef<() => void>(() => {});
  const drag = useRef({ id: -1, row: 0, x: 0, y: 0, last: 0, moved: false, until: 0 });
  useEffect(() => {
    const host = stage.current;
    if (!host) return;
    const cards = Array.from(host.querySelectorAll<HTMLElement>('.film-tile'));
    const tracks = Array.from(host.querySelectorAll<HTMLElement>('.film-track'));
    let frame = 0, last = 0, stopped = false;
    const measure = () => {
      const width = host.clientWidth;
      const mobile = width < 600;
      const gap = mobile ? 16 : 22;
      const rowGap = mobile ? 20 : 26;
      const section = host.closest<HTMLElement>('.film-opening')!;
      const bar = section.querySelector<HTMLElement>('.film-gallery-bar')!;
      const footer = section.querySelector<HTMLElement>('.film-gallery-footer')!;
      const outerHeight = (el: HTMLElement) => {
        const style = getComputedStyle(el);
        return el.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      };
      const sectionStyle = getComputedStyle(section);
      const chrome = (document.querySelector('.ed-nav')?.clientHeight || 72)
        + parseFloat(sectionStyle.paddingTop) + parseFloat(sectionStyle.paddingBottom)
        + outerHeight(bar) + outerHeight(footer) + rowGap + 18;
      const available = (window.visualViewport?.height || window.innerHeight) - chrome;
      let primary = Math.min(440, mobile ? width * .76 : (width - gap * 2) / 3);
      const setWidths = () => tracks.forEach((track, row) => track.style.setProperty('--film-card-width', `${Math.floor(primary * (row ? .78 : 1))}px`));
      // Measure real, wrapping captions before budgeting the two 16:9 pictures.
      // Repeating the measurement handles long titles after shrinking a track.
      for (let pass = 0; pass < 3; pass++) {
        setWidths();
        const captions = tracks.map(track => Math.max(...Array.from(track.querySelectorAll<HTMLElement>('.film-tile-caption')).map(el => el.offsetHeight)));
        const fitted = (available - captions[0] - captions[1]) / (1.78 * 9 / 16);
        primary = Math.max(160, Math.min(primary, fitted));
      }
      setWidths();
      let y = 0;
      tracks.forEach((track, row) => {
        const rowCards = cards.slice(row * 4, row * 4 + 4);
        const cardWidth = rowCards[0].offsetWidth;
        const height = Math.max(...rowCards.map(card => card.offsetHeight));
        const step = cardWidth + gap;
        // Each track clips within the span that four unique players can cover.
        // This keeps the smaller second row seamless without duplicating media.
        const trackWidth = Math.min(width, step * 3 - gap);
        const previous = dimensions.current[row];
        if (initialized.current && previous.step !== step) offset.current[row] *= step / previous.step;
        dimensions.current[row] = { step, cardWidth, y, width: trackWidth };
        track.style.width = `${trackWidth}px`;
        track.style.height = `${height}px`;
        track.style.top = `${y}px`;
        y += height + (row ? 0 : rowGap);
      });
      host.style.setProperty('--wall-height', `${y}px`);
      if (!initialized.current) { offset.current = [0, -.45 * dimensions.current[1].step]; initialized.current = true; }
    };
    const tick = (now: number) => {
      frame = 0;
      if (stopped || !near || document.hidden) return;
      const dt = Math.min(40, now - (last || now - 16)); last = now;
      let moving = false;
      [0, 1].forEach(row => {
        const period = dimensions.current[row].step * 4;
        if (Math.abs(shift.current[row]) > .1) {
          const step = reduced ? shift.current[row] : shift.current[row] * (1 - Math.exp(-dt / 150));
          offset.current[row] += step;
          shift.current[row] -= step;
          moving = true;
        }
        const interacting = active !== null && Math.floor(active / 4) === row;
        if (!paused && !reduced && !interacting && drag.current.id < 0) {
          offset.current[row] += dt * ((row === 0 ? -.024 : .021) + velocity.current[row]);
          velocity.current[row] *= Math.exp(-dt / 340);
          moving = true;
        }
        offset.current[row] = ((offset.current[row] % period) + period) % period;
      });
      cards.forEach((card, i) => {
        const row = Math.floor(i / 4);
        const { step } = dimensions.current[row];
        const period = step * 4;
        const x = (((i % 4) * step + offset.current[row] + step) % period + period) % period - step;
        card.style.transform = `translate3d(${x}px,0,0)`;
        card.style.opacity = '1';
      });
      if (moving) frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && !stopped && near && !document.hidden) { last = 0; frame = requestAnimationFrame(tick); } };
    wake.current = start;
    const resize = () => { measure(); start(); };
    const observer = new ResizeObserver(resize); observer.observe(host); cards.forEach(card => observer.observe(card));
    window.addEventListener('resize', resize);
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
    document.addEventListener('visibilitychange', visibility);
    measure(); start();
    return () => { stopped = true; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility); };
  }, [paused, near, active, reduced]);
  const moveBy = (direction: number) => {
    shift.current = shift.current.map((x, row) => x - direction * dimensions.current[row].step * .75);
    velocity.current = [0, 0]; wake.current();
  };
  const focusCard = (index: number) => {
    const { step, cardWidth, width } = dimensions.current[Math.floor(index / 4)];
    shift.current[Math.floor(index / 4)] = 0;
    offset.current[Math.floor(index / 4)] = width / 2 - cardWidth / 2 - (index % 4) * step;
    wake.current();
  };
  const end = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current.id !== event.pointerId) return;
    if (drag.current.moved) drag.current.until = performance.now() + 350;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current.id = -1; event.currentTarget.removeAttribute('data-dragging'); wake.current();
  };
  return { stage, moveBy, focusCard, dragHandlers: {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      const row = event.clientY - event.currentTarget.getBoundingClientRect().top < dimensions.current[1].y ? 0 : 1;
      drag.current = { id: event.pointerId, row, x: event.clientX, y: event.clientY, last: performance.now(), moved: false, until: 0 };
      velocity.current[row] = 0;
      shift.current[row] = 0;
    },
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
      if (drag.current.id !== event.pointerId) return;
      const dx = event.clientX - drag.current.x;
      if (!drag.current.moved && (Math.abs(dx) < 7 || Math.abs(event.clientY - drag.current.y) > Math.abs(dx))) return;
      event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.setAttribute('data-dragging', 'true');
      const now = performance.now(); offset.current[drag.current.row] += dx;
      velocity.current[drag.current.row] = Math.max(-.7, Math.min(.7, dx / Math.max(16, now - drag.current.last)));
      drag.current.x = event.clientX; drag.current.last = now; drag.current.moved = true; wake.current();
    },
    onPointerUp: end, onPointerCancel: end,
    onClickCapture: (event: MouseEvent<HTMLDivElement>) => { if (performance.now() < drag.current.until) { event.preventDefault(); event.stopPropagation(); } },
  }};
}
