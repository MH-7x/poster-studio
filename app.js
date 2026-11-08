(() => {
'use strict';

/* =====================================================================
   Config
   ===================================================================== */
const FONTS = ['Poppins', 'Montserrat', 'Roboto', 'Raleway', 'Oswald', 'Bebas Neue', 'Anton', 'Archivo Black',
  'Playfair Display', 'Lora', 'Abril Fatface', 'Lobster', 'Pacifico', 'Dancing Script', 'Permanent Marker', 'Righteous',
  'Segoe UI', 'Arial', 'Georgia', 'Impact', 'Verdana'];

const textBase = o => Object.assign({
  on: true, text: '', font: 'Poppins', weight: 700, size: 60, color: '#ffffff', colorBg: '#12263f',
  grad: false, color2: '#ffd166', italic: false, upper: false, spacing: 0, lh: 1.1,
  shOn: true, shColor: '#000000', shA: 35, shBlur: 10, shX: 0, shY: 3,
  stOn: false, stColor: '#000000', stWidth: 4,
  bxOn: false, bxColor: '#f5a623', bxPad: 18, bxRadius: 10
}, o);

const DEFAULTS = {
  w: 1080, h: 1080,
  template: 'classic',
  font: 'Poppins',                       // contact bar font
  margin: 0, radius: 0, barPad: 32, barOpacity: 100, accentSize: 8,
  colors: { bg: '#eef2f9', bar: '#0b2a5b', accent: '#ffb703', barText: '#ffffff' },
  photo: { zoom: 1, fx: 0.5, fy: 0.5, brightness: 100, contrast: 100, saturation: 100, dim: 0 },
  headline: textBase({ text: 'Your Big Headline', weight: 800, size: 88, colorBg: '#0b2a5b', pos: 'bottom', align: 'left', scrim: true }),
  subtitle: textBase({ text: 'A short supporting line goes here', weight: 500, size: 40, lh: 1.3, colorBg: '#0b2a5b', shA: 30 }),
  logo: { src: '', size: 120, placement: 'bar-left' },
  contacts: [
    { type: 'phone', value: '+1 234 567 890', on: true },
    { type: 'web', value: 'www.yourbrand.com', on: true }
  ],
  contactSize: 26, cols: 0, iconStyle: 'circle'
};

const TEMPLATES = {
  classic:  { name: 'Classic',  d: { margin: 0,  radius: 0 } },
  overlay:  { name: 'Overlay',  d: { margin: 32, radius: 28 }, floating: true },
  framed:   { name: 'Framed',   d: { margin: 36, radius: 24 }, floating: true },
  diagonal: { name: 'Diagonal', d: { margin: 0,  radius: 0 } },
  wave:     { name: 'Wave',     d: { margin: 0,  radius: 0 } },
  pop:      { name: 'Pop',      d: { margin: 48, radius: 28 } },
  leaf:     { name: 'Leaf',     d: { margin: 36, radius: 110 }, floating: true },
  outline:  { name: 'Outline',  d: { margin: 56, radius: 18 }, floating: true },
  arch:     { name: 'Arch',     d: { margin: 48, radius: 28 }, bgText: true },
  circle:   { name: 'Circle',   d: { margin: 48, radius: 0 },  bgText: true },
  magazine: { name: 'Magazine', d: { margin: 0,  radius: 0 },  bgText: true },
  ribbon:   { name: 'Ribbon',   d: { margin: 0,  radius: 0 }, noScrim: true },
  curve:    { name: 'Curve',    d: { margin: 0,  radius: 90 } },
  pill:     { name: 'Pill',     d: { margin: 48, radius: 28 }, bgText: true },
  leafr:    { name: 'Leaf Flip',d: { margin: 36, radius: 110 }, floating: true },
  split:    { name: 'Split',    d: { margin: 44, radius: 28 }, bgText: true },
  header:   { name: 'Header',   d: { margin: 0,  radius: 0 },  bgText: true },
  diamond:  { name: 'Diamond',  d: { margin: 48, radius: 0 },  bgText: true, poly: [[.5, 0], [1, .5], [.5, 1], [0, .5]] },
  hexagon:  { name: 'Hexagon',  d: { margin: 48, radius: 0 },  bgText: true, poly: [[.25, 0], [.75, 0], [1, .5], [.75, 1], [.25, 1], [0, .5]] },
  slant:    { name: 'Slant',    d: { margin: 40, radius: 0 },  bgText: true, poly: [[.1, 0], [1, 0], [.9, 1], [0, 1]] },
  cut:      { name: 'Corner Cut', d: { margin: 32, radius: 0 }, floating: true, poly: [[0, 0], [.8, 0], [1, .2], [1, 1], [0, 1]] },
  stack:    { name: 'Stack',    d: { margin: 56, radius: 20 } },
  border:   { name: 'Border',   d: { margin: 44, radius: 0 },  floating: true },
  duotone:  { name: 'Duotone',  d: { margin: 0,  radius: 0 } },
  diagonalr:{ name: 'Slope Right', d: { margin: 0, radius: 0 } },
  zigzag:   { name: 'Zigzag',   d: { margin: 0,  radius: 0 } },
  neon:     { name: 'Neon Frame', d: { margin: 64, radius: 36 }, floating: true },
  cardcircle:{ name: 'Card Circle', d: { margin: 40, radius: 44 }, floating: true, barInset: 1.7, bgText: true },
  hexside:  { name: 'Hex Side', d: { margin: 44, radius: 0 }, bgText: true, poly: [[.25, 0], [.75, 0], [1, .5], [.75, 1], [.25, 1], [0, .5]] },
  slantpanel:{ name: 'Slant Panel', d: { margin: 0, radius: 0 }, noScrim: true },
  glass:    { name: 'Glass Panel', d: { margin: 36, radius: 40 }, noScrim: true },
  news:     { name: 'Headline News', d: { margin: 0, radius: 0 }, noScrim: true },
  tilt:     { name: 'Tilt Card', d: { margin: 48, radius: 36 }, floating: true, noScrim: true },
  octagon:  { name: 'Octagon',  d: { margin: 48, radius: 0 }, bgText: true, poly: [[.3, 0], [.7, 0], [1, .3], [1, .7], [.7, 1], [.3, 1], [0, .7], [0, .3]] },
  fade:     { name: 'Fade',     d: { margin: 0,  radius: 0 }, bgText: true },
  editorial:{ name: 'Editorial', d: { margin: 0, radius: 0 }, bgText: true }
};

const PALETTES = [
  ['Royal Gold',   '#eef2f9', '#0b2a5b', '#ffb703', '#ffffff', '#0b2a5b'],
  ['Sunset',       '#fff1ec', '#2b1b3d', '#ff6b6b', '#ffffff', '#2b1b3d'],
  ['Forest',       '#eef4ee', '#12372a', '#f2c14e', '#ffffff', '#12372a'],
  ['Midnight Mint','#0b0b10', '#13141a', '#00e0b8', '#ffffff', '#ffffff'],
  ['Rose',         '#fff0f5', '#7a1f4d', '#ffd6e0', '#ffffff', '#7a1f4d'],
  ['Clean Red',    '#ffffff', '#ffffff', '#e63946', '#1d1d1f', '#1d1d1f'],
  ['Ocean',        '#e6f4f8', '#014f6b', '#2ec4b6', '#ffffff', '#014f6b'],
  ['Coral Navy',   '#fff4ec', '#1d3557', '#ff7f50', '#ffffff', '#1d3557'],
  ['Lavender',     '#f1ecff', '#3b2a6b', '#c9b6ff', '#ffffff', '#3b2a6b'],
  ['Terracotta',   '#f6ebe0', '#9c4a2f', '#f4d8a8', '#ffffff', '#5b2a17'],
  ['Emerald Luxe', '#0e1a16', '#0b3b2e', '#d4af37', '#ffffff', '#f5ecd0'],
  ['Charcoal Lime','#121212', '#1c1c1c', '#c6ff3d', '#ffffff', '#ffffff'],
  ['Bubblegum',    '#ffe3f1', '#ff4f9a', '#ffffff', '#ffffff', '#7a1148'],
  ['Sky',          '#eaf4ff', '#1e6fe0', '#ffd23f', '#ffffff', '#123b7a'],
  ['Olive Sand',   '#f3eddc', '#4a5a2a', '#e8c872', '#ffffff', '#3a4520'],
  ['Burgundy',     '#fbf3e8', '#6b1020', '#f0c987', '#ffffff', '#6b1020'],
  ['Ink & Red',    '#f2f2f2', '#111111', '#ff3b30', '#ffffff', '#111111'],
  ['Teal Peach',   '#e8f7f4', '#0f4c5c', '#ffa987', '#ffffff', '#0f4c5c'],
  ['Neon Violet',  '#12061f', '#2a0e4a', '#ff3df2', '#ffffff', '#ffffff'],
  ['Citrus',       '#fffbe6', '#ff9f1c', '#2b2d42', '#1b1b1b', '#5a2d00'],
  ['Slate Blue',   '#eef1f6', '#2f3e5c', '#8ecae6', '#ffffff', '#2f3e5c'],
  ['Gold & Black', '#0a0a0a', '#0a0a0a', '#d4af37', '#f5ecd0', '#f5ecd0'],
  ['Mint Fresh',   '#effaf3', '#1f7a5a', '#ffe66d', '#ffffff', '#145a41'],
  ['Crimson Night','#1b0a10', '#7b0828', '#ffcad4', '#ffffff', '#ffffff'],
  ['Sunrise',      '#fff6e5', '#d62828', '#fcbf49', '#ffffff', '#7a1010'],
  ['Ocean Deep',   '#0a1a2f', '#0d3b66', '#f4d35e', '#ffffff', '#ffffff'],
  ['Peachy',       '#fff0e8', '#e76f51', '#264653', '#ffffff', '#264653'],
  ['Matcha',       '#eef3e6', '#5b7f3a', '#f6e27f', '#ffffff', '#2f4a1c'],
  ['Berry',        '#fbeef6', '#6a1b5e', '#ff8fcf', '#ffffff', '#4a0f41'],
  ['Steel',        '#eceff3', '#37474f', '#ffb300', '#ffffff', '#263238'],
  ['Aqua Pop',     '#e0fbfc', '#00587a', '#ff6b35', '#ffffff', '#00364d'],
  ['Plum & Gold',  '#f7eefa', '#4a1d6b', '#f2b84b', '#ffffff', '#4a1d6b'],
  ['Cherry',       '#fff0f0', '#b3123b', '#ffd166', '#ffffff', '#6e0a24'],
  ['Cocoa',        '#f4ebe3', '#4a2c1a', '#e0a96d', '#ffffff', '#3b2315'],
  ['Lemon Ink',    '#fffde0', '#1d1d1d', '#ffe600', '#ffffff', '#1d1d1d'],
  ['Arctic',       '#f2fbff', '#0f3057', '#00bcd4', '#ffffff', '#0f3057'],
  ['Mango',        '#fff8e1', '#f57c00', '#4e342e', '#ffffff', '#4e342e'],
  ['Sage',         '#eef2ee', '#3d5a4c', '#e9c46a', '#ffffff', '#2c4337'],
  ['Indigo Dawn',  '#eef0ff', '#283593', '#ff8a65', '#ffffff', '#1a237e'],
  ['Dark Cherry',  '#150a0d', '#3a0f1c', '#ff4d6d', '#ffffff', '#ffffff'],
  ['Graphite Cyan','#101418', '#1b232b', '#22d3ee', '#ffffff', '#ffffff'],
  ['Coral Reef',   '#fff1ee', '#ff5e5b', '#00cecb', '#ffffff', '#2b2d42'],
  ['Blush & Navy', '#fdf0f0', '#22223b', '#f2a6a0', '#ffffff', '#22223b'],
  ['Pistachio',    '#f4fae8', '#2e5339', '#b5e48c', '#ffffff', '#24402d'],
  ['Sapphire',     '#eaf1ff', '#0b3d91', '#7bb6ff', '#ffffff', '#0b3d91'],
  ['Copper',       '#fbf2ea', '#2f2a28', '#d27d4c', '#ffffff', '#2f2a28'],
  ['Retro Teal',   '#fdf6e3', '#1b6b73', '#f0a202', '#ffffff', '#12494f'],
  ['Pure Black',   '#000000', '#000000', '#ffffff', '#ffffff', '#ffffff']
];

const TEXT_PRESETS = {
  'Clean':       t => Object.assign(t, { shOn: false, stOn: false, bxOn: false, grad: false }),
  'Soft shadow': t => Object.assign(t, { shOn: true, shColor: '#000000', shA: 40, shBlur: 16, shX: 0, shY: 5, stOn: false, bxOn: false, grad: false }),
  'Hard shadow': t => Object.assign(t, { shOn: true, shColor: '#000000', shA: 85, shBlur: 0, shX: 6, shY: 6, stOn: false, bxOn: false, grad: false }),
  'Neon glow':   t => Object.assign(t, { shOn: true, shColor: '#00e5ff', shA: 100, shBlur: 26, shX: 0, shY: 0, stOn: false, bxOn: false, grad: false }),
  'Outline':     t => Object.assign(t, { shOn: false, stOn: true, stColor: '#000000', stWidth: 4, bxOn: false, grad: false }),
  'Highlight':   t => Object.assign(t, { shOn: false, stOn: false, bxOn: true, bxColor: state.colors.accent, bxPad: 18, bxRadius: 10, grad: false },
                     { [bgTextMode() ? 'colorBg' : 'color']: lum(state.colors.accent) > 0.6 ? '#111111' : '#ffffff' }),
  'Gradient':    t => Object.assign(t, { grad: true, color2: '#ffd166', shOn: true, shColor: '#000000', shA: 30, shBlur: 12, shX: 0, shY: 4, stOn: false, bxOn: false })
};

const ICONS = {
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  mail:  ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
  web:   ['M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
  pin:   ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6z'],
  at:    ['M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8z', 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94'],
  instagram: ['M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z', 'M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8z', 'M17.5 6.5h.01']
};
const ICON_PATHS = Object.fromEntries(Object.entries(ICONS).map(([k, v]) => [k, v.map(d => new Path2D(d))]));
const ICON_LABELS = { phone: 'Phone', mail: 'Email', web: 'Website', pin: 'Address', at: 'Handle (@)', instagram: 'Instagram' };

const LS_CURRENT = 'posterStudio.current';
const LS_DESIGNS = 'posterStudio.designs';

/* =====================================================================
   State & helpers
   ===================================================================== */
const clone = o => JSON.parse(JSON.stringify(o));
function merge(base, over) {
  if (!over || typeof over !== 'object') return base;
  for (const k of Object.keys(over)) {
    if (Array.isArray(over[k])) base[k] = clone(over[k]);
    else if (over[k] && typeof over[k] === 'object' && base[k] && typeof base[k] === 'object') merge(base[k], over[k]);
    else base[k] = over[k];
  }
  return base;
}
let state = clone(DEFAULTS);
let photoImg = null, logoImg = null;
let activeText = 'headline';
const local = { exportScale: 1 };

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const mainCv = $('#cv');
let cv = mainCv, ctx = mainCv.getContext('2d');
const stage = $('#stage'), statusEl = $('#status');

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const bgTextMode = () => !!TEMPLATES[state.template].bgText;
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}
function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}
const loadImage = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
function say(msg) { statusEl.textContent = msg; clearTimeout(say.t); say.t = setTimeout(() => statusEl.textContent = '', 3500); }

// binding paths: "T.size" -> active text, "T.C" -> active text color (photo or background variant)
function rp(p) {
  if (p === 'T.C') return `${activeText}.${bgTextMode() ? 'colorBg' : 'color'}`;
  return p.replace(/^T\./, activeText + '.');
}
const getP = (o, p) => p.split('.').reduce((a, k) => a && a[k], o);
function setP(o, p, v) { const ks = p.split('.'), l = ks.pop(); ks.reduce((a, k) => a[k], o)[l] = v; }

/* ---------- storage ---------- */
function lsGet(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } }

/* =====================================================================
   Layout engine
   ===================================================================== */
function fontStr(weight, size, family, italic) {
  return `${italic ? 'italic ' : ''}${weight} ${size}px "${family || state.font}", system-ui, sans-serif`;
}
function setTextFont(T, size, u) {
  ctx.font = fontStr(T.weight, size, T.font, T.italic);
  if ('letterSpacing' in ctx) ctx.letterSpacing = (T.spacing * u) + 'px';
}
function resetSpacing() { if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'; }

function wrap(text, maxW) {
  const out = [];
  String(text).split('\n').forEach(par => {
    let line = '';
    par.split(/\s+/).filter(Boolean).forEach(w => {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t;
    });
    out.push(line);
  });
  return out;
}

function measureBlocks(maxW, u) {
  const blocks = [];
  ['headline', 'subtitle'].forEach(k => {
    const T = state[k];
    if (!T.on || !T.text.trim()) return;
    let size = T.size * u, lines;
    const avail = maxW - (T.bxOn ? 2 * T.bxPad * u : 0), txt = T.upper ? T.text.toUpperCase() : T.text;
    for (let pass = 0; pass < 3; pass++) {
      setTextFont(T, size, u);
      lines = wrap(txt, avail);
      const widest = Math.max(...lines.map(l => ctx.measureText(l).width));
      if (widest <= avail + 1) break;
      size = Math.max(size * avail / widest * 0.98, T.size * u * 0.4);   // shrink so a long word never spills out of its area
    }
    blocks.push({ k, T, size, lh: size * T.lh, lines });
  });
  resetSpacing();
  if (!blocks.length) return null;
  const gap = blocks.length > 1 ? blocks[0].size * 0.25 : 0;
  const h = blocks.reduce((s, b) => s + b.lines.length * b.lh, 0) + gap;
  return { blocks, gap, h };
}

function layout() {
  const S = state, W = S.w, H = S.h, T = S.template, TP = TEMPLATES[T];
  const u = Math.sqrt(W * H) / 1080;
  const m = S.margin * u, pad = S.barPad * u, ac = S.accentSize * u, r = S.radius * u;
  const items = S.contacts.filter(c => c.on && c.value.trim());
  const place = S.logo.placement;
  const logoInBar = !!logoImg && place.startsWith('bar');
  const edgeAmp = (T === 'diagonal' || T === 'diagonalr') ? 60 * u : T === 'wave' ? 44 * u : T === 'zigzag' ? 40 * u : 0;
  const edge = T === 'diagonal' ? x => edgeAmp * (1 - x / W)
    : T === 'diagonalr' ? x => edgeAmp * (x / W)
    : T === 'wave' ? x => edgeAmp * (0.5 + 0.5 * Math.cos(x / W * Math.PI * 3))
    : T === 'zigzag' ? x => edgeAmp * Math.abs(((x / W * 8) % 2) - 1) : () => 0;
  const floating = !!TP.floating;
  const bi = m * (TP.barInset || 1);
  const barW = floating ? W - 2 * bi : W;
  const innerW = barW - 2 * pad;

  let logoH = 0, logoW = 0;
  if (logoImg) {
    logoH = S.logo.size * u;
    logoW = logoH * logoImg.width / logoImg.height;
    const maxW = place === 'bar-left' ? innerW * 0.38 : place === 'bar-top' ? innerW * 0.8 : W * 0.4;
    if (logoW > maxW) { logoW = maxW; logoH = logoW * logoImg.height / logoImg.width; }
  }
  const left = logoInBar && place === 'bar-left';
  const gridW = left ? innerW - logoW - pad : innerW;

  ctx.font = fontStr(500, 20);
  const fs = S.contactSize * u;
  const iconS = S.iconStyle === 'none' ? 0 : fs * 1.6;
  const gap = fs * 0.5;
  let cols = S.cols || Math.max(1, Math.min(4, Math.floor(gridW / (fs * 13))));
  cols = Math.min(cols, Math.max(1, items.length));
  const rows = items.length ? Math.ceil(items.length / cols) : 0;
  const rowH = Math.max(iconS, fs) * 1.4;
  const gridH = rows * rowH, cellW = gridW / cols;
  const contentH = left ? Math.max(gridH, logoH)
    : logoInBar ? logoH + (items.length ? pad * 0.7 : 0) + gridH : gridH;
  const hasBar = logoInBar || items.length > 0;
  const barH = hasBar ? contentH + 2 * pad + edgeAmp : 0;

  const bar = floating ? { x: bi, y: H - barH - bi, w: barW, h: barH } : { x: 0, y: H - barH, w: W, h: barH };

  const tb = measureBlocks(W - 2 * pad, u);
  const tz = TP.bgText && tb ? tb.h + pad * 1.3 : 0;

  let photo, photoR = 0, textArea = null, ring = null, offsetShape = false, splitTb = null, rot = 0, deco = null;
  const barTop = hasBar ? bar.y : H;
  switch (T) {
    case 'overlay': photo = { x: 0, y: 0, w: W, h: H }; break;
    case 'header': {
      const bottom = barTop - (m ? m * 0.6 : 0);
      photo = { x: m, y: tz, w: W - 2 * m, h: bottom - tz }; photoR = r;
      textArea = { x: 0, w: W, y0: pad * 0.65, y1: tz - pad * 0.65, pos: 'top' };
      break;
    }
    case 'cardcircle': {
      const card = { x: m, y: m, w: W - 2 * m, h: H - 2 * m };
      const aBottom = hasBar ? bar.y - pad * 0.6 : H - m - pad;
      const d = Math.max(Math.min(card.w * 0.44, aBottom - card.y - pad * 2), 60);
      const cx = card.x + card.w - d / 2 - pad * 0.8, cy = aBottom - d / 2 - pad * 0.2;
      photo = { x: cx - d / 2, y: cy - d / 2, w: d, h: d }; photoR = d / 2;
      const tw = Math.max(card.w - d - pad * 3, 120);
      splitTb = measureBlocks(tw, u);
      textArea = { x: card.x, w: tw + 2 * pad, y0: card.y + pad * 0.9, y1: aBottom - pad, pos: 'top', align: 'left' };
      deco = { card, cx, cy, d }; break;
    }
    case 'hexside': {
      const mm = Math.max(m, pad * 0.8), availH = Math.max(barTop - 2 * mm, 100);
      const pw = Math.min(W * 0.54, availH / 0.88);
      photo = { x: W - mm - pw, y: mm + (availH - pw * 0.88) / 2, w: pw, h: pw * 0.88 };
      const tw = Math.max(photo.x - mm - pad * 0.5, 120);
      splitTb = measureBlocks(tw, u);
      textArea = { x: mm - pad, w: tw + 2 * pad, y0: mm, y1: mm + availH, pos: 'center', align: 'left' };
      offsetShape = true; break;
    }
    case 'slantpanel': {
      photo = { x: 0, y: 0, w: W, h: H - barH };
      const ph = photo.h, pw = W * 0.6, sl = W * 0.12, tw = Math.max(pw - sl - pad * 2, 120);
      splitTb = measureBlocks(tw, u);
      textArea = { x: 0, w: tw + 2 * pad, y0: pad, y1: ph - pad, pos: null, align: 'left' };
      deco = { ph, pw, sl }; break;
    }
    case 'glass': {
      photo = { x: 0, y: 0, w: W, h: H - barH };
      const panel = { x: W * 0.5, y: m, w: W * 0.5 - m, h: Math.max(photo.h - 2 * m, 60) };
      splitTb = measureBlocks(Math.max(panel.w - 2 * pad, 120), u);
      textArea = { x: panel.x, w: panel.w, y0: panel.y + pad, y1: panel.y + panel.h - pad, pos: null, align: 'left' };
      deco = { panel }; break;
    }
    case 'news': photo = { x: 0, y: 0, w: W, h: H - barH }; break;
    case 'tilt': {
      const bottom = hasBar ? bar.y - m * 0.5 : H - m, availH = Math.max(bottom - m, 100);
      const pw = Math.min((W - 2 * m) * 0.5, availH / 1.2), ph = Math.min(pw * 1.25, availH);
      photo = { x: W - m - pw - pad * 0.4, y: m + (availH - ph) / 2, w: pw, h: ph }; photoR = r; rot = -0.07;
      const tw = Math.max(photo.x - m - pad * 1.4, 120);
      splitTb = measureBlocks(tw, u);
      textArea = { x: m, w: tw + 2 * pad, y0: m + pad, y1: bottom - pad, pos: null, align: 'left' };
      break;
    }
    case 'octagon': {
      const mm = Math.max(m, pad * 0.8), availH = Math.max(barTop - 2 * mm, 100);
      const s = Math.min(W * 0.5, availH);
      photo = { x: mm, y: mm + (availH - s) / 2, w: s, h: s };
      const tx = photo.x + s + mm * 0.5, tw = Math.max(W - mm - tx, 120);
      splitTb = measureBlocks(tw, u);
      textArea = { x: tx - pad, w: tw + 2 * pad, y0: mm, y1: mm + availH, pos: 'center', align: 'right' };
      offsetShape = true; break;
    }
    case 'fade': {
      photo = { x: 0, y: 0, w: W, h: H - barH };
      textArea = { x: 0, w: W, y0: pad, y1: barTop - pad, pos: 'bottom', align: 'center' }; break;
    }
    case 'editorial': {
      const ty0 = pad * 3, th = tb ? tb.h : 0, lineH = Math.max(ac * 1.5, 6 * u);
      const lineY = ty0 + th + pad * 0.35, zoneBottom = tb ? lineY + lineH : ty0, pTop = zoneBottom + pad * 0.8;
      photo = { x: 0, y: pTop, w: W, h: Math.max(barTop - pTop, 60) };
      textArea = { x: 0, w: W, y0: ty0, y1: ty0 + th, pos: 'top', align: 'left' };
      deco = { lineY, lineH, hasText: !!tb }; break;
    }
    case 'framed': case 'outline': case 'leaf': case 'leafr': case 'cut': case 'border': case 'neon': {
      const bottom = hasBar ? bar.y - m * 0.6 : H - m;
      photo = { x: m, y: m, w: W - 2 * m, h: bottom - m };
      photoR = T === 'leaf' ? [r, 0, r, 0] : T === 'leafr' ? [0, r, 0, r] : r; break;
    }
    case 'curve': photo = { x: 0, y: 0, w: W, h: H - barH }; photoR = [0, 0, r, r]; break;
    case 'split': {
      const mm = Math.max(m, pad * 0.8), bh = Math.max(barTop - mm * 1.6 - mm, 80);
      const pw = (W - 3 * mm) * 0.52, tx = 2 * mm + pw, tw = W - tx - mm;
      photo = { x: mm, y: mm, w: pw, h: bh }; photoR = r;
      splitTb = measureBlocks(tw, u);
      textArea = { x: tx - pad, w: tw + 2 * pad, y0: mm, y1: mm + bh, pos: 'center' };
      offsetShape = true; break;
    }
    case 'diagonal': case 'diagonalr': case 'wave': case 'zigzag': photo = { x: 0, y: 0, w: W, h: H - barH + edgeAmp }; break;
    case 'pop': case 'stack': photo ={ x: m, y: m, w: W - 2 * m, h: H - barH - 2 * m }; photoR = r; offsetShape = true; break;
    case 'arch': case 'circle': case 'pill': case 'diamond': case 'hexagon': case 'slant': {
      const mm = Math.max(m, pad * 0.8);
      const top = mm + tz + (tz ? pad * 0.3 : 0), bottom = barTop - mm * 0.8;
      const bh = Math.max(bottom - top, 40);
      textArea = { x: 0, w: W, y0: mm, y1: mm + tz, pos: 'top' };
      if (T === 'arch' || T === 'pill') {
        photo = { x: mm, y: top, w: W - 2 * mm, h: bh };
        photoR = T === 'pill' ? photo.w / 2 : [photo.w / 2, photo.w / 2, r, r]; offsetShape = true;
      } else if (T === 'diamond' || T === 'hexagon') {
        const s = Math.max(Math.min(W - 2 * mm, T === 'hexagon' ? bh * 1.15 : bh), 40), hh = T === 'hexagon' ? s * 0.88 : s;
        photo = { x: (W - s) / 2, y: top + (bh - hh) / 2, w: s, h: hh }; offsetShape = true;
      } else if (T === 'slant') {
        photo = { x: mm, y: top, w: W - 2 * mm, h: bh }; offsetShape = true;
      } else {
        const ringGap = ac * 1.6 + 8 * u;
        const s = Math.max(Math.min(W - 2 * mm, bh) - 2 * ringGap, 40);
        photo = { x: (W - s) / 2, y: top + (bh - s) / 2, w: s, h: s };
        photoR = s / 2; ring = { gap: ringGap };
      }
      break;
    }
    case 'magazine': {
      const ph = Math.max(barTop - tz, 40);
      photo = { x: 0, y: 0, w: W, h: ph };
      photoR = [0, 0, r, r];
      textArea = { x: 0, w: W, y0: ph + pad * 0.65, y1: barTop - pad * 0.65, pos: 'top' };
      break;
    }
    default: photo = { x: 0, y: 0, w: W, h: H - barH };
  }
  photo.h = Math.max(photo.h, 20);
  if (!textArea) {
    textArea = { x: photo.x, w: photo.w, y0: photo.y + pad,
      y1: Math.min(photo.y + photo.h, hasBar ? bar.y - (floating ? pad * 0.3 : 0) : Infinity) - pad, pos: null };
  }
  return { u, m, pad, r, ac, items, logoInBar, logoW, logoH, left, gridW, fs, iconS, gap, cols, rows, rowH, gridH, cellW,
    contentH, hasBar, barH, bar, photo, photoR, edgeAmp, edge, floating, tb: splitTb || tb, textArea, ring, offsetShape, poly: TP.poly || null, rot, deco, barTop };
}

/* =====================================================================
   Drawing
   ===================================================================== */
function rr(x, y, w, h, r) {
  const lim = Math.min(w, h) / 2;
  const f = v => Math.max(0, Math.min(v, lim));
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, Array.isArray(r) ? r.map(f) : f(r));
}

// photo outline: polygon templates use normalized points, others a rounded rect
function shapePath(L, x, y, w, h) {
  if (!L.poly) return rr(x, y, w, h, L.photoR);
  ctx.beginPath();
  L.poly.forEach(([px, py], i) => (i ? ctx.lineTo(x + px * w, y + py * h) : ctx.moveTo(x + px * w, y + py * h)));
  ctx.closePath();
}

function coverParams(rect) {
  const iw = photoImg.width, ih = photoImg.height, P = state.photo;
  const s = Math.max(rect.w / iw, rect.h / ih) * P.zoom, dw = iw * s, dh = ih * s;
  const fx = clamp(P.fx, rect.w / (2 * dw), 1 - rect.w / (2 * dw));
  const fy = clamp(P.fy, rect.h / (2 * dh), 1 - rect.h / (2 * dh));
  return { dw, dh, fx, fy, x: rect.x + rect.w / 2 - fx * dw, y: rect.y + rect.h / 2 - fy * dh };
}

function drawIcon(type, cx, cy, size) {
  const S = state, paths = ICON_PATHS[type] || ICON_PATHS.web;
  ctx.save();
  let stroke, k;
  if (S.iconStyle === 'circle') {
    ctx.fillStyle = S.colors.accent;
    ctx.beginPath(); ctx.arc(cx, cy, size / 2, 0, Math.PI * 2); ctx.fill();
    stroke = lum(S.colors.accent) > 0.6 ? '#111111' : '#ffffff';
    k = size * 0.5 / 24;
  } else { stroke = S.colors.accent; k = size * 0.75 / 24; }
  ctx.translate(cx - 12 * k, cy - 12 * k); ctx.scale(k, k);
  ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  paths.forEach(p => ctx.stroke(p));
  ctx.restore();
}

function fitText(text, maxW, size, weight) {
  let s = size;
  ctx.font = fontStr(weight, s);
  while (ctx.measureText(text).width > maxW && s > size * 0.7) { s -= 1; ctx.font = fontStr(weight, s); }
  if (ctx.measureText(text).width > maxW) {
    while (text.length > 1 && ctx.measureText(text + '…').width > maxW) text = text.slice(0, -1);
    text += '…';
  }
  return text;
}

function render(forExport) {
  const S = state;
  if (cv.width !== S.w) cv.width = S.w;
  if (cv.height !== S.h) cv.height = S.h;
  const L = layout(), { photo, bar, u, pad, ac } = L, T = S.template, TP = TEMPLATES[T];
  ctx.clearRect(0, 0, S.w, S.h);
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; resetSpacing();

  ctx.fillStyle = S.colors.bg; ctx.fillRect(0, 0, S.w, S.h);
  drawDecor(L, 'under');

  // offset accent shape (pop / arch)
  if (L.offsetShape && L.m > 0) {
    const off = Math.max(L.m, pad * 0.8) * 0.3;
    if (T === 'stack') { ctx.fillStyle = S.colors.bar; shapePath(L, photo.x + off * 2, photo.y + off * 2, photo.w, photo.h); ctx.fill(); }
    ctx.fillStyle = S.colors.accent;
    shapePath(L, photo.x + off, photo.y + off, photo.w, photo.h); ctx.fill();
  }
  // circle ring
  if (L.ring) {
    ctx.strokeStyle = S.colors.accent; ctx.lineWidth = Math.max(ac, 2 * u);
    ctx.beginPath(); ctx.arc(photo.x + photo.w / 2, photo.y + photo.h / 2, photo.w / 2 + L.ring.gap - ctx.lineWidth / 2, 0, Math.PI * 2); ctx.stroke();
  }

  // curve: bar color behind the rounded photo corners
  if (T === 'curve') { ctx.fillStyle = S.colors.bar; ctx.fillRect(0, photo.y + photo.h - L.r * 2, S.w, S.h); }

  // photo (tilt layouts rotate it around its centre)
  let rotated = false;
  if (L.rot) {
    const rx = photo.x + photo.w / 2, ry = photo.y + photo.h / 2;
    ctx.save(); ctx.translate(rx, ry); ctx.rotate(L.rot); ctx.translate(-rx, -ry); rotated = true;
  }
  ctx.save();
  shapePath(L, photo.x, photo.y, photo.w, photo.h); ctx.clip();
  if (photoImg) {
    const c = coverParams(photo), P = S.photo, duo = T === 'duotone', gray = duo || T === 'news';
    const f = (gray || P.brightness !== 100 || P.contrast !== 100 || P.saturation !== 100) && 'filter' in ctx;
    if (f) ctx.filter = `brightness(${P.brightness}%) contrast(${P.contrast}%) saturate(${gray ? 0 : P.saturation}%)${duo ? ' contrast(1.15)' : ''}`;
    ctx.drawImage(photoImg, c.x, c.y, c.dw, c.dh);
    if (f) ctx.filter = 'none';
    if (duo) {
      ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = S.colors.accent; ctx.fillRect(photo.x, photo.y, photo.w, photo.h);
      ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = rgba(S.colors.bar, 0.3); ctx.fillRect(photo.x, photo.y, photo.w, photo.h);
      ctx.globalCompositeOperation = 'source-over';
    }
    if (P.dim > 0) { ctx.fillStyle = `rgba(0,0,0,${P.dim / 100})`; ctx.fillRect(photo.x, photo.y, photo.w, photo.h); }
  } else {
    const g = ctx.createLinearGradient(photo.x, photo.y, photo.x + photo.w, photo.y + photo.h);
    g.addColorStop(0, '#8e9bc0'); g.addColorStop(1, S.colors.accent);
    ctx.fillStyle = g; ctx.fillRect(photo.x, photo.y, photo.w, photo.h);
    if (!forExport) {
      ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.textAlign = 'center';
      ctx.font = fontStr(600, 34 * u, 'DM Sans');
      ctx.fillText('Upload or drop your photo', photo.x + photo.w / 2, photo.y + photo.h / 2);
      ctx.textAlign = 'left';
    }
  }
  const tb = L.tb, H = S.headline;
  if (!TP.bgText && !TP.noScrim && H.scrim && tb && H.pos !== 'center') {
    const h = tb.h + pad * 3, ta = L.textArea;
    if (H.pos === 'top') {
      const g = ctx.createLinearGradient(0, photo.y, 0, photo.y + h);
      g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(photo.x, photo.y, photo.w, h);
    } else {
      const yb = ta.y1 + pad;
      const g = ctx.createLinearGradient(0, yb, 0, yb - h);
      g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(photo.x, yb - h, photo.w, h);
    }
  }
  ctx.restore();
  if (T === 'tilt') { ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 8 * u; shapePath(L, photo.x, photo.y, photo.w, photo.h); ctx.stroke(); }
  if (rotated) ctx.restore();
  drawDecor(L, 'over');

  // logo on photo
  if (logoImg && S.logo.placement.startsWith('photo')) {
    const lx = S.logo.placement === 'photo-left' ? photo.x + pad : photo.x + photo.w - pad - L.logoW;
    ctx.drawImage(logoImg, lx, photo.y + pad, L.logoW, L.logoH);
  }

  if (tb) drawText(tb, L.textArea, pad, u, TP.bgText, bandFor(L, T));
  if (L.hasBar) drawBar(L, T);

  // border template: thick accent frame
  if (T === 'border' && L.m > 0) {
    ctx.strokeStyle = S.colors.accent; ctx.lineWidth = L.m * 0.7;
    ctx.strokeRect(L.m * 0.35, L.m * 0.35, S.w - L.m * 0.7, S.h - L.m * 0.7);
  }

  // outline template: accent keyline around everything
  if (T === 'outline' && L.m > 0) {
    const k = L.m * 0.4;
    ctx.strokeStyle = S.colors.accent; ctx.lineWidth = Math.max(ac * 0.6, 2 * u);
    rr(k, k, S.w - 2 * k, S.h - 2 * k, L.r + k * 0.5); ctx.stroke();
  }
  return L;
}

// A coloured band drawn behind the text block (Ribbon, Headline News)
function bandFor(L, T) {
  const S = state, ta = L.textArea, pad = L.pad, ac = L.ac;
  if (T === 'ribbon') return (y, h) => { ctx.fillStyle = S.colors.bar; ctx.fillRect(ta.x, y - pad * 0.5, ta.w, h + pad); };
  if (T === 'news') return (y, h) => {
    const x0 = ta.x, x1 = ta.x + ta.w * 0.88, sk = pad * 1.2, y0 = y - pad * 0.5, y1 = y + h + pad * 0.5;
    ctx.fillStyle = S.colors.bar;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.lineTo(x1 - sk, y1); ctx.lineTo(x0, y1); ctx.closePath(); ctx.fill();
    ctx.fillStyle = S.colors.accent; ctx.fillRect(x0, y1, (x1 - x0) * 0.6, Math.max(ac, 4 * L.u));
  };
  return null;
}

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const c = v => Math.round(clamp(v + (f < 0 ? v * f : (255 - v) * f), 0, 255));
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
}

