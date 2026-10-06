import {useEffect, useRef, useState} from 'react';
import type {CSSProperties} from 'react';
import './book-opening.css';

type Props={onReveal:()=>void;onComplete:()=>void};
const paperFlights=Array.from({length:16},(_,i)=>{
 const angle=(i/16)*Math.PI*2-.8;
 return {x:Math.cos(angle)*(52+i%3*12),y:Math.sin(angle)*(48+i%4*8),rotation:(i%2?1:-1)*(140+i*31),delay:i%4*.025};
});
const butterflies=Array.from({length:22},(_,i)=>{
 const angle=(i/22)*Math.PI*2-.7;
 return {x:Math.cos(angle)*(47+i%4*9),y:Math.sin(angle)*(47+i%3*12)-12,delay:.12+(i%7)*.09,duration:2.9+(i%5)*.25,size:26+(i%5)*9,tilt:Math.cos(angle)*32,color:['#526d48','#859568','#b2ba8b','#36543c','#d1c8a6'][i%5]};
});
function Butterfly({index}:{index:number}){
 return <svg viewBox="0 0 100 80" className="opening-butterfly" aria-hidden="true">
  <g className="butterfly-wing wing-left"><path d="M49 38C39 12 7 1 5 18C2 35 18 46 34 46C16 47 14 72 29 73C43 74 50 50 49 38Z"/><path className="wing-vein" d="M48 40 15 20M46 43 22 36M47 44 29 62"/><circle cx="18" cy="24" r="4"/></g>
  <g className="butterfly-wing wing-right"><path d="M51 38C61 12 93 1 95 18C98 35 82 46 66 46C84 47 86 72 71 73C57 74 50 50 51 38Z"/><path className="wing-vein" d="M52 40 85 20M54 43 78 36M53 44 71 62"/><circle cx="82" cy="24" r="4"/></g>
  <path className="butterfly-body" d="M50 28Q46 47 50 61Q54 46 50 28M49 30Q43 18 39 20M51 30Q57 18 61 20"/>
  <title>{`蝴蝶 ${index+1}`}</title>
 </svg>;
}
export default function BookOpening({onReveal,onComplete}:Props){
 const [opened,setOpened]=useState(false);
 const callbacks=useRef({onReveal,onComplete});callbacks.current={onReveal,onComplete};
 const scene=useRef<HTMLDivElement>(null),book=useRef<HTMLButtonElement>(null),finished=useRef(false);
 const reduced=useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const finish=()=>{if(finished.current)return;finished.current=true;callbacks.current.onReveal();callbacks.current.onComplete()};
 useEffect(()=>{
  const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  scene.current?.focus({preventScroll:true});
  const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.preventDefault();finish()}if(event.key==='Tab'){const targets=Array.from(scene.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')??[]);const first=targets[0],last=targets[targets.length-1];if(event.shiftKey&&(document.activeElement===first||document.activeElement===scene.current)){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}}};
  window.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',key)};
 },[]);
 useEffect(()=>{
  if(!opened)return;
  const reveal=window.setTimeout(()=>callbacks.current.onReveal(),reduced.current?180:3550);
  const done=window.setTimeout(finish,reduced.current?650:4350);
  return()=>{window.clearTimeout(reveal);window.clearTimeout(done)};
 },[opened]);
 const open=()=>{if(!opened)setOpened(true)};
 return <div className={`book-opening ${opened?'is-opened':''} ${reduced.current?'is-gentle':''}`} ref={scene} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Irene 的作品集开场">
  <div className="opening-paper-light" aria-hidden="true"/>
  <header className="opening-header"><span>IRENE / PORTFOLIO</span><button onClick={finish} className="opening-skip">跳过开场 <span aria-hidden="true">↗</span></button></header>
  <div className="opening-book-scene">
   <div className="opening-book-shadow" aria-hidden="true"/>
   <button ref={book} className="opening-book" onClick={open} disabled={opened} aria-label="打开书本，进入 Irene 的作品集">
    <span className="book-page-block" aria-hidden="true"/>
    <span className="book-back" aria-hidden="true"/>
    <span className="book-cover">
     <span className="book-spine"/>
     <span className="book-cover-border"/>
     <span className="book-edition">VOL. 01 <span>2026</span></span>
     <span className="book-title">Irene<span>A personal collection</span></span>
     <svg viewBox="0 0 180 150" className="book-botanical" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth=".9"><path d="M90 64C72 29 27 14 25 44C23 67 50 79 80 77C48 74 42 111 64 118C80 123 91 87 90 64ZM90 64C108 29 153 14 155 44C157 67 130 79 100 77C132 74 138 111 116 118C100 123 89 87 90 64Z"/><path d="M90 59V102M88 61Q74 39 67 43M92 61Q106 39 113 43M84 72 39 44M83 74 45 66M86 82 61 105M96 72 141 44M97 74 135 66M94 82 119 105"/><ellipse cx="90" cy="77" rx="4" ry="16"/><circle cx="90" cy="75" r="69" strokeDasharray="1 6" opacity=".45"/></g></svg>
     <span className="book-colophon">DESIGN · IMAGE · EVERYDAY<br/><small>张馨文 / Selected works</small></span>
    </span>
    <span className="book-ribbon" aria-hidden="true"/>
   </button>
   <p className="opening-invitation">点击，翻开这一页 <span aria-hidden="true">↗</span></p>
  </div>
  <div className="opening-burst" aria-hidden="true">
   {paperFlights.map((p,i)=><i className={`burst-page burst-page-${i%4}`} key={i} style={{'--fly-x':`${p.x}vw`,'--fly-y':`${p.y}vh`,'--fly-turn':`${p.rotation}deg`,'--delay':`${p.delay}s`,'--page-angle':`${i*19}deg`} as CSSProperties}><span>{i%3===0?'Irene':String(i+1).padStart(2,'0')}</span></i>)}
  </div>
  <div className="opening-flight" aria-hidden="true">
   {butterflies.map((b,i)=><div key={i} className="butterfly-route" style={{'--fly-x':`${b.x}vw`,'--fly-y':`${b.y}vh`,'--bend-x':`${b.x*.35+(i%2?13:-13)}vw`,'--bend-y':`${b.y*.35-16}vh`,'--delay':`${b.delay}s`,'--duration':`${b.duration}s`,'--size':`${b.size}px`,'--tilt':`${b.tilt}deg`,'--wing-speed':`${.15+i%4*.045}s`,'--butterfly-color':b.color} as CSSProperties}><Butterfly index={i}/></div>)}
  </div>
  <div className="opening-signature" aria-label="Irene">
   <svg viewBox="0 0 600 240" role="img" aria-label="Irene 手写签名">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
     <path className="signature-stroke signature-capital" pathLength="1" d="M62 83C96 61 154 43 191 52C207 56 204 65 189 68M166 53C144 91 120 141 102 176C93 194 78 202 65 195C47 184 88 159 132 161"/>
     <path className="signature-stroke signature-rest" pathLength="1" d="M127 162C143 166 161 140 170 122C179 103 189 101 179 126L158 163C178 130 192 119 205 125C216 130 211 143 203 144C191 145 212 159 226 151C251 136 266 114 253 111C237 106 222 132 226 150C231 172 261 165 281 143L297 116L273 162C293 134 310 115 321 120C333 126 306 150 316 160C326 169 347 150 354 140C370 122 383 112 388 120C395 132 373 146 354 141C339 174 377 176 405 153C420 140 432 129 439 133"/>
     <path className="signature-stroke signature-flourish" pathLength="1" d="M124 194C214 174 367 178 461 166C507 160 506 178 482 184"/>
    </g>
   </svg>
   <span>张馨文 · PORTFOLIO</span>
  </div>
  <footer className="opening-footer"><span>DESIGN & OTHER LITTLE THINGS</span><span>01 — OPENING</span></footer>
 </div>;
}
