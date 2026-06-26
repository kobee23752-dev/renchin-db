import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { curriculumSessions } from '../src/data/curriculum.js';

const require = createRequire(import.meta.url);
const docx = require(process.env.DOCX_PATH || 'docx');

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, Footer, PageNumber,
} = docx;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/curriculum');

const C = {
  purple: '8B6BAE', purpleDark: '5E4A78', cream: 'F2EAE1', creamLite: 'FAF7F4',
  ink: '3E2B1D', grey: '6B6B6B', white: 'FFFFFF',
};
const FONT = 'Microsoft JhengHei';
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1080;

const tx = (text, o = {}) => new TextRun({ text, font: FONT, ...o });
const thinB = { style: BorderStyle.SINGLE, size: 2, color: 'D9CBBA' };
const cellBorders = { top: thinB, bottom: thinB, left: thinB, right: thinB };

function cell(content, { w, fill, bold = false, color = C.ink, align = AlignmentType.LEFT, size = 21, valign = VerticalAlign.CENTER } = {}) {
  const paras = Array.isArray(content)
    ? content.map((c) => new Paragraph({ alignment: align, spacing: { after: 40, line: 280 }, children: [tx(c, { bold, color, size })] }))
    : [new Paragraph({ alignment: align, spacing: { line: 280 }, children: [tx(content, { bold, color, size })] })];
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, borders: cellBorders,
    shading: fill ? { fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 90, bottom: 90, left: 140, right: 140 }, verticalAlign: valign, children: paras,
  });
}
const table = (rows, colWidths) => new Table({ width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: colWidths, rows });

function h2(text) {
  return new Paragraph({ spacing: { before: 280, after: 120 }, children: [tx(text, { bold: true, size: 26, color: C.purpleDark })] });
}
const numbering = {
  config: [
    { reference: 'goal', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 300 } } } }] },
    { reference: 'ask', levels: [{ level: 0, format: LevelFormat.BULLET, text: '？', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 520, hanging: 300 } } } }] },
  ],
};

