const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageBreak, Footer, PageNumber,
} = require('docx');

/* ───── palette (matches the website earth-tone theme) ───── */
const C = {
  brown: '865D3E', brownDark: '533826', gold: 'CDA226', goldDark: 'A67F1D',
  cream: 'F2EAE1', creamLite: 'FAF7F4', blue: '4A90B8', red: 'C75450',
  orange: 'D4875E', green: '5B9A6F', purple: '8B6BAE', teal: '4A9A8E',
  ink: '3E2B1D', grey: '6B6B6B', white: 'FFFFFF',
};
const FONT = 'Microsoft JhengHei';
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1080;
const CONTENT_W = PAGE_W - MARGIN * 2; // 9746

/* ───── helpers ───── */
const tx = (text, o = {}) => new TextRun({ text, font: FONT, ...o });
const P = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...o });
const spacer = (n = 120) => new Paragraph({ spacing: { after: n }, children: [tx('')] });

function h1(text, color = C.brownDark) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.gold, space: 6 } },
    children: [tx(text, { bold: true, size: 32, color })],
  });
}
function h2(text, color = C.brown) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [tx(text, { bold: true, size: 26, color })],
  });
}
function h3(text, color = C.ink) {
  return new Paragraph({
    spacing: { before: 160, after: 80 },
    children: [tx(text, { bold: true, size: 23, color })],
  });
}
function body(text, o = {}) {
  return new Paragraph({
    spacing: { after: 100, line: 300 },
    children: Array.isArray(text) ? text.map(t => typeof t === 'string' ? tx(t) : t) : [tx(text)],
    ...o,
  });
}
function bullet(text, ref = 'bul', level = 0) {
  return new Paragraph({
    numbering: { reference: ref, level },
    spacing: { after: 60, line: 290 },
    children: Array.isArray(text) ? text.map(t => typeof t === 'string' ? tx(t) : t) : [tx(text)],
  });
}
function numbered(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60, line: 290 },
    children: Array.isArray(text) ? text.map(t => typeof t === 'string' ? tx(t) : t) : [tx(text)],
  });
}

const thinB = { style: BorderStyle.SINGLE, size: 2, color: 'D9CBBA' };
const cellBorders = { top: thinB, bottom: thinB, left: thinB, right: thinB };

function cell(content, { w, fill, bold = false, color = C.ink, align = AlignmentType.LEFT, size = 21, valign = VerticalAlign.CENTER } = {}) {
  const paras = Array.isArray(content)
    ? content.map(c => typeof c === 'string'
        ? new Paragraph({ alignment: align, spacing: { after: 40, line: 280 }, children: [tx(c, { bold, color, size })] })
        : c)
    : [new Paragraph({ alignment: align, spacing: { line: 280 }, children: [tx(content, { bold, color, size })] })];
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    borders: cellBorders,
    shading: fill ? { fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 90, bottom: 90, left: 140, right: 140 },
    verticalAlign: valign,
    children: paras,
  });
}

function table(rows, colWidths) {
  return new Table({
    width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: colWidths,
    rows,
  });
}

/* ───── numbering config ───── */
const numbering = {
  config: [
    { reference: 'bul', levels: [
      { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 560, hanging: 280 } } } },
      { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 1040, hanging: 280 } } } },
    ]},
    { reference: 'prin-do', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 560, hanging: 320 } } } }] },
    { reference: 'prin-dont', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 560, hanging: 320 } } } }] },
    { reference: 'prep', levels: [{ level: 0, format: LevelFormat.BULLET, text: '☐', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 560, hanging: 280 } } } }] },
    { reference: 'goal', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 300 } } } }] },
    { reference: 'ask', levels: [{ level: 0, format: LevelFormat.BULLET, text: '？', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 560, hanging: 300 } } } }] },
    { reference: 'ref', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 560, hanging: 320 } } } }] },
  ],
};

/* ═══════════════ CONTENT ═══════════════ */
const children = [];