// Template-specific decoration. 'under' runs before the photo, 'over' after it (before text and bar).
function drawDecor(L, phase) {
  const S = state, T = S.template, C = S.colors, W = S.w, H = S.h, u = L.u, pad = L.pad, ac = L.ac, D = L.deco, ph = L.photo;
  const poly = (pts, fill) => {
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
  };
  if (phase === 'under') {
    if (T === 'cardcircle') {
      ctx.fillStyle = lum(C.bg) < 0.5 ? 'rgba(255,255,255,0.08)' : '#ffffff';
      rr(D.card.x, D.card.y, D.card.w, D.card.h, L.r); ctx.fill();
      ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(D.cx + D.d * 0.05, D.cy + D.d * 0.05, D.d / 2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.accent; ctx.lineWidth = Math.max(ac * 0.4, 2 * u);
      ctx.beginPath(); ctx.arc(D.cx - D.d * 0.52, D.cy - D.d * 0.58, D.d * 0.05, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(D.cx + D.d * 0.5, D.cy - D.d * 0.62, D.d * 0.03, 0, Math.PI * 2); ctx.stroke();
    } else if (T === 'hexside') {
      const s = W * 0.14;
      ctx.fillStyle = C.accent; rr(W - s, 0, s, s * 0.9, [0, 0, 0, s * 0.5]); ctx.fill();
      rr(W - s * 0.8, L.barTop - s * 0.9, s * 0.8, s * 0.9, [s * 0.4, 0, 0, 0]); ctx.fill();
      ctx.fillStyle = C.bar; rr(0, 0, s * 0.8, s * 0.7, [0, 0, s * 0.5, 0]); ctx.fill();
    } else if (T === 'octagon') {
      poly([[W * 0.84, 0], [W, 0], [W, W * 0.16]], C.accent);
      poly([[0, L.barTop - W * 0.16], [W * 0.16, L.barTop], [0, L.barTop]], C.accent);
    } else if (T === 'tilt') {
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.bar); g.addColorStop(1, shade(C.bar, -0.4));
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const rx = ph.x + ph.w / 2, ry = ph.y + ph.h / 2;
      ctx.save(); ctx.translate(rx, ry); ctx.rotate(0.05); ctx.translate(-rx, -ry);
      ctx.fillStyle = 'rgba(255,255,255,0.18)'; rr(ph.x, ph.y, ph.w, ph.h, L.r); ctx.fill(); ctx.restore();
    } else if (T === 'editorial') {
      poly([[0, 0], [W * 0.12, 0], [0, W * 0.09]], C.bar);
      if (D.hasText) { ctx.fillStyle = C.bar; ctx.fillRect(pad, D.lineY, W - 2 * pad, D.lineH); }
    }
    return;
  }
  // phase === 'over'
  if (T === 'neon') {
    const o = L.m * 0.4;
    ctx.strokeStyle = C.accent; ctx.lineWidth = Math.max(ac * 0.7, 3 * u);
    rr(ph.x - o, ph.y + o, ph.w, ph.h, L.r); ctx.stroke();
  } else if (T === 'slantpanel') {
    const t = ac * 2.4 + 8 * u;
    poly([[D.pw, 0], [D.pw + t, 0], [D.pw - D.sl + t, D.ph], [D.pw - D.sl, D.ph]], C.accent);
    poly([[0, 0], [D.pw, 0], [D.pw - D.sl, D.ph], [0, D.ph]], C.bar);
  } else if (T === 'glass') {
    ctx.fillStyle = rgba(C.bar, 0.8); rr(D.panel.x, D.panel.y, D.panel.w, D.panel.h, L.r); ctx.fill();
  } else if (T === 'news') {
    const tw = W * 0.13, x0 = W - pad * 1.2 - tw;
    poly([[x0, 0], [x0 + tw, 0], [x0 + tw, tw * 1.25], [x0 + tw / 2, tw * 1.0], [x0, tw * 1.25]], C.bar);
  } else if (T === 'fade') {
    const y0 = ph.h * 0.4, g = ctx.createLinearGradient(0, y0, 0, ph.h * 0.9);
    g.addColorStop(0, rgba(C.bg, 0)); g.addColorStop(1, rgba(C.bg, 1));
    ctx.fillStyle = g; ctx.fillRect(0, y0, W, ph.h - y0 + 1);
  } else if (T === 'editorial') {
    poly([[W * 0.56, ph.y + ph.h * 0.36], [W * 0.76, ph.y + ph.h * 0.05], [W, ph.y + ph.h * 0.03], [W, ph.y + ph.h * 0.72], [W * 0.76, ph.y + ph.h * 0.72]], C.bar);
  }
}

function drawText(tb, area, pad, u, onBg, band) {
  const H = state.headline;
  const pos = area.pos || H.pos, al = area.align || H.align;
  let y;
  if (pos === 'top') y = area.y0;
  else if (pos === 'bottom') y = area.y1 - tb.h;
  else y = (area.y0 + area.y1) / 2 - tb.h / 2;
  if (band) band(y, tb.h);
  tb.blocks.forEach((b, bi) => {
    const T = b.T, bx = T.bxOn ? T.bxPad * u : 0;
    let ax;
    if (al === 'left') ax = area.x + pad + bx; else if (al === 'right') ax = area.x + area.w - pad - bx; else ax = area.x + area.w / 2;
    b.lines.forEach(ln => { drawLine(T, ln, ax, y, b.size, b.lh, al, u, onBg ? T.colorBg : T.color); y += b.lh; });
    if (bi === 0) y += tb.gap;
  });
  resetSpacing();
}

function drawLine(T, ln, ax, yTop, size, lh, align, u, color) {
  setTextFont(T, size, u);
  const w = ctx.measureText(ln).width;
  const left = align === 'left' ? ax : align === 'right' ? ax - w : ax - w / 2;
  const cy = yTop + lh / 2 + size * 0.04;
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  if (T.bxOn) {
    ctx.save(); ctx.fillStyle = T.bxColor;
    rr(left - T.bxPad * u, yTop, w + 2 * T.bxPad * u, lh, T.bxRadius * u); ctx.fill(); ctx.restore();
  }
  let fill = color;
  if (T.grad) { const g = ctx.createLinearGradient(left, 0, left + Math.max(w, 1), 0); g.addColorStop(0, color); g.addColorStop(1, T.color2); fill = g; }
  const shadow = () => {
    ctx.shadowColor = rgba(T.shColor, T.shA / 100); ctx.shadowBlur = T.shBlur * u;
    ctx.shadowOffsetX = T.shX * u; ctx.shadowOffsetY = T.shY * u;
  };
  ctx.lineJoin = 'round'; ctx.miterLimit = 2;
  if (T.stOn) {
    ctx.save(); if (T.shOn) shadow();
    ctx.lineWidth = T.stWidth * u * 2; ctx.strokeStyle = T.stColor; ctx.strokeText(ln, left, cy); ctx.restore();
    ctx.fillStyle = fill; ctx.fillText(ln, left, cy);
  } else {
    ctx.save(); if (T.shOn) shadow();
    ctx.fillStyle = fill; ctx.fillText(ln, left, cy);
    if (T.shOn && T.shX === 0 && T.shY === 0 && T.shBlur > 0) ctx.fillText(ln, left, cy); // stronger glow
    ctx.restore();
  }
  ctx.textBaseline = 'alphabetic';
}

function drawBar(L, T) {
  const S = state, { bar, pad, u, ac, edge, edgeAmp } = L;
  const rad = L.floating ? (T === 'leaf' ? [L.r, 0, L.r, 0] : T === 'leafr' ? [0, L.r, 0, L.r] : L.r) : 0;
  ctx.save();
  ctx.globalAlpha = S.barOpacity / 100;
  if (edgeAmp > 0) {
    const poly = dy => {
      ctx.beginPath(); ctx.moveTo(0, bar.y + edge(0) + dy);
      for (let x = 16; x < S.w; x += 16) ctx.lineTo(x, bar.y + edge(x) + dy);
      ctx.lineTo(S.w, bar.y + edge(S.w) + dy); ctx.lineTo(S.w, S.h); ctx.lineTo(0, S.h); ctx.closePath();
    };
    if (ac > 0) { ctx.fillStyle = S.colors.accent; poly(-ac * 1.6); ctx.fill(); }
    ctx.fillStyle = S.colors.bar; poly(0); ctx.fill();
  } else {
    const topLine = ['classic', 'arch', 'circle', 'magazine', 'pill', 'split', 'ribbon', 'header', 'diamond', 'hexagon', 'slant', 'duotone', 'hexside', 'slantpanel', 'glass', 'news', 'octagon', 'fade', 'editorial'].includes(T);
    if (topLine && ac > 0) { ctx.fillStyle = S.colors.accent; ctx.fillRect(bar.x, bar.y - ac, bar.w, ac); }
    if (T === 'pop' && ac > 0) { ctx.fillStyle = S.colors.accent; ctx.fillRect(bar.x, bar.y, bar.w, ac); }
    ctx.fillStyle = T === 'tilt' ? 'rgba(255,255,255,0.14)' : S.colors.bar; rr(bar.x, bar.y, bar.w, bar.h, rad); ctx.fill();
    if (['overlay', 'framed', 'leaf', 'leafr', 'neon', 'cardcircle', 'tilt'].includes(T) && ac > 0) {
      ctx.strokeStyle = S.colors.accent; ctx.lineWidth = ac * 0.5;
      rr(bar.x, bar.y, bar.w, bar.h, rad); ctx.stroke();
    }
  }
  ctx.restore();

  const top = bar.y + edgeAmp + pad + (T === 'pop' ? ac * 0.5 : 0);
  let gx, gy;
  if (L.logoInBar && L.left) {
    const lx = bar.x + pad, ly = top + (L.contentH - L.logoH) / 2;
    ctx.drawImage(logoImg, lx, ly, L.logoW, L.logoH);
    gx = lx + L.logoW + pad; gy = top + (L.contentH - L.gridH) / 2;
    if (L.items.length) {
      ctx.save(); ctx.globalAlpha = 0.3; ctx.strokeStyle = S.colors.barText; ctx.lineWidth = 2 * u;
      ctx.beginPath(); ctx.moveTo(gx - pad / 2, top); ctx.lineTo(gx - pad / 2, top + L.contentH); ctx.stroke(); ctx.restore();
    }
  } else if (L.logoInBar) {
    ctx.drawImage(logoImg, bar.x + (bar.w - L.logoW) / 2, top, L.logoW, L.logoH);
    gx = bar.x + pad; gy = top + L.logoH + (L.items.length ? pad * 0.7 : 0);
  } else { gx = bar.x + pad; gy = top; }

  const center = !L.left;
  ctx.textAlign = 'left';
  L.items.forEach((it, i) => {
    const row = Math.floor(i / L.cols), col = i % L.cols;
    const cx0 = gx + col * L.cellW, cy = gy + row * L.rowH + L.rowH / 2;
    const textMax = L.cellW - (L.iconS ? L.iconS + L.gap : 0) - L.fs * 0.6;
    const txt = fitText(it.value.trim(), textMax, L.fs, 500);
    const tw = ctx.measureText(txt).width;
    const itemW = (L.iconS ? L.iconS + L.gap : 0) + tw;
    let x = center ? cx0 + (L.cellW - itemW) / 2 : cx0;
    if (L.iconS) { drawIcon(it.type, x + L.iconS / 2, cy, L.iconS); x += L.iconS + L.gap; }
    ctx.fillStyle = S.colors.barText;
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, x, cy + L.fs * 0.04);
    ctx.textBaseline = 'alphabetic';
  });
}

