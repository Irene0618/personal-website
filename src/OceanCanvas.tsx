import { useEffect, useRef } from 'react';
import type { OceanEngine } from './ocean/engine';
import type { RenderMode } from './ocean/renderer';

type Props = {paused?:boolean;dark?:boolean;mode?:RenderMode;eager?:boolean;speed?:number};

// Shared scene: the opening and the search keep independent playback and theme controls.
export default function OceanCanvas({paused=false,dark=false,mode='braille',eager=false,speed=.48}:Props) {
  const canvas=useRef<HTMLCanvasElement>(null);
  const engine=useRef<OceanEngine|null>(null);
  const settings=useRef({paused,dark,mode,speed});settings.current={paused,dark,mode,speed};
  useEffect(()=>{
    const el=canvas.current;if(!el)return;
    let disposed=false,loading=false;
    const initialize=()=>{
      if(loading)return;loading=true;
      void import('./ocean/engine').then(({OceanEngine})=>{
        if(disposed)return;
        const scene=new OceanEngine(el,[{kind:'classic',size:1},{kind:'manta',size:.8},{kind:'classic',size:.64}]);
        scene.setSpeed(settings.current.speed);
        scene.setTheme(settings.current.dark);
        scene.setRenderMode(settings.current.mode);
        scene.setPaused(settings.current.paused);
        engine.current=scene;
      });
    };
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)initialize()},{rootMargin:'160px'});
    observer.observe(el);if(eager)initialize();
    return()=>{disposed=true;observer.disconnect();engine.current?.destroy();engine.current=null};
  },[eager]);
  useEffect(()=>{engine.current?.setPaused(paused)},[paused]);
  useEffect(()=>{engine.current?.setTheme(dark)},[dark]);
  useEffect(()=>{engine.current?.setRenderMode(mode)},[mode]);
  useEffect(()=>{engine.current?.setSpeed(speed)},[speed]);
  return <canvas ref={canvas} className="ocean-canvas" aria-hidden="true" data-ocean-mode={mode} data-ocean-theme={dark?'night':'day'} data-ocean-paused={paused}/>;
}