/* ── Cover ── */
children.push(
  new Paragraph({ spacing: { before: 1400, after: 0 }, alignment: AlignmentType.CENTER, children: [tx('兒少表意權培力課程', { bold: true, size: 56, color: C.brownDark })] }),
  new Paragraph({ spacing: { before: 120, after: 200 }, alignment: AlignmentType.CENTER, children: [tx('我有話要說', { bold: true, size: 40, color: C.gold })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 8, color: C.gold, space: 8 }, bottom: { style: BorderStyle.SINGLE, size: 8, color: C.gold, space: 8 } }, spacing: { before: 200, after: 200 }, children: [tx('  讓每個孩子的聲音都被聽見  ', { size: 26, color: C.brown })] }),
  spacer(400),
);
const coverRows = [
  ['課程對象', '國小五年級 ～ 國中三年級（約 11–15 歲）'],
  ['實施場域', '北投陪讀班'],
  ['課程堂數', '6 堂・每堂約 90 分鐘（模組化，可彈性增減）'],
  ['預計時間', '2026 年 9 月起'],
  ['理論依據', 'CRC 兒童權利公約第 12 條・Lundy 參與模型・Hart 參與階梯'],
  ['設計單位', '中華仁親社區關懷協會 × 李雨函（依碩士論文研究延伸）'],
].map(([k, v]) => new TableRow({ children: [
  cell(k, { w: 2400, fill: C.cream, bold: true, color: C.brownDark, size: 22 }),
  cell(v, { w: 6500, size: 22 }),
]}));
children.push(table(coverRows, [2400, 6500]));
children.push(new Paragraph({ spacing: { before: 1000 }, alignment: AlignmentType.CENTER, children: [tx('台灣兒少表意權知識平台  renchin-db.vercel.app', { size: 18, color: C.grey })] }));
children.push(new Paragraph({ children: [new PageBreak()] }));

/* ── 一、課程設計理念 ── */
children.push(h1('一、課程設計理念'));
children.push(body([tx('兒童權利公約（CRC）第 12 條揭示：每個兒少都有'), tx('「表達意見的權利」', { bold: true, color: C.brown }), tx('，而且他們的意見應依其年齡與成熟度，受到應有的重視。然而對許多處於弱勢處境的孩子而言，「說出想法」並不容易——可能因為過去不曾被認真聆聽、缺乏安全感，或不相信自己的聲音真的會被當一回事。')]));
children.push(body('本課程以英國 Laura Lundy 教授提出的「參與四要素」為主軸：'));
children.push(bullet([tx('空間 Space：', { bold: true, color: C.blue }), tx('孩子擁有安全、被邀請的機會去表達。')]));
children.push(bullet([tx('發聲 Voice：', { bold: true, color: C.green }), tx('孩子能用自己最自在的方式說出想法。')]));
children.push(bullet([tx('聆聽 Audience：', { bold: true, color: C.orange }), tx('有人真的認真在聽。')]));
children.push(bullet([tx('影響力 Influence：', { bold: true, color: C.purple }), tx('孩子的意見會被認真看待，並帶來改變。')]));
children.push(body('並參考 Roger Hart 的「參與階梯」，引導孩子從「被詢問意見」逐步走向「自己發起、共同決定」。'));
children.push(h3('六堂課的進程'));
children.push(body('課程循序漸進：先建立安全與信任（空間）→ 練習多元表達（發聲）→ 從生活找出真實議題（聆聽對象）→ 學習提案與共同決定 → 最後對真實對象發表，體驗「我的聲音帶來改變」（影響力）。'));
children.push(new Paragraph({ shading: { fill: C.creamLite, type: ShadingType.CLEAR, color: 'auto' }, border: { left: { style: BorderStyle.SINGLE, size: 18, color: C.gold, space: 8 } }, spacing: { before: 120, after: 120, line: 300 }, indent: { left: 200 }, children: [tx('設計原則：', { bold: true, color: C.goldDark }), tx('對弱勢兒少而言，「過程」比「成果」更重要。本課程不要求標準答案、不評比優劣，重視每個孩子用自己的步調參與——能開口是勇敢，選擇先聆聽也是一種參與。')] }));

