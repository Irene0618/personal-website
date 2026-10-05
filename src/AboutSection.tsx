import {useState} from 'react';
import './about.css';

export type Experience = {slug:string; year:string; title:string; detail:string; tags:string[]};
const categories=['全部','实习经历','教育背景','校园经历'];
const entries:Record<string,{category:string;organization:string;role:string;highlights:string[]}>= {
 'ai-pet-internship':{category:'实习经历',organization:'TCL',role:'AIGC设计实习',highlights:['46 集内容上线','单条最高点赞量 3.5w 赞']},
 'xinhua-internship':{category:'实习经历',organization:'新华社音视频部',role:'实习生',highlights:['《精彩世运》','音视频策划与制作']},
 'hitsz-master':{category:'教育背景',organization:'哈尔滨工业大学（深圳）',role:'设计学硕士 · 数字媒体',highlights:['专业排名 4/33','校特等奖学金']},
 'hitsz-photo-association':{category:'校园经历',organization:'哈工深摄影协会',role:'副会长',highlights:['摄影活动策划','社群内容运营']},
 'zuel-undergraduate':{category:'教育背景',organization:'中南财经政法大学',role:'动画与游戏设计本科',highlights:['专业排名 1/149','国家奖学金']},
 'zuel-media-center':{category:'校园经历',organization:'ZUEL党委宣传部新媒体中心',role:'视频主编',highlights:['单条最高播放 539w+','单条点赞 10w+']},
};
const order=['ai-pet-internship','xinhua-internship','hitsz-master','hitsz-photo-association','zuel-media-center','zuel-undergraduate'];

export default function AboutSection({experiences}:{experiences:Experience[]}){
 const [category,setCategory]=useState('全部');
 const [open,setOpen]=useState<string|null>(null);
 const sorted=order.flatMap(slug=>experiences.filter(e=>e.slug===slug));
 const visible=sorted.filter(e=>category==='全部'||entries[e.slug].category===category);
 return <section className="about-journal ed-section" id="trunk">
  <header className="about-heading ed-reveal"><div><span className="ed-eyebrow">04 / ABOUT & EXPERIENCE</span><h2>关于我</h2></div><span className="about-period">2020 — 2027<span>学习与实践</span></span></header>
  <div className="about-layout">
   <aside className="about-profile">
    <div className="about-portrait"><img src={`${import.meta.env.BASE_URL}portfolio/portrait-garden.jpg`} alt="张馨文在花园中" loading="lazy"/><div><span>张馨文</span><em>Irene</em></div></div>
    <p>哈尔滨工业大学深圳校区设计学硕士在读。本科从动画与游戏设计出发，现在将影像叙事与用户研究结合，探索 AI 内容产品和交互体验。</p>
    <div className="about-interests"><span>AI 内容产品</span><span>交互设计</span><span>影像创作</span></div>
    <div className="about-profile-note"><span className="about-orbit" aria-hidden="true"><i/></span><span>从学习到实践<br/>持续记录我的经历</span></div>
   </aside>
   <div className="experience-index">
    <div className="experience-filters" aria-label="经历分类">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setOpen(null)}}>{c}<small>{c==='全部'?experiences.length:experiences.filter(e=>entries[e.slug]?.category===c).length}</small></button>)}</div>
    <div className="experience-list" key={category}>
     {visible.map(e=>{const entry=entries[e.slug];const expanded=open===e.slug;return <article className={`experience-entry ${expanded?'is-open':''}`} key={e.slug}>
      <h3><button className="experience-trigger" aria-expanded={expanded} aria-controls={`experience-panel-${e.slug}`} onClick={()=>setOpen(expanded?null:e.slug)}>
       <span className="experience-date"><span className="experience-date-value">{e.year.includes(' 至 ')?e.year.split(' 至 ').map((date,i)=><span key={date}>{i===1?'至 ':''}{date}</span>):e.year}</span><small>{entry.category}</small></span>
       <span className="experience-heading"><span className="experience-organization">{entry.organization}</span><span className="experience-role">{entry.role}</span><span className="experience-highlights">{entry.highlights.map(h=><span key={h}>{h}</span>)}</span></span>
       <span className="experience-toggle" aria-hidden="true"><i/><i/></span>
      </button></h3>
      <div id={`experience-panel-${e.slug}`} className="experience-expansion" inert={!expanded} aria-hidden={!expanded}>
       <div><div className="experience-body">
        <p>{e.detail.replace('并传播场景','并依据传播场景')}</p>
        {e.slug==='ai-pet-internship'&&<p>参与小红书与抖音账号的内容调研、栏目和更新节奏规划及 AIGC 短视频制作。参与制作的《出逃成功！小龙吨吨的假期出逃vlog》单条最高点赞量为3.5w赞，小红书账号总粉丝为1.5万。</p>}
        <a href={e.slug==='ai-pet-internship'?'#case-ai-pet-incubation':`#experience-${e.slug}`}>查看完整经历与作品 <span aria-hidden="true">↗</span></a>
       </div></div>
      </div>
     </article>})}
    </div>
    <div className="experience-index-footer"><span aria-live="polite">{visible.length} 段经历</span><span>点击经历展开</span></div>
   </div>
  </div>
 </section>
}
