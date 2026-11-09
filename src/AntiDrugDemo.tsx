import {useEffect, useRef, useState} from 'react';
import {Pause, Play} from 'lucide-react';
import {MotionPreview} from './VideoPortfolio';

const media=(name:string)=>`${import.meta.env.BASE_URL}portfolio/anti-drug-demo/${name}`;

export function DemoMotion({name,label}:{name:string;label:string}) {
  const root=useRef<HTMLDivElement>(null);
  const [paused,setPaused]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [near,setNear]=useState(false);
  useEffect(()=>{
    const el=root.current;if(!el)return;
    const observer=new IntersectionObserver(([entry])=>setNear(entry.isIntersecting),{rootMargin:'100px'});
    observer.observe(el);
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setPaused(motion.matches);
    motion.addEventListener('change',update);
    return()=>{observer.disconnect();motion.removeEventListener('change',update)};
  },[]);
  return <div ref={root} className="demo-motion" role="group" aria-label={label}>
    <MotionPreview src={media(`${name}.mp4`)} poster={media(`${name}.jpg`)} paused={paused||!near}/>
    <button type="button" onClick={()=>setPaused(value=>!value)} aria-label={`${paused?'播放':'暂停'}${label}`}>
      {paused?<Play size={14}/>:<Pause size={14}/>}<span>{paused?'播放':'暂停'}</span>
    </button>
  </div>;
}

export default function AntiDrugDemo(){
  return <section className="case-section demo-showcase" aria-label="试玩动态展示">
    <div><p className="section-kicker">试玩片段</p><h2>进入故事，做出你的选择。</h2></div>
    <div className="demo-showcase-grid">
      <figure><DemoMotion name="roles" label="人物志动态预览"/><figcaption><h3>从人物进入故事</h3><p>通过人物志认识故事中的角色与关系。</p></figcaption></figure>
      <figure><DemoMotion name="choice" label="剧情与分支选择动态预览"/><figcaption><h3>在情境中做出回应</h3><p>观看剧情，在关键节点选择回应，进入不同的故事分支。</p></figcaption></figure>
    </div>
  </section>;
}
