import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import type {PointerEvent} from 'react';
import './pull-badge.css';

const photos=[
 {file:'irene-garden.jpg',alt:'Irene 在紫色花丛旁',position:'46% 43%',label:'IN THE GARDEN'},
 {file:'irene-lakeside.jpg',alt:'Irene 在湖边的柳树下',position:'45% 48%',label:'BY THE WATER'},
 {file:'irene-sunlight.jpg',alt:'阳光下回望的 Irene',position:'49% 42%',label:'A LITTLE SUNSHINE'},
];

export default function PullBadge(){
 const stage=useRef<HTMLDivElement>(null),scene=useRef<HTMLDivElement>(null),slot=useRef<HTMLSpanElement>(null);
 const cord=useRef<SVGPathElement>(null),strap=useRef<SVGPathElement>(null),stitch=useRef<SVGPathElement>(null),clip=useRef<SVGPathElement>(null);
 const physics=useRef({y:0,x:0,vy:0,vx:0,targetY:0,targetX:0,frame:0,last:0});
 const gesture=useRef<null|{id:number;x:number;y:number;distance:number}>(null);
 const suppressClick=useRef(false),unlock=useRef(0);
 const [index,setIndex]=useState(0),[turn,setTurn]=useState(0),[ready,setReady]=useState(false);
 const reduced=useRef(matchMedia('(prefers-reduced-motion: reduce)').matches);

 // Read the transformed slot position so the strap stays attached throughout the spring motion.
 const connectStrap=()=>{
  if(!scene.current||!slot.current)return;
  const bounds=scene.current.getBoundingClientRect(),attachment=slot.current.getBoundingClientRect();
  const scale=bounds.width/340,ax=bounds.width*.5,ay=20*scale;
  const x=attachment.left+attachment.width/2-bounds.left,y=attachment.top+attachment.height/2-bounds.top;
  const path=`M ${ax} ${ay} Q ${ax} ${ay+(y-ay)*.48} ${x} ${y-10*scale}`;
  strap.current?.setAttribute('d',path);stitch.current?.setAttribute('d',path);
  clip.current?.setAttribute('d',`M ${x} ${y-15*scale} L ${x} ${y+1*scale}`);
 };
 const paint=()=>{
  const s=physics.current;
  stage.current?.style.setProperty('--badge-pull',`${s.y/3.4}cqw`);
  stage.current?.style.setProperty('--badge-side',`${s.x/3.4}cqw`);
  stage.current?.style.setProperty('--badge-sway',`${Math.max(-14,Math.min(14,s.x*.22+s.vy*.028))}deg`);
  cord.current?.setAttribute('d',`M 315 20 Q ${315+s.x*.2} ${89+s.y*.28} ${315+s.x} ${157+s.y}`);
  connectStrap();
 };
 useLayoutEffect(()=>{
  const observer=new ResizeObserver(connectStrap);
  if(scene.current)observer.observe(scene.current);
  if(slot.current)observer.observe(slot.current);
  connectStrap();return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const change=()=>{reduced.current=media.matches;paint()};
  media.addEventListener('change',change);
  return()=>{media.removeEventListener('change',change);cancelAnimationFrame(physics.current.frame)};
 },[]);
 const animate=(time:number)=>{
  const s=physics.current,dt=Math.min((time-(s.last||time-16))/1000,.032);s.last=time;
  const dragging=!!gesture.current,stiffness=dragging?300:180,damping=dragging?25:8;
  s.vy+=((s.targetY-s.y)*stiffness-s.vy*damping)*dt;s.vx+=((s.targetX-s.x)*stiffness-s.vx*damping)*dt;
  s.y+=s.vy*dt;s.x+=s.vx*dt;paint();
  if(Math.abs(s.y-s.targetY)+Math.abs(s.x-s.targetX)+Math.abs(s.vy)+Math.abs(s.vx)>.1)s.frame=requestAnimationFrame(animate);
  else{s.frame=0;s.last=0;s.y=s.targetY;s.x=s.targetX;s.vy=s.vx=0;paint()}
 };
 const wake=()=>{
  const s=physics.current;
  if(reduced.current){cancelAnimationFrame(s.frame);s.frame=0;s.y=s.targetY;s.x=s.targetX;s.vy=s.vx=0;paint()}
  else if(!s.frame)s.frame=requestAnimationFrame(animate);
 };
 const activate=()=>{if(performance.now()<unlock.current)return;unlock.current=performance.now()+750;setIndex(i=>(i+1)%photos.length);setTurn(t=>t+1)};
 const down=(e:PointerEvent<HTMLButtonElement>)=>{
  if(e.button!==0||performance.now()<unlock.current)return;
  suppressClick.current=false;gesture.current={id:e.pointerId,x:e.clientX,y:e.clientY,distance:0};
  e.currentTarget.setPointerCapture(e.pointerId);stage.current?.classList.add('is-pulling');
 };
 const move=(e:PointerEvent<HTMLButtonElement>)=>{
  const g=gesture.current;if(!g||g.id!==e.pointerId)return;
  const scale=340/(stage.current?.getBoundingClientRect().width||340),dy=Math.max(0,(e.clientY-g.y)*scale);
  g.distance=Math.max(g.distance,Math.abs(e.clientY-g.y),Math.abs(e.clientX-g.x));
  physics.current.targetY=Math.min(145,dy*.88);physics.current.targetX=Math.max(-32,Math.min(32,(e.clientX-g.x)*scale*.6));
  setReady(dy>=65);wake();
 };
 const finish=(e:PointerEvent<HTMLButtonElement>,cancel=false)=>{
  if(!gesture.current)return;
  const distance=gesture.current.distance,trigger=physics.current.targetY>=57.2;gesture.current=null;
  suppressClick.current=distance>6||cancel;stage.current?.classList.remove('is-pulling');
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
  if(trigger&&!cancel)activate();physics.current.targetY=physics.current.targetX=0;setReady(false);wake();
 };
 return <div ref={stage} className={`pull-badge ${ready?'is-ready':''}`}>
  <div className="badge-edition" aria-hidden="true"><span>IRENE / PERSONAL ID</span><span>0{index+1} — 03</span></div>
  <div className="badge-scene" ref={scene}>
   <div className="badge-anchor" aria-hidden="true"/>
   <div className="badge-swing"><div className="badge-card">
    <span ref={slot} className="badge-slot" aria-hidden="true"/>
    <div className="badge-card-top"><span>DESIGN & CREATE</span><span>✳</span></div>
    <div className="badge-photo"><div className={turn>0?'badge-photo-flip':''} key={turn}>{photos.map((photo,i)=><img key={photo.file} src={`${import.meta.env.BASE_URL}portfolio/badge/${photo.file}`} alt={photo.alt} style={{objectPosition:photo.position}} className={index===i?'is-current':''} aria-hidden={index!==i} loading="lazy" draggable={false}/>)}</div></div>
    <div className="badge-identity"><div><strong>张馨文</strong><span>DESIGNER / CREATOR</span></div><em>Irene</em></div>
    <div className="badge-card-bottom"><span>{photos[index].label}</span><span className="badge-barcode" aria-hidden="true"/></div>
   </div></div>
   <svg className="badge-lanyard" aria-hidden="true"><path ref={strap} className="badge-strap"/><path ref={stitch} className="badge-stitch"/><path ref={clip} className="badge-clip"/></svg>
   <svg className="badge-cord" viewBox="0 0 340 560" aria-hidden="true"><path d="M 170 20 H 303 Q 315 20 315 32" className="badge-cord-top"/><path ref={cord} d="M 315 20 Q 315 89 315 157"/></svg>
   <button type="button" className="badge-pull-handle" aria-label="下拉绳索切换照片，也可点击" aria-describedby="badge-pull-hint" onPointerDown={down} onPointerMove={move} onPointerUp={e=>finish(e)} onPointerCancel={e=>finish(e,true)} onLostPointerCapture={e=>{if(gesture.current)finish(e,true)}} onClick={()=>{if(!suppressClick.current){activate();physics.current.y=60;physics.current.vy=100;wake()}suppressClick.current=false}}><span className="badge-handle-grip" aria-hidden="true"/><span className="badge-handle-word" aria-hidden="true">PULL</span><span aria-hidden="true">↓</span></button>
  </div>
  <div className="badge-instructions" id="badge-pull-hint"><span>{ready?'松手，切换照片':'拉动右侧绳索，切换照片'}</span><span className="badge-dots" aria-hidden="true">{photos.map((p,i)=><i key={p.file} className={i===index?'active':''}/>)}</span></div>
  <span className="badge-status" role="status">{`已显示第 ${index+1} 张照片，共 3 张。${photos[index].alt}`}</span>
 </div>
}
