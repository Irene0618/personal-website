import {
  ArrowDown,
  Camera,
  ExternalLink,
  Flower2,
  Leaf,
  Menu,
  Music2,
  PenLine,
  Play,
  Sparkles,
  Sprout,
  TreePine,
} from 'lucide-react';
import type { CSSProperties, SyntheticEvent, WheelEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

const asset = (name: string) => `${import.meta.env.BASE_URL}portfolio/${name}`;

const navItems = [
  { label: '能力', href: '#roots' },
  { label: '经历', href: '#trunk' },
  { label: '项目', href: '#branches' },
  { label: '索引', href: '#notes' },
];

const rings = [
  {
    slug: 'zuel-undergraduate',
    year: '2020-2024',
    title: '中南财经政法大学｜动画与游戏设计本科',
    detail: '成绩1/149，前1%，GPA 3.85/4.0。主修动画、游戏、三维影像与视觉叙述。',
    tags: ['专业排名1/149 ，前1%，获国家奖学金'],
  },
  {
    slug: 'zuel-media-center',
    year: '2020-2022',
    title: '中南财经政法大学党委宣传部新媒体中心｜视频主编',
    detail: '负责视频栏目的策划、选题执行、发布审核与反馈复盘，累计审核视频500+；参与校级宣传短视频制作与发放，单条最高浏览量539w+，点赞10w＋。',
    tags: ['短视频运营单条最高539w+播放 10w＋点赞'],
  },
  {
    slug: 'hitsz-master',
    year: '2024-2027',
    title: '哈尔滨工业大学（深圳）｜设计学（数字媒体）硕士',
    detail: '成绩排名4/33，前10%，GPA 3.53/4.0。研究方向聚焦用户体验、数字媒体、AIGC内容生产流程、AI产品与原型设计。',
    tags: ['专业排名4/33 ，前10% ，获校特等学金'],
  },
  {
    slug: 'xinhua-internship',
    year: '2025.07-2025.09',
    title: '新华社音视频部｜实习生',
    detail: '参与《精彩世运》等音视频项目，涵盖选题沟通、分镜策划、素材筛选、脚本润色、剪辑包装与内容审核，并传播场景优化标题、节奏和动效包装。',
    tags: [],
  },
  {
    slug: 'hitsz-photo-association',
    year: '2024-2025',
    title: '哈工深摄影协会｜副会长',
    detail: '组织摄影培训、作品分享、外拍活动与社群内容运营，承担活动策划、招募、现场执行和复盘。 \n推动摄影影像与 AI 创作交流，沉淀活动选题、视觉素材与成员互动机制。',
    tags: [],
  },
  {
    slug: 'ai-pet-internship',
    year: '2026.06—2026.08',
    title: 'TCL｜AIGC产品经理实习',
    detail: '在项目组实习期间，我收集用户反馈与业务需求，整理并输出产品需求文档，跟进需求评审、开发、测试与上线，协调研发和业务侧确认需求与进度。同时调研主流AI生图与视频工具，形成能力评测和成本分析报告，并参与脚本、分镜、生成、筛选与剪辑等AIGC内容生产环节的产品设计与优化，支撑46集内容连续上线及短视频平台运营。',
    tags: [],
  },
];

const experienceDetails = [
  {
    slug: 'ai-pet-internship',
    year: '2026.06—2026.08',
    type: 'AIGC产品 / 实习',
    title: 'TCL｜AIGC产品经理实习',
    overview: '实习期间参与AI萌宠IP“小龙吨吨”的内容孵化。电视大屏每天更新内容，我参与脚本、分镜、生成、筛选与剪辑，也持续查看上线后的点击表现和用户留言。后续对传统治愈内容与AI治愈内容进行分类调研，结合小龙吨吨已有角色资产，规划“吨吨旅行”栏目与分阶段更新节奏。',
    tags: ['AIGC内容产品', '生产链路', '用户反馈', '跨平台运营', 'NDA脱敏'],
    focus: [
      '内容生产：参与脚本、分镜、生成、筛选与剪辑，持续检查角色一致性、镜头稳定性和每日交付进度。',
      '用户反馈：结合点击表现与二维码留言，整理角色好感、观看情境和菜品建议，并用于后续选题。',
      '短视频平台运营：调研虚拟IP、萌宠短剧、环境感官与烟火日常等内容，明确目标人群、核心栏目、视听规则和更新节奏，并参与AIGC竖屏短视频制作。',
    ],
    outcomes: [
      '支撑电视端46集内容连续上线并进入首页推荐，形成能够维持日更的AIGC内容生产方法。',
      '将角色好感、儿童观看和主动点菜等反馈带回选题，内容更新开始参考真实用户反应。',
      '形成“吨吨旅行”栏目方案，以15—30秒的美景与小情节为主要形式，并完成内容验证期、用户认知期和商业化准备期的更新规划。短视频平台已开始发布相关内容。',
    ],
    links: [],
    images: [{ image: asset('ai-pet-case/stills/hero-river.webp'), label: '小龙吨吨内容画面｜项目已脱敏' }],
  },
  {
    slug: 'zuel-undergraduate',
    year: '2020-2024',
    type: 'Academic foundation',
    title: '中南财经政法大学｜动画与游戏设计本科',
    overview: '以动画、游戏与三维影像为专业基础，系统训练视觉叙事、角色与场景表达、互动媒介与设计研究能力。',
    tags: ['专业排名 1/149', '前 1%', '国家奖学金'],
    focus: ['主修动画、游戏、三维影像与视觉叙事。', '在课程与项目中持续积累内容策划、影像表达和设计研究方法。'],
    outcomes: ['成绩排名 1/149，GPA 3.85/4.0。', '将动画与游戏设计的叙事能力延展到后续的新媒体内容与交互设计实践。'],
    links: [],
    images: [{ image: asset('experience/zuel-undergraduate-background.jpg'), label: '本科教育背景与学科优势' }],
  },
  {
    slug: 'zuel-media-center',
    year: '2020-2022',
    type: 'Campus media / Video editor-in-chief',
    title: '中南财经政法大学党委宣传部新媒体中心｜视频主编',
    overview: '负责校级新媒体视频栏目从选题到复盘的完整流程，并参与多条短视频的制作、发布与传播包装。',
    tags: ['审核视频 500+', '单条播放 539w+', '单条点赞 10w+'],
    focus: ['统筹视频栏目的策划、选题执行、发布审核与反馈复盘。', '参与校园宣传短视频的脚本、制作、发布与传播节奏优化。'],
    outcomes: ['累计审核视频 500+，形成稳定的视频内容审核与协作流程。', '参与作品单条最高浏览量 539w+、点赞 10w+。'],
    links: [
      { label: '你好开学｜校园春日短片', platform: '抖音', href: 'https://v.douyin.com/bgwtHiBW_BY/', description: '打开抖音查看作品。' },
      { label: '别回头，往前走｜毕业季短片', platform: '抖音', href: 'https://v.douyin.com/vhQ5T6MdE4U/', description: '打开抖音查看作品。' },
      { label: '笑容接力挑战赛', platform: '抖音', href: 'https://v.douyin.com/ds3b9GHsgSQ/', description: '打开抖音查看作品。' },
      { label: '不要放弃，坚持就是胜利', platform: '抖音', href: 'https://v.douyin.com/VsCzYVd5cT8/', description: '打开抖音查看作品。' },
      { label: '花开富贵好运来', platform: '抖音', href: 'https://v.douyin.com/tylmhlBWXxM/', description: '打开抖音查看作品。' },
      { label: '同学你好｜耳机分我一半', platform: '抖音', href: 'https://v.douyin.com/hbnIUOF-KNA/', description: '打开抖音查看作品。' },
      { label: '同学你好｜分享我的宝藏', platform: '抖音', href: 'https://v.douyin.com/oyu7_ai5Ogg/', description: '打开抖音查看作品。' },
    ],
    images: [],
  },
  {
    slug: 'hitsz-master',
    year: '2024-2027',
    type: 'Master of Design / Digital media',
    title: '哈尔滨工业大学（深圳）｜设计学（数字媒体）硕士',
    overview: '围绕用户体验、数字媒体与 AIGC 内容生产展开研究与实践，持续探索 AI 产品、原型设计与影像表达的结合。',
    tags: ['专业排名 4/33', '前 10%', '校特等奖学金'],
    focus: ['研究用户体验、数字媒体、AIGC 内容生产流程与 AI 产品设计。', '通过研究生阶段的项目，深化从调研、概念到原型和展示的设计能力。'],
    outcomes: ['成绩排名 4/33，GPA 3.53/4.0。', '将设计研究与 AI 工具实践结合，建立可复盘的内容生产与原型迭代流程。'],
    links: [],
    images: [],
  },
  {
    slug: 'xinhua-internship',
    year: '2025.07-2025.09',
    type: 'News video / Internship',
    title: '新华社音视频部｜实习生',
    overview: '参与《精彩世运》等音视频项目，在新闻传播场景中完成从选题沟通到剪辑包装、内容审核的协作实践。',
    tags: ['选题沟通', '分镜策划', '剪辑包装', '内容审核'],
    focus: ['参与选题沟通、分镜策划、素材筛选与脚本润色。', '协助剪辑包装、内容审核，并依据传播场景优化标题、节奏与动效。'],
    outcomes: ['在音视频项目协作中建立了新闻内容生产、审核与交付的工作方法。', '将影像叙事能力应用于严谨、快速的新闻传播场景。'],
    links: [
      { label: '经济政策一线微观察｜氛围感 体验感 获得感——“清凉经济”持续激发夏日文旅消费新活力', platform: '新华社', href: 'https://h.xinhuaxmt.com/vh512/share/12667906?docid=12667906&newstype=1001&d=135006a&channel=weixin', description: '打开新华社客户端页面查看作品。' },
      { label: '赋能文旅消费 助力暑期经济——各地各部门服务暑运一线见闻', platform: '新华社', href: 'https://h.xinhuaxmt.com/vh512/share/12624414?docid=12624414&newstype=1001&d=1350050&channel=weixin&time=1784957408629', description: '打开新华社客户端页面查看作品。' },
      { label: '新华社音视频作品｜微博发布', platform: '微博', href: 'https://m.weibo.cn/status/5200243013714604?wm=3333_2001&from=10EA193010&sourcetype=weixin&s_trans=1429645455_5200243013714604&s_channel=4&jumpfrom=weibocom', description: '打开微博查看作品。' },
      { label: '重磅微视频｜精彩世运，共逐梦想', platform: '新华社', href: 'https://h.xinhuaxmt.com/vh512/share/12691860?docid=12691860&newstype=1001&d=13500c0&channel=weixin&time=1784957451483', description: '打开新华社客户端页面查看作品。' },
    ],
    images: [{ image: asset('experience/xinhua-world-games.png'), label: '《精彩世运》竖版视觉海报' }],
  },
  {
    slug: 'hitsz-photo-association',
    year: '2024-2025',
    type: 'Community leadership / Photography',
    title: '哈工深摄影协会｜副会长',
    overview: '组织摄影培训、作品分享、外拍活动与社群内容运营，并推动摄影影像与 AI 创作的跨媒介交流。',
    tags: ['活动策划', '社群运营', '视觉内容', 'AI 创作交流'],
    focus: ['承担活动策划、招募、现场执行与复盘，建设稳定的社群内容机制。', '组织摄影培训、作品分享与外拍活动，促进成员交流和作品产出。'],
    outcomes: ['沉淀摄影活动选题、视觉素材与成员互动机制。', '通过棚拍等活动，将摄影社群运营与视觉策展表达结合。'],
    links: [
      { label: '世外之境丨棚拍活动纪实', platform: '微信公众号', href: 'https://mp.weixin.qq.com/s/f86OlkFXz_WCMECEmhGtyA', description: '打开微信公众号文章查看活动详情。' },
    ],
    images: [{ image: asset('experience/hitsz-photo-association-poster.jpg'), label: '世外之境｜棚拍活动视觉海报' }],
  },
];

const undergraduateArchive = {
  video: asset('experience/zuel-undergraduate-showreel-web.mp4'),
  poster: asset('experience/zuel-undergraduate-background.jpg'),
  awards: [
    { year: '2021.12', title: '国家奖学金', issuer: '中华人民共和国教育部' },
    { year: '2022.08', title: '第十二届“挑战杯”大学生创新创业计划竞赛省级银奖', issuer: '共青团湖北省委员会' },
    { year: '2022.09', title: '优秀学生通讯员', issuer: '中南财经政法大学党委宣传部' },
    { year: '2022.10', title: '优秀学生奖学金（一等奖）', issuer: '中南财经政法大学' },
    { year: '2022.11', title: '第八届中国国际“互联网+”大学生创新创业大赛“青春筑梦之旅”赛道省级铜奖', issuer: '中国国际“互联网+”大学生创新创业大赛湖北组委会' },
    { year: '2022.11', title: '第八届中国国际“互联网+”大学生创新创业大赛高教主赛道省级铜奖', issuer: '中国国际“互联网+”大学生创新创业大赛湖北组委会' },
    { year: '2025', title: '第十三届未来设计师·全国高校数字艺术设计大赛广东赛区三等奖', issuer: '未来设计师·全国高校数字艺术设计大赛' },
  ],
  publications: [
    { date: '2023.03', title: '作品《的来信系列》', meta: '发表于北大核心期刊《传媒》' },
    { date: '2023.03', title: '《从艺术创作的时代性上分析中国水墨动画的意境重构》', meta: '发表于《美术教育研究》' },
    { date: '2023.04', title: '写生作品', meta: '发表于《美术教育研究》' },
  ],
  research: [
    { date: '2023.04', title: '《以艺疗心——助力大学生负性情绪疏导的视觉艺术创意实践研究》', role: '项目主持人 · 大学生创新创业训练计划省级立项' },
    { date: '2022.04', title: '《3D沉浸式民俗科普类游戏的内容创意设计》', role: '核心成员 · 大学生创新创业训练计划省级立项' },
    { date: '2021.09—2022.11', title: '第十二届“挑战杯”大学生创新创业计划竞赛', role: '核心成员 · 省级银奖' },
    { date: '2022.05—2022.11', title: '第八届中国国际“互联网+”大学生创新创业大赛“青春筑梦之旅”赛道', role: '核心成员 · 省级铜奖' },
    { date: '2022.05—2022.11', title: '第八届中国国际“互联网+”大学生创新创业大赛高教主赛道', role: '核心成员 · 省级铜奖' },
  ],
  practice: [
    { period: '2020.09—2022.09', title: '党委宣传部新媒体中心责编', detail: '负责中南财经政法大学官方抖音账号运营，积累选题、制作、审核与发布经验。' },
    { period: '2023.05 起', title: '院学生党支部组织委员', detail: '负责党日活动组织，以及入党积极分子与预备党员的发展工作。' },
  ],
  skills: [
    { label: '三维与角色', values: ['Maya', 'C4D', 'Blender', 'ZBrush'] },
    { label: '游戏与交互', values: ['UE5', 'Unity3D'] },
    { label: 'AI 创作', values: ['Stable Diffusion', 'Midjourney'] },
    { label: '视觉与后期', values: ['Photoshop', 'Illustrator', 'Figma', 'After Effects', 'Nuke'] },
  ],
  additionalAwards: ['第13届全国大学生广告艺术大赛省奖', '第17届影像中南文化艺术节优秀奖', '第575届韩文节入围奖'],
};

const roots = [
  '问题定义',
  '用户洞察',
  '产品策略',
  '产品原型',
  '验证迭代',
  '内容运营',
  'AIGC工作流',
  '影像叙事',
];

const rootDescriptions: Record<string, string> = {
  问题定义: '从业务目标与使用情境出发，识别用户缺少信息还是缺少行动能力，将宽泛命题转化为可验证的产品问题。',
  用户洞察: '通过访谈、问卷、用户画像、共情图和旅程图，把模糊需求转化为明确的设计判断。',
  产品策略: '把定位、用户价值、功能范围、内容架构与阶段目标组织成可执行方案，并明确不做什么。',
  验证迭代: '围绕关键假设设计前测、可用性测试、指标体系和复盘标签，用证据决定下一轮迭代。',
  影像叙事: '能把议题拆成脚本、分镜、镜头节奏和视觉符号，让观点更容易被理解和传播。',
  AIGC工作流: '熟悉从提示词、素材生成、模型对比到剪辑包装的迭代流程，重视可控性和复盘记录。',
  产品原型: '能从信息架构、功能路径、低保真到高保真界面逐步推进，让概念落到可体验界面。',
  内容运营: '具备选题、脚本、审核、发布和传播包装经验，理解内容节奏与受众反馈。',
};

const featuredProjects = [
  {
    slug: 'ai-pet-incubation',
    name: 'AIGC萌宠IP的产品策划与跨平台运营',
    cn: '产品策划 / 用户反馈分析 / AIGC影像 / 电视端与短视频平台运营',
    stage: '2026.06—2026.08',
    type: 'AIGC内容产品 / 跨平台运营',
    image: asset('ai-pet-case/stills/hero-river.webp'),
    icon: Sparkles,
    summary:
      '在项目组实习期间，我前期围绕电视大屏的日更需求，参与脚本、分镜、生成、筛选与剪辑，支撑46集内容连续上线。内容发布后，我跟踪点击表现与用户留言，将角色好感、观看情境和菜品建议整理为反馈类型，并用于后续选题与运营规划。项目进入短视频平台运营阶段后，我开展治愈类短视频内容调研，明确目标人群，规划核心栏目、视听规则与分阶段更新节奏，并参与AIGC竖屏短视频制作，相关内容现已发布。',
    outputs: ['AIGC内容生产', '用户反馈分析', '内容产品策划', '跨平台内容运营'],
  },
  {
    slug: 'anti-drug-interactive-film',
    name: '禁毒互动影像游戏',
    cn: '从“让人害怕”走向“让人会拒绝”',
    stage: '研究生毕业设计',
    type: '教育产品 / 互动原型',
    image: asset('anti-drug-case/cover.png'),
    icon: Play,
    summary:
      '聚焦青年在熟人社交压力下“知道风险却不会拒绝”的行为缺口，通过166份问卷、6人参与式工作坊、互动原型与30份材料前测，把恐惧诉求转化为可选择、可反馈、可重试的行动训练。',
    outputs: ['用户研究', '需求验证', '互动原型', 'AIGC影像', '实验前测'],
  },
  {
    slug: 'cocoon',
    name: '思茧成蝶',
    cn: '《思茧成蝶》AIGC实验短片',
    stage: '研究生项目',
    type: 'AIGC影像工作流',
    image: asset('cocoon.jpg'),
    icon: Sparkles,
    summary:
      '围绕青春期生长痛构建五章梦境叙事，拆解镜头脚本、视觉符号与Prompt参数，横向比较Wan2.1、可灵、Luma、即梦等工具的画面风格、运动稳定性与人物一致性。',
    outputs: ['AI短片', 'Prompt迭代', '镜头脚本', '剪辑包装'],
  },
  {
    slug: 'electronic-yuefu',
    name: '电子新乐府',
    cn: '《电子新乐府》AI诗词音乐厂牌 + 交互网页',
    stage: '研究生项目',
    type: 'AI诗词音乐网页',
    image: asset('yuefu-case/yuefu-01.jpg'),
    icon: Music2,
    summary:
      '以汉代乐府“采诗入乐”为文化原型，构建AI诗词音乐厂牌与交互网页，完成诗乐选择、音乐人选择、专辑浏览、创作实验室和音频可视化播放页等体验设计。',
    outputs: ['交互网页', 'AI音乐生成', '赛博新中式', '音频可视化'],
  },
  {
    slug: 'qin-yun',
    name: '琴韵',
    cn: '《琴韵》五音疗愈音箱及配套APP',
    stage: '研究生项目',
    type: '产品体验设计',
    image: asset('qinyun.jpg'),
    icon: Play,
    summary:
      '围绕中式五音疗愈与古琴文创，完成硬件音箱、配套APP、用户旅程、视觉规范和功能路径设计。',
    outputs: ['硬件概念', 'APP界面', '用户旅程', '品牌视觉'],
  },
  {
    slug: 'game-design-lab',
    name: '策研工坊',
    cn: '游戏策划研学平台',
    stage: '2026.08',
    type: '产品策划 / 高保真交互Demo',
    image: asset('game-lab-case/cover-archive-4k.jpg'),
    icon: PenLine,
    summary:
      '我想解决一个很具体的问题：玩游戏时记了很多东西，写完拆解后却很难在下一次策划中继续使用。为此，我设计了记录、写作、互评和项目验证可以前后接上的学习平台。',
    outputs: ['产品方案', '信息架构', '交互Demo', '知识资产', '评估设计'],
  },
  {
    slug: 'ladywell',
    name: 'LadyWell',
    cn: '《她好 LadyWell》更年期女性关爱平台',
    stage: '研究生项目',
    type: '健康关怀平台',
    image: asset('ladywell.jpg'),
    icon: Flower2,
    summary:
      '聚焦更年期女性健康与情绪支持，探索内容陪伴、健康管理、社群支持和产品服务触点的整合。',
    outputs: ['UI设计', '用户路径', '健康内容', '平台原型'],
  },
  {
    slug: 'botopia',
    name: '植系乌托邦',
    cn: '《植系乌托邦》自然关系思辨设计',
    stage: '研究生项目',
    type: '思辨设计',
    image: asset('botopia.jpg'),
    icon: Leaf,
    summary:
      '以非人类中心主义为切入点，重新思考人与植物、自然与技术之间的关系，并转化为具有视觉冲击力的设计表达。',
    outputs: ['思辨设计', '视觉系统', '展示PPT', '概念叙事'],
  },
  {
    slug: 'zhuangyuan-qijing',
    name: '状元七景',
    cn: '《状元七景》长虹状元文化包装设计',
    stage: '研究生项目',
    type: '文化文创',
    image: asset('zhuangyuan.jpg'),
    icon: PenLine,
    summary:
      '围绕地方状元文化进行视觉转译，完成文创包装、系列化视觉与传播表达，适合展示文化设计与运营转化能力。',
    outputs: ['包装设计', '文化转译', '视觉系统', '挑战杯项目'],
  },
  {
    slug: 'art-heals',
    name: '以艺疗心',
    cn: '《以艺疗心》大学生艺术疗愈内容社区',
    stage: '本科项目',
    type: '内容社区策划',
    image: asset('art-healing.jpg'),
    icon: Flower2,
    summary:
      '面向大学生负性情绪疏导，规划艺术疗愈内容社区，覆盖视觉疗愈、听觉疗愈、心理科普、艺术工作坊和线下活动预约。',
    outputs: ['内容运营', '社区策划', '用户路径', '双创项目'],
  },
  {
    slug: 'digital-zuel',
    name: '数字中南大',
    cn: '数字中南大 - 元宇宙校园平台',
    stage: '本科项目',
    type: '互动校园平台',
    image: asset('digital-zuel.jpg'),
    icon: TreePine,
    summary:
      '以校园文化和数字文创为切入，探索元宇宙校园平台的视觉呈现、场景搭建、展示动画和传播包装。',
    outputs: ['数字文创', '展示动画', '校园平台', '三维视觉'],
  },
];

const priorityProjectSlugs = ['ai-pet-incubation', 'anti-drug-interactive-film', 'electronic-yuefu', 'qin-yun', 'game-design-lab'];

const legacyCaseStudies = [
  {
    slug: 'cocoon',
    title: 'The Cocoon Turns Into A Butterfly',
    cn: '《思茧成蝶》AIGC实验短片',
    year: '2026',
    type: 'AI Film Workflow',
    heroImage: asset('cocoon.jpg'),
    overview:
      'A short AIGC film experiment about adolescent growth, emotional transformation, and visual metaphor. The case focuses on how a poetic concept can become a controllable AI video workflow.',
    role: [
      'Built the narrative structure and five-chapter dream sequence.',
      'Wrote shot scripts, visual prompts, and iteration notes for AI video generation.',
      'Compared image consistency, motion stability, character continuity, and final editing quality across tools.',
      'Edited the final rhythm, visual packaging, and presentation logic.',
    ],
    process: [
      'Concept: define the butterfly/cocoon metaphor and the emotional arc.',
      'Script: split the story into scene beats, shot language, and key visual symbols.',
      'Prompt iteration: test style, lighting, camera movement, and character consistency.',
      'Editing: select stable shots, rebuild continuity, add rhythm, typography, and sound atmosphere.',
      'Reflection: summarize what AIGC can handle well and what still needs human direction.',
    ],
    learned: [
      'AIGC video is strongest when the director gives it clear constraints instead of vague atmosphere.',
      'Prompt writing is not only wording; it is a design process that includes visual references, evaluation criteria, and iteration records.',
      'The final quality depends heavily on editing judgment, not only model output.',
    ],
    references: [
      { image: asset('cocoon.jpg'), label: 'Final visual board' },
      { image: asset('yuefu-interface.jpg'), label: 'Prompt-to-interface reference' },
    ],
  },
  {
    slug: 'electronic-yuefu',
    title: 'Electronic Yuefu',
    cn: '《电子新乐府》AI诗词音乐实验室',
    year: '2026',
    type: 'AI Product MVP',
    heroImage: asset('yuefu.jpg'),
    overview:
      'An AI music product concept that helps young users turn classical Chinese poetry into listenable, shareable music works.',
    role: [
      'Defined the product scenario and MVP loop: poem input, music generation, cover packaging, listening, and sharing.',
      'Designed the core interface and content generation flow.',
      'Organized AI music output, page hierarchy, and demo video materials.',
      'Translated cultural content into a lighter product experience for young users.',
    ],
    process: [
      'User scenario: identify why young users may want a low-barrier poetry music creation tool.',
      'MVP definition: keep only the core generation, preview, packaging, and sharing path.',
      'Interface design: build the music factory/lab metaphor and page states.',
      'Demo production: connect interface screens, AI audio, and visual rhythm into a product story.',
    ],
    learned: [
      'Cultural products need a clear creation loop, otherwise users only watch instead of participate.',
      'AI generation features should be packaged as a journey with feedback, not a single button.',
      'The best MVP tells users what they can make within the first few seconds.',
    ],
    references: [
      { image: asset('yuefu.jpg'), label: 'Brand and product cover' },
      { image: asset('yuefu-interface.jpg'), label: 'Interface and demo reference' },
    ],
  },
  {
    slug: 'qin-yun',
    title: 'Qin Yun',
    cn: '《琴韵》五音疗愈音箱及配套APP',
    year: '2025',
    type: 'Product Experience',
    heroImage: asset('qinyun.jpg'),
    overview:
      'A healing product experience combining Chinese five-tone music therapy, guqin culture, hardware concept design, and a companion app.',
    role: [
      'Built the product concept around sound healing and cultural experience.',
      'Designed the hardware appearance, app pages, user journey, and visual system.',
      'Created presentation boards and demo materials for product communication.',
      'Connected emotional healing needs with interaction paths and brand language.',
    ],
    process: [
      'Research: study five-tone healing, guqin culture, and emotional relaxation scenarios.',
      'Concept design: define the speaker form, use context, and brand tone.',
      'App flow: map listening, guidance, recording, and daily healing routines.',
      'Visual system: unify packaging, interface, and presentation board style.',
    ],
    learned: [
      'A healing product needs rhythm, softness, and trust across both hardware and software.',
      'Cultural elements work better when translated into behavior and atmosphere, not pasted as decoration.',
      'A strong board must explain usage, not only show appearance.',
    ],
    references: [{ image: asset('qinyun.jpg'), label: 'Product board and app reference' }],
  },
  {
    slug: 'ladywell',
    title: 'LadyWell',
    cn: '《她好 LadyWell》更年期女性关爱平台',
    year: '2025',
    type: 'Care Platform',
    heroImage: asset('ladywell.jpg'),
    overview:
      'A care platform concept for menopausal women, combining health content, emotional support, community companionship, and product/service touchpoints.',
    role: [
      'Defined the target group, emotional needs, and core service scenarios.',
      'Planned platform modules for health knowledge, daily recording, community support, and care content.',
      'Designed UI direction, information hierarchy, and key interaction flow.',
      'Prepared demo visuals for project presentation.',
    ],
    process: [
      'Problem framing: turn a sensitive health topic into a respectful support experience.',
      'User journey: map daily symptoms, emotions, information search, and companionship needs.',
      'Service modules: combine content, record, community, and product touchpoints.',
      'Prototype: present the platform through key screens and a short interaction demo.',
    ],
    learned: [
      'Health-related design must avoid cold instruction and create emotional safety.',
      'For care platforms, tone of voice and visual calmness are part of the product function.',
      'A good user journey should include both practical tasks and emotional moments.',
    ],
    references: [{ image: asset('ladywell.jpg'), label: 'Platform interface reference' }],
  },
  {
    slug: 'botopia',
    title: 'Botopia',
    cn: '《植系乌托邦》自然关系思辨设计',
    year: '2025',
    type: 'Speculative Design',
    heroImage: asset('botopia.jpg'),
    overview:
      'A speculative design project that rethinks the relationship between humans, plants, technology, and future ecological imagination.',
    role: [
      'Built the conceptual narrative from non-human-centered thinking.',
      'Designed the visual system and exhibition-style presentation.',
      'Organized research logic, scenario imagination, and speculative prompts.',
      'Translated abstract ecological thinking into readable visual materials.',
    ],
    process: [
      'Research: collect ideas around post-humanism, ecology, and plant perception.',
      'Scenario: imagine alternative relationships between people, plants, and technology.',
      'Visual language: use dense green imagery, typography, and archive-like composition.',
      'Presentation: turn the concept into a display deck for audience understanding.',
    ],
    learned: [
      'Speculative design needs both imagination and a clear question.',
      'A visual system can help abstract theory become easier to enter.',
      'The designer can act as a translator between research language and public experience.',
    ],
    references: [{ image: asset('botopia.jpg'), label: 'Speculative design visual board' }],
  },
  {
    slug: 'zhuangyuan-qijing',
    title: 'Zhuangyuan Qijing',
    cn: '《状元七景》长虹状元文化包装设计',
    year: '2025',
    type: 'Cultural Creative',
    heroImage: asset('zhuangyuan.jpg'),
    overview:
      'A cultural creative packaging project that transforms local Zhuangyuan culture into a contemporary visual and product communication system.',
    role: [
      'Researched local cultural symbols and selected elements suitable for visual translation.',
      'Designed packaging, color system, graphic assets, and presentation boards.',
      'Connected cultural storytelling with a productized visual output.',
      'Prepared materials for challenge/project display.',
    ],
    process: [
      'Cultural research: clarify the story, place, symbol, and audience.',
      'Visual extraction: transform architecture, history, and local memory into patterns and colors.',
      'Packaging design: apply the system to boxes, labels, and display materials.',
      'Communication: organize the project as a cultural creative case.',
    ],
    learned: [
      'Cultural design should be recognizable, but still usable in a modern product context.',
      'A packaging system needs repetition, hierarchy, and a clear shelf impression.',
      'Local stories become stronger when they are edited into a focused visual language.',
    ],
    references: [{ image: asset('zhuangyuan.jpg'), label: 'Packaging and cultural board' }],
  },
  {
    slug: 'art-heals',
    title: 'Art Heals The Heart',
    cn: '《以艺疗心》大学生艺术疗愈内容社区',
    year: '2023',
    type: 'Content Community',
    heroImage: asset('art-healing.jpg'),
    overview:
      'A student-oriented art healing content community that supports negative emotion relief through visual healing, audio healing, psychology content, workshops, and offline activities.',
    role: [
      'Planned the content community direction and user value proposition.',
      'Organized background research, audience needs, and content modules.',
      'Designed user path, activity structure, and presentation materials.',
      'Connected social innovation thinking with campus emotional support.',
    ],
    process: [
      'Problem: identify stress and emotional relief needs among college students.',
      'Content strategy: split healing content into visual, audio, knowledge, and activity modules.',
      'Community flow: define how users browse, join, reserve, and reflect.',
      'Project pitch: prepare background, data, and product/community narrative.',
    ],
    learned: [
      'Community products need continuous content mechanisms, not only interface pages.',
      'Mental health topics require gentle framing and low-pressure participation.',
      'A project pitch becomes stronger when user needs and operational logic appear together.',
    ],
    references: [{ image: asset('art-healing.jpg'), label: 'Community planning board' }],
  },
  {
    slug: 'digital-zuel',
    title: 'Digital ZUEL',
    cn: '数字中南大 - 元宇宙校园平台',
    year: '2023',
    type: 'Interactive Campus',
    heroImage: asset('digital-zuel.jpg'),
    overview:
      'A digital campus and metaverse-style platform concept that presents university culture through 3D scenes, exhibition animation, and communication packaging.',
    role: [
      'Explored the digital campus concept and visual presentation direction.',
      'Participated in 3D scene, animation, and communication material organization.',
      'Translated campus identity into a more immersive visual experience.',
      'Prepared display materials for undergraduate project presentation.',
    ],
    process: [
      'Theme: define the campus culture and digital creative angle.',
      'Scene: build recognizable campus elements and spatial atmosphere.',
      'Motion: produce display animation and visual packaging.',
      'Presentation: organize the project as an interactive campus concept.',
    ],
    learned: [
      '3D campus projects need recognizable landmarks and a clear navigation story.',
      'Digital scenes are more convincing when they include use scenarios, not only models.',
      'Motion packaging helps static concept work feel closer to a real platform.',
    ],
    references: [{ image: asset('digital-zuel.jpg'), label: '3D campus and platform visual' }],
  },
];

const botopiaGallery = [
  { image: asset('botopia-case/botopia-01-nonanthropocentrism.jpg'), label: '非人类中心主义理论背景' },
  { image: asset('botopia-case/botopia-02-sympoiesis.jpg'), label: 'Donna Haraway“共生生存”理论' },
  { image: asset('botopia-case/botopia-03-human-harm-air.jpg'), label: '空气污染与人类活动数据' },
  { image: asset('botopia-case/botopia-04-human-harm-water-forest.jpg'), label: '水污染与森林退化风险' },
  { image: asset('botopia-case/botopia-05-design-purpose.jpg'), label: '设计目的与Actant Mapping' },
  { image: asset('botopia-case/botopia-06-concept-source.jpg'), label: '树冠与根系的神话概念来源' },
  { image: asset('botopia-case/botopia-07-tree-crown-concept.jpg'), label: '树冠部分设计构思' },
  { image: asset('botopia-case/botopia-08-root-concept.jpg'), label: '树根部分设计构思' },
  { image: asset('botopia-case/botopia-09-design-concept-statement.jpg'), label: '设计陈述与叙事结构' },
  { image: asset('botopia-case/botopia-10-tree-crown-output.jpg'), label: '树冠部分设计产出' },
  { image: asset('botopia-case/botopia-11-root-output.jpg'), label: '树根部分设计产出' },
  { image: asset('botopia-case/botopia-12-interaction-gesture.jpg'), label: '手势交互与数据映射' },
  { image: asset('botopia-case/botopia-13-td-demo.jpg'), label: 'TouchDesigner交互录屏演示' },
  { image: asset('botopia-case/botopia-14-touchdesigner-system.jpg'), label: 'TouchDesigner系统节点拆解' },
  { image: asset('botopia-case/botopia-15-conclusion-tree.jpg'), label: '项目结语：未来森林' },
  { image: asset('botopia-case/botopia-16-conclusion-questions.jpg'), label: '项目结语：思辨问题' },
];

const zhuangyuanGallery = [
  { image: asset('zhuangyuan-case/zhuangyuan-01-overview.png'), label: '项目总览与品牌定位' },
  { image: asset('zhuangyuan-case/zhuangyuan-02-workflow-visual-system.png'), label: 'AIGC工作流程与视觉系统' },
  { image: asset('zhuangyuan-case/zhuangyuan-03-packaging-expansion.jpg'), label: '包装插图与展开图' },
  { image: asset('zhuangyuan-case/zhuangyuan-04-gift-box-structure.jpg'), label: '主礼盒结构与交互说明' },
  { image: asset('zhuangyuan-case/zhuangyuan-05-product-render.jpg'), label: '全系列产品包装效果图' },
  { image: asset('zhuangyuan-case/zhuangyuan-06-extension-products.jpg'), label: '文创延展产品展示' },
  { image: asset('zhuangyuan-case/zhuangyuan-07-pricing-landing.jpg'), label: '产品定价与落地应用分析' },
];

const artHealingGallery = [
  { image: asset('art-healing-case/art-healing-01-background.png'), label: '项目背景与用户群体研究' },
  { image: asset('art-healing-case/art-healing-02-user-flow.png'), label: '用户画像、功能架构与低保真流程' },
  { image: asset('art-healing-case/art-healing-03-interface-guide.png'), label: '注册引导与主菜单界面展示' },
  { image: asset('art-healing-case/art-healing-04-visual-audio-healing.png'), label: '视觉疗愈与听觉疗愈模块' },
  { image: asset('art-healing-case/art-healing-05-community-sharing.png'), label: '秘密星球与心灵分享社区' },
  { image: asset('art-healing-case/art-healing-06-mental-health.png'), label: '个人主页、心理测试与心理疗愈' },
];

const digitalZuelGallery = [
  { image: asset('digital-zuel-case/digital-zuel-01-background.png'), label: '政策、行业与人文背景' },
  { image: asset('digital-zuel-case/digital-zuel-02-value-system.png'), label: '人文价值与产业价值体系' },
  { image: asset('digital-zuel-case/digital-zuel-03-concept-map.png'), label: '线下文创与线上数字平台结构' },
  { image: asset('digital-zuel-case/digital-zuel-04-ar-bookmark-concept.png'), label: 'AR书签数字文创概念设计' },
  { image: asset('digital-zuel-case/digital-zuel-05-ar-bookmark-demo.png'), label: 'AR数字书签效果展示' },
  { image: asset('digital-zuel-case/digital-zuel-06-ar-desktop-demo.png'), label: 'ZUEL虚拟桌面摆件效果展示' },
  { image: asset('digital-zuel-case/digital-zuel-07-wensanshui-ip.png'), label: '文三水IP角色与衍生周边' },
];

const visualSnippets = [
  { image: asset('visual-snippets/snippet-01-puzzle-light.jpg'), label: '拼图光影', group: 'AIGC影像', accent: 'rgba(224, 173, 79, 0.42)' },
  { image: asset('visual-snippets/snippet-02-wire-figure.jpg'), label: '线框雕塑', group: '数字实验', accent: 'rgba(163, 190, 208, 0.38)' },
  { image: asset('visual-snippets/snippet-03-book-light.jpg'), label: '书页灯束', group: '动画分镜', accent: 'rgba(240, 190, 86, 0.42)' },
  { image: asset('visual-snippets/snippet-04-cosmic-figure.jpg'), label: '星尘人像', group: '情绪叙事', accent: 'rgba(82, 206, 224, 0.36)' },
  { image: asset('visual-snippets/snippet-05-blue-butterflies.jpg'), label: '蓝夜蝶群', group: '动画分镜', accent: 'rgba(104, 137, 218, 0.4)' },
  { image: asset('visual-snippets/snippet-06-cosmic-heart.jpg'), label: '宇宙心脏', group: 'AIGC影像', accent: 'rgba(252, 114, 139, 0.38)' },
  { image: asset('visual-snippets/snippet-07-glowing-chest.jpg'), label: '胸口微光', group: '情绪叙事', accent: 'rgba(255, 130, 177, 0.38)' },
  { image: asset('visual-snippets/snippet-08-sunset-running.jpg'), label: '落日奔跑', group: '动画分镜', accent: 'rgba(244, 121, 102, 0.4)' },
  { image: asset('visual-snippets/snippet-09-white-butterflies.jpg'), label: '白蝶花田', group: '视觉实验', accent: 'rgba(226, 226, 216, 0.48)' },
  { image: asset('visual-snippets/snippet-10-color-cloud-boat.jpg'), label: '彩云小舟', group: 'AIGC影像', accent: 'rgba(102, 216, 222, 0.38)' },
  { image: asset('visual-snippets/snippet-11-hands-butterfly.jpg'), label: '掌心蝶光', group: '情绪叙事', accent: 'rgba(177, 222, 128, 0.4)' },
  { image: asset('visual-snippets/snippet-12-blue-fridge.jpg'), label: '蓝色冰箱', group: '动画分镜', accent: 'rgba(91, 128, 225, 0.4)' },
  { image: asset('visual-snippets/snippet-13-green-running.jpg'), label: '草坡奔流', group: '动画分镜', accent: 'rgba(199, 226, 131, 0.38)' },
  { image: asset('visual-snippets/snippet-14-glowing-feet.jpg'), label: '足底字光', group: '视觉实验', accent: 'rgba(143, 171, 235, 0.38)' },
  { image: asset('visual-snippets/snippet-15-blue-embrace.jpg'), label: '蓝色拥抱', group: '情绪叙事', accent: 'rgba(127, 224, 179, 0.36)' },
  { image: asset('visual-snippets/snippet-16-water-fall.jpg'), label: '坠入水光', group: '动画分镜', accent: 'rgba(119, 174, 221, 0.38)' },
  { image: asset('visual-snippets/snippet-17-music-room.jpg'), label: '琴房光束', group: '动画分镜', accent: 'rgba(239, 184, 76, 0.42)' },
  { image: asset('visual-snippets/snippet-18-puppet-light.jpg'), label: '牵线光影', group: '动画分镜', accent: 'rgba(242, 178, 73, 0.42)' },
  { image: asset('visual-snippets/snippet-19-pink-hand.jpg'), label: '掌心羽毛', group: '插画片段', accent: 'rgba(247, 158, 184, 0.4)' },
  { image: asset('visual-snippets/snippet-20-starry-eyes.jpg'), label: '星河眼眸', group: '插画片段', accent: 'rgba(93, 151, 235, 0.4)' },
  { image: asset('visual-snippets/snippet-21-mushroom-house.png'), label: '蘑菇小屋', group: '插画片段', accent: 'rgba(104, 160, 176, 0.38)' },
  { image: asset('visual-snippets/snippet-22-title-sky.png'), label: '人生绩效簿', group: '插画片段', accent: 'rgba(89, 165, 213, 0.38)' },
  { image: asset('visual-snippets/snippet-23-clothes-baby.png'), label: '衣物与婴儿', group: '插画片段', accent: 'rgba(221, 151, 125, 0.36)' },
  { image: asset('visual-snippets/snippet-24-campus-cloud.png'), label: '云中校门', group: '插画片段', accent: 'rgba(73, 166, 221, 0.38)' },
  { image: asset('visual-snippets/snippet-25-stage-resume.png'), label: '履历舞台', group: '插画片段', accent: 'rgba(245, 177, 84, 0.38)' },
];

const loopingVisualSnippets = Array.from({ length: 3 }, (_, copy) =>
  visualSnippets.map((item, originalIndex) => ({
    ...item,
    originalIndex,
    cardId: `${copy}-${originalIndex}`,
  })),
).flat();

const visualSnippetLoops = Array.from({ length: 3 }, (_, copy) =>
  loopingVisualSnippets.slice(copy * visualSnippets.length, (copy + 1) * visualSnippets.length),
);

const caseStudies = [
  {
    slug: 'ai-pet-incubation',
    title: 'AIGC萌宠IP的产品策划与跨平台运营',
    cn: '产品策划 / 用户反馈分析 / AIGC影像 / 电视端与短视频平台运营',
    year: '2026.06—2026.08',
    type: 'AIGC内容产品 / 跨平台运营',
    heroImage: asset('ai-pet-case/stills/hero-river.webp'),
    overview:
      '小龙吨吨需要持续更新，也需要让家庭用户记住这个角色。电视大屏连续更新46集期间，团队持续调整AIGC内容的制作方法，并通过点击表现和二维码留言观察用户对角色、场景与菜品的反应。用户开始谈论小龙吨吨，也会主动提出下一道菜的建议，后续选题因此有了真实的参考。',
    award: 'NDA 脱敏展示｜电视端与短视频平台内容已上线；大屏互动为概念Demo',
    externalLink: null,
    highlights: [
      '支撑46集内容连续上线并进入电视首页推荐，形成能够维持日更的AIGC内容生产方法。',
      '将用户留言整理为角色好感、儿童观看和主动点菜三类反馈，并用于判断下一轮选题。',
      '完成治愈类短视频内容调研，明确“吨吨旅行”栏目、15—30秒内容结构、视听规则和分阶段更新节奏。',
    ],
    details: [
      {
        heading: '日更需要一套稳定的生产方法',
        body:
          '日更要求角色在不同食物、场景和动作中保持稳定，让用户每次都能认出小龙吨吨。我参与脚本、分镜、生成、筛选和剪辑，在角色一致性、镜头稳定性与交付节奏之间持续调整。',
      },
      {
        heading: '用户留言会影响下一轮选题',
        body:
          '“可爱”说明角色开始被记住；“孩子喜欢看”说明家庭共看已经出现在真实观看场景中；“下一期想看它做……”说明用户开始参与选题。这些留言被当作用户研究材料，并进入后续的内容判断。',
      },
      {
        heading: '短视频平台需要新的内容规划',
        body:
          '我调研了萌宠陪伴、环境感官、烟火日常、人文艺术，以及虚拟IP、萌宠短剧和AI环境治愈等内容。结合小龙吨吨已有角色资产，最终将“吨吨旅行”作为核心栏目，用美景与小情节组织15—30秒内容。',
      },
      {
        heading: '电视端积累能够继续使用的部分',
        body:
          '角色视觉、AIGC制作经验和治愈氛围继续保留。短视频画面强调真实质感、破次元构图与多样化布景，声音以轻音乐、环境白噪音和细节音效为主，旁白只在内容需要时出现。',
      },
      {
        heading: '大屏互动Demo仍处于概念阶段',
        body:
          '围绕喂养、陪玩、陪看、权益和治愈屏保的大屏互动方案属于未来方向探索，目前仅完成概念Demo。本案例将其作为产品思考展示，不把它描述为已经上线的产品成果。',
      },
    ],
    role: [
      '参与脚本、分镜、生成、筛选和剪辑的AIGC视频生产，支撑46集稳定交付。',
      '跟踪内容上线后的点击与二维码留言，归类角色、观看情境和选题信号。',
      '完成传统治愈赛道与AI治愈赛道的分类调研，整理内容类型、画面调性、角色设定和更新方式。',
      '结合已有角色资产形成“吨吨旅行”核心栏目，并规划视听规则与分阶段更新节奏。',
    ],
    process: [
      '围绕电视大屏的家庭观看场景，持续完成治愈向AI萌宠视频内容。',
      '通过首页推荐与连续日更积累真实播放和用户反馈。',
      '整理二维码留言中的角色好感、儿童观看与点餐需求。',
      '分类调研传统治愈内容与AI治愈内容，明确虚拟IP方向的直接对标范围。',
      '形成“吨吨旅行”栏目、15—30秒内容结构、视听规则和分阶段更新规划。',
    ],
    learned: [
      '连续日更中，角色一致性会直接影响用户记忆，生产效率需要与内容质量一起考虑。',
      '留言经过归类、判断并进入下一轮选题后，能够真正影响内容更新。',
      '电视端形成的角色资产与制作经验可以继续使用，短视频平台仍需重新规划内容结构、视听规则与更新节奏。',
    ],
    references: [
      { image: asset('ai-pet-case/stills/hero-river.webp'), label: '小龙吨吨电视端内容画面' },
    ],
    gallery: [],
  },
  {
    slug: 'game-design-lab',
    title: '策研工坊',
    cn: '游戏策划研学平台',
    year: '2026.08',
    type: '产品策划 / 信息架构 / 高保真交互Demo',
    heroImage: asset('game-lab-case/01-learning-home-archive-4k.jpg'),
    overview:
      '面向游戏策划学习者，把课程学习、游玩记录、案例拆解、同伴评审、机制卡和项目验证接成一条连续路径。用户每完成一步，平台都会保留来源、判断和下一步动作，让一次作业有机会继续进入团队复用。',
    award: '独立产品策划项目｜46页产品方案 + 七个核心模块高保真交互Demo',
    externalLink: { label: '体验策研工坊Demo', href: 'https://irene0618.github.io/game-design-lab/' },
    highlights: [
      '从课程、截图、长文、评审和项目文件之间的断点出发，设计“记录—拆解—评审—提炼—复用—回写”的完整研学路径。',
      '将《燕云十六声》《文明 VI》《双影奇境》的设计关系分别转成个人成长、知识结构和协作关系三个产品模块。',
      '完成覆盖学习首页、课程中心、案例广场、资产库、工作台、研学搭子和个人主页的高保真交互Demo，并明确真实账号、云端协作与推荐效果仍待验证。',
    ],
    details: [
      {
        heading: '问题：学习完成了，资料仍然会散掉',
        body:
          '课程页只留下观看进度，游玩截图脱离发生条件，长文结论埋在正文里，同伴评审又容易停在“写得不错”。每个动作都做过，下一次写方案时仍要重新找资料、重新解释。',
      },
      {
        heading: '主路径：让每一步都能接到下一步',
        body:
          '用户先保存截图、录像时间点和当时的问题，再整理为策划案；评审意见回到具体模块，稳定结论被提炼为带来源和边界的机制卡；机制卡进入项目后记录负责人、假设和测试结果，最后把结果回写到原结论。',
      },
      {
        heading: '个人成长：能力需要看得见来路',
        body:
          '能力记录读取课程练习、案例借鉴、独立文档、有效评审和项目验证等实际产出。用户可以展开查看依据，也可以切换当前研学方向；历史记录继续保留，不用从零开始。',
      },
      {
        heading: '知识资产：长文结论可以被再次使用',
        body:
          '机制卡保留源文档、主要证据、适用条件和风险边界。关系图围绕一张卡展开证据、报告、课程、项目引用与验证结果，只提示缺口，不替人判断结论质量。',
      },
      {
        heading: '协作：反馈要推动一次具体修改',
        body:
          '研学搭子根据公开作品证据、方向和协作时间给出双向互补理由。互评按证据、机制、应用和表达分工，分别记录看到的问题、需要补充的内容和双方确认的下一步。',
      },
      {
        heading: '验证边界：当前完成的是本地可交互Demo',
        body:
          'Demo 使用本地数据运行课程、案例、资产、工作台、研学搭子与个人成长等核心模块，支持主要操作状态、离线项目包和桌面端与390×844移动端。真实账号、班级空间、云端权限、实时协作和推荐模型尚未建设；学习效果和团队复用价值仍需通过小班试点验证。',
      },
    ],
    role: [
      '独立完成产品定位、用户任务、信息架构、核心对象、权限状态和迭代路线。',
      '拆解三款游戏，将游戏中的成长、研究和合作关系转译为产品模块。',
      '设计七个核心模块及关键流程，并完成高保真网页Demo与移动端适配。',
      '提出北极星指标、分阶段指标、四周试点方案和质量护栏。',
    ],
    process: [
      '定位课程、游玩记录、策划长文、同伴反馈和项目文件之间的断点。',
      '建立体验记录、策划案、证据、机制卡、评审、项目引用和验证结果七类核心对象。',
      '围绕“记录—拆解—评审—提炼—复用—回写”设计用户路径。',
      '完成页面原型、交互状态、离线数据包和移动端适配。',
      '为真实试点定义指标、样本周期和暂不建设的能力。',
    ],
    learned: [
      '策划学习产品的价值体现在用户的长期积累中，用户需要留下带有来源、反馈和后续动作的作品。',
      '能力画像需要允许用户查看依据、拒绝推荐和退出协作，不能变成永久标签或团队排名。',
      '关系完整只说明材料有没有连接，结论是否可靠仍要由评审和测试判断。',
    ],
    references: [
      { image: asset('game-lab-case/01-learning-home-archive-4k.jpg'), label: '策研工坊学习首页' },
      { image: asset('game-lab-case/04-editor.png'), label: '组件化策划案编辑器' },
      { image: asset('game-lab-case/07-relationship-graph.png'), label: '研学资产关系图' },
    ],
    gallery: [],
  },
  {
    slug: 'anti-drug-interactive-film',
    title: '禁毒互动影像游戏',
    cn: '基于恐惧诉求的行为训练型教育产品',
    year: '2026',
    type: '用户研究 / 互动产品 / 效果前测',
    heroImage: asset('anti-drug-case/06-web-prototype.png'),
    overview:
      '传统禁毒教育常把重点放在“让人知道毒品危险”，但前期研究显示，青年更现实的困难是在熟人聚会和群体压力下不知道如何拒绝、离场和求助。我将毕业设计重新定义为一款行为训练型教育产品：让用户进入生活化风险情境，在倒计时中做选择、看到后果、获得策略解释并重新练习。',
    award: '阶段状态｜互动原型与材料前测已完成；正式互动性对照实验待开展',
    externalLink: null,
    highlights: [
      '166份有效问卷：自我效能是五个核心维度中均值最低项，互动媒介接受度处于较高水平。',
      '6名青年参与式工作坊：将熟人施压、策略边界和练习需求转成角色、台词、选项、倒计时、反馈与重试规则。',
      '30份材料前测：高/低恐惧与有效能/无效能操控均呈显著区分，证明材料具备进入正式修订的基础。',
    ],
    details: [
      {
        heading: '问题定义：从风险认知转向行动训练',
        body:
          '文献、专业人员访谈与青年研究指向了一个变化：风险越来越多地进入熟人组织的剧本杀、密室、民宿轰趴等封闭娱乐场景。许多青年已经了解毒品的危害，但仍会担心拒绝影响关系、显得不合群或无法安全离开。产品因此将重点放在具体情境中的行动训练上。',
      },
      {
        heading: '需求验证：166份问卷找到效能短板',
        body:
          '问卷围绕风险认知、社交压力、拒毒困难、策略偏好与互动媒介接受展开。自我效能均值为3.105/5，是五个核心维度中最低项；互动媒介接受度为3.725/5。41.0%的受访者将熟人组织的剧本杀、私人密室或封闭桌游局识别为高风险场景，31.3%选择私人民宿或昏暗别墅轰趴。由此将产品需求明确为“在熟人压力下练习拒绝、离场与求助”。',
      },
      {
        heading: '参与式转化：用户共同决定什么才真实',
        body:
          '邀请6名青年参与结构化工作坊，结合录音、手册、白板关键词、角色扮演台词和原型反馈进行编码，形成身体失控、日常伪装、关系压力、策略边界、练习需求与身份代入六类主题。进入核心规则的内容需满足多源重复、与问卷结果一致、并能映射到理论变量和交互机制三个条件。',
      },
      {
        heading: '机制设计：选择—后果—解释—重试',
        body:
          '把EPPM中的严重性、易感性、反应效能和自我效能转成游戏语言：用熟人NPC、伪装道具和封闭聚会建立易感风险；用第一人称失控和急救反馈呈现后果；用直接拒绝、客观借口、物理离场和求助构成多层策略；用10秒倒计时、口语化话术、路径反馈和失败重试建立行动信心。',
      },
      {
        heading: '原型生产：把实验条件做成可控版本',
        body:
          '独立推进剧情、角色、风险场景、分镜、AIGC图像与视频生成、剪辑和网页交互原型，并建立“高/低恐惧 × 有效能/无效能”四组材料版本。四组共享前置情境、人物关系、关键诱导节点和问卷流程，差异只落在后果强度与是否提供策略、解释和重试，以降低无关变量。',
      },
      {
        heading: '前测结果与结论边界',
        body:
          '30份前测中，高恐惧材料的恐惧操控得分显著高于低恐惧材料（p=.006，d=1.163），有效能材料的效能操控得分显著高于无效能材料（p=.008，d=1.183）。这只证明材料操控可区分，不代表互动产品已产生正式教育增益。下一步需在高恐惧—高效能内容一致条件下，对比互动影像与线性影像。',
      },
    ],
    role: [
      '从研究命题到产品原型独立推进：文献与案例分析、问卷设计、工作坊、需求定义和机制转化。',
      '负责剧情、角色、风险场景、分镜、AIGC素材、视频剪辑与网页交互原型。',
      '设计四组实验材料、统一版本编码、关键节点、倒计时、条件跳转和问卷入口。',
      '完成30份材料前测、量表信度与操控检验，并将反馈转成话术、节奏和AIGC自然度修订项。',
    ],
    process: [
      '研究专业人员与目标青年，定位熟人社交压力下的真实行为缺口。',
      '用166份问卷验证高风险场景、效能短板、策略偏好和互动媒介接受度。',
      '通过6人参与式工作坊，把抽象心理变量转成可执行的游戏机制。',
      '完成四组AIGC互动影像材料与网页原型，保证版本之间的结构一致性。',
      '开展30份材料前测，检验操控、量表与流程并形成修订清单。',
      '规划正式互动性对照实验，检验互动机制而非新奇感带来的增益。',
    ],
    learned: [
      '教育产品的关键不一定是提供更多知识，而可能是把“知道”变成能够当场执行的行动脚本。',
      '理论只有被转成角色、选项、反馈、倒计时和重试等可操作机制，才真正进入产品设计。',
      '前测结果必须说明统计边界：材料可区分不等于产品有效，阶段状态本身也是产品判断的一部分。',
    ],
    references: [
      { image: asset('anti-drug-case/01-problem.png'), label: '问题定义：从危害知识传播转向拒毒行动训练' },
      { image: asset('anti-drug-case/02-research-framework.png'), label: '研究与产品验证框架' },
      { image: asset('anti-drug-case/04-eppm-mda-rules.png'), label: 'EPPM心理变量到互动机制的转化矩阵' },
      { image: asset('anti-drug-case/06-web-prototype.png'), label: '网页交互原型与多版本材料流程' },
    ],
    gallery: [
      { image: asset('anti-drug-case/03-user-expectations.png'), label: '166份问卷中的互动功能期待' },
      { image: asset('anti-drug-case/05-product-loop.png'), label: '选择、后果、反馈与重新练习的产品闭环' },
      { image: asset('anti-drug-case/07-pretest-results.png'), label: '30份材料前测：信度与操控检验' },
      { image: asset('anti-drug-case/08-next-experiment.png'), label: '正式研究：互动影像与线性影像对照方案' },
    ],
  },
  {
    slug: 'cocoon',
    title: '思茧成蝶',
    cn: '生长痛可视化 - 青春蜕变的诗意美学诠释',
    year: '2025',
    type: 'AIGC实验短片',
    heroImage: asset('cocoon-case/cocoon-ppt-01.jpg'),
    overview:
      '《思茧成蝶》以青春期“生长痛”为切入点，将身体发育、心理裂变、亲子代际关系与自我意识觉醒转化为一段梦境式影像。项目通过调研、工作坊、分镜脚本、AI图像生成、AI视频生成与后期剪辑，探索如何把隐性的成长创伤转译为可感知、可共鸣的视觉叙事。',
    award: '大学生AI艺术季「即梦AI动画创作特别单元」入围奖',
    externalLink: {
      label: '在新片场观看完整视频',
      href: 'https://www.xinpianchang.com/a13743952?from=webShare&channel=copyLink&token=40ddJB2JgGoy2ABKDK3b9HIO',
    },
    highlights: [
      '以“生长痛”连接身体、心理、家庭与社会期待，建立从研究议题到影像叙事的完整转译链路。',
      '通过问卷、访谈与工作坊提取视觉符号，再进入分镜与AI生成，避免作品只停留在抽象情绪表达。',
      '在AI视频生成中对比原始关键帧风格与插画风格，最终选择更具疗愈感和共鸣度的统一画风。',
    ],
    details: [
      {
        heading: '项目背景',
        body:
          '项目从青春期成长痛出发，把“疼痛”拆解为生理、心理与社会三重维度：骨骼和肌肉生长带来的真实疼痛，身份认同与情绪波动中的隐痛，以及家庭期待、同伴评价与身体羞耻带来的关系性创伤。作品希望打破“疼痛=脆弱”的单一叙事，将它重新理解为成长、修复与自我觉醒的证据。',
      },
      {
        heading: '研究发现',
        body:
          '前期调研显示，许多青少年会把生长痛理解为生理与心理复合创伤；当他们试图向父母沟通疼痛时，常收到“多吃钙片”“别矫情”等回应，导致疼痛从身体层面渗透到代际关系层面。与此同时，不少受访者希望通过艺术形式重新证明疼痛的合理性，并弥补青春期未被理解的缺位。',
      },
      {
        heading: '设计概念',
        body:
          '概念来源于“我思故我在 - 我撕故我再”。项目以思想者雕塑为核心意象，将青春期的撕裂、压抑、混乱和重组映射到五个主题章节：身体的边界、青春的裂痕、荷尔蒙风暴、失衡与秩序，以及最终的蜕变。蝴蝶、茧、镜、舟、秤等符号分别对应梦境开始、保护与发育、双面性、动荡前行和平衡觉醒。',
      },
      {
        heading: '方案迭代',
        body:
          '初期方案曾尝试科技感和极繁主义视觉，但在访谈和工作坊反馈中发现，插画风格更容易让观众产生疗愈感和情绪投射。最终方案保留梦境叙事与思想者雕塑的主线，用统一的插画画风和渐变的章节情绪构成完整影像。',
      },
      {
        heading: 'AI工作流',
        body:
          '小组将AI用于创意扩展和生产协作：使用大模型辅助文本生成与脚本整理，使用Midjourney、即梦、Procreate等生成或绘制关键帧，再通过Wan2.1、剪映、可灵、Runway等工具进行视频生成与后期编辑。主题设定、图像生成、视频生成、选择修正和剪辑包装经历了多轮迭代。',
      },
    ],
    role: [
      '参与主题研究、调研信息整理与项目叙事框架搭建。',
      '参与设计概念推导，将“生长痛”转化为章节、符号和分镜逻辑。',
      '参与AI图像/视频生成流程，整理关键帧、风格测试与生成反馈。',
      '参与最终页面展示、作品说明与视觉材料的组织呈现。',
    ],
    process: [
      '确定故事主题：围绕青春期生长痛，梳理剧情、分镜与整体情绪基调。',
      'AI文本生成：运用大模型生成并修订视频文案、章节描述和脚本信息。',
      'AI图像生成：根据文本与视觉符号生成关键帧画面，持续调整风格统一性。',
      'AI视频生成：用关键帧图像生成5-10秒片段，评估运动稳定性和画面连贯度。',
      '视频剪辑：筛选可用片段，完成节奏剪辑、配音配乐、字幕与海报包装。',
    ],
    learned: [
      'AIGC工作流负责连接概念、调研、视觉符号和后期剪辑，关键的设计判断仍由创作者完成。',
      '影像类AI项目要先建立稳定的章节结构和视觉规则，否则生成结果容易漂亮但松散。',
      '作品集页面需要同时展示最终画面和背后的判断过程，让观看者理解每一步的原因。',
    ],
    references: [
      { image: asset('cocoon-case/cocoon-ppt-03.jpg'), label: '设计背景：青春期生长痛' },
      { image: asset('cocoon-case/cocoon-ppt-09.jpg'), label: '定量研究：代际认知、疼痛应对与疗愈需求' },
      { image: asset('cocoon-case/cocoon-ppt-13.jpg'), label: '概念来源：我思故我在 - 我撕故我再' },
      { image: asset('cocoon-case/cocoon-ppt-19.jpg'), label: '设计方案：章节、风格、形态与意向' },
    ],
    gallery: [
      { image: asset('cocoon-case/cocoon-ppt-14.jpg'), label: '四个主题章节' },
      { image: asset('cocoon-case/cocoon-ppt-16.jpg'), label: '设计目标与核心价值' },
      { image: asset('cocoon-case/cocoon-ppt-18.jpg'), label: '初步草案与原视频脚本' },
      { image: asset('cocoon-case/cocoon-ppt-20.jpg'), label: 'AB Test与风格评估' },
      { image: asset('cocoon-case/cocoon-ppt-23.jpg'), label: 'AI辅助设计工具' },
      { image: asset('cocoon-case/cocoon-ppt-24.jpg'), label: 'AI生成到剪辑的流程' },
      { image: asset('cocoon-case/cocoon-ppt-25.jpg'), label: '海报产出' },
      { image: asset('cocoon-case/cocoon-ppt-26.jpg'), label: '视频关键帧镜头' },
    ],
  },
  {
    slug: 'electronic-yuefu',
    title: '电子新乐府',
    cn: 'AI诗词音乐厂牌 + 交互网页',
    year: '2026',
    type: 'AI诗词音乐产品 / 交互网页',
    heroImage: asset('yuefu-case/yuefu-01.jpg'),
    overview:
      '《电子新乐府》取自汉代“乐府”采诗入乐的传统，以AI音乐生成和交互网页为媒介，把古诗词转化为可听、可玩、可传播的数字音乐作品。项目以“AI诗词音乐厂牌”为设定，围绕诗乐选择、音乐人选择、专辑浏览与音乐创作实验室，构建从文化理解到沉浸式试听再到生成参与的体验路径。',
    award: '未来设计师（NCDA）大赛广东赛区三等奖',
    externalLink: {
      label: '在新片场观看完整视频',
      href: 'https://www.xinpianchang.com/a13743944?from=webShare&channel=copyLink&token=1pS8oU1o5fNySVb3O2OuyNG',
    },
    highlights: [
      '以“诗乐合一”为核心，把古诗词从静态文本转化为音乐符号、视觉意象和交互路径。',
      '通过旧版页面与案例分析，完成从高饱和红白界面到赛博新中式视觉的系统改进。',
      '将AI生成音乐、诗乐人角色、专辑浏览和音画互动整合成可演示的网页体验。',
    ],
    details: [
      {
        heading: '项目背景',
        body:
          '古诗词本身具有强烈的音律、意象和情绪，但在当代传播中常被放进静态阅读场景，用户参与门槛较高，音乐化表达也容易停留在单向欣赏。AIGC提供了新的创作入口：它可以降低音乐生产门槛，也能把诗词的意象、节奏和情感转化成更具沉浸感的视听体验。',
      },
      {
        heading: '设计概念',
        body:
          '“电子新乐府”借用汉代乐府采诗入乐的文化原型，将其重构为一家虚拟诗词音乐厂牌。用户会进入一个电子音乐实验室，在其中选择诗乐、理解诗词与音乐的映射关系、浏览诗乐人专辑，并参与古诗词音乐的再创作。',
      },
      {
        heading: '视觉改进',
        body:
          '项目对早期方案进行了系统复盘：旧版界面色彩较单一，图形与诗词之间的内在联系不够清晰，交互也偏平面。优化后，视觉方向转向“赛博新中式”，用低饱和夜蓝、青绿、淡粉与流动光效建立电子感，同时保留山水、云雾、书法和水墨颗粒等东方语境。',
      },
      {
        heading: '交互体验',
        body:
          '网页从首页进入精选推荐、诗乐选择、音乐人选择、专辑浏览和创作实验室等模块。拖动、滑动、卡片翻转、3D层叠和粒子动效引导用户主动探索诗词音乐的内容结构，让浏览过程更接近一次沉浸式试听。',
      },
      {
        heading: '音画生成',
        body:
          '播放页尝试把歌曲、诗词和视觉进行同频表达：歌词被转化为粒子与文字纹理，音频通过高、中、低频参数驱动画面中的水流、飞溅、雾气和粒子扩散。古诗词因此进入了可以被看见、被触发和被感知的动态空间。',
      },
    ],
    role: [
      '参与产品概念、文化定位与网页信息架构梳理。',
      '参与首页、诗乐选择、音乐人选择、专辑页和播放页等关键页面的视觉优化。',
      '整理设计案例分析与改进方向，将界面问题转化为具体的色彩、图层、字体和交互策略。',
      '参与AIGC视觉生成、音画互动演示和项目视频包装材料整理。',
    ],
    process: [
      '梳理“乐府”文化概念与古诗词音乐化的使用场景。',
      '分析旧版页面的问题，确定“古典诗意 + 未来电子感 + 虚实结合”的赛博新中式方向。',
      '优化首页、诗乐页、音乐人页、精选推荐页与音乐创作实验室页面。',
      '结合AI图像生成、音频可视化和粒子动效，搭建沉浸式视听体验。',
      '剪辑演示视频并整理比赛提交材料。',
    ],
    learned: [
      '文化类AIGC产品需要找到文化内容与用户参与之间的机制，AI工具才能在这个过程中发挥作用。',
      'UI美学优化需要从色彩、字体、图层、动效和交互节奏一起调整，单独换背景很难真正提升体验。',
      '音画互动可以把抽象诗意变成可感知体验，但必须有清晰的信息层级支撑，否则沉浸感会变成视觉噪音。',
    ],
    references: [
      { image: asset('yuefu-case/yuefu-04.jpg'), label: '设计背景：古诗词、文化传播与AIGC创作' },
      { image: asset('yuefu-case/yuefu-05.jpg'), label: '设计概念：虚拟诗词音乐厂牌' },
      { image: asset('yuefu-case/yuefu-10.jpg'), label: '网页主视觉美化：从旧版到新版' },
      { image: asset('yuefu-case/yuefu-20.jpg'), label: '播放页理念：文字、粒子与诗意画面' },
    ],
    gallery: [
      { image: asset('yuefu-case/yuefu-07.jpg'), label: '改进前页面与问题分析' },
      { image: asset('yuefu-case/yuefu-08.jpg'), label: '首页视觉风格调整' },
      { image: asset('yuefu-case/yuefu-09.jpg'), label: '界面规范与色板优化' },
      { image: asset('yuefu-case/yuefu-11.jpg'), label: '诗乐人形象改进' },
      { image: asset('yuefu-case/yuefu-15.jpg'), label: '精选推荐交互动效' },
      { image: asset('yuefu-case/yuefu-16.jpg'), label: '音乐人选择页面' },
      { image: asset('yuefu-case/yuefu-17.jpg'), label: '专辑选择与沉浸浏览' },
      { image: asset('yuefu-case/yuefu-18.jpg'), label: '诗乐选择与DNA映射' },
      { image: asset('yuefu-case/yuefu-19.jpg'), label: '播放页视觉语言' },
      { image: asset('yuefu-case/yuefu-21.jpg'), label: '音频驱动粒子与水流视觉' },
      { image: asset('yuefu-case/yuefu-22.jpg'), label: '频段提取与视觉参数' },
      { image: asset('yuefu-case/yuefu-23.jpg'), label: '美学优化总结' },
      { image: asset('yuefu-case/yuefu-24.jpg'), label: '核心美学定位' },
    ],
  },
  {
    slug: 'qin-yun',
    title: '琴韵',
    cn: '五音疗愈音箱及配套APP',
    year: '2025',
    type: '产品体验设计',
    heroImage: asset('qinyun-case/qinyun-02-ui-board.jpg'),
    overview:
      '《琴韵》是一套围绕中式五音疗愈、古琴文化和现代亚健康场景展开的产品体验设计。项目将古琴灯具音箱、配套APP、品牌IP、用户旅程和视觉规范整合为一个可演示的身心疗愈系统，尝试把传统五音理论转译为年轻用户也能理解和使用的日常放松体验。',
    award: '',
    externalLink: null,
    highlights: [
      '从音乐疗愈市场、竞品和用户调研出发，提炼出“传统五音疗法 + 科技融合 + 文化传承 + 使用便捷性”的产品机会。',
      '把古琴、五音、五行、情绪调理和现代家居场景结合，形成“灯具音箱 + App + 健康反馈”的软硬件体验闭环。',
      '通过10名潜在用户原型测试，对Logo、Slogan、品牌名和视觉记忆点进行量化评分与关键词反馈，反向优化品牌表达。',
    ],
    details: [
      {
        heading: '市场与竞品切入',
        body:
          '项目首先分析音乐疗愈市场的发展：声音疗愈正在从小众身心灵活动进入更日常的压力缓解、睡眠辅助和情绪放松场景。竞品多以课程、疗愈空间或儿童艺术疗愈为主，品牌定位较清晰，但在传统中医五音理论、家居硬件联动和可持续使用记录上仍有差异化空间。',
      },
      {
        heading: '目标用户与需求转化',
        body:
          '调研对象以学生和白领为主，常见状态包括压力大、疲劳、睡眠质量差、对身体健康关注度高，同时又希望产品使用方式足够简单。设计将需求拆成三个方向：降低理解门槛，提供可被长期使用的音乐疗愈路径，并通过硬件与App联动让用户感到“有陪伴、有反馈、可持续”。',
      },
      {
        heading: '产品概念',
        body:
          '硬件以唐代“九霄环佩”古琴为灵感，将古琴轮廓、灯光、白玉兰花和木质纹理结合为桌面音箱。App承担健康测试、音乐推荐、疗愈记录、社区问答和内容学习功能，让用户从“想放松”进入“测试状态 - 获得推荐 - 聆听疗愈 - 查看记录”的完整流程。',
      },
      {
        heading: '品牌与视觉系统',
        body:
          '品牌名在“琴韵”和“五音清心阁”之间进行比较，最终以更简洁易记的“琴韵”作为主名称。Logo结合古琴轮廓与汉字“琴”的抽象结构，IP角色“子弦”承担品牌亲和力和内容传播功能，视觉上使用青绿、米白、橙黄等柔和色系建立自然、健康、文化感。',
      },
      {
        heading: '原型测试与迭代',
        body:
          '为了验证品牌是否能与目标用户产生共鸣，项目选择10名潜在用户进行原型测试，测试Logo、Slogan和品牌名的吸引度、记忆度和联想关键词。反馈显示用户更偏好清晰、传统但不复杂的表达，因此设计进一步减少信息噪音，强化“中式五音疗愈”的核心识别。',
      },
    ],
    role: [
      '参与音乐疗愈市场与竞品分析，梳理产品机会点和差异化方向。',
      '搭建用户画像、用户旅程和功能结构，将疗愈需求转化为软硬件体验路径。',
      '设计古琴音箱概念、App关键页面、Logo/IP/色彩/字体等品牌视觉系统。',
      '整理原型测试方法和反馈结果，把用户评价转化为品牌命名、Logo和界面表达的优化依据。',
    ],
    process: [
      '分析音乐疗愈市场、竞品商业模式和目标人群压力/睡眠/放松需求。',
      '明确产品定位：以五音理论为核心，结合古琴文化、智能硬件和App健康反馈。',
      '建立用户画像与用户旅程，拆解登录、健康测试、推荐音乐、选择疗愈方式、查看记录等关键阶段。',
      '完成古琴音箱外观、IP角色、Logo、视觉规范、App结构和页面逻辑设计。',
      '组织10名潜在用户测试品牌原型，汇总评分与关键词反馈，优化最终品牌表达。',
    ],
    learned: [
      '文化疗愈产品不能只做“古风外观”，必须把传统理论转化为用户能理解、能操作、能持续感知的体验。',
      '软硬件联动需要先讲清楚使用场景，否则音箱、App、品牌IP容易变成分散的视觉元素。',
      '品牌测试可以帮助设计从主观审美回到用户记忆点，尤其适合命名、Logo和Slogan这类高感知决策。',
    ],
    references: [
      { image: asset('qinyun-case/qinyun-01-product-board.jpg'), label: '古琴灯具音箱设计总览' },
      { image: asset('qinyun-case/qinyun-02-ui-board.jpg'), label: '配套App与用户旅程总览' },
      { image: asset('qinyun-case/qinyun-15-journey.jpg'), label: '用户旅程与体验痛点' },
      { image: asset('qinyun-case/qinyun-16-ui-flow.jpg'), label: 'App页面逻辑与手表联动' },
    ],
    gallery: [
      { image: asset('qinyun-case/qinyun-03-market.jpg'), label: '音乐疗愈市场与竞品分析' },
      { image: asset('qinyun-case/qinyun-04-positioning.jpg'), label: '产品特点与差异化定位' },
      { image: asset('qinyun-case/qinyun-05-research-summary.jpg'), label: '消费者调研总结与设计转化' },
      { image: asset('qinyun-case/qinyun-06-personas.jpg'), label: '目标用户画像与驱动力' },
      { image: asset('qinyun-case/qinyun-07-focus-test.jpg'), label: '品牌差异化焦点测试' },
      { image: asset('qinyun-case/qinyun-09-logo.jpg'), label: '品牌命名、Slogan与Logo方向' },
      { image: asset('qinyun-case/qinyun-10-test-plan.jpg'), label: '原型测试计划' },
      { image: asset('qinyun-case/qinyun-11-test-result.jpg'), label: '原型测试评分与关键词反馈' },
      { image: asset('qinyun-case/qinyun-13-ip.jpg'), label: '品牌IP角色与表情延展' },
      { image: asset('qinyun-case/qinyun-14-wireframe.jpg'), label: '信息架构与低保真线框' },
      { image: asset('qinyun-case/qinyun-17-product-detail.jpg'), label: '古琴灯具音箱结构细节' },
      { image: asset('qinyun-case/qinyun-18-extensions.jpg'), label: '品牌周边与视觉延展' },
    ],
  },
  {
    slug: 'ladywell',
    title: 'LadyWell',
    cn: '更年期女性关爱平台',
    year: '2025',
    type: '健康关怀平台',
    heroImage: asset('ladywell-case/ladywell-16-app-overview.jpg'),
    overview:
      'LadyWell 是一个面向更年期女性及其家庭成员的情绪关怀平台。项目从社会语境、医学与心理研究、家庭沟通困境和女性情绪体验出发，提出通过可穿戴设备、情绪可视化、家庭互动和内容陪伴，帮助更年期女性被理解、被看见、被支持。',
    award: '',
    externalLink: null,
    highlights: [
      '把“更年期情绪被误解”拆解为女性自身、丈夫、子女三类角色的行为、感受与需求，明确家庭沟通是核心场景。',
      '将HRV心率变异性、情绪表、蝴蝶兰视觉形象和智能手表结合，探索情绪状态的低压力可视化表达。',
      '从痛点到机会点建立产品闭环：情绪记录、家人看见、互动回应、家庭时刻、内容陪伴和自我调节。',
    ],
    details: [
      {
        heading: '问题背景',
        body:
          '更年期常被日常语言污名化为“脾气差”“阴晴不定”，很多女性在真实生理和心理变化之外，还要承受来自家庭与社会的误解。资料梳理显示，更年期女性存在明显的焦虑与心理压力，而家庭或社会支持对降低更年期症状与抑郁发生率具有积极作用。',
      },
      {
        heading: '研究问题',
        body:
          '项目聚焦三个问题：更年期女性及家庭成员对更年期症状的了解程度，家庭成员对女性情绪变化的感知方式，以及女性自身对情绪把控的程度与方法。研究方向从“妇科检查自测”等健康工具逐步调整为“更年期女性心理健康与家庭支持”。',
      },
      {
        heading: '用户画像',
        body:
          '项目构建了三类关键角色：处于更年期的家庭主妇、工作繁忙的丈夫、离家读书或工作的子女。更年期女性需要减少焦虑、获得陪伴并让情绪变化被家人看见；丈夫和子女则需要更低门槛地理解对方状态，并学会以合适方式回应。',
      },
      {
        heading: '痛点与机会',
        body:
          '痛点包括无法从家庭中获得情绪价值、家庭沟通困难、家人无法感知情绪变化，以及情绪波动对家庭氛围的影响。对应机会点是提供情绪价值、增进沟通、帮助家人“看见”变化，并营造更健康的家庭氛围。',
      },
      {
        heading: '设计方案',
        body:
          'LadyWell 通过桌面小组件和App联动呈现用户心情。手表每2小时自动检测HRV和HR数据，将不同状态映射为不同颜色和蝴蝶兰形态；App首页展示实时情绪表、日历和上传情绪入口；互动模块支持拍照、留言、查看家庭时刻，让家庭成员以轻量方式回应和陪伴。',
      },
    ],
    role: [
      '整理更年期心理健康、家庭支持和社会语境资料，明确项目从健康工具转向情绪关怀平台。',
      '构建三类角色画像、同理心地图、痛点与机会点，梳理女性与家庭成员之间的沟通阻力。',
      '规划桌面组件、App首页、家庭互动、我的家庭和情绪记录等核心功能架构。',
      '完成Logo、色彩、字体、蝴蝶兰情绪视觉、低保真原型和中高保真界面展示。',
    ],
    process: [
      '从“更年期”社会语境和文献资料出发，分析女性心理压力与家庭支持的重要性。',
      '提出研究问题，并围绕女性、丈夫、子女三类角色建立用户画像与同理心地图。',
      '将痛点转化为机会点：情绪价值、沟通增进、情绪可见化和家庭氛围改善。',
      '设计功能架构、故事板和核心交互路径，确定手表检测HRV与App情绪可视化的方案。',
      '完成低保真原型、中高保真UI、情绪蝴蝶兰视觉系统和家庭互动界面呈现。',
    ],
    learned: [
      '敏感健康议题需要建立尊重、温和、可信任的表达方式，功能规划也围绕这一前提展开。',
      '家庭成员也是用户：当服务目标是改善关系时，产品必须同时考虑被照护者和陪伴者的行为动机。',
      '情绪可视化需要避免给用户贴标签，使用植物状态和柔和色彩比直接数值更适合关怀场景。',
    ],
    references: [
      { image: asset('ladywell-case/ladywell-03-background.jpg'), label: '更年期心理健康与家庭支持背景' },
      { image: asset('ladywell-case/ladywell-08-empathy-map.jpg'), label: '更年期女性同理心地图' },
      { image: asset('ladywell-case/ladywell-14-system-map.jpg'), label: 'Logo、视觉规范与功能架构' },
      { image: asset('ladywell-case/ladywell-16-app-overview.jpg'), label: '桌面小组件与App设计总览' },
    ],
    gallery: [
      { image: asset('ladywell-case/ladywell-01-cover.jpg'), label: 'LadyWell项目封面与Slogan' },
      { image: asset('ladywell-case/ladywell-02-context.jpg'), label: '更年期社会语境与大众误解' },
      { image: asset('ladywell-case/ladywell-04-research-question.jpg'), label: '研究问题与选题方向' },
      { image: asset('ladywell-case/ladywell-05-persona-li.jpg'), label: '更年期女性Persona' },
      { image: asset('ladywell-case/ladywell-06-persona-husband.jpg'), label: '丈夫角色Persona' },
      { image: asset('ladywell-case/ladywell-07-persona-son.jpg'), label: '子女角色Persona' },
      { image: asset('ladywell-case/ladywell-09-pain-points.jpg'), label: '核心痛点提炼' },
      { image: asset('ladywell-case/ladywell-10-opportunities.jpg'), label: '设计机会点' },
      { image: asset('ladywell-case/ladywell-11-storyboard-self.jpg'), label: '女性自我调节故事板' },
      { image: asset('ladywell-case/ladywell-12-storyboard-family.jpg'), label: '家庭成员陪伴故事板' },
      { image: asset('ladywell-case/ladywell-13-hrv-watch.jpg'), label: 'HRV检测与手表情绪可视化' },
      { image: asset('ladywell-case/ladywell-15-prototype.jpg'), label: '低保真原型到中高保真界面' },
      { image: asset('ladywell-case/ladywell-17-emotion-states.jpg'), label: '不同情绪对应的蝴蝶兰形象与颜色' },
      { image: asset('ladywell-case/ladywell-18-home.jpg'), label: '首页情绪表、日历与上传入口' },
      { image: asset('ladywell-case/ladywell-19-interaction.jpg'), label: '家庭互动：拍照、留言与查看内容' },
      { image: asset('ladywell-case/ladywell-20-profile.jpg'), label: '我的家庭与家庭聊天界面' },
    ],
  },
  {
    slug: 'botopia',
    title: '植系乌托邦',
    cn: '自然关系思辨设计',
    year: '2025',
    type: '思辨设计',
    heroImage: asset('botopia-case/botopia-09-design-concept-statement.jpg'),
    overview:
      '《植系乌托邦》以非人类中心主义与“共生生存”理论为切入，将树冠与树根设定为未来与过去、希望与批判的双重空间，探讨技术文明、环境暴力与植物生命之间的关系，并通过TouchDesigner手势交互把生态议题转化为可感知的互动体验。',
    award: '',
    externalLink: null,
    highlights: [
      '用“树冠/树根”的并置结构承载两种世界：树冠指向共生、修复与未来可能，树根指向污染、工业侵蚀与生态记忆。',
      '将非人类中心主义、共生生存、环境数据与神话符号整合为一套可展示的概念叙事，避免思辨设计停留在单一视觉风格。',
      '通过MediaPipe手势识别与TouchDesigner粒子系统，让张开手掌与握紧拳头分别触发“生长/消散”的生态隐喻。',
    ],
    details: [
      {
        heading: '理论起点',
        body:
          '项目从多物种共同参与生态变化的视角出发，借助非人类中心主义与Donna Haraway的共生生存理论，重新思考植物在生态系统中的主体性，并提出非人生命如何在信息时代发声的问题。',
      },
      {
        heading: '叙事结构',
        body:
          '概念被拆分为树冠、树根和未来之树三个层次：树根储存人类科技暴力与环境破坏的记忆，树冠孕育未来植物与人类共生的想象，二者共同构成一个带有批判性的异托邦空间。',
      },
      {
        heading: '交互实现',
        body:
          '交互系统使用TouchDesigner构建，结合手势识别、粒子动画、数据变化、文字与音乐反馈。张开手掌对应树冠生长，握紧拳头对应树根消散，使观众的身体动作成为环境选择的隐喻。',
      },
    ],
    role: [
      '从非人类中心视角搭建概念叙事。',
      '整理理论、环境数据、神话来源和视觉参考。',
      '设计树冠/树根双重世界的视觉语言与展示PPT。',
      '尝试TouchDesigner手势交互和粒子系统表达。',
    ],
    process: [
      '研究非人类中心主义、共生生存与自然关系重构理论。',
      '收集空气污染、水污染、森林退化等环境破坏数据作为问题证据。',
      '提取树冠、树根、盖亚、宙斯、提丰等符号，建立“过去/未来”的叙事对照。',
      '设计树冠与树根两套视觉产出，并将其组织为双重世界。',
      '用MediaPipe与TouchDesigner完成手势映射、粒子变化和交互演示。',
    ],
    learned: [
      '思辨设计需要想象力，也需要清晰的理论入口和现实证据。',
      '抽象生态议题如果能绑定空间结构和交互动作，会更容易被观众理解。',
      '交互反馈不仅是技术演示，也可以成为观点表达的一部分。',
    ],
    references: [
      botopiaGallery[8],
      botopiaGallery[9],
      botopiaGallery[10],
      botopiaGallery[11],
    ],
    gallery: botopiaGallery,
  },
  {
    slug: 'zhuangyuan-qijing',
    title: '状元七景',
    cn: '长虹状元文化包装设计',
    year: '2025',
    type: '文化创意设计',
    heroImage: asset('zhuangyuan-case/zhuangyuan-01-overview.png'),
    overview:
      '《状元七景》以长虹乡状元文化与生态农产品为核心，将“耕读传家、以食养志、以物载道”的地方叙事转译为礼盒包装、系列产品、书签、文牒、文具与护身符等文创体系，尝试把传统文化、地方农业和AIGC辅助设计流程结合起来。',
    award: '',
    externalLink: null,
    highlights: [
      '以“状元七景”为叙事框架，把一日三餐、读书赶考、题名荣归等情境转化为七个可识别的产品场景。',
      '建立革命红、星空蓝、菜花黄、状元墨、王陵紫、龙顶绿、碧泉青等色彩系统，让不同产品拥有统一但可区分的视觉身份。',
      '将AIGC应用到视觉元素发散、插图风格探索和包装效果图生成中，形成从概念到产品渲染的设计流程。',
    ],
    details: [
      {
        heading: '文化定位',
        body:
          '项目以长虹乡的状元故事、耕读传统与生态农业资源为基础，将地方文化从“讲述历史”转向“可被带走、可被使用、可被分享”的文创产品体验。',
      },
      {
        heading: '包装系统',
        body:
          '主礼盒采用层叠式结构，将七个主题产品组织在同一叙事框架中：山茶油、高粱酒、清水鱼干、星宿书签、通关文牒、题名文具与状元符，共同形成完整的文化礼盒。',
      },
      {
        heading: '落地延展',
        body:
          '项目进一步补充产品定价、包装尺寸、轻便分装和周边落地方式，使作品不仅停留在视觉展示，也能回应实际销售、携带和旅游纪念场景。',
      },
    ],
    role: [
      '研究地方文化符号并筛选可转译元素。',
      '搭建七景叙事结构、产品矩阵和包装层级。',
      '设计色彩系统、图形资产、标签与礼盒结构。',
      '整理AIGC工作流程、效果图和落地应用分析。',
    ],
    process: [
      '明确长虹乡状元文化、生态农业和目标消费场景。',
      '将七个主题场景拆分为产品、插图、色彩和包装语义。',
      '通过AIGC生成并筛选视觉元素，再进行人工排版与系统化修正。',
      '完成主礼盒、单品包装、书签、文牒、文具等系列化产出。',
      '补充定价、尺寸和销售落地分析，完善项目可行性表达。',
    ],
    learned: [
      '文化文创需要把地方故事压缩成清晰的产品结构，用户才能快速理解。',
      'AIGC适合做前期发散和视觉探索，但最终仍需要设计系统来统一。',
      '包装设计的说服力来自视觉、结构、成本与使用情境的共同成立。',
    ],
    references: [
      zhuangyuanGallery[0],
      zhuangyuanGallery[2],
      zhuangyuanGallery[3],
      zhuangyuanGallery[4],
    ],
    gallery: zhuangyuanGallery,
  },
  {
    slug: 'art-heals',
    title: '以艺疗心',
    cn: '大学生艺术疗愈内容社区',
    year: '2023',
    type: '内容社区策划',
    heroImage: asset('art-healing-case/art-healing-01-background.png'),
    overview:
      '《以艺疗心》面向大学生负性情绪疏导场景，提出一个以视觉艺术疗愈为核心的内容社区。项目从政策、应用场景、用户画像和功能架构出发，设计了主菜单、艺术资讯、秘密星球、心灵分享、心理测试、心理咨询和艺术工作坊等模块。',
    award: '',
    externalLink: null,
    highlights: [
      '围绕大学生情绪压力、心理服务供需不匹配和艺术疗愈应用不足，建立从背景研究到产品模块的完整论证。',
      '把疗愈体验拆解为视觉疗愈、听觉疗愈、秘密星球、心灵分享、心理测试与专业咨询，兼顾自助调节和社群支持。',
      '使用粉紫色彩疗愈风格与低压力交互语言，让心理健康议题以更温柔、轻盈的方式进入用户日常。',
    ],
    details: [
      {
        heading: '研究背景',
        body:
          '项目结合政策背景、艺术疗愈应用背景和大学生负性情绪数据，提出艺术疗愈平台可以作为校园心理支持的补充入口，帮助用户用更低门槛的方式进行情绪表达。',
      },
      {
        heading: '产品结构',
        body:
          '功能架构分为艺术大厅、秘密星球和个人主页三条主线，覆盖资讯浏览、线上艺术展、艺术工作坊预约、同类匹配、匿名表达、心理测试和咨询记录。',
      },
      {
        heading: '界面表达',
        body:
          '界面采用柔和渐变、星球隐喻和轻量卡片，把用户的情绪表达转化为“发光的小星球”。视觉上弱化医疗感，强调陪伴、探索和自我照护。',
      },
    ],
    role: [
      '规划艺术疗愈内容社区方向和用户价值。',
      '整理政策、应用、群体背景与用户画像。',
      '设计功能架构、低保真流程和关键界面展示。',
      '将社会创新思路与校园情绪支持结合。',
    ],
    process: [
      '识别大学生压力、负性情绪和校园心理服务缺口。',
      '建立用户画像、功能架构、按钮、输入框和色彩规范。',
      '设计注册引导、主菜单、艺术资讯、秘密星球和心灵分享流程。',
      '补充视觉疗愈、听觉疗愈、心理测试和心理咨询页面。',
      '将界面模块整理成适合展示的项目汇报版式。',
    ],
    learned: [
      '心理健康产品需要降低表达压力，让用户先愿意靠近。',
      '社区产品需要稳定的内容机制，界面承担内容承载与用户连接的作用。',
      '疗愈风格不能只依赖颜色，还要体现在路径、语气和互动节奏中。',
    ],
    references: [
      artHealingGallery[0],
      artHealingGallery[1],
      artHealingGallery[3],
      artHealingGallery[5],
    ],
    gallery: artHealingGallery,
  },
  {
    slug: 'digital-zuel',
    title: '数字中南大',
    cn: '元宇宙校园平台',
    year: '2023',
    type: '互动校园平台',
    heroImage: asset('digital-zuel-case/digital-zuel-03-concept-map.png'),
    overview:
      '《数字中南大》以中南财经政法大学75周年校庆、数字中国建设和数字文创产业为背景，围绕“校园底蕴 + 文化创意”和“虚拟创新 + 赋能实体”两条价值线，探索AR书签、虚拟桌面摆件、校园元宇宙和文三水IP周边等数字文创表达。',
    award: '',
    externalLink: null,
    highlights: [
      '以国家文化大数据、数字创意产业和数字中国建设为背景，将校园文化传播与数字资产、AR体验、NFT纪念品等方向连接起来。',
      '提出“线下创意为魂、线上科技为骨”的作品理念，把实体文创、AR数字书签、虚拟桌面摆件和校园元宇宙纳入统一表达。',
      '围绕“文三水”IP完成角色设定和衍生周边，将学校人文气质转译为更亲近年轻用户的吉祥物形象。',
    ],
    details: [
      {
        heading: '价值框架',
        body:
          '项目从人文价值与产业价值两个维度展开：一方面传播校训、校史和校园风貌，另一方面探索数字孪生校园、AR书签、虚拟展览和数字纪念品等可转化的文化资产。',
      },
      {
        heading: '数字文创产品',
        body:
          '核心产出包括可交互式AR书签、ZUEL虚拟桌面摆件和中南大元宇宙场景。AR书签将校园地标、校训精神和景文结合转化为可扫描、可互动的文创体验。',
      },
      {
        heading: 'IP与周边',
        body:
          '“文三水”以“以文起舞、以水扬名”为命名线索，结合中南大人文社科气质与校园湖水意象，延展出表情包、钥匙扣、马克杯、口罩、T恤和手提袋等周边。',
      },
    ],
    role: [
      '探索数字校园概念、价值框架和视觉呈现方向。',
      '整理AR书签、虚拟桌面摆件、校园元宇宙等产品展示材料。',
      '参与三维模型、AR效果搭建和传播版式组织。',
      '将校园识别转化为更沉浸、更年轻化的数字文创表达。',
    ],
    process: [
      '梳理政策、行业和校庆人文背景，明确数字文创的价值基础。',
      '建立人文价值与产业价值两大体系，拆解体验场景和消费模式。',
      '设计线下实体文创与线上数字平台的组合结构。',
      '制作AR书签、ZUEL桌面摆件和虚拟校园效果展示。',
      '补充文三水IP角色设定和衍生周边，完善项目传播面。',
    ],
    learned: [
      '数字校园项目需要可识别的文化符号，也需要清晰的互动场景。',
      'AR文创的说服力来自实体物和数字内容之间的自然连接。',
      'IP角色能降低宏大校园叙事的距离感，让文化传播更轻、更可亲近。',
    ],
    references: [
      digitalZuelGallery[0],
      digitalZuelGallery[2],
      digitalZuelGallery[4],
      digitalZuelGallery[6],
    ],
    gallery: digitalZuelGallery,
  },
];

const animationArchiveProjects = [
  {
    slug: 'qing',
    number: '01',
    type: '实拍 × CG 动画',
    title: '《纷蕴柑青来》',
    summary: '以茶文化为叙事线索，完成角色设计、三维建模、实拍场景、分镜与后期合成的跨媒介动画创作。',
    externalLink: 'https://www.xinpianchang.com/a13761354?from=webShare&channel=copyLink&token=3EsgnHAKWS33WfxuV47yfir',
    gallery: [
      { image: asset('undergraduate-animation/qing-01-overview.jpg'), label: '项目背景与调研' },
      { image: asset('undergraduate-animation/qing-02-production.jpg'), label: '角色建模与实拍制作' },
      { image: asset('undergraduate-animation/qing-03-storyboard.jpg'), label: '故事设计、分镜与合成' },
      { image: asset('undergraduate-animation/qing-04-final-film.jpg'), label: '成片画面展示' },
    ],
  },
  {
    slug: 'reunion',
    number: '02',
    type: '三维叙事动画',
    title: '《与你重逢》',
    summary: '围绕旧玩具熊与记忆重逢展开叙事，完成角色、场景、动捕、三维动画、特效与后期制作。',
    externalLink: null,
    gallery: [
      { image: asset('undergraduate-animation/reunion-01-cover.jpg'), label: '项目概念与故事梗概' },
      { image: asset('undergraduate-animation/reunion-02-scene-design.jpg'), label: '场景设计与资产制作' },
      { image: asset('undergraduate-animation/reunion-03-character-design.jpg'), label: '角色设计' },
      { image: asset('undergraduate-animation/reunion-04-motion-capture.jpg'), label: '动作捕捉与骨骼绑定' },
      { image: asset('undergraduate-animation/reunion-05-vfx.jpg'), label: 'Houdini 与后期视觉特效' },
      { image: asset('undergraduate-animation/reunion-06-storyboard.jpg'), label: '二维分镜设计' },
      { image: asset('undergraduate-animation/reunion-07-animation.jpg'), label: '三维动画成片展示' },
    ],
  },
  {
    slug: 'mg-opening',
    number: '03',
    type: '独立手绘 MG 动画',
    title: '独立手绘MG动画片头《人生绩效簿》',
    summary: '从视觉概念到逐帧动态表达的独立创作，聚焦节奏、转场与片头情绪的统一。',
    externalLink: 'https://www.xinpianchang.com/a13761347?from=webShare&channel=copyLink&token=2Ej15LQgr4y2ZSBz21pQXcU',
    gallery: [
      { image: asset('undergraduate-animation/mg-01-mushroom-house.jpg'), label: '蘑菇屋场景关键帧' },
      { image: asset('undergraduate-animation/mg-02-title-sky.jpg'), label: '《人生绩效簿》标题画面' },
      { image: asset('undergraduate-animation/mg-03-clothes-baby.jpg'), label: '成长与衣物叙事画面' },
      { image: asset('undergraduate-animation/mg-04-campus-cloud.jpg'), label: '云端校园场景' },
      { image: asset('undergraduate-animation/mg-05-stage-resume.jpg'), label: '人生绩效簿舞台画面' },
      { image: asset('undergraduate-animation/mg-06-cloud-hall.jpg'), label: '云端殿堂远景' },
    ],
  },
  {
    slug: 'returning-nest',
    number: '04',
    type: '二维手绘动画',
    title: '《归巢》',
    summary: '二维手绘动画作品，以手绘语言完成叙事节奏与情绪表达。',
    externalLink: 'https://www.xinpianchang.com/a13761363?token=49zOP91lyICHeiTx82emgtE&from=share&xpcApp=xpc&channel=link&type=URL',
    gallery: [
      { image: asset('undergraduate-animation/nest-01-character-design.jpg'), label: '《归巢》角色设计与议题背景' },
      { image: asset('undergraduate-animation/nest-02-storyboard.jpg'), label: '《归巢》分镜与叙事节奏' },
    ],
  },
];

const additionalArchiveWorks = ['UE5 场景建模', '红“秘”围城 VR 游戏项目', '丰舞蝶梦 梁祝相惠'];

const skills = [
  'AI产品拆解',
  'Prompt设计',
  'AIGC视频',
  '用户研究',
  '竞品分析',
  '信息架构',
  'UI视觉规范',
  '短视频运营',
  '摄影',
  'Figma',
  'Premiere',
  'Midjourney',
  '可灵',
  '即梦',
  'Suno',
  'Cursor',
];

const quietImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.style.visibility = 'hidden';
};

