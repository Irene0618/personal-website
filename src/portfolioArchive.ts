import { films } from './VideoPortfolio';
import { portfolioAsset as asset } from './portfolioAsset';

export type CollectionProject = {
  slug: string; name: string; type: string; image: string; summary: string;
  stage: string; outputs: string[]; directions?: string[]; href?: string;
};
export type ArchiveWork = {
  slug: string; title: string; type: string; summary: string;
  gallery: {image: string; label: string}[];
  externalLink?: string | null; document?: string;
  videos?: {title: string; src: string; poster: string}[];
  directions?: string[];
};
const page = (name: string, label: string) => ({image: asset(`archive/${name}.jpg`), label});
const video = (name: string, title: string) => ({title, src: asset(`archive/${name}.mp4`), poster: asset(`archive/${name}.jpg`)});

export const additionalPortfolioWorks: ArchiveWork[] = [
  {
    slug: 'red-secret', title: '红“秘”围城', type: 'VR 游戏策划',
    summary: '“谍报 + 魔术”主旋律题材 VR 游戏项目。', directions: ['互动游戏'],
    gallery: [{image: asset('red-secret.jpg'), label: 'VR 游戏项目概览'}],
    document: asset('archive/red-secret.pdf'),
  },
  {
    slug: 'fengwu', title: '丰舞蝶梦 · 梁祝相惠', type: '地方文化策划',
    summary: '围绕丰惠镇与梁祝文化展开的策划方案。', directions: ['品牌营销','品牌视觉'],
    gallery: [{image: asset('fengwu.jpg'), label: '丰惠镇策划案'}],
    document: asset('archive/fengwu.pdf'),
  },
  {
    slug: 'future-meat', title: '未来人造肉报道 · 报纸设计', type: '编辑与版式设计',
    summary: '以未来人造肉报道为主题，探索报纸的视觉语言与信息编排。', directions: ['视觉设计'],
    gallery: [page('future-meat-01','报纸设计概览'),page('future-meat-02','视觉调研与版面设计'),page('future-meat-03','版面展开')],
  },
  {
    slug: 'ue5-scenes', title: 'UE5 场景建模', type: '虚幻引擎 / 三维场景',
    summary: '古风场景与原野落日两组虚幻引擎场景练习。', directions: ['动画与三维'],
    gallery: [page('ue5-fields-board','原野落日 · 场景设计'),page('ue5-traditional-board','古风场景 · 场景设计')],
    videos: [video('ue5-traditional','UE5 古风场景建模'),video('ue5-fields','UE5 原野落日')],
  },
  {
    slug: 'exterior-model', title: '世外桃源', type: '三维场景建模',
    summary: '建筑与环境场景的三维建模习作。', directions: ['动画与三维'],
    gallery: [page('exterior-model','世外桃源 · 场景与建模展示')],
  },
  {
    slug: 'cool-girl', title: '酷酷女孩', type: '三维角色设计',
    summary: '角色造型、模型与三维视觉展示。', directions: ['动画与三维'],
    gallery: [page('cool-girl','酷酷女孩 · 角色设计与模型展示')],
  },
  {
    slug: 'campus-bookmarks', title: '“印象中南”校园文创书签', type: '文创与产品视觉',
    summary: '以校园文化为主题的系列文创书签设计。', directions: ['品牌视觉'],
    gallery: [page('campus-bookmarks','印象中南 · 书签设计')],
  },
  {
    slug: 'centenary-poster', title: '贺建党百年 · 颂红经典', type: '海报设计',
    summary: '建党百年主题视觉海报。', directions: ['视觉设计'],
    gallery: [page('centenary-poster','建党百年 · 主题海报')],
  },
  {
    slug: 'wensanshui-emoji', title: '文三水的表情包', type: '角色与表情设计',
    summary: '角色形象与系列表情包设计。', directions: ['视觉设计'],
    gallery: [page('wensanshui-emoji','文三水 · 角色与表情展示')],
  },
];

export const archiveVideos: Record<string, ArchiveWork['videos']> = {
  qing: [video('qing','纷蕴柑青来')],
};

export function archiveAsProject(work: ArchiveWork): CollectionProject {
  return {
    slug: work.slug, name: work.title, type: work.type,
    image: work.videos?.[0]?.poster || work.gallery[0].image,
    summary: work.summary, stage: '本科作品', outputs: [work.type],
    directions: work.directions || ['动画与三维'],
  };
}

export const filmCollectionProjects: CollectionProject[] = [
  {slug:'deep-space',film:films.deep,direction:'动画与三维',stage:'本科毕业设计'},
  {slug:'handdrawn-mg',film:films.mg,direction:'动画与三维',stage:'本科作品'},
  {slug:'china-korea-c4d',film:films.c4d,direction:'动画与三维',stage:'三维动画'},
  {slug:'xinhua-world-games',film:films.xinhua,direction:'影像制作',stage:'新华社实习'},
].map(({slug,film,direction,stage}) => ({
  slug, name:film.title, type:direction, image:film.poster, summary:film.note,
  stage, outputs:[direction], directions:[direction], href:film.href,
}));