// Render a (possibly modified) state onto another canvas, e.g. thumbnails & export.
function renderTo(target, st, forExport = true, keepLogo = true) {
  const ps = state, pc = ctx, pv = cv, pl = logoImg;
  state = st; cv = target; ctx = target.getContext('2d');
  if (!keepLogo) logoImg = null;
  try { return render(forExport); }
  finally { state = ps; cv = pv; ctx = pc; logoImg = pl; }
}

/* =====================================================================
   Redraw, history, persistence
   ===================================================================== */
let raf = 0, lastLayout = null, saveTimer = 0, histTimer = 0, thumbTimer = 0;
function redraw() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    lastLayout = render();
    $('#dims').textContent = `${state.w} × ${state.h} px`;
  });
  clearTimeout(saveTimer); saveTimer = setTimeout(() => lsSet(LS_CURRENT, state), 400);
  clearTimeout(histTimer); histTimer = setTimeout(pushHistory, 450);
  scheduleThumbs();
}

const logoStore = [];
let hist = [], hi = -1;
function snap() {
  let i = logoStore.indexOf(state.logo.src);
  if (i < 0) { logoStore.push(state.logo.src); i = logoStore.length - 1; }
  return JSON.stringify(state, (k, v) => (k === 'src' ? i : v));
}
function pushHistory() {
  clearTimeout(histTimer); histTimer = 0;
  const s = snap();
  if (s === hist[hi]) return;
  hist = hist.slice(0, hi + 1); hist.push(s);
  if (hist.length > 80) hist.shift();
  hi = hist.length - 1; updateUndo();
}
function updateUndo() { $('#undo').disabled = hi <= 0; $('#redo').disabled = hi >= hist.length - 1; }
function stepHistory(d) {
  if (histTimer) pushHistory();
  const n = hi + d; if (n < 0 || n >= hist.length) return;
  hi = n; updateUndo();
  const obj = JSON.parse(hist[hi]); obj.logo.src = logoStore[obj.logo.src];
  applyState(obj);
}
$('#undo').addEventListener('click', () => stepHistory(-1));
$('#redo').addEventListener('click', () => stepHistory(1));
window.addEventListener('keydown', e => {
  if (!(e.ctrlKey || e.metaKey) || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && document.activeElement.type !== 'range') return;
  const k = e.key.toLowerCase();
  if (k === 'z') { e.preventDefault(); stepHistory(e.shiftKey ? 1 : -1); }
  else if (k === 'y') { e.preventDefault(); stepHistory(1); }
});

