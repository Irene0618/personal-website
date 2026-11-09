import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play, Search, Shuffle, Sun, Moon, X } from 'lucide-react';
import type { CollectionProject } from './portfolioArchive';
import { projectDirections, projectSkills } from './projectCapabilities';
import OceanCanvas from './OceanCanvas';
import './ocean-explore.css';

const styles = [{mode:'type',label:'字符'}, {mode:'braille',label:'点阵'}, {mode:'geometry',label:'几何'}] as const;
const destination = (project: CollectionProject) => project.href || `#case-${project.slug}`;

export default function OceanExplore({projects,recommendations}:{projects:CollectionProject[];recommendations:CollectionProject[]}) {
  const [query,setQuery] = useState('');
  const [paused,setPaused] = useState(false);
  const [dark,setDark] = useState(true);
  const [style,setStyle] = useState(1);
  const [reduced,setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const recommendedSlugs=useMemo(()=>new Set(recommendations.map(project=>project.slug)),[recommendations]);
  const input = useRef<HTMLInputElement>(null);
  const firstResult = useRef<HTMLAnchorElement>(null);
  const matches = useMemo(() => {
    const words=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if(!words.length)return [];
    return projects.filter(project => {
      const text=[project.name,project.type,project.summary,project.slug,...project.outputs,...(project.directions||[]),...(projectDirections[project.slug]||[]),...(projectSkills[project.slug]||[])].join(' ').toLocaleLowerCase();
      return words.every(word => text.includes(word));
    }).sort((a,b)=>Number(recommendedSlugs.has(b.slug))-Number(recommendedSlugs.has(a.slug)));
  },[query,projects,recommendedSlugs]);

  useEffect(() => {
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion=()=>setReduced(media.matches);media.addEventListener('change',onMotion);
    return()=>media.removeEventListener('change',onMotion);
  },[]);

  const openRandom=()=>{if(recommendations.length)window.location.hash=destination(recommendations[Math.floor(Math.random()*recommendations.length)])};
  return <section className={`ocean-explore ${dark?'is-night':'is-day'}`} id="explore" aria-labelledby="ocean-heading">
    <OceanCanvas paused={paused} dark={dark} mode={styles[style].mode}/>
    <div className="ocean-explore-glow" aria-hidden="true"/>
    <div className="ocean-explore-top"><span>作品漫游</span><a href="#more-works">{projects.length} 件作品 <ArrowUpRight size={13}/></a></div>
    <div className="ocean-explore-center">
      <h2 id="ocean-heading">下一件，想看什么？</h2>
      <div className="ocean-search-wrap">
        <form className="ocean-search" role="search" onSubmit={event=>{event.preventDefault();if(matches[0])window.location.hash=destination(matches[0])}}>
          <Search size={20} aria-hidden="true"/>
          <input ref={input} aria-label="搜索作品" aria-controls={query.trim()?'ocean-results':undefined} value={query} onChange={event=>setQuery(event.target.value)} onKeyDown={event=>{if(event.key==='Escape')setQuery('');if(event.key==='ArrowDown'&&matches.length){event.preventDefault();firstResult.current?.focus()}}} placeholder="搜索作品名称、动画、UI、三维…" type="search" autoComplete="off"/>
          {query && <button type="button" aria-label="清空作品搜索" onClick={()=>{setQuery('');input.current?.focus()}}><X size={17}/></button>}
          <button type="submit" aria-label="打开首个匹配作品" disabled={!matches.length}><ArrowUpRight size={23}/></button>
        </form>
        {query.trim() && <div className="ocean-search-results" id="ocean-results">
          <p role="status">{matches.length?`找到 ${matches.length} 件作品`:'暂时没有找到，换个关键词试试。'}</p>
          <ul>{matches.slice(0,6).map((project,index)=><li key={project.slug}><a ref={index===0?firstResult:undefined} href={destination(project)}><img src={project.slug==='cheso-campus-campaign'?`${import.meta.env.BASE_URL}cheso-cover.jpg`:project.image} alt=""/><span><strong>{project.name}</strong><small>{project.type}</small></span><ArrowUpRight size={16}/></a></li>)}</ul>
          {matches.length>6&&<span className="ocean-results-hint">继续输入名称，可以找到更具体的作品。</span>}
        </div>}
      </div>
      <div className="ocean-search-suggestions" style={query.trim()?{visibility:'hidden'}:undefined} aria-label="试试这些关键词">{['动画','UI','三维'].map(word=><button key={word} onClick={()=>{setQuery(word);input.current?.focus()}}>{word}</button>)}<button onClick={openRandom} disabled={!recommendations.length}><Shuffle size={13}/> 随机看精选</button></div>
    </div>
    <div className="ocean-explore-bottom"><a href={`${import.meta.env.BASE_URL}credits/character-ocean/THIRD_PARTY_NOTICES.md`} target="_blank" rel="noreferrer" aria-label="查看字符海洋动效来源">CHARACTER OCEAN ↗</a><span>轻轻移动，泛起一点涟漪。</span><div className="ocean-explore-controls" role="toolbar" aria-label="作品海洋动效控制">
      <button className="ocean-style" onClick={()=>setStyle(value=>(value+1)%styles.length)} aria-label={`切换海洋字符风格，当前${styles[style].label}`}>{styles[style].label}</button>
      <button onClick={()=>setPaused(value=>!value)} aria-pressed={paused} disabled={reduced} aria-label={paused?'继续海洋动效':'暂停海洋动效'}>{paused?<Play size={16}/>:<Pause size={16}/>}</button>
      <button onClick={()=>setDark(value=>!value)} aria-label={dark?'切换浅色海洋':'切换深色海洋'}>{dark?<Sun size={16}/>:<Moon size={16}/>}</button>
    </div></div>
  </section>;
}
