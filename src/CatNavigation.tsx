import { useState } from 'react';
import CatDoodle from './CatDoodle';
import type { DoodlePose } from './CatDoodle';

const items: { href: string; label: string; pose: DoodlePose }[] = [
  { href: '#watch', label: '视频作品', pose: 'sit' },
  { href: '#branches', label: '精选项目', pose: 'stretch' },
  { href: '#leaves', label: '视觉手记', pose: 'sleep' },
  { href: '#more-works', label: '更多作品', pose: 'eat' },
  { href: '#trunk', label: '关于我', pose: 'peek' },
];

export default function CatNavigation() {
  const [selected, setSelected] = useState(() => items.some(item => item.href === window.location.hash) ? window.location.hash : '');
  return <nav aria-label="主导航">{items.map(item => <a key={item.href} href={item.href} className="cat-nav-link" aria-label={item.label} title={item.label}
    onClick={event => {
      if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
        setSelected(item.href);
      }
    }}>
    <span className={`cat-nav-turn${selected === item.href ? ' is-selected' : ''}`} aria-hidden="true">
      <span className="cat-nav-front">{item.label}</span>
      <span className="cat-nav-back"><CatDoodle pose={item.pose}/></span>
    </span>
  </a>)}</nav>;
}