async function applyState(obj) {
  state = merge(clone(DEFAULTS), obj);
  logoImg = state.logo.src ? await loadImage(state.logo.src).catch(() => null) : null;
  syncUI(); loadFonts(); redraw();
}

/* ---------- fonts ---------- */
function loadFonts() {
  if (!document.fonts) return;
  const jobs = [];
  [['headline'], ['subtitle']].forEach(([k]) => { const T = state[k]; jobs.push(document.fonts.load(`${T.italic ? 'italic ' : ''}${T.weight} 40px "${T.font}"`)); });
  jobs.push(document.fonts.load(`500 40px "${state.font}"`));
  Promise.all(jobs).then(redraw).catch(() => {});
}

/* =====================================================================
   UI wiring
   ===================================================================== */
function readEl(el) {
  if (el.type === 'checkbox') return el.checked;
  if (el.type === 'range' || el.type === 'number' || el.dataset.bind.endsWith('.weight') || el.hasAttribute('data-num')) return +el.value;
  return el.value;
}
function paintRange(el) {
  const min = +el.min || 0, max = +el.max || 100;
  el.style.setProperty('--p', ((el.value - min) / (max - min) * 100) + '%');
  const o = el.parentElement.querySelector('output');
  if (o) o.textContent = (+el.value % 1 ? (+el.value).toFixed(2) : el.value);
}