type LightboxImage = {
  src: string;
  alt: string;
  caption: string;
};

type ZoomableImageProps = LightboxImage & {
  onOpen: (image: LightboxImage) => void;
};

function ZoomableImage({ src, alt, caption, onOpen }: ZoomableImageProps) {
  return (
    <button
      className="zoomable-image"
      type="button"
      aria-label={`放大查看：${caption}`}
      title="点击放大查看"
      onClick={() => onOpen({ src, alt, caption })}
    >
      <img src={src} alt={alt} onError={quietImageFallback} />
      <span className="zoom-hint">点击查看细节</span>
    </button>
  );
}

function ImageLightbox({ image, onClose }: { image: LightboxImage; onClose: () => void }) {
  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={image.caption}>
      <button className="lightbox-backdrop" type="button" aria-label="关闭图片查看" onClick={onClose} />
      <div className="lightbox-panel">
        <button className="lightbox-close" type="button" aria-label="关闭图片查看" title="关闭" onClick={onClose}>
          ×
        </button>
        <img src={image.src} alt={image.alt} />
        <p>{image.caption}</p>
      </div>
    </div>
  );
}

function VisualSnippetCard({
  item,
  index,
  cardId,
  active,
  flipping,
  duplicate,
  onFocus,
  onBlur,
  onOpen,
}: {
  item: (typeof loopingVisualSnippets)[number];
  index: number;
  cardId: string;
  active: boolean;
  flipping: boolean;
  duplicate: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onOpen: (image: LightboxImage) => void;
}) {
  const style = {
    '--snippet-index': index.toString(),
    '--snippet-accent': item.accent,
  } as CSSProperties;

  return (
    <button
      className={`visual-snippet-card${active ? ' is-active' : ''}${flipping ? ' is-flipping' : ''}`}
      type="button"
      style={style}
      tabIndex={duplicate ? -1 : 0}
      aria-label={`查看视觉片段：${item.label}`}
      onPointerEnter={onFocus}
      onPointerLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={() =>
        onOpen({
          src: item.image,
          alt: `${item.label}视觉片段`,
          caption: `${item.group}｜${item.label}`,
        })
      }
    >
      <span className="snippet-card-flip">
        <span className="snippet-card-face snippet-card-front">
          <span className="snippet-card-image">
            <img src={item.image} alt={`${item.label}视觉片段`} onError={quietImageFallback} />
          </span>
        </span>
        <span className="snippet-card-face snippet-card-back" aria-hidden="true">
          <Leaf size={28} strokeWidth={1.35} />
          <small>VISUAL FRAGMENT</small>
          <strong>{item.label}</strong>
          <span>OPEN IMAGE</span>
        </span>
      </span>
    </button>
  );
}

function BrowserBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={menuOpen ? 'browser-bar menu-open' : 'browser-bar'}>
      <div className="browser-address">
        <span className="lock-dot" />
        irene.zhangxinwen
      </div>
      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        className="icon-button mobile-menu"
        type="button"
        aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        aria-expanded={menuOpen}
        title={menuOpen ? '关闭菜单' : '打开菜单'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <Menu size={18} />
      </button>
      <nav className="mobile-nav" aria-label="移动端导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Tape({ className = '' }: { className?: string }) {
  return <span className={`tape ${className}`} aria-hidden="true" />;
}

function HeroCollage() {
  return (
    <section className="hero-section" id="top">
      <div className="paper-tear" aria-hidden="true" />
      <div className="forest-window">
        <img src={asset('hero-swirl-tree.jpg')} alt="Swirling green tree canopy" onError={quietImageFallback} />
        <div className="forest-overlay" />
      </div>

      <div className="hero-collage" aria-label="主页拼贴">
        <div className="side-photo side-photo-left">
          <Tape />
          <img src={asset('portrait-garden.jpg')} alt="Xinwen Zhang in a garden" onError={quietImageFallback} />
        </div>

        <article className="polaroid main-polaroid">
          <img src={asset('portrait.jpg')} alt="Xinwen Zhang portrait" onError={quietImageFallback} />
          <div className="polaroid-caption">
            <p>张馨文</p>
          </div>
        </article>

        <div className="side-photo side-photo-right">
          <Tape className="tape-tilt" />
          <img src={asset('portrait-temple.jpg')} alt="Xinwen Zhang in a temple courtyard" onError={quietImageFallback} />
        </div>

        <div className="tiny-cart" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>

      <div className="hero-copy hero-copy-left">
        <p>从用户问题出发，把研究洞察转成产品机制、可体验原型与可复盘的内容增长实验。</p>
      </div>

      <div className="hero-title">
        <h1>欢迎来到我的主页</h1>
        <p className="identity">AI内容产品 / 用户研究 / 原型验证 / AIGC工作流 / 内容运营</p>
        <a className="explore-button" href="#branches">
          <ArrowDown size={17} />
          先看产品案例
        </a>
      </div>

      <div className="hero-lines" aria-hidden="true">
        <span />
        <span />
      </div>
    </section>
  );
}

