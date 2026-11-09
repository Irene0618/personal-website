/** Original vector paths redrawn from Irene's six black-cat sketches. */
export type CatPose = 'run' | 'stand' | 'box' | 'music' | 'star' | 'tongue';
type CatDrawingOptions = { pose: CatPose; time: number; gait: number; facing: number; dark: boolean; reduced: boolean };

const shapes = {
  head: new Path2D('M -42 -9 C -46 -15 -44 -22 -40 -26 L -39 -34 Q -39 -37 -36 -35 L -29 -31 Q -21 -33 -14 -30 L -7 -34 Q -4 -36 -4 -32 L -3 -22 C 2 -13 -2 -6 -9 -3 C -19 1 -34 1 -42 -9 Z'),
  standing: new Path2D('M -39 -10 C -28 -19 -12 -18 -1 -20 C 10 -23 25 -20 32 -14 C 39 -8 37 9 34 19 L 31 28 Q 29 33 24 31 Q 20 30 22 22 L 17 22 Q 16 33 11 32 Q 7 32 7 28 L 7 21 Q -2 23 -11 21 L -15 29 Q -17 34 -22 32 Q -25 31 -23 22 L -27 22 Q -29 33 -34 32 Q -39 32 -37 24 C -37 12 -43 6 -42 -5 Z'),
  leap: new Path2D('M -44 -5 C -36 -16 -18 -18 -4 -19 C 9 -21 26 -19 35 -15 C 43 -11 49 -2 49 10 Q 49 16 45 15 L 38 11 Q 41 18 36 16 L 27 10 C 17 5 12 6 4 7 Q -12 6 -25 12 L -33 19 Q -40 22 -37 14 Q -48 24 -49 17 L -46 9 C -53 5 -50 -1 -44 -5 Z'),
  front: new Path2D('M -24 -8 Q -28 -18 -21 -26 L -17 -37 Q -16 -40 -12 -37 L -5 -32 Q 6 -35 16 -31 L 23 -37 Q 26 -40 28 -35 L 32 -24 C 41 -10 37 0 31 4 L 34 15 Q 35 20 30 20 L -20 20 Q -26 20 -24 14 L -22 5 Q -27 1 -24 -8 Z'),
  frontBody: new Path2D('M -21 -1 Q 2 -12 25 0 L 26 20 Q 26 30 20 31 Q 16 32 13 27 L -9 27 Q -12 32 -17 31 Q -23 29 -23 20 Z'),
  boxCat: new Path2D('M -40 2 Q -42 -11 -33 -16 L -29 -25 Q -27 -29 -24 -25 L -19 -21 Q -8 -24 2 -20 L 8 -24 Q 11 -26 13 -20 Q 27 -19 36 -14 Q 43 -11 43 2 Z'),
  box: new Path2D('M -38 2 L 41 2 L 41 34 Q 17 35 2 34 Q -18 36 -37 35 Z'),
  boxFlaps: new Path2D('M -37 2 L -44 13 Q -22 16 -1 12 L 9 2 L 18 13 L 45 12 L 40 2 M 9 3 L 10 34'),
  tongue: new Path2D('M -6 5 C -10 1 -3 -2 0 2 C 4 -2 11 0 8 5 L 5 6 L 5 11 Q 1 16 -3 11 L -3 7 Z'),
  star: new Path2D('M 56 -23 L 60 -10 L 74 -12 Q 77 -12 74 -9 L 63 -1 L 66 14 Q 66 16 63 14 L 53 5 L 40 11 Q 37 12 39 8 L 45 -4 L 39 -15 Q 37 -18 41 -17 L 52 -13 Z'),
};