function syncUI() {
  $$('[data-bind]').forEach(el => {
    const v = getP(state, rp(el.dataset.bind));
    if (el.type === 'checkbox') el.checked = !!v; else el.value = v;
    if (el.type === 'range') paintRange(el);
  });
  $$('[data-seg]').forEach(seg => {
    const v = String(getP(state, seg.dataset.seg));
    seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  });
  $$('[data-local="textTab"] button').forEach(b => b.classList.toggle('on', b.dataset.v === activeText));
  $$('[data-local="exportScale"] button').forEach(b => b.classList.toggle('on', +b.dataset.v === local.exportScale));
  $$('#templates button').forEach(b => b.classList.toggle('on', b.dataset.template === state.template));
  const key = state.w + 'x' + state.h, sel = $('#sizePreset');
  sel.value = [...sel.options].some(o => o.value === key) ? key : 'custom';
  const bgT = bgTextMode();
  $('#bgTextHint').hidden = !bgT;
  $$('[data-seg="headline.pos"] button').forEach(b => b.disabled = bgT);
  $$('#palettes button').forEach(b => b.classList.toggle('on', paletteMatches(PALETTES[+b.dataset.i])));
  renderContactList();
  $('#dims').textContent = `${state.w} × ${state.h} px`;
}

const paletteMatches = p => { const c = state.colors; return c.bg === p[1] && c.bar === p[2] && c.accent === p[3] && c.barText === p[4]; };

