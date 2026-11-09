import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import './video-portfolio.css';
import { useFilmWall } from './useFilmWall';
import OceanCanvas from './OceanCanvas';
import { portfolioAsset as asset } from './portfolioAsset';

export const petOriginalLink = 'https://www.xiaohongshu.com/discovery/item/6abdf3b6000000000a02165c?source=webshare&xhsshare=pc_web&xsec_token=ABIu5PdIWosH5ls5x1pSNYfPIhlPtBjP1TtFvjeO3o9T8=&xsec_source=pc_share';
export const films = {
  pet: { title: '小龙吨吨 · 假期出逃 vlog', src: asset('films/pet-full.mp4'), preview: asset('films/pet-highlights.mp4'), poster: asset('films/pet-full-poster.jpg'), note: '假期出逃 vlog · 2 分 23 秒', href: '#case-ai-pet-incubation' },
  deep: { title: 'DEEP SPACE：深空', src: asset('films/deep-space.mp4'), preview: asset('films/deep-space-highlights.mp4'), poster: asset('films/deep-space-poster.jpg'), note: '本科毕业设计 · 科幻 CG 短片 · 8 分 37 秒', href: '#case-deep-space' },
  mg: { title: '人生绩效簿 · 手绘 MG 片头', src: asset('films/handdrawn-mg.mp4'), preview: asset('films/handdrawn-mg-highlights.mp4'), poster: asset('films/handdrawn-mg-poster.jpg'), note: '独立手绘 MG 动画 · 1 分 35 秒', href: '#case-handdrawn-mg' },
  cheso: { title: '腾讯CHESO 设计agent 宣传片', src: 'https://irene0618.github.io/cheso-campus-report/cheso-tvc-web.mp4', preview: asset('films/cheso-highlights.mp4'), poster: asset('cheso-case/film-cover.jpg'), note: '品牌宣传片 · 1 分 31 秒', href: '#case-cheso-campus-campaign' },
  xinhua: { title: '精彩世运，共逐梦想', src: asset('films/xinhua-world-games.mp4'), preview: asset('films/xinhua-opening-15s.mp4'), poster: asset('films/xinhua-poster.jpg'), note: '新华社 · 重磅微视频 · 5 分 12 秒', href: '#experience-xinhua-internship' },
  wunian: { title: '勿念', src: asset('films/wunian.mp4'), preview: asset('films/wunian-highlights.mp4'), poster: asset('films/wunian-poster.jpg'), note: '侨批题材短片 · 4K · 1 分 34 秒', href: '#case-wunian-ai-film', external: 'https://www.xinpianchang.com/a13810380?from=webShare&channel=copyLink' },
  c4d: { title: '中韩宣传片 · C4D 制作', src: asset('films/china-korea-c4d.mp4'), preview: asset('films/china-korea-c4d-highlights.mp4'), poster: asset('films/china-korea-c4d-poster.jpg'), note: '三维动画 · 24 秒', href: '#case-china-korea-c4d' },
  cocoon: { title: '思茧成蝶', src: asset('films/cocoon-original-4k.mp4'), fallback: asset('films/cocoon-compatible.mp4'), preview: asset('films/cocoon-highlights.mp4'), poster: asset('films/cocoon-poster.jpg'), note: 'AIGC 实验短片 · 4K · 7 分 28 秒', href: '#case-cocoon' },
};
type Film = { title: string; src: string; preview: string; poster: string; note: string; href: string; external?: string; fallback?: string };

export const digitalZuelFilm: Film = {
  title: '数字中南大 · 元宇宙校园平台效果展示',
  src: asset('films/digital-zuel.mp4'),
  preview: asset('films/digital-zuel-preview.mp4'),
  poster: asset('films/digital-zuel-poster.jpg'),
  note: '效果展示动画 · 1080p · 60 帧 · 3 分 2 秒',
  href: '#case-digital-zuel',
};

