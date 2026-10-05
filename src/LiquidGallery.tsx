import {useEffect, useRef, useState} from 'react';
import './liquid-gallery.css';

type Slide={slug:string;name:string;image:string};
type Props={slides:Slide[];active:number;onSelect:(index:number)=>void};
// Round-box, tapered bridge and smooth-union SDF helpers adapted from Misty-Forest-Portfolio.
// See public/credits/misty-forest-LICENSE.txt and MOTION-CREDITS.md.
const vertex=`attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0.,1.);}`;
const fragment=`precision highp float;
uniform vec2 uResolution;uniform float uRatio;uniform float uCount;
uniform vec4 uCards[12];uniform sampler2D uAtlas;uniform sampler2D uGlyphs;uniform vec2 uGrid;
uniform vec3 uPointer;uniform float uTime;uniform float uMotion;uniform float uDisperse;uniform float uActive;uniform float uHover;
float sdRoundBox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.)+length(max(q,0.))-r;}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
// Tapered honey bridge adapted from the MIT-licensed reference shader.
float bridge(vec2 p,vec2 a,vec2 b,float endR,float midR){
 vec2 ba=b-a;float len=length(ba);if(len<1.)return 10000.;
 vec2 dir=ba/len,nrm=vec2(-dir.y,dir.x),q=p-(a+b)*.5;
 float along=dot(q,dir),across=dot(q,nrm);
 float h=clamp(along/len+.5,0.,1.);float bell=sin(3.14159265*h);
 across+=sin(uTime*1.3+h*3.14)*bell*uMotion*3.;
 float r=mix(midR,endR,pow(1.-bell,2.2));
 return max(abs(along)-len*.5,abs(across)-r);
}
void main(){
 vec2 p=vec2(gl_FragCoord.x/uRatio,uResolution.y-gl_FragCoord.y/uRatio);
 float lip=max(0.,abs(p.y-uResolution.y*.5)-uResolution.y*.44)/(uResolution.y*.06);
 float bend=1.-sqrt(max(0.,1.-lip*lip));
 p.y-=sign(p.y-uResolution.y*.5)*bend*20.;
 float field=10000.;vec3 color=vec3(0.);float total=0.;float particles=0.;
 for(int i=0;i<12;i++){
  if(float(i)>=uCount)break;
  vec4 c=uCards[i];if(c.z<1.)continue;
  vec2 q=p-c.xy;float co=cos(c.w),si=sin(c.w);q=mat2(co,-si,si,co)*q;
  vec2 hs=vec2(c.z,c.z/1.5);
  float d=sdRoundBox(q,hs,14.);
  field=smin(field,d,9.);
  float weight=exp(-max(d,-10.)*.025);
  vec2 cell=vec2(mod(float(i),uGrid.x),floor(float(i)/uGrid.x));
  vec2 uv=clamp(q/(hs*2.)+.5,.002,.998);
  vec3 tex=texture2D(uAtlas,(cell+uv)/uGrid).rgb;
  color+=tex*weight;total+=weight;
  if(i<11){
   vec4 next=uCards[i+1];
   if(float(i+1)<uCount&&next.z>1.){
    vec2 a=c.xy+vec2(-sin(c.w),cos(c.w))*(hs.y-3.);
    vec2 b=next.xy-vec2(-sin(next.w),cos(next.w))*(next.z/1.5-3.);
    float thread=bridge(p,a,b,5.+uMotion*8.+uHover*6.,.7+uMotion*1.6);
    field=smin(field,thread,12.+uHover*8.);
   }
  }
  if(abs(float(i)-uActive)<.5){
   float halo=uHover*(1.-smoothstep(0.,75.,max(d,0.)))*smoothstep(-3.,9.,d);
   vec2 flow=q+normalize(q+vec2(.01))*sin(uTime*1.8-length(q)*.015)*uHover*3.;
   vec2 cellId=floor(flow/9.);float random=hash(cellId);
   float glyph=floor(random*8.);
   float ink=texture2D(uGlyphs,vec2((glyph+fract(flow.x/9.))/8.,fract(flow.y/9.))).a;
   particles=max(particles,ink*halo*.38*step(.28,random));
  }
 }
 color/=max(total,.0001);
 float alpha=1.-smoothstep(-.5,.8,field);
 // A quiet particle reveal only on entry; chapter changes keep the images intact.
 float reveal=1.-uDisperse;
 float grain=hash(floor(p/3.));alpha*=smoothstep(grain*.65,grain*.65+.35,reveal);
 vec3 ink=vec3(.23,.31,.23);
 gl_FragColor=vec4(mix(ink,color,alpha),max(alpha,particles));
}`;

