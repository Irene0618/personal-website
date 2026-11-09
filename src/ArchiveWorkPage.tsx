import { InlineFilm } from './VideoPortfolio';
import type { ArchiveWork } from './portfolioArchive';
import './archive-work.css';

export default function ArchiveWorkPage({work}:{work:ArchiveWork}) {
  return <article className="original-film-page archive-work-page">
    <a className="back-link" href="#more-works">← 返回更多作品</a>
    <header><p className="ed-eyebrow">{work.type}</p><h1>{work.title}</h1><p className="archive-summary">{work.summary}</p></header>
    {work.videos?.map(clip => <InlineFilm key={clip.src} film={{...clip,preview:clip.src,note:work.type,href:`#case-${work.slug}`}}/>)}
    {(work.document || work.externalLink) && <nav className="archive-source-links" aria-label="完整作品资料">
      {work.document && <a href={work.document} target="_blank" rel="noreferrer">查看完整方案 PDF ↗</a>}
      {work.externalLink && <a href={work.externalLink} target="_blank" rel="noreferrer">在新片场观看 ↗</a>}
    </nav>}
    <div className="archive-work-gallery">{work.gallery.map(item => <figure key={item.image}>
      <a href={item.image} target="_blank" rel="noreferrer" aria-label={`放大查看${item.label}`}><img src={item.image} alt={item.label} loading="lazy"/></a>
      <figcaption>{item.label}</figcaption>
    </figure>)}</div>
  </article>;
}