/* ── 二、課程總覽 ── */
children.push(h1('二、課程總覽'));
const ovHeader = new TableRow({ tableHeader: true, children: [
  cell('堂次', { w: 760, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
  cell('主題', { w: 1900, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
  cell('核心提問', { w: 3400, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
  cell('參與面向', { w: 2400, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
]});
const ovData = [
  ['第 1 堂', '我有話要說', '我的想法重要嗎？', '空間 Space', C.blue],
  ['第 2 堂', '安全的圈圈', '怎樣才敢說、願意聽？', '空間＋發聲', C.blue],
  ['第 3 堂', '我的一百種說法', '除了用講的，還能怎麼表達？', '發聲 Voice', C.green],
  ['第 4 堂', '生活偵探', '我身邊有什麼想改變的事？', '發聲＋聆聽對象', C.orange],
  ['第 5 堂', '模擬兒少代表會', '怎麼把想法變成提案、一起決定？', '聆聽＋影響力', C.purple],
  ['第 6 堂', '讓世界聽見', '我的聲音能帶來什麼改變？', '影響力 Influence', C.purple],
];
const ovRows = [ovHeader, ...ovData.map(([a, b, c, d, col], i) => new TableRow({ children: [
  cell(a, { w: 760, fill: i % 2 ? C.creamLite : C.white, bold: true, align: AlignmentType.CENTER, size: 20, color: C.brownDark }),
  cell(b, { w: 1900, fill: i % 2 ? C.creamLite : C.white, bold: true, size: 20, color: col }),
  cell(c, { w: 3400, fill: i % 2 ? C.creamLite : C.white, size: 20 }),
  cell(d, { w: 2400, fill: i % 2 ? C.creamLite : C.white, align: AlignmentType.CENTER, size: 20, color: col }),
]}))];
children.push(table(ovRows, [760, 1900, 3400, 2400]));
children.push(spacer(80));
children.push(new Paragraph({ spacing: { after: 80 }, children: [tx('彈性運用：', { bold: true, color: C.brown }), tx('時間有限時，可只選第 1、4、5 堂作為三堂體驗版；若辦一日營隊，可將六個模組濃縮為上下午各三段。', { size: 21 })] }));

/* ── 三、帶領總原則 ── */
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1('三、帶領總原則'));
children.push(h2('六個「要」', C.green));
[
  '要先建立安全感——讓孩子知道「這裡說錯不會被笑」。',
  '要尊重沉默——不想說也是一種選擇，邀請而不強迫。',
  '要提供多元表達——說、寫、畫、演、比手勢都算數。',
  '要認真回應——孩子說的每句話都值得被聽見與記錄。',
  '要連結真實——討論孩子生活中真正在意的事。',
  '要看見每個人——特別關注安靜、容易被忽略的孩子。',
].forEach(t => children.push(numbered(t, 'prin-do')));
children.push(h2('六個「不」', C.red));
[
  '不評價對錯——這裡沒有標準答案。',
  '不比較——不說「誰講得比較好」。',
  '不替孩子發言——耐心等待，不急著幫他講完。',
  '不勉強分享私事——尊重每個人的界線。',
  '不打斷——讓孩子把話說完。',
  '不開空頭支票——能做到的才答應，做不到要誠實說明。',
].forEach(t => children.push(numbered(t, 'prin-dont')));

/* ── 四、行前準備清單 ── */
children.push(h1('四、行前準備清單'));
children.push(h3('空間', C.blue));
['可圍圈而坐、安靜不受打擾的空間', '牆面或白板可張貼海報', '座位安排避免固定小圈圈，鼓勵混坐'].forEach(t => children.push(bullet(t, 'prep')));
children.push(h3('通用教具', C.green));
['白板或海報紙、彩色筆、多色便利貼', '計時器、音樂播放器（可搭配網站背景音樂）', '「發言球／發言物」一個（拿到的人才發言）', '相機（記錄海報與過程，須事先取得肖像同意）'].forEach(t => children.push(bullet(t, 'prep')));
children.push(h3('情緒安全', C.orange));
['準備「我想說／我先聽」牌卡，讓孩子自主選擇', '帶領者每堂課的觀察記錄表（見附錄 D）'].forEach(t => children.push(bullet(t, 'prep')));
children.push(h3('數位連結', C.purple));
[[tx('可搭配「'), tx('台灣兒少表意權知識平台', { bold: true, color: C.brown }), tx('」兒少專區的互動遊戲與故事書作為暖身或回家延伸。')]].forEach(t => children.push(bullet(t, 'prep')));

/* ═══════════════ SESSIONS ═══════════════ */
function sessionBlock(s) {
  const out = [];
  out.push(new Paragraph({ children: [new PageBreak()] }));
  // banner
  out.push(new Paragraph({
    shading: { fill: s.color, type: ShadingType.CLEAR, color: 'auto' },
    spacing: { before: 0, after: 0 },
    border: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE } },
    children: [tx(`  第 ${s.no} 堂　${s.title}`, { bold: true, size: 34, color: C.white })],
  }));
  out.push(new Paragraph({
    shading: { fill: s.color, type: ShadingType.CLEAR, color: 'auto' },
    spacing: { before: 0, after: 160 },
    children: [tx(`  核心提問：${s.question}`, { italics: true, size: 21, color: C.white })],
  }));
  // info row
  const infoRow = new TableRow({ children: [
    cell('參與面向', { w: 1500, fill: C.cream, bold: true, color: C.brownDark, size: 19, align: AlignmentType.CENTER }),
    cell(s.dimension, { w: 2000, size: 19, align: AlignmentType.CENTER }),
    cell('時長', { w: 1100, fill: C.cream, bold: true, color: C.brownDark, size: 19, align: AlignmentType.CENTER }),
    cell(s.duration, { w: 1500, size: 19, align: AlignmentType.CENTER }),
    cell('對應依據', { w: 1500, fill: C.cream, bold: true, color: C.brownDark, size: 19, align: AlignmentType.CENTER }),
    cell(s.basis, { w: 2146, size: 19, align: AlignmentType.CENTER }),
  ]});
  out.push(table([infoRow], [1500, 2000, 1100, 1500, 1500, 2146]));
  out.push(spacer(80));
  // goals
  out.push(h3('學習目標'));
  s.goals.forEach(g => out.push(numbered(g, 'goal')));
  // materials
  out.push(h3('教材教具'));
  out.push(body(s.materials, { spacing: { after: 100 } }));
  // flow table
  out.push(h3('活動流程'));
  const flowHeader = new TableRow({ tableHeader: true, children: [
    cell('時間', { w: 1100, fill: s.color, bold: true, color: C.white, align: AlignmentType.CENTER, size: 19 }),
    cell('活動', { w: 2200, fill: s.color, bold: true, color: C.white, align: AlignmentType.CENTER, size: 19 }),
    cell('內容與步驟', { w: 6446, fill: s.color, bold: true, color: C.white, align: AlignmentType.CENTER, size: 19 }),
  ]});
  const flowRows = [flowHeader, ...s.flow.map(([t, a, d], i) => new TableRow({ children: [
    cell(t, { w: 1100, fill: i % 2 ? C.creamLite : C.white, align: AlignmentType.CENTER, size: 19, bold: true, color: C.brownDark }),
    cell(a, { w: 2200, fill: i % 2 ? C.creamLite : C.white, size: 19, bold: true, color: C.ink }),
    cell(d, { w: 6446, fill: i % 2 ? C.creamLite : C.white, size: 19 }),
  ]}))];
  out.push(table(flowRows, [1100, 2200, 6446]));
  out.push(spacer(80));
  // questions
  out.push(h3('帶領者引導提問'));
  s.questions.forEach(q => out.push(bullet(q, 'ask')));
  // tip box
  out.push(new Paragraph({
    shading: { fill: C.creamLite, type: ShadingType.CLEAR, color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: s.color, space: 8 } },
    spacing: { before: 120, after: 80, line: 300 }, indent: { left: 200 },
    children: [tx('帶領小提醒　', { bold: true, color: s.color }), tx(s.tip)],
  }));
  // extension
  out.push(new Paragraph({ spacing: { after: 80, line: 290 }, children: [tx('延伸／回家任務：', { bold: true, color: C.brown }), tx(s.extension)] }));
  // check
  out.push(new Paragraph({ spacing: { after: 80, line: 290 }, children: [tx('本堂檢核（', { bold: true, color: C.grey }), tx(s.dimension, { bold: true, color: s.color }), tx('）：', { bold: true, color: C.grey }), tx(s.check, { color: C.grey })] }));
  return out;
}

const sessions = [
  {
    no: 1, title: '我有話要說', color: C.blue, question: '我的想法重要嗎？',
    dimension: '空間 Space', duration: '90 分鐘', basis: 'CRC 第12條',
    goals: ['認識「每個人都有表達想法的權利」（CRC 第 12 條）。', '在團體中說出一個自己的想法，體驗被聆聽的感覺。', '與夥伴共同訂出小組的「安心約定」。'],
    materials: '發言球、海報紙、多色便利貼、彩色筆；可選用網站「兒少專區」故事書〈什麼是表意權〉作為引起動機。',
    flow: [
      ['15 分', '暖身・破冰', '圍圈傳「發言球」，輪流說「我的名字＋我喜歡的一件事」。拿到球才發言，建立「輪流、被聽見」的節奏。'],
      ['15 分', '引起動機', '播放或口述一個「想說卻沒人聽」的孩子的故事（可用網站故事書）。提問：「你有沒有想說、卻沒人聽的經驗？那時候的感覺是什麼？」'],
      ['20 分', '主活動一・我的願望', '每人用便利貼寫下或畫出「我希望大人聽我說的一件事」，貼到海報上。帶領者朗讀（不具名），讓孩子看見「原來大家都有想說的話」。'],
      ['25 分', '主活動二・安心約定', '全班討論「怎樣才敢說？」（不嘲笑、不插嘴、可以選擇不說……），寫成一張「安心約定」海報，每個人簽名或蓋手印。'],
      ['15 分', '收尾・一句話', '每人用一句話分享「今天我學到／我感覺……」。預告下週主題，謝謝大家今天的勇敢。'],
    ],
    questions: ['你曾經想說一件事，卻沒被聽見嗎？那時候的感覺是什麼？', '怎樣的環境會讓你比較敢說出真心話？', '如果大人願意聽你說，你最想跟他們說什麼？'],
    tip: '第一堂的重點是「安全感」，不急著講大道理。安靜的孩子用畫的、用寫的都算數；不要點名強迫發言，被邀請而能拒絕，本身就是表意權的練習。',
    extension: '回家觀察一週——「這禮拜有沒有大人主動問過你的意見？」下週帶來分享。',
    check: '每個孩子是否都有安全發聲的機會？環境是否讓人安心？',
  },
  {
    no: 2, title: '安全的圈圈', color: C.blue, question: '怎樣才敢說、願意聽？',
    dimension: '空間＋發聲', duration: '90 分鐘', basis: 'Lundy：空間／發聲',
    goals: ['練習專注聆聽他人，不打斷、不評價。', '親身體驗「被認真聽」與「被打斷」的差別。', '強化團體的信任與安全感。'],
    materials: '計時器、海報紙、彩色筆；上週的「安心約定」海報。',
    flow: [
      ['10 分', '暖身・情緒天氣', '用手勢比出「今天的心情天氣」（晴天／多雲／下雨／打雷），互相看見彼此的狀態。'],
      ['20 分', '主活動一・傾聽練習', '兩兩一組。A 說 30 秒「我最近的一件事」，B 只能專注聽、不能回應；再交換。結束後討論：「被認真聽，是什麼感覺？」'],
      ['25 分', '主活動二・打斷 vs 傾聽', '帶領者刻意示範「邊滑手機邊敷衍」與「專注傾聽」兩種樣子，讓孩子分辨差別、說出感受，整理出「好的聆聽長什麼樣子」。'],
      ['20 分', '主活動三・傾聽守則', '把剛剛的發現寫成「我們的傾聽守則」海報（例：看著對方、等他說完、不笑他）。'],
      ['15 分', '收尾・感謝圈', '對剛剛聽你說話的夥伴說一句謝謝，並補充到「安心約定」上。'],
    ],
    questions: ['被打斷的時候，你還會想繼續說嗎？', '怎樣的回應，會讓你想多說一點？', '在這個圈圈裡，你覺得最安心的是什麼時候？'],
    tip: '弱勢兒少常有「說了也沒用」的經驗。這堂用身體去體驗「被聽見」的正向感受，比講道理更有效。帶領者自己要示範最好的傾聽。',
    extension: '這週試著「認真聽家人或同學說一件事」，不打斷，回來分享你的觀察。',
    check: '孩子是否體驗到被認真聆聽？團體信任是否提升？',
  },
  {
    no: 3, title: '我的一百種說法', color: C.green, question: '除了用講的，還能怎麼表達？',
    dimension: '發聲 Voice', duration: '90 分鐘', basis: 'Lundy：發聲',
    goals: ['認識除了「說」以外的多元表達方式。', '用自己最自在的方式表達一個想法。', '尊重每個人不同的表達方式。'],
    materials: '彩色筆與圖畫紙、便利貼、黏土或積木、舊雜誌與剪刀膠水（拼貼站）、平板或相機（選用）。',
    flow: [
      ['10 分', '暖身・比手畫腳', '不能說話，只用動作讓夥伴猜情緒或物品，體會「不靠嘴巴也能溝通」。'],
      ['15 分', '引起動機・表達光譜', '介紹「表達不只是說話」：說、寫、畫、演、做、唱、拍照……都是發聲的方式。'],
      ['35 分', '主活動・我的表達攤位', '設四個站（畫畫站、便利貼書寫站、黏土／積木站、肢體演出站）。孩子自選一種方式表達主題：「我理想中的陪讀班／學校是什麼樣子」。'],
      ['20 分', '分享・作品巡禮', '自願者介紹自己的作品，其他人練習上週的傾聽守則。重點在「表達」而非「表演」。'],
      ['10 分', '收尾・我發現', '每人說「原來我可以用＿＿來表達」。'],
    ],
    questions: ['哪一種表達方式讓你最自在？為什麼？', '為什麼有些話，用畫的比用說的容易？', '看了別人的作品，你有沒有發現新的表達方式？'],
    tip: '刻意降低「口說」的門檻，讓不擅長講話的孩子也有舞台。這正呼應 Lundy「發聲」的精神——表達不等於說話，重點是孩子能用自己的方式被理解。',
    extension: '用任何一種你喜歡的方式，記錄「這週最想說的一件事」，下週帶來。',
    check: '是否提供了足夠多元的表達管道？每個孩子是否都找到自在的方式？',
  },
  {
    no: 4, title: '生活偵探', color: C.orange, question: '我身邊有什麼想改變的事？',
    dimension: '發聲＋聆聽對象', duration: '90 分鐘', basis: 'Lundy：發聲／聆聽對象',
    goals: ['從生活中發現「我在意、想改變」的事。', '練習把模糊的不滿，轉化成具體的議題。', '辨認「這件事可以跟誰說」。'],
    materials: '四張大海報（標示：學校／陪讀班／社區／家庭其他）、多色便利貼、彩色筆、學習單一「我的議題雷達」（附錄 A）。',
    flow: [
      ['10 分', '暖身・讚與怨', '輪流說一件最近「最開心」和一件「最困擾」的事，自然帶出生活中的議題。'],
      ['25 分', '主活動一・議題雷達', '四區海報（學校、陪讀班、社區、家庭／其他）。孩子用便利貼寫下各領域「想改變的事」，貼到對應海報上。'],
      ['25 分', '主活動二・5W 拆解', '分組挑一個最想處理的議題，用學習單拆解：是什麼問題？影響到誰？為什麼重要？可以跟誰說？希望變成怎樣？'],
      ['20 分', '主活動三・議題快報', '每組上台用 1 分鐘介紹他們關心的議題（練習「對象意識」——說給別人聽）。'],
      ['10 分', '收尾・投票', '全班投票選出下週要深入提案的議題。'],
    ],
    questions: ['這件事為什麼讓你在意？', '誰有權力可以改變它？', '如果什麼都能改，你最想改變身邊的哪一件事？'],
    tip: '引導但不主導。議題一定要是孩子真正在意的，即使是「想要更長的下課時間」也很好——真實的動機，才能撐起後面的提案與發表。',
    extension: '針對你們選出的議題，回家問一位大人「他怎麼看這件事」，下週帶來。',
    check: '孩子是否從自身經驗找出真實議題？是否開始意識到「可以說給誰聽」？',
  },
  {
    no: 5, title: '模擬兒少代表會', color: C.purple, question: '怎麼把想法變成提案、一起決定？',
    dimension: '聆聽對象＋影響力', duration: '90 分鐘', basis: '台灣兒少代表會・Hart 參與階梯',
    goals: ['認識台灣「兒少代表會」如何讓孩子的意見進入決策。', '體驗開會、提案、討論、表決的完整流程。', '把想法寫成一份具體的提案。'],
    materials: '學習單二「我們的提案單」（附錄 B）、議事小木槌或鈴、計票用便利貼；可連結網站「CRC 國際審查」與「兒少代表」介紹。',
    flow: [
      ['10 分', '引起動機・真的有兒少代表', '介紹台灣真的有孩子擔任「兒少代表」，把意見送進縣市政府與中央（連結網站內容）。'],
      ['15 分', '提案三要素', '說明一份好提案要講清楚：問題是什麼、希望怎麼改、可以怎麼做。示範一個例子。'],
      ['30 分', '主活動・寫提案', '分組用「提案單」把第 4 堂選出的議題寫成提案，帶領者各組巡迴協助。'],
      ['25 分', '模擬代表會', '依序：各組宣讀提案 → 其他組提問 → 舉手表決 → 記錄決議。帶領者擔任主席示範議事規則。'],
      ['10 分', '收尾・反思', '討論：「當你的提案被大家認真討論，感覺如何？」'],
    ],
    questions: ['要讓提案被聽見，需要把哪些事說清楚？', '如果有人不同意你的提案，你會怎麼回應？', '一起表決決定，和一個人說了算，有什麼不一樣？'],
    tip: '這堂讓孩子體驗「影響力」——他們的話可以變成決定。表決不是為了分輸贏，而是練習「共同決定」。讓每個提案都被認真對待，即使最後沒過。',
    extension: '把你們的提案修得更完整，準備下週對真實的大人發表。',
    check: '孩子是否將意見轉化為具體提案？是否體驗到「共同決定」的歷程？',
  },
  {
    no: 6, title: '讓世界聽見', color: C.purple, question: '我的聲音能帶來什麼改變？',
    dimension: '影響力 Influence', duration: '90 分鐘', basis: 'Lundy：聆聽對象／影響力',
    goals: ['對真實對象（老師／家長／社區）發表提案。', '體驗「我的聲音可以帶來改變」。', '回顧整段歷程，肯定自己的成長。'],
    materials: '海報與道具材料、麥克風（選用）、「小小發聲者」證書、邀請來的真實聆聽對象（陪讀班老師／家長／社區夥伴）。',
    flow: [
      ['10 分', '暖身・我變得不一樣', '每人用一句話說「六堂課下來，我的一個改變」。'],
      ['30 分', '主活動一・發表準備', '各組把提案做成海報或簡單道具，分配誰說哪一段，練習「怎麼說別人才聽得懂」。'],
      ['30 分', '主活動二・成果發表會', '邀請真實聆聽對象出席。各組發表提案，聆聽者要「認真回應」，並對能做到的部分承諾「下一步」。'],
      ['10 分', '頒證・小小發聲者', '頒發「小小發聲者」證書，肯定每個孩子的參與。'],
      ['10 分', '收尾・大圈分享', '圍圈分享「這六堂課，我最難忘的是……」。'],
    ],
    questions: ['當大人認真回應你的提案，你的感覺是什麼？', '接下來，你想繼續為哪一件事發聲？', '你覺得自己的聲音，真的有可能改變一些事嗎？'],
    tip: '務必安排真實的聆聽對象並給予真實回應——Lundy 的「聆聽對象」與「影響力」缺一不可。回應要誠實，能做到才承諾。這是孩子是否相信「表達真的有用」的關鍵一刻。',
    extension: '把這次的經驗記得：你已經是一個會替自己、替別人發聲的人了。',
    check: '孩子的意見是否獲得真實回應？是否帶來可見的改變或承諾？',
  },
];
sessions.forEach(s => sessionBlock(s).forEach(c => children.push(c)));

/* ── 整體評量與檢核 ── */
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1('五、整體評量與檢核'));
children.push(body('本課程採「歷程性觀察」，不打分數、不評比。建議帶領者每堂課後，依 Lundy 四面向簡要記錄，作為調整下一堂的依據。'));
const evalHeader = new TableRow({ tableHeader: true, children: [
  cell('面向', { w: 1900, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
  cell('觀察重點', { w: 4400, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
  cell('可以怎麼看', { w: 3446, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
]});
const evalData = [
  ['空間 Space', '每個孩子都有安全表達的機會嗎？', '是否有人從不發言？環境是否讓人安心？', C.blue],
  ['發聲 Voice', '是否提供多元的表達方式？', '孩子能否用自己自在的方式表達？', C.green],
  ['聆聽 Audience', '孩子的意見有被認真聆聽嗎？', '帶領者與同儕是否專注回應？', C.orange],
  ['影響力 Influence', '孩子的意見是否帶來回應或改變？', '提案是否獲得真實回饋與後續行動？', C.purple],
];
const evalRows = [evalHeader, ...evalData.map(([a, b, c, col], i) => new TableRow({ children: [
  cell(a, { w: 1900, fill: i % 2 ? C.creamLite : C.white, bold: true, color: col, size: 20 }),
  cell(b, { w: 4400, fill: i % 2 ? C.creamLite : C.white, size: 20 }),
  cell(c, { w: 3446, fill: i % 2 ? C.creamLite : C.white, size: 20 }),
]}))];
children.push(table(evalRows, [1900, 4400, 3446]));

/* ── 附錄 ── */
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1('附錄'));

children.push(h2('附錄 A　學習單一：我的議題雷達', C.orange));
children.push(body('（搭配第 4 堂　每人一份）'));
const wsA = [
  ['我關心的一件事', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['這是什麼問題？（What）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['它影響到誰？（Who）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['為什麼重要？（Why）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['可以跟誰說？（Whom）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['我希望它變成怎樣？（Wish）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
].map(([k, v], i) => new TableRow({ children: [
  cell(k, { w: 3200, fill: C.creamLite, bold: true, color: C.brownDark, size: 21 }),
  cell(v, { w: 6546, size: 21, color: 'BBBBBB' }),
]}));
children.push(table(wsA, [3200, 6546]));

children.push(h2('附錄 B　學習單二：我們的提案單', C.purple));
children.push(body('（搭配第 5 堂　每組一份）'));
const wsB = [
  ['提案小組', '＿＿＿＿＿＿＿＿＿＿＿＿　組員：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['提案名稱', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['我們發現的問題', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿\n＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['我們希望怎麼改', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿\n＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['具體可以怎麼做', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿\n＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ['想說給誰聽', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
].map(([k, v]) => new TableRow({ children: [
  cell(k, { w: 2700, fill: C.creamLite, bold: true, color: C.brownDark, size: 21, valign: VerticalAlign.TOP }),
  cell(v.split('\n'), { w: 7046, size: 21, color: 'BBBBBB', valign: VerticalAlign.TOP }),
]}));
children.push(table(wsB, [2700, 7046]));

children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h2('附錄 C　兒童權利公約第 12 條（兒少友善版）', C.blue));
children.push(new Paragraph({ shading: { fill: C.creamLite, type: ShadingType.CLEAR, color: 'auto' }, border: { top: thinB, bottom: thinB, left: thinB, right: thinB }, spacing: { before: 120, after: 120, line: 320 }, indent: { left: 200, right: 200 }, children: [tx('「每一個小孩，只要是跟你有關的事情，你都有權利說出自己的想法。大人要認真聽你說，並且依照你的年齡和想法的成熟度，把你的意見當一回事。」', { size: 24, color: C.brownDark, italics: true })] }));
children.push(body([tx('原文精神：', { bold: true }), tx('締約國應確保有形成自己意見能力的兒童，有權就影響其本身之所有事務自由表示意見，其意見應依其年齡與成熟度予以權衡。')]));

children.push(h2('附錄 D　帶領者每堂檢核表', C.brown));
const checkHeader = new TableRow({ tableHeader: true, children: [
  cell('檢核項目', { w: 6546, fill: C.brown, bold: true, color: C.white, size: 20 }),
  cell('做到了', { w: 1600, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
  cell('待加強', { w: 1600, fill: C.brown, bold: true, color: C.white, align: AlignmentType.CENTER, size: 20 }),
]});
const checkItems = [
  '每個孩子今天都有被邀請發言的機會',
  '沒有人被嘲笑或被打斷',
  '提供了不只一種表達方式（說／寫／畫／演）',
  '我認真聆聽並回應了孩子的發言',
  '討論的是孩子真正在意的事',
  '特別關注了安靜或容易被忽略的孩子',
];
const checkRows = [checkHeader, ...checkItems.map((t, i) => new TableRow({ children: [
  cell(t, { w: 6546, fill: i % 2 ? C.creamLite : C.white, size: 20 }),
  cell('☐', { w: 1600, fill: i % 2 ? C.creamLite : C.white, align: AlignmentType.CENTER, size: 22 }),
  cell('☐', { w: 1600, fill: i % 2 ? C.creamLite : C.white, align: AlignmentType.CENTER, size: 22 }),
]}))];
children.push(table(checkRows, [6546, 1600, 1600]));

children.push(h2('附錄 E　參考資料與延伸', C.green));
[
  '兒童權利公約（CRC）第 12 條、第 12 號一般性意見。',
  'Lundy, L. (2007). 「Voice is not enough」：參與四要素模型（空間・發聲・聆聽對象・影響力）。',
  'Hart, R. (1992). 兒童參與階梯（Ladder of Participation）。',
  '台灣兒少表意權知識平台 — 法規與公約、學術文獻、實務工具、CRC 國際審查、兒少專區。',
].forEach(t => children.push(numbered(t, 'ref')));
children.push(new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [tx('— 中華仁親社區關懷協會 × 李雨函　設計 —', { size: 18, color: C.grey })] }));

/* ═══════════════ DOCUMENT ═══════════════ */
const doc = new Document({
  numbering,
  styles: { default: { document: { run: { font: FONT, size: 22, color: C.ink } } } },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx('兒少表意權培力課程・我有話要說　—　', { size: 16, color: C.grey }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: C.grey })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(process.argv[2] || '兒少表意權培力課程教案.docx', buf);
  console.log('written', buf.length, 'bytes');
});
