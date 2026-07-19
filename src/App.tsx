import {
  ArrowDown,
  Camera,
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

const asset = (name: string) => `/portfolio/${name}`;

const navItems = [
  { label: '能力', href: '#roots' },
  { label: '经历', href: '#trunk' },
  { label: '项目', href: '#branches' },
  { label: '索引', href: '#notes' },
];

const rings = [
  {
    year: '2020-2024',
    title: '中南财经政法大学｜动画与游戏设计本科',
    detail: '成绩1/149，前1%，GPA 3.85/4.0。主修动画、游戏、三维影像与视觉叙述。',
    tags: ['专业排名1/149 ，前1%，获国家奖学金'],
  },
  {
    year: '2020-2022',
    title: '中南财经政法大学党委宣传部新媒体中心｜视频主编',
    detail: '负责视频栏目的策划、选题执行、发布审核与反馈复盘，累计审核视频500+；参与校级宣传短视频制作与发放，单条最高浏览量539w+，点赞10w＋。',
    tags: ['短视频运营单条最高539w+播放 10w＋点赞'],
  },
  {
    year: '2023年至今',
    title: '哈尔滨工业大学（深圳）｜设计学（数字媒体）硕士',
    detail: '成绩排名4/33，前10%，GPA 3.53/4.0。研究方向聚焦用户体验、数字媒体、AIGC内容生产流程、AI产品与原型设计。',
    tags: ['专业排名4/33 ，前10% ，获校特等学金'],
  },
  {
    year: '2025.07-2025.09',
    title: '新华社音视频部｜实习生',
    detail: '参与《精彩世运》等音视频项目，涵盖选题沟通、分镜策划、素材筛选、脚本润色、剪辑包装与内容审核，并传播场景优化标题、节奏和动效包装。',
    tags: [],
  },
  {
    year: '2024-2025',
    title: '哈工深摄影协会｜副会长',
    detail: '组织摄影培训、作品分享、外拍活动与社群内容运营，承担活动策划、招募、现场执行和复盘。 \n推动摄影影像与 AI 创作交流，沉淀活动选题、视觉素材与成员互动机制。',
    tags: [],
  },
];

const roots = [
  '用户洞察',
  '影像叙事',
  'AIGC工作流',
  '产品原型',
  '内容运营',
  '摄影观察',
  '互动媒体',
  '设计研究',
];

const rootDescriptions: Record<string, string> = {
  用户洞察: '通过访谈、问卷、用户画像、共情图和旅程图，把模糊需求转化为明确的设计判断。',
  影像叙事: '能把议题拆成脚本、分镜、镜头节奏和视觉符号，让观点更容易被理解和传播。',
  AIGC工作流: '熟悉从提示词、素材生成、模型对比到剪辑包装的迭代流程，重视可控性和复盘记录。',
  产品原型: '能从信息架构、功能路径、低保真到高保真界面逐步推进，让概念落到可体验界面。',
  内容运营: '具备选题、脚本、审核、发布和传播包装经验，理解内容节奏与受众反馈。',
  摄影观察: '用影像记录人物、场景和情绪细节，为视觉表达和用户研究积累真实素材。',
  互动媒体: '关注网页、装置、APP和视频之间的体验衔接，让作品不仅能看，也能被使用。',
  设计研究: '能把背景资料、竞品分析、测试反馈和设计决策组织成完整的案例论证。',
};

const featuredProjects = [
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

const priorityProjectSlugs = ['electronic-yuefu', 'qin-yun', 'cocoon', 'ladywell'];

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
  { image: asset('zhuangyuan-case/zhuangyuan-03-packaging-expansion.png'), label: '包装插图与展开图' },
  { image: asset('zhuangyuan-case/zhuangyuan-04-gift-box-structure.png'), label: '主礼盒结构与交互说明' },
  { image: asset('zhuangyuan-case/zhuangyuan-05-product-render.png'), label: '全系列产品包装效果图' },
  { image: asset('zhuangyuan-case/zhuangyuan-06-extension-products.png'), label: '文创延展产品展示' },
  { image: asset('zhuangyuan-case/zhuangyuan-07-pricing-landing.png'), label: '产品定价与落地应用分析' },
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
          '小组将AI作为创意放大和生产协作工具：使用大模型辅助文本生成与脚本整理，使用Midjourney、即梦、Procreate等生成或绘制关键帧，再通过Wan2.1、剪映、可灵、Runway等工具进行视频生成与后期编辑。整个流程不是单次生成，而是“主题设定 - 图像生成 - 视频生成 - 选择修正 - 剪辑包装”的多轮迭代。',
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
      'AIGC不是替代设计判断，而是把概念、调研、视觉符号和后期剪辑连接起来的工作流。',
      '影像类AI项目要先建立稳定的章节结构和视觉规则，否则生成结果容易漂亮但松散。',
      '优秀的作品集页面需要呈现“为什么这样做”，而不是只展示最终画面。',
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
          '“电子新乐府”借用汉代乐府采诗入乐的文化原型，将其重构为一家虚拟诗词音乐厂牌。用户不只是听一首歌，而是进入一个电子音乐实验室：选择诗乐、理解诗词与音乐之间的映射关系，浏览诗乐人专辑，并在生成式体验中参与古诗词音乐的再创作。',
      },
      {
        heading: '视觉改进',
        body:
          '项目对早期方案进行了系统复盘：旧版界面色彩较单一，图形与诗词之间的内在联系不够清晰，交互也偏平面。优化后，视觉方向转向“赛博新中式”，用低饱和夜蓝、青绿、淡粉与流动光效建立电子感，同时保留山水、云雾、书法和水墨颗粒等东方语境。',
      },
      {
        heading: '交互体验',
        body:
          '网页从首页进入精选推荐、诗乐选择、音乐人选择、专辑浏览和创作实验室等模块。页面不再只是纵向滚动，而是通过拖动、滑动、卡片翻转、3D层叠和粒子动效，引导用户主动探索诗词音乐的内容结构，让“浏览”更接近一次沉浸式试听。',
      },
      {
        heading: '音画生成',
        body:
          '播放页尝试把歌曲、诗词和视觉进行同频表达：歌词被拆解为粒子与文字纹理，音频通过高、中、低频参数驱动画面中的水流、飞溅、雾气和粒子扩散。这样，古诗词不只被配乐，而是成为可以被看见、被触发、被感知的动态空间。',
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
      '文化类AIGC产品不只是“加上AI”，关键是找到文化内容与用户参与之间的机制。',
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
          '项目聚焦三个问题：更年期女性及家庭成员对更年期症状的了解程度，家庭成员对女性情绪变化的感知方式，以及女性自身对情绪把控的程度与方法。研究方向从“妇科检查自测”等健康工具逐步收敛到“更年期女性心理健康与家庭支持”。',
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
      '敏感健康议题的关键不是堆功能，而是建立足够尊重、温和、可信任的表达方式。',
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
          '项目从“人并不是唯一能动者”出发，借助非人类中心主义与Donna Haraway的共生生存理论，重新定义植物在生态系统中的主体性，并提出非人生命如何在信息时代发声的问题。',
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
      '社区产品需要持续内容机制，不只是界面页面。',
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

const archiveWorks = [
  { title: 'UE5 场景建模', category: '三维场景', source: '本科作品视频' },
  { title: '三维动画《与你重逢》', category: '三维动画', source: '本科作品视频' },
  { title: '实拍与CG结合动画《纷蕴柑青来》', category: '实拍合成', source: '本科作品视频' },
  { title: '独立手绘MG动画片头', category: '动态图形', source: '本科作品视频' },
  { title: '红“秘”围城 VR游戏项目', category: 'VR游戏', source: '本科作品视频' },
  { title: '丰舞蝶梦 梁祝相惠', category: '文化策划', source: '本科作品视频' },
  { title: '《植系乌托邦》', category: '思辨设计', source: '研究生作品集合' },
  { title: '《状元七景》', category: '文化文创', source: '研究生作品集合' },
];

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
        <p>从影像、内容运营和设计研究出发，我把复杂议题拆成可体验、可传播、可复盘的产品与AIGC工作流。</p>
      </div>

      <div className="hero-title">
        <h1>欢迎来到我的主页</h1>
        <p className="identity">AI产品/AIGC工作流程/用户研究/内容运营/视觉叙述</p>
        <a className="explore-button" href="#branches">
          <ArrowDown size={17} />
          查看精选项目
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
  const [activeRoot, setActiveRoot] = useState('AIGC工作流');

  return (
    <section className="section roots-section" id="roots">
      <div className="section-kicker">
        <Sprout size={18} />
        能力
      </div>
      <div className="split-layout">
        <div>
          <h2>方法与能力</h2>
          <p className="section-lead">我更擅长把研究、叙事、原型和内容传播连成一条可落地的创作链路。</p>
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
            <span>AI产品</span>
            <span>AIGC工作流</span>
            <span>设计研究</span>
            <span>影像表达</span>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BranchesSection() {
  const priorityProjects = priorityProjectSlugs
    .map((slug) => featuredProjects.find((project) => project.slug === slug))
    .filter((project): project is (typeof featuredProjects)[number] => Boolean(project));
  const supportingProjects = featuredProjects.filter((project) => !priorityProjectSlugs.includes(project.slug));

  const renderProjectCard = (project: (typeof featuredProjects)[number], variant = 'primary') => {
    const Icon = project.icon;

    return (
      <article className={`project-card portfolio-card ${variant === 'supporting' ? 'supporting-card' : ''}`} key={project.name}>
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
      <div className="section-heading-row">
        <h2>精选项目</h2>
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

function NotesSection() {
  return (
    <section className="section notes-section" id="notes">
      <div className="section-kicker">
        <PenLine size={18} />
        项目索引
      </div>
      <div className="notes-board">
        <div>
          <h2>后续项目索引</h2>
          <p className="section-lead">
            下面是后续可以继续展开的作品索引。建议优先选择最匹配求职方向的项目补充详情页，例如《思茧成蝶》《电子新乐府》《她好 LadyWell》。
          </p>
        </div>
        <div className="note-list archive-list">
          {archiveWorks.map((work) => (
            <article key={work.title}>
              <span>{work.category}</span>
              <div>
                <p>{work.title}</p>
                <small>{work.source}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="skills-strip" aria-label="能力标签">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  );
}

const readCaseSlug = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.location.hash.startsWith('#case-') ? window.location.hash.replace('#case-', '') : null;
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
  const activeCase = caseStudies.find((study) => study.slug === activeCaseSlug);

  useEffect(() => {
    const syncRoute = () => {
      const nextCaseSlug = readCaseSlug();
      setActiveCaseSlug(nextCaseSlug);

      if (!nextCaseSlug) {
        window.setTimeout(scrollToCurrentHash, 0);
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);

    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  if (activeCase) {
    return (
      <div className="site-shell">
        <BrowserBar />
        <main>
          <CaseStudyPage study={activeCase} />
        </main>
        <footer className="site-footer">
          <span>成长不是终点，而是持续整理自己和作品的方式。</span>
          <a href="#branches">返回精选项目</a>
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
        <span>成长不是终点，而是持续整理自己和作品的方式。</span>
        <a href="#top">回到顶部</a>
      </footer>
      <CursorAtmosphere />
    </div>
  );
}

export default App;
