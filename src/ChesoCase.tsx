import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Maximize2, Play, Volume2, VolumeX, X } from 'lucide-react';
import './cheso-case.css';

const asset = (file: string) => `${import.meta.env.BASE_URL}portfolio/cheso-case/${file}`;
const filmSource = 'https://irene0618.github.io/cheso-campus-report/cheso-tvc-web.mp4';
const chapters = [
  { id: 'cheso-film', number: '01', label: '品牌影像' },
  { id: 'cheso-poster', number: '02', label: '主题海报' },
  { id: 'cheso-making', number: '03', label: '制作过程' },
  { id: 'cheso-plan', number: '04', label: '校园策划' },
];
type PreviewImage = { src: string; alt: string; caption: string };

export default function ChesoCase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [muted, setMuted] = useState(true);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activeChapter, setActiveChapter] = useState('cheso-film');
  const [preview, setPreview] = useState<PreviewImage | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let active = true;
    video.muted = true;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      void video.play().catch(() => { if (active && video.paused) setNeedsPlay(true); });
    } else {
      setNeedsPlay(true);
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveChapter(entry.target.id);
      }
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    chapters.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      active = false;
      video.pause();
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);

  useEffect(() => {
    if (!preview) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  };
  const openImage = (image: PreviewImage) => {
    setZoomed(false);
    setPreview(image);
  };
  const playFilm = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.ended) video.currentTime = 0;
    void video.play().then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true));
  };
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) playFilm();
  };
  const poster = {
    src: asset('poster-final.png'),
    alt: 'CHESO 小题大作主题海报，黑白摄制组为校园小猫拍摄，米白纸纹背景配金色品牌字样',
    caption: '小题大作 · CHESO 主题海报',
  };

  return (
    <article className="cheso-case">
      <div className="cheso-topbar">
        <a className="cheso-back" href="#branches"><ArrowLeft size={15} />返回精选作品</a>
        <nav aria-label="CHESO 案例目录">
          {chapters.map((chapter) => <button key={chapter.id} type="button"
            aria-current={activeChapter === chapter.id ? 'location' : undefined}
            onClick={() => goTo(chapter.id)}><span>{chapter.number}</span>{chapter.label}</button>)}
        </nav>
        <span className="cheso-edition">SELECTED WORK / 2026</span>
      </div>

      <section className="cheso-opening" id="cheso-film" aria-labelledby="cheso-title">
        <div className="cheso-opening-line"><span>CHESO CAMPUS LAB</span><span>张馨文 / 品牌创意与 AI 影像</span></div>
        <div className="cheso-hero-grid">
          <header className="cheso-title-block">
            <p className="cheso-kicker">腾讯 Cheso 校园创作计划</p>
            <h1 id="cheso-title"><span>小题</span><span>大作<i>.</i></span></h1>
            <p className="cheso-tagline">帮你把小灵感，<br />变成大制作。</p>
            <p className="cheso-english">Small ideas.<br />Remarkable presentations.</p>
            <div className="cheso-title-tags"><span>品牌创意</span><span>AIGC 影像</span><span>校园推广</span></div>
          </header>
          <div className="cheso-film-block">
            <div className="cheso-film-label"><span><i />01 / 品牌宣传片</span><span>CHESO TVC · 01:31</span></div>
            <div className="cheso-video-shell">
              <video ref={videoRef} controls playsInline muted preload="auto"
                poster={asset('film-cover.jpg')} aria-label="CHESO 小题大作品牌广告片"
                onPlay={() => setNeedsPlay(false)} onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
                onError={() => setVideoError(true)}>
                <source src={filmSource} type="video/mp4" onError={() => setVideoError(true)} />
                你的浏览器暂不支持内嵌视频，请打开视频文件观看。
              </video>
              {needsPlay && !videoError && <button className="cheso-play-overlay" type="button" onClick={playFilm} aria-label="播放 CHESO 广告片"><Play size={26} fill="currentColor" /><span>播放影片</span></button>}
            </div>
            <div className="cheso-film-caption">
              <p>{videoError ? '视频暂时无法加载，请打开视频文件观看。' : '让日常里的小题目，拥有电影般的呈现。'}</p>
              {videoError ? <a href={filmSource} target="_blank" rel="noreferrer">打开视频文件<ArrowUpRight size={15} /></a>
                : <button type="button" onClick={toggleSound} aria-pressed={!muted}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}{muted ? '开启声音' : '关闭声音'}</button>}
            </div>
            <div className="cheso-film-credits"><span>CONCEPT / AI GENERATION / EDITING</span><span>独立创作 · 2026.09</span></div>
          </div>
        </div>
        <div className="cheso-opening-bottom"><p>一支广告片，一张主题海报，一次校园创作计划。</p><button type="button" onClick={() => goTo('cheso-poster')}>继续探索<ArrowDown size={16} /></button></div>
      </section>

      <section className="cheso-brief" aria-labelledby="cheso-brief-title">
        <div><p className="cheso-kicker">THE IDEA</p><h2 id="cheso-brief-title">小事，值得认真呈现。</h2></div>
        <div className="cheso-brief-body"><p>我把 Cheso 想象成一支认真拍大片的制作团队。让校园里的一只小猫、一个日常发现成为镜头主角，用片场的大阵仗与生活的小题目形成反差，呈现 AI 帮助学生把零散灵感做成完整作品的过程。</p><dl><div><dt>我的工作</dt><dd>概念设计、视觉设定、AI 生成、剪辑与推广策划</dd></div><div><dt>创作工具</dt><dd>即梦 · Lib TV</dd></div></dl></div>
      </section>

      <section className="cheso-section cheso-poster-section" id="cheso-poster" aria-labelledby="cheso-poster-title">
        <div className="cheso-section-heading"><p className="cheso-kicker">02 / KEY VISUAL</p><span>主题海报</span></div>
        <div className="cheso-poster-layout">
          <div className="cheso-poster-copy">
            <span className="cheso-large-number" aria-hidden="true">02</span>
            <h2 id="cheso-poster-title">小小的主角，<br />大大的制作。</h2>
            <p className="cheso-poster-lead">主角负责悠闲，<br />片场负责认真。</p>
            <p>灯光、摄影机、收音杆与摄制组围绕一只小猫展开。用认真的制作阵仗，放大日常观察的表达价值。</p>
            <p>米白纸纹、黑白影像与金色品牌字样，让海报像一张电影宣传画。竖向的大字把“小题”与“大作”连在一起，留下明确的主题记忆。</p>
            <div className="cheso-poster-quote"><span>FROM FIRST SPARK</span><em>to final slide.</em></div>
            <button className="cheso-text-button" type="button" onClick={() => openImage(poster)}>查看完整海报<Maximize2 size={15} /></button>
          </div>
          <figure className="cheso-poster-figure"><button type="button" className="cheso-image-button" onClick={() => openImage(poster)} aria-label="放大查看小题大作主题海报"><img src={poster.src} alt={poster.alt} loading="lazy" width="941" height="1672" /><span className="cheso-image-hint"><Maximize2 size={14} />查看细节</span></button><figcaption><span>CHESO / 小题大作</span><span>主题视觉 · 2026</span></figcaption></figure>
        </div>
      </section>

      <section className="cheso-section cheso-making" id="cheso-making" aria-labelledby="cheso-making-title">
        <div className="cheso-section-heading"><div><p className="cheso-kicker">03 / BEHIND THE SCENES</p><h2 id="cheso-making-title">从画面构思，到影像成片。</h2></div><span>AI 制作手记</span></div>
        <p className="cheso-section-intro">先确定主体、场景和视觉关系，再生成关键画面与动态镜头。通过筛选、迭代和剪辑，统一人物、画面风格与叙事节奏。</p>
        <div className="cheso-process-line">{['概念与分镜', '角色与场景生成', '动态镜头迭代', '剪辑与声音'].map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div>
        <div className="cheso-workspaces">
          {[
            { file: 'jimeng-image-workspace.png', title: '即梦', subtitle: '角色、场景与关键画面', copy: '通过角色设定、场景控制图和提示词，确认人物造型、主体比例与镜头构图。' },
            { file: 'libtv-video-workspace.png', title: 'Lib TV', subtitle: '动态镜头与画面迭代', copy: '将关键画面延展成视频，比较运动、衔接与画面稳定性，再筛选镜头进入剪辑。' },
          ].map((workspace) => <figure key={workspace.file}><button className="cheso-image-button" type="button" aria-label={`放大查看${workspace.title}制作画布`} onClick={() => openImage({ src: asset(workspace.file), alt: workspace.subtitle, caption: `${workspace.title} · ${workspace.subtitle}` })}><img src={asset(workspace.file)} alt={`${workspace.title}的${workspace.subtitle}工作画布`} loading="lazy" /><span className="cheso-image-hint"><Maximize2 size={14} />查看工作画布</span></button><figcaption><h3>{workspace.title}<span>{workspace.subtitle}</span></h3><p>{workspace.copy}</p></figcaption></figure>)}
        </div>
      </section>

      <section className="cheso-section cheso-plan" id="cheso-plan" aria-labelledby="cheso-plan-title">
        <div className="cheso-section-heading"><div><p className="cheso-kicker">04 / CAMPUS CAMPAIGN</p><h2 id="cheso-plan-title">让同学的选题，成为作品。</h2></div><span className="cheso-plan-status">校园创作赛提案</span></div>
        <p className="cheso-section-intro">面向深圳大学城学生，邀请同学自选生活、兴趣、课程或团队项目中的题目，用 Cheso 制作 PPT 或海报，在真实创作中体验产品。</p>
        <div className="cheso-plan-facts">{[
          ['20', '组', '首轮招募建议'], ['4', '周', '比赛排期建议'], ['1', '万元', '现金预算建议'], ['30', '天', '活动后回访观察'],
        ].map(([number, unit, label]) => <div key={label}><strong>{number}<span>{unit}</span></strong><p>{label}</p></div>)}</div>
        <p className="cheso-plan-note">以上为提案中的待确认参数。现金预算不含产品消耗与内部工时，正式开展前需完成产品测试与资源确认。</p>
        <div className="cheso-plan-content"><div><h3>从一个题目开始</h3><ol>{[
          ['自主选题', '提交想讲的事情与作品形式，个人或小组参加。'],
          ['获得试用支持', '确认账号、额度与使用期限，领取创作说明。'],
          ['制作与点评', '生成初稿、核对内容、修改页面，在答疑和点评后完善作品。'],
          ['展示与回访', '提交评选，经授权分享作品，并了解后续的新需求与使用选择。'],
        ].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol></div><aside><p className="cheso-kicker">WHAT TO OBSERVE</p><h3>用实际作品，<br />观察产品体验。</h3><p>记录开始创作、完成作品与修改的过程。活动结束后，再了解同学有没有新题目，以及为什么继续使用或选择其他工具。</p><p>同时记录辅导时间与产品消耗，为下一轮活动判断投入。</p><a className="cheso-plan-link" href="https://irene0618.github.io/cheso-campus-report/#plan" target="_blank" rel="noreferrer">阅读完整校园策划<ArrowUpRight size={17} /></a><span className="cheso-plan-link-note">12 页提案与策划全文</span></aside></div>
      </section>
      <div className="cheso-endnote"><p>从一个小灵感开始。<br /><em>Make something remarkable.</em></p><a href="#branches">返回精选作品<ArrowUpRight size={18} /></a></div>

      <dialog className={`cheso-lightbox${zoomed ? ' is-zoomed' : ''}`} ref={dialogRef} onCancel={() => setPreview(null)} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }}>
        {preview && <><header><p>{preview.caption}</p><div><button type="button" onClick={() => setZoomed(!zoomed)}>{zoomed ? '适应窗口' : '放大细节'}</button><button autoFocus type="button" aria-label="关闭图片预览" onClick={() => setPreview(null)}><X size={22} /></button></div></header><div className="cheso-lightbox-canvas"><img src={preview.src} alt={preview.alt} /></div></>}
      </dialog>
    </article>
  );
}