const WS_A = {
  title: '學習單：我的議題雷達（每人一份）',
  rows: [
    ['我關心的一件事', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['這是什麼問題？（What）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['它影響到誰？（Who）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['為什麼重要？（Why）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['可以跟誰說？（Whom）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['我希望它變成怎樣？（Wish）', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ],
  kw: [3200, 6546],
};
const WS_B = {
  title: '學習單：我們的提案單（每組一份）',
  rows: [
    ['提案小組', '＿＿＿＿＿＿＿＿＿＿　組員：＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['提案名稱', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['我們發現的問題', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['我們希望怎麼改', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['具體可以怎麼做', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
    ['想說給誰聽', '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿'],
  ],
  kw: [2700, 7046],
};

function buildSession(s) {
  const children = [];
  // banner
  children.push(new Paragraph({ shading: { fill: C.purple, type: ShadingType.CLEAR, color: 'auto' }, spacing: { after: 0 }, children: [tx(`  第 ${s.no} 堂　${s.title}`, { bold: true, size: 34, color: C.white })] }));
  children.push(new Paragraph({ shading: { fill: C.purple, type: ShadingType.CLEAR, color: 'auto' }, spacing: { after: 160 }, children: [tx(`  核心提問：${s.question}`, { italics: true, size: 21, color: C.white })] }));
  // info
  children.push(table([new TableRow({ children: [
    cell('參與面向', { w: 1600, fill: C.cream, bold: true, color: C.purpleDark, size: 19, align: AlignmentType.CENTER }),
    cell(s.dimension, { w: 2400, size: 19, align: AlignmentType.CENTER }),
    cell('時長', { w: 1100, fill: C.cream, bold: true, color: C.purpleDark, size: 19, align: AlignmentType.CENTER }),
    cell(s.duration, { w: 1500, size: 19, align: AlignmentType.CENTER }),
    cell('依據', { w: 1300, fill: C.cream, bold: true, color: C.purpleDark, size: 19, align: AlignmentType.CENTER }),
    cell(s.basis, { w: 1846, size: 19, align: AlignmentType.CENTER }),
  ]})], [1600, 2400, 1100, 1500, 1300, 1846]));
  // goals
  children.push(h2('學習目標'));
  s.goals.forEach((g) => children.push(new Paragraph({ numbering: { reference: 'goal', level: 0 }, spacing: { after: 60, line: 290 }, children: [tx(g)] })));
  // materials
  children.push(h2('教材教具'));
  children.push(new Paragraph({ spacing: { after: 100, line: 300 }, children: [tx(s.materials)] }));
  // flow
  children.push(h2('活動流程'));
  const flowHeader = new TableRow({ tableHeader: true, children: [
    cell('時間', { w: 1100, fill: C.purple, bold: true, color: C.white, align: AlignmentType.CENTER, size: 19 }),
    cell('活動', { w: 2200, fill: C.purple, bold: true, color: C.white, align: AlignmentType.CENTER, size: 19 }),
    cell('內容與步驟', { w: 6446, fill: C.purple, bold: true, color: C.white, align: AlignmentType.CENTER, size: 19 }),
  ]});
  const flowRows = [flowHeader, ...s.flow.map(([t, a, d], i) => new TableRow({ children: [
    cell(t, { w: 1100, fill: i % 2 ? C.creamLite : C.white, align: AlignmentType.CENTER, size: 19, bold: true, color: C.purpleDark }),
    cell(a, { w: 2200, fill: i % 2 ? C.creamLite : C.white, size: 19, bold: true }),
    cell(d, { w: 6446, fill: i % 2 ? C.creamLite : C.white, size: 19 }),
  ]}))];
  children.push(table(flowRows, [1100, 2200, 6446]));
  // questions
  children.push(h2('帶領者引導提問'));
  s.questions.forEach((q) => children.push(new Paragraph({ numbering: { reference: 'ask', level: 0 }, spacing: { after: 60, line: 290 }, children: [tx(q)] })));
  // tip
  children.push(new Paragraph({ shading: { fill: C.creamLite, type: ShadingType.CLEAR, color: 'auto' }, border: { left: { style: BorderStyle.SINGLE, size: 18, color: C.purple, space: 8 } }, spacing: { before: 200, after: 100, line: 300 }, indent: { left: 200 }, children: [tx('帶領小提醒　', { bold: true, color: C.purple }), tx(s.tip)] }));
  // extension + check
  children.push(new Paragraph({ spacing: { before: 120, after: 60, line: 290 }, children: [tx('延伸／回家任務：', { bold: true, color: C.purpleDark }), tx(s.extension)] }));
  children.push(new Paragraph({ spacing: { after: 60, line: 290 }, children: [tx('本堂檢核（', { bold: true, color: C.grey }), tx(s.dimension, { bold: true, color: C.purple }), tx('）：', { bold: true, color: C.grey }), tx(s.check, { color: C.grey })] }));
  // worksheet
  const ws = s.no === 4 ? WS_A : s.no === 5 ? WS_B : null;
  if (ws) {
    children.push(new Paragraph({ children: [new TextRun({ break: 1 })], pageBreakBefore: true }));
    children.push(h2(ws.title));
    children.push(table(ws.rows.map(([k, v]) => new TableRow({ children: [
      cell(k, { w: ws.kw[0], fill: C.creamLite, bold: true, color: C.purpleDark, size: 21, valign: VerticalAlign.TOP }),
      cell(v, { w: ws.kw[1], size: 21, color: 'BBBBBB', valign: VerticalAlign.TOP }),
    ]})), ws.kw));
  }
  return children;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
let done = 0;
for (const s of curriculumSessions) {
  const doc = new Document({
    numbering,
    styles: { default: { document: { run: { font: FONT, size: 22, color: C.ink } } } },
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(`兒少表意權培力課程・第 ${s.no} 堂 ${s.title}　—　`, { size: 16, color: C.grey }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: C.grey })] })] }) },
      children: buildSession(s),
    }],
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUT_DIR, `session-${s.no}.docx`), buf);
  done++;
}
console.log(`generated ${done} session docs into ${OUT_DIR}`);