function RootsSection() {
  const [activeRoot, setActiveRoot] = useState('问题定义');

  return (
    <section className="section roots-section" id="roots">
      <div className="section-kicker">
        <Sprout size={18} />
        能力
      </div>
      <div className="split-layout">
        <div>
          <h2>方法与能力</h2>
          <p className="section-lead">我更擅长沿着“问题定义—用户洞察—机制设计—原型验证—复盘迭代”推进项目，同时用影像与AIGC提高表达和生产效率。</p>
        </div>
        <div className="root-map">
          {roots.map((root) => (
            <button
              key={root}
              className={activeRoot === root ? 'root-node active' : 'root-node'}
              type="button"
              onClick={() => setActiveRoot(root)}
            >
              {root}
            </button>
          ))}
          <div className="root-note">
            <span>{activeRoot}</span>
            <p>{rootDescriptions[activeRoot]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrunkSection() {
  return (
    <section className="section trunk-section" id="trunk">
      <div className="section-kicker">
        <TreePine size={18} />
        经历
      </div>
      <div className="split-layout trunk-grid">
        <div>
          <h2>个人经历</h2>
          <div className="profile-tags">
            <span>产品策略</span>
            <span>用户研究</span>
            <span>原型验证</span>
            <span>AI内容产品</span>
          </div>
        </div>
        <div className="rings-card" aria-label="个人经历时间线">
          {rings.map((ring, index) => (
            <article key={ring.year} className="ring-item" style={{ ['--ring-index' as string]: index }}>
              <div className="ring-year">{ring.year}</div>
              <div>
                <h3>{ring.title}</h3>
                <p>{ring.detail}</p>
                {ring.tags.length > 0 ? (
                  <div className="ring-tags">
                    {ring.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}
                <a
                  className="detail-link"
                  href={
                    ring.slug === 'ai-pet-internship'
                      ? 'https://irene0618.github.io/personal-website/#case-ai-pet-incubation'
                      : `#experience-${ring.slug}`
                  }
                >
                  查看经历详情 <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceDetailPage({ experience }: { experience: (typeof experienceDetails)[number] }) {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  return (
    <article className="experience-study">
      <a className="back-link" href="#trunk">
        返回个人经历
      </a>

      <section className="experience-hero">
        <div className="experience-hero-copy">
          <p className="eyebrow">{experience.type} / {experience.year}</p>
          <h1>{experience.title}</h1>
          <p>{experience.overview}</p>
          <div className="output-tags experience-tags">
            {experience.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        {experience.images.length > 0 ? (
          <figure className="experience-hero-image">
            <ZoomableImage
              src={experience.images[0].image}
              alt={experience.images[0].label}
              caption={experience.images[0].label}
              onOpen={setLightboxImage}
            />
            <figcaption>{experience.images[0].label}</figcaption>
          </figure>
        ) : (
          <div className="experience-archive-mark" aria-label="个人经历档案">
            <span>PERSONAL</span>
            <strong>经历档案</strong>
            <small>{experience.year}</small>
          </div>
        )}
      </section>

      {experience.slug === 'zuel-undergraduate' ? (
        <UndergraduateArchive />
      ) : (
        <>
          <section className="experience-section experience-two-column">
            <div>
              <p className="section-kicker">工作内容</p>
              <h2>主要投入</h2>
              <ul>
                {experience.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-kicker">阶段成果</p>
              <h2>实践沉淀</h2>
              <ul>
                {experience.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {experience.links.length > 0 ? (
            <section className="experience-section experience-links-section">
              <div>
                <p className="section-kicker">作品链接</p>
                <h2>打开查看成果</h2>
              </div>
              <div className="experience-link-list">
                {experience.links.map((link, index) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    <span className="experience-link-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="experience-link-copy">
                      <strong>{link.label}</strong>
                      <small>{link.platform} · {link.description}</small>
                    </span>
                    <ExternalLink size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          ) : (
            <section className="experience-section experience-links-section">
              <div>
                <p className="section-kicker">作品链接</p>
                <h2>经历持续展开</h2>
              </div>
              <p className="experience-empty-state">这一阶段的学习与实践成果已在本站的精选项目、视觉材料与后续经历中继续呈现。</p>
            </section>
          )}

          {experience.images.length > 1 ? (
            <section className="experience-section experience-gallery-section">
              <div>
                <p className="section-kicker">视觉材料</p>
                <h2>活动与作品展示</h2>
              </div>
              <div className="case-gallery-grid">
                {experience.images.slice(1).map((item) => (
                  <figure key={item.label}>
                    <ZoomableImage src={item.image} alt={item.label} caption={item.label} onOpen={setLightboxImage} />
                    <figcaption>{item.label}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
      {lightboxImage ? <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
    </article>
  );
}

function UndergraduateArchive() {
  return (
    <>
      <section className="experience-section undergraduate-overview-section">
        <div>
          <p className="section-kicker">本科档案</p>
          <h2>学科与成长</h2>
        </div>
        <div className="undergraduate-overview">
          <p>在动画与游戏设计本科阶段，我以三维动画、影像叙事与互动内容为专业底座，并持续将设计训练延展到内容运营、研究实践和社会服务之中。</p>
          <div className="undergraduate-stat-grid" aria-label="本科阶段关键数据">
            <article><strong>1 / 149</strong><span>专业排名</span></article>
            <article><strong>3.85 / 4.0</strong><span>GPA</span></article>
            <article><strong>2020—2024</strong><span>学习周期</span></article>
          </div>
          <div className="undergraduate-degree-list">
            <span>视觉传达设计（动画与游戏方向）</span>
            <span>三维影视特效技术学习经历</span>
          </div>
        </div>
      </section>

      <section className="experience-section undergraduate-video-section">
        <div>
          <p className="section-kicker">视频档案</p>
          <h2>个人展示</h2>
          <p className="undergraduate-section-note">从课程训练、项目创作到综合实践的阶段性作品回顾。</p>
        </div>
        <figure className="undergraduate-video-frame">
          <video controls preload="metadata" poster={undergraduateArchive.poster} aria-label="本科个人展示视频">
            <source src={undergraduateArchive.video} type="video/mp4" />
            当前浏览器不支持视频播放，请下载后查看。
          </video>
          <figcaption>个人展示视频｜网页优化版，点击播放</figcaption>
        </figure>
      </section>

      <section className="experience-section undergraduate-awards-section">
        <div>
          <p className="section-kicker">所获奖励</p>
          <h2>从成绩到赛场</h2>
        </div>
        <ol className="undergraduate-award-list">
          {undergraduateArchive.awards.map((award) => (
            <li key={`${award.year}-${award.title}`}>
              <time>{award.year}</time>
              <div>
                <strong>{award.title}</strong>
                <small>{award.issuer}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="experience-section undergraduate-research-section">
        <div>
          <p className="section-kicker">科研与发表</p>
          <h2>研究如何落地</h2>
        </div>
        <div className="undergraduate-research-content">
          <div className="undergraduate-publication-grid">
            {undergraduateArchive.publications.map((item) => (
              <article key={item.title}>
                <time>{item.date}</time>
                <strong>{item.title}</strong>
                <p>{item.meta}</p>
              </article>
            ))}
          </div>
          <ol className="undergraduate-project-list">
            {undergraduateArchive.research.map((item) => (
              <li key={item.title}>
                <time>{item.date}</time>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.role}</small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="experience-section undergraduate-practice-section">
        <div>
          <p className="section-kicker">实践与能力</p>
          <h2>把创作带入真实场景</h2>
        </div>
        <div className="undergraduate-practice-content">
          <div className="undergraduate-practice-grid">
            {undergraduateArchive.practice.map((item) => (
              <article key={item.title}>
                <time>{item.period}</time>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
            <article className="undergraduate-volunteer-card">
              <time>志愿服务</time>
              <strong>以艺术与行动连接社区</strong>
              <p>参与艺中南志愿队筹备、茶山刘红色精神宣讲、美丽校园创建、校运动会和迎新等志愿活动，关注社区艺术熏陶、青年成长与公共服务。</p>
            </article>
          </div>
          <div className="undergraduate-skill-groups">
            {undergraduateArchive.skills.map((group) => (
              <div key={group.label}>
                <span>{group.label}</span>
                <p>{group.values.join(' · ')}</p>
              </div>
            ))}
          </div>
          <div className="undergraduate-footnote">
            <span>其他荣誉</span>
            <p>{undergraduateArchive.additionalAwards.join(' · ')}</p>
            <small>长期坚持马拉松与长跑；日常以扫街和人像摄影记录生活。</small>
          </div>
        </div>
      </section>
    </>
  );
}

function BranchesSection() {
  const priorityProjects = priorityProjectSlugs
    .map((slug) => featuredProjects.find((project) => project.slug === slug))
    .filter((project): project is (typeof featuredProjects)[number] => Boolean(project));
  const supportingProjects = featuredProjects.filter((project) => !priorityProjectSlugs.includes(project.slug));

  const renderProjectCard = (project: (typeof featuredProjects)[number], variant = 'primary') => {
    const Icon = project.icon;
    const isProductLead = ['ai-pet-incubation', 'anti-drug-interactive-film', 'game-design-lab'].includes(project.slug);
    const isGameLab = project.slug === 'game-design-lab';
    const hasDesignedCover = ['anti-drug-interactive-film', 'game-design-lab'].includes(project.slug);

    return (
      <article className={`project-card portfolio-card ${variant === 'supporting' ? 'supporting-card' : ''} ${isProductLead ? 'product-lead-card' : ''} ${isGameLab ? 'lab-feature-card' : ''} ${hasDesignedCover ? 'designed-cover-card' : ''}`} key={project.name}>
        <div className="project-image">
          <img src={project.image} alt={`${project.cn} cover`} onError={quietImageFallback} />
          <span>{project.type}</span>
        </div>
        <div className="project-body">
          <div className="project-meta">
            <div className="project-icon">
              <Icon size={18} />
            </div>
            <span>{project.stage}</span>
          </div>
          <h3>{project.name}</h3>
          <p className="project-cn">{project.cn}</p>
          <p>{project.summary}</p>
          <div className="output-tags">
            {project.outputs.map((output) => (
              <span key={output}>{output}</span>
            ))}
          </div>
          <a className="case-link" href={`#case-${project.slug}`}>
            查看项目详情
          </a>
        </div>
      </article>
    );
  };

  return (
    <section className="section branches-section" id="branches">
      <div className="section-kicker">
        <Leaf size={18} />
        精选项目
      </div>
      <div className="project-grid portfolio-grid">
        {priorityProjects.map((project) => renderProjectCard(project))}
      </div>
      <div className="supporting-heading">
        <h3>更多补充项目</h3>
        <p>这里放一些能够补充能力广度的项目，方便继续展开查看。</p>
      </div>
      <div className="project-grid supporting-grid">
        {supportingProjects.map((project) => renderProjectCard(project, 'supporting'))}
      </div>
    </section>
  );
}

function CaseStudyPage({ study }: { study: (typeof caseStudies)[number] }) {
  const project = featuredProjects.find((item) => item.slug === study.slug);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  if (study.slug === 'ai-pet-incubation') {
    const episodeStills = [
      { src: asset('ai-pet-case/stills/hotpot.webp'), caption: '雨天火锅', note: '电视端日更内容', size: 'wide' },
      { src: asset('ai-pet-case/stills/kitchen-garlic.webp'), caption: '厨房备菜', note: '画面右下角接入互动二维码', size: 'standard' },
      { src: asset('ai-pet-case/stills/kitchen-pour.webp'), caption: '开始和面', note: '围绕做菜展开的生活片段', size: 'standard' },
      { src: asset('ai-pet-case/stills/seaside-grill.webp'), caption: '海边烧烤', note: '从室内延伸到户外场景', size: 'wide' },
      { src: asset('ai-pet-case/stills/desk-snack.webp'), caption: '书桌边偷吃零食', note: '做饭之外的轻日常', size: 'standard' },
      { src: asset('ai-pet-case/stills/lychee-milk.webp'), caption: '荔枝牛奶', note: '用户也会留言点下一期想看的菜', size: 'standard' },
      { src: asset('ai-pet-case/stills/seaside-window.webp'), caption: '海边发呆', note: '治愈向情绪画面', size: 'standard' },
      { src: asset('ai-pet-case/stills/kitchen-beef.webp'), caption: '今天做什么', note: '保持小龙在不同场景里的形象一致', size: 'standard' },
    ];

    return (
      <article className="case-study pet-case pet-case-v2">
        <a className="back-link pet-v2-back" href="#branches">
          返回精选项目
        </a>

        <header className="pet-v2-hero">
          <div className="pet-v2-title-block">
            <p>2026.06—2026.08　产品策划 / 用户反馈分析 / AIGC影像 / 电视端与短视频平台运营</p>
            <h1>AIGC萌宠IP的产品策划与跨平台运营</h1>
          </div>

          <figure className="pet-v2-hero-still">
            <ZoomableImage
              src={asset('ai-pet-case/stills/hero-river.webp')}
              alt="小龙吨吨在溪边准备粽叶的画面"
              caption="小龙吨吨电视端内容画面"
              onOpen={setLightboxImage}
            />
          </figure>
        </header>

        <section className="pet-v2-work">
          <div className="pet-v2-section-title">
            <h2>我的工作内容：</h2>
          </div>
          <div className="pet-v2-work-copy">
            <p><strong>AIGC内容生产。</strong>我参与脚本、分镜、生成、筛选和剪辑。日更要求小龙吨吨在不同食物、动作和场景中保持稳定，同时保证每一集按计划交付。生产过程会重点检查角色一致性、镜头稳定性和叙事完整性。</p>
            <p><strong>用户反馈分析。</strong>内容上线后，我会结合点击表现和二维码留言观察用户的反应。“可爱”反映角色好感，“孩子喜欢看”指向家庭共看，“下一期想看它做……”则提供了明确的选题方向。这些信号会被整理后带入下一轮内容。</p>
            <p><strong>短视频平台运营。</strong>我对萌宠陪伴、环境感官、烟火日常、人文艺术，以及虚拟IP、萌宠短剧和AI环境治愈等内容进行分类调研。结合小龙吨吨已有角色资产，形成“吨吨旅行”核心栏目、视听规则与分阶段更新节奏，并参与AIGC竖屏短视频制作，相关内容现已发布。</p>
          </div>
        </section>

        <section className="pet-v2-gallery" aria-labelledby="pet-gallery-title">
          <div className="pet-v2-gallery-heading">
            <div>
              <h2 id="pet-gallery-title">内容画面</h2>
            </div>
          </div>
          <div className="pet-v2-still-grid">
            {episodeStills.map((item) => (
              <figure className={`pet-v2-still is-${item.size}`} key={item.caption}>
                <ZoomableImage
                  src={item.src}
                  alt={`小龙吨吨内容画面：${item.caption}`}
                  caption={item.caption}
                  onOpen={setLightboxImage}
                />
                <figcaption><strong>{item.caption}</strong><span>{item.note}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="pet-v2-feedback">
          <div className="pet-v2-section-title">
            <h2>用户反馈：</h2>
          </div>
          <div className="pet-v2-feedback-list">
            <p><strong>“吨吨很可爱”</strong><span>角色开始被记住，视觉与性格不再只是画面设定</span></p>
            <p><strong>“家里的孩子喜欢看”</strong><span>家庭共看已经出现在真实的观看场景中</span></p>
            <p><strong>“下一期想看它做……”</strong><span>留言从情绪表达变成了选题输入，也意味着追更期待</span></p>
            <small>这些是定性信号，不代表大规模用户结论。点击数据按保密要求不在公开作品集中展示。</small>
          </div>
        </section>

        <section className="pet-v2-douyin">
          <div className="pet-v2-section-title">
            <h2>短视频平台运营：</h2>
            <p>调研覆盖传统治愈内容与AI治愈内容。结合小龙吨吨已有角色资产，核心栏目确定为“吨吨旅行”，用美景与小情节传递轻松、治愈的情绪。</p>
          </div>
          <div className="pet-v2-research-notes">
            <article><span>01</span><h3>用户与内容定位</h3><p>面向16—35岁的学生和上班族，关注焦虑、疲惫与精神紧绷等日常状态。小龙吨吨通过性格、动作和表情建立辨识度，为用户提供轻量的情绪放松。</p></article>
            <article><span>02</span><h3>核心栏目</h3><p>“吨吨旅行”以15—30秒内容为主，用美景和小情节组织单集。选题从民族、国家、节日与职业延伸到城市、季节、植物、天气、光线和奇幻场景。</p></article>
            <article><span>03</span><h3>视听规则</h3><p>画面强调真实质感、破次元构图与多样化布景。声音以轻音乐、环境白噪音和细节音效为主，旁白只在内容需要时出现。</p></article>
            <article><span>04</span><h3>更新节奏</h3><p>内容验证期计划持续1—2个月，以20—30秒内容日更或隔日更新，重点观察画面吸引力与完播表现。进入用户认知期后加入节日、人文等专题，并尝试30—60秒内容。商业化启动后再规划长短视频组合与细分账号。</p></article>
          </div>
        </section>

        <aside className="pet-v2-demo-note">
          <strong>大屏互动Demo的当前进展</strong>
          <p>项目还探索过喂养、陪玩、陪看和治愈屏保等方向，目前完成的内容仅为概念Demo，还没有正式上线。这些方案用于探索IP从内容观看走向长期陪伴的可能性，不计入已完成的业务成果。</p>
        </aside>

        <footer className="pet-v2-footer">
          <span>页面图片来自项目内容画面</span>
          <span>品牌合作信息与具体业务数据已做保密处理</span>
        </footer>

        {lightboxImage ? <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
      </article>
    );
  }

  if (study.slug === 'game-design-lab') {
    const learningLoop = [
      { title: '记录', body: '先保存截图、录像时间点和当时的问题。' },
      { title: '拆解', body: '补全现象、规则、玩家行为和体验结果。' },
      { title: '评审', body: '把反馈落到证据、机制、应用或表达。' },
      { title: '提炼', body: '把稳定结论保存成带出处的机制卡。' },
      { title: '复用', body: '写清项目、负责人和准备验证的假设。' },
      { title: '回写', body: '记录样本、结果和下一步决定。' },
    ];

    const gamePatterns = [
      {
        game: '《燕云十六声》',
        source: '多种武学来源与自由组合',
        product: '我把能力来源分成课程、案例借鉴和自己动手做三类。即使换了学习方向，以前做过的内容也不会清零。',
      },
      {
        game: '《文明 VI》',
        source: '双树研究、实践触发与邻接关系',
        product: '我把通用方法和策划专业课分成两棵树；关系图用来提醒一条结论还缺哪份证据、哪次测试。',
      },
      {
        game: '《双影奇境》',
        source: '信息互补、职责分工与同步反馈',
        product: '找搭子时，页面会说清两个人各自能帮什么。互评也会提前分工，最后一起确认下一步改什么。',
      },
    ];

    return (
      <article className="case-study game-lab-case">
        <a className="back-link game-lab-back" href="#branches">
          返回精选项目
        </a>

        <header className="game-lab-hero">
          <div className="game-lab-hero-copy">
            <p className="game-lab-overline">2026.08　产品策划 / 信息架构 / 交互原型</p>
            <h1><span>策研工坊</span>游戏策划研学平台</h1>
            <p className="game-lab-thesis">我做这个平台，是想让玩游戏时记下的截图和想法，在写完一次作业后还能继续用。用户可以在这里学方法、写拆解、找人互评，再把结论拿到项目里试一试。</p>
            <dl className="game-lab-meta">
              <div><dt>给谁用</dt><dd>正在学习游戏策划、需要整理作品和反馈的人</dd></div>
              <div><dt>我做了什么</dt><dd>46页产品方案、3篇游戏拆解、高保真交互Demo</dd></div>
              <div><dt>做到哪一步</dt><dd>七个核心模块与主要操作状态已完成，还没有找真实用户试用</dd></div>
            </dl>
            <a className="game-lab-demo-link" href="https://irene0618.github.io/game-design-lab/" target="_blank" rel="noreferrer">
              打开Demo看看 <ExternalLink size={16} />
            </a>
          </div>
          <figure className="game-lab-hero-visual">
            <ZoomableImage
              src={asset('game-lab-case/01-learning-home-archive-4k.jpg')}
              alt="策研工坊学习首页"
              caption="策研工坊学习首页"
              onOpen={setLightboxImage}
            />
            <figcaption><strong>学习首页</strong><span>课程、案例、任务和个人产出汇总在同一入口</span></figcaption>
          </figure>
        </header>

        <section className="game-lab-problem">
          <div className="game-lab-section-heading">
            <span>为什么做</span>
            <h2>明明做过很多，<br />下次还是得重来。</h2>
            <p>看课、截图、写报告、找同学点评，这些事情大家都做过。麻烦在于，内容散在不同地方，下次写方案时还是要重新翻一遍。</p>
          </div>
          <div className="game-lab-breakpoints">
            <article><strong>课程看完了</strong><p>平台只留下观看进度，看不出后来做过什么练习。</p></article>
            <article><strong>截图存了很多</strong><p>回头写报告时，已经记不清发生条件和当时的判断。</p></article>
            <article><strong>长文写完了</strong><p>真正有用的机制结论埋在正文里，下一次还要重新找。</p></article>
            <article><strong>同学也评了</strong><p>反馈停在“写得不错”，没有告诉作者具体改哪里。</p></article>
          </div>
        </section>

        <section className="game-lab-loop-section">
          <div className="game-lab-section-heading">
            <span>我怎么处理</span>
            <h2>我把这些步骤<br />接在了一起。</h2>
            <p>先记下游玩现场，再整理成策划案；同学的意见直接回到文档里；比较稳定的结论可以存成机制卡，拿去做测试后再把结果补回来。</p>
          </div>
          <ol className="game-lab-loop">
            {learningLoop.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
          <figure className="game-lab-record-shot">
            <ZoomableImage
              src={asset('game-lab-case/02-asset-library.png')}
              alt="研学资产库中的体验记录"
              caption="体验记录：先保存游玩现场，再整理成文档"
              onOpen={setLightboxImage}
            />
            <figcaption>游玩现场只要求写清条件、现象、来源和问题，完整分析可以晚一点再做。</figcaption>
          </figure>
        </section>

        <section className="game-lab-patterns">
          <div className="game-lab-section-heading">
            <span>我参考了什么</span>
            <h2>三款游戏，帮我想清了三件事。</h2>
          </div>
          <div className="game-lab-pattern-list">
            {gamePatterns.map((item) => (
              <article key={item.game}>
                <h3>{item.game}</h3>
                <p className="game-lab-pattern-source">{item.source}</p>
                <p>{item.product}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="game-lab-modules">
          <div className="game-lab-section-heading game-lab-modules-heading">
            <span>做出来的部分</span>
            <h2>最后，我重点做了三个工具。</h2>
          </div>

          <article className="game-lab-module is-editor">
            <div className="game-lab-module-copy">
              <span>研学工作台</span>
              <h3>写策划案时，不用在截图、文档和聊天记录之间来回找</h3>
              <p>工作台看起来还是熟悉的图文编辑器，但截图、表格、流程、原型链接、批注和版本都放在一起。写完可以检查哪里还缺材料，也可以直接交给同学评审。</p>
              <ul>
                <li>10类可拖拽内容组件</li>
                <li>模块批注、版本保存与差异恢复</li>
                <li>Markdown、JSON、CSV与项目包导出</li>
              </ul>
            </div>
            <figure>
              <ZoomableImage
                src={asset('game-lab-case/04-editor.png')}
                alt="策研工坊组件化策划案编辑器"
                caption="组件化策划案编辑器"
                onOpen={setLightboxImage}
              />
              <figcaption>编辑器同时显示文档、组件、素材、批注和版本记录。</figcaption>
            </figure>
          </article>

          <article className="game-lab-module is-assets">
            <div className="game-lab-module-copy">
              <span>机制卡与关系图</span>
              <h3>一篇长文里有用的结论，怎么留到以后再用？</h3>
              <p>我设计了“机制卡”：把结论连同原文、证据、适用条件一起保存。以后把它放进项目时，再写清负责人、准备怎么试。关系图只负责提醒哪里还缺材料，结论靠不靠谱仍然要自己判断。</p>
            </div>
            <div className="game-lab-paired-shots">
              <figure>
                <ZoomableImage
                  src={asset('game-lab-case/06-mechanism-cards.png')}
                  alt="机制卡库"
                  caption="机制卡库"
                  onOpen={setLightboxImage}
                />
                <figcaption>机制卡库</figcaption>
              </figure>
              <figure>
                <ZoomableImage
                  src={asset('game-lab-case/07-relationship-graph.png')}
                  alt="资产关系图"
                  caption="资产关系图"
                  onOpen={setLightboxImage}
                />
                <figcaption>关系图标记待补的项目验证与结果</figcaption>
              </figure>
            </div>
          </article>

          <article className="game-lab-module is-partner">
            <div className="game-lab-module-copy">
              <span>研学搭子</span>
              <h3>互评不能只留一句“写得不错”</h3>
              <p>找搭子时，页面会说明“对方能帮我什么”和“我能帮对方什么”。用户可以拒绝推荐、邀请熟悉的同学，也可以随时退出。</p>
              <p>开始互评前，两个人先分好谁看证据、谁看机制、谁看表达。反馈要写到具体位置，并一起确认接下来改什么。</p>
            </div>
            <figure>
              <ZoomableImage
                src={asset('game-lab-case/05-study-partner.png')}
                alt="研学搭子能力互补推荐页面"
                caption="研学搭子：能力依据与双向互补理由"
                onOpen={setLightboxImage}
              />
              <figcaption>能力画像允许查看依据，只用于学习建议和搭子推荐。</figcaption>
            </figure>
          </article>
        </section>

        <section className="game-lab-validation">
          <div className="game-lab-section-heading">
            <span>怎么验证</span>
            <h2>Demo能跑，效果还得找人试。</h2>
            <p>现在可以完整操作主要流程，但我还没有真实的学习效果数据。下一步，我想找一个有固定课程作业的小班，用四周时间跑一遍。</p>
          </div>
          <div className="game-lab-metric">
            <span>我最想看的数字</span>
            <strong>每周新增多少份“有证据、经过一次有效反馈，并进入下一项学习或项目动作”的研学资产？</strong>
          </div>
          <ol className="game-lab-pilot">
            <li><span>第1周</span><p>记录体验，完成一页短拆解。</p></li>
            <li><span>第2周</span><p>进行搭子互评，观察意见是否带来修改。</p></li>
            <li><span>第3周</span><p>提炼机制卡，检查来源与边界是否完整。</p></li>
            <li><span>第4周</span><p>选一条结论做纸面原型或小规模测试并回写。</p></li>
          </ol>
        </section>

        <section className="game-lab-boundary">
          <div>
            <span>现在已经有</span>
            <h3>高保真可交互Demo</h3>
            <p>七个核心模块、主要操作状态、离线项目包、桌面端与390×844移动端适配。</p>
          </div>
          <div>
            <span>现在还没有</span>
            <h3>真实用户和线上协作</h3>
            <p>账号、班级、云端权限、实时协作、推荐模型，以及学习和反馈效果。</p>
          </div>
        </section>

        <footer className="game-lab-footer">
          <div>
            <strong>策研工坊 · Game Design Lab</strong>
            <span>产品方案、三篇游戏拆解和网页Demo都是我独立完成的。</span>
          </div>
          <a href="https://irene0618.github.io/game-design-lab/" target="_blank" rel="noreferrer">
            打开Demo <ExternalLink size={15} />
          </a>
        </footer>

        {lightboxImage ? <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
      </article>
    );
  }

  if (study.slug === 'qin-yun') {
    const researchStats = [
      { value: '36', label: '份有效问卷', note: '探索性用户研究' },
      { value: '69.4%', label: '高度关注健康', note: '“关注”与“很关注”合计' },
      { value: '66.7%', label: '现有疗愈效果不明显', note: '用户提及最多的问题' },
      { value: '3.83/5', label: '概念兴趣度', note: '五音疗愈产品平均分' },
    ];
    const painPoints = [
      { label: '疗愈效果不明显', value: '66.7%', width: '66.7%' },
      { label: '功能单一、缺少个性化', value: '55.6%', width: '55.6%' },
      { label: '内容零散、不成体系', value: '52.8%', width: '52.8%' },
      { label: '操作复杂、使用不便', value: '27.8%', width: '27.8%' },
    ];
    const marketSignals = [
      { title: '需求增长', body: '压力管理、助眠与情绪调节已成为年轻人主动搜索与消费的日常议题；但“疗愈”不应被包装成医疗承诺。' },
      { title: '供给分散', body: '线下音疗、冥想 App、白噪音内容与国风文创各自独立，用户需要在多个入口之间自行拼接体验。' },
      { title: '文化机会', body: '五音拥有鲜明的东方文化记忆，但真正的机会不在复述术语，而在把它转换成可被感知的声音、场景与仪式。' },
    ];
    const consumerSegments = [
      { label: '高压学生', scene: '晚间复习、作业截止前、宿舍独处', need: '快速安静下来，不想研究复杂理论', design: '一键进入 10–20 分钟放松；用压力/专注等日常语言引导' },
      { label: '年轻白领', scene: '通勤后、睡前、居家办公间隙', need: '将工作状态切换为休息状态', design: '预设晚间与专注场景；用设备与灯光建立“下班仪式”' },
      { label: '文化兴趣者', scene: '家居陈设、独处阅读、送礼', need: '希望体验有美感、有出处的东方内容', design: '保留轻量五音说明与可探索内容，不把知识学习前置' },
    ];
    const needTranslations = [
      { need: '“我现在很累，不知道从哪里开始”', insight: '首要障碍是启动，而非内容数量', response: '状态选择 + 默认方案', detail: '用“舒缓压力 / 准备入睡 / 恢复专注”代替五音术语，并提供单一推荐。' },
      { need: '“推荐要适合我，也要告诉我为什么”', insight: '用户需要掌控感与安全感', response: '可解释的内容卡', detail: '明确呈现目标、时长、音色与推荐原因；允许换一首或调整时长。' },
      { need: '“感觉有没有变好，我想知道”', insight: '主观体验需要被温和地看见', response: '播放后轻反馈', detail: '用心情、放松感和匹配度复盘，不把主观变化伪装成健康监测数据。' },
      { need: '“传统文化别太有距离感”', insight: '文化兴趣建立在易理解之上', response: '后置的五音故事', detail: '先完成体验，再在结果页展开宫、商、角等相关文化说明。' },
    ];
    const loopSteps = [
      { index: '01', title: '状态选择', body: '以压力、睡眠和使用场景替代医学诊断，降低进入门槛。' },
      { index: '02', title: '内容推荐', body: '把角、徵、宫、商、羽转译为目标、时长和氛围标签。' },
      { index: '03', title: '音箱播放', body: 'App 控制古琴灯具音箱，以声音与环境光营造专注的放松时段。' },
      { index: '04', title: '主观反馈', body: '疗愈后记录感受与推荐匹配度，不虚构生理监测结论。' },
      { index: '05', title: '形成记录', body: '沉淀个人偏好和使用历史，为下一次推荐提供依据。' },
    ];

    return (
      <article className="case-study qin-case">
        <a className="back-link qin-back-link" href="#branches">
          返回精选项目
        </a>

        <nav className="qin-case-rail" aria-label="琴韵案例目录">
          <span>琴韵 / CASE 01</span>
          {[
            ['qin-problem', '问题'],
            ['qin-research', '研究'],
            ['qin-strategy', '策略'],
            ['qin-solution', '方案'],
            ['qin-validation', '验证'],
          ].map(([target, label]) => (
            <button
              type="button"
              key={target}
              onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {label}
            </button>
          ))}
        </nav>

        <header className="qin-hero">
          <div className="qin-hero-copy">
            <p className="qin-overline">PRODUCT EXPERIENCE · COURSE TEAM PROJECT · 2025</p>
            <h1>琴韵</h1>
            <p className="qin-hero-cn">五音疗愈音箱与配套应用程序</p>
            <p className="qin-thesis">
              面向日常放松与休息场景，提供<span>五音音乐的播放、选择与记录</span>。
            </p>
            <div className="qin-meta">
              <div><small>项目定位</small><strong>文化疗愈 × 软硬件体验</strong></div>
              <div><small>核心人群</small><strong>高压学生与年轻白领</strong></div>
              <div><small>我的工作</small><strong>研究、产品结构、关键界面与品牌验证</strong></div>
            </div>
            <p className="qin-disclaimer">
              概念型课程项目，用于日常放松与自我觉察，不替代医学诊断或治疗。
            </p>
          </div>
          <figure className="qin-hero-visual">
            <ZoomableImage
              src={asset('qinyun-case/qinyun-00-cover.jpg')}
              alt="琴韵中式五音疗愈品牌主视觉与古琴灯具音箱"
              caption="琴韵品牌主视觉"
              onOpen={setLightboxImage}
            />
            <figcaption>
              <span>CHINESE FIVE-TONE HEALING BRAND</span>
              <strong>古琴灯具音箱 × 五音疗愈体验</strong>
            </figcaption>
            <a className="qin-film-link" href="https://www.xinpianchang.com/a13743958?from=webShare&channel=copyLink&token=1tb9i24rZGcYC7Myzd3SgX" target="_blank" rel="noreferrer">
              <span className="qin-film-link-play" aria-hidden="true">▶</span>
              <span className="qin-film-link-copy"><small>PROJECT FILM</small><strong>观看《琴韵》宣传片</strong></span>
              <span className="qin-film-link-arrow" aria-hidden="true">↗</span>
            </a>
          </figure>
        </header>

        <section className="qin-chapter" id="qin-problem">
          <div className="qin-chapter-index">
            <span>01</span>
            <p>PROBLEM<br />FRAMING</p>
          </div>
          <div className="qin-chapter-body">
            <p className="qin-kicker">问题定义</p>
            <h2>现有音乐疗愈产品的<br /><span>理解、选择与持续使用障碍</span></h2>
            <div className="qin-problem-grid">
              <article>
                <small>理解障碍</small>
                <h3>五音理论过于抽象</h3>
                <p>角、徵、宫、商、羽及五行五脏关系具有文化门槛，用户难以判断“此刻该听什么”。</p>
              </article>
              <article>
                <small>选择障碍</small>
                <h3>内容很多，目标不清</h3>
                <p>助眠 App、视频和自然声内容分散，缺少围绕压力、睡眠与场景组织的连续体验。</p>
              </article>
              <article>
                <small>信任障碍</small>
                <h3>效果难被感知</h3>
                <p>用户更关心是否适合自己、为何推荐以及使用后有何变化，而非功能数量。</p>
              </article>
            </div>
            <blockquote>
              设计目标：在保留五音文化特征的前提下，降低首次使用门槛，并支持用户在居家场景中持续使用。
            </blockquote>
          </div>
        </section>

        <section className="qin-chapter" id="qin-research">
          <div className="qin-chapter-index">
            <span>02</span>
            <p>RESEARCH<br />EVIDENCE</p>
          </div>
          <div className="qin-chapter-body">
            <div className="qin-heading-row">
              <div>
                <p className="qin-kicker">用户研究</p>
                <h2>用户调研：<br /><span>使用场景与核心诉求</span></h2>
              </div>
              <p className="qin-method">
                通过 36 份有效问卷梳理健康关注、既有体验、功能期待与品牌态度；样本中学生占 72.2%、20–24 岁占
                72.2%，因此结论用于发现机会，不代表总体市场。
              </p>
            </div>
            <div className="qin-stat-grid">
              {researchStats.map((stat) => (
                <article key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.note}</small>
                </article>
              ))}
            </div>
            <div className="qin-market-section">
              <div className="qin-section-intro">
                <p className="qin-kicker">市场调研</p>
                <h3>市场分析结论：<br /><strong>居家疗愈体验仍有整合空间</strong></h3>
                <p>从品类形态、使用场景与文化表达三个维度梳理市场：现有产品要么偏线下服务、要么偏单点数字内容，缺少兼顾空间氛围、内容选择与轻量复盘的在家体验。</p>
              </div>
              <div className="qin-market-signal-grid">
                {marketSignals.map((item, index) => (
                  <article key={item.title}>
                    <span>0{index + 1}</span>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="qin-research-grid">
              <figure className="qin-evidence-image">
                <ZoomableImage
                  src={asset('qinyun-case/qinyun-05-research-summary.jpg')}
                  alt="琴韵消费者调研总结"
                  caption="调研证据与设计转化"
                  onOpen={setLightboxImage}
                />
                <figcaption>原始调研汇总 · 点击查看大图</figcaption>
              </figure>
              <div className="qin-pain-list">
                <p className="qin-kicker">现有体验的主要断点</p>
                {painPoints.map((point) => (
                  <div className="qin-pain-item" key={point.label}>
                    <div><span>{point.label}</span><strong>{point.value}</strong></div>
                    <i><b style={{ width: point.width }} /></i>
                  </div>
                ))}
                <p className="qin-finding">
                  75% 的受访者把“缓解压力与焦虑”列为首要目标；睡眠改善居第二。由此将产品主任务明确为
                  <strong>情绪放松</strong>，睡眠作为高频次级场景。
                </p>
              </div>
            </div>
            <div className="qin-consumer-section">
              <div className="qin-section-intro">
                <p className="qin-kicker">消费者调研</p>
                <h3>目标用户的<br /><strong>典型情境与需求差异</strong></h3>
              </div>
              <div className="qin-consumer-table qin-table-wrap">
                <table>
                  <thead><tr><th>人群</th><th>典型情境</th><th>真实期待</th><th>设计回应</th></tr></thead>
                  <tbody>
                    {consumerSegments.map((segment) => (
                      <tr key={segment.label}><th>{segment.label}</th><td>{segment.scene}</td><td>{segment.need}</td><td>{segment.design}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="qin-chapter" id="qin-strategy">
          <div className="qin-chapter-index">
            <span>03</span>
            <p>PRODUCT<br />STRATEGY</p>
          </div>
          <div className="qin-chapter-body">
            <p className="qin-kicker">设计策略</p>
            <h2>设计重点：降低首次使用门槛，<br />建立<span>清晰的内容选择与反馈机制</span></h2>
            <div className="qin-principles">
              <article>
                <b>01</b>
                <h3>场景先于理论</h3>
                <p>先问“现在想放松、助眠还是恢复专注”，再解释对应的五音文化，不让用户先学习再使用。</p>
              </article>
              <article>
                <b>02</b>
                <h3>推荐必须可解释</h3>
                <p>每条推荐说明目标、时长、音色与选择原因，让“智能推荐”不成为黑箱。</p>
              </article>
              <article>
                <b>03</b>
                <h3>反馈保持诚实</h3>
                <p>以主观感受、完成情况和偏好记录形成闭环，不把概念产品包装成医疗设备。</p>
              </article>
            </div>
            <div className="qin-translation-section">
              <div className="qin-section-intro">
                <p className="qin-kicker">用户需求 → 设计转化</p>
                <h3>将用户需求对应到<br /><strong>具体的功能与内容设计</strong></h3>
              </div>
              <div className="qin-translation-list">
                {needTranslations.map((item, index) => (
                  <article key={item.need}>
                    <span>0{index + 1}</span>
                    <div><small>用户原话 / 需求</small><h4>{item.need}</h4></div>
                    <div><small>洞察</small><p>{item.insight}</p></div>
                    <div><small>设计策略</small><strong>{item.response}</strong><p>{item.detail}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="qin-competitor-block">
              <div>
                <p className="qin-kicker">竞品分析</p>
                <h3>以居家使用场景补充线下音疗与课程服务</h3>
              </div>
              <div className="qin-table-wrap">
                <table>
                  <thead>
                    <tr><th>维度</th><th>梵登音疗</th><th>BonBon</th><th>琴韵机会</th></tr>
                  </thead>
                  <tbody>
                    <tr><th>核心形态</th><td>音疗空间与课程</td><td>儿童艺术疗愈课程</td><td>居家音箱 + App</td></tr>
                    <tr><th>主要场景</th><td>线下体验</td><td>机构 / 公益活动</td><td>每日短时放松</td></tr>
                    <tr><th>文化内容</th><td>声音疗愈</td><td>音乐艺术疗愈</td><td>五音文化的场景化转译</td></tr>
                    <tr><th>持续反馈</th><td>课程服务为主</td><td>课程服务为主</td><td>记录、偏好与复用路径</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="qin-chapter" id="qin-solution">
          <div className="qin-chapter-index">
            <span>04</span>
            <p>CORE<br />EXPERIENCE</p>
          </div>
          <div className="qin-chapter-body">
            <p className="qin-kicker">核心体验流程</p>
            <h2>从状态选择、内容推荐到<br /><span>体验反馈与使用记录</span></h2>
            <div className="qin-loop" aria-label="琴韵核心体验闭环">
              {loopSteps.map((step) => (
                <article key={step.index}>
                  <span>{step.index}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="qin-system-grid">
              <figure>
                <ZoomableImage
                  src={asset('qinyun-case/qinyun-15-journey.jpg')}
                  alt="琴韵用户旅程图"
                  caption="状态选择到疗愈记录的用户旅程"
                  onOpen={setLightboxImage}
                />
                <figcaption>用户旅程 · 从需求到机会点</figcaption>
              </figure>
              <figure>
                <ZoomableImage
                  src={asset('qinyun-case/qinyun-16-ui-flow.jpg')}
                  alt="琴韵 App 关键页面与流程"
                  caption="琴韵 App 核心页面流程"
                  onOpen={setLightboxImage}
                />
                <figcaption>核心流程 · 配对、推荐、播放、记录</figcaption>
              </figure>
            </div>
            <div className="qin-product-roles">
              <article>
                <small>HARDWARE</small>
                <h3>古琴灯具音箱</h3>
                <p>承担声音播放、环境光和家居陪伴。造型以“九霄环佩”、木质框架与白玉兰为灵感，弱化器械感。</p>
              </article>
              <article>
                <small>APP</small>
                <h3>选择与复盘中心</h3>
                <p>承担状态选择、推荐解释、播放控制与历史记录；将复杂理论压缩为清晰的日常行动。</p>
              </article>
              <article>
                <small>CONTENT</small>
                <h3>五音内容系统</h3>
                <p>用目标、场景、时长、音色与文化说明组织内容，兼顾可用性和文化辨识度。</p>
              </article>
            </div>
            <figure className="qin-wide-product">
              <ZoomableImage
                src={asset('qinyun-case/qinyun-17-product-detail.jpg')}
                alt="琴韵古琴灯具音箱产品细节"
                caption="古琴灯具音箱概念设计"
                onOpen={setLightboxImage}
              />
              <figcaption>
                <span>55 CM / DESKTOP AMBIENT SPEAKER</span>
                <strong>硬件负责营造环境，App 负责降低选择成本</strong>
              </figcaption>
            </figure>
            <div className="qin-scope">
              <div><small>MVP · 本轮聚焦</small><p>设备配对、状态选择、内容推荐、播放控制、主观反馈、历史记录</p></div>
              <div><small>NEXT · 下一轮</small><p>主题计划、提醒机制、更细的推荐解释、7 天体验日记</p></div>
              <div><small>LATER · 暂缓</small><p>社区、商城、品牌周边与穿戴设备深度联动</p></div>
            </div>
          </div>
        </section>

        <section className="qin-chapter" id="qin-validation">
          <div className="qin-chapter-index">
            <span>05</span>
            <p>VALIDATION<br />& NEXT</p>
          </div>
          <div className="qin-chapter-body">
            <div className="qin-heading-row">
              <div>
                <p className="qin-kicker">已完成的验证</p>
                <h2>基于 10 名潜在用户的<br /><span>品牌方案测试</span></h2>
              </div>
              <p className="qin-method">
                对 3 个 Logo、2 个名称与 2 条 Slogan 进行 1–10 分评分和关键词访谈。Logo 3 得分 7.4、名称“琴韵”得分
                7.3、Slogan“五音共鸣，焕活心灵”得分 7.1，均为各组最高。
              </p>
            </div>
            <div className="qin-validation-grid">
              <figure>
                <ZoomableImage
                  src={asset('qinyun-case/qinyun-11-test-result.jpg')}
                  alt="琴韵品牌原型测试结果"
                  caption="10 名潜在用户的品牌原型测试"
                  onOpen={setLightboxImage}
                />
                <figcaption>测试结果与用户联想关键词</figcaption>
              </figure>
              <div className="qin-decision-list">
                <article><span>LOGO</span><strong>选择镜像对称的“琴”字形</strong><p>关键词集中在传统、柔和、对称、简洁与易记。</p></article>
                <article><span>NAME</span><strong>采用“琴韵”</strong><p>比“五音清心阁”更短、更年轻，也更便于产品化延展。</p></article>
                <article><span>SLOGAN</span><strong>统一为“五音共鸣，焕活心灵”</strong><p>保留测试胜出的表达，解决原稿中最终口号与测试结果不一致的问题。</p></article>
              </div>
            </div>
            <div className="qin-validation-gap">
              <div>
                <p className="qin-kicker">尚未完成的验证</p>
                <h3>下一阶段：验证关键任务的可用性与持续使用意愿</h3>
                <p>本轮验证覆盖了视觉与命名，但尚未验证设备配对、推荐理解和持续使用。因此不把概念展示写成已上线成果。</p>
              </div>
              <ol>
                <li><span>01</span><p><strong>任务型可用性测试</strong>6–8 人完成配对、首次推荐与首次播放，记录完成率、用时、错误和 SEQ。</p></li>
                <li><span>02</span><p><strong>7 天日记研究</strong>记录疗愈前后主观压力、内容匹配度、完成率与重复使用原因。</p></li>
                <li><span>03</span><p><strong>解释方式 A/B</strong>比较“先讲五音理论”和“先选场景”两种引导对首次播放率的影响。</p></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="qin-chapter qin-conclusion">
          <div className="qin-chapter-index">
            <span>06</span>
            <p>ROLE &<br />REFLECTION</p>
          </div>
          <div className="qin-chapter-body">
            <p className="qin-kicker">我的贡献</p>
            <h2>项目过程与<br /><span>设计思考</span></h2>
            <div className="qin-role-grid">
              <div>
                <h3>我负责 / 参与</h3>
                <ul>
                  <li>音乐疗愈市场、竞品和问卷结果的分析与机会提炼</li>
                  <li>用户画像、旅程、信息架构与核心体验闭环的搭建</li>
                  <li>古琴音箱概念、App 关键页面与软硬件角色划分</li>
                  <li>品牌 Logo、IP、视觉延展及 10 人品牌原型测试</li>
                </ul>
              </div>
              <div>
                <h3>这次重构后的认识</h3>
                <ul>
                  <li>文化产品需要把文化逻辑转成用户行动，古风视觉承担内容表达的作用。</li>
                  <li>概念项目也要主动写清验证边界，避免把主观体验包装成医学效果。</li>
                  <li>社区、商城和穿戴联动应在核心闭环被验证后扩展，模块数量不会自然带来产品价值。</li>
                </ul>
              </div>
            </div>
            <div className="qin-archive">
              <p className="qin-kicker">视觉与过程档案</p>
              <div>
                {[
                  { image: asset('qinyun-case/qinyun-09-logo.jpg'), label: '品牌标志探索' },
                  { image: asset('qinyun-case/qinyun-13-ip.jpg'), label: 'IP 角色“子弦”' },
                  { image: asset('qinyun-case/qinyun-01-product-board.jpg'), label: '软硬件成果总览' },
                  { image: asset('qinyun-case/qinyun-18-extensions.jpg'), label: '品牌视觉延展' },
                ].map((item) => (
                  <figure key={item.label}>
                    <ZoomableImage src={item.image} alt={item.label} caption={item.label} onOpen={setLightboxImage} />
                    <figcaption>{item.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>
        {lightboxImage ? <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
      </article>
    );
  }

  return (
    <article className="case-study">
      <a className="back-link" href="#branches">
        返回精选项目
      </a>

      <section className="case-hero">
        <div className="case-hero-copy">
          <p className="eyebrow">{study.type} / {study.year}</p>
          <h1>{study.title}</h1>
          <p className="case-cn">{study.cn}</p>
          <p>{study.overview}</p>
          {study.award ? <p className="case-award">{study.award}</p> : null}
          {study.externalLink ? (
            <a className="case-watch-link" href={study.externalLink.href} target="_blank" rel="noreferrer">
              <span className="watch-icon">
                <Play size={14} fill="currentColor" />
              </span>
              <span>{study.externalLink.label}</span>
              <span className="watch-arrow" aria-hidden="true">→</span>
            </a>
          ) : null}
          {project ? (
            <div className="output-tags case-tags">
              {project.outputs.map((output) => (
                <span key={output}>{output}</span>
              ))}
            </div>
          ) : null}
        </div>
        <figure className="case-hero-image">
          <ZoomableImage
            src={study.heroImage}
            alt={`${study.title} case study cover`}
            caption={`${study.title}｜${study.type}`}
            onOpen={setLightboxImage}
          />
          <figcaption>{study.type}</figcaption>
        </figure>
      </section>

      {study.highlights.length > 0 ? (
        <section className="case-section case-highlights-section">
          <div>
            <p className="section-kicker">项目概览</p>
            <h2>这个项目解决了什么</h2>
          </div>
          <div className="case-highlight-grid">
            {study.highlights.map((highlight) => (
              <article key={highlight}>
                <p>{highlight}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {study.details.length > 0 ? (
        <section className="case-section case-narrative-section">
          <div>
            <p className="section-kicker">研究与设计</p>
            <h2>从问题到方案</h2>
          </div>
          <div className="case-narrative">
            {study.details.map((detail) => (
              <article key={detail.heading}>
                <h3>{detail.heading}</h3>
                <p>{detail.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="case-section">
        <div>
          <p className="section-kicker">设计过程</p>
          <h2>项目推进步骤</h2>
        </div>
        <ol className="case-process">
          {study.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="case-section case-two-col">
        <div>
          <p className="section-kicker">我的职责</p>
          <h2>我的主要工作</h2>
          <ul>
            {study.role.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-kicker">项目总结</p>
          <h2>经验与收获</h2>
          <ul>
            {study.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-section">
        <div>
          <p className="section-kicker">过程材料</p>
          <h2>关键设计材料</h2>
        </div>
        <div className="case-reference-grid">
          {study.references.map((reference) => (
            <figure key={reference.label}>
              <ZoomableImage
                src={reference.image}
                alt={reference.label}
                caption={reference.label}
                onOpen={setLightboxImage}
              />
              <figcaption>{reference.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {study.gallery.length > 0 ? (
        <section className="case-section case-gallery-section">
          <div>
            <p className="section-kicker">更多过程图</p>
            <h2>项目材料展示</h2>
          </div>
          <div className="case-gallery-grid">
            {study.gallery.map((item) => (
              <figure key={item.label}>
                <ZoomableImage
                  src={item.image}
                  alt={item.label}
                  caption={item.label}
                  onOpen={setLightboxImage}
                />
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}
      {lightboxImage ? <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
    </article>
  );
}

function LeavesSection() {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<string | null>(null);
  const [flippingSnippet, setFlippingSnippet] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselMotionRef = useRef({ extraSpeed: 0, lastTimestamp: 0, pendingDistance: 0 });

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const centerOnMiddleLoop = () => {
      const firstLoop = carousel.querySelector<HTMLElement>('.visual-snippet-loop');
      const track = carousel.querySelector<HTMLElement>('.visual-snippet-track');
      if (!firstLoop || !track) {
        return;
      }

      const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0;
      carousel.scrollLeft = firstLoop.offsetWidth + gap;
    };

    const frame = window.requestAnimationFrame(centerOnMiddleLoop);
    window.addEventListener('resize', centerOnMiddleLoop);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', centerOnMiddleLoop);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    let frame = 0;
    const tick = (timestamp: number) => {
      const motion = carouselMotionRef.current;
      const elapsed = motion.lastTimestamp ? Math.min((timestamp - motion.lastTimestamp) / 1000, 0.06) : 0;
      motion.lastTimestamp = timestamp;

      const shouldRest = activeSnippet !== null || flippingSnippet !== null || lightboxImage !== null;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!shouldRest && !prefersReducedMotion && document.visibilityState === 'visible') {
        const firstLoop = carousel.querySelector<HTMLElement>('.visual-snippet-loop');
        const track = carousel.querySelector<HTMLElement>('.visual-snippet-track');
        if (firstLoop && track) {
          const loopWidth = firstLoop.offsetWidth + (Number.parseFloat(window.getComputedStyle(track).gap) || 0);
          motion.pendingDistance += (14 + motion.extraSpeed) * elapsed;
          const wholePixelStep = Math.trunc(motion.pendingDistance);
          if (wholePixelStep !== 0) {
            carousel.scrollLeft += wholePixelStep;
            motion.pendingDistance -= wholePixelStep;
          }
          motion.extraSpeed += (0 - motion.extraSpeed) * Math.min(1, elapsed * 1.6);

          if (carousel.scrollLeft < loopWidth * 0.35) {
            carousel.scrollLeft += loopWidth;
          } else if (carousel.scrollLeft > loopWidth * 1.65) {
            carousel.scrollLeft -= loopWidth;
          }
        }
      } else if (shouldRest) {
        motion.extraSpeed = 0;
        motion.pendingDistance = 0;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [activeSnippet, flippingSnippet, lightboxImage]);

  const rebalanceCarousel = () => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const firstLoop = carousel.querySelector<HTMLElement>('.visual-snippet-loop');
    const track = carousel.querySelector<HTMLElement>('.visual-snippet-track');
    if (!firstLoop || !track) {
      return;
    }

    const loopWidth = firstLoop.offsetWidth + (Number.parseFloat(window.getComputedStyle(track).gap) || 0);
    if (carousel.scrollLeft < loopWidth * 0.35) {
      carousel.scrollLeft += loopWidth;
    } else if (carousel.scrollLeft > loopWidth * 1.65) {
      carousel.scrollLeft -= loopWidth;
    }
  };

  const moveCarouselWithWheel = (event: WheelEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    event.preventDefault();
    const wheelDistance = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    carousel.scrollLeft += wheelDistance * 1.08;
    carouselMotionRef.current.extraSpeed = Math.max(
      -96,
      Math.min(96, carouselMotionRef.current.extraSpeed + wheelDistance * 0.18),
    );
    window.requestAnimationFrame(rebalanceCarousel);
  };

  const openSnippet = (cardId: string, image: LightboxImage) => {
    if (flippingSnippet !== null) {
      return;
    }

    setFlippingSnippet(cardId);
    window.setTimeout(() => {
      setLightboxImage(image);
      setFlippingSnippet(null);
    }, 640);
  };

  return (
    <section className="section leaves-section" id="leaves">
      <div className="section-kicker">
        <Camera size={18} />
        视觉材料
      </div>
      <div className="section-heading-row">
        <h2>视觉片段</h2>
        <p>这些片段来自AIGC影像、动画分镜与插画实验，保留不同项目中的光感、色彩和叙事氛围。</p>
      </div>
      <div className="visual-snippet-board">
        <div
          className={activeSnippet === null ? 'visual-snippet-carousel' : 'visual-snippet-carousel is-exploring'}
          ref={carouselRef}
          role="region"
          aria-label="可循环浏览的视觉片段画廊"
          onWheel={moveCarouselWithWheel}
          onScroll={rebalanceCarousel}
        >
          <div className="visual-snippet-track">
          {visualSnippetLoops.map((loop, copy) => (
            <div className="visual-snippet-loop" key={copy} aria-hidden={copy !== 1}>
            {loop.map((item) => (
            <VisualSnippetCard
              item={item}
              index={item.originalIndex}
              cardId={item.cardId}
              key={item.cardId}
              active={activeSnippet === item.cardId}
              flipping={flippingSnippet === item.cardId}
              duplicate={copy !== 1}
              onFocus={() => setActiveSnippet(item.cardId)}
              onBlur={() => setActiveSnippet(null)}
              onOpen={(image) => openSnippet(item.cardId, image)}
            />
            ))}
            </div>
          ))}
          </div>
        </div>
      </div>
      {lightboxImage ? (
        <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      ) : null}
    </section>
  );
}

function CursorAtmosphere() {
  useEffect(() => {
    const root = document.documentElement;
    const updateCursor = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(target?.closest('button, a, [role="button"], .visual-snippet-carousel'));
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
      root.style.setProperty('--cursor-glow', isInteractive ? 'rgba(255, 218, 126, 0.28)' : 'rgba(196, 234, 142, 0.24)');
      root.style.setProperty('--cursor-glow-opacity', '1');
    };

    const hideCursorGlow = () => root.style.setProperty('--cursor-glow-opacity', '0');
    window.addEventListener('pointermove', updateCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursorGlow);

    return () => {
      window.removeEventListener('pointermove', updateCursor);
      document.removeEventListener('mouseleave', hideCursorGlow);
    };
  }, []);

  return <div className="cursor-atmosphere" aria-hidden="true" />;
}

function AnimationArchiveDialog({
  project,
  onClose,
  onOpenImage,
}: {
  project: (typeof animationArchiveProjects)[number];
  onClose: () => void;
  onOpenImage: (image: LightboxImage) => void;
}) {
  return (
    <div className="animation-archive-dialog" role="dialog" aria-modal="true" aria-label={`${project.title}项目档案`}>
      <button className="animation-archive-backdrop" type="button" aria-label="关闭项目档案" onClick={onClose} />
      <article className="animation-archive-panel">
        <button className="animation-archive-close" type="button" aria-label="关闭项目档案" onClick={onClose}>×</button>
        <header>
          <span>{project.number} / {project.type}</span>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          {project.externalLink ? (
            <a href={project.externalLink} target="_blank" rel="noreferrer" className="animation-archive-watch">
              <Play size={14} fill="currentColor" />
              前往新片场观看成片
              <ExternalLink size={14} />
            </a>
          ) : null}
        </header>
        {project.gallery.length > 0 ? (
          <div className="animation-archive-gallery">
            {project.gallery.map((item) => (
              <button key={item.label} type="button" onClick={() => onOpenImage({ src: item.image, alt: item.label, caption: item.label })}>
                <img src={item.image} alt={item.label} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="animation-archive-empty">完整作品已收录于新片场页面，点击上方按钮即可观看。</div>
        )}
      </article>
    </div>
  );
}

function NotesSection() {
  const [activeProject, setActiveProject] = useState<(typeof animationArchiveProjects)[number] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!activeProject && !lightboxImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          setActiveProject(null);
        }
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject, lightboxImage]);

  return (
    <section className="section notes-section" id="notes">
      <div className="section-kicker">
        <PenLine size={18} />
        项目索引
      </div>
      <div className="animation-archive-heading">
        <div>
          <h2>本科动画与影像档案</h2>
          <p className="section-lead">
            从手绘动态图形、二维叙事到三维动画与实拍合成，记录本科阶段围绕角色、场景、镜头与后期制作展开的作品实践。
          </p>
        </div>
        <p>点击卡片查看过程图；带播放图标的作品可前往新片场观看完整成片。</p>
      </div>
      <div className="animation-archive-grid">
        {animationArchiveProjects.map((project) => (
          <article key={project.slug} className="animation-archive-card">
            <div className="animation-archive-card-body">
              <p>{project.number} / {project.type}</p>
              <h3>{project.title}</h3>
              <span>{project.summary}</span>
              <div className="animation-archive-card-actions">
                <button type="button" onClick={() => setActiveProject(project)}>过程图 {project.gallery.length > 0 ? `· ${project.gallery.length} 张` : '· 查看详情'}</button>
                {project.externalLink ? (
                  <a href={project.externalLink} target="_blank" rel="noreferrer" aria-label={`前往新片场观看${project.title}`}>
                    <Play size={13} fill="currentColor" /> 新片场
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="additional-archive-row">
        <span>其他存档</span>
        {additionalArchiveWorks.map((work) => (
          <em key={work}>{work}</em>
        ))}
      </div>
      <div className="skills-strip" aria-label="能力标签">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      {activeProject ? <AnimationArchiveDialog project={activeProject} onClose={() => setActiveProject(null)} onOpenImage={setLightboxImage} /> : null}
      {lightboxImage ? <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
    </section>
  );
}

const readCaseSlug = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.location.hash.startsWith('#case-') ? window.location.hash.replace('#case-', '') : null;
};

const readExperienceSlug = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.location.hash.startsWith('#experience-')
    ? window.location.hash.replace('#experience-', '')
    : null;
};

const scrollToCurrentHash = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const hash = window.location.hash;
  if (!hash || hash.startsWith('#case-')) {
    return;
  }

  window.requestAnimationFrame(() => {
    document.querySelector(hash)?.scrollIntoView({ block: 'start' });
  });
};

function App() {
  const [activeCaseSlug, setActiveCaseSlug] = useState(readCaseSlug);
  const [activeExperienceSlug, setActiveExperienceSlug] = useState(readExperienceSlug);
  const activeCase = caseStudies.find((study) => study.slug === activeCaseSlug);
  const activeExperience = experienceDetails.find((experience) => experience.slug === activeExperienceSlug);

  useEffect(() => {
    const syncRoute = () => {
      const nextCaseSlug = readCaseSlug();
      const nextExperienceSlug = readExperienceSlug();
      setActiveCaseSlug(nextCaseSlug);
      setActiveExperienceSlug(nextExperienceSlug);

      if (!nextCaseSlug && !nextExperienceSlug) {
        window.setTimeout(scrollToCurrentHash, 0);
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);

    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    if (activeCaseSlug || activeExperienceSlug) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [activeCaseSlug, activeExperienceSlug]);

  if (activeCase) {
    return (
      <div className="site-shell">
        <BrowserBar />
        <main>
          <CaseStudyPage study={activeCase} />
        </main>
        <footer className="site-footer">
          <span>成长是一种持续整理自己和作品的过程。</span>
          <a href="#branches">返回精选项目</a>
        </footer>
        <CursorAtmosphere />
      </div>
    );
  }

  if (activeExperience) {
    return (
      <div className="site-shell">
        <BrowserBar />
        <main>
          <ExperienceDetailPage experience={activeExperience} />
        </main>
        <footer className="site-footer">
          <span>成长是一种持续整理自己和作品的过程。</span>
          <a href="#trunk">返回个人经历</a>
        </footer>
        <CursorAtmosphere />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <BrowserBar />
      <main>
        <HeroCollage />
        <RootsSection />
        <TrunkSection />
        <BranchesSection />
        <LeavesSection />
        <NotesSection />
      </main>
      <footer className="site-footer">
        <span>成长是一种持续整理自己和作品的过程。</span>
        <a href="#top">回到顶部</a>
      </footer>
      <CursorAtmosphere />
    </div>
  );
}

export default App;