// Warm all short previews together; retry playback when media or the page becomes ready.
export function MotionPreview({ src, poster, paused }: { src: string; poster: string; paused: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    let disposed = false;
    let pending = false;
    let retries = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const sync = () => {
      if (disposed) return;
      if (paused || document.hidden) { el.pause(); setStatus('paused'); return; }
      el.muted = true;
      el.defaultMuted = true;
      if (pending || el.error) return;
      if (!el.paused) { setStatus('playing'); return; }
      pending = true;
      void el.play().then(() => {
        if (disposed) return;
        if (paused || document.hidden) el.pause(); else setStatus('playing');
      }).catch((error: DOMException) => {
        if (!disposed) setStatus(error.name === 'NotAllowedError' ? 'blocked' : 'loading');
      }).finally(() => { pending = false; });
    };
    const recover = () => {
      setStatus('error');
      if (retries >= 2 || disposed || paused) return;
      clearTimeout(retryTimer);
      retryTimer = setTimeout(() => { if (!disposed) { el.load(); sync(); } }, ++retries * 1000);
    };
    el.addEventListener('loadeddata', sync);
    el.addEventListener('canplay', sync);
    el.addEventListener('error', recover);
    document.addEventListener('visibilitychange', sync);
    document.addEventListener('pointerdown', sync, { passive: true });
    window.addEventListener('focus', sync);
    window.addEventListener('pageshow', sync);
    if (el.error) recover(); else sync();
    return () => {
      disposed = true;
      clearTimeout(retryTimer);
      el.removeEventListener('loadeddata', sync);
      el.removeEventListener('canplay', sync);
      el.removeEventListener('error', recover);
      document.removeEventListener('visibilitychange', sync);
      document.removeEventListener('pointerdown', sync);
      window.removeEventListener('focus', sync);
      window.removeEventListener('pageshow', sync);
      el.pause();
    };
  }, [src, paused]);
  return <div className="motion-preview" data-preview-state={status} aria-hidden="true">
    <img src={poster} alt=""/>
    <video ref={video} src={src} poster={poster} autoPlay={!paused} muted loop playsInline preload="auto" onTimeUpdate={event => {
      const el = event.currentTarget;
      if (Number.isFinite(el.duration) && el.duration > 0) el.parentElement?.style.setProperty('--preview-progress', String(el.currentTime / el.duration));
    }}/>
    <span className="preview-progress"/>
  </div>;
}

export function InlineFilm({ film, autoPlay = false }: { film: Film; autoPlay?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const playbackSrc = useFallback && film.fallback ? film.fallback : film.src;
  useEffect(() => { setUseFallback(false); setFailed(false); }, [film.src]);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let started = false;
    const markStarted = () => { started = true; };
    video.addEventListener('play', markStarted);
    const hide = () => { if (document.hidden) video.pause(); };
    document.addEventListener('visibilitychange', hide);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { video.pause(); return; }
      // Routes reset scroll after mounting; begin only once the player is visible.
      if (autoPlay && !started && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        started = true;
        void video.play().catch(() => {});
      }
    });
    observer.observe(video);
    return () => { video.pause(); observer.disconnect(); video.removeEventListener('play', markStarted); document.removeEventListener('visibilitychange', hide); };
  }, [autoPlay, playbackSrc]);
  if (!film.src) return <figure className="inline-film">
    <a className="film-external-player" href={film.external} target="_blank" rel="noreferrer" aria-label={`在新片场观看《${film.title}》`}><img src={film.poster} alt={film.title}/><span><Play size={24} fill="currentColor"/>在新片场观看完整短片 <ArrowUpRight size={18}/></span></a>
    <figcaption><div><strong>{film.title}</strong><span>{useFallback ? film.note.replace('4K · ', '') : film.note}</span></div><span>新片场 · 完整作品</span></figcaption>
  </figure>;
  return <figure className="inline-film">
    <video ref={ref} style={{ aspectRatio: film === films.deep ? "2138 / 908" : film === films.pet ? "2622 / 1206" : "16 / 9" }} src={playbackSrc} controls playsInline muted={autoPlay} preload={autoPlay ? 'metadata' : 'none'} poster={film.poster} aria-label={film.title} onPlay={event => { document.querySelectorAll<HTMLVideoElement>('.inline-film video, .cheso-video-shell video').forEach(video => { if (video !== event.currentTarget) video.pause(); }); }} onError={() => { if (film.fallback && !useFallback) setUseFallback(true); else setFailed(true); }} />
    <figcaption><div><strong>{film.title}</strong><span>{useFallback ? film.note.replace('4K · ', '') : film.note}</span></div><span>{autoPlay ? '静音起播 · 可在播放器开启声音' : '点击播放 · 可全屏观看'}</span></figcaption>
    {failed && <p className="film-error">视频暂时未能加载。<a href={playbackSrc} target="_blank" rel="noreferrer">单独打开视频重试 ↗</a></p>}
  </figure>;
}

const filmList = [films.pet, films.wunian, films.deep, films.cocoon, films.mg, films.cheso, films.xinhua, films.c4d];