function onInput(el) {
  const path = rp(el.dataset.bind);
  setP(state, path, readEl(el));
  if (el.type === 'range') paintRange(el);
  if (path === 'w' || path === 'h') {
    const key = state.w + 'x' + state.h, sel = $('#sizePreset');
    sel.value = [...sel.options].some(o => o.value === key) ? key : 'custom';
  }
  if (/font|weight|italic/.test(path)) loadFonts();
  redraw();
}
$$('[data-bind]').forEach(el => {
  if (el.type === 'range') { const s = el.closest('.field')?.querySelector('span'); if (s) s.appendChild(document.createElement('output')); }
  el.addEventListener('input', () => onInput(el));
});
$$('[data-fonts]').forEach(sel => FONTS.forEach(f => { const o = new Option(f, f); o.style.fontFamily = `"${f}"`; sel.add(o); }));

// segmented controls
$$('[data-seg]').forEach(seg => seg.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || b.disabled) return;
  setP(state, seg.dataset.seg, seg.hasAttribute('data-num') ? +b.dataset.v : b.dataset.v);
  syncUI(); redraw();
}));
$$('[data-local]').forEach(seg => seg.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (seg.dataset.local === 'textTab') activeText = b.dataset.v; else local.exportScale = +b.dataset.v;
  syncUI();
}));

