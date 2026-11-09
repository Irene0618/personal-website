import { useEffect, useRef } from 'react';
import './cat-doodles.css';

export type DoodlePose = 'eat' | 'sleep' | 'sit' | 'stretch' | 'peek';

/** Small vector studies of Irene's black-cat drawings; no white image rectangle. */
export default function CatDoodle({ pose, className = '' }: { pose: DoodlePose; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    let visible = false;
    const sync = () => svg.classList.toggle('is-awake', visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(svg);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);

  return <svg ref={ref} className={`cat-doodle cat-doodle-${pose} ${className}`} viewBox="0 0 160 100" aria-hidden="true" focusable="false" fill="#090b0d" strokeLinecap="round" strokeLinejoin="round">
    {pose === 'eat' && <>
      <path className="doodle-eat-tail" d="M112 74 Q144 73 139 39" fill="none" stroke="#090b0d" strokeWidth="10"/>
      <path d="M54 62 C59 39 84 32 105 43 C122 50 128 71 117 81 Q105 90 82 82 L64 84 Q53 84 57 77 Z"/>
      <path d="M62 67 L56 83 Q53 91 62 89 L73 87 L79 67 Z"/>
      <g className="doodle-eat-head">
        <path d="M26 62 Q24 54 33 48 L35 34 Q36 30 40 34 L50 43 Q58 41 66 46 L76 38 Q80 36 80 42 L79 56 Q85 75 65 81 Q40 87 29 75 Z"/>
        <g className="doodle-eat-eyes" fill="#fffefa"><ellipse cx="42" cy="65" rx="3" ry="2.5"/><ellipse cx="63" cy="66" rx="3" ry="2.5"/></g>
        <path d="M27 66 L18 64 M28 72 L20 74" fill="none" stroke="#090b0d" strokeWidth="2.6"/>
      </g>
      <g className="doodle-bowl">
        <path d="M23 83 Q27 98 40 97 Q53 98 58 83 Z" fill="#fffefa" stroke="#090b0d" strokeWidth="2.7"/>
        <ellipse cx="40.5" cy="83" rx="17.5" ry="3.5" fill="#fffefa" stroke="#090b0d" strokeWidth="2.7"/>
        <path d="M32 82 L36 80 L40 82 L44 80 L49 82" fill="none" stroke="#090b0d" strokeWidth="2.5"/>
      </g>
      <g className="doodle-crumbs"><circle cx="18" cy="77" r="1.5"/><circle cx="57" cy="77" r="1.3"/></g>
    </>}
    {pose === 'sleep' && <>
      <path className="doodle-sleep-body" d="M24 74 C17 57 29 33 48 26 C64 15 104 22 121 38 C136 53 137 76 118 84 C95 94 37 93 24 74 Z"/>
      <path d="M119 79 Q141 75 140 63" fill="none" stroke="#090b0d" strokeWidth="9"/>
      <g className="doodle-sleep-head">
        <path d="M43 65 L44 40 Q44 36 48 39 L61 54 Q72 48 83 49 L93 33 Q95 30 98 35 L108 58 Q122 80 101 86 Q66 95 44 79" stroke="#fffefa" strokeWidth="4.2"/>
        <path d="M61 71 Q66 76 72 70 M87 67 Q92 72 97 66" fill="none" stroke="#fffefa" strokeWidth="3.8"/>
      </g>
      <path className="doodle-sleep-breath" d="M125 30 L132 30 L126 38 L134 38" fill="none" stroke="#647783" strokeWidth="2.3"/>
    </>}
    {pose === 'sit' && <>
      <path className="doodle-sit-tail" d="M78 85 Q125 96 136 78 Q143 62 131 56" fill="none" stroke="#090b0d" strokeWidth="8"/>
      <path d="M47 83 Q40 69 53 55 L55 20 Q55 14 60 17 L75 32 Q83 30 91 33 L107 16 Q112 12 112 20 L114 52 Q131 72 117 84 Q103 92 47 83 Z"/>
      <g className="doodle-blink" fill="#fffefa"><ellipse cx="71" cy="48" rx="4" ry="4.5"/><ellipse cx="96" cy="48" rx="4" ry="4.5"/></g>
      <path d="M50 55 L39 52 M50 61 L40 63" fill="none" stroke="#090b0d" strokeWidth="2.4"/>
    </>}
    {pose === 'stretch' && <>
      <path className="doodle-stretch-tail" d="M121 67 Q148 57 138 26" fill="none" stroke="#090b0d" strokeWidth="10"/>
      <g className="doodle-stretch-body">
        <path d="M33 60 Q30 46 44 43 Q61 48 76 52 C94 32 113 39 124 50 Q132 62 132 78 Q130 85 121 80 L109 70 Q92 78 67 72 L42 83 Q33 87 29 80 L18 82 Q13 80 19 75 Z"/>
        <path d="M27 62 Q18 49 28 37 L27 22 Q28 17 33 21 L45 32 Q53 31 61 35 L72 28 Q76 25 76 31 L75 47 Q85 65 64 70 Q39 76 27 62 Z"/>
        <g fill="#fffefa"><circle cx="42" cy="51" r="4"/><circle cx="64" cy="51" r="4"/></g>
        <path d="M26 54 L16 52 M27 60 L17 64" stroke="#090b0d" strokeWidth="2.5" fill="none"/>
      </g>
    </>}
    {pose === 'peek' && <>
      <path d="M54 86 Q48 74 58 62 L54 20 Q54 14 59 17 L73 30 Q85 28 95 32 L110 17 Q115 13 115 20 L116 61 Q123 75 114 86 Z"/>
      <path className="doodle-wave" d="M59 66 Q41 76 36 61 Q32 49 35 43" fill="none" stroke="#090b0d" strokeWidth="12"/>
      <g className="doodle-blink" fill="#fffefa"><circle cx="72" cy="48" r="4.2"/><circle cx="98" cy="48" r="4.2"/></g>
      <path d="M115 81 Q140 87 140 72" fill="none" stroke="#090b0d" strokeWidth="8"/>
    </>}
  </svg>;
}
