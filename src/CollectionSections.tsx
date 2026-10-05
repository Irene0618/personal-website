import {useEffect, useRef, useState} from 'react';
import './collections.css';
import LiquidGallery from './LiquidGallery';
type Project={slug:string;name:string;type:string;image:string;summary:string;stage:string;outputs:string[]};
const asset=(p:string)=>`${import.meta.env.BASE_URL}portfolio/${p}`;
const notes=[['01-puzzle-light','拼图光影'],['02-wire-figure','线框雕塑'],['03-book-light','书页光束'],['04-cosmic-figure','星尘人像'],['05-blue-butterflies','蓝夜蝶群'],['06-cosmic-heart','宇宙心脏'],['07-glowing-chest','胸口微光'],['08-sunset-running','落日奔跑'],['09-white-butterflies','白蝶花田'],['10-color-cloud-boat','彩云小舟'],['11-hands-butterfly','掌心蝶光'],['12-blue-fridge','蓝色冰箱'],['13-green-running','草坡奔流'],['14-glowing-feet','足底字光'],['15-blue-embrace','蓝色拥抱'],['16-water-fall','坠入水光'],['17-music-room','琴房光束'],['18-puppet-light','牵线光影'],['19-pink-hand','掌心羽毛'],['20-starry-eyes','星河眼眸']];
export function VisualRail(){
 const rail=useRef<HTMLDivElement>(null),drag=useRef<{x:number;left:number}|null>(null);const [progress,setProgress]=useState(0);
 useEffect(()=>{const el=rail.current;if(!el)return;let timer=0;
 const wheel=(e:WheelEvent)=>{if(e.ctrlKey||e.metaKey)return;const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;const end=el.scrollWidth-el.clientWidth;if((delta>0&&el.scrollLeft>=end-1)||(delta<0&&el.scrollLeft<=1))return;e.preventDefault();el.scrollLeft+=delta*(e.deltaMode===1?20:e.deltaMode===2?el.clientWidth:1);el.style.setProperty('--rail-lean',`${Math.max(-3,Math.min(3,delta*.035))}deg`);window.clearTimeout(timer);timer=window.setTimeout(()=>el.style.setProperty('--rail-lean','0deg'),160)};
 const resize=new ResizeObserver(()=>setProgress(el.scrollLeft/Math.max(1,el.scrollWidth-el.clientWidth)));resize.observe(el);el.addEventListener('wheel',wheel,{passive:false});return()=>{resize.disconnect();el.removeEventListener('wheel',wheel);window.clearTimeout(timer)}},[]);
 const move=(direction:number)=>rail.current?.scrollBy({left:direction*520,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 return <section className="notes-strip" id="leaves"><div className="notes-toolbar"><div><span>02 / VISUAL NOTES</span><h2>视觉手记</h2><small>20 个创作片段</small></div><div className="notes-actions"><span>滚动 · 拖动浏览</span><button aria-label="向左浏览视觉手记" onClick={()=>move(-1)} disabled={progress<.001}>←</button><button aria-label="向右浏览视觉手记" onClick={()=>move(1)} disabled={progress>.999}>→</button></div></div>
 <div className="notes-rail" ref={rail} tabIndex={0} role="region" aria-label="视觉手记横向画廊，可拖动或使用左右方向键" onScroll={e=>{const el=e.currentTarget;setProgress(el.scrollLeft/Math.max(1,el.scrollWidth-el.clientWidth))}} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}} onPointerDown={e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag.current={x:e.clientX,left:e.currentTarget.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.classList.add('is-dragging')}} onPointerMove={e=>{if(drag.current)e.currentTarget.scrollLeft=drag.current.left+drag.current.x-e.clientX}} onPointerUp={e=>{drag.current=null;e.currentTarget.classList.remove('is-dragging');if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)}} onPointerCancel={e=>{drag.current=null;e.currentTarget.classList.remove('is-dragging')}}>
 {notes.map(([file,title],i)=><figure className="note-frame" key={file}><div><img src={asset(`visual-snippets/snippet-${file}.jpg`)} alt={title} draggable={false} loading="lazy"/></div><figcaption><span>{String(i+1).padStart(2,'0')}</span>{title}</figcaption></figure>)}
 </div><div className="notes-track"><span style={{transform:`translateX(${progress*300}%)`}}/></div></section>
}
const categories=['全部','AIGC 影像','交互网页','产品体验','品牌视觉','思辨设计'];
const tags:Record<string,string[]>={
 'game-design-lab':['交互网页'],
 'ai-pet-incubation':['AIGC 影像'],
 'cheso-campus-campaign':['AIGC 影像','品牌视觉'],'wunian-ai-film':['AIGC 影像'],'cocoon':['AIGC 影像'],'electronic-yuefu':['交互网页'],'qin-yun':['产品体验','品牌视觉'],'ladywell':['产品体验','交互网页'],'botopia':['思辨设计'],'zhuangyuan-qijing':['品牌视觉'],'art-heals':['产品体验'],'digital-zuel':['交互网页'],
};
const descriptions:Record<string,string>={
 'game-design-lab':'面向游戏策划学习者，设计记录、案例分析、同伴评审与项目验证的学习平台。',
 'ai-pet-incubation':'参与小龙吨吨 IP 孵化、AIGC 内容制作与双平台运营，参与制作的内容单条最高点赞量为3.5w赞。',
 'cheso-campus-campaign':'以“小题大作”为主题，用 AI 视频、海报和校园创作活动，呈现把日常灵感做成作品的过程。',
 'wunian-ai-film':'在 8 小时设计黑客松中，完成创意、分镜、AI 生成与剪辑。',
 'cocoon':'围绕青春期成长的五章梦境，探索 AI 镜头与叙事表达。',
 'electronic-yuefu':'把诗词、AI 音乐和交互网页放在一起，重新体验采诗入乐。',
 'qin-yun':'从古琴与五音文化出发，设计音箱、配套 App 和使用体验。',
 'ladywell':'关注更年期女性的健康与情绪，设计内容、陪伴和服务触点。',
 'botopia':'从植物的视角，重新讨论人与自然、技术之间的关系。',
 'zhuangyuan-qijing':'将地方状元文化转化为包装、文创产品与系列视觉。',
 'art-heals':'面向大学生的艺术疗愈内容社区与线上线下活动策划。',
 'digital-zuel':'以三维场景、展示动画和数字文创，探索校园互动平台。',
};
const shortName=(p:Project)=>p.slug==='ai-pet-incubation'?'小龙吨吨 IP 孵化与跨平台运营':p.slug==='cheso-campus-campaign'?'Cheso 校园创作计划':p.slug==='wunian-ai-film'?'勿念':p.name;
const cover=(p:Project)=>p.slug==='cheso-campus-campaign'?`${import.meta.env.BASE_URL}cheso-cover.jpg`:p.image;
export function MoreWorks({projects}:{projects:Project[]}){
 const [category,setCategory]=useState('全部'),[activeSlug,setActiveSlug]=useState('cheso-campus-campaign');
 const order=['ai-pet-incubation','cheso-campus-campaign','electronic-yuefu','wunian-ai-film','qin-yun','botopia','cocoon','ladywell','zhuangyuan-qijing','digital-zuel','art-heals','game-design-lab'];
 const ordered=[...projects].sort((a,b)=>order.indexOf(a.slug)-order.indexOf(b.slug));
 const filtered=ordered.filter(p=>category==='全部'||tags[p.slug]?.includes(category));
 const active=filtered.find(p=>p.slug===activeSlug)||filtered[0];
 return <section className="work-collection ed-section" id="more-works"><header className="work-collection-heading"><div><span className="ed-eyebrow">03 / PROJECT COLLECTION</span><h2>更多作品<span>{String(projects.length).padStart(2,'0')}</span></h2></div><p>IMAGE / INTERACTION / DESIGN<br/><span>影像、交互与设计</span></p></header>
 <div className="work-categories" aria-label="作品分类">{categories.map(cat=><button key={cat} aria-pressed={category===cat} onClick={()=>setCategory(cat)}>{cat}<sup>{cat==='全部'?projects.length:projects.filter(p=>tags[p.slug]?.includes(cat)).length}</sup></button>)}</div>
 {active&&<div className="work-spotlight liquid-spotlight" key={`spotlight-${category}`}>
  <LiquidGallery slides={filtered.map(p=>({slug:p.slug,name:shortName(p),image:cover(p)}))} active={filtered.indexOf(active)} onSelect={i=>setActiveSlug(filtered[i].slug)}/>
  <div className="orbit-title" key={`title-${active.slug}`}><span>{String(filtered.indexOf(active)+1).padStart(2,'0')}</span><h3><a href={`#case-${active.slug}`}>{shortName(active)}</a></h3><div className="orbit-summary"><p>{descriptions[active.slug]||active.summary}</p><div className="orbit-disciplines">{active.outputs.slice(0,3).map(output=><span key={output}>{output}</span>)}</div></div></div>
  <div className="orbit-meta" key={`meta-${active.slug}`}><span>{tags[active.slug]?.[0]}</span><small>{active.stage.match(/20\d{2}/)?.[0]||'PROJECT'}</small></div>
  <nav className="orbit-index" aria-label="切换主展示作品">{filtered.map((p,i)=><button key={p.slug} aria-label={`预览${shortName(p)}`} aria-pressed={active.slug===p.slug} onClick={()=>setActiveSlug(p.slug)}><small>{String(i+1).padStart(2,'0')}</small><span>{shortName(p)}</span></button>)}</nav>
 </div>}

 </section>
}