// rail tabs
let thumbsDirty = true;
$('#rail').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('#rail button').forEach(x => x.classList.toggle('on', x === b));
  $$('[data-pane]').forEach(p => p.hidden = p.dataset.pane !== b.dataset.tab);
  if (b.dataset.tab === 'layout' && thumbsDirty) updateThumbs();
  if (b.dataset.tab === 'library') refreshSaved();
  $('.drawer').scrollTop = 0;
});

// size preset
$('#sizePreset').addEventListener('change', e => {
  if (e.target.value === 'custom') {
    $$('#rail button')[0].click(); $('#customSize input').focus(); return;
  }
  const [w, h] = e.target.value.split('x').map(Number);
  state.w = w; state.h = h; syncUI(); redraw();
});

// templates + live thumbnails
const tplBox = $('#templates');
Object.entries(TEMPLATES).forEach(([id, t]) => {
  const b = document.createElement('button');
  b.type = 'button'; b.dataset.template = id; b.title = t.name;
  b.innerHTML = `<canvas></canvas><span>${t.name}</span>`;
  b.addEventListener('click', () => {
    state.template = id; Object.assign(state, t.d); syncUI(); redraw();
  });
  tplBox.appendChild(b);
});
function scheduleThumbs() { thumbsDirty = true; clearTimeout(thumbTimer); thumbTimer = setTimeout(() => { if (!$('[data-pane="layout"]').hidden) updateThumbs(); }, 280); }
function updateThumbs() {
  thumbsDirty = false;
  const tw = 260, th = Math.round(tw * state.h / state.w);
  $$('#templates button').forEach(b => {
    const id = b.dataset.template;
    renderTo(b.querySelector('canvas'), Object.assign({}, state, TEMPLATES[id].d, { template: id, w: tw, h: th }), true);
  });
}

// palettes
PALETTES.forEach((p, i) => {
  const b = document.createElement('button');
  b.type = 'button'; b.dataset.i = i; b.title = p[0];
  b.innerHTML = `<div class="sw"><i style="background:${p[2]}"></i><i style="background:${p[3]}"></i><i style="background:${p[1]}"></i></div><span>${p[0]}</span>`;
  b.addEventListener('click', () => {
    Object.assign(state.colors, { bg: p[1], bar: p[2], accent: p[3], barText: p[4] });
    state.headline.colorBg = p[5]; state.subtitle.colorBg = p[5];
    syncUI(); redraw();
  });
  $('#palettes').appendChild(b);
});

// text quick styles
Object.entries(TEXT_PRESETS).forEach(([n, fn]) => {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = n;
  b.addEventListener('click', () => { fn(state[activeText]); syncUI(); redraw(); });
  $('#textPresets').appendChild(b);
});

/* ---------- contacts ---------- */
function renderContactList() {
  const box = $('#contactList'); box.innerHTML = '';
  state.contacts.forEach((c, i) => {
    const row = document.createElement('div'); row.className = 'contact';
    const on = Object.assign(document.createElement('input'), { type: 'checkbox', checked: c.on, title: 'Show in bar' });
    on.addEventListener('input', () => { c.on = on.checked; redraw(); });
    const sel = document.createElement('select');
    Object.entries(ICON_LABELS).forEach(([k, l]) => sel.add(new Option(l, k, false, k === c.type)));
    sel.addEventListener('input', () => { c.type = sel.value; redraw(); });
    const val = Object.assign(document.createElement('input'), { type: 'text', value: c.value });
    val.addEventListener('input', () => { c.value = val.value; redraw(); });
    const ctl = document.createElement('div'); ctl.className = 'mv';
    const mk = (t, fn, title) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.title = title; b.addEventListener('click', fn); return b; };
    const swap = (a, b) => { [state.contacts[a], state.contacts[b]] = [state.contacts[b], state.contacts[a]]; renderContactList(); redraw(); };
    ctl.append(mk('▲', () => i > 0 && swap(i - 1, i), 'Move up'),
      mk('✕', () => { state.contacts.splice(i, 1); renderContactList(); redraw(); }, 'Delete'),
      mk('▼', () => i < state.contacts.length - 1 && swap(i, i + 1), 'Move down'));
    row.append(on, sel, val, ctl); box.appendChild(row);
  });
}
$('#addContact').addEventListener('click', () => {
  state.contacts.push({ type: 'at', value: '@yourhandle', on: true });
  renderContactList(); redraw();
  const inputs = $$('#contactList input[type=text]'); inputs[inputs.length - 1]?.focus();
});