export default function VideoPortfolio() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(reduced);
  const [active, setActive] = useState<number | null>(null);
  const [near, setNear] = useState(true);
  const gallery = useRef<HTMLElement>(null);
  const { stage, moveBy, focusCard, dragHandlers } = useFilmWall({ paused, near, active, reduced });
  useEffect(() => {
    const el = gallery.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '200px' });
    observer.observe(el);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectPreference = () => { setReduced(preference.matches); if (preference.matches) { setPaused(true); } };
    preference.addEventListener('change', respectPreference);
    return () => { observer.disconnect(); preference.removeEventListener('change', respectPreference); };
  }, []);
  return <section ref={gallery} className="film-opening-shell" id="watch" aria-label="精选影像作品">
    <div className="film-ocean" aria-hidden="true"><OceanCanvas eager paused={paused||reduced} speed={.38}/></div>
    <div className="film-opening">
    <h1 className="film-sr-only">张馨文个人站</h1>
    <div className="film-gallery-bar"><span>精选部分影像作品</span><div className="film-gallery-tools">
      <button type="button" onClick={() => setPaused(v => !v)} aria-pressed={paused} aria-label={paused ? '继续动态预览' : '暂停动态预览'}>{paused ? <Play size={12}/> : <Pause size={12}/>}<span>{paused ? '继续' : '暂停'}</span></button>
    </div></div>
    <div ref={stage} className="film-board" role="region" aria-label="作品动态预览，可左右拖动浏览" {...dragHandlers} onDragStart={event => event.preventDefault()} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveBy(event.key === 'ArrowLeft' ? -1 : 1); } }}>
      {[0, 1].map(row => <div className={`film-track film-track-${row}`} key={row}>
      {filmList.slice(row * 4, row * 4 + 4).map((film, position) => { const i = row * 4 + position; return <a className={`film-tile${film === films.deep ? ' film-tile-cinematic' : ''}`} href={film.href} key={film.title} draggable={false} aria-label={`观看${film.title}`} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(i); }} onPointerLeave={() => setActive(null)} onFocus={event => { setActive(i); if (event.currentTarget.matches(':focus-visible')) focusCard(i); }} onBlur={() => setActive(null)}>
        <div className="film-image"><MotionPreview src={film.preview} poster={film.poster} paused={paused || !near}/><span className="film-image-play"><Play size={18} fill="currentColor"/></span></div>
        <div className="film-tile-caption"><div><h2>{film.title}</h2><small>{film.note}</small></div><ArrowUpRight className="film-open-icon" size={16}/></div>
      </a>; })}
      </div>)}
    </div>
    <div className="film-gallery-footer"><div className="film-wall-navigation"><button type="button" onClick={() => moveBy(-1)} aria-label="向左浏览作品"><ArrowLeft size={16}/></button><span>拖动浏览 · 点击观看</span><button type="button" onClick={() => moveBy(1)} aria-label="向右浏览作品"><ArrowRight size={16}/></button></div><a href="#branches">继续浏览项目 <ArrowUpRight size={13}/></a></div>
    </div>
  </section>;
}

const originalFilmPages = [
  { slug: 'china-korea-c4d', film: films.c4d, category: '三维动画 / Cinema 4D', description: '以 Cinema 4D 制作的中韩宣传片，围绕镜头、话筒与校园建筑展开三维视觉呈现。', credits: ['Cinema 4D', '三维动画', '宣传片'] },
  { slug: 'deep-space', film: films.deep, category: '本科毕业设计 / UE5 / 科幻 CG 短片', description: '《DEEP SPACE：深空》是我的本科毕业设计作品，以虚幻引擎呈现科幻场景与剧情影像。', credits: ['本科毕业设计', '虚幻引擎', '场景建模', '剧情向 CG 短片'] },
  { slug: 'handdrawn-mg', film: films.mg, category: '独立创作 / 手绘 / Motion Graphics', description: '《人生绩效簿》手绘 MG 动画片头。以手绘画面和动态设计组织片头的视觉叙事。', credits: ['独立手绘', 'MG 动画', '片头设计'] },
];
export function OriginalFilmPage({ slug }: { slug: string }) {
  const page = originalFilmPages.find(p => p.slug === slug);
  if (!page) return null;
  return <article className="original-film-page"><a className="back-link" href="#watch">← 返回视频作品</a><header><p className="ed-eyebrow">{page.category}</p><h1>{page.film.title}</h1></header><InlineFilm film={page.film} autoPlay/><section className="original-film-brief"><p>{page.description}</p><div>{page.credits.map(credit => <span key={credit}>{credit}</span>)}</div></section>{slug === 'handdrawn-mg' && <details className="pet-reading-details"><summary>查看片头原画<span>人生绩效簿 · 标题画面</span></summary><img className="mg-original-art" src={asset('films/handdrawn-mg-cover.png')} alt="人生绩效簿手绘原画，蓝色夜空、星星与云朵" loading="lazy"/></details>}<nav className="film-next" aria-label="继续观看">{originalFilmPages.filter(p => p.slug !== slug).map(p => <a key={p.slug} href={p.film.href}>{p.film.title} ↗</a>)}</nav></article>;
}
export const isOriginalFilm = (slug: string | null) => originalFilmPages.some(p => p.slug === slug);
