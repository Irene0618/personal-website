import {useEffect} from 'react';
import './portfolio-motion.css';

/** Native page scrolling; animate only visible media and active pointer targets. */
export default function usePortfolioMotion(route:string){
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  const reveals=new Set<HTMLElement>(),media=new Set<HTMLElement>(),visibleMedia=new Set<HTMLElement>();
  const magnets=new Set<HTMLElement>();
  const chapters=['branches','leaves','more-works','trunk'];
  let frame=0,last=0,scrollValue=window.scrollY,scanFrame=0,disposed=false;
  let target:HTMLElement|null=null,mx=0,my=0,tx=0,ty=0;
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('motion-visible','visible');revealObserver.unobserve(entry.target)}
  }),{threshold:0,rootMargin:'0px 0px -35px 0px'});
  const mediaObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{const el=entry.target as HTMLElement;if(entry.isIntersecting)visibleMedia.add(el);else{visibleMedia.delete(el);el.style.removeProperty('--media-shift')}});wake()},{rootMargin:'80px'});
  function tick(time:number){
   frame=0;if(disposed||document.hidden)return;
   const dt=Math.min(40,time-(last||time-16));last=time;
   const y=window.scrollY,height=window.innerHeight;
   const factor=1-Math.exp(-dt/100);scrollValue+=(y-scrollValue)*factor;
   const total=Math.max(1,document.documentElement.scrollHeight-height);
   progress.style.transform=`scaleX(${Math.min(1,Math.max(0,y/total))})`;
   if(!reduced.matches&&fine.matches){
    for(const el of visibleMedia){const r=el.getBoundingClientRect();const amount=Math.max(-1,Math.min(1,(height*.5-r.top-r.height*.5)/(height*.5+r.height*.5)));el.style.setProperty('--media-shift',`${(amount*22+(scrollValue-y)*.08).toFixed(2)}px`)}
    if(target){mx+=(tx-mx)*factor;my+=(ty-my)*factor;target.style.setProperty('--magnet-x',`${mx.toFixed(2)}px`);target.style.setProperty('--magnet-y',`${my.toFixed(2)}px`);if(Math.abs(mx-tx)+Math.abs(my-ty)<.08&&tx===0&&ty===0){target.style.removeProperty('--magnet-x');target.style.removeProperty('--magnet-y');target=null}}
   }
   let current='';for(const id of chapters){const section=document.getElementById(id);if(section&&section.getBoundingClientRect().top<height*.48)current=id}
   document.querySelectorAll<HTMLAnchorElement>('.ed-nav nav a').forEach(link=>{if(link.hash===`#${current}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
   if(Math.abs(scrollValue-y)>.1||(target&&(Math.abs(mx-tx)+Math.abs(my-ty)>.08)))frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame&&!document.hidden){last=0;frame=requestAnimationFrame(tick)}}
  function scan(){
   scanFrame=0;
   document.querySelectorAll<HTMLElement>('.ed-reveal,.notes-toolbar,.work-collection-heading,.work-categories,.about-profile,.experience-entry,.ed-footer>div:first-child,.case-study h2,.case-process>li,.pet-v2-research-notes>article').forEach((el)=>{
    if(reveals.has(el))return;reveals.add(el);el.classList.add('motion-reveal');
    if(el.matches('.experience-entry'))el.style.setProperty('--reveal-delay',`${Array.from(el.parentElement!.children).indexOf(el)%3*65}ms`);
    if(reduced.matches||el.getBoundingClientRect().bottom<0)el.classList.add('motion-visible','visible');else revealObserver.observe(el);
   });
   document.querySelectorAll<HTMLElement>('.ed-cover').forEach(el=>{if(!media.has(el)){media.add(el);el.classList.add('motion-media');mediaObserver.observe(el)}});
   document.querySelectorAll<HTMLElement>('.photo-hero-bottom>button,.photo-hero-bottom>a,.notes-actions button,.liquid-controls button,.liquid-controls>a,.ed-footer>a,.experience-body>a').forEach(el=>{magnets.add(el);el.classList.add('motion-magnet')});
   for(const el of reveals)if(!el.isConnected){reveals.delete(el);revealObserver.unobserve(el)}
   for(const el of magnets)if(!el.isConnected)magnets.delete(el);
   wake();
  }
  const pointer=(e:PointerEvent)=>{
   if(reduced.matches||!fine.matches||e.pointerType!=='mouse')return;
   const next=(e.target as Element).closest<HTMLElement>('.motion-magnet');
   if(next?.matches(':disabled'))return;
   if(next!==target){if(target){target.style.removeProperty('--magnet-x');target.style.removeProperty('--magnet-y')}target=next;mx=0;my=0}
   if(target){const r=target.getBoundingClientRect();tx=Math.max(-7,Math.min(7,(e.clientX-r.left-r.width*.5)*.16));ty=Math.max(-5,Math.min(5,(e.clientY-r.top-r.height*.5)*.2));wake()}
  };
  const leave=()=>{tx=0;ty=0;wake()};
  const change=()=>{if(reduced.matches){reveals.forEach(el=>el.classList.add('motion-visible','visible'));media.forEach(el=>el.style.removeProperty('--media-shift'));magnets.forEach(el=>{el.style.removeProperty('--magnet-x');el.style.removeProperty('--magnet-y')})}wake()};
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else wake()};
  const mutation=new MutationObserver(()=>{if(!scanFrame)scanFrame=requestAnimationFrame(scan)});
  mutation.observe(document.getElementById('root')!,{childList:true,subtree:true});
  window.addEventListener('scroll',wake,{passive:true});window.addEventListener('resize',wake,{passive:true});document.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',change);
  scan();
  return()=>{disposed=true;cancelAnimationFrame(frame);cancelAnimationFrame(scanFrame);mutation.disconnect();revealObserver.disconnect();mediaObserver.disconnect();window.removeEventListener('scroll',wake);window.removeEventListener('resize',wake);document.removeEventListener('pointermove',pointer);document.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',change);progress.remove();reveals.forEach(el=>el.classList.remove('motion-reveal','motion-visible'));magnets.forEach(el=>{el.style.removeProperty('--magnet-x');el.style.removeProperty('--magnet-y')})};
 },[route]);
}