function drawCatShapes(ctx: CanvasRenderingContext2D, options: CatDrawingOptions) {
  const { pose, gait, facing, reduced } = options;
  const time = reduced ? 0 : options.time;
  const ink = '#090b0d', paper = '#fffefa';
  ctx.save();
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const fill = (path: Path2D, color = ink) => {
    ctx.fillStyle = color; ctx.fill(path);
  };
  const stroke = (path: Path2D, width = 2.5, color = ink) => {
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke(path);
  };
  const path = (d: string) => new Path2D(d);
  const eye = (x: number, y: number, radius = 2.65) => {
    const blink = !reduced && time % 6.2 > 6.05;
    ctx.fillStyle = paper; ctx.beginPath();
    ctx.ellipse(x, y, radius, blink ? .7 : radius * 1.02, .1, 0, Math.PI * 2); ctx.fill();
  };
  const frontEyes = () => { eye(-9, -12, 3.05); eye(15, -12, 3.05); };
  const whiskers = (offset = 0) => {
    stroke(path(`M -43 ${-12 + offset} Q -48 ${-15 + offset} -52 ${-14 + offset} M -43 ${-8 + offset} Q -49 ${-9 + offset} -54 ${-6 + offset}`), 2.4);
    stroke(path(`M -2 ${-15 + offset} L 3 ${-18 + offset}`), 2.2);
  };

  if (pose === 'run' || pose === 'stand') {
    // The reference faces left; mirror the whole drawing to chase in either direction.
    ctx.scale(-facing, 1);
    if (pose === 'run') {
      const spring = reduced ? 0 : Math.sin(gait * 1.25);
      ctx.translate(0, -Math.abs(spring) * 3);
      ctx.scale(1 + spring * .055, 1 - spring * .07);
      stroke(path(`M 28 -14 C 43 -14 51 -19 57 ${-35 + spring * 4}`), 7);
      fill(shapes.leap);
      ctx.save(); ctx.translate(-7, 13); ctx.scale(.86, .86); fill(shapes.head); ctx.restore();
      eye(-33, -2, 2.6); eye(-19, -3, 2.6);
      stroke(path('M -47 -3 L -55 -4 M -47 1 L -53 4'), 2.2);
    } else {
      const wag = Math.sin(time * 2.2) * 3;
      stroke(path(`M 29 -7 C 47 -12 46 -27 ${39 + wag} -42`), 9);
      fill(shapes.standing); fill(shapes.head);
      // A slight irregularity keeps the short paws close to the hand-drawn reference.
      whiskers(); eye(-29, -17); eye(-13, -17);
    }
  } else if (pose === 'box') {
    ctx.translate(0, 0);
    const bob = Math.sin(time * 2) * .9;
    ctx.save(); ctx.translate(0, bob); fill(shapes.boxCat);
    stroke(path('M -39 -10 Q -45 -14 -51 -12 M -39 -6 L -52 -5'), 2.1);
    eye(-25, -10); eye(-6, -9); ctx.restore();
    fill(shapes.box, paper); stroke(shapes.box, 2.6);
    fill(path('M -38 2 L -44 13 Q -22 16 -1 12 L 9 2 L 18 13 L 45 12 L 40 2 Z'), paper);
    stroke(shapes.boxFlaps, 2.6);
  } else if (pose === 'music') {
    ctx.translate(0, Math.sin(time * 3) * 1.2 + 9);
    ctx.scale(.88, .88);
    stroke(path('M -27 -16 L -23 -36 Q -22 -44 -11 -43 Q 5 -42 22 -43 Q 35 -43 36 -32 L 39 -17'), 3);
    fill(shapes.front); frontEyes();
    const leftPad = path('M -23 -24 C -36 -24 -40 -12 -34 -3 Q -31 3 -25 2 Q -19 -9 -23 -24 Z');
    const rightPad = path('M 34 -24 C 45 -26 50 -15 46 -6 Q 43 3 36 2 Q 28 -2 31 -13 Z');
    fill(leftPad, paper); stroke(leftPad, 2.7); fill(rightPad, paper); stroke(rightPad, 2.7);
    ctx.save(); ctx.translate(0, Math.sin(time * 2.6) * 2);
    stroke(path('M -9 -56 L -4 -70 Q 5 -62 -2 -57 M 12 -54 L 13 -67 L 24 -69 L 26 -56 M 14 -64 L 25 -66'), 2.7);
    fill(path('M -14 -57 C -13 -62 -5 -62 -6 -57 Q -10 -53 -14 -57 Z'));
    fill(path('M 8 -54 C 8 -59 16 -60 16 -55 Q 14 -50 8 -54 Z'));
    fill(path('M 21 -56 C 20 -61 28 -62 29 -57 Q 27 -52 21 -56 Z'));
    ctx.restore();
  } else if (pose === 'star') {
    ctx.save(); ctx.translate(-16, 7); ctx.scale(.9, .9); fill(shapes.front); frontEyes(); ctx.restore();
    ctx.save(); ctx.translate(2, Math.sin(time * 2.2) * 2);
    ctx.translate(55, -3); ctx.rotate(Math.sin(time * 1.8) * .09); ctx.translate(-55, 3);
    stroke(shapes.star, 2.7); ctx.restore();
  } else {
    ctx.translate(0, 1 + Math.sin(time * 2.5) * .65);
    stroke(path(`M 20 17 Q 38 20 ${40 + Math.sin(time * 2) * 2} 4`), 7);
    fill(shapes.frontBody); fill(shapes.front); frontEyes();
    ctx.save(); ctx.translate(3, -2); fill(shapes.tongue, '#e9647c'); ctx.restore();
  }
  ctx.restore();
}

let nightBuffer: HTMLCanvasElement | null = null;

/** Draw at native size, centred on the current origin. Outline only the merged silhouette. */
export function drawHandDrawnCat(ctx: CanvasRenderingContext2D, options: CatDrawingOptions) {
  if (!options.dark) { drawCatShapes(ctx, options); return; }
  if (!nightBuffer) { nightBuffer = document.createElement('canvas'); nightBuffer.width = 512; nightBuffer.height = 384; }
  const buffer = nightBuffer.getContext('2d');
  if (!buffer) { drawCatShapes(ctx, options); return; }
  buffer.setTransform(2, 0, 0, 2, 0, 0); buffer.clearRect(0, 0, 256, 192); buffer.translate(128, 96);
  drawCatShapes(buffer, options);
  ctx.save();
  ctx.filter = 'drop-shadow(0 0 1px #d6e5eb) drop-shadow(0 0 1px #d6e5eb)';
  ctx.drawImage(nightBuffer, -128, -96, 256, 192);
  ctx.restore();
}
