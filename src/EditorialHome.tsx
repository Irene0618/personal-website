import { useEffect, useRef, useState } from 'react';
import './editorial.css';
import {VisualRail, MoreWorks} from './CollectionSections';
import AboutSection from './AboutSection';
import FlowerRipples from './FlowerRipples';
import {projectSkills} from './projectCapabilities';
import './capabilities.css';
import type {Experience} from './AboutSection';
const asset = (p: string) => `${import.meta.env.BASE_URL}portfolio/${p}`;
type Project = {slug:string;name:string;type:string;image:string;summary:string;stage:string;outputs:string[]};
const portraits = [
 {image:'portrait-garden.jpg',label:'花园里的我',caption:'in the garden'},
 {image:'portrait.jpg',label:'树荫下的我',caption:'a little sunshine'},
 {image:'portrait-temple.jpg',label:'旅行中的我',caption:'out & about'},
];
function PortraitHero({onOpen}:{onOpen:(i:number)=>void}) {
 const [spread,setSpread]=useState(true);
 const stage=useRef<HTMLDivElement>(null);
 const motion=useRef({x:0,y:0});
 useEffect(()=>{
  const el=stage.current;if(!el)return;let frame=0,x=0,y=0,last=0,visible=false;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const animate=(time:number)=>{frame=0;if(!visible||document.hidden||reduced.matches)return;const dt=Math.min(40,time-(last||time-16));last=time;const factor=1-Math.exp(-dt/130);x+=(motion.current.x-x)*factor;y+=(motion.current.y-y)*factor;el.style.setProperty('--px',`${x.toFixed(3)}`);el.style.setProperty('--py',`${y.toFixed(3)}`);if(Math.abs(x-motion.current.x)+Math.abs(y-motion.current.y)>.001)frame=requestAnimationFrame(animate)};
  const wake=()=>{if(!frame&&visible&&!document.hidden&&!reduced.matches){last=0;frame=requestAnimationFrame(animate)}};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;el.classList.toggle('is-offscreen',!visible);if(visible)wake();else{cancelAnimationFrame(frame);frame=0}});observer.observe(el);
  const hero=el.closest('.photo-hero')!;hero.addEventListener('pointermove',wake,{passive:true});hero.addEventListener('pointerleave',wake,{passive:true});document.addEventListener('visibilitychange',wake);
  const reset=()=>{if(reduced.matches){cancelAnimationFrame(frame);frame=0;x=0;y=0;el.style.setProperty('--px','0');el.style.setProperty('--py','0')}else wake()};reduced.addEventListener('change',reset);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();hero.removeEventListener('pointermove',wake);hero.removeEventListener('pointerleave',wake);document.removeEventListener('visibilitychange',wake);reduced.removeEventListener('change',reset)};
 },[]);
 return <section className="photo-hero" onPointerMove={e=>{if(e.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect();motion.current={x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5}}} onPointerLeave={()=>{motion.current={x:0,y:0}}}>
 <div className="photo-hero-heading"><div><span className="ed-eyebrow">HELLO, I'M</span><h1>张馨文<span>Irene</span></h1></div><p>UI 与交互设计 · AIGC 内容创作<br/><span className="hero-directions">品牌营销 · 产品运营</span><br/><span>哈尔滨工业大学（深圳） · 设计学硕士在读</span></p></div>
 <div className={`portrait-stage ${spread?'is-spread':'is-stacked'}`} ref={stage}>
 <div className="portrait-backdrop" aria-hidden="true">
  <div className="portrait-light"/>
  <div className="portrait-paper portrait-paper-sage"/>
  <div className="portrait-paper portrait-paper-vellum"/>
  <FlowerRipples/>
  <span className="portrait-archive-note">PERSONAL COLLECTION <i/> 2026</span>
 </div>
 <span className="portrait-watermark" aria-hidden="true">a few moments</span>
 {portraits.map((photo,i)=><div className={`portrait-position portrait-position-${i}`} key={photo.image} onAnimationEnd={e=>{if(e.target===e.currentTarget)e.currentTarget.style.animation="none"}}><div className="portrait-drift"><button className="portrait-print" onClick={()=>onOpen(i)} aria-label={`放大${photo.label}`}><div className="portrait-image"><img src={asset(photo.image)} alt={photo.label} {...{fetchpriority:"high"}}/></div><span className="portrait-caption"><small>0{i+1}</small><em>{photo.caption}</em><span>↗</span></span></button></div></div>)}
 <span className="portrait-side-note">PERSONAL ALBUM / 01—03</span>
 </div>
 <div className="photo-hero-bottom"><button onClick={()=>setSpread(v=>!v)} aria-pressed={spread}><span aria-hidden="true">▱</span> {spread?'叠放照片':'展开照片'}</button><span>欢迎来到我的个人网站</span><a href="#branches">浏览作品 <span>↓</span></a></div>
 </section>
}
const gallery = [
 ['snippet-03-book-light.jpg','书页里的光'],['snippet-05-blue-butterflies.jpg','蓝夜蝶群'],['snippet-10-color-cloud-boat.jpg','彩云小舟'],['snippet-08-sunset-running.jpg','落日奔跑'],['snippet-17-music-room.jpg','琴房光束'],['snippet-04-cosmic-figure.jpg','星尘人像'],
];
function SceneCover({project}:{project:Project}) {
 const image=project.slug==='ai-pet-incubation'?asset('ai-pet-case/motion/clip-3.gif'):project.image;
 return <a className="ed-cover" href={`#case-${project.slug}`}>
 <img src={image} alt={project.name} loading="lazy" className="active"/>
 <span className="ed-view">查看作品 <span>↗</span></span>
 </a>;
}
export default function EditorialHome({projects,experiences}:{projects:Project[];experiences:Experience[]}) {
 const [lightbox,setLightbox]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);

 useEffect(()=>{if(lightbox!==null){dialog.current?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old}}},[lightbox]);
 const selected=['ai-pet-incubation','anti-drug-interactive-film','electronic-yuefu'].map(slug=>projects.find(p=>p.slug===slug)!);
 const rest=projects.filter(p=>!selected.includes(p)||p.slug==='ai-pet-incubation');

 return <div className="editorial" id="top">
 <header className="ed-nav"><a className="ed-logo" href="#top">irene<small>张馨文</small></a><nav aria-label="主导航"><a href="#branches">精选作品</a><a href="#leaves">视觉手记</a><a href="#more-works">更多作品</a><a href="#trunk">关于我</a></nav><span className="ed-edition">PORTFOLIO — 2026</span></header>
 <main>
 <PortraitHero onOpen={i=>setLightbox(gallery.length+i)}/>
 <section className="ed-selected ed-section" id="branches"><div className="ed-section-title ed-reveal"><div><span className="ed-eyebrow">01 / SELECTED WORK</span><h2>精选作品</h2></div><p>UI 与交互、品牌营销、产品运营。<br/>在项目中展示方法与成果。</p></div>
 <div className="ed-projects">{selected.map((p,i)=><article className={`ed-project ed-reveal ed-project-${i}`} key={p.slug}><SceneCover project={p}/><div className="ed-project-info"><span className="ed-number">0{i+1}</span><div><div className="project-capabilities" aria-label="项目能力方向">{(i===0?['AIGC 内容制作','品牌营销','产品运营']:projectSkills[p.slug]||[p.type]).map(skill=><span key={skill}>{skill}</span>)}</div><h3><a href={`#case-${p.slug}`}>{i===0?'小龙吨吨':p.name} <span>↗</span></a></h3><p>{i===0?'参与 IP 品牌传播、栏目与更新节奏规划，以及小红书和抖音运营。参与制作的内容在小红书单条最高点赞量为3.5w赞。':i===1?'让“知道风险”，成为面对社交压力时的行动能力。':'把诗词、AI 音乐和交互网页放在一起，重新体验采诗入乐。'}</p><div className="ed-tags">{(projectSkills[p.slug]||p.outputs).slice(0,4).map(t=><span key={t}>{t}</span>)}</div></div><span className="ed-project-year">{i===0?'单条最高点赞量3.5w赞 · 账号总粉丝1.5万':i===1?'166 份问卷 · 互动原型':'交互网页 · AI 音乐'}</span></div></article>)}</div>
 </section>
 <VisualRail/>
 <MoreWorks projects={rest}/>
 <AboutSection experiences={experiences}/>
 </main><footer className="ed-footer"><div><span className="ed-eyebrow">THANK YOU FOR WANDERING</span><p>感谢浏览。</p></div><a href="#top" aria-label="回到顶部">↑</a><div className="ed-footer-bottom"><span>张馨文 · IRENE</span><span>© 2026 Irene</span></div></footer>
 <dialog ref={dialog} className="ed-lightbox" onClose={()=>setLightbox(null)} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><button className="ed-close" onClick={()=>dialog.current?.close()} aria-label="关闭图片">关闭 ×</button>{lightbox!==null&&<><img src={asset(lightbox<gallery.length?'visual-snippets/'+gallery[lightbox][0]:portraits[lightbox-gallery.length].image)} alt={lightbox<gallery.length?gallery[lightbox][1]:portraits[lightbox-gallery.length].label}/><p>{lightbox<gallery.length?gallery[lightbox][1]:portraits[lightbox-gallery.length].label}</p></>}</dialog>
 </div>
}
