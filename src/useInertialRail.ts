import {useEffect,useRef,useState} from 'react';
import type {RefObject} from 'react';

export default function useInertialRail(rail:RefObject<HTMLDivElement|null>){
 const step=useRef<(distance:number)=>void>(()=>{});
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 useEffect(()=>{
  const el=rail.current;if(!el)return;
  const strip=el.closest<HTMLElement>('.notes-strip')!;
  let target=el.scrollLeft,raf=0,last=0,lean=0,visible=false,hovered=strip.matches(':hover'),focused=false,touching=false;
  let resumeAt=0,resumeTimer=0,direction=1,autoVelocity=0,edgeUntil=0,nativeUntil=0;
  let drag:null|{x:number;left:number;lastX:number;time:number;velocity:number;id:number}=null;
  let cards:Array<{el:HTMLElement;center:number}>=[];
  const max=()=>Math.max(0,el.scrollWidth-el.clientWidth);
  const clamp=(value:number)=>Math.max(0,Math.min(max(),value));
  const allowed=()=>!paused&&!reduced&&!hovered&&!focused&&!touching&&!drag&&visible&&!document.hidden;
  const depth=()=>{const center=el.scrollLeft+el.clientWidth*.5,half=el.clientWidth*.5;for(const card of cards){const distance=Math.max(-1,Math.min(1,(card.center-center)/Math.max(180,half)));const nearness=1-Math.pow(Math.abs(distance),1.25);card.el.style.setProperty('--note-scale',reduced?'1':(.60+nearness*.58).toFixed(4));card.el.style.setProperty('--note-lift',`${reduced?0:14-nearness*20}px`);card.el.style.setProperty('--note-turn',`${reduced?0:distance*-20}deg`);card.el.style.setProperty('--note-opacity',reduced?'1':(.50+nearness*.50).toFixed(3))}};
  const animate=(time:number)=>{
   raf=0;if(!visible||document.hidden)return;
   const dt=Math.min(40,time-(last||time-16));last=time;
   const before=el.scrollLeft;
   const auto=allowed()&&time>=resumeAt&&time>=edgeUntil&&max()>0;
   if(auto){
    autoVelocity+=(direction*32-autoVelocity)*(1-Math.exp(-dt/600));
    target=clamp(target+autoVelocity*dt/1000);el.scrollLeft=target;
    if((direction===1&&target>=max())||(direction===-1&&target<=0)){direction*=-1;autoVelocity=0;edgeUntil=time+1100}
   }else{autoVelocity=0;if(!drag&&!touching&&time>=nativeUntil)el.scrollLeft=Math.abs(target-before)<3?target:before+(target-before)*(1-Math.exp(-dt/95))}
   const speed=(el.scrollLeft-before)/Math.max(1,dt);lean+=(Math.max(-2.6,Math.min(2.6,speed*1.6))-lean)*.22;
   el.style.setProperty('--rail-lean',`${reduced?0:lean.toFixed(3)}deg`);depth();
   const moving=!drag&&!touching&&(Math.abs(target-el.scrollLeft)>.6||Math.abs(lean)>.015);
   if(moving||allowed())raf=requestAnimationFrame(animate);
  };
  const wake=()=>{if(!raf&&visible&&!document.hidden){last=0;raf=requestAnimationFrame(animate)}};
  const hold=(ms=2200)=>{resumeAt=performance.now()+ms;autoVelocity=0;window.clearTimeout(resumeTimer);resumeTimer=window.setTimeout(wake,ms+20)};
  const go=(value:number)=>{hold();target=clamp(value);if(reduced){el.scrollLeft=target;depth();return}wake()};
  step.current=(distance)=>go((raf?target:el.scrollLeft)+distance);
  const wheel=(e:WheelEvent)=>{
   if(e.ctrlKey||e.metaKey||drag)return;
   const delta=(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)*(e.deltaMode===1?20:e.deltaMode===2?el.clientWidth:1);
   if(!raf)target=el.scrollLeft;
   if((delta>0&&target>=max()-1)||(delta<0&&target<=1))return;
   e.preventDefault();go(target+delta);
  };
  const down=(e:PointerEvent)=>{
   focused=false;
   if(e.pointerType==='touch'){touching=true;hold(5000);cancelAnimationFrame(raf);raf=0;return}
   if(e.pointerType!=='mouse'||e.button!==0)return;
   cancelAnimationFrame(raf);raf=0;target=el.scrollLeft;hold();drag={x:e.clientX,left:target,lastX:e.clientX,time:performance.now(),velocity:0,id:e.pointerId};el.setPointerCapture(e.pointerId);el.classList.add('is-dragging');
  };
  const move=(e:PointerEvent)=>{if(!drag)return;const now=performance.now(),dt=Math.max(8,now-drag.time);drag.velocity=drag.velocity*.35+(drag.lastX-e.clientX)/dt*.65;drag.lastX=e.clientX;drag.time=now;el.scrollLeft=clamp(drag.left+drag.x-e.clientX);target=el.scrollLeft;el.style.setProperty('--rail-lean',`${reduced?0:Math.max(-2.6,Math.min(2.6,drag.velocity*1.6))}deg`);depth()};
  const up=(e:PointerEvent)=>{
   if(e.pointerType==='touch'){touching=false;nativeUntil=performance.now()+900;target=el.scrollLeft;hold(5000);wake();return}
   if(!drag)return;const velocity=e.type==='pointercancel'||performance.now()-drag.time>90?0:drag.velocity;drag=null;el.classList.remove('is-dragging');if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);go(el.scrollLeft+(reduced?0:Math.max(-450,Math.min(450,velocity*150))));
  };
  const enter=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;hovered=true;autoVelocity=0;target=el.scrollLeft;wake()};
  const leave=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;hovered=false;hold(900);wake()};
  const focusIn=(e:FocusEvent)=>{focused=(e.target as Element).matches(':focus-visible');if(focused){target=el.scrollLeft;wake()}};
  const focusOut=(e:FocusEvent)=>{if(!strip.contains(e.relatedTarget as Node|null)){focused=false;hold(900);wake()}};
  const scroll=()=>{const native=touching||performance.now()<nativeUntil;if(native||!raf){target=el.scrollLeft;depth()}if(native){nativeUntil=performance.now()+250;hold(5000)}};
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else{target=el.scrollLeft;hold(700);wake()}};
  const measure=()=>{cards=Array.from(el.querySelectorAll<HTMLElement>('.note-frame')).map(card=>({el:card,center:card.offsetLeft+card.offsetWidth*.5}));target=clamp(el.scrollLeft);depth();wake()};
  const resize=new ResizeObserver(measure);resize.observe(el);measure();
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){target=el.scrollLeft;wake()}else{cancelAnimationFrame(raf);raf=0}},{threshold:.05});observer.observe(el);
  el.addEventListener('wheel',wheel,{passive:false});el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('lostpointercapture',up);el.addEventListener('scroll',scroll,{passive:true});strip.addEventListener('pointerenter',enter);strip.addEventListener('pointerleave',leave);strip.addEventListener('focusin',focusIn);strip.addEventListener('focusout',focusOut);document.addEventListener('visibilitychange',visibility);
  return()=>{cancelAnimationFrame(raf);clearTimeout(resumeTimer);resize.disconnect();observer.disconnect();el.removeEventListener('wheel',wheel);el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.removeEventListener('lostpointercapture',up);el.removeEventListener('scroll',scroll);strip.removeEventListener('pointerenter',enter);strip.removeEventListener('pointerleave',leave);strip.removeEventListener('focusin',focusIn);strip.removeEventListener('focusout',focusOut);document.removeEventListener('visibilitychange',visibility);el.style.removeProperty('--rail-lean')};
 },[rail,paused,reduced]);
 return {scrollBy:(distance:number)=>step.current(distance),paused:paused||reduced,reduced,togglePaused:()=>setPaused(value=>!value)};
}