/* ---------- photo & logo ---------- */
async function setPhotoFromFile(file) {
  if (!file || !file.type.startsWith('image/')) return say('That file is not an image.');
  try {
    photoImg = await loadImage(URL.createObjectURL(file));
    Object.assign(state.photo, { fx: .5, fy: .5, zoom: 1 });
    syncUI(); redraw(); say('Photo added — drag it to reposition.');
  } catch { say('Could not read that image.'); }
}
['#photoFile', '#photoFile2'].forEach(s => $(s).addEventListener('change', e => { setPhotoFromFile(e.target.files[0]); e.target.value = ''; }));
$('#resetPhoto').addEventListener('click', () => { Object.assign(state.photo, { fx: .5, fy: .5, zoom: 1 }); syncUI(); redraw(); });
$('#removePhoto').addEventListener('click', () => { photoImg = null; redraw(); });
$('#resetAdjust').addEventListener('click', () => { Object.assign(state.photo, { brightness: 100, contrast: 100, saturation: 100, dim: 0 }); syncUI(); redraw(); });

function setLogoFromFile(file) {
  if (!file || !file.type.startsWith('image/')) return say('That file is not an image.');
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const img = await loadImage(reader.result);
      const k = Math.min(1, 700 / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      state.logo.src = c.toDataURL('image/png');
      logoImg = await loadImage(state.logo.src);
      redraw(); say('Logo added.');
    } catch { say('Could not read that logo.'); }
  };
  reader.readAsDataURL(file);
}
$('#logoFile').addEventListener('change', e => { setLogoFromFile(e.target.files[0]); e.target.value = ''; });
$('#removeLogo').addEventListener('click', () => { state.logo.src = ''; logoImg = null; redraw(); });

['dragenter', 'dragover'].forEach(ev => stage.addEventListener(ev, e => { e.preventDefault(); stage.classList.add('drop'); }));
['dragleave', 'drop'].forEach(ev => stage.addEventListener(ev, e => { e.preventDefault(); stage.classList.remove('drop'); }));
stage.addEventListener('drop', e => setPhotoFromFile(e.dataTransfer.files[0]));
window.addEventListener('paste', e => {
  const f = [...(e.clipboardData?.files || [])].find(f => f.type.startsWith('image/'));
  if (f) setPhotoFromFile(f);
});

/* ---------- pan & zoom on canvas ---------- */
let drag = null;
function canvasPoint(e) {
  const b = mainCv.getBoundingClientRect();
  return { x: (e.clientX - b.left) * mainCv.width / b.width, y: (e.clientY - b.top) * mainCv.height / b.height };
}
const inRect = (p, r) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
mainCv.addEventListener('pointerdown', e => {
  if (!photoImg || !lastLayout) return;
  const p = canvasPoint(e);
  if (!inRect(p, lastLayout.photo)) return;
  mainCv.setPointerCapture(e.pointerId);
  const c = coverParams(lastLayout.photo);
  drag = { p, fx: c.fx, fy: c.fy };
  mainCv.style.cursor = 'grabbing';
});
mainCv.addEventListener('pointermove', e => {
  const p = canvasPoint(e);
  if (!drag) { mainCv.style.cursor = photoImg && lastLayout && inRect(p, lastLayout.photo) ? 'grab' : 'default'; return; }
  const c = coverParams(lastLayout.photo);
  state.photo.fx = drag.fx - (p.x - drag.p.x) / c.dw;
  state.photo.fy = drag.fy - (p.y - drag.p.y) / c.dh;
  const n = coverParams(lastLayout.photo);
  state.photo.fx = n.fx; state.photo.fy = n.fy;
  redraw();
});
const endDrag = () => { drag = null; mainCv.style.cursor = 'grab'; };
mainCv.addEventListener('pointerup', endDrag);
mainCv.addEventListener('pointercancel', endDrag);
mainCv.addEventListener('wheel', e => {
  if (!photoImg || !lastLayout || !inRect(canvasPoint(e), lastLayout.photo)) return;
  e.preventDefault();
  state.photo.zoom = clamp(state.photo.zoom * Math.exp(-e.deltaY * 0.0015), 1, 5);
  syncUI(); redraw();
}, { passive: false });

/* ---------- export ---------- */
function download(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
// "3 Ton Pickup for Rent!" -> "3-ton-pickup-for-rent"
function fileBase() {
  const H = state.headline, S = state.subtitle;
  const src = (H.on && H.text.trim()) || (S.on && S.text.trim()) || '';
  const slug = src.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 80).replace(/-+$/, '');
  return slug || 'poster';
}
function exportImage(type) {
  let sc = local.exportScale;
  if (state.w * state.h * sc * sc > 40e6) sc = 1;
  const off = document.createElement('canvas');
  renderTo(off, Object.assign({}, state, { w: state.w * sc, h: state.h * sc }), true);
  off.toBlob(b => {
    if (!b) return say('Export failed — try a smaller size.');
    download(b, `${fileBase()}${sc > 1 ? '@' + sc + 'x' : ''}.${type === 'image/png' ? 'png' : 'jpg'}`);
    say('Downloaded.');
  }, type, 0.93);
  $('#exportMenu').open = false;
}
$('#exportPng').addEventListener('click', () => exportImage('image/png'));
$('#exportJpg').addEventListener('click', () => exportImage('image/jpeg'));
document.addEventListener('click', e => { const m = $('#exportMenu'); if (m.open && !m.contains(e.target)) m.open = false; });

/* ---------- saved designs ---------- */
function refreshSaved() {
  const box = $('#savedGrid'), d = lsGet(LS_DESIGNS, {}), names = Object.keys(d).sort();
  box.innerHTML = '';
  if (!names.length) { box.innerHTML = '<div class="empty">Nothing saved yet. Name your design above and press Save.</div>'; return; }
  names.forEach(n => {
    const item = document.createElement('div'); item.className = 'item';
    const c = document.createElement('canvas');
    const st = merge(clone(DEFAULTS), d[n]);
    st.w = 120; st.h = Math.round(120 * d[n].h / d[n].w) || 120;
    renderTo(c, st, true, d[n].logo?.src === state.logo.src);
    const name = document.createElement('strong'); name.textContent = n;
    const load = Object.assign(document.createElement('button'), { className: 'btn', type: 'button', textContent: 'Load' });
    load.addEventListener('click', () => { applyState(d[n]); $('#designName').value = n; say(`Loaded “${n}”.`); });
    const del = Object.assign(document.createElement('button'), { className: 'btn danger', type: 'button', textContent: 'Delete' });
    del.addEventListener('click', () => { if (confirm(`Delete “${n}”?`)) { delete d[n]; lsSet(LS_DESIGNS, d); refreshSaved(); } });
    item.append(c, name, load, del); box.appendChild(item);
  });
}
$('#saveDesign').addEventListener('click', () => {
  const name = $('#designName').value.trim();
  if (!name) { $('#designName').focus(); return say('Give your design a name first.'); }
  const d = lsGet(LS_DESIGNS, {}); d[name] = clone(state);
  if (!lsSet(LS_DESIGNS, d)) return say('Browser storage is full — export as JSON instead.');
  refreshSaved(); say(`Saved “${name}”.`);
});
$('#exportJson').addEventListener('click', () => {
  download(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }), 'poster-template.json');
});
$('#importJson').addEventListener('change', e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  f.text().then(t => applyState(JSON.parse(t))).then(() => say('Template imported.')).catch(() => say('That file is not a valid template.'));
});
$('#resetAll').addEventListener('click', () => {
  if (confirm('Reset all settings, logo and contact details to defaults? (Saved designs are kept.)')) applyState(clone(DEFAULTS));
});

/* =====================================================================
   Init
   ===================================================================== */
(async function init() {
  const saved = lsGet(LS_CURRENT, null);
  if (saved) state = merge(clone(DEFAULTS), saved);
  if (state.logo.src) logoImg = await loadImage(state.logo.src).catch(() => null);
  syncUI();
  lastLayout = render();
  updateThumbs();
  pushHistory();
  loadFonts();
  if (document.fonts) document.fonts.ready.then(redraw);
  say('Tip: drag the photo to reposition, scroll to zoom');
})();
})();