export default function LiquidGallery({slides,active,onSelect}:Props){
 const canvas=useRef<HTMLCanvasElement>(null),stage=useRef<HTMLDivElement>(null),viewTag=useRef<HTMLSpanElement>(null);
 const live=useRef({active,onSelect,slides});live.current={active,onSelect,slides};
 const position=useRef(active),drag=useRef<{x:number;y:number;position:number;moved:boolean}|null>(null);
 const pointer=useRef({x:-500,y:-500,presence:0});
 const [ready,setReady]=useState(false);
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const geometry=useRef<{x:number;y:number;half:number;angle:number;index:number}[]>([]);
 const imageKey=slides.map(s=>s.image).join('|');
 const select=(index:number)=>live.current.onSelect(Math.max(0,Math.min(live.current.slides.length-1,index)));

 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 useEffect(()=>{
  const el=canvas.current,container=stage.current;if(!el||!container||reduced)return;
  setReady(false);position.current=live.current.active;
  const gl=el.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false});if(!gl)return;
  let cancelled=false,raf=0,visible=false,last=0,initial=0;
  const resources:WebGLShader[]=[];
  const compile=(type:number,code:string)=>{const shader=gl.createShader(type)!;resources.push(shader);gl.shaderSource(shader,code);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader)||'Shader compile failed');return shader};
  let program:WebGLProgram|null=null,buffer:WebGLBuffer|null=null,texture:WebGLTexture|null=null,glyphTexture:WebGLTexture|null=null;
  try{program=gl.createProgram()!;gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('Shader link failed');}
  catch{resources.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);return}
  gl.useProgram(program);buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const a=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
  const uniforms=Object.fromEntries(['uResolution','uRatio','uCount','uCards','uAtlas','uGrid','uPointer','uTime','uMotion','uGlyphs','uDisperse','uActive','uHover'].map(n=>[n,gl.getUniformLocation(program!,n)]));
  const glyphs=document.createElement('canvas');glyphs.width=256;glyphs.height=32;
  const gc=glyphs.getContext('2d')!;gc.fillStyle='#fff';gc.font='26px monospace';gc.textAlign='center';gc.textBaseline='middle';[...'.:+x*#%@'].forEach((char,i)=>gc.fillText(char,i*32+16,16));
  glyphTexture=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,glyphTexture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,glyphs);gl.uniform1i(uniforms.uGlyphs,1);gl.activeTexture(gl.TEXTURE0);
  const columns=Math.min(4,slides.length),rows=Math.ceil(slides.length/columns),size=512;
  const atlas=document.createElement('canvas');atlas.width=columns*size;atlas.height=rows*size;
  const ctx=atlas.getContext('2d')!;
  const imageLoads=slides.map((slide,index)=>new Promise<void>(resolve=>{const img=new Image();img.onload=()=>{if(!cancelled){const x=index%columns*size,y=Math.floor(index/columns)*size,cropW=Math.min(img.naturalWidth,img.naturalHeight*1.5),cropH=cropW/1.5;ctx.drawImage(img,(img.naturalWidth-cropW)/2,(img.naturalHeight-cropH)/2,cropW,cropH,x,y,size,size)}resolve()};img.onerror=()=>resolve();img.src=slide.image}));
  let width=0,height=0,ratio=1,velocity=0,hover=0,px=-500,py=-500;
  const resize=()=>{width=container.clientWidth;height=container.clientHeight;ratio=Math.min(devicePixelRatio,1.35);el.width=Math.round(width*ratio);el.height=Math.round(height*ratio);gl.viewport(0,0,el.width,el.height)};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);resize();
  const draw=(time:number)=>{
   raf=0;if(cancelled||!visible||document.hidden)return;
   if(!initial)initial=time;const dt=Math.min(32,time-(last||time));last=time;
   const target=live.current.active;
   if(!drag.current){const seconds=dt/1000;velocity+=(target-position.current)*95*seconds;velocity*=Math.exp(-19*seconds);position.current+=velocity*seconds}else velocity=0;
   const movement=Math.min(1,Math.abs(velocity)*.25);
   const unfold=Math.min(1,(time-initial)/900);
   const mobile=width<700,side=Math.min(width*(mobile?.66:.31),height*.68),radius=side*3.65;
   px+=(pointer.current.x-px)*(1-Math.exp(-dt/75));py+=(pointer.current.y-py)*(1-Math.exp(-dt/75));
   const near=Math.abs(px-width*.5)<side*.57&&Math.abs(py-height*.51)<side*.42&&pointer.current.presence>0;
   hover+=((near?1:0)-hover)*(1-Math.exp(-dt/160));
   const data=new Float32Array(48);geometry.current=[];
   for(let i=0;i<slides.length;i++){
    const delta=i-position.current,angle=delta*.33;
    if(Math.abs(delta)>2.1){data[i*4+2]=0;continue}
    const x=width*.5+(Math.cos(angle)-1)*radius;
    const y=height*.51+Math.sin(angle)*radius;
    const proximity=Math.exp(-Math.hypot(px-x,py-y)/(side*.75))*pointer.current.presence;
    const half=side*.5*(1+proximity*.035);
    const cardX=x+(px-x)*proximity*.04,cardY=y+(py-y)*proximity*.04;
    data.set([cardX,cardY,half,angle],i*4);geometry.current.push({x:cardX,y:cardY,half,angle,index:i});
   }
   if(viewTag.current){viewTag.current.style.transform=`translate3d(${px+12}px,${py-15}px,0)`;viewTag.current.style.opacity=String(hover)}
   gl.uniform2f(uniforms.uResolution,width,height);gl.uniform1f(uniforms.uRatio,ratio);gl.uniform1f(uniforms.uCount,slides.length);gl.uniform4fv(uniforms.uCards,data);
   gl.uniform3f(uniforms.uPointer,px,py,pointer.current.presence);gl.uniform1f(uniforms.uTime,time*.001);gl.uniform1f(uniforms.uMotion,movement);gl.uniform1f(uniforms.uDisperse,1-unfold);gl.uniform1f(uniforms.uActive,target);gl.uniform1f(uniforms.uHover,hover);
   gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6);
   raf=requestAnimationFrame(draw);
  };
  const resume=()=>{if(visible&&!document.hidden&&!raf&&texture&&!gl.isContextLost()){last=0;raf=requestAnimationFrame(draw)}};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)resume();else{cancelAnimationFrame(raf);raf=0}},{threshold:.01});observer.observe(container);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else resume()};document.addEventListener('visibilitychange',visibility);
  const lost=(e:Event)=>{e.preventDefault();cancelAnimationFrame(raf);setReady(false)};el.addEventListener('webglcontextlost',lost);
  Promise.all(imageLoads).then(()=>{if(cancelled||gl.isContextLost())return;texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,atlas);gl.uniform1i(uniforms.uAtlas,0);gl.uniform2f(uniforms.uGrid,columns,rows);setReady(true);resume()});
  return()=>{cancelled=true;cancelAnimationFrame(raf);resizeObserver.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',visibility);el.removeEventListener('webglcontextlost',lost);if(texture)gl.deleteTexture(texture);if(glyphTexture)gl.deleteTexture(glyphTexture);if(buffer)gl.deleteBuffer(buffer);resources.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program)};
 },[imageKey,reduced]);

 useEffect(()=>{const el=stage.current;if(!el)return;let accumulated=0,last=0,cooldown=0;
  const wheel=(e:WheelEvent)=>{const bounds=el.getBoundingClientRect();if(bounds.width>=700&&(e.clientX-bounds.left>bounds.width*.73||e.clientX-bounds.left<bounds.width*.27))return;if(e.ctrlKey||e.metaKey||live.current.slides.length<2)return;const delta=(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)*(e.deltaMode===1?20:e.deltaMode===2?300:1);const {active,slides,onSelect}=live.current;if((active===0&&delta<0)||(active===slides.length-1&&delta>0))return;e.preventDefault();const now=performance.now();if(now<cooldown)return;if(now-last>180)accumulated=0;last=now;accumulated+=delta;if(Math.abs(accumulated)>40){onSelect(active+(accumulated>0?1:-1));accumulated=0;cooldown=now+500}};
  el.addEventListener('wheel',wheel,{passive:false});return()=>el.removeEventListener('wheel',wheel);
 },[]);
 const current=slides[active];
 return <div className={`liquid-gallery ${ready&&!reduced?'is-ready':''}`}>
  <div className="liquid-stage" ref={stage} tabIndex={0} role="region" aria-label="圆环作品画廊，使用左右方向键切换作品" onKeyDown={e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();select(active+(e.key==='ArrowRight'?1:-1))}}}
   onPointerDown={e=>{if(e.button!==0)return;drag.current={x:e.clientX,y:e.clientY,position:reduced||!ready?active:position.current,moved:false};e.currentTarget.setPointerCapture(e.pointerId)}}
   onPointerMove={e=>{const rect=e.currentTarget.getBoundingClientRect();pointer.current={x:e.clientX-rect.left,y:e.clientY-rect.top,presence:e.pointerType==='mouse'?1:0};const d=drag.current;if(d){const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.hypot(dx,dy)>6)d.moved=true;const distance=e.pointerType==='touch'?dx:dy+dx*.4;position.current=Math.max(0,Math.min(slides.length-1,d.position-distance/220))}}}
   onPointerLeave={()=>{pointer.current.presence=0}}
   onPointerUp={e=>{const d=drag.current;drag.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);if(!d)return;if(d.moved){select(Math.round(position.current));return}if(!ready)return;const r=e.currentTarget.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const hit=[...geometry.current].sort((a,b)=>Math.hypot(x-a.x,y-a.y)-Math.hypot(x-b.x,y-b.y))[0];if(hit&&Math.abs((x-hit.x)*Math.cos(hit.angle)+(y-hit.y)*Math.sin(hit.angle))<hit.half&&Math.abs(-(x-hit.x)*Math.sin(hit.angle)+(y-hit.y)*Math.cos(hit.angle))<hit.half/1.5){if(hit.index===active)window.location.hash=`case-${current.slug}`;else select(hit.index)}}}
   onPointerCancel={()=>{drag.current=null;position.current=active}}>
   <canvas ref={canvas} aria-hidden="true"/>
   <img className="liquid-fallback" src={current.image} alt={current.name} draggable={false}/>
   <span ref={viewTag} className="liquid-view-tag" aria-hidden="true">↗ 查看</span>
   <span className="liquid-guide">滚动 · 拖动切换</span>
  </div>
  <div className="liquid-controls"><button aria-label="上一个作品" disabled={active===0} onClick={()=>select(active-1)}>←</button><span aria-live="polite">{String(active+1).padStart(2,'0')}<small> / {String(slides.length).padStart(2,'0')}</small></span><button aria-label="下一个作品" disabled={active===slides.length-1} onClick={()=>select(active+1)}>→</button><a href={`#case-${current.slug}`} aria-label={`打开${current.name}`}>查看作品 ↗</a></div>
 </div>;
}
