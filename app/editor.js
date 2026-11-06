"use strict";
/* ============================================================================
   SCRIPTEDITOR 95 — Editor de Vídeo Não-Linear (Estilo Adobe Premiere 4.2)
   + Ponte Integrada com o ScriptRoom (Documentos\ScriptRoom)
   Zero emojis · Ícones SVG 16x16 pixel-art · Edição Comercial, Doméstica e Roteirizada
   ============================================================================ */

let APP_VERSAO = "1.1.5"; // Substituída em boot() pela versão real do package.json
const FPS = 29.97;

const ICON = {
  editor: '<rect x="0.5" y="1.5" width="3" height="13" fill="#202020" stroke="#000"/><rect x="1.2" y="3" width="1.5" height="1.5" fill="#fff"/><rect x="1.2" y="7" width="1.5" height="1.5" fill="#fff"/><rect x="1.2" y="11" width="1.5" height="1.5" fill="#fff"/><rect x="12.5" y="1.5" width="3" height="13" fill="#202020" stroke="#000"/><rect x="13.2" y="3" width="1.5" height="1.5" fill="#fff"/><rect x="13.2" y="7" width="1.5" height="1.5" fill="#fff"/><rect x="13.2" y="11" width="1.5" height="1.5" fill="#fff"/><rect x="3.5" y="2.5" width="9" height="7" fill="#102840" stroke="#000"/><path d="M5.5 4.2l4 2-4 2z" fill="#FFE040"/><rect x="3.5" y="9.5" width="9" height="4" fill="#C6BFA6" stroke="#000"/><path d="M8 2.5v11" stroke="#FF3030"/>',
  sparkle: '<path d="M8 1l1.8 4.2L14 7l-4.2 1.8L8 13l-1.8-4.2L2 7l4.2-1.8z" fill="#FFE020" stroke="#000" stroke-width="0.8"/>',
  dock: '<rect x="2" y="2" width="12" height="12" fill="none" stroke="#000" stroke-width="1.2"/><rect x="4" y="6" width="8" height="6" fill="#C0C0C0" stroke="#000"/>',
  new: '<path d="M3.5 1.5h6l3 3v10h-9z" fill="#fff" stroke="#000"/><path d="M9.5 1.5v3h3" fill="#C0C0C0" stroke="#000"/>',
  open: '<path d="M1.5 3.5h5l1 1h5v9h-11z" fill="#E8C000" stroke="#000"/><path d="M3.5 7.5h12l-2 6h-12z" fill="#FFE060" stroke="#000"/>',
  folder: '<path d="M1.5 3.5h5l1.5 1.5h6.5v8.5h-13z" fill="#FFE060" stroke="#000"/><path d="M1.5 6.5h13" stroke="#C09000"/>',
  save: '<rect x="1.5" y="1.5" width="13" height="13" fill="#000080" stroke="#000"/><rect x="4" y="2" width="8" height="5" fill="#fff"/><rect x="9" y="3" width="2" height="3" fill="#000080"/><rect x="4" y="10" width="8" height="5" fill="#C0C0C0"/>',
  undo: '<path d="M6 3 2.5 6.5 6 10" fill="none" stroke="#000" stroke-width="1.6"/><path d="M3 6.5h7a3.5 3.5 0 0 1 0 7H7" fill="none" stroke="#000" stroke-width="1.6"/>',
  redo: '<path d="M10 3l3.5 3.5L10 10" fill="none" stroke="#000" stroke-width="1.6"/><path d="M13 6.5H6a3.5 3.5 0 0 0 0 7h3" fill="none" stroke="#000" stroke-width="1.6"/>',
  find: '<circle cx="6.5" cy="6.5" r="4" fill="#9FD8FF" stroke="#000"/><path d="M9.5 9.5l5 5" stroke="#000" stroke-width="2.2"/>',
  speaker: '<path d="M2.5 6h3l4-3.5v11L5.5 10h-3z" fill="#C0C0C0" stroke="#000"/><path d="M11.5 5.5q2 2.5 0 5M13 4q3 4 0 8" fill="none" stroke="#000"/>',
  mute: '<path d="M2.5 6h3l4-3.5v11L5.5 10h-3z" fill="#C0C0C0" stroke="#000"/><path d="M11 6l4 4M15 6l-4 4" stroke="#C00000" stroke-width="1.4"/>',
  script: '<path d="M3.5 1.5h9v13h-9z" fill="#fff" stroke="#000"/><path d="M5 4h6M5 6h4M7 8h4M5 10h6M7 12h3" stroke="#800000"/>',
  clapper: '<rect x="1.5" y="6.5" width="13" height="8" fill="#202020" stroke="#000"/><path d="M1.5 3.5l12-2 .5 3-12 2z" fill="#fff" stroke="#000"/><path d="M4 3l1.5 2.6M7.5 2.4L9 5M11 1.8l1.5 2.6" stroke="#000"/><path d="M3 9h10M3 11h7" stroke="#fff"/>',
  slate: '<rect x="1.5" y="6.5" width="13" height="8" fill="#181818" stroke="#000"/><path d="M1.5 3.5h13v3h-13z" fill="#fff" stroke="#000"/><path d="M4 3.5l-2 3M8 3.5l-2 3M12 3.5l-2 3" stroke="#000" stroke-width="1.5"/><path d="M3 9h6M3 11.5h9" stroke="#FFE040"/>',
  cut: '<circle cx="4.5" cy="12" r="2.2" fill="none" stroke="#000" stroke-width="1.4"/><circle cx="11.5" cy="12" r="2.2" fill="none" stroke="#000" stroke-width="1.4"/><path d="M6 10.5L13 2M10 10.5L3 2" stroke="#800000" stroke-width="1.6"/>',
  film: '<rect x="2" y="1.5" width="12" height="13" fill="#282828" stroke="#000"/><rect x="4.5" y="3" width="7" height="4.5" fill="#70B8FF"/><rect x="4.5" y="8.5" width="7" height="4.5" fill="#70B8FF"/><path d="M3 3h1M3 6h1M3 10h1M3 13h1M12 3h1M12 6h1M12 10h1M12 13h1" stroke="#fff"/>',
  tv: '<rect x="1.5" y="3.5" width="13" height="10" fill="#303030" stroke="#000"/><rect x="3" y="5" width="8.5" height="7" fill="#103850"/><path d="M5 2l3 1.5L11 2" fill="none" stroke="#000"/><path d="M4 10h6" stroke="#FFE000" stroke-width="1.4"/>',
  cam: '<rect x="1.5" y="5" width="9.5" height="7.5" fill="#404040" stroke="#000"/><path d="M11 7l3.5-2v7L11 10z" fill="#808080" stroke="#000"/><circle cx="4.5" cy="3.5" r="2" fill="#202020" stroke="#000"/><circle cx="8.5" cy="3.5" r="2" fill="#202020" stroke="#000"/>',
  foley: '<rect x="1.5" y="2.5" width="13" height="11" fill="#202020" stroke="#000"/><path d="M3 8h2l1.5-4 2 8 1.5-6 1.5 4H13" fill="none" stroke="#00FF66" stroke-width="1.4"/>',
  mic: '<rect x="6" y="2" width="4" height="7" rx="2" fill="#909090" stroke="#000"/><path d="M4 6.5a4 4 0 0 0 8 0M8 10.5v3.5M5 14h6" fill="none" stroke="#000" stroke-width="1.3"/>',
  tape: '<rect x="1.5" y="3.5" width="13" height="9" fill="#252525" stroke="#000"/><circle cx="5" cy="8" r="2.2" fill="#fff" stroke="#000"/><circle cx="11" cy="8" r="2.2" fill="#fff" stroke="#000"/><path d="M5 5.8h6" stroke="#800000"/>',
  wand: '<path d="M2 14 11 5" stroke="#000" stroke-width="2"/><path d="M11.5 1.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" fill="#FFE000" stroke="#000" stroke-width=".6"/>',
  gear: '<circle cx="8" cy="8" r="3" fill="none" stroke="#000" stroke-width="2"/><path d="M8 1v3M8 12v3M1 8h3M12 8h3M3 3l2 2M11 11l2 2M13 3l-2 2M5 11l-2 2" stroke="#000" stroke-width="1.6"/>',
  help: '<circle cx="8" cy="8" r="6.5" fill="#FFFF80" stroke="#000"/><path d="M6 6.2a2 2 0 1 1 2.6 1.9c-.5.2-.6.6-.6 1.4" fill="none" stroke="#000" stroke-width="1.4"/><rect x="7.2" y="11" width="1.6" height="1.6" fill="#000"/>',
  bulb: '<path d="M5 6a3 3 0 0 1 6 0c0 1.5-1 2.2-1 3.5H6C6 8.2 5 7.5 5 6z" fill="#FFE040" stroke="#000"/><rect x="6" y="10.5" width="4" height="2" fill="#C0C0C0" stroke="#000"/><rect x="7" y="13" width="2" height="1" fill="#404040"/><path d="M8 1.5v2M3.5 3.5l1.5 1.5M12.5 3.5L11 5" stroke="#FFA000" stroke-width="1.2"/>',
  sync: '<path d="M3.2 8a4.8 4.8 0 0 1 8.2-3.4L13.5 2.5V7.5H8.5l2.4-2.4A3.4 3.4 0 0 0 4.6 8z" fill="#00A030"/><path d="M12.8 8a4.8 4.8 0 0 1-8.2 3.4L2.5 13.5V8.5h5l-2.4 2.4A3.4 3.4 0 0 0 11.4 8z" fill="#00A030"/>',
  splash: '<rect x="1.5" y="2.5" width="13" height="11" fill="#C6BFA6" stroke="#000"/><rect x="2" y="3" width="12" height="3" fill="#800000"/><rect x="3.5" y="7.5" width="9" height="5" fill="#4A1010"/><path d="M5 9.5l3-1.5v3z" fill="#FFE040"/>',
  info: '<circle cx="8" cy="8" r="6.5" fill="#fff" stroke="#800000" stroke-width="1.4"/><rect x="7.2" y="7" width="1.6" height="5" fill="#800000"/><rect x="7.2" y="4" width="1.6" height="1.6" fill="#800000"/>',
  power: '<circle cx="8" cy="9" r="5.5" fill="none" stroke="#000" stroke-width="1.6"/><path d="M8 1.5v7" stroke="#C00000" stroke-width="2"/>',
  seq: '<rect x="1.5" y="3.5" width="13" height="9" fill="#182838" stroke="#000"/><circle cx="5" cy="8" r="2.2" fill="#fff" stroke="#000"/><circle cx="11" cy="8" r="2.2" fill="#fff" stroke="#000"/><path d="M4 3.5v9M12 3.5v9" stroke="#FFE040"/><rect x="6.5" y="5.5" width="3" height="5" fill="#FFE040"/>',
  magnet: '<path d="M3 3v6a5 5 0 0 0 10 0V3h-3v6a2 2 0 0 1-4 0V3z" fill="#C00000" stroke="#000"/><rect x="3" y="2" width="3" height="3" fill="#C0C0C0" stroke="#000"/><rect x="10" y="2" width="3" height="3" fill="#C0C0C0" stroke="#000"/>',
  group: '<rect x="1.5" y="3.5" width="6" height="6" fill="#000080" stroke="#000"/><rect x="8.5" y="6.5" width="6" height="6" fill="#C00000" stroke="#000"/><path d="M7.5 6.5h2v3h-2z" fill="#FFE040"/>'
};

const icon = (n, s = 16) => `<svg viewBox="0 0 16 16" width="${s}" height="${s}" aria-hidden="true" focusable="false">${ICON[n] || ICON.editor}</svg>`;

function paintIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach(el => {
    if (!el.dataset.painted) {
      el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon));
      el.dataset.painted = "1";
    }
  });
}

const uid = (p = "") => p + Math.random().toString(36).slice(2, 8);
const pad2 = n => String(Math.floor(Math.max(0, n))).padStart(2, "0");
const escH = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtN = n => Number(n || 0).toLocaleString("pt-BR");
const mmss = s => `${Math.floor(Math.max(0, s) / 60)}:${pad2(Math.floor(Math.max(0, s)) % 60)}`;
function formatTimecodeSMPTE(sec, useDropFrame = false) {
  const s = Math.max(0, Number(sec) || 0);
  if (!useDropFrame) {
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = Math.floor(s % 60);
    const ff = Math.floor((s % 1) * FPS);
    return `${pad2(hh)}:${pad2(mm)}:${pad2(ss)}:${pad2(ff)}`;
  }
  // Padrão SMPTE 12M Drop-Frame para 29.97 fps (descarte de 2 quadros a cada minuto exceto dezenas)
  const totalFrames = Math.round(s * 29.97);
  const D = Math.floor(totalFrames / 17982);
  const m = totalFrames % 17982;
  const f = totalFrames + 18 * D + 2 * Math.max(0, Math.floor((m - 2) / 1798));
  const ff = f % 30;
  const ss = Math.floor(f / 30) % 60;
  const mm = Math.floor(Math.floor(f / 30) / 60) % 60;
  const hh = Math.floor(Math.floor(Math.floor(f / 30) / 60) / 60);
  return `${pad2(hh)}:${pad2(mm)}:${pad2(ss)};${pad2(ff)}`;
}

const fmtSMPTE = sec => {
  const isDF = (typeof S !== "undefined" && S.timecodeDropFrame) || (typeof prefs !== "undefined" && prefs.dropFrame);
  return formatTimecodeSMPTE(sec, isDF);
};

const TC_RE = /^\s*\[(\d+):(\d{2})\s*[–-]\s*(\d+):(\d{2})\]\s*$/;
function parseTC(x) {
  const m = TC_RE.exec(x || "");
  return m ? { a: +m[1] * 60 + +m[2], b: +m[3] * 60 + +m[4] } : null;
}

/* ---------- Preferências, Mapa de Teclas Customizável e Estado Global do Editor ---------- */
const LS_PREF = "varguelia.scripteditor.premiere95.v3";
const LS_KEYMAP = "varguelia.scripteditor.keymap95.v1";

const DEFAULT_KEYMAP = {
  playPause: "Space",
  shuttleRev: "J",
  shuttlePause: "K",
  shuttleFwd: "L",
  toolSelect: "V",
  toolTrack: "A",
  toolRazor: "C",
  toolTrim: "T",
  toolRipple: "B",
  toolRolling: "N",
  toolSlip: "Y",
  toolSlide: "U",
  toolHand: "H",
  markIn: "I",
  markOut: "O",
  insertClip: ",",
  overwriteClip: ".",
  splitClip: "Ctrl+K",
  duplicateClip: "Ctrl+D",
  addMarker: "M",
  deleteClip: "Delete",
  rippleDelete: "Shift+Delete",
  stepBack: "ArrowLeft",
  stepFwd: "ArrowRight",
  prevCut: "ArrowUp",
  nextCut: "ArrowDown",
  importMedia: "Ctrl+I",
  openProject: "Ctrl+O",
  saveProject: "Ctrl+S",
  saveProjectAs: "Ctrl+Shift+S",
  newSequence: "Ctrl+N",
  toggleSnap: "S",
  clearInOut: "Alt+X",
  exportMovie: "Ctrl+M",
  copyClip: "Ctrl+C",
  pasteClip: "Ctrl+V",
  undo: "Ctrl+Z",
  redo: "Ctrl+Y",
  congelarQuadro: "Shift+F",
  selectAll: "Ctrl+A",
  groupClips: "Ctrl+G",
  ungroupClips: "Ctrl+Shift+G",
  linkClips: "Ctrl+L",
  pasteAttributes: "Ctrl+Alt+V",
  colorMatte: "Shift+M",
  quickCrossDissolve: "Ctrl+D"
};

const KEYMAP_LABELS = [
  ["playPause", "Tocar / Pausar Sequência Master"],
  ["shuttleRev", "Retroceder Variável (Shuttle Reverso)"],
  ["shuttlePause", "Pausar Shuttle"],
  ["shuttleFwd", "Avançar Rápido (1x / 2x / 4x)"],
  ["toolSelect", "Ferramenta Seleção e Movimento"],
  ["toolTrack", "Ferramenta Selecionar Faixa Adiante"],
  ["toolRazor", "Ferramenta Navalha (Corte)"],
  ["toolTrim", "Ferramenta Ajuste de Borda (Trim)"],
  ["toolRipple", "Ferramenta Ripple Edit (Ajuste com Fechamento)"],
  ["toolRolling", "Ferramenta Rolling Edit (Ajuste Contíguo)"],
  ["toolSlip", "Ferramenta Slip (Deslizar Conteúdo Interno)"],
  ["toolSlide", "Ferramenta Slide (Deslizar Posição)"],
  ["toolHand", "Ferramenta Mão (Arrastar Timeline)"],
  ["splitClip", "Dividir Clipe na Agulha (Split)"],
  ["duplicateClip", "Duplicar Clipe Selecionado"],
  ["congelarQuadro", "Congelar Fotograma na Agulha (Freeze Frame)"],
  ["selectAll", "Selecionar Todos os Clipes da Timeline"],
  ["groupClips", "Agrupar Clipes Selecionados (Group)"],
  ["ungroupClips", "Desagrupar Clipes Selecionados (Ungroup)"],
  ["linkClips", "Vincular / Desvincular Áudio e Vídeo (Link A/V)"],
  ["pasteAttributes", "Colar Atributos nos Clipes Selecionados"],
  ["colorMatte", "Gerador de Matte de Cor Sólida 1995"],
  ["quickCrossDissolve", "Transição Rápida Cross Dissolve (1.0s)"],
  ["addMarker", "Inserir Marcador na Agulha"],
  ["markIn", "Marcar Entrada (IN) no Monitor ou Timeline"],
  ["markOut", "Marcar Saída (OUT) no Monitor ou Timeline"],
  ["clearInOut", "Limpar Pontos IN/OUT da Linha do Tempo"],
  ["insertClip", "Inserir da Origem com Ondulação (Insert)"],
  ["overwriteClip", "Sobrescrever da Origem na Timeline (Overwrite)"],
  ["deleteClip", "Apagar Clipe ou Fechar Espaço Selecionado"],
  ["rippleDelete", "Apagar e Fechar Espaço (Ripple Delete)"],
  ["toggleSnap", "Alternar Ímã Magnético de Encaixe (Snap)"],
  ["newSequence", "Criar Nova Sequência / Linha do Tempo"],
  ["stepBack", "Recuar 1 Quadro (Shift = 1s)"],
  ["stepFwd", "Avançar 1 Quadro (Shift = 1s)"],
  ["prevCut", "Pular para Corte Anterior"],
  ["nextCut", "Pular para Próximo Corte"],
  ["copyClip", "Copiar Clipe Selecionado"],
  ["pasteClip", "Colar Clipe na Agulha"],
  ["openProject", "Abrir Projeto (.PPJ)"],
  ["saveProject", "Salvar Projeto (.PPJ)"],
  ["saveProjectAs", "Salvar Projeto Como… (.PPJ)"],
  ["importMedia", "Importar Mídia do Computador"],
  ["exportMovie", "Exportar Filme Master (.MP4 / .WEBM)"],
  ["undo", "Desfazer Última Edição"],
  ["redo", "Refazer Edição"]
];

const KEYMAP = Object.assign({}, DEFAULT_KEYMAP, (() => {
  try { return JSON.parse(localStorage.getItem(LS_KEYMAP) || "{}"); } catch (_e) { return {}; }
})());

function saveKeymap() {
  try { localStorage.setItem(LS_KEYMAP, JSON.stringify(KEYMAP)); } catch (_e) {}
}

function resetKeymapToDefault() {
  Object.keys(DEFAULT_KEYMAP).forEach(k => { KEYMAP[k] = DEFAULT_KEYMAP[k]; });
  saveKeymap();
}

function formatKeyEvent(e) {
  if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return null;
  const parts = [];
  if (e.ctrlKey || e.metaKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey && e.key !== " ") parts.push("Shift");
  let k = e.code === "Space" ? "Space" : e.key;
  if (k.length === 1) k = k.toUpperCase();
  parts.push(k);
  return parts.join("+");
}

function prettyKeyName(combo) {
  return String(combo || "")
    .replace("Space", "Espaço")
    .replace("ArrowLeft", "Seta Esq (←)")
    .replace("ArrowRight", "Seta Dir (→)")
    .replace("ArrowUp", "Seta Cima (↑)")
    .replace("ArrowDown", "Seta Baixo (↓)");
}

const prefs = Object.assign({
  scheme: "tijolo",
  painel: true,
  monLayout: "dual", // dual | single | script
  presetMode: "livre", // livre | roteiro
  som: true,
  filter: "none",
  safeArea: false,
  cc: true,
  snap: true,
  transformOverlay: true,
  tlZoom: 10,
  previewRes: 1 // 1 = 1/1 Total | 2 = 1/2 Rápido | 4 = 1/4 Betacam 1995
}, (() => {
  try { return JSON.parse(localStorage.getItem(LS_PREF) || "{}"); } catch (_e) { return {}; }
})());

function savePrefs() {
  try { localStorage.setItem(LS_PREF, JSON.stringify(prefs)); } catch (_e) {}
}

const S = {
  hasActiveProject: true,
  projectName: "PROJETO_LIVRE_01.PPJ",
  projectFilePath: null,
  isDirty: false,
  isStarterDemo: true,   // Fica false assim que o usuário importa ou edita sua primeira mídia
  srFolder: "Documentos > ScriptRoom",
  eps: {},
  chars: {},
  series: {},
  curId: null,
  sideTab: "bin",        // bin | fx | trans | atalhos | roteiro | cenas | audio | claquete
  tool: "select",        // select (V) | track (A) | razor (C) | trim (T) | hand (H)
  curSceneIdx: 0,

  // Monitor de Programa (Sequência Master)
  playhead: 0,
  totalDur: 30,
  playing: false,
  shuttleSpeed: 1,       // Velocidade J/K/L (-2, -1, 1, 2, 4)
  loop: false,

  // Versão 1.0.6: Área de Trabalho & Pontos IN / OUT na Linha do Tempo (Teclas I e O)
  tlIn: null,
  tlOut: null,

  // Versão 1.0.6: Múltiplas Timelines / Sequências no mesmo projeto
  sequences: [
    {
      id: "seq_1",
      name: "Sequência 1",
      videoTracks: ["v3", "v2", "v1"],
      audioTracks: ["a1", "a2", "a3"],
      clips: { v3: [], v2: [], v1: [], a1: [], a2: [], a3: [] },
      markers: [
        { id: "mk_1", time: 6.0, label: "Início VT", color: "green", comment: "Entrada do VT principal" },
        { id: "mk_2", time: 16.0, label: "Oferta", color: "yellow", comment: "Anotação da direção para GC" }
      ],
      totalDur: 30,
      playhead: 0,
      tlIn: null,
      tlOut: null,
      targetVideoTrack: "v1",
      targetAudioTrack: "a1",
      tracksMuted: { v3: false, v2: false, v1: false, a1: false, a2: false, a3: false },
      tracksLocked: { v3: false, v2: false, v1: false, a1: false, a2: false, a3: false },
      tracksSolo: { a1: false, a2: false, a3: false },
      trackVolumes: { a1: 100, a2: 85, a3: 100, master: 100 },
      trackPans: { a1: 0, a2: 0, a3: 0 }
    }
  ],
  activeSequenceId: "seq_1",

  // Versão 1.0.6: Seleção de Espaço Vazio (Gap Selection) para Ripple Delete
  selectedGap: null, // { track, start, end, dur }

  // Monitor de Origem (Clipe Bruto / Source Monitor)
  srcItem: null,         // Item atualmente aberto no Monitor de Origem
  srcPlayhead: 0,
  srcPlaying: false,
  srcIn: 0,
  srcOut: 10,

  // Linha do Tempo Multi-Faixas Dinâmica (Estilo Adobe Premiere — suporte a quantas faixas V1..Vn e A1..An quiser!)
  videoTracks: ["v3", "v2", "v1"],
  audioTracks: ["a1", "a2", "a3"],
  targetVideoTrack: "v1",
  targetAudioTrack: "a1",
  tracksMuted: { v3: false, v2: false, v1: false, a1: false, a2: false, a3: false },
  tracksLocked: { v3: false, v2: false, v1: false, a1: false, a2: false, a3: false },
  tracksSolo: { a1: false, a2: false, a3: false },
  trackVolumes: { a1: 100, a2: 85, a3: 100, master: 100 },
  trackPans: { a1: 0, a2: 0, a3: 0 },
  markers: [
    { id: "mk_1", time: 6.0, label: "Início VT", color: "green", comment: "Entrada do VT principal" },
    { id: "mk_2", time: 16.0, label: "Oferta", color: "yellow", comment: "Anotação da direção para GC" }
  ],
  clips: { v3: [], v2: [], v1: [], a1: [], a2: [], a3: [] },
  selectedClipId: null,
  selectedClipTrack: null,
  selectedClipIds: [],
  clipboardClip: null,
  clipboardClips: null,
  recordingKeyAction: null,

  // Cesto de Mídia (Project Bin) com Abas, Busca e Modos de Exibição
  mediaBin: [],
  binFilter: "all",      // all | video | audio | image | synth
  binSearch: "",
  binView: "list",       // list | grid | storyboard
  binFolders: ["Todas", "Vídeos", "Áudios", "Cartelas"],
  binCurFolder: "Todas",
  adrTakes: [],
  undoStack: [],
  redoStack: [],

  // Processamento DSP de Áudio Analógico 1995 (Equalizador Gráfico 10 Bandas, Rack de Dinâmica & Auto-Ducking)
  graphicEQ: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  autoDucking: false,
  dynamics: {
    enabled: false,
    compThresh: -18,
    compRatio: 4,
    compAttack: 10,
    compRelease: 150,
    compGain: 3,
    gateThresh: -45,
    limiterCeil: -0.1
  },

  // Colorimetria 3-Way Broadcast (Lift, Gamma, Gain) & Saturação Global
  color3Way: {
    lift: { r: 0, g: 0, b: 0, lum: 0 },
    gamma: { r: 0, g: 0, b: 0, lum: 0 },
    gain: { r: 0, g: 0, b: 0, lum: 0 },
    saturation: 100
  },

  // Multicâmera 4-Up (Live Switcher 1995)
  multicamActiveCam: 1,
  multicamLiveCut: true,

  // Fila de Renderização em Lote (Batch Render Queue)
  renderQueue: [],

  // Elementos HTML5 de vídeo, imagem e áudio para reprodução em tempo real + envelopes reais de áudio (Web Audio API)
  videoEls: new Map(),
  audioEls: new Map(),
  audioPeaks: new Map(),
  srcVideoEl: null,
  srcAudioEl: null
};

function getAllTrackIds() {
  return [...S.videoTracks, ...S.audioTracks];
}

function getVideoTracksBottomUp() {
  return [...S.videoTracks].reverse();
}

function isVideoTrack(tk) {
  return String(tk || "").toLowerCase().startsWith("v");
}

function isAudioTrack(tk) {
  return String(tk || "").toLowerCase().startsWith("a");
}

function ensureTrackExists(tk) {
  if (!tk) return;
  if (!S.clips[tk]) S.clips[tk] = [];
  if (S.tracksMuted[tk] == null) S.tracksMuted[tk] = false;
  if (S.tracksLocked[tk] == null) S.tracksLocked[tk] = false;
  if (isAudioTrack(tk)) {
    if (S.tracksSolo[tk] == null) S.tracksSolo[tk] = false;
    if (S.trackVolumes[tk] == null) S.trackVolumes[tk] = 100;
    if (S.trackPans[tk] == null) S.trackPans[tk] = 0;
  }
  if (isVideoTrack(tk) && !S.videoTracks.includes(tk)) S.videoTracks.unshift(tk);
  if (isAudioTrack(tk) && !S.audioTracks.includes(tk)) S.audioTracks.push(tk);
}

function clearAllTracksClips() {
  getAllTrackIds().forEach(tk => { S.clips[tk] = []; });
}

function getTrackDisplayName(tk) {
  const num = String(tk || "").slice(1);
  if (tk === "v1") return "V1 · Vídeo Principal";
  if (tk === "v2") return "V2 · Superposição / PiP";
  if (isVideoTrack(tk)) return `V${num} · Vídeo / Camada ${num}`;
  if (tk === "a1") return "A1 · Áudio / Voz 1";
  if (tk === "a2") return "A2 · Música / Trilha 2";
  return `A${num} · Áudio / SFX ${num}`;
}

function addVideoTrack(silent = false) {
  let maxN = 0;
  S.videoTracks.forEach(tk => {
    const n = parseInt(tk.slice(1), 10) || 0;
    if (n > maxN) maxN = n;
  });
  const newTk = `v${maxN + 1}`;
  ensureTrackExists(newTk);
  S.targetVideoTrack = newTk;
  if (!silent) {
    renderTimeline();
    if (S.sideTab === "bin") renderSide();
    toast(`Nova faixa de vídeo ${newTk.toUpperCase()} adicionada no topo da Linha do Tempo!`);
  }
  return newTk;
}

function addAudioTrack(silent = false) {
  let maxN = 0;
  S.audioTracks.forEach(tk => {
    const n = parseInt(tk.slice(1), 10) || 0;
    if (n > maxN) maxN = n;
  });
  const newTk = `a${maxN + 1}`;
  ensureTrackExists(newTk);
  S.targetAudioTrack = newTk;
  if (!silent) {
    renderTimeline();
    if (S.sideTab === "bin") renderSide();
    toast(`Nova faixa de áudio ${newTk.toUpperCase()} adicionada na Linha do Tempo!`);
  }
  return newTk;
}

function findOrCreateFreeOverlayTrack(kind, startSec, durSec) {
  const isAud = kind === "audio";
  const candidates = isAud
    ? S.audioTracks
    : getVideoTracksBottomUp().filter(t => t !== "v1");

  for (const tk of candidates) {
    if (S.tracksLocked[tk]) continue;
    const busy = (S.clips[tk] || []).some(c => startSec + durSec > c.start + 0.02 && startSec < c.start + c.dur - 0.02);
    if (!busy) return tk;
  }
  return isAud ? addAudioTrack(true) : addVideoTrack(true);
}

function cur() {
  return S.curId ? S.eps[S.curId] : null;
}

const epTag = m => `${(m && m.prefixo) || "EP"}${pad2((m && m.episodio) || 1)}`;
const epCode = m => `${(m && m.codigo) || "ANS001"}_${epTag(m)}`;
const epLabel = s => `${epTag(s.meta)} · ${String((s.meta && s.meta.titulo) || "").replace(/[.“”"]+$/, "")}`;
const baseName = x => String(x || "").replace(/\s*\(.*$/, "").trim().toUpperCase();

/* ---------- Versão 1.0.6: Gestão de Múltiplas Timelines / Sequências no Mesmo Projeto ---------- */
function ensureSequencesInitialized() {
  if (!Array.isArray(S.sequences) || !S.sequences.length) {
    S.sequences = [
      {
        id: "seq_1",
        name: "Sequência 1",
        videoTracks: [...S.videoTracks],
        audioTracks: [...S.audioTracks],
        clips: JSON.parse(JSON.stringify(S.clips || {})),
        markers: [...(S.markers || [])],
        totalDur: S.totalDur || 30,
        playhead: S.playhead || 0,
        tlIn: S.tlIn ?? null,
        tlOut: S.tlOut ?? null,
        targetVideoTrack: S.targetVideoTrack || "v1",
        targetAudioTrack: S.targetAudioTrack || "a1",
        tracksMuted: Object.assign({}, S.tracksMuted),
        tracksLocked: Object.assign({}, S.tracksLocked),
        tracksSolo: Object.assign({}, S.tracksSolo),
        trackVolumes: Object.assign({}, S.trackVolumes),
        trackPans: Object.assign({}, S.trackPans)
      }
    ];
    S.activeSequenceId = "seq_1";
  }
}

function syncActiveSequenceToState() {
  ensureSequencesInitialized();
  const seq = S.sequences.find(s => s.id === S.activeSequenceId);
  if (!seq) return;
  seq.videoTracks = [...S.videoTracks];
  seq.audioTracks = [...S.audioTracks];
  seq.clips = JSON.parse(JSON.stringify(S.clips));
  seq.markers = [...S.markers];
  seq.totalDur = S.totalDur;
  seq.playhead = S.playhead;
  seq.tlIn = S.tlIn;
  seq.tlOut = S.tlOut;
  seq.targetVideoTrack = S.targetVideoTrack;
  seq.targetAudioTrack = S.targetAudioTrack;
  seq.tracksMuted = Object.assign({}, S.tracksMuted);
  seq.tracksLocked = Object.assign({}, S.tracksLocked);
  seq.tracksSolo = Object.assign({}, S.tracksSolo);
  seq.trackVolumes = Object.assign({}, S.trackVolumes);
  seq.trackPans = Object.assign({}, S.trackPans);
}

function loadSequenceIntoState(seqId) {
  ensureSequencesInitialized();
  syncActiveSequenceToState();
  const seq = S.sequences.find(s => s.id === seqId);
  if (!seq) return;
  S.activeSequenceId = seqId;
  S.videoTracks = [...seq.videoTracks];
  S.audioTracks = [...seq.audioTracks];
  S.clips = JSON.parse(JSON.stringify(seq.clips || {}));
  S.markers = [...(seq.markers || [])];
  S.totalDur = Number(seq.totalDur) || 30;
  S.playhead = Number(seq.playhead) || 0;
  S.tlIn = seq.tlIn ?? null;
  S.tlOut = seq.tlOut ?? null;
  S.targetVideoTrack = seq.targetVideoTrack || "v1";
  S.targetAudioTrack = seq.targetAudioTrack || "a1";
  S.tracksMuted = Object.assign({}, seq.tracksMuted || {});
  S.tracksLocked = Object.assign({}, seq.tracksLocked || {});
  S.tracksSolo = Object.assign({}, seq.tracksSolo || {});
  S.trackVolumes = Object.assign({}, seq.trackVolumes || {});
  S.trackPans = Object.assign({}, seq.trackPans || {});
  S.selectedClipId = null;
  S.selectedClipTrack = null;
  S.selectedClipIds = [];
  S.selectedGap = null;
  S.undoStack = [];
  S.redoStack = [];
  recalcSequenceDuration();
  renderAll();
  toast(`Sequência "${seq.name}" carregada na Linha do Tempo.`);
}

function createNewSequence(customName = null) {
  if (customName !== null && typeof customName === "string" && customName.trim()) {
    return createNewSequenceDirect(customName);
  }
  openNewSequenceDialog();
}

function createNewSequenceDirect(name = null, numV = 3, numA = 3) {
  ensureSequencesInitialized();
  syncActiveSequenceToState();
  const defName = `Sequência ${S.sequences.length + 1}`;
  const finalName = (name && name.trim()) ? name.trim() : defName;
  const newId = uid("seq_");

  const vTracks = [];
  const clipsObj = {};
  for (let i = numV; i >= 1; i--) {
    const tkId = `v${i}`;
    vTracks.push(tkId);
    clipsObj[tkId] = [];
  }

  const aTracks = [];
  for (let j = 1; j <= numA; j++) {
    const tkId = `a${j}`;
    aTracks.push(tkId);
    clipsObj[tkId] = [];
  }

  const newSeq = {
    id: newId,
    name: finalName,
    videoTracks: vTracks,
    audioTracks: aTracks,
    clips: clipsObj,
    markers: [],
    totalDur: 30,
    playhead: 0,
    tlIn: null,
    tlOut: null,
    targetVideoTrack: "v1",
    targetAudioTrack: "a1",
    tracksMuted: {},
    tracksLocked: {},
    tracksSolo: {},
    trackVolumes: { master: 100 },
    trackPans: {}
  };
  vTracks.forEach(k => { newSeq.tracksMuted[k] = false; newSeq.tracksLocked[k] = false; });
  aTracks.forEach(k => {
    newSeq.tracksMuted[k] = false;
    newSeq.tracksLocked[k] = false;
    newSeq.tracksSolo[k] = false;
    newSeq.trackVolumes[k] = 100;
    newSeq.trackPans[k] = 0;
  });

  S.sequences.push(newSeq);
  S.isDirty = true;
  loadSequenceIntoState(newId);
  toast(`Nova Sequência "${newSeq.name}" criada!`);
  return newSeq;
}

function openNewSequenceDialog() {
  ensureSequencesInitialized();
  const defName = `Sequência ${S.sequences.length + 1}`;
  dialog({
    id: "newSeqWin",
    title: "Nova Sequência / Linha do Tempo",
    width: 380,
    body: `
      <div class="col" style="gap:8px">
        <label class="fld"><span>Nome da Nova Linha do Tempo:</span>
          <input type="text" id="seq-name-input" value="${escH(defName)}" style="font-weight:bold">
        </label>
        <div class="row" style="gap:8px">
          <label class="fld" style="flex:1"><span>Faixas de Vídeo (V):</span>
            <input type="number" id="seq-vtracks" value="3" min="1" max="16">
          </label>
          <label class="fld" style="flex:1"><span>Faixas de Áudio (A):</span>
            <input type="number" id="seq-atracks" value="3" min="1" max="16">
          </label>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "OK",
        def: 1,
        run: (w) => {
          const nameInput = w.querySelector("#seq-name-input");
          const name = (nameInput?.value || defName).trim() || defName;
          const numV = Math.max(1, Math.min(16, parseInt(w.querySelector("#seq-vtracks")?.value, 10) || 3));
          const numA = Math.max(1, Math.min(16, parseInt(w.querySelector("#seq-atracks")?.value, 10) || 3));
          createNewSequenceDirect(name, numV, numA);
        }
      },
      { label: "Cancelar" }
    ]
  });
  setTimeout(() => {
    const inp = document.getElementById("seq-name-input");
    if (inp) { inp.focus(); inp.select(); }
  }, 50);
}

function duplicateActiveSequence() {
  ensureSequencesInitialized();
  syncActiveSequenceToState();
  const curSeq = S.sequences.find(s => s.id === S.activeSequenceId);
  if (!curSeq) return;
  const dupId = uid("seq_");
  const dupName = `${curSeq.name} (Cópia)`;
  const dupSeq = JSON.parse(JSON.stringify(curSeq));
  dupSeq.id = dupId;
  dupSeq.name = dupName;
  S.sequences.push(dupSeq);
  S.isDirty = true;
  loadSequenceIntoState(dupId);
  toast(`Sequência duplicada: "${dupName}"`);
}

function closeSequence(seqId) {
  ensureSequencesInitialized();
  if (S.sequences.length <= 1) {
    toast("O projeto precisa manter ao menos uma Sequência aberta.");
    return;
  }
  const idx = S.sequences.findIndex(s => s.id === seqId);
  if (idx < 0) return;
  const seqName = S.sequences[idx].name;
  dialog({
    id: "closeSeqConfirmWin",
    title: "Fechar Sequência",
    width: 360,
    body: `<div style="padding:6px 0">Deseja realmente fechar a sequência <b>"${escH(seqName)}"</b>?</div>`,
    buttons: [
      {
        label: "Sim",
        def: 1,
        run: () => {
          S.sequences.splice(idx, 1);
          S.isDirty = true;
          if (S.activeSequenceId === seqId) {
            const nextSeq = S.sequences[Math.max(0, idx - 1)];
            loadSequenceIntoState(nextSeq.id);
          } else {
            renderSequenceTabs();
          }
          toast(`Sequência "${seqName}" fechada.`);
        }
      },
      { label: "Não" }
    ]
  });
}

function renameSequence(seqId) {
  ensureSequencesInitialized();
  const seq = S.sequences.find(s => s.id === seqId);
  if (!seq) return;
  dialog({
    id: "renameSeqWin",
    title: "Renomear Sequência",
    width: 360,
    body: `
      <div class="col" style="gap:6px">
        <label class="fld"><span>Novo Nome da Sequência:</span>
          <input type="text" id="rename-seq-input" value="${escH(seq.name)}" style="font-weight:bold">
        </label>
      </div>
    `,
    buttons: [
      {
        label: "OK",
        def: 1,
        run: (w) => {
          const val = w.querySelector("#rename-seq-input")?.value?.trim();
          if (val && val !== seq.name) {
            seq.name = val;
            S.isDirty = true;
            renderSequenceTabs();
            updateStatusBar();
            toast(`Sequência renomeada para "${seq.name}"`);
          }
        }
      },
      { label: "Cancelar" }
    ]
  });
  setTimeout(() => {
    const inp = document.getElementById("rename-seq-input");
    if (inp) { inp.focus(); inp.select(); }
  }, 50);
}

function renderSequenceTabs() {
  const bar = document.getElementById("tlSeqBar");
  if (!bar) return;
  ensureSequencesInitialized();
  let html = "";
  for (const seq of S.sequences) {
    const isActive = seq.id === S.activeSequenceId;
    const canClose = S.sequences.length > 1;
    html += `<div class="tl-seq-tab${isActive ? " active" : ""}" data-seqid="${seq.id}" title="Sequência: ${escH(seq.name)} · Clique para alternar, duplo-clique para renomear, botão direito para opções">
      <span class="tab-icon">${icon("seq", 14)}</span>
      <span class="tab-title">${escH(seq.name)}</span>
      ${canClose ? `<span class="tab-close" data-seqclose="${seq.id}" title="Fechar esta sequência">×</span>` : ""}
    </div>`;
  }
  html += `<button type="button" class="tl-seq-add" id="btnAddSequence" title="Criar Nova Sequência de Montagem (Ctrl+N)">+</button>`;
  bar.innerHTML = html;

  bar.querySelectorAll(".tl-seq-tab").forEach(tab => {
    tab.onclick = (e) => {
      if (e.target.closest(".tab-close")) return;
      const sid = tab.dataset.seqid;
      if (sid && sid !== S.activeSequenceId) {
        loadSequenceIntoState(sid);
      }
    };
    tab.ondblclick = (e) => {
      if (e.target.closest(".tab-close")) return;
      const sid = tab.dataset.seqid;
      if (sid) renameSequence(sid);
    };
    tab.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const sid = tab.dataset.seqid;
      showSequenceContextMenu(sid, e.clientX, e.clientY);
    };
  });

  bar.querySelectorAll(".tab-close").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const sid = btn.dataset.seqclose;
      if (sid) closeSequence(sid);
    };
  });

  const btnAdd = document.getElementById("btnAddSequence");
  if (btnAdd) {
    btnAdd.onclick = () => createNewSequence();
  }
}

function showSequenceContextMenu(seqId, x, y) {
  const seq = S.sequences.find(s => s.id === seqId);
  if (!seq) return;
  closeMenus();
  const m = document.createElement("div");
  m.className = "menu";
  m.innerHTML = `
    <div style="font:bold 11px var(--font-ui);padding:3px 8px;background:var(--hi);color:#000;border-bottom:1px solid #808080">
      Sequência: ${escH(seq.name)}
    </div>
    <button type="button" class="mi" data-act="open"><span class="ic">${icon("open", 16)}</span><span>Abrir Sequência</span></button>
    <button type="button" class="mi" data-act="rename"><span class="ic">${icon("editor", 16)}</span><span>Renomear Sequência…</span></button>
    <button type="button" class="mi" data-act="duplicate"><span class="ic">${icon("new", 16)}</span><span>Duplicar Sequência</span></button>
    <button type="button" class="mi" data-act="new"><span class="ic">${icon("seq", 16)}</span><span>Nova Sequência…</span><span class="k">Ctrl+N</span></button>
    <hr>
    <button type="button" class="mi" data-act="close"><span class="ic">${icon("power", 16)}</span><span>Fechar Sequência</span></button>
  `;
  document.body.appendChild(m);
  menuStack.push(m);
  const w = m.offsetWidth, h = m.offsetHeight;
  m.style.left = Math.max(4, Math.min(x, innerWidth - w - 4)) + "px";
  m.style.top = Math.max(4, Math.min(y, innerHeight - h - 4)) + "px";
  m.onclick = (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const act = b.dataset.act;
    closeMenus();
    if (act === "open") loadSequenceIntoState(seqId);
    else if (act === "rename") renameSequence(seqId);
    else if (act === "duplicate") duplicateActiveSequence();
    else if (act === "new") createNewSequence();
    else if (act === "close") closeSequence(seqId);
  };
}

/* ---------- Versão 1.0.6: Detecção e Eliminação de Ondulação de Espaço Vazio (Gap Selection & Ripple Delete) ---------- */
function getTrackGaps(tk) {
  const clips = (S.clips[tk] || []).slice().sort((a, b) => a.start - b.start);
  const gaps = [];
  let prevEnd = 0;
  for (const c of clips) {
    if (c.start - prevEnd >= 0.04) {
      gaps.push({
        track: tk,
        start: Number(prevEnd.toFixed(2)),
        end: Number(c.start.toFixed(2)),
        dur: Number((c.start - prevEnd).toFixed(2))
      });
    }
    prevEnd = Math.max(prevEnd, c.start + c.dur);
  }
  return gaps;
}

function rippleDeleteGap(gap, allTracks = false) {
  if (!gap || gap.dur <= 0) return;
  saveUndoSnapshot();
  const dur = gap.dur;
  const startPt = gap.start;
  const tracksToShift = allTracks ? getAllTrackIds().filter(t => !S.tracksLocked[t]) : [gap.track];

  tracksToShift.forEach(tk => {
    const list = S.clips[tk] || [];
    list.forEach(c => {
      if (c.start >= startPt - 0.01) {
        c.start = Number(Math.max(0, c.start - dur).toFixed(2));
      }
    });
    resolveTrackOverlaps(tk);
  });

  S.selectedGap = null;
  recalcSequenceDuration();
  renderTimeline();
  updateStatusBar();
  playFoleySound("claquete", 0.04);
  toast(`Espaço de ${dur.toFixed(2)}s fechado com ondulação (Ripple Delete)!`);
}

function showGapContextMenu(gap, clientX, clientY) {
  closeMenus();
  const m = document.createElement("div");
  m.className = "menu";
  m.innerHTML = `
    <div style="font:bold 11px var(--font-ui);padding:3px 8px;background:var(--hi);color:#000;border-bottom:1px solid #808080">
      Espaço Vazio [${gap.track.toUpperCase()}]: ${gap.dur.toFixed(2)}s (${mmss(gap.start)}–${mmss(gap.end)})
    </div>
    <button type="button" class="mi" data-act="ripple"><span class="ic">${icon("cut", 16)}</span><span>Eliminar Ondulação (Fechar Espaço)</span><span class="k">Delete</span></button>
    <button type="button" class="mi" data-act="rippleAll"><span class="ic">${icon("cut", 16)}</span><span>Fechar Espaço em Todas as Faixas</span><span class="k">Shift+Del</span></button>
    <hr>
    <button type="button" class="mi" data-act="fillBars"><span class="ic">${icon("film", 16)}</span><span>Preencher com Barras de Cor / SMPTE…</span></button>
    <button type="button" class="mi" data-act="fillGC"><span class="ic">${icon("tv", 16)}</span><span>Preencher com Cartela / Letreiro…</span></button>
  `;
  document.body.appendChild(m);
  menuStack.push(m);
  const w = m.offsetWidth, h = m.offsetHeight;
  m.style.left = Math.max(4, Math.min(clientX, innerWidth - w - 4)) + "px";
  m.style.top = Math.max(4, Math.min(clientY, innerHeight - h - 4)) + "px";
  m.onclick = (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const act = b.dataset.act;
    closeMenus();
    if (act === "ripple") rippleDeleteGap(gap, false);
    else if (act === "rippleAll") rippleDeleteGap(gap, true);
    else if (act === "fillBars") openGeneratorDialog();
    else if (act === "fillGC") openChyronDialog();
  };
}

/* ---------- Versão 1.0.6: Área de Trabalho & Pontos IN/OUT na Linha do Tempo ---------- */
function setTimelineIn(sec = null) {
  S.tlIn = Number((sec != null ? sec : S.playhead).toFixed(2));
  if (S.tlOut != null && S.tlOut <= S.tlIn) S.tlOut = Number((S.tlIn + 1).toFixed(2));
  saveUndoSnapshot();
  renderTimeline();
  toast(`Ponto de Entrada (IN) da Timeline: ${mmss(S.tlIn)}`);
}

function setTimelineOut(sec = null) {
  S.tlOut = Number((sec != null ? sec : S.playhead).toFixed(2));
  if (S.tlIn != null && S.tlIn >= S.tlOut) S.tlIn = Number(Math.max(0, S.tlOut - 1).toFixed(2));
  saveUndoSnapshot();
  renderTimeline();
  toast(`Ponto de Saída (OUT) da Timeline: ${mmss(S.tlOut)}`);
}

function clearTimelineInOut() {
  S.tlIn = null;
  S.tlOut = null;
  saveUndoSnapshot();
  renderTimeline();
  toast("Pontos IN e OUT da Linha do Tempo limpos (Alt+X).");
}

/* ---------- Versão 1.0.6: Snapping Magnético & Linhas Guia ---------- */
function toggleSnap(forceVal = null) {
  prefs.snap = forceVal !== null ? !!forceVal : !prefs.snap;
  savePrefs();
  const chk = document.getElementById("chkSnap");
  if (chk) chk.checked = prefs.snap;
  const btn = document.getElementById("btnSnapToggle");
  if (btn) btn.classList.toggle("snap-on", prefs.snap);
  toast(prefs.snap ? "Ímã Magnético de Encaixe ATIVADO (Tecla S)" : "Ímã Magnético DESATIVADO (Tecla S)");
}

function showSnapLine(sec) {
  const area = document.getElementById("tlArea");
  if (!area) return;
  let line = area.querySelector(".tl-snap-line");
  if (!line) {
    line = document.createElement("div");
    line.className = "tl-snap-line";
    area.appendChild(line);
  }
  const pxPerSec = Number(prefs.tlZoom) || 10;
  line.style.left = Math.round(sec * pxPerSec) + "px";
  line.style.display = "block";
}

function hideSnapLine() {
  const line = document.querySelector(".tl-snap-line");
  if (line) line.style.display = "none";
}

/* ---------- Histórico Desfazer / Refazer (Undo / Redo de 40 passos) ---------- */
function saveUndoSnapshot() {
  const snap = JSON.stringify({
    videoTracks: S.videoTracks,
    audioTracks: S.audioTracks,
    clips: S.clips,
    markers: S.markers,
    trackVolumes: S.trackVolumes,
    trackPans: S.trackPans,
    selectedClipId: S.selectedClipId,
    selectedClipTrack: S.selectedClipTrack,
    selectedClipIds: Array.isArray(S.selectedClipIds) ? [...S.selectedClipIds] : [],
    tlIn: S.tlIn,
    tlOut: S.tlOut
  });
  if (S.undoStack.length && S.undoStack[S.undoStack.length - 1] === snap) return;
  S.undoStack.push(snap);
  if (S.undoStack.length > 40) S.undoStack.shift();
  S.redoStack = [];
  S.isDirty = true;
  updateStatusBar();
}

function undoEdit() {
  if (!S.undoStack.length) {
    toast("Nada para desfazer.");
    return;
  }
  const curSnap = JSON.stringify({
    videoTracks: S.videoTracks,
    audioTracks: S.audioTracks,
    clips: S.clips,
    markers: S.markers,
    trackVolumes: S.trackVolumes,
    trackPans: S.trackPans,
    selectedClipId: S.selectedClipId,
    selectedClipTrack: S.selectedClipTrack,
    selectedClipIds: Array.isArray(S.selectedClipIds) ? [...S.selectedClipIds] : [],
    tlIn: S.tlIn,
    tlOut: S.tlOut
  });
  S.redoStack.push(curSnap);
  const prev = JSON.parse(S.undoStack.pop());
  if (prev.videoTracks) S.videoTracks = prev.videoTracks;
  if (prev.audioTracks) S.audioTracks = prev.audioTracks;
  if (prev.trackVolumes) S.trackVolumes = prev.trackVolumes;
  if (prev.trackPans) S.trackPans = prev.trackPans;
  if (prev.markers) S.markers = prev.markers;
  S.clips = prev.clips;
  S.selectedClipId = prev.selectedClipId;
  S.selectedClipTrack = prev.selectedClipTrack;
  S.selectedClipIds = prev.selectedClipIds || (prev.selectedClipId ? [prev.selectedClipId] : []);
  if (prev.tlIn !== undefined) S.tlIn = prev.tlIn;
  if (prev.tlOut !== undefined) S.tlOut = prev.tlOut;
  recalcSequenceDuration();
  renderAll();
  toast("Ação desfeita (Ctrl+Z).");
}

function redoEdit() {
  if (!S.redoStack.length) {
    toast("Nada para refazer.");
    return;
  }
  const curSnap = JSON.stringify({
    videoTracks: S.videoTracks,
    audioTracks: S.audioTracks,
    clips: S.clips,
    markers: S.markers,
    trackVolumes: S.trackVolumes,
    trackPans: S.trackPans,
    selectedClipId: S.selectedClipId,
    selectedClipTrack: S.selectedClipTrack,
    selectedClipIds: Array.isArray(S.selectedClipIds) ? [...S.selectedClipIds] : [],
    tlIn: S.tlIn,
    tlOut: S.tlOut
  });
  S.undoStack.push(curSnap);
  const next = JSON.parse(S.redoStack.pop());
  if (next.videoTracks) S.videoTracks = next.videoTracks;
  if (next.audioTracks) S.audioTracks = next.audioTracks;
  if (next.trackVolumes) S.trackVolumes = next.trackVolumes;
  if (next.trackPans) S.trackPans = next.trackPans;
  if (next.markers) S.markers = next.markers;
  S.clips = next.clips;
  S.selectedClipId = next.selectedClipId;
  S.selectedClipTrack = next.selectedClipTrack;
  S.selectedClipIds = next.selectedClipIds || (next.selectedClipId ? [next.selectedClipId] : []);
  if (next.tlIn !== undefined) S.tlIn = next.tlIn;
  if (next.tlOut !== undefined) S.tlOut = next.tlOut;
  recalcSequenceDuration();
  renderAll();
  toast("Ação refeita (Ctrl+Y).");
}

function isClipSelected(id) {
  if (!id) return false;
  if (Array.isArray(S.selectedClipIds) && S.selectedClipIds.includes(id)) return true;
  return S.selectedClipId === id;
}

function getSelectedClip() {
  if (S.selectedClipId) {
    for (const tk of getAllTrackIds()) {
      const found = (S.clips[tk] || []).find(c => c.id === S.selectedClipId);
      if (found) return found;
    }
  }
  if (Array.isArray(S.selectedClipIds) && S.selectedClipIds.length > 0) {
    for (const tk of getAllTrackIds()) {
      const found = (S.clips[tk] || []).find(c => c.id === S.selectedClipIds[0]);
      if (found) return found;
    }
  }
  return null;
}

function getSelectedClipsList() {
  const ids = new Set(Array.isArray(S.selectedClipIds) ? S.selectedClipIds : []);
  if (S.selectedClipId) ids.add(S.selectedClipId);
  const result = [];
  getAllTrackIds().forEach(tk => {
    (S.clips[tk] || []).forEach(c => {
      if (ids.has(c.id)) {
        result.push({ clip: c, track: tk });
      }
    });
  });
  return result;
}

function clearClipSelection() {
  S.selectedClipIds = [];
  S.selectedClipId = null;
  S.selectedClipTrack = null;
  S.selectedGap = null;
}

function selectClip(clipId, track, isMulti = false, toggle = false) {
  if (!Array.isArray(S.selectedClipIds)) S.selectedClipIds = [];
  S.selectedGap = null;

  // Busca o clipe para verificar se faz parte de grupo ou vínculo
  let clipObj = null;
  getAllTrackIds().forEach(tk => {
    const found = (S.clips[tk] || []).find(c => c.id === clipId);
    if (found) clipObj = found;
  });

  const memberIds = [clipId];
  if (clipObj && clipObj.groupId) {
    getAllTrackIds().forEach(tk => {
      (S.clips[tk] || []).forEach(c => {
        if (c.groupId === clipObj.groupId && !memberIds.includes(c.id)) {
          memberIds.push(c.id);
        }
      });
    });
  }
  if (clipObj && clipObj.linkId) {
    getAllTrackIds().forEach(tk => {
      (S.clips[tk] || []).forEach(c => {
        if (c.linkId === clipObj.linkId && !memberIds.includes(c.id)) {
          memberIds.push(c.id);
        }
      });
    });
  }

  if (isMulti) {
    const allAlreadyIn = memberIds.every(id => S.selectedClipIds.includes(id));
    if (toggle && allAlreadyIn) {
      S.selectedClipIds = S.selectedClipIds.filter(id => !memberIds.includes(id));
      if (S.selectedClipId && memberIds.includes(S.selectedClipId)) {
        S.selectedClipId = S.selectedClipIds[0] || null;
      }
    } else {
      memberIds.forEach(id => {
        if (!S.selectedClipIds.includes(id)) S.selectedClipIds.push(id);
      });
      S.selectedClipId = clipId;
      S.selectedClipTrack = track;
    }
  } else {
    S.selectedClipIds = [...memberIds];
    S.selectedClipId = clipId;
    S.selectedClipTrack = track;
  }
}

function selectAllClips() {
  clearClipSelection();
  const allIds = [];
  getAllTrackIds().forEach(tk => {
    (S.clips[tk] || []).forEach(c => allIds.push(c.id));
  });
  S.selectedClipIds = allIds;
  if (allIds.length > 0) {
    S.selectedClipId = allIds[0];
  }
  renderTimeline();
  updateStatusBar();
  toast(`${allIds.length} clipe(s) selecionado(s) em todas as faixas (Ctrl+A).`);
}

function selectTrackClips(tk) {
  if (!S.clips[tk] || !S.clips[tk].length) {
    toast(`Nenhum clipe na faixa ${tk.toUpperCase()}.`);
    return;
  }
  if (!Array.isArray(S.selectedClipIds)) S.selectedClipIds = [];
  const trackClipIds = (S.clips[tk] || []).map(c => c.id);
  trackClipIds.forEach(id => {
    if (!S.selectedClipIds.includes(id)) S.selectedClipIds.push(id);
  });
  S.selectedClipId = trackClipIds[0];
  S.selectedClipTrack = tk;
  renderTimeline();
  updateStatusBar();
  toast(`Todos os ${trackClipIds.length} clipe(s) da faixa ${tk.toUpperCase()} selecionados!`);
}

function groupSelectedClips() {
  const selectedList = getSelectedClipsList();
  if (selectedList.length < 2) {
    toast("Selecione pelo menos 2 clipes para agrupar (use Shift+Clique ou o Laço do mouse).");
    return;
  }
  saveUndoSnapshot();
  const newGroupId = uid("grp_");
  selectedList.forEach(item => {
    item.clip.groupId = newGroupId;
  });
  renderTimeline();
  updateStatusBar();
  toast(`${selectedList.length} clipes agrupados com sucesso (Ctrl+G)!`);
}

function ungroupSelectedClips() {
  const selectedList = getSelectedClipsList();
  if (!selectedList.length) {
    toast("Selecione os clipes do grupo para desagrupar.");
    return;
  }
  saveUndoSnapshot();
  const groupIds = new Set(selectedList.map(item => item.clip.groupId).filter(Boolean));
  if (!groupIds.size) {
    toast("Nenhum dos clipes selecionados pertence a um grupo.");
    return;
  }
  let count = 0;
  getAllTrackIds().forEach(tk => {
    (S.clips[tk] || []).forEach(c => {
      if (c.groupId && groupIds.has(c.groupId)) {
        delete c.groupId;
        count++;
      }
    });
  });
  renderTimeline();
  updateStatusBar();
  toast(`${count} clipe(s) desagrupado(s) (Ctrl+Shift+G).`);
}

function linkSelectedClips() {
  const selectedList = getSelectedClipsList();
  if (selectedList.length < 2) {
    toast("Selecione pelo menos 1 clipe de vídeo e 1 de áudio para vincular/desvincular (Ctrl+L).");
    return;
  }
  const hasLink = selectedList.some(item => item.clip.linkId);
  if (hasLink) {
    saveUndoSnapshot();
    const linkIds = new Set(selectedList.map(item => item.clip.linkId).filter(Boolean));
    let count = 0;
    getAllTrackIds().forEach(tk => {
      (S.clips[tk] || []).forEach(c => {
        if (c.linkId && linkIds.has(c.linkId)) {
          delete c.linkId;
          delete c.syncOffset;
          count++;
        }
      });
    });
    renderTimeline();
    toast(`${count} clipe(s) desvinculado(s) de áudio e vídeo.`);
    return;
  }

  saveUndoSnapshot();
  const newLinkId = uid("lnk_");
  const vItem = selectedList.find(item => isVideoTrack(item.track));
  const aItem = selectedList.find(item => isAudioTrack(item.track));
  const offset = (vItem && aItem) ? Number((vItem.clip.start - aItem.clip.start).toFixed(2)) : 0;

  selectedList.forEach(item => {
    item.clip.linkId = newLinkId;
    item.clip.syncOffset = offset;
  });
  renderTimeline();
  toast("Áudio e Vídeo vinculados com sucesso (Ctrl+L)!");
}

function openPasteAttributesDialog() {
  if (!S.clipboardClip) {
    toast("Copie um clipe primeiro com Ctrl+C para ter atributos a colar.");
    return;
  }
  const targets = getSelectedClipsList();
  if (!targets.length) {
    toast("Selecione um ou mais clipes na timeline para colar atributos.");
    return;
  }

  dialog({
    id: "pasteAttrWin",
    title: "Colar Atributos (Paste Attributes 1995)",
    width: 440,
    body: `
      <div class="col" style="gap:8px">
        <div>Copiar atributos de: <b>${escH(S.clipboardClip.title)}</b></div>
        <div>Aplicar a: <b>${targets.length} clipe(s) selecionado(s)</b></div>
        <fieldset class="groupbox" style="margin-top:4px">
          <legend>Atributos de Vídeo</legend>
          <label class="row" style="gap:6px;cursor:pointer"><input type="checkbox" id="pa-motion" checked> <span>Movimento (Escala, Posição, Rotação e Recorte)</span></label>
          <label class="row" style="gap:6px;cursor:pointer"><input type="checkbox" id="pa-fit" checked> <span>Modo de Ajuste de Tela (Contain / Stretch)</span></label>
          <label class="row" style="gap:6px;cursor:pointer"><input type="checkbox" id="pa-fx" checked> <span>Transição e Filtro Master de Imagem</span></label>
        </fieldset>
        <fieldset class="groupbox">
          <legend>Atributos de Áudio e Tempo</legend>
          <label class="row" style="gap:6px;cursor:pointer"><input type="checkbox" id="pa-speed" checked> <span>Velocidade e Reversão (${Math.round((S.clipboardClip.speed || 1) * 100)}%)</span></label>
          <label class="row" style="gap:6px;cursor:pointer"><input type="checkbox" id="pa-vol" checked> <span>Volume, Pan e Curva Rubberband</span></label>
        </fieldset>
      </div>
    `,
    buttons: [
      {
        label: "Colar Atributos",
        def: 1,
        run: () => {
          const doMotion = document.getElementById("pa-motion")?.checked;
          const doFit = document.getElementById("pa-fit")?.checked;
          const doFx = document.getElementById("pa-fx")?.checked;
          const doSpeed = document.getElementById("pa-speed")?.checked;
          const doVol = document.getElementById("pa-vol")?.checked;

          saveUndoSnapshot();
          const src = S.clipboardClip;
          targets.forEach(item => {
            const dest = item.clip;
            if (doMotion) {
              dest.scale = src.scale != null ? src.scale : 100;
              dest.scaleX = src.scaleX != null ? src.scaleX : 100;
              dest.scaleY = src.scaleY != null ? src.scaleY : 100;
              dest.posX = src.posX != null ? src.posX : 0;
              dest.posY = src.posY != null ? src.posY : 0;
              dest.rotation = src.rotation != null ? src.rotation : 0;
              dest.cropTop = src.cropTop || 0;
              dest.cropBottom = src.cropBottom || 0;
              dest.cropLeft = src.cropLeft || 0;
              dest.cropRight = src.cropRight || 0;
            }
            if (doFit && src.fitMode) dest.fitMode = src.fitMode;
            if (doFx) {
              if (src.trans) dest.trans = src.trans;
              if (src.transDur) dest.transDur = src.transDur;
            }
            if (doSpeed && src.speed != null) dest.speed = src.speed;
            if (doVol) {
              if (src.vol != null) dest.vol = src.vol;
              if (src.pan != null) dest.pan = src.pan;
              if (Array.isArray(src.rubberband)) {
                dest.rubberband = JSON.parse(JSON.stringify(src.rubberband));
              }
            }
          });
          renderAll();
          toast(`Atributos colados em ${targets.length} clipe(s)!`);
        }
      },
      { label: "Cancelar" }
    ]
  });
}

// ============================================================================
// SELETOR DE CORES OFICIAL DO WINDOWS 95 (CHOOSECOLOR / COMMDLG32.DLL)
// ============================================================================

function rgbToHex(r, g, b) {
  const toH = n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0").toUpperCase();
  return `#${toH(r)}${toH(g)}${toH(b)}`;
}

function hexToRgb(hex) {
  if (!hex) return { r: 0, g: 0, b: 0 };
  let h = String(hex).trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  if (h.length !== 6) return { r: 0, g: 0, b: 0 };
  const num = parseInt(h, 16);
  if (isNaN(num)) return { r: 0, g: 0, b: 0 };
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHslWin95(r, g, b) {
  r = Math.max(0, Math.min(255, r)) / 255;
  g = Math.max(0, Math.min(255, g)) / 255;
  b = Math.max(0, Math.min(255, b)) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let l = (max + min) / 2;
  let h = 160;
  let s = 0;
  if (delta !== 0) {
    s = l <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
    if (r === max) {
      h = ((g - b) / delta) % 6;
    } else if (g === max) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = h * 40;
    if (h < 0) h += 240;
  }
  return {
    h: Math.max(0, Math.min(239, Math.round(h))),
    s: Math.max(0, Math.min(240, Math.round(s * 240))),
    l: Math.max(0, Math.min(240, Math.round(l * 240)))
  };
}

function hslWin95ToRgb(h, s, l) {
  h = (Math.max(0, Math.min(239, h)) % 240) / 240;
  s = Math.max(0, Math.min(240, s)) / 240;
  l = Math.max(0, Math.min(240, l)) / 240;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return {
    r: Math.max(0, Math.min(255, Math.round(r * 255))),
    g: Math.max(0, Math.min(255, Math.round(g * 255))),
    b: Math.max(0, Math.min(255, Math.round(b * 255)))
  };
}

const PALETTES_90S = {
  win95: [
    "#FF8080", "#FFFF80", "#80FF80", "#00FF80", "#80FFFF", "#0080FF", "#FF80C0", "#FF80FF",
    "#FF0000", "#FFFF00", "#80FF00", "#00FF40", "#00FFFF", "#0080C0", "#8080C0", "#FF00FF",
    "#804040", "#FF8040", "#00FF00", "#008080", "#004080", "#8080FF", "#800040", "#FF0080",
    "#800000", "#FF8000", "#008000", "#008040", "#0000FF", "#0000A0", "#800080", "#8000FF",
    "#400000", "#804000", "#004000", "#004040", "#000080", "#000040", "#400040", "#400080",
    "#000000", "#808000", "#808040", "#808080", "#408080", "#C0C0C0", "#400040", "#FFFFFF"
  ],
  netscape216: [
    "#000000", "#003366", "#006699", "#0099CC", "#00CCFF", "#00FFFF", "#330066", "#333399",
    "#3366CC", "#3399FF", "#33CCFF", "#660066", "#663399", "#6666CC", "#6699FF", "#66CCFF",
    "#990066", "#993399", "#9966CC", "#9999FF", "#99CCFF", "#CC0066", "#CC3399", "#CC66CC",
    "#CC99FF", "#CCCCFF", "#FF0066", "#FF3399", "#FF66CC", "#FF99FF", "#FFCCFF", "#FFFFFF",
    "#006600", "#009900", "#00CC00", "#00FF00", "#339933", "#33CC33", "#33FF33", "#66CC66",
    "#66FF66", "#99FF99", "#CCFFCC", "#FFFF00", "#FFCC00", "#FF9900", "#FF6600", "#FF3300"
  ],
  smpte: [
    "#101010", "#202020", "#404040", "#808080", "#A0A0A0", "#C0C0C0", "#E0E0E0", "#EBEBEB",
    "#BFBFBF", "#BFBF00", "#00BFBF", "#00BF00", "#BF00BF", "#BF0000", "#0000BF", "#101010",
    "#002080", "#0040C0", "#0060FF", "#00A0FF", "#00D0D0", "#00A040", "#00D000", "#40FF40",
    "#800000", "#B01010", "#D82020", "#E86020", "#F0A020", "#E8D020", "#D0E020", "#A0D020",
    "#301040", "#602080", "#9030B0", "#B040C0", "#D060D0", "#A03080", "#701850", "#400820",
    "#121A24", "#1E2A38", "#2A3C50", "#3E5875", "#587CA6", "#82A8D8", "#B5D0F5", "#DCEBFF"
  ],
  cga_ega: [
    "#000000", "#0000AA", "#00AA00", "#00AAAA", "#AA0000", "#AA00AA", "#AA5500", "#AAAAAA",
    "#555555", "#5555FF", "#55FF55", "#55FFFF", "#FF5555", "#FF55FF", "#FFFF55", "#FFFFFF",
    "#000000", "#000080", "#008000", "#008080", "#800000", "#800080", "#808000", "#C0C0C0",
    "#808080", "#0000FF", "#00FF00", "#00FFFF", "#FF0000", "#FF00FF", "#FFFF00", "#FFFFFF",
    "#101010", "#202080", "#208020", "#208080", "#802020", "#802080", "#808020", "#D0D0D0",
    "#606060", "#4040FF", "#40FF40", "#40FFFF", "#FF4040", "#FF40FF", "#FFFF40", "#F8F8F8"
  ],
  mac_system7: [
    "#FFFFFF", "#EEEEEE", "#DDDDDD", "#CCCCCC", "#BBBBBB", "#AAAAAA", "#999999", "#888888",
    "#777777", "#666666", "#555555", "#444444", "#333333", "#222222", "#111111", "#000000",
    "#0000FF", "#0266FF", "#02B2FF", "#02FFFF", "#02FFB2", "#02FF66", "#02FF00", "#66FF02",
    "#B2FF02", "#FFFF02", "#FFB202", "#FF6602", "#FF0002", "#FF0266", "#FF02B2", "#FF02FF",
    "#0000AA", "#0040AA", "#0080AA", "#00AAAA", "#00AA80", "#00AA40", "#00AA00", "#40AA00",
    "#80AA00", "#AAAA00", "#AA8000", "#AA4000", "#AA0000", "#AA0040", "#AA0080", "#AA00AA"
  ]
};

function checkSmpteLegal(r, g, b) {
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const ire = 7.5 + (y / 255) * 92.5;
  const u = -0.14713 * r - 0.28886 * g + 0.436 * b;
  const v = 0.615 * r - 0.51499 * g - 0.10001 * b;
  const chroma = Math.sqrt(u * u + v * v);
  const compositePeakIRE = ire + (chroma / 255) * 100;
  const isLegal = r >= 15 && r <= 236 && g >= 15 && g <= 236 && b >= 15 && b <= 236 && compositePeakIRE <= 118;
  const msg = isLegal 
    ? `● SMPTE Broadcast Legal (${ire.toFixed(1)} IRE · Seguro para Fita e Transmissão)` 
    : `⚠️ Ilegal Broadcast (${ire.toFixed(1)} IRE · Pico ${compositePeakIRE.toFixed(0)} IRE: Sangramento VHS)`;
  return { legal: isLegal, ire, compositePeakIRE, message: msg };
}

function clampToSmpteLegal(r, g, b) {
  r = Math.max(16, Math.min(235, r));
  g = Math.max(16, Math.min(235, g));
  b = Math.max(16, Math.min(235, b));
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min > 175) {
    const avg = (r + g + b) / 3;
    r = Math.round(avg + (r - avg) * 0.72);
    g = Math.round(avg + (g - avg) * 0.72);
    b = Math.round(avg + (b - avg) * 0.72);
  }
  return { r, g, b };
}

function drawWin95Dither(canvas, r, g, b) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  const id = ctx.createImageData(w, h);
  const d = id.data;
  const r1 = Math.floor(r / 32) * 32, r2 = Math.min(255, r1 + 32);
  const g1 = Math.floor(g / 32) * 32, g2 = Math.min(255, g1 + 32);
  const b1 = Math.floor(b / 32) * 32, b2 = Math.min(255, b1 + 32);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const checker = ((x ^ y) & 1) === 0;
      d[idx] = checker ? r1 : r2;
      d[idx + 1] = checker ? g1 : g2;
      d[idx + 2] = checker ? b1 : b2;
      d[idx + 3] = 255;
    }
  }
  ctx.putImageData(id, 0, 0);
}

function createWin95ColorButtonHtml(id, colorHex, extraClass = "") {
  const col = (colorHex && colorHex.startsWith("#")) ? colorHex.toUpperCase() : "#000000";
  return `
    <button type="button" class="win95-color-btn ${extraClass}" id="${id}" data-color="${col}">
      <span class="win95-color-chip" style="background:${col}"></span>
      <span class="win95-color-hex-label">${col}</span>
    </button>
  `;
}

function bindWin95ColorButton(btnEl, onColorChange) {
  if (!btnEl) return;
  btnEl.onclick = (e) => {
    e.preventDefault();
    const cur = btnEl.dataset.color || "#000000";
    openWin95ColorDialog(cur, (newHex) => {
      btnEl.dataset.color = newHex;
      const chip = btnEl.querySelector(".win95-color-chip");
      if (chip) chip.style.background = newHex;
      const lbl = btnEl.querySelector(".win95-color-hex-label");
      if (lbl) lbl.textContent = newHex;
      if (typeof onColorChange === "function") onColorChange(newHex);
    });
  };
}

function openWin95ColorDialog(initialColor = "#000000", onSelect = null, options = {}) {
  let currentColor = (initialColor && initialColor.startsWith("#")) ? initialColor.toUpperCase() : "#000000";
  let rgb = hexToRgb(currentColor);
  let hsl = rgbToHslWin95(rgb.r, rgb.g, rgb.b);

  let customColors = [];
  try {
    const saved = localStorage.getItem("scripteditor_custom_colors_95");
    if (saved) customColors = JSON.parse(saved);
  } catch (_e) {}
  if (!Array.isArray(customColors) || customColors.length !== 16) {
    customColors = [
      "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
      "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"
    ];
  }
  let selectedCustomIndex = 0;
  let activePaletteKey = "win95";

  dialog({
    id: "win95ColorDialog",
    title: options.title || "Cores",
    width: 530,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="gap:14px;align-items:flex-start">
          <!-- Coluna Esquerda: Paletas e Cores Básicas / Personalizadas -->
          <div class="col" style="width:200px;gap:6px">
            <label class="w95-palette-label" style="display:flex;align-items:center;justify-content:space-between">
              <span>Paleta 90s:</span>
              <select id="w95PaletteSel" style="font-size:11px;height:21px;width:125px">
                <option value="win95" selected>Windows 95 (48)</option>
                <option value="netscape216">Netscape 216 (Web)</option>
                <option value="smpte">SMPTE Safe (TV)</option>
                <option value="cga_ega">CGA / EGA (16)</option>
                <option value="mac_system7">System 7 Mac</option>
              </select>
            </label>

            <div class="w95-palette-label">Cores básicas:</div>
            <div class="w95-palette-grid" id="w95BasicGrid"></div>

            <div class="w95-palette-label" style="margin-top:2px">Cores personalizadas:</div>
            <div class="w95-palette-grid" id="w95CustomGrid" style="grid-template-rows:repeat(2, 18px)"></div>

            <button type="button" class="btn sm" id="w95BtnAddCustom" style="margin-top:4px;padding:3px 4px;font-size:11px">
              Adicionar às cores personalizadas
            </button>
          </div>

          <!-- Divisor Vertical Clássico 95 -->
          <div style="width:2px;height:290px;background:#808080;border-right:1px solid #FFFFFF"></div>

          <!-- Coluna Direita: Espectro 2D, Luminosidade e Coordenadas Numéricas -->
          <div class="col" style="flex:1;gap:6px">
            <div class="w95-spectrum-wrapper">
              <div class="w95-spectrum-box" id="w95SpectrumBox" title="Arraste para ajustar Matiz e Saturação">
                <canvas class="w95-spectrum-canvas" id="w95SpectrumCanvas" width="180" height="180"></canvas>
                <div class="w95-spectrum-crosshair" id="w95Crosshair"></div>
              </div>

              <div class="w95-lum-wrapper" id="w95LumWrapper" title="Arraste para ajustar Luminosidade">
                <canvas class="w95-lum-canvas" id="w95LumCanvas" width="18" height="180"></canvas>
                <div class="w95-lum-arrow" id="w95LumArrow">◄</div>
              </div>
            </div>

            <!-- Previsão Cor | Sólido e Campos HSL / RGB -->
            <div class="row" style="gap:10px;align-items:center;margin-top:2px">
              <div class="w95-preview-group" title="Clique para travar na aproximação sólida">
                <div class="w95-preview-label">Cor | Sólido</div>
                <div class="w95-color-solid-box" id="w95ColorSolidBox">
                  <div class="w95-preview-left-color" id="w95PrevColor"></div>
                  <canvas class="w95-preview-right-solid" id="w95PrevSolid" width="32" height="48"></canvas>
                </div>
              </div>

              <!-- Coordenadas HSL e RGB -->
              <div class="row" style="gap:10px;flex:1;font-size:11px">
                <div class="col" style="gap:3px">
                  <div class="row" style="gap:4px;align-items:center;justify-content:flex-end">
                    <span><u>M</u>atiz:</span>
                    <input type="number" id="w95InH" class="w95-num-input" min="0" max="239" value="${hsl.h}">
                  </div>
                  <div class="row" style="gap:4px;align-items:center;justify-content:flex-end">
                    <span><u>S</u>at:</span>
                    <input type="number" id="w95InS" class="w95-num-input" min="0" max="240" value="${hsl.s}">
                  </div>
                  <div class="row" style="gap:4px;align-items:center;justify-content:flex-end">
                    <span><u>L</u>um:</span>
                    <input type="number" id="w95InL" class="w95-num-input" min="0" max="240" value="${hsl.l}">
                  </div>
                </div>

                <div class="col" style="gap:3px">
                  <div class="row" style="gap:4px;align-items:center;justify-content:flex-end">
                    <span><u>V</u>erm:</span>
                    <input type="number" id="w95InR" class="w95-num-input" min="0" max="255" value="${rgb.r}">
                  </div>
                  <div class="row" style="gap:4px;align-items:center;justify-content:flex-end">
                    <span>Ver<u>d</u>e:</span>
                    <input type="number" id="w95InG" class="w95-num-input" min="0" max="255" value="${rgb.g}">
                  </div>
                  <div class="row" style="gap:4px;align-items:center;justify-content:flex-end">
                    <span><u>A</u>zul:</span>
                    <input type="number" id="w95InB" class="w95-num-input" min="0" max="255" value="${rgb.b}">
                  </div>
                </div>
              </div>
            </div>

            <!-- Código Hexadecimal & Ferramentas Rápidas -->
            <div class="row" style="justify-content:space-between;align-items:center;gap:6px">
              <div class="row" style="gap:4px;align-items:center;font-size:11px">
                <span>Hex:</span>
                <input type="text" id="w95InHex" class="w95-hex-input" maxlength="7" value="${currentColor}">
              </div>
              <div class="row" style="gap:4px">
                <button type="button" class="btn sm" id="w95BtnDropper" title="Capturar cor de qualquer ponto">Pipeta</button>
                <button type="button" class="btn sm" id="w95BtnClampSmpte" title="Ajusta cor para limites de transmissão SMPTE 16-235">Clamp SMPTE</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Barra de Status de Transmissão SMPTE Broadcast (Legalidade IRE) -->
        <div class="w95-smpte-status" id="w95SmpteStatus">
          <span id="w95SmpteText">● SMPTE Broadcast Legal (Calculando sinal...)</span>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "OK",
        def: 1,
        run: () => {
          if (typeof onSelect === "function") onSelect(currentColor, rgb, hsl);
          return true;
        }
      },
      {
        label: "Cancelar",
        run: () => true
      }
    ]
  });

  setTimeout(() => {
    const specCv = document.getElementById("w95SpectrumCanvas");
    const lumCv = document.getElementById("w95LumCanvas");
    const specBox = document.getElementById("w95SpectrumBox");
    const lumWrapper = document.getElementById("w95LumWrapper");
    const crosshair = document.getElementById("w95Crosshair");
    const lumArrow = document.getElementById("w95LumArrow");
    const prevColor = document.getElementById("w95PrevColor");
    const prevSolid = document.getElementById("w95PrevSolid");
    const smpteStatus = document.getElementById("w95SmpteStatus");
    const smpteText = document.getElementById("w95SmpteText");
    const paletteSel = document.getElementById("w95PaletteSel");
    const btnAddCustom = document.getElementById("w95BtnAddCustom");
    const btnDropper = document.getElementById("w95BtnDropper");
    const btnClamp = document.getElementById("w95BtnClampSmpte");

    const inH = document.getElementById("w95InH");
    const inS = document.getElementById("w95InS");
    const inL = document.getElementById("w95InL");
    const inR = document.getElementById("w95InR");
    const inG = document.getElementById("w95InG");
    const inB = document.getElementById("w95InB");
    const inHex = document.getElementById("w95InHex");

    function renderSpectrumCanvas() {
      if (!specCv) return;
      const sCtx = specCv.getContext("2d");
      const id = sCtx.createImageData(180, 180);
      const d = id.data;
      for (let y = 0; y < 180; y++) {
        const s = Math.round((1 - y / 180) * 240);
        for (let x = 0; x < 180; x++) {
          const h = Math.round((x / 180) * 239);
          const col = hslWin95ToRgb(h, s, 120);
          const idx = (y * 180 + x) * 4;
          d[idx] = col.r;
          d[idx + 1] = col.g;
          d[idx + 2] = col.b;
          d[idx + 3] = 255;
        }
      }
      sCtx.putImageData(id, 0, 0);
    }

    function renderLumBar() {
      if (!lumCv) return;
      const lCtx = lumCv.getContext("2d");
      const grad = lCtx.createLinearGradient(0, 0, 0, 180);
      const pure = hslWin95ToRgb(hsl.h, hsl.s, 120);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(0.5, `rgb(${pure.r}, ${pure.g}, ${pure.b})`);
      grad.addColorStop(1, "#000000");
      lCtx.fillStyle = grad;
      lCtx.fillRect(0, 0, 18, 180);
    }

    function renderPaletteSwatches() {
      const list = PALETTES_90S[activePaletteKey] || PALETTES_90S.win95;
      const basicGrid = document.getElementById("w95BasicGrid");
      if (!basicGrid) return;
      basicGrid.innerHTML = list.slice(0, 48).map(hex =>
        `<div class="w95-palette-swatch" data-hex="${hex}" title="${hex}" style="background:${hex}"></div>`
      ).join("");
      basicGrid.querySelectorAll(".w95-palette-swatch").forEach(sw => {
        sw.onclick = () => setColorFromHex(sw.dataset.hex);
      });
    }

    function renderCustomSwatches() {
      const customGrid = document.getElementById("w95CustomGrid");
      if (!customGrid) return;
      customGrid.innerHTML = customColors.map((hex, i) =>
        `<div class="w95-palette-swatch${i === selectedCustomIndex ? " active" : ""}" data-idx="${i}" data-hex="${hex}" title="Personalizada ${i + 1}: ${hex}" style="background:${hex}"></div>`
      ).join("");
      customGrid.querySelectorAll(".w95-palette-swatch").forEach(sw => {
        sw.onclick = () => {
          selectedCustomIndex = parseInt(sw.dataset.idx, 10);
          renderCustomSwatches();
          setColorFromHex(sw.dataset.hex);
        };
      });
    }

    function updateAll(fromSource = "") {
      currentColor = rgbToHex(rgb.r, rgb.g, rgb.b);

      if (crosshair) {
        const cx = Math.max(0, Math.min(180, (hsl.h / 239) * 180));
        const cy = Math.max(0, Math.min(180, (1 - hsl.s / 240) * 180));
        crosshair.style.left = cx + "px";
        crosshair.style.top = cy + "px";
      }

      if (lumArrow) {
        const ly = Math.max(0, Math.min(180, (1 - hsl.l / 240) * 180));
        lumArrow.style.top = ly + "px";
      }

      renderLumBar();

      if (prevColor) prevColor.style.background = currentColor;
      if (prevSolid) drawWin95Dither(prevSolid, rgb.r, rgb.g, rgb.b);

      if (fromSource !== "hsl") {
        if (inH) inH.value = hsl.h;
        if (inS) inS.value = hsl.s;
        if (inL) inL.value = hsl.l;
      }
      if (fromSource !== "rgb") {
        if (inR) inR.value = rgb.r;
        if (inG) inG.value = rgb.g;
        if (inB) inB.value = rgb.b;
      }
      if (fromSource !== "hex") {
        if (inHex) inHex.value = currentColor;
      }

      if (smpteStatus && smpteText) {
        const smp = checkSmpteLegal(rgb.r, rgb.g, rgb.b);
        smpteStatus.className = smp.legal ? "w95-smpte-status w95-smpte-legal" : "w95-smpte-status w95-smpte-illegal";
        smpteText.textContent = smp.message;
      }
    }

    function setColorFromHex(hex) {
      currentColor = (hex && hex.startsWith("#")) ? hex.toUpperCase() : "#000000";
      rgb = hexToRgb(currentColor);
      hsl = rgbToHslWin95(rgb.r, rgb.g, rgb.b);
      updateAll();
    }

    // Espectro 2D drag
    if (specBox && specCv) {
      let isDown = false;
      const move = (e) => {
        const r = specCv.getBoundingClientRect();
        const x = Math.max(0, Math.min(180, e.clientX - r.left));
        const y = Math.max(0, Math.min(180, e.clientY - r.top));
        hsl.h = Math.round((x / 180) * 239);
        hsl.s = Math.round((1 - y / 180) * 240);
        rgb = hslWin95ToRgb(hsl.h, hsl.s, hsl.l);
        updateAll();
      };
      specBox.addEventListener("pointerdown", (e) => {
        isDown = true;
        specBox.setPointerCapture(e.pointerId);
        move(e);
      });
      specBox.addEventListener("pointermove", (e) => {
        if (isDown) move(e);
      });
      const stop = () => { isDown = false; };
      specBox.addEventListener("pointerup", stop);
      specBox.addEventListener("pointercancel", stop);
    }

    // Luminosidade drag
    if (lumWrapper && lumCv) {
      let isDown = false;
      const move = (e) => {
        const r = lumCv.getBoundingClientRect();
        const y = Math.max(0, Math.min(180, e.clientY - r.top));
        hsl.l = Math.round((1 - y / 180) * 240);
        rgb = hslWin95ToRgb(hsl.h, hsl.s, hsl.l);
        updateAll();
      };
      lumWrapper.addEventListener("pointerdown", (e) => {
        isDown = true;
        lumWrapper.setPointerCapture(e.pointerId);
        move(e);
      });
      lumWrapper.addEventListener("pointermove", (e) => {
        if (isDown) move(e);
      });
      const stop = () => { isDown = false; };
      lumWrapper.addEventListener("pointerup", stop);
      lumWrapper.addEventListener("pointercancel", stop);
    }

    // Input handlers
    const onHslChange = () => {
      hsl.h = Math.max(0, Math.min(239, parseInt(inH.value, 10) || 0));
      hsl.s = Math.max(0, Math.min(240, parseInt(inS.value, 10) || 0));
      hsl.l = Math.max(0, Math.min(240, parseInt(inL.value, 10) || 0));
      rgb = hslWin95ToRgb(hsl.h, hsl.s, hsl.l);
      updateAll("hsl");
    };
    if (inH) inH.oninput = onHslChange;
    if (inS) inS.oninput = onHslChange;
    if (inL) inL.oninput = onHslChange;

    const onRgbChange = () => {
      rgb.r = Math.max(0, Math.min(255, parseInt(inR.value, 10) || 0));
      rgb.g = Math.max(0, Math.min(255, parseInt(inG.value, 10) || 0));
      rgb.b = Math.max(0, Math.min(255, parseInt(inB.value, 10) || 0));
      hsl = rgbToHslWin95(rgb.r, rgb.g, rgb.b);
      updateAll("rgb");
    };
    if (inR) inR.oninput = onRgbChange;
    if (inG) inG.oninput = onRgbChange;
    if (inB) inB.oninput = onRgbChange;

    if (inHex) {
      inHex.oninput = () => {
        let val = inHex.value.trim();
        if (!val.startsWith("#")) val = "#" + val;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          setColorFromHex(val);
        }
      };
    }

    if (paletteSel) {
      paletteSel.onchange = (e) => {
        activePaletteKey = e.target.value;
        renderPaletteSwatches();
      };
    }

    if (btnAddCustom) {
      btnAddCustom.onclick = () => {
        customColors[selectedCustomIndex] = currentColor;
        try {
          localStorage.setItem("scripteditor_custom_colors_95", JSON.stringify(customColors));
        } catch (_e) {}
        renderCustomSwatches();
        toast(`Cor ${currentColor} adicionada às cores personalizadas (${selectedCustomIndex + 1})!`);
        selectedCustomIndex = (selectedCustomIndex + 1) % 16;
      };
    }

    if (btnClamp) {
      btnClamp.onclick = () => {
        const cl = clampToSmpteLegal(rgb.r, rgb.g, rgb.b);
        rgb = cl;
        hsl = rgbToHslWin95(rgb.r, rgb.g, rgb.b);
        updateAll();
        toast("Cor ajustada para limites de transmissão SMPTE Safe (16-235 IRE)!");
      };
    }

    if (btnDropper) {
      btnDropper.onclick = async () => {
        if (window.EyeDropper) {
          try {
            const eye = new window.EyeDropper();
            const res = await eye.open();
            if (res && res.sRGBHex) setColorFromHex(res.sRGBHex);
          } catch (_e) {}
        } else {
          toast("Pipeta: clique no monitor para capturar ou use valores RGB.");
        }
      };
    }

    renderSpectrumCanvas();
    renderPaletteSwatches();
    renderCustomSwatches();
    updateAll();
  }, 40);
}

function openColorMatteDialog() {
  let selectedColor = "#000000";
  dialog({
    id: "colorMatteWin",
    title: "Gerador de Matte de Cor Sólida (Color Matte 1995)",
    width: 440,
    body: `
      <div class="col" style="gap:8px">
        <label class="fld"><span>Nome da Cartela:</span>
          <input type="text" id="matte-name" value="PRETO_BROADCAST_01" style="font-weight:bold">
        </label>
        <div class="row" style="gap:10px;align-items:center">
          <label class="fld" style="flex:1"><span>Cor Selecionada (Windows 95):</span>
            <div style="margin-top:2px">
              ${createWin95ColorButtonHtml("matte-color-btn", "#000000")}
            </div>
          </label>
          <label class="fld" style="width:110px"><span>Duração (s):</span>
            <input type="number" id="matte-dur" value="5.0" min="0.5" max="300" step="0.5">
          </label>
        </div>
        <div><b>Amostras Rápidas Broadcast 1995:</b></div>
        <div class="color-matte-swatches">
          <div class="color-matte-swatch" style="background:#000000" data-col="#000000" data-name="PRETO_BROADCAST" title="Preto Puro Broadcast (0% IRE / 16-235)"></div>
          <div class="color-matte-swatch" style="background:#FFFFFF" data-col="#FFFFFF" data-name="BRANCO_ESTUDIO" title="Branco Estúdio (100% IRE)"></div>
          <div class="color-matte-swatch" style="background:#0000FF" data-col="#0000FF" data-name="CHROMA_BLUE" title="Azul Chroma Key Broadcast"></div>
          <div class="color-matte-swatch" style="background:#00FF00" data-col="#00FF00" data-name="CHROMA_GREEN" title="Verde Chroma Key Broadcast"></div>
          <div class="color-matte-swatch" style="background:#808080" data-col="#808080" data-name="CINZA_50" title="Cinza Médio 50% Neutro"></div>
          <div class="color-matte-swatch" style="background:#C00000" data-col="#C00000" data-name="VERMELHO_PADRAO" title="Vermelho Primário"></div>
          <div class="color-matte-swatch" style="background:#FFE040" data-col="#FFE040" data-name="AMARELO_TESTE" title="Amarelo de Sinalização"></div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Inserir na Linha do Tempo",
        def: 1,
        run: () => {
          const col = selectedColor || "#000000";
          const dur = Math.max(0.5, parseFloat(document.getElementById("matte-dur")?.value) || 5.0);
          const name = (document.getElementById("matte-name")?.value || "COLOR_MATTE").trim();
          createAndInsertColorMatte(col, dur, name, true);
        }
      },
      {
        label: "Apenas Adicionar ao Cesto (Bin)",
        run: () => {
          const col = selectedColor || "#000000";
          const dur = Math.max(0.5, parseFloat(document.getElementById("matte-dur")?.value) || 5.0);
          const name = (document.getElementById("matte-name")?.value || "COLOR_MATTE").trim();
          createAndInsertColorMatte(col, dur, name, false);
        }
      },
      { label: "Cancelar" }
    ]
  });

  setTimeout(() => {
    const mBtn = document.getElementById("matte-color-btn");
    if (mBtn) {
      bindWin95ColorButton(mBtn, (newHex) => {
        selectedColor = newHex;
      });
    }
    document.querySelectorAll(".color-matte-swatch").forEach(sw => {
      sw.onclick = () => {
        selectedColor = sw.dataset.col;
        const nIn = document.getElementById("matte-name");
        if (mBtn) {
          mBtn.dataset.color = selectedColor;
          const chip = mBtn.querySelector(".win95-color-chip");
          if (chip) chip.style.background = selectedColor;
          const lbl = mBtn.querySelector(".win95-color-hex-label");
          if (lbl) lbl.textContent = selectedColor;
        }
        if (nIn) nIn.value = sw.dataset.name + "_01";
      };
    });
  }, 50);
}

function createAndInsertColorMatte(colorHex, dur, name, insertOnTimeline) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="100%" height="100%" fill="${colorHex}"/></svg>`;
  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const item = {
    id: uid("matte_"),
    name: name,
    tipo: "matte",
    dur: dur,
    cor: colorHex,
    url: dataUrl,
    thumb: dataUrl,
    pasta: "Cartelas"
  };

  S.mediaBin.unshift(item);
  renderSide();

  if (insertOnTimeline) {
    saveUndoSnapshot();
    const tk = isVideoTrack(S.targetVideoTrack) ? S.targetVideoTrack : "v1";
    ensureTrackExists(tk);
    const newClip = {
      id: uid(tk + "_"),
      title: item.name,
      mediaUrl: item.url,
      thumb: item.thumb,
      start: Number(S.playhead.toFixed(2)),
      dur: dur,
      inPoint: 0,
      outPoint: dur,
      track: tk,
      vol: 100,
      pan: 0,
      scale: 100,
      scaleX: 100,
      scaleY: 100,
      posX: 0,
      posY: 0,
      fitMode: "contain"
    };
    S.clips[tk].push(newClip);
    resolveTrackOverlaps(tk, newClip.id);
    S.selectedClipId = newClip.id;
    S.selectedClipTrack = tk;
    S.selectedClipIds = [newClip.id];
    recalcSequenceDuration();
    renderAll();
    toast(`Matte de Cor "${name}" inserido na faixa ${tk.toUpperCase()}!`);
  } else {
    toast(`Matte de Cor "${name}" adicionado ao Cesto de Mídia!`);
  }
}

function applyQuickCrossDissolve() {
  const selectedList = getSelectedClipsList();
  saveUndoSnapshot();

  if (selectedList.length >= 1) {
    selectedList.forEach(item => {
      item.clip.trans = "Dissolvência Cruzada";
      item.clip.transDur = 1.0;
    });
    renderAll();
    toast(`Dissolvência Cruzada (1.0s) aplicada em ${selectedList.length} clipe(s)!`);
    return;
  }

  const tk = isVideoTrack(S.targetVideoTrack) ? S.targetVideoTrack : "v1";
  const cutClip = (S.clips[tk] || []).find(c => Math.abs(c.start - S.playhead) < 0.2 || Math.abs((c.start + c.dur) - S.playhead) < 0.2);
  if (cutClip) {
    cutClip.trans = "Dissolvência Cruzada";
    cutClip.transDur = 1.0;
    renderAll();
    toast(`Dissolvência Cruzada (1.0s) aplicada no corte em ${fmtSMPTE(cutClip.start)}!`);
    return;
  }

  toast("Posicione a agulha sobre um corte ou selecione clipe(s) para aplicar dissolvência (Ctrl+D).");
}

function getSelectedClip() {
  if (S.selectedClipId) {
    for (const tk of getAllTrackIds()) {
      const found = (S.clips[tk] || []).find(c => c.id === S.selectedClipId);
      if (found) return found;
    }
  }
  if (Array.isArray(S.selectedClipIds) && S.selectedClipIds.length > 0) {
    for (const tk of getAllTrackIds()) {
      const found = (S.clips[tk] || []).find(c => c.id === S.selectedClipIds[0]);
      if (found) return found;
    }
  }
  return null;
}

function recalcSequenceDuration() {
  let maxEnd = 15;
  for (const tk of getAllTrackIds()) {
    for (const c of (S.clips[tk] || [])) {
      if (c.start + c.dur > maxEnd) maxEnd = c.start + c.dur;
    }
  }
  S.totalDur = Math.ceil(maxEnd + 10);
  const ps = document.getElementById("progScrub");
  if (ps) ps.max = String(S.totalDur);
  const pd = document.getElementById("progDurLbl");
  if (pd) pd.textContent = `DUR: ${fmtSMPTE(maxEnd)}`;
}

/* ---------- Projeto Livre Inicial (Comercial / Doméstico / Fitas Demo 1995) ---------- */
function initDefaultMediaBin() {
  S.mediaBin = [
    {
      id: "gen_leader",
      name: "CONTAGEM_REGRESSIVA_95.MOV",
      kind: "synth",
      synthType: "leader",
      dur: 6,
      res: "640x480 · 29,97 fps",
      desc: "Padrão SMPTE Universal Film Leader (Contagem 6 a 1 com bip)"
    },
    {
      id: "gen_bars",
      name: "BARRAS_SMPTE_NTSC.MOV",
      kind: "synth",
      synthType: "bars",
      dur: 5,
      res: "640x480 · NTSC",
      desc: "Barras de Calibração de Cor SMPTE Emissora C2"
    },
    {
      id: "gen_vhs_home",
      name: "FITA_VHS_FAMILIA_1995.AVI",
      kind: "synth",
      synthType: "vhs_home",
      dur: 12,
      res: "640x480 · Hi8/VHS",
      desc: "Gravação doméstica Camcorder 1995 com carimbo de data"
    },
    {
      id: "gen_comercial",
      name: "VT_COMERCIAL_VAREJO_95.AVI",
      kind: "synth",
      synthType: "commercial",
      dur: 10,
      res: "640x480 · Betacam SP",
      desc: "VT Comercial de TV Anos 90 com oferta e letreiro dinâmico"
    }
  ];
}

function getRecentProjects() {
  try {
    const list = JSON.parse(localStorage.getItem("se95.recent_projects") || "[]");
    return Array.isArray(list) ? list : [];
  } catch (_e) {
    return [];
  }
}

function addRecentProject(pathOrId, name) {
  if (!name && !pathOrId) return;
  try {
    let list = getRecentProjects();
    const entryName = name || (pathOrId ? String(pathOrId).split(/[/\\]/).pop() : "Projeto");
    list = list.filter(p => p.path !== pathOrId && p.name !== entryName);
    list.unshift({
      name: entryName,
      path: pathOrId || entryName,
      date: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    });
    if (list.length > 8) list = list.slice(0, 8);
    localStorage.setItem("se95.recent_projects", JSON.stringify(list));
  } catch (_e) {}
}

function createStarterFreeProject(name = "PROJETO_LIVRE_01.PPJ", keepBin = false) {
  saveUndoSnapshot();
  S.projectName = name;
  S.projectFilePath = null;
  prefs.presetMode = "livre";
  const pm = document.getElementById("presetModeSel");
  if (pm) pm.value = "livre";

  S.videoTracks = ["v3", "v2", "v1"];
  S.audioTracks = ["a1", "a2", "a3"];
  S.clips = {
    v3: [],
    v2: [],
    v1: [],
    a1: [],
    a2: [],
    a3: []
  };

  if (!keepBin) {
    S.mediaBin = [];
  }
  S.markers = [];
  S.isStarterDemo = false;
  S.selectedClipId = null;
  S.selectedClipTrack = null;
  S.selectedClipIds = [];
  S.selectedGap = null;
  S.tlIn = null;
  S.tlOut = null;
  S.srcMedia = null;
  S.playhead = 0;

  S.sequences = [
    {
      id: "seq_1",
      name: "Sequência 1",
      videoTracks: ["v3", "v2", "v1"],
      audioTracks: ["a1", "a2", "a3"],
      clips: { v3: [], v2: [], v1: [], a1: [], a2: [], a3: [] },
      markers: [],
      totalDur: 30,
      playhead: 0,
      tlIn: null,
      tlOut: null,
      targetVideoTrack: "v1",
      targetAudioTrack: "a1",
      tracksMuted: { v3: false, v2: false, v1: false, a1: false, a2: false, a3: false },
      tracksLocked: { v3: false, v2: false, v1: false, a1: false, a2: false, a3: false },
      tracksSolo: { a1: false, a2: false, a3: false },
      trackVolumes: { a1: 100, a2: 85, a3: 100, master: 100 },
      trackPans: { a1: 0, a2: 0, a3: 0 }
    }
  ];
  S.activeSequenceId = "seq_1";
  S.isDirty = false;

  recalcSequenceDuration();
  renderAll();
  addRecentProject(S.projectName, S.projectName);
}

/* ---------- Monitor de Origem (Source / Clip Monitor — Entrada IN, Saída OUT e Inserção) ---------- */
function getMediaPool() {
  return document.getElementById("mediaPool") || document.body;
}

function stopSourcePlayback() {
  S.srcPlaying = false;
  if (S.srcVideoEl && !S.srcVideoEl.paused) {
    try { S.srcVideoEl.pause(); } catch (_e) {}
  }
  if (S.srcAudioEl && !S.srcAudioEl.paused) {
    try { S.srcAudioEl.pause(); } catch (_e) {}
  }
  updateSourceMonitorUI();
  if (typeof updateVUMeterFromTimeline === "function") updateVUMeterFromTimeline();
}

function toggleSourcePlay() {
  const it = S.srcItem;
  if (!it) return;
  if (S.srcPlaying) {
    stopSourcePlayback();
    return;
  }
  // Pausa o monitor de programa se estiver tocando para não misturar áudios
  if (S.playing) togglePlay(S.shuttleSpeed);

  S.srcPlaying = true;
  if (S.srcPlayhead >= S.srcOut || S.srcPlayhead < S.srcIn) {
    S.srcPlayhead = S.srcIn;
  }

  if (it.url && it.kind === "video" && S.srcVideoEl) {
    S.srcVideoEl.muted = !prefs.som;
    S.srcVideoEl.currentTime = S.srcPlayhead;
    S.srcVideoEl.play().catch(() => {});
  } else if (it.url && it.kind === "audio" && S.srcAudioEl) {
    S.srcAudioEl.muted = !prefs.som;
    S.srcAudioEl.currentTime = S.srcPlayhead;
    S.srcAudioEl.play().catch(() => {});
  }

  updateSourceMonitorUI();
  let lastSrcTick = performance.now();
  const stepSrc = (now) => {
    if (!S.srcPlaying) return;
    const dt = Math.min(0.1, (now - lastSrcTick) / 1000);
    lastSrcTick = now;

    if (it.url && it.kind === "video" && S.srcVideoEl && !S.srcVideoEl.paused) {
      S.srcPlayhead = S.srcVideoEl.currentTime;
    } else if (it.url && it.kind === "audio" && S.srcAudioEl && !S.srcAudioEl.paused) {
      S.srcPlayhead = S.srcAudioEl.currentTime;
    } else {
      S.srcPlayhead += dt;
    }

    if (S.srcPlayhead >= S.srcOut) {
      S.srcPlayhead = S.srcIn;
      stopSourcePlayback();
      renderSourceFrame();
      return;
    }
    updateSourceMonitorUI();
    renderSourceFrame();
    if (typeof updateVUMeterFromTimeline === "function") updateVUMeterFromTimeline();
    requestAnimationFrame(stepSrc);
  };
  requestAnimationFrame(stepSrc);
}

function loadIntoSourceMonitor(item) {
  if (!item) return;
  stopSourcePlayback();
  S.srcItem = item;
  S.srcPlayhead = 0;
  S.srcIn = 0;
  S.srcOut = Math.max(0.5, Number(item.dur) || 10);

  const st = document.getElementById("srcTitle");
  if (st) st.textContent = `ORIGEM: ${item.name}`;

  const scrub = document.getElementById("srcScrub");
  if (scrub) {
    scrub.max = String(S.srcOut);
    scrub.value = "0";
  }

  if (item.url && item.kind === "video") {
    if (!S.srcVideoEl) {
      S.srcVideoEl = document.createElement("video");
      S.srcVideoEl.muted = false;
      S.srcVideoEl.playsInline = true;
      S.srcVideoEl.preload = "auto";
      getMediaPool().appendChild(S.srcVideoEl);
      S.srcVideoEl.addEventListener("loadeddata", () => renderSourceFrame());
      S.srcVideoEl.addEventListener("canplay", () => renderSourceFrame());
      S.srcVideoEl.addEventListener("seeked", () => renderSourceFrame());
    }
    if (S.srcVideoEl.src !== item.url) {
      S.srcVideoEl.src = item.url;
      S.srcVideoEl.load();
    }
    try { S.srcVideoEl.currentTime = 0.001; } catch (_e) {}
  } else if (item.url && item.kind === "audio") {
    if (!S.srcAudioEl) {
      S.srcAudioEl = document.createElement("audio");
      S.srcAudioEl.preload = "auto";
      getMediaPool().appendChild(S.srcAudioEl);
    }
    if (S.srcAudioEl.src !== item.url) {
      S.srcAudioEl.src = item.url;
      S.srcAudioEl.load();
    }
    try { S.srcAudioEl.currentTime = 0; } catch (_e) {}
  }

  updateSourceMonitorUI();
  renderSourceFrame();
}

function updateSourceMonitorUI() {
  const tc = document.getElementById("srcTC");
  if (tc) tc.textContent = fmtSMPTE(S.srcPlayhead);
  const io = document.getElementById("srcInOutLbl");
  if (io) io.textContent = `IN: ${mmss(S.srcIn)} · OUT: ${mmss(S.srcOut)} (DUR: ${(S.srcOut - S.srcIn).toFixed(1)}s)`;
  const scrub = document.getElementById("srcScrub");
  if (scrub) {
    scrub.max = String(Math.max(1, S.srcItem ? (S.srcItem.dur || S.srcOut) : S.srcOut));
    if (document.activeElement !== scrub) scrub.value = String(S.srcPlayhead);
  }
  const bp = document.getElementById("btnSrcPlay");
  if (bp) bp.textContent = S.srcPlaying ? "||" : "►";
}

function drawFittedMedia(ctx, el, W, H, fitMode = "contain") {
  const nw = el.videoWidth || el.naturalWidth || W;
  const nh = el.videoHeight || el.naturalHeight || H;
  if (!nw || !nh || fitMode === "stretch") {
    ctx.drawImage(el, 0, 0, W, H);
    return;
  }
  if (fitMode === "original") {
    ctx.drawImage(el, (W - nw) / 2, (H - nh) / 2, nw, nh);
    return;
  }
  const scale = fitMode === "cover"
    ? Math.max(W / nw, H / nh)
    : Math.min(W / nw, H / nh);
  const dw = nw * scale;
  const dh = nh * scale;
  ctx.drawImage(el, (W - dw) / 2, (H - dh) / 2, dw, dh);
}

function renderSourceFrame() {
  const cv = document.getElementById("srcCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height;
  ctx.fillStyle = "#080C12";
  ctx.fillRect(0, 0, W, H);

  const it = S.srcItem;
  if (!it) {
    ctx.fillStyle = "#888";
    ctx.font = "18px 'VT323', monospace";
    ctx.textAlign = "center";
    ctx.fillText("NENHUM CLIPE CARREGADO NA ORIGEM", W / 2, H / 2);
    return;
  }

  const poolEl = it.url ? S.videoEls.get(it.url) : null;
  const vidEl = (S.srcVideoEl && S.srcVideoEl.readyState >= 1) ? S.srcVideoEl : (poolEl && poolEl.tagName === "VIDEO" && poolEl.readyState >= 1 ? poolEl : null);

  if (it.url && it.kind === "video" && vidEl) {
    try { drawFittedMedia(ctx, vidEl, W, H, "contain"); } catch (_e) {}
    // Se o vídeo tiver áudio decodificado, desenha a faixa de forma de onda na parte inferior para marcar cortes pelo som
    const pk = S.audioPeaks.get(it.url);
    if (pk && pk.peaksMono && pk.peaksMono.length) {
      drawSourceWaveformOverlay(ctx, W, H, it, pk, true);
    }
  } else if (it.url && it.kind === "image") {
    const img = S.videoEls.get(it.url);
    if (img && img.complete) {
      try { drawFittedMedia(ctx, img, W, H, "contain"); } catch (_e) {}
    }
  } else if (it.kind === "audio") {
    const pk = it.url ? S.audioPeaks.get(it.url) : null;
    drawSourceWaveformOverlay(ctx, W, H, it, pk, false);
  } else {
    drawSynthGenerator(ctx, W, H, it.synthType || "bars", S.srcPlayhead, it.name);
  }

  // Marcadores visuais de IN / OUT no monitor de origem
  ctx.fillStyle = "rgba(0,0,0,0.78)";
  ctx.fillRect(12, H - 34, W - 24, 22);
  ctx.fillStyle = "#9FD4FF";
  ctx.font = "16px 'VT323', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`FONTE: ${it.name.slice(0, 30)} · POS: ${mmss(S.srcPlayhead)}`, 18, H - 18);
  ctx.textAlign = "right";
  ctx.fillStyle = "#FFE040";
  ctx.fillText(`[IN ${mmss(S.srcIn)} — OUT ${mmss(S.srcOut)}]`, W - 18, H - 18);
}

function drawSourceWaveformOverlay(ctx, W, H, it, pk, compactBottom = false) {
  const padX = 16;
  const waveW = W - padX * 2;
  const totalDur = Math.max(0.5, Number(it.dur) || (pk && pk.dur) || S.srcOut || 10);
  const topY = compactBottom ? H - 102 : 48;
  const botY = compactBottom ? H - 38 : H - 42;
  const midY = (topY + botY) / 2;
  const maxAmp = (botY - topY) * 0.46;

  if (!compactBottom) {
    ctx.fillStyle = "#091520";
    ctx.fillRect(0, 0, W, H);
    // Grade de referência dB estilo editor de áudio anos 90
    ctx.strokeStyle = "rgba(80, 160, 210, 0.16)";
    ctx.lineWidth = 1;
    for (let gy = topY; gy <= botY; gy += Math.max(16, (botY - topY) / 6)) {
      ctx.beginPath(); ctx.moveTo(padX, gy); ctx.lineTo(W - padX, gy); ctx.stroke();
    }
    for (let gx = padX; gx <= W - padX; gx += Math.max(24, waveW / 10)) {
      ctx.beginPath(); ctx.moveTo(gx, topY); ctx.lineTo(gx, botY); ctx.stroke();
    }
    ctx.fillStyle = "#FFE040";
    ctx.font = "bold 18px 'Courier New', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`ÁUDIO: ${it.name.slice(0, 38)}`, padX, 28);
    ctx.fillStyle = "#8FC8FF";
    ctx.font = "14px 'Courier New', monospace";
    ctx.textAlign = "right";
    ctx.fillText("Clique/Arraste para ouvir · [I] IN · [O] OUT", W - padX, 28);
  } else {
    ctx.fillStyle = "rgba(6, 14, 22, 0.78)";
    ctx.fillRect(padX - 4, topY - 4, waveW + 8, (botY - topY) + 8);
  }

  // Região selecionada entre IN e OUT
  const inX = padX + Math.max(0, Math.min(1, S.srcIn / totalDur)) * waveW;
  const outX = padX + Math.max(0, Math.min(1, S.srcOut / totalDur)) * waveW;
  ctx.fillStyle = "rgba(0, 220, 130, 0.16)";
  ctx.fillRect(inX, topY, Math.max(2, outX - inX), botY - topY);

  // Linha central zero-crossing
  ctx.strokeStyle = "rgba(160, 210, 255, 0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, midY);
  ctx.lineTo(W - padX, midY);
  ctx.stroke();

  // Forma de onda real estática do arquivo inteiro (para marcar batidas e pausas com precisão!)
  const cols = Math.floor(waveW / 3);
  const mono = pk && pk.peaksMono && pk.peaksMono.length ? pk.peaksMono : null;
  for (let i = 0; i < cols; i++) {
    const x = padX + i * 3;
    const ratio = i / Math.max(1, cols - 1);
    let val = 0;
    if (mono) {
      const idx0 = Math.floor(ratio * mono.length);
      const idx1 = Math.min(mono.length, Math.max(idx0 + 1, Math.floor(((i + 1) / cols) * mono.length)));
      for (let k = idx0; k < idx1; k++) {
        if (mono[k] > val) val = mono[k];
      }
    } else {
      // Enquanto decodifica em segundo plano, exibe envelope determinístico fixo
      val = 0.15 + Math.abs(Math.sin(ratio * 37) * Math.cos(ratio * 13)) * 0.65;
    }
    const insideIO = x >= inX && x <= outX;
    const hBar = Math.max(1.5, Math.min(maxAmp, val * maxAmp));
    ctx.fillStyle = insideIO ? (val > 0.85 ? "#FF5050" : (val > 0.6 ? "#FFE040" : "#00FF80")) : "#2C5E4F";
    ctx.fillRect(x, midY - hBar, 2, hBar * 2);
  }

  // Marcadores verticais IN, OUT e Agulha (Playhead)
  ctx.fillStyle = "#00FF80";
  ctx.fillRect(inX - 1, topY, 2, botY - topY);
  ctx.fillStyle = "#FFA020";
  ctx.fillRect(outX - 1, topY, 2, botY - topY);

  const phX = padX + Math.max(0, Math.min(1, S.srcPlayhead / totalDur)) * waveW;
  ctx.fillStyle = "#FF2020";
  ctx.fillRect(phX - 1, topY - 4, 2, (botY - topY) + 8);
}

function resolveTrackOverlaps(tk, priorityClipId = null) {
  const list = S.clips[tk] || [];
  if (list.length <= 1) {
    if (list[0]) {
      list[0].start = Math.max(0, Number((list[0].start || 0).toFixed(2)));
      list[0].dur = Math.max(0.4, Number((list[0].dur || 1).toFixed(2)));
    }
    return;
  }

  list.forEach(c => {
    c.start = Math.max(0, Number((c.start || 0).toFixed(2)));
    c.dur = Math.max(0.4, Number((c.dur || 1).toFixed(2)));
  });

  if (priorityClipId) {
    const moved = list.find(c => c.id === priorityClipId);
    if (moved) {
      const others = list.filter(c => c.id !== priorityClipId).sort((a, b) => a.start - b.start);
      // Garante que os demais clipes já estejam ordenados sem sobreposição
      for (let i = 1; i < others.length; i++) {
        const prevEnd = Number((others[i - 1].start + others[i - 1].dur).toFixed(2));
        if (others[i].start < prevEnd) others[i].start = prevEnd;
      }
      // Se o clipe movido começou dentro da metade final de outro clipe, encaixa logo após ele (ímã de borda)
      for (const other of others) {
        const oEnd = other.start + other.dur;
        if (moved.start > other.start + other.dur * 0.42 && moved.start < oEnd) {
          moved.start = Number(oEnd.toFixed(2));
        }
      }
    }
  }

  list.sort((a, b) => {
    if (Math.abs(a.start - b.start) < 0.02) {
      if (a.id === priorityClipId) return -1;
      if (b.id === priorityClipId) return 1;
    }
    return a.start - b.start;
  });

  // Empurra qualquer clipe que esteja sobreposto para que NUNCA fiquem dois vídeos um em cima do outro na mesma faixa
  for (let i = 1; i < list.length; i++) {
    const minStart = Number((list[i - 1].start + list[i - 1].dur).toFixed(2));
    if (list[i].start < minStart) {
      list[i].start = minStart;
    }
  }
}

function clearOverlapOnTrack(tk, startSec, endSec, mode = "overwrite") {
  const list = S.clips[tk] || [];
  if (mode === "insert") {
    const dur = endSec - startSec;
    list.forEach(c => {
      if (c.start >= startSec - 0.01) {
        c.start = Number((c.start + dur).toFixed(2));
      } else if (c.start < startSec && c.start + c.dur > startSec) {
        c.dur = Number((startSec - c.start).toFixed(2));
      }
    });
    return;
  }
  // Overwrite: corta ou encurta clipes que estejam ocupando o mesmo intervalo na faixa
  const nextList = [];
  for (const c of list) {
    const cEnd = c.start + c.dur;
    if (cEnd <= startSec + 0.02 || c.start >= endSec - 0.02) {
      nextList.push(c);
    } else if (c.start < startSec && cEnd > endSec) {
      // Divide o clipe ao meio para encaixar o novo
      const leftDur = Number((startSec - c.start).toFixed(2));
      const rightDur = Number((cEnd - endSec).toFixed(2));
      if (leftDur >= 0.3) nextList.push(Object.assign({}, c, { dur: leftDur }));
      if (rightDur >= 0.3) {
        nextList.push(Object.assign({}, c, {
          id: uid(tk + "_"),
          start: Number(endSec.toFixed(2)),
          inPoint: Number(((c.inPoint || 0) + (endSec - c.start)).toFixed(2)),
          dur: rightDur
        }));
      }
    } else if (c.start < startSec && cEnd > startSec) {
      const newDur = Number((startSec - c.start).toFixed(2));
      if (newDur >= 0.3) {
        c.dur = newDur;
        nextList.push(c);
      }
    } else if (c.start >= startSec && cEnd > endSec) {
      const cut = endSec - c.start;
      const newDur = Number((c.dur - cut).toFixed(2));
      if (newDur >= 0.3) {
        c.start = Number(endSec.toFixed(2));
        c.inPoint = Number(((c.inPoint || 0) + cut).toFixed(2));
        c.dur = newDur;
        nextList.push(c);
      }
    }
  }
  S.clips[tk] = nextList;
}

function getTrackEndTime(tk) {
  const list = S.clips[tk] || [];
  let maxEnd = 0;
  for (const c of list) {
    if (c.start + c.dur > maxEnd) maxEnd = c.start + c.dur;
  }
  return Number(maxEnd.toFixed(2));
}

function open4PointFitDialog(targetTrack, mode, explicitTime, srcDur, tlDur) {
  const speedRatio = Number((srcDur / tlDur).toFixed(3));
  const speedPct = (speedRatio * 100).toFixed(1);

  dialog({
    id: "fitToFillWin",
    title: "Edição por 4 Pontos — Ajuste de Duração (Fit to Fill)",
    width: 500,
    body: `
      <div class="col" style="gap:10px">
        <div class="row" style="gap:8px;align-items:flex-start">
          <div style="font-size:24px;line-height:1;margin-top:2px">⏱</div>
          <div style="font-size:11px;line-height:1.4">
            <b>Divergência de Duração nos 4 Pontos Marcados:</b><br>
            • <b>Origem (Source):</b> ${fmtSMPTE(S.srcIn)} → ${fmtSMPTE(S.srcOut)} (Duração: ${srcDur.toFixed(2)}s)<br>
            • <b>Linha do Tempo:</b> ${fmtSMPTE(S.tlIn)} → ${fmtSMPTE(S.tlOut)} (Duração: ${tlDur.toFixed(2)}s)<br><br>
            Selecione o procedimento para o corte na linha do tempo:
          </div>
        </div>

        <div class="fld" style="background:var(--field);padding:8px;box-shadow:inset 1px 1px var(--lo);display:flex;flex-direction:column;gap:8px">
          <label class="row" style="gap:8px;cursor:pointer;align-items:flex-start">
            <input type="radio" name="fitOpt" value="fit_to_fill" checked style="margin-top:2px">
            <div>
              <b>Ajustar Velocidade para Preencher (Fit to Fill 1995)</b><br>
              <span class="muted" style="font-size:10px">Altera a velocidade do clipe para <b>${speedPct}%</b> (${speedRatio.toFixed(2)}x) para preencher com perfeição os ${tlDur.toFixed(2)}s da timeline.</span>
            </div>
          </label>
          <label class="row" style="gap:8px;cursor:pointer;align-items:flex-start">
            <input type="radio" name="fitOpt" value="ignore_src_out" style="margin-top:2px">
            <div>
              <b>Ignorar Ponto de Saída (OUT) da Origem</b><br>
              <span class="muted" style="font-size:10px">Usa o IN da origem e corta a duração exata (${tlDur.toFixed(2)}s) na velocidade normal (100%).</span>
            </div>
          </label>
          <label class="row" style="gap:8px;cursor:pointer;align-items:flex-start">
            <input type="radio" name="fitOpt" value="ignore_tl_out" style="margin-top:2px">
            <div>
              <b>Ignorar Ponto de Saída (OUT) da Linha do Tempo</b><br>
              <span class="muted" style="font-size:10px">Insere o trecho integral da origem (${srcDur.toFixed(2)}s) a partir do IN da timeline a 100% de velocidade.</span>
            </div>
          </label>
          <label class="row" style="gap:8px;cursor:pointer;align-items:flex-start">
            <input type="radio" name="fitOpt" value="ignore_tl_in" style="margin-top:2px">
            <div>
              <b>Ignorar Ponto de Entrada (IN) da Linha do Tempo</b><br>
              <span class="muted" style="font-size:10px">Alinha o final do clipe com o OUT da timeline (${fmtSMPTE(S.tlOut)}) usando ${srcDur.toFixed(2)}s a 100%.</span>
            </div>
          </label>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Confirmar Edição",
        def: 1,
        run: (w) => {
          const selected = w.querySelector('input[name="fitOpt"]:checked')?.value || "fit_to_fill";
          insertSourceIntoTimeline(targetTrack, mode, explicitTime, selected);
        }
      },
      { label: "Cancelar" }
    ]
  });
}

function insertSourceIntoTimeline(targetTrack, mode = "append_or_playhead", explicitTime = null, fitChoice = null) {
  const it = S.srcItem;
  if (!it) {
    toast("Selecione ou importe uma mídia no Bin primeiro.");
    return;
  }

  // Detecção de Edição por 4 Pontos (Origem IN..OUT e Timeline IN..OUT)
  if (S.srcIn != null && S.srcOut != null && S.srcOut > S.srcIn && S.tlIn != null && S.tlOut != null && S.tlOut > S.tlIn && !fitChoice) {
    const sDur = Number((S.srcOut - S.srcIn).toFixed(2));
    const tDur = Number((S.tlOut - S.tlIn).toFixed(2));
    if (sDur >= 0.1 && tDur >= 0.1 && Math.abs(sDur - tDur) > 0.05) {
      open4PointFitDialog(targetTrack, mode, explicitTime, sDur, tDur);
      return;
    }
  }

  saveUndoSnapshot();

  // Se o projeto ainda estava apenas com a demonstração sintética inicial e o usuário importou uma mídia real,
  // limpamos a linha do tempo demo para que o vídeo/imagem/áudio do usuário comece em 00:00:00:00 pronto para dar Play!
  if (S.isStarterDemo && it.url) {
    clearAllTracksClips();
    S.playhead = 0;
    S.isStarterDemo = false;
  } else {
    S.isStarterDemo = false;
  }

  let clipDur = Math.max(0.5, Number((S.srcOut - S.srcIn).toFixed(2)) || Number(it.dur) || 6);
  let clipInPoint = S.srcIn;
  let clipSpeed = 1;
  let insertTime = explicitTime != null ? Number(explicitTime.toFixed(2)) : (S.tlIn != null ? Number(S.tlIn.toFixed(2)) : Number(S.playhead.toFixed(2)));

  if (fitChoice === "fit_to_fill") {
    const sDur = Number((S.srcOut - S.srcIn).toFixed(2));
    const tDur = Number((S.tlOut - S.tlIn).toFixed(2));
    clipSpeed = Number((sDur / tDur).toFixed(3));
    clipDur = tDur;
    insertTime = Number(S.tlIn.toFixed(2));
    clipInPoint = S.srcIn;
  } else if (fitChoice === "ignore_src_out") {
    const tDur = Number((S.tlOut - S.tlIn).toFixed(2));
    clipDur = tDur;
    insertTime = Number(S.tlIn.toFixed(2));
    clipInPoint = S.srcIn;
    clipSpeed = 1;
  } else if (fitChoice === "ignore_tl_out") {
    const sDur = Number((S.srcOut - S.srcIn).toFixed(2));
    clipDur = sDur;
    insertTime = Number(S.tlIn.toFixed(2));
    clipInPoint = S.srcIn;
    clipSpeed = 1;
  } else if (fitChoice === "ignore_tl_in") {
    const sDur = Number((S.srcOut - S.srcIn).toFixed(2));
    clipDur = sDur;
    insertTime = Math.max(0, Number((S.tlOut - sDur).toFixed(2)));
    clipInPoint = S.srcIn;
    clipSpeed = 1;
  }

  let tk = targetTrack;
  if (tk === "overlay") {
    tk = findOrCreateFreeOverlayTrack(it.kind, insertTime, clipDur);
  } else if (!tk) {
    tk = it.kind === "audio" ? (S.targetAudioTrack || "a1") : (S.targetVideoTrack || "v1");
  }
  ensureTrackExists(tk);

  if (S.tracksLocked[tk]) {
    toast(`A faixa ${tk.toUpperCase()} está trancada (Cadeado L ativo).`);
    return;
  }

  if (mode === "append_or_playhead" && explicitTime == null && !fitChoice && S.tlIn == null) {
    // Se já houver um clipe ocupando a posição da agulha naquela faixa, adiciona logo na sequência (no fim da faixa)
    // para nunca empilhar um vídeo em cima do outro!
    const occupied = (S.clips[tk] || []).some(c => insertTime + clipDur > c.start + 0.02 && insertTime < c.start + c.dur - 0.02);
    if (occupied) {
      insertTime = getTrackEndTime(tk);
    }
  } else if (mode === "insert" || mode === "overwrite" || fitChoice) {
    clearOverlapOnTrack(tk, insertTime, insertTime + clipDur, mode === "insert" ? "insert" : "overwrite");
  }

  const isOverlayV = isVideoTrack(tk) && tk !== "v1";
  const layerNum = Math.max(1, parseInt(tk.slice(1), 10) || 1);
  const defScale = isOverlayV ? 55 : 100;
  const newClip = {
    id: uid(tk + "_"),
    track: tk,
    title: it.name,
    mediaId: it.id,
    mediaUrl: it.url || "",
    mediaPath: it.path || "",
    mediaName: it.name,
    mediaKind: it.kind,
    synthType: it.synthType || "",
    start: insertTime,
    inPoint: clipInPoint,
    dur: clipDur,
    sourceMaxDur: it.dur || 600,
    speed: clipSpeed,
    volume: 100,
    opacity: 100,
    scale: defScale,
    scaleX: defScale,
    scaleY: defScale,
    uniformScale: true,
    fitMode: "contain",
    rotation: 0,
    posX: isOverlayV ? ((layerNum % 2 === 0) ? 120 : -120) : 0,
    posY: isOverlayV ? ((layerNum <= 3) ? -80 : 80) : 0,
    cropTop: 0,
    cropBottom: 0,
    cropLeft: 0,
    cropRight: 0,
    motionPreset: "none",
    chromaKey: false,
    brightness: 0,
    contrast: 0,
    saturation: 100,
    filter: "none",
    trans: "Corte Seco",
    transDur: 1.0,
    disabled: false
  };

  S.clips[tk].push(newClip);
  resolveTrackOverlaps(tk, newClip.id);

  S.selectedClipId = newClip.id;
  S.selectedClipTrack = tk;
  S.selectedClipIds = [newClip.id];
  if (isVideoTrack(tk)) S.targetVideoTrack = tk;
  if (isAudioTrack(tk)) S.targetAudioTrack = tk;
  recalcSequenceDuration();
  setPlayhead(newClip.start, false);
  renderAll();
  if (fitChoice === "fit_to_fill") {
    toast(`Fit to Fill aplicado: velocidade ${(clipSpeed * 100).toFixed(0)}% (${clipDur.toFixed(2)}s preenchidos na timeline)!`);
  } else {
    toast(`"${it.name}" (${clipDur}s) colocado em ${tk.toUpperCase()} (${fmtSMPTE(newClip.start)}). Clique em ► Tocar!`);
  }
}

/* ---------- Geradores Sintéticos Anos 90 (Leader, Barras SMPTE, VHS Doméstico, VT Comercial, Roteiro) ---------- */
function drawSynthGenerator(ctx, W, H, type, localTime, label) {
  if (type === "leader") {
    // Contagem Regressiva Universal 1995 (SMPTE Film Leader)
    ctx.fillStyle = "#505050";
    ctx.fillRect(0, 0, W, H);
    const secLeft = Math.max(1, Math.ceil(6 - (localTime % 6)));
    const sweepAngle = -Math.PI / 2 + ((localTime % 1) * Math.PI * 2);

    ctx.beginPath();
    ctx.moveTo(W / 2, H / 2);
    ctx.arc(W / 2, H / 2, 165, -Math.PI / 2, sweepAngle, false);
    ctx.closePath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.fill();

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(W / 2, H / 2, 165, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(W / 2, H / 2, 130, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
    ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.font = "bold 160px Tahoma, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(secLeft), W / 2, H / 2);
    ctx.textBaseline = "alphabetic";
    return;
  }

  if (type === "bars") {
    const cols = ["#C0C0C0", "#C0C000", "#00C0C0", "#00C000", "#C000C0", "#C00000", "#0000C0"];
    const bw = W / cols.length;
    cols.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * bw, 0, bw + 1, H * 0.72);
    });
    const sub = ["#0000C0", "#131313", "#C000C0", "#131313", "#00C0C0", "#131313", "#C0C0C0"];
    sub.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * bw, H * 0.72, bw + 1, H * 0.08);
    });
    ctx.fillStyle = "#0E0E0E";
    ctx.fillRect(0, H * 0.8, W, H * 0.2);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 18px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("SINAL DE REFERÊNCIA NTSC · EMISSORA C2 (1995)", W / 2, H * 0.92);
    return;
  }

  if (type === "bars_pluge") {
    // Barras SMPTE Completas com Pulso Pluge Broadcast (-3.5, 0, +3.5 IRE)
    const cols = ["#BFBFBF", "#BFBF00", "#00BFBF", "#00BF00", "#BF00BF", "#BF0000", "#0000BF"];
    const bw = W / cols.length;
    cols.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * bw, 0, bw + 1, H * 0.67);
    });

    const cast = ["#0000BF", "#131313", "#BF00BF", "#131313", "#00BFBF", "#131313", "#BFBFBF"];
    cast.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * bw, H * 0.67, bw + 1, H * 0.08);
    });

    const botY = H * 0.75;
    const botH = H * 0.25;
    ctx.fillStyle = "#081B26"; // -I
    ctx.fillRect(0, botY, bw * 1.25, botH);
    ctx.fillStyle = "#FFFFFF"; // 100% White
    ctx.fillRect(bw * 1.25, botY, bw * 1.25, botH);
    ctx.fillStyle = "#220038"; // +Q
    ctx.fillRect(bw * 2.5, botY, bw * 1.25, botH);
    ctx.fillStyle = "#131313"; // Black 7.5 IRE
    ctx.fillRect(bw * 3.75, botY, W - bw * 3.75, botH);

    // Bloco PLUGE: Sub-preto (3.5 IRE), Preto (7.5 IRE), Super-preto (11.5 IRE)
    const plugeX = bw * 4.4;
    const plugeW = bw * 0.42;
    ctx.fillStyle = "#040404"; // -3.5 IRE
    ctx.fillRect(plugeX, botY, plugeW, botH);
    ctx.fillStyle = "#131313"; // 0 IRE / 7.5 IRE pedestal
    ctx.fillRect(plugeX + plugeW, botY, plugeW, botH);
    ctx.fillStyle = "#242424"; // +3.5 IRE
    ctx.fillRect(plugeX + plugeW * 2, botY, plugeW, botH);

    ctx.fillStyle = "#FFE040";
    ctx.font = "bold 15px 'Courier New', monospace";
    ctx.textAlign = "left";
    ctx.fillText("SMPTE COLOR BARS + PULSO PLUGE (-3.5 / 0 / +3.5 IRE)", 16, H - 14);
    return;
  }

  if (type === "crosshatch") {
    // Grade de Convergência & Geometria CRT 1995 (Crosshatch 16x12)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;

    const cols = 16, rows = 12;
    const gw = W / cols, gh = H / rows;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath(); ctx.moveTo(c * gw, 0); ctx.lineTo(c * gw, H); ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * gh); ctx.lineTo(W, r * gh); ctx.stroke();
    }

    // Linhas centrais reforçadas (Mira)
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#FFE000";
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();

    // Círculo central para teste de aspecto e linearidade esférica
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00FF66";
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, Math.min(W, H) * 0.38, 0, Math.PI * 2);
    ctx.stroke();

    // Marcadores de Zona Segura (Action Safe 90% e Title Safe 80%)
    ctx.strokeStyle = "rgba(255, 0, 0, 0.75)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(W * 0.05, H * 0.05, W * 0.90, H * 0.90);
    ctx.strokeStyle = "rgba(0, 255, 255, 0.75)";
    ctx.strokeRect(W * 0.10, H * 0.10, W * 0.80, H * 0.80);

    ctx.fillStyle = "#FFE000";
    ctx.font = "bold 15px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("GRADE DE ALINHAMENTO CRT E GEOMETRIA (CROSSHATCH 16×12)", W / 2, 28);
    return;
  }

  if (type === "bars_ebu_75") {
    // Barras de Cor Padrão EBU 75% (PAL / CCIR 601 European Broadcast Standard)
    const cols = ["#BFBFBF", "#BFBF00", "#00BFBF", "#00BF00", "#BF00BF", "#BF0000", "#0000BF", "#000000"];
    const bw = W / cols.length;
    cols.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * bw, 0, bw + 1, H * 0.78);
    });

    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, H * 0.78, W, H * 0.22);

    ctx.fillStyle = "#FFE040";
    ctx.font = "bold 16px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("PADRÃO EBU 75% · BROADCAST CCIR 601 / PAL-M (1995)", W / 2, H * 0.88);
    ctx.fillStyle = "#00FF66";
    ctx.font = "12px monospace";
    ctx.fillText("75% LUMINÂNCIA · 100% COR · ALINHAMENTO DE VETORSCOPIO", W / 2, H * 0.95);
    return;
  }

  if (type === "multiburst") {
    // Padrão de Resolução Multi-Burst de Frequência de Vídeo (0.5 a 4.2 MHz)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);

    const burstH = H * 0.78;
    const packetW = W / 7;

    // 1. Barra Branca de Referência 100 IRE
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, packetW, burstH);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    ctx.fillText("REF 100%", packetW / 2, burstH / 2);

    // 2. Pacotes de Frequência Analógica (0.5, 1.0, 2.0, 3.0, 3.58, 4.2 MHz)
    const freqs = [
      { f: "0.5 MHz", period: 28 },
      { f: "1.0 MHz", period: 16 },
      { f: "2.0 MHz", period: 8 },
      { f: "3.0 MHz", period: 5 },
      { f: "3.58 MHz", period: 3.8 },
      { f: "4.2 MHz", period: 2.5 }
    ];

    freqs.forEach((pkt, idx) => {
      const startX = (idx + 1) * packetW;
      for (let x = startX; x < startX + packetW; x++) {
        const sine = Math.sin((x - startX) * (Math.PI * 2 / pkt.period));
        const val = Math.round(128 + sine * 115);
        ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
        ctx.fillRect(x, 0, 1, burstH);
      }
      ctx.fillStyle = "#FFE000";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(pkt.f, startX + packetW / 2, 22);
    });

    // Faixa Inferior
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, burstH, W, H - burstH);
    ctx.fillStyle = "#FFE040";
    ctx.font = "bold 15px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("PADRÃO MULTI-BURST 0.5 - 4.2 MHz · RESPOSTA EM FREQUÊNCIA DE CABEÇOTE ANALÓGICO", W / 2, H * 0.89);
    return;
  }

  if (type === "grayscale_10") {
    // Escala de Cinza em 10 Passos Broadcast (0 a 100 IRE)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);

    const steps = 10;
    const sw = W / steps;
    const stepH = H * 0.72;
    for (let i = 0; i < steps; i++) {
      const ire = Math.round(i * 10);
      const val = Math.round((i / (steps - 1)) * 255);
      ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
      ctx.fillRect(i * sw, 0, sw + 1, stepH);

      ctx.fillStyle = i >= 5 ? "#000000" : "#FFFFFF";
      ctx.font = "bold 16px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${ire} IRE`, i * sw + sw / 2, stepH / 2);
      ctx.font = "12px monospace";
      ctx.fillText(`${Math.round((i / 9) * 100)}%`, i * sw + sw / 2, stepH / 2 + 18);
    }

    const rampGrad = ctx.createLinearGradient(0, stepH, W, stepH);
    rampGrad.addColorStop(0, "#000000");
    rampGrad.addColorStop(1, "#FFFFFF");
    ctx.fillStyle = rampGrad;
    ctx.fillRect(0, stepH, W, H * 0.16);

    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, H * 0.88, W, H * 0.12);
    ctx.fillStyle = "#00FF66";
    ctx.font = "bold 15px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("CALIBRAÇÃO DE GAMA, LUMINÂNCIA E LINEARIDADE · 10-STEP WEDGE", W / 2, H - 12);
    return;
  }

  if (type === "tone_1khz" || type === "tone_440hz" || type === "sweep_20_20k" || type === "pink_noise" || type === "white_noise") {
    // Osciloscópio de Sinal de Áudio DSP 1995
    ctx.fillStyle = "#031008";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(0, 255, 100, 0.18)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 24) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    ctx.strokeStyle = "#00FF66";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const midY = H / 2;
    for (let x = 0; x < W; x += 3) {
      let amp = 0;
      if (type === "tone_1khz") {
        amp = Math.sin((x * 0.08) + localTime * 24) * 80;
      } else if (type === "tone_440hz") {
        amp = Math.sin((x * 0.045) + localTime * 14) * 85;
      } else if (type === "sweep_20_20k") {
        const sweepFreq = 0.015 + ((localTime * 0.3) % 1) * 0.25;
        amp = Math.sin(x * sweepFreq) * 80;
      } else if (type === "pink_noise") {
        amp = (Math.sin(x * 0.12 + localTime * 18) * 0.6 + (Math.random() - 0.5) * 0.8) * 70;
      } else {
        amp = (Math.random() - 0.5) * 110;
      }
      const y = midY + amp;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const titleMap = {
      tone_1khz: "TOM DE REFERÊNCIA SMPTE 1 kHz · -20 dBFS / 0 VU",
      tone_440hz: "TOM DE AFINAÇÃO MUSICAL LÁ 440 Hz · PADRÃO ISO 16 / SMPTE",
      sweep_20_20k: "VARREDURA SENOIDAL CONTÍNUA 20 Hz - 20 kHz · TESTE ACÚSTICO",
      pink_noise: "RUÍDO ROSA (PINK NOISE) · CALIBRAÇÃO ACÚSTICA RTA 1/f",
      white_noise: "RUÍDO BRANCO (WHITE NOISE) · ESPECTRO PLANO CONTÍNUO"
    };
    ctx.fillStyle = "#FFE040";
    ctx.font = "bold 18px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText(titleMap[type] || "SINAL DE ÁUDIO DSP", W / 2, 38);

    ctx.fillStyle = "#00FF66";
    ctx.font = "14px 'VT323', monospace";
    ctx.fillText(`FAIXA ALVO: ${(S.targetAudioTrack || "A1").toUpperCase()} · CALIBRAÇÃO DE ESTÚDIO 1995`, W / 2, H - 20);
    return;
  }

  if (type === "vhs_home") {
    // Cena doméstica Camcorder 1995 (Por do sol + Família / Quintal + OSD VHS)
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#355C7D");
    g.addColorStop(0.55, "#C06C84");
    g.addColorStop(0.65, "#F67280");
    g.addColorStop(1, "#2A363B");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Sol anos 90 se movendo suavemente
    const sunX = W * 0.5 + Math.sin(localTime * 0.5) * 40;
    ctx.fillStyle = "#FFE066";
    ctx.beginPath();
    ctx.arc(sunX, H * 0.52, 46, 0, Math.PI * 2);
    ctx.fill();

    // Gramado / horizonte e casa
    ctx.fillStyle = "#1E3224";
    ctx.fillRect(0, H * 0.62, W, H * 0.38);

    // Casa e árvore estilizadas
    ctx.fillStyle = "#3A2618";
    ctx.fillRect(120, H * 0.46, 130, H * 0.16);
    ctx.beginPath();
    ctx.moveTo(105, H * 0.46); ctx.lineTo(185, H * 0.34); ctx.lineTo(265, H * 0.46);
    ctx.closePath();
    ctx.fillStyle = "#6B1D1D";
    ctx.fill();
    ctx.fillStyle = "#FFE080";
    ctx.fillRect(165, H * 0.50, 36, 28);

    // OSD clássico de filmadora VHS 1995
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "28px 'VT323', monospace";
    ctx.textAlign = "left";
    ctx.fillText("PLAY ►   SP", 34, 52);
    ctx.fillText("05 NOV 1995   17:45", 34, H - 36);
    return;
  }

  if (type === "commercial") {
    // VT Comercial Dinâmico de TV 1995
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#001F54");
    g.addColorStop(0.5, "#034078");
    g.addColorStop(1, "#800000");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Grade cibernética 3D anos 90
    ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
    ctx.lineWidth = 1.5;
    const off = (localTime * 40) % 40;
    for (let y = H * 0.6; y < H; y += 18) {
      ctx.beginPath(); ctx.moveTo(0, y + (off * 0.3)); ctx.lineTo(W, y + (off * 0.3)); ctx.stroke();
    }
    for (let i = -5; i <= 5; i++) {
      ctx.beginPath(); ctx.moveTo(W / 2 + i * 30, H * 0.6); ctx.lineTo(W / 2 + i * 130, H); ctx.stroke();
    }

    ctx.fillStyle = "#FFE000";
    ctx.font = "bold 36px Tahoma, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PRODUÇÃO COMERCIAL · C2", W / 2, H * 0.35);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px 'Courier New', monospace";
    ctx.fillText("EDIÇÃO NÃO-LINEAR · EFEITOS DVE · ÁUDIO 16-BIT", W / 2, H * 0.47);
    return;
  }

  // Fallback para cena de roteiro do ScriptRoom
  const isNight = String(label || "").toUpperCase().includes("NOITE");
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, isNight ? "#120B1D" : "#2C4D6E");
  grad.addColorStop(0.65, isNight ? "#2B1520" : "#6D8BA6");
  grad.addColorStop(1, "#141414");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.strokeRect(40, 50, W - 80, H - 110);
  ctx.fillStyle = "#FFE040";
  ctx.font = "bold 20px 'Courier New', monospace";
  ctx.textAlign = "center";
  wrapCanvasText(ctx, label || "PLANO DE VÍDEO", W / 2, H / 2 - 10, W - 120, 26);
}

/* ---------- Renderizador de Clipe Individual em Buffer/Contexto ---------- */
const offCanvas = document.createElement("canvas");
offCanvas.width = 640;
offCanvas.height = 480;
const offCtx = offCanvas.getContext("2d");

/* ---------- Motor de Interpolação de Keyframes (Quadros-Chave com Curva Hermite S) ---------- */
function evaluateKeyframedProperty(clip, prop, defaultVal, localSec) {
  if (!clip) return defaultVal;
  const kfs = (clip.keyframes && clip.keyframes[prop]) ? clip.keyframes[prop] : null;
  if (!kfs || !kfs.length) {
    return clip[prop] != null ? Number(clip[prop]) : defaultVal;
  }
  if (kfs.length === 1) return Number(kfs[0].value);
  const sorted = [...kfs].sort((a, b) => a.time - b.time);
  if (localSec <= sorted[0].time) return Number(sorted[0].value);
  if (localSec >= sorted[sorted.length - 1].time) return Number(sorted[sorted.length - 1].value);
  for (let i = 0; i < sorted.length - 1; i++) {
    const k0 = sorted[i], k1 = sorted[i + 1];
    if (localSec >= k0.time && localSec <= k1.time) {
      const span = k1.time - k0.time;
      if (span <= 0.0001) return Number(k0.value);
      let t = (localSec - k0.time) / span;
      if (k0.ease !== "linear") {
        // Interpolação Suave S-Curve (Hermite Smoothstep)
        t = t * t * (3 - 2 * t);
      }
      return Number(k0.value) + (Number(k1.value) - Number(k0.value)) * t;
    }
  }
  return defaultVal;
}

function getClipTransformAt(clip, globalSec) {
  const localSec = Math.max(0, (globalSec - clip.start) * (clip.speed || 1) + (clip.inPoint || 0));
  const baseSX = clip.scaleX != null ? Number(clip.scaleX) : (clip.scale != null ? Number(clip.scale) : 100);
  const baseSY = clip.scaleY != null ? Number(clip.scaleY) : (clip.scale != null ? Number(clip.scale) : 100);

  let scaleX = evaluateKeyframedProperty(clip, "scaleX", baseSX, localSec);
  let scaleY = evaluateKeyframedProperty(clip, "scaleY", baseSY, localSec);
  let posX = evaluateKeyframedProperty(clip, "posX", Number(clip.posX) || 0, localSec);
  let posY = evaluateKeyframedProperty(clip, "posY", Number(clip.posY) || 0, localSec);
  let rotation = evaluateKeyframedProperty(clip, "rotation", Number(clip.rotation) || 0, localSec);

  const dur = Math.max(0.1, Number(clip.dur) || 5);
  const prog = Math.max(0, Math.min(1, (globalSec - clip.start) / dur));
  const mp = clip.motionPreset || "none";

  if (mp === "zoom_in") {
    scaleX *= (1 + prog * 0.28);
    scaleY *= (1 + prog * 0.28);
  } else if (mp === "zoom_out") {
    scaleX *= (1.28 - prog * 0.28);
    scaleY *= (1.28 - prog * 0.28);
  } else if (mp === "pan_lr") {
    posX += -65 + prog * 130;
  } else if (mp === "pan_rl") {
    posX += 65 - prog * 130;
  } else if (mp === "slide_in") {
    const sp = Math.min(1, Math.max(0, (globalSec - clip.start) / Math.min(0.8, dur * 0.4)));
    posX += (1 - sp) * -640;
  } else if (mp === "spin") {
    const sp = Math.min(1, Math.max(0, (globalSec - clip.start) / Math.min(1.0, dur * 0.5)));
    rotation += (1 - sp) * -360;
  }

  return { scaleX, scaleY, posX, posY, rotation };
}

// ============================================================================
// SUÍTE DE EFEITOS DIGITAIS 3D (DVE 1995) — AMPEX ADO / PINNACLE ALLADIN
// ============================================================================

function draw3DBevelBorder(ctx, W, H, thickness = 6) {
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W - thickness, thickness); ctx.lineTo(thickness, thickness); ctx.lineTo(thickness, H - thickness); ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#181818";
  ctx.beginPath();
  ctx.moveTo(W, 0); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.lineTo(thickness, H - thickness); ctx.lineTo(W - thickness, H - thickness); ctx.lineTo(W - thickness, thickness);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#808080";
  ctx.lineWidth = 1;
  ctx.strokeRect(thickness, thickness, W - 2 * thickness, H - 2 * thickness);
  ctx.restore();
}

function draw3DAnaglyphSplit(ctx, W, H, offset = 6) {
  ctx.save();
  // Anáglifo Estereoscópico 3D 1995 de Alta Performance:
  // Usa composição direta acelerada por hardware em vez de loops de getImageData que causam queda de frames e áudio mudo.
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "rgba(255, 0, 0, 0.28)";
  ctx.fillRect(-offset, 0, W + offset, H);
  ctx.fillStyle = "rgba(0, 240, 255, 0.28)";
  ctx.fillRect(offset, 0, W, H);
  ctx.restore();
}

function drawCRTScanlines(ctx, W, H) {
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
  for (let y = 0; y < H; y += 3) {
    ctx.fillRect(0, y, W, 1.2);
  }
  ctx.fillStyle = "rgba(20, 60, 30, 0.04)";
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function drawVHSHeadGlitch(ctx, W, H) {
  ctx.save();
  const noiseH = 12;
  const startY = H - noiseH;
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  for (let i = 0; i < 28; i++) {
    const rx = (Math.random() * W) | 0;
    const ry = startY + ((Math.random() * noiseH) | 0);
    const rw = (Math.random() * 28 + 6) | 0;
    ctx.fillRect(rx, ry, rw, 1.5);
  }
  ctx.restore();
}

function draw3DPagePeelOverlay(ctx, W, H, elapsed) {
  const peelProgress = Math.min(1, Math.max(0, (elapsed % 3) / 2.5));
  if (peelProgress < 0.05) return;
  const curl = peelProgress * Math.min(W, H) * 0.9;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(W, H - curl);
  ctx.lineTo(W - curl, H);
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = -5;
  ctx.shadowOffsetY = -5;
  const g = ctx.createLinearGradient(W, H, W - curl, H - curl);
  g.addColorStop(0, "#FFFFFF");
  g.addColorStop(0.3, "#C0C0D0");
  g.addColorStop(0.7, "#606070");
  g.addColorStop(1, "#181824");
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = "#E0E0FF";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

function captureStillFrameBMP() {
  const cv = document.getElementById("vCanvas");
  if (!cv) { toast("Monitor de vídeo não encontrado."); return; }
  const W = cv.width, H = cv.height;
  const ctx = cv.getContext("2d");
  const imgData = ctx.getImageData(0, 0, W, H);
  const data = imgData.data;

  const rowSize = Math.floor((24 * W + 31) / 32) * 4;
  const pixelArraySize = rowSize * H;
  const fileSize = 54 + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // BITMAPFILEHEADER (14 bytes)
  view.setUint16(0, 0x424D, false); // 'BM'
  view.setUint32(2, fileSize, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, 0, true);
  view.setUint32(10, 54, true);

  // BITMAPINFOHEADER (40 bytes)
  view.setUint32(14, 40, true);
  view.setInt32(18, W, true);
  view.setInt32(22, H, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(30, 0, true);
  view.setUint32(34, pixelArraySize, true);
  view.setInt32(38, 2835, true);
  view.setInt32(42, 2835, true);
  view.setUint32(46, 0, true);
  view.setUint32(50, 0, true);

  const bytes = new Uint8Array(buffer);
  let pIdx = 54;
  for (let y = H - 1; y >= 0; y--) {
    const rowStart = pIdx;
    for (let x = 0; x < W; x++) {
      const srcIdx = (y * W + x) * 4;
      bytes[pIdx++] = data[srcIdx + 2]; // B
      bytes[pIdx++] = data[srcIdx + 1]; // G
      bytes[pIdx++] = data[srcIdx];     // R
    }
    while (pIdx < rowStart + rowSize) {
      bytes[pIdx++] = 0;
    }
  }

  const blob = new Blob([buffer], { type: "image/bmp" });
  const url = URL.createObjectURL(blob);
  const tc = fmtSMPTE(S.playhead).replace(/:/g, "_");
  const filename = `FOTOGRAMA_${tc}.BMP`;

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  const binItem = {
    id: uid("bmp_"),
    name: filename,
    tipo: "imagem",
    dur: 5.0,
    mediaUrl: url,
    w: W,
    h: H
  };
  S.bin.push(binItem);
  renderBin();
  toast(`Fotograma ${filename} exportado em BMP 1995 e salvo no Cesto!`);
}

function open3DDVEConsole(targetClip = null) {
  const clip = targetClip || getSelectedClip() || (S.clips.v1 && S.clips.v1[0]);
  if (!clip) {
    toast("Nenhum clipe selecionado para os Efeitos 3D.");
    return;
  }

  let rotX = Number(clip.rotX) || 0;
  let rotY = Number(clip.rotY) || 0;
  let rotZ = Number(clip.rotZ) || 0;
  let depthZ = Number(clip.depthZ) || 0;
  let preset = clip.motionPreset || "none";
  let bevel = !!clip.dve3dBevel;
  let anaglyph = !!clip.anaglyph3D;
  let scanlines = !!clip.scanlinesCRT;
  let vhs = !!clip.vhsGlitch;

  dialog({
    id: "dve3DConsoleWin",
    title: "Processador de Efeitos Digitais 3D (DVE 1995) — Ampex ADO / Pinnacle",
    width: 530,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center">
          <div class="dve-3d-badge">DVE 3D SUITE 1995 · BROADCAST DIGITAL OPTICS</div>
          <span style="font-size:11px;font-weight:700">Clipe: ${escH(clip.title.slice(0, 20))}</span>
        </div>

        <div class="row" style="gap:12px;align-items:flex-start">
          <!-- Gizmo de Cubo 3D Interativo -->
          <div class="col" style="gap:4px;align-items:center">
            <div class="dve-3d-gizmo-box">
              <div class="dve-3d-cube" id="dveGizmoCube">
                <div class="dve-3d-face" style="transform:translateZ(19px)">VT</div>
                <div class="dve-3d-face" style="transform:rotateY(180deg) translateZ(19px)">DVE</div>
                <div class="dve-3d-face" style="transform:rotateY(90deg) translateZ(19px)">3D</div>
                <div class="dve-3d-face" style="transform:rotateY(-90deg) translateZ(19px)">95</div>
                <div class="dve-3d-face" style="transform:rotateX(90deg) translateZ(19px)">TOP</div>
                <div class="dve-3d-face" style="transform:rotateX(-90deg) translateZ(19px)">BOT</div>
              </div>
            </div>
            <span style="font-size:10px;color:#555">Projeção 3D</span>
          </div>

          <!-- Controles de Eixo e Rotação 3D -->
          <div class="col" style="flex:1;gap:4px;font-size:11px">
            <div class="slider-row">
              <span>Giro Y (Yaw):</span>
              <input type="range" id="dveRotY" min="-180" max="180" value="${rotY}">
              <span class="val" id="dveRotYVal">${rotY}°</span>
            </div>
            <div class="slider-row">
              <span>Inclinação X (Pitch):</span>
              <input type="range" id="dveRotX" min="-180" max="180" value="${rotX}">
              <span class="val" id="dveRotXVal">${rotX}°</span>
            </div>
            <div class="slider-row">
              <span>Rolagem Z (Roll):</span>
              <input type="range" id="dveRotZ" min="-180" max="180" value="${rotZ}">
              <span class="val" id="dveRotZVal">${rotZ}°</span>
            </div>
            <div class="slider-row">
              <span>Profundidade Z:</span>
              <input type="range" id="dveDepthZ" min="-300" max="300" value="${depthZ}">
              <span class="val" id="dveDepthZVal">${depthZ}px</span>
            </div>
            <div class="slider-row">
              <span>Movimento 3D:</span>
              <select id="dvePresetSel" style="grid-column:2/4;height:20px;font-size:11px">
                <option value="none"${preset === "none" ? " selected" : ""}>Estático (Ângulos Fixos)</option>
                <option value="3d_spin_y"${preset === "3d_spin_y" ? " selected" : ""}>Giro Contínuo 3D (Tumble Y)</option>
                <option value="3d_spin_x"${preset === "3d_spin_x" ? " selected" : ""}>Cambalhota Contínua 3D (Flip X)</option>
                <option value="3d_cube_spin"${preset === "3d_cube_spin" ? " selected" : ""}>Cubo 3D Rotativo (Video Cube 95)</option>
                <option value="3d_page_peel"${preset === "3d_page_peel" ? " selected" : ""}>Virada de Página 3D (Page Peel 95)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Opções Especiais dos Anos 90 -->
        <div class="dve-3d-panel">
          <b style="font-size:11px">Efeitos de Transmissão &amp; Profundidade Estereoscópica:</b>
          <div class="row" style="flex-wrap:wrap;gap:8px;font-size:11px">
            <label class="row" style="gap:4px;cursor:pointer">
              <input type="checkbox" id="dveChkBevel"${bevel ? " checked" : ""}>
              <span>Moldura 3D Chanfrada (Beveled PiP)</span>
            </label>
            <label class="row" style="gap:4px;cursor:pointer">
              <input type="checkbox" id="dveChkAnaglyph"${anaglyph ? " checked" : ""}>
              <span>Óculos 3D Anáglifo (Vermelho/Azul)</span>
            </label>
            <label class="row" style="gap:4px;cursor:pointer">
              <input type="checkbox" id="dveChkScanlines"${scanlines ? " checked" : ""}>
              <span>Scanlines Tubo CRT Trinitron</span>
            </label>
            <label class="row" style="gap:4px;cursor:pointer">
              <input type="checkbox" id="dveChkVhs"${vhs ? " checked" : ""}>
              <span>Ruído de Cabeçote VHS</span>
            </label>
          </div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Aplicar e Fechar",
        def: 1,
        run: () => {
          clip.rotX = rotX;
          clip.rotY = rotY;
          clip.rotZ = rotZ;
          clip.depthZ = depthZ;
          clip.motionPreset = preset;
          clip.dve3dBevel = bevel;
          clip.anaglyph3D = anaglyph;
          clip.scanlinesCRT = scanlines;
          clip.vhsGlitch = vhs;
          renderAll();
          toast(`Efeitos 3D DVE aplicados ao clipe "${clip.title}"!`);
          return true;
        }
      },
      {
        label: "Resetar 3D",
        run: () => {
          clip.rotX = 0;
          clip.rotY = 0;
          clip.rotZ = 0;
          clip.depthZ = 0;
          clip.motionPreset = "none";
          clip.dve3dBevel = false;
          clip.anaglyph3D = false;
          clip.scanlinesCRT = false;
          clip.vhsGlitch = false;
          renderAll();
          toast("Efeitos 3D resetados.");
          return true;
        }
      },
      { label: "Cancelar", run: () => true }
    ]
  });

  setTimeout(() => {
    const cube = document.getElementById("dveGizmoCube");
    const updateGizmo = () => {
      if (cube) cube.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
    };
    const sync = () => {
      clip.rotX = rotX;
      clip.rotY = rotY;
      clip.rotZ = rotZ;
      clip.depthZ = depthZ;
      clip.motionPreset = preset;
      clip.dve3dBevel = bevel;
      clip.anaglyph3D = anaglyph;
      clip.scanlinesCRT = scanlines;
      clip.vhsGlitch = vhs;
      updateGizmo();
      renderMonitorFrame();
    };

    const inY = document.getElementById("dveRotY");
    if (inY) inY.oninput = (e) => { rotY = +e.target.value; document.getElementById("dveRotYVal").textContent = rotY + "°"; sync(); };
    const inX = document.getElementById("dveRotX");
    if (inX) inX.oninput = (e) => { rotX = +e.target.value; document.getElementById("dveRotXVal").textContent = rotX + "°"; sync(); };
    const inZ = document.getElementById("dveRotZ");
    if (inZ) inZ.oninput = (e) => { rotZ = +e.target.value; document.getElementById("dveRotZVal").textContent = rotZ + "°"; sync(); };
    const inD = document.getElementById("dveDepthZ");
    if (inD) inD.oninput = (e) => { depthZ = +e.target.value; document.getElementById("dveDepthZVal").textContent = depthZ + "px"; sync(); };

    const sel = document.getElementById("dvePresetSel");
    if (sel) sel.onchange = (e) => { preset = e.target.value; sync(); };
    const chkB = document.getElementById("dveChkBevel");
    if (chkB) chkB.onchange = (e) => { bevel = e.target.checked; sync(); };
    const chkA = document.getElementById("dveChkAnaglyph");
    if (chkA) chkA.onchange = (e) => { anaglyph = e.target.checked; sync(); };
    const chkS = document.getElementById("dveChkScanlines");
    if (chkS) chkS.onchange = (e) => { scanlines = e.target.checked; sync(); };
    const chkV = document.getElementById("dveChkVhs");
    if (chkV) chkV.onchange = (e) => { vhs = e.target.checked; sync(); };

    updateGizmo();
  }, 40);
}

function drawSingleClipToContext(tCtx, W, H, clip, globalSec) {
  if (!clip || clip.disabled) return;
  const speed = clip.speed || 1;
  let localSec;
  if (clip.reverse) {
    const rawElapsed = (globalSec - clip.start) * speed;
    localSec = Math.max(0, (clip.inPoint || 0) + (clip.dur * speed) - rawElapsed);
  } else {
    localSec = Math.max(0, (globalSec - clip.start) * speed + (clip.inPoint || 0));
  }

  tCtx.save();

  // Opacidade com interpolação de Keyframes + Fades Suaves (Fade In / Fade Out)
  const baseOp = evaluateKeyframedProperty(clip, "opacity", (clip.opacity == null ? 100 : clip.opacity), localSec);
  let alpha = Math.max(0, Math.min(1, baseOp / 100));
  const dur = Math.max(0.1, Number(clip.dur) || 1);
  const elapsed = globalSec - clip.start;
  const remain = (clip.start + dur) - globalSec;
  const fIn = Math.max(0, Number(clip.fadeIn) || 0);
  const fOut = Math.max(0, Number(clip.fadeOut) || 0);
  if (fIn > 0 && elapsed >= 0 && elapsed < fIn) {
    alpha *= Math.sin(Math.min(1, elapsed / fIn) * Math.PI / 2);
  }
  if (fOut > 0 && remain >= 0 && remain < fOut) {
    alpha *= Math.sin(Math.min(1, remain / fOut) * Math.PI / 2);
  }
  tCtx.globalAlpha = Math.max(0, Math.min(1, alpha));

  // Modos de Mesclagem de Camadas (Blend Modes 1995: Multiplicar, Tela, Sobrepor, Adicionar, Diferença, Luz Direta)
  if (clip.blendMode && clip.blendMode !== "normal" && clip.blendMode !== "source-over") {
    tCtx.globalCompositeOperation = clip.blendMode;
  }

  const tf = getClipTransformAt(clip, globalSec);
  const sx = tf.scaleX / 100;
  const sy = tf.scaleY / 100;
  const fh = clip.flipH ? -1 : 1;
  const fv = clip.flipV ? -1 : 1;

  // Transformações 3D DVE (Giro X/Y/Z, Profundidade e Presets Animados 1995)
  let rY = Number(clip.rotY) || 0;
  let rX = Number(clip.rotX) || 0;
  let rZ = (tf.rotation || 0) + (Number(clip.rotZ) || 0);
  let dZ = Number(clip.depthZ) || 0;
  const mot = clip.motionPreset;
  if (mot === "3d_spin_y") {
    rY = ((elapsed * 75) % 360) - 180;
  } else if (mot === "3d_spin_x") {
    rX = ((elapsed * 75) % 360) - 180;
  } else if (mot === "3d_cube_spin") {
    rY = (elapsed * 50) % 360;
  }

  const radY = (rY * Math.PI) / 180;
  const radX = (rX * Math.PI) / 180;
  const zScale = Math.max(0.15, 1 - dZ / 400);

  const rawCosY = Math.cos(radY);
  const rawCosX = Math.cos(radX);
  // Garante escala mínima segura para que a matriz de transformação do Canvas 2D nunca seja singular (evita tela piscando)
  const safeCosY = (Math.abs(rawCosY) < 0.02 ? (rawCosY < 0 ? -0.02 : 0.02) : rawCosY);
  const safeCosX = (Math.abs(rawCosX) < 0.02 ? (rawCosX < 0 ? -0.02 : 0.02) : rawCosX);

  tCtx.translate(W / 2 + tf.posX, H / 2 + tf.posY);
  if (rZ) tCtx.rotate((rZ * Math.PI) / 180);
  tCtx.scale(sx * fh * safeCosY * zScale, sy * fv * safeCosX * zScale);
  if (Math.abs(rY) > 0.1) {
    tCtx.transform(1, Math.sin(radY) * 0.28, 0, 1, 0, 0);
  }
  if (Math.abs(rX) > 0.1) {
    tCtx.transform(1, 0, Math.sin(radX) * 0.28, 1, 0, 0);
  }
  tCtx.translate(-W / 2, -H / 2);

  // Recorte de Bordas (Crop Topo, Base, Esquerda, Direita em %)
  const cL = Math.max(0, Math.min(48, Number(clip.cropLeft) || 0)) / 100 * W;
  const cR = Math.max(0, Math.min(48, Number(clip.cropRight) || 0)) / 100 * W;
  const cT = Math.max(0, Math.min(48, Number(clip.cropTop) || 0)) / 100 * H;
  const cB = Math.max(0, Math.min(48, Number(clip.cropBottom) || 0)) / 100 * H;
  if (cL > 0 || cR > 0 || cT > 0 || cB > 0) {
    tCtx.beginPath();
    tCtx.rect(cL, cT, Math.max(8, W - cL - cR), Math.max(8, H - cT - cB));
    tCtx.clip();
  }

  // Filtros de Brilho, Contraste, Saturação e Colorimetria 3-Way Broadcast (Lift, Gamma, Gain)
  const c3 = S.color3Way || { lift: { lum: 0 }, gamma: { lum: 0 }, gain: { lum: 0 }, saturation: 100 };
  const globalSat = (c3.saturation != null ? c3.saturation : 100) / 100;
  const bVal = 100 + (Number(clip.brightness) || 0) + (c3.lift.lum * 0.4 + c3.gamma.lum * 0.5 + c3.gain.lum * 0.4);
  const cVal = 100 + (Number(clip.contrast) || 0) + ((c3.gain.lum - c3.lift.lum) * 0.4);
  const sVal = (clip.saturation == null ? 100 : Number(clip.saturation)) * globalSat;
  const flt = (clip.filter && clip.filter !== "none") ? clip.filter : (prefs.filter || "none");

  let filterStr = `brightness(${bVal}%) contrast(${cVal}%) saturate(${sVal}%)`;
  if (clip.hue && clip.hue !== 0) filterStr += ` hue-rotate(${clip.hue}deg)`;
  if (flt === "pb") filterStr += " grayscale(100%)";
  else if (flt === "sepia") filterStr += " sepia(85%)";
  else if (flt === "invert") filterStr += " invert(100%)";
  else if (flt === "blur") filterStr += " blur(3.5px)";
  else if (flt === "posterize") filterStr += " contrast(180%) saturate(160%)";
  tCtx.filter = filterStr;

  let drewReal = false;
  if (clip.mediaUrl) {
    const el = S.videoEls.get(clip.mediaUrl);
    if (el) {
      try {
        if (el.tagName === "VIDEO") {
          const targetT = el.duration ? Math.min(Math.max(0, el.duration - 0.03), localSec) : localSec;
          // Busca apenas quando o usuário estiver navegando pausado (scrubbing), NUNCA durante a reprodução ativa
          if (!S.playing && !el.seeking && Math.abs(el.currentTime - targetT) > 0.04) {
            el.currentTime = Math.max(0, targetT);
          }
          if (el.videoWidth > 0 || el.readyState >= 1) {
            drawFittedMedia(tCtx, el, W, H, clip.fitMode || "contain");
            drewReal = true;
          } else {
            tCtx.fillStyle = "#0A1422";
            tCtx.fillRect(0, 0, W, H);
            tCtx.fillStyle = "#FFE040";
            tCtx.font = "18px 'VT323', monospace";
            tCtx.textAlign = "center";
            tCtx.fillText(`CARREGANDO VÍDEO: ${clip.title}...`, W / 2, H / 2);
            drewReal = true;
          }
        } else if (el.tagName === "IMG" && el.complete) {
          drawFittedMedia(tCtx, el, W, H, clip.fitMode || "contain");
          drewReal = true;
        }
      } catch (_e) {}
    }
  }

  if (!drewReal) {
    if (clip.text && isVideoTrack(clip.track)) {
      // Títulos e Letreiros Animados (Chyron 95: Estático, Terço Inferior/Lower Third, Crawl, Roll, Blink)
      const chy = clip.chyronType || "static";
      const fontFace = clip.fontFace || "'Courier New', monospace";
      const fontSize = Math.max(12, Number(clip.fontSize) || 22);
      const boxColor = clip.boxColor || "rgba(0, 0, 0, 0.78)";

      // Função auxiliar para aplicar textura de gradiente e sombra
      const applyTextStyle = (curY) => {
        if (clip.shadow !== false) {
          tCtx.shadowColor = "rgba(0, 0, 0, 0.88)";
          tCtx.shadowOffsetX = 2.5;
          tCtx.shadowOffsetY = 2.5;
          tCtx.shadowBlur = 3;
        }
        if (clip.gradient === "gold") {
          const g = tCtx.createLinearGradient(0, curY - fontSize, 0, curY + 4);
          g.addColorStop(0, "#FFFEE0"); g.addColorStop(0.45, "#FFD700"); g.addColorStop(1, "#8A6000");
          tCtx.fillStyle = g;
        } else if (clip.gradient === "silver") {
          const g = tCtx.createLinearGradient(0, curY - fontSize, 0, curY + 4);
          g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.5, "#D0D0E0"); g.addColorStop(1, "#606070");
          tCtx.fillStyle = g;
        } else if (clip.gradient === "crt_blue") {
          const g = tCtx.createLinearGradient(0, curY - fontSize, 0, curY + 4);
          g.addColorStop(0, "#C0E8FF"); g.addColorStop(0.5, "#3080FF"); g.addColorStop(1, "#082060");
          tCtx.fillStyle = g;
        } else if (clip.gradient === "3d_chisel") {
          const g = tCtx.createLinearGradient(0, curY - fontSize, 0, curY + 4);
          g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.3, "#E8E8E8"); g.addColorStop(0.7, "#888888"); g.addColorStop(1, "#303030");
          tCtx.fillStyle = g;
        } else if (clip.gradient === "3d_chrome") {
          const g = tCtx.createLinearGradient(0, curY - fontSize, 0, curY + 4);
          g.addColorStop(0, "#B0E0FF"); g.addColorStop(0.48, "#FFFFFF"); g.addColorStop(0.52, "#001850"); g.addColorStop(1, "#FF8010");
          tCtx.fillStyle = g;
        } else {
          tCtx.fillStyle = clip.fontColor || "#FFFFFF";
        }
      };

      if (chy === "lower_third") {
        // Terço Inferior de Telejornal 1995 (Lower Third)
        const barH = 68;
        const barY = H - barH - 28;
        const barW = W - 72;
        const barX = 36;

        tCtx.save();
        tCtx.fillStyle = "rgba(0, 0, 0, 0.45)";
        tCtx.fillRect(barX + 4, barY + 4, barW, barH);

        const bGrad = tCtx.createLinearGradient(barX, barY, barX, barY + barH);
        bGrad.addColorStop(0, "#0E2442");
        bGrad.addColorStop(0.5, "#081628");
        bGrad.addColorStop(1, "#020712");
        tCtx.fillStyle = bGrad;
        tCtx.fillRect(barX, barY, barW, barH);

        tCtx.strokeStyle = "#FFE040";
        tCtx.lineWidth = 2;
        tCtx.strokeRect(barX, barY, barW, barH);
        tCtx.strokeStyle = "#806010";
        tCtx.lineWidth = 1;
        tCtx.strokeRect(barX + 2, barY + 2, barW - 4, barH - 4);

        tCtx.textAlign = "left";
        tCtx.font = `bold ${fontSize}px ${fontFace}`;
        applyTextStyle(barY + 28);
        if (clip.strokeWidth) {
          tCtx.strokeStyle = "#000000";
          tCtx.lineWidth = clip.strokeWidth;
          tCtx.strokeText(clip.text, barX + 18, barY + 28);
        }
        tCtx.fillText(clip.text, barX + 18, barY + 28);

        if (clip.textSub) {
          tCtx.font = "bold 13px 'Courier New', monospace";
          tCtx.fillStyle = "#FFE860";
          if (clip.strokeWidth) {
            tCtx.strokeStyle = "#000000";
            tCtx.lineWidth = Math.min(2, clip.strokeWidth);
            tCtx.strokeText(clip.textSub.toUpperCase(), barX + 18, barY + 52);
          }
          tCtx.fillText(clip.textSub.toUpperCase(), barX + 18, barY + 52);
        }
        tCtx.restore();
      } else if (chy === "crawl") {
        const barH = Math.max(38, fontSize + 16);
        const barY = H - barH - 24;
        tCtx.fillStyle = boxColor;
        tCtx.fillRect(0, barY, W, barH);
        tCtx.strokeStyle = "#FFE040";
        tCtx.lineWidth = 1.5;
        tCtx.beginPath();
        tCtx.moveTo(0, barY); tCtx.lineTo(W, barY);
        tCtx.moveTo(0, barY + barH); tCtx.lineTo(W, barY + barH);
        tCtx.stroke();

        // Se tiver Badge (ex.: PLANTÃO / URGENTE / REDE BRASIL)
        let badgeW = 0;
        if (clip.crawlBadge) {
          tCtx.font = "900 13px 'Courier New', monospace";
          badgeW = tCtx.measureText(clip.crawlBadge).width + 26;
          tCtx.fillStyle = clip.crawlBadgeCol || "#D00000";
          tCtx.fillRect(0, barY, badgeW, barH);
          tCtx.strokeStyle = "#FFFF55";
          tCtx.lineWidth = 1.5;
          tCtx.strokeRect(0, barY, badgeW, barH);
          tCtx.fillStyle = "#FFFFFF";
          tCtx.textAlign = "center";
          tCtx.fillText(clip.crawlBadge, badgeW / 2, barY + barH / 2 + 5);
        }

        tCtx.save();
        tCtx.beginPath();
        tCtx.rect(badgeW, barY, W - badgeW, barH);
        tCtx.clip();

        tCtx.font = `bold ${fontSize}px ${fontFace}`;
        const txtW = tCtx.measureText(clip.text).width;
        const prog = dur > 0 ? (globalSec - clip.start) / dur : 0;
        const crawlX = W - prog * (W - badgeW + txtW + 80);

        applyTextStyle(barY + barH / 2 + fontSize * 0.35);
        tCtx.textAlign = "left";
        if (clip.strokeWidth) {
          tCtx.strokeStyle = "#000000";
          tCtx.lineWidth = clip.strokeWidth;
          tCtx.strokeText(clip.text, crawlX, barY + barH / 2 + fontSize * 0.35);
        }
        tCtx.fillText(clip.text, crawlX, barY + barH / 2 + fontSize * 0.35);
        tCtx.restore();
      } else if (chy === "roll") {
        tCtx.save();
        const lines = clip.text ? clip.text.split("\n") : [];
        const is2Col = clip.rollAlign === "2col";
        const lineH = fontSize * 1.5;
        const headerH = clip.rollTitle ? 65 : 0;
        const totalH = headerH + lines.length * lineH;
        const prog = dur > 0 ? (globalSec - clip.start) / dur : 0;
        const startY = H + 25;
        const curY = startY - prog * (H + totalH + 50);

        if (clip.rollTitle) {
          const titleY = curY;
          if (titleY >= -40 && titleY <= H + 40) {
            tCtx.font = `900 ${fontSize + 4}px ${fontFace}`;
            tCtx.textAlign = "center";
            applyTextStyle(titleY);
            if (clip.strokeWidth) {
              tCtx.strokeStyle = "#000000";
              tCtx.lineWidth = clip.strokeWidth + 1;
              tCtx.strokeText(clip.rollTitle.toUpperCase(), W / 2, titleY);
            }
            tCtx.fillText(clip.rollTitle.toUpperCase(), W / 2, titleY);

            // Linha decorativa dourada abaixo do título
            tCtx.strokeStyle = "#FFE040";
            tCtx.lineWidth = 1.5;
            tCtx.beginPath();
            tCtx.moveTo(W / 2 - 120, titleY + 10);
            tCtx.lineTo(W / 2 + 120, titleY + 10);
            tCtx.stroke();
          }
        }

        lines.forEach((line, li) => {
          const ly = curY + headerH + li * lineH;
          if (ly >= -30 && ly <= H + 30) {
            if (is2Col && line.includes("|")) {
              const parts = line.split("|");
              const role = parts[0].trim().toUpperCase();
              const name = (parts[1] || "").trim().toUpperCase();

              // Coluna Esquerda (Cargo) alinhada à direita do centro
              tCtx.font = `bold ${Math.max(12, fontSize - 2)}px ${fontFace}`;
              tCtx.textAlign = "right";
              tCtx.fillStyle = "#CCCCCC";
              if (clip.strokeWidth) {
                tCtx.strokeStyle = "#000000";
                tCtx.lineWidth = clip.strokeWidth;
                tCtx.strokeText(role, W / 2 - 18, ly);
              }
              tCtx.fillText(role, W / 2 - 18, ly);

              // Coluna Direita (Nome) alinhada à esquerda do centro
              tCtx.font = `900 ${fontSize}px ${fontFace}`;
              tCtx.textAlign = "left";
              applyTextStyle(ly);
              if (clip.strokeWidth) {
                tCtx.strokeStyle = "#000000";
                tCtx.lineWidth = clip.strokeWidth;
                tCtx.strokeText(name, W / 2 + 18, ly);
              }
              tCtx.fillText(name, W / 2 + 18, ly);
            } else {
              tCtx.font = `bold ${fontSize}px ${fontFace}`;
              tCtx.textAlign = "center";
              applyTextStyle(ly);
              if (clip.strokeWidth) {
                tCtx.strokeStyle = "#000000";
                tCtx.lineWidth = clip.strokeWidth;
                tCtx.strokeText(line, W / 2, ly);
              }
              tCtx.fillText(line, W / 2, ly);
            }
          }
        });
        tCtx.restore();
      } else if (chy === "blink") {
        const isBlinkOn = Math.floor(localSec * 2.8) % 2 === 0;
        if (isBlinkOn) {
          tCtx.fillStyle = boxColor;
          tCtx.fillRect(48, H / 2 - 44, W - 96, 88);
          tCtx.strokeStyle = "#FFE040";
          tCtx.lineWidth = 2;
          tCtx.strokeRect(52, H / 2 - 40, W - 104, 80);
          tCtx.font = `bold ${fontSize}px ${fontFace}`;
          tCtx.textAlign = "center";
          applyTextStyle(H / 2 - 6);
          wrapCanvasText(tCtx, clip.text, W / 2, H / 2 - 6, W - 120, 26);
        }
      } else {
        tCtx.fillStyle = boxColor;
        tCtx.fillRect(48, H / 2 - 44, W - 96, 88);
        tCtx.strokeStyle = "#FFE040";
        tCtx.lineWidth = 2;
        tCtx.strokeRect(52, H / 2 - 40, W - 104, 80);
        tCtx.font = `bold ${fontSize}px ${fontFace}`;
        tCtx.textAlign = "center";
        applyTextStyle(H / 2 - 6);
        wrapCanvasText(tCtx, clip.text, W / 2, H / 2 - 6, W - 120, 26);
      }
    } else {
      drawSynthGenerator(tCtx, W, H, clip.synthType || "scene", localSec, clip.title);
    }
  }

  tCtx.filter = "none";

  // Correção de Cor: Temperatura Kelvin (Quente/Frio) & Tonalidade (Tint Verde/Magenta)
  const tempVal = Number(clip.temp) || 0;
  if (tempVal !== 0) {
    tCtx.save();
    tCtx.globalCompositeOperation = "color";
    tCtx.fillStyle = tempVal > 0 ? `rgba(255, 170, 45, ${Math.min(0.55, Math.abs(tempVal) / 160)})` : `rgba(45, 170, 255, ${Math.min(0.55, Math.abs(tempVal) / 160)})`;
    tCtx.fillRect(0, 0, W, H);
    tCtx.restore();
  }
  const tintVal = Number(clip.tint) || 0;
  if (tintVal !== 0) {
    tCtx.save();
    tCtx.globalCompositeOperation = "color";
    tCtx.fillStyle = tintVal > 0 ? `rgba(255, 60, 200, ${Math.min(0.55, Math.abs(tintVal) / 160)})` : `rgba(60, 255, 100, ${Math.min(0.55, Math.abs(tintVal) / 160)})`;
    tCtx.fillRect(0, 0, W, H);
    tCtx.restore();
  }

  // Colorimetria 3-Way Broadcast (Lift, Gamma, Gain)
  const c3w = S.color3Way;
  if (c3w) {
    if (c3w.gain && (c3w.gain.r !== 0 || c3w.gain.g !== 0 || c3w.gain.b !== 0)) {
      tCtx.save();
      tCtx.globalCompositeOperation = "color";
      const gr = Math.max(0, Math.min(255, 128 + c3w.gain.r * 2.5));
      const gg = Math.max(0, Math.min(255, 128 + c3w.gain.g * 2.5));
      const gb = Math.max(0, Math.min(255, 128 + c3w.gain.b * 2.5));
      tCtx.fillStyle = `rgba(${gr}, ${gg}, ${gb}, 0.28)`;
      tCtx.fillRect(0, 0, W, H);
      tCtx.restore();
    }
    if (c3w.lift && (c3w.lift.r !== 0 || c3w.lift.g !== 0 || c3w.lift.b !== 0)) {
      tCtx.save();
      tCtx.globalCompositeOperation = "multiply";
      const lr = Math.max(0, Math.min(255, 255 + c3w.lift.r * 2.5));
      const lg = Math.max(0, Math.min(255, 255 + c3w.lift.g * 2.5));
      const lb = Math.max(0, Math.min(255, 255 + c3w.lift.b * 2.5));
      tCtx.fillStyle = `rgba(${lr}, ${lg}, ${lb}, 0.32)`;
      tCtx.fillRect(0, 0, W, H);
      tCtx.restore();
    }
    if (c3w.gamma && (c3w.gamma.r !== 0 || c3w.gamma.g !== 0 || c3w.gamma.b !== 0)) {
      tCtx.save();
      tCtx.globalCompositeOperation = "overlay";
      const mr = Math.max(0, Math.min(255, 128 + c3w.gamma.r * 2.5));
      const mg = Math.max(0, Math.min(255, 128 + c3w.gamma.g * 2.5));
      const mb = Math.max(0, Math.min(255, 128 + c3w.gamma.b * 2.5));
      tCtx.fillStyle = `rgba(${mr}, ${mg}, ${mb}, 0.22)`;
      tCtx.fillRect(0, 0, W, H);
      tCtx.restore();
    }
  }

  // Processador de Efeitos em Pixels (Chroma Key & Suite MTV 1995: Mosaico, Posterização 8-bit, Solarização)
  const hasChroma = clip.chromaKey && (drewReal || clip.synthType || clip.text);
  const hasMtv = flt === "mosaic" || clip.mosaic || flt === "posterize" || clip.posterize || flt === "solarize" || clip.solarize;

  if (hasChroma || hasMtv) {
    try {
      const imgData = tCtx.getImageData(0, 0, W, H);
      const data = imgData.data;

      // 1. Chroma Key 1995 (Blue/Green Screen com Alpha e Despill)
      if (hasChroma) {
        const tol = Math.max(5, Math.min(95, Number(clip.chromaTol) || 35)) / 100;
        const threshold = Math.max(0, Math.min(80, Number(clip.chromaThreshold) || 15)) / 100;
        const despill = Math.max(0, Math.min(100, Number(clip.chromaSpill == null ? 60 : clip.chromaSpill))) / 100;
        const isAlphaPreview = !!clip.previewAlpha;

        let keyR = 0, keyG = 255, keyB = 0;
        if (clip.chromaColor === "blue") {
          keyR = 0; keyG = 0; keyB = 255;
        } else if (clip.chromaColor === "black") {
          keyR = 0; keyG = 0; keyB = 0;
        } else if (clip.chromaColor === "white") {
          keyR = 255; keyG = 255; keyB = 255;
        } else if (clip.chromaColor && clip.chromaColor.startsWith("#") && clip.chromaColor.length >= 7) {
          keyR = parseInt(clip.chromaColor.slice(1, 3), 16) || 0;
          keyG = parseInt(clip.chromaColor.slice(3, 5), 16) || 0;
          keyB = parseInt(clip.chromaColor.slice(5, 7), 16) || 0;
        }

        const isGreenKey = (clip.chromaColor === "green" || (!clip.chromaColor && keyG > keyR && keyG > keyB));
        const isBlueKey = (clip.chromaColor === "blue" || (keyB > keyR && keyB > keyG));

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a === 0) continue;

          let mask = 1.0;
          if (isGreenKey) {
            const excess = (g - Math.max(r, b)) / 255;
            if (excess > threshold) {
              mask = Math.max(0, 1 - (excess - threshold) / Math.max(0.01, tol));
            }
            if (despill > 0 && mask < 0.95) {
              data[i + 1] = Math.round(g * (1 - despill) + Math.max(r, b) * despill);
            }
          } else if (isBlueKey) {
            const excess = (b - Math.max(r, g)) / 255;
            if (excess > threshold) {
              mask = Math.max(0, 1 - (excess - threshold) / Math.max(0.01, tol));
            }
            if (despill > 0 && mask < 0.95) {
              data[i + 2] = Math.round(b * (1 - despill) + Math.max(r, g) * despill);
            }
          } else {
            const dr = (r - keyR) / 255;
            const dg = (g - keyG) / 255;
            const db = (b - keyB) / 255;
            const dist = Math.sqrt(dr * dr + dg * dg + db * db) / 1.732;
            if (dist < threshold + tol) {
              mask = Math.max(0, Math.min(1, (dist - threshold) / Math.max(0.01, tol)));
            }
          }

          if (isAlphaPreview) {
            const lum = Math.round(mask * 255);
            data[i] = lum;
            data[i + 1] = lum;
            data[i + 2] = lum;
            data[i + 3] = 255;
          } else {
            data[i + 3] = Math.round(a * mask);
          }
        }
      }

      // 2. Mosaico de Censura MTV 1995 (Pixelização)
      if (flt === "mosaic" || clip.mosaic) {
        const bs = Math.max(4, Math.min(64, Number(clip.mosaicBlockSize) || 16));
        for (let by = 0; by < H; by += bs) {
          for (let bx = 0; bx < W; bx += bs) {
            const cx = Math.min(W - 1, bx + Math.floor(bs / 2));
            const cy = Math.min(H - 1, by + Math.floor(bs / 2));
            const cIdx = (cy * W + cx) * 4;
            const br = data[cIdx], bg = data[cIdx + 1], bb = data[cIdx + 2], ba = data[cIdx + 3];

            for (let dy = 0; dy < bs && by + dy < H; dy++) {
              for (let dx = 0; dx < bs && bx + dx < W; dx++) {
                const idx = ((by + dy) * W + (bx + dx)) * 4;
                data[idx] = br;
                data[idx + 1] = bg;
                data[idx + 2] = bb;
                data[idx + 3] = ba;
              }
            }
          }
        }
      }

      // 3. Posterização 8-bit (Quantização de Cores)
      if (flt === "posterize" || clip.posterize) {
        const levels = Math.max(2, Math.min(16, Number(clip.posterizeLevels) || 6));
        const step = 255 / (levels - 1);
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.round(data[i] / step) * step;
          data[i + 1] = Math.round(data[i + 1] / step) * step;
          data[i + 2] = Math.round(data[i + 2] / step) * step;
        }
      }

      // 4. Solarização Sabattier 1995
      if (flt === "solarize" || clip.solarize) {
        const threshold = Math.max(20, Math.min(235, Number(clip.solarizeThreshold) || 128));
        for (let i = 0; i < data.length; i += 4) {
          const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          if (luma > threshold) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }
        }
      }

      tCtx.putImageData(imgData, 0, 0);
    } catch (_e) {}
  }

  tCtx.filter = "none";

  // Sobreposições de Filtro Clássico Anos 90
  if (flt === "vhs") {
    const barY = ((Date.now() / 16) % H) | 0;
    tCtx.fillStyle = "rgba(255, 255, 255, 0.14)";
    tCtx.fillRect(0, barY, W, 6);
    tCtx.fillStyle = "#FFFFFF";
    tCtx.font = "24px 'VT323', monospace";
    tCtx.textAlign = "left";
    tCtx.fillText("PLAY ►  VHS HQ", 26, 42);
    tCtx.fillText("NOV 1995", 26, H - 24);
  } else if (flt === "16mm") {
    tCtx.fillStyle = "rgba(255, 225, 170, 0.06)";
    tCtx.fillRect(0, 0, W, H);
    for (let i = 0; i < 36; i++) {
      tCtx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.28)";
      tCtx.fillRect((Math.random() * W) | 0, (Math.random() * H) | 0, 2, 2);
    }
  } else if (flt === "noturno") {
    tCtx.fillStyle = "rgba(0, 180, 90, 0.24)";
    tCtx.fillRect(0, 0, W, H);
  } else if (flt === "vignette") {
    const vg = tCtx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.32, W / 2, H / 2, Math.hypot(W / 2, H / 2));
    vg.addColorStop(0, "rgba(0, 0, 0, 0)");
    vg.addColorStop(0.7, "rgba(0, 0, 0, 0.35)");
    vg.addColorStop(1, "rgba(0, 0, 0, 0.85)");
    tCtx.fillStyle = vg;
    tCtx.fillRect(0, 0, W, H);
  } else if (flt === "glow") {
    tCtx.save();
    tCtx.globalCompositeOperation = "screen";
    tCtx.fillStyle = "rgba(255, 225, 175, 0.22)";
    tCtx.fillRect(0, 0, W, H);
    tCtx.restore();
  } else if (flt === "duotone") {
    tCtx.save();
    tCtx.globalCompositeOperation = "color";
    tCtx.fillStyle = "rgba(0, 180, 220, 0.40)";
    tCtx.fillRect(0, 0, W, H);
    tCtx.globalCompositeOperation = "hard-light";
    tCtx.fillStyle = "rgba(255, 175, 40, 0.30)";
    tCtx.fillRect(0, 0, W, H);
    tCtx.restore();
  } else if (flt === "filmborder") {
    tCtx.fillStyle = "#0A0A0A";
    tCtx.fillRect(0, 0, W, 24);
    tCtx.fillRect(0, H - 24, W, 24);
    tCtx.fillStyle = "#E8E8E8";
    for (let x = 10; x < W; x += 32) {
      tCtx.fillRect(x, 5, 14, 14);
      tCtx.fillRect(x, H - 19, 14, 14);
    }
  }

  if (flt === "tv95" || flt === "vhs" || flt === "16mm") {
    tCtx.fillStyle = "rgba(0, 0, 0, 0.15)";
    for (let y = 0; y < H; y += 3) tCtx.fillRect(0, y, W, 1);
  }

  // Moldura 3D Chanfrada de Quadro (Beveled Picture-in-Picture 1995)
  if (clip.dve3dBevel) {
    draw3DBevelBorder(tCtx, W, H, 8);
  }

  // Efeito Anáglifo Estereoscópico 3D (Óculos Vermelho/Azul 1995)
  if (clip.anaglyph3D) {
    draw3DAnaglyphSplit(tCtx, W, H, 8);
  }

  // Linhas de Varredura Tubo CRT Trinitron (Scanlines 60Hz)
  if (clip.scanlinesCRT) {
    drawCRTScanlines(tCtx, W, H);
  }

  // Ruído de Cabeçote de Fita VHS (Head Switching Noise)
  if (clip.vhsGlitch) {
    drawVHSHeadGlitch(tCtx, W, H);
  }

  // Efeito Virada de Página 3D (3D Page Peel 1995)
  if (mot === "3d_page_peel") {
    draw3DPagePeelOverlay(tCtx, W, H, elapsed);
  }

  tCtx.restore();
}

/* ---------- Compositor Principal do Monitor de Programa (Multi-Faixas V1..Vn e A1..An!) ---------- */
function getActiveClipsAt(sec) {
  const findAllIn = arr => (arr || []).filter(c => !c.disabled && sec >= c.start && sec < c.start + c.dur);
  const anySolo = S.audioTracks.some(tk => S.tracksSolo[tk]);

  const videoList = [];
  for (const tk of getVideoTracksBottomUp()) {
    if (S.tracksMuted[tk]) continue;
    const found = findAllIn(S.clips[tk]);
    if (found.length) videoList.push(found[found.length - 1]);
  }

  const audioList = [];
  for (const tk of S.audioTracks) {
    const allowed = !S.tracksMuted[tk] && (!anySolo || S.tracksSolo[tk]);
    if (!allowed) continue;
    const found = findAllIn(S.clips[tk]);
    if (found.length) audioList.push(found[found.length - 1]);
  }

  return {
    videoList,
    audioList,
    v1: videoList.find(c => c.track === "v1") || null,
    v2: videoList.find(c => c.track !== "v1") || null,
    a1: audioList.find(c => c.track === "a1") || audioList[0] || null,
    a2: audioList.find(c => c.track !== "a1") || null
  };
}

function getSelectedVisualClipAtPlayhead() {
  const active = getActiveClipsAt(S.playhead);
  const sel = getSelectedClip();
  if (sel && isVideoTrack(sel.track) && S.playhead >= sel.start && S.playhead < sel.start + sel.dur) {
    return sel;
  }
  return active.videoList.length ? active.videoList[active.videoList.length - 1] : null;
}

function getHandlePositionsLocal(bw, bh) {
  const hw = bw / 2, hh = bh / 2;
  return {
    nw: [-hw, -hh],
    n:  [0, -hh],
    ne: [hw, -hh],
    e:  [hw, 0],
    se: [hw, hh],
    s:  [0, hh],
    sw: [-hw, hh],
    w:  [-hw, 0],
    rot: [0, -hh - 22]
  };
}

function drawTransformHandlesOverlay(ctx, W, H, clip) {
  if (!clip || S.playing) return;
  const tf = getClipTransformAt(clip, S.playhead);
  const bw = Math.max(24, W * (tf.scaleX / 100));
  const bh = Math.max(24, H * (tf.scaleY / 100));
  const cx = W / 2 + tf.posX;
  const cy = H / 2 + tf.posY;
  const rotRad = (tf.rotation * Math.PI) / 180;

  ctx.save();
  ctx.translate(cx, cy);
  if (rotRad) ctx.rotate(rotRad);

  // Moldura tracejada estilo Adobe Premiere Motion / Direct Manipulation
  ctx.strokeStyle = "#00E5FF";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
  ctx.setLineDash([]);

  // Linha e pino de rotação no topo
  ctx.strokeStyle = "#FFE040";
  ctx.beginPath();
  ctx.moveTo(0, -bh / 2);
  ctx.lineTo(0, -bh / 2 - 22);
  ctx.stroke();

  // Cruz central de ponto de ancoragem
  ctx.strokeStyle = "rgba(255, 224, 64, 0.85)";
  ctx.beginPath();
  ctx.moveTo(-7, 0); ctx.lineTo(7, 0);
  ctx.moveTo(0, -7); ctx.lineTo(0, 7);
  ctx.stroke();

  // 8 Alças quadradas de redimensionamento + 1 circular de rotação
  const handles = getHandlePositionsLocal(bw, bh);
  for (const [key, [hx, hy]] of Object.entries(handles)) {
    if (key === "rot") {
      ctx.fillStyle = "#FFE040";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, hy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#003880";
      ctx.lineWidth = 1.5;
      ctx.fillRect(hx - 4.5, hy - 4.5, 9, 9);
      ctx.strokeRect(hx - 4.5, hy - 4.5, 9, 9);
    }
  }

  // Etiqueta de dimensões na base da caixa
  const infoTxt = `[${clip.track.toUpperCase()}] ${clip.title.slice(0, 16)} · ${Math.round(tf.scaleX)}%×${Math.round(tf.scaleY)}% · X:${Math.round(tf.posX)} Y:${Math.round(tf.posY)}${tf.rotation ? ` · ${Math.round(tf.rotation)}°` : ""}`;
  ctx.font = "13px 'VT323', monospace";
  const tw = Math.min(bw, ctx.measureText(infoTxt).width + 12);
  ctx.fillStyle = "rgba(0, 24, 56, 0.82)";
  ctx.fillRect(-tw / 2, bh / 2 - 18, tw, 16);
  ctx.fillStyle = "#9FD8FF";
  ctx.textAlign = "center";
  ctx.fillText(infoTxt, 0, bh / 2 - 5);

  ctx.restore();
}

/* ---------- Suite Analógica VHS & Betacam SP 95 (Processador DSP) ---------- */
function applyAnalogTapeEffects(ctx, W, H) {
  const vhs = (typeof S !== "undefined" && S.vhsSettings) ? S.vhsSettings : null;
  if (!vhs || !vhs.enabled) return;

  const now = Date.now();

  // 1. Curvatura e Distorção de Sincronismo Horizontal (Flag Waving / H-Sync Tear no topo da imagem)
  if (vhs.hSyncTear > 0) {
    const tearLines = Math.min(50, Math.floor(vhs.hSyncTear * 4.8));
    for (let y = 0; y < tearLines; y++) {
      const depth = 1 - (y / tearLines);
      const waveShift = Math.sin((y * 0.28) + (now * 0.016)) * vhs.hSyncTear * 3.6 * (depth * depth);
      ctx.drawImage(ctx.canvas, 0, y, W, 1, waveShift, y, W, 1);
    }
  }

  // 2. Desvio de Tracking / Jitter Horizontal
  if (vhs.trackingJitter > 0) {
    const jitterMag = vhs.trackingJitter * 0.8;
    const numBands = Math.floor(vhs.trackingJitter);
    for (let i = 0; i < numBands; i++) {
      if (Math.random() < 0.6) {
        const bandY = Math.floor(Math.random() * (H - 20));
        const bandH = Math.floor(2 + Math.random() * 8);
        const shift = (Math.random() - 0.5) * jitterMag * 4;
        ctx.drawImage(ctx.canvas, 0, bandY, W, bandH, shift, bandY, W, bandH);
      }
    }
  }

  // 3. Barra Móvel de Desajuste de Tracking VHS (Tracking Error Bar)
  if (vhs.trackingError > 0) {
    const barHeight = Math.max(14, Math.floor(vhs.trackingError * 6.5));
    const cyclePeriod = H + barHeight * 2;
    const barY = Math.floor((now * 0.045) % cyclePeriod) - barHeight;

    if (barY + barHeight > 0 && barY < H) {
      const clampedY = Math.max(0, barY);
      const clampedH = Math.min(H - clampedY, barHeight - (clampedY - barY));
      if (clampedH > 0) {
        for (let y = clampedY; y < clampedY + clampedH; y++) {
          const shift = (Math.random() - 0.5) * vhs.trackingError * 5.5;
          ctx.drawImage(ctx.canvas, 0, y, W, 1, shift, y, W, 1);
          if (Math.random() < 0.65) {
            ctx.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,0.75)" : "rgba(10,10,10,0.85)";
            const sw = Math.random() * W * 0.5;
            const sx = Math.random() * (W - sw);
            ctx.fillRect(sx, y, sw, 1);
          }
        }
      }
    }
  }

  // 4. Interferência de Rádio-Frequência RF / VHF / UHF (Linhas Diagonais Herringbone e Chuvisco)
  if (vhs.rfNoise > 0) {
    ctx.save();
    const rfAlpha = Math.min(0.35, vhs.rfNoise * 0.035);
    ctx.fillStyle = `rgba(255, 255, 255, ${rfAlpha})`;
    const phase = (now * 0.04) % 20;
    for (let y = 0; y < H; y += 3) {
      const xOffset = ((y * 1.6) + phase) % 18;
      if (Math.random() < 0.5) {
        ctx.fillRect(xOffset, y, W, 1);
      }
    }
    const rfDots = Math.floor(vhs.rfNoise * 30);
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    for (let i = 0; i < rfDots; i++) {
      ctx.fillRect(Math.random() * W, Math.random() * H, 2, 1);
    }
    ctx.restore();
  }

  // 5. Desalinhamento e Sangramento de Croma (Chroma Bleed / Sub-amostragem VHS)
  if (vhs.chromaBleed > 0) {
    const shiftX = Math.round(vhs.chromaBleed * 0.9);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.14;
    ctx.drawImage(ctx.canvas, shiftX, 0);
    ctx.restore();
  }

  // 6. Dropouts de Óxido de Fita Magnética (White streaks / flecks)
  if (vhs.dropouts > 0) {
    const numDrops = Math.floor(vhs.dropouts * 1.5);
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    for (let d = 0; d < numDrops; d++) {
      if (Math.random() < 0.7) {
        const dropY = Math.floor(Math.random() * H);
        const dropX = Math.floor(Math.random() * (W - 30));
        const dropW = Math.floor(4 + Math.random() * 18 * (vhs.dropouts / 5));
        ctx.fillRect(dropX, dropY, dropW, 1.2);
      }
    }
  }

  // 7. Ruído de Cabeçote Inferior (Head Switching Noise na borda inferior do CRT)
  if (vhs.headSwitching > 0) {
    const headLines = Math.max(4, Math.min(22, Math.round(vhs.headSwitching * 1.2)));
    const startY = H - headLines;
    for (let y = startY; y < H; y++) {
      const lineProg = (y - startY) / headLines;
      const wave = Math.sin(y * 4.2 + now * 0.03) * 14 * lineProg;
      const noiseShift = wave + (Math.random() - 0.5) * 8;
      ctx.drawImage(ctx.canvas, 0, y, W, 1, noiseShift, y, W, 1);
      if (Math.random() < 0.5 + lineProg * 0.4) {
        ctx.fillStyle = Math.random() < 0.3 ? "rgba(255,255,255,0.4)" : (Math.random() < 0.5 ? "rgba(0,0,0,0.6)" : "rgba(0,255,180,0.2)");
        const segW = Math.random() * W * 0.4;
        const segX = Math.random() * (W - segW);
        ctx.fillRect(segX, y, segW, 1);
      }
    }
  }

  // 8. Linhas de Varredura CRT (Scanlines 15kHz)
  if (vhs.scanlines) {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
    for (let y = 0; y < H; y += 2) {
      ctx.fillRect(0, y, W, 1);
    }
    ctx.restore();
  }

  // 9. Granulação e Hiss Magnético de Fita
  if (vhs.tapeHiss > 0) {
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${0.02 * vhs.tapeHiss})`;
    const grainStep = 4;
    for (let gx = 0; gx < W; gx += grainStep * 2) {
      for (let gy = 0; gy < H; gy += grainStep * 2) {
        if (Math.random() < 0.4) {
          ctx.fillRect(gx + Math.random() * grainStep, gy + Math.random() * grainStep, 1.5, 1.5);
        }
      }
    }
    ctx.restore();
  }
}

function renderMonitorFrame() {
  const cv = document.getElementById("vCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const W = cv.width, H = cv.height;

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, W, H);

  const active = getActiveClipsAt(S.playhead);
  const v1 = active.v1;

  // 1. Renderiza Faixa V1 com suporte a Transições de Entrada (Dissolve, Fade, Wipe, Iris, Push)
  if (v1) {
    const elapsedInClip = S.playhead - v1.start;
    const tDur = Math.max(0.2, Number(v1.transDur) || 1.2);
    const trans = v1.trans || "Corte Seco";

    if (trans !== "Corte Seco" && elapsedInClip >= 0 && elapsedInClip < tDur) {
      const p = Math.max(0, Math.min(1, elapsedInClip / tDur));
      const prevClip = (S.clips.v1 || []).find(c => c.id !== v1.id && Math.abs((c.start + c.dur) - v1.start) < 1.5);

      if (trans.startsWith("Fusão")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        offCtx.clearRect(0, 0, W, H);
        drawSingleClipToContext(offCtx, W, H, v1, S.playhead);
        ctx.save();
        ctx.globalAlpha = p;
        ctx.drawImage(offCanvas, 0, 0);
        ctx.restore();
      } else if (trans.startsWith("Fade do Preto")) {
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.fillStyle = `rgba(0, 0, 0, ${1 - p})`;
        ctx.fillRect(0, 0, W, H);
      } else if (trans.startsWith("Fade do Branco")) {
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - p})`;
        ctx.fillRect(0, 0, W, H);
      } else if (trans.startsWith("Cortina Horizontal")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W * p, H);
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Cortina Vertical")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, H * p);
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Íris Circular")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        const maxR = Math.hypot(W / 2, H / 2);
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, maxR * p, 0, Math.PI * 2);
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Cortina Diagonal")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        const d = (W + H) * p;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.min(W, d), 0);
        if (d > W) ctx.lineTo(W, d - W);
        ctx.lineTo(Math.max(0, d - H), Math.min(H, d));
        ctx.lineTo(0, Math.min(H, d));
        ctx.closePath();
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Porta Dupla")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        const wHalf = (W / 2) * p;
        ctx.beginPath();
        ctx.rect(W / 2 - wHalf, 0, wHalf * 2, H);
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Veneziana")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        const slats = 10;
        const slatH = H / slats;
        for (let s = 0; s < slats; s++) {
          ctx.rect(0, s * slatH, W, slatH * p);
        }
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Empurrar Horizontal")) {
        const shift = W * p;
        ctx.save();
        if (prevClip) {
          ctx.save();
          ctx.translate(-shift, 0);
          drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
          ctx.restore();
        }
        ctx.save();
        ctx.translate(W - shift, 0);
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
        ctx.restore();
      } else if (trans.startsWith("Empurrar Vertical")) {
        const shift = H * p;
        ctx.save();
        if (prevClip) {
          ctx.save();
          ctx.translate(0, shift);
          drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
          ctx.restore();
        }
        ctx.save();
        ctx.translate(0, -H + shift);
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
        ctx.restore();
      } else if (trans.startsWith("Zoom Dissolve")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.globalAlpha = p;
        const scl = 0.5 + p * 0.5;
        ctx.translate(W / 2, H / 2);
        ctx.scale(scl, scl);
        ctx.translate(-W / 2, -H / 2);
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Strobe")) {
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        if (p < 0.4) {
          const flash = (Math.sin(p * Math.PI * 14) + 1) / 2;
          ctx.fillStyle = `rgba(255, 255, 255, ${flash * (1 - p / 0.4)})`;
          ctx.fillRect(0, 0, W, H);
        }
      } else if (trans.startsWith("Xadrez")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        const cols = 12, rows = 9;
        const cw = W / cols, ch = H / rows;
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const progOffset = ((c + r) % 2 === 0) ? p * 1.5 : Math.max(0, (p - 0.25) * 1.33);
            const curScale = Math.min(1, progOffset);
            if (curScale > 0) {
              ctx.rect(c * cw + (cw * (1 - curScale)) / 2, r * ch + (ch * (1 - curScale)) / 2, cw * curScale, ch * curScale);
            }
          }
        }
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Cubo 3D") || trans.startsWith("Cube Spin")) {
        // Giro espacial de Cubo 3D 1995 (Face A gira de 0° a -90°, Face B gira de +90° a 0°)
        ctx.fillStyle = "#040810";
        ctx.fillRect(0, 0, W, H);
        if (p < 0.5) {
          if (prevClip) {
            const ang = p * Math.PI;
            ctx.save();
            ctx.translate(W / 2, H / 2);
            const scaleX = Math.cos(ang);
            ctx.scale(Math.max(0.02, scaleX), 1 - p * 0.25);
            ctx.translate(-W / 2, -H / 2);
            drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
            ctx.fillStyle = `rgba(0, 0, 0, ${p * 1.6})`;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();
          }
        } else {
          const inAng = (1 - p) * Math.PI;
          ctx.save();
          ctx.translate(W / 2, H / 2);
          const scaleX = Math.cos(inAng);
          ctx.scale(Math.max(0.02, scaleX), 0.75 + (p - 0.5) * 0.5);
          ctx.translate(-W / 2, -H / 2);
          drawSingleClipToContext(ctx, W, H, v1, S.playhead);
          ctx.fillStyle = `rgba(0, 0, 0, ${(1 - p) * 1.6})`;
          ctx.fillRect(0, 0, W, H);
          ctx.restore();
        }
      } else if (trans.startsWith("Mosaico Explosivo") || trans.startsWith("Block Dissolve")) {
        // Desintegração de Bloco DVE 1995 (Hardware 16x16 Pixel Blocks)
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        const bCols = 20, bRows = 15;
        const bw = W / bCols, bh = H / bRows;
        ctx.beginPath();
        for (let r = 0; r < bRows; r++) {
          for (let c = 0; c < bCols; c++) {
            const hash = (((c * 73 + r * 97) % 100) + ((c * 17) ^ (r * 23))) % 100 / 100;
            if (hash <= p) {
              ctx.rect(c * bw, r * bh, bw, bh);
            }
          }
        }
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Virada de Página") || trans.startsWith("Page Peel")) {
        if (prevClip) {
          drawSingleClipToContext(ctx, W, H, v1, S.playhead);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(W, 0);
          ctx.lineTo(W, Math.max(0, H - (1 - p) * H * 1.5));
          ctx.lineTo(Math.max(0, W - (1 - p) * W * 1.5), H);
          ctx.lineTo(0, H);
          ctx.closePath();
          ctx.clip();
          drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
          const grad = ctx.createLinearGradient(W - (1 - p) * W * 1.5, H, W, Math.max(0, H - (1 - p) * H * 1.5));
          grad.addColorStop(0, "rgba(220, 220, 220, 0.95)");
          grad.addColorStop(0.3, "rgba(160, 160, 160, 0.7)");
          grad.addColorStop(1, "rgba(0, 0, 0, 0.4)");
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        } else {
          drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        }
      } else if (trans.startsWith("Varredura de Relógio") || trans.startsWith("Clock Wipe")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(W / 2, H / 2);
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + p * Math.PI * 2;
        ctx.arc(W / 2, H / 2, Math.hypot(W, H), startAngle, endAngle, false);
        ctx.closePath();
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Íris Diamante") || trans.startsWith("Iris Diamond")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        const maxDim = (W + H) * p;
        ctx.moveTo(W / 2, H / 2 - maxDim / 2);
        ctx.lineTo(W / 2 + maxDim / 2, H / 2);
        ctx.lineTo(W / 2, H / 2 + maxDim / 2);
        ctx.lineTo(W / 2 - maxDim / 2, H / 2);
        ctx.closePath();
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Persianas Verticais")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        ctx.beginPath();
        const slats = 12;
        const slatW = W / slats;
        for (let s = 0; s < slats; s++) {
          ctx.rect(s * slatW, 0, slatW * p, H);
        }
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else if (trans.startsWith("Íris")) {
        if (prevClip) drawSingleClipToContext(ctx, W, H, prevClip, prevClip.start + prevClip.dur - 0.05);
        ctx.save();
        const rw = W * p, rh = H * p;
        ctx.beginPath();
        ctx.rect((W - rw) / 2, (H - rh) / 2, rw, rh);
        ctx.clip();
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
        ctx.restore();
      } else {
        drawSingleClipToContext(ctx, W, H, v1, S.playhead);
      }
    } else {
      drawSingleClipToContext(ctx, W, H, v1, S.playhead);
    }
  }

  // 2. Renderiza todas as Faixas de Superposição (V2, V3, V4, V5... de baixo para cima!)
  for (const ovClip of active.videoList) {
    if (ovClip.track === "v1") continue;
    drawSingleClipToContext(ctx, W, H, ovClip, S.playhead);
  }

  // 2.1. Aplica Suite Analógica VHS / Betacam SP 95 no fluxo de vídeo
  applyAnalogTapeEffects(ctx, W, H);

  // 3. Faixas de Áudio: Legendas / Closed Caption Linha 21
  const ccClip = active.audioList.find(c => c && c.text);
  if (prefs.cc && ccClip) {
    const subText = ccClip.speaker ? `${ccClip.speaker}: ${ccClip.text}` : ccClip.text;
    ctx.fillStyle = "rgba(0, 0, 0, 0.84)";
    ctx.fillRect(36, H - 78, W - 72, 48);
    ctx.fillStyle = "#FFFF55";
    ctx.font = "bold 16px 'Courier New', monospace";
    ctx.textAlign = "center";
    wrapCanvasText(ctx, subText, W / 2, H - 56, W - 92, 19);
  }

  // Se estiver exportando sem Burn-in de Timecode, captura o quadro limpo antes das guias do monitor
  if (typeof S._exportFrameHook === "function" && !S._exportBurnTC) {
    S._exportFrameHook(cv);
  }

  // 4. Grade de Segurança de TV (Action Safe 90% / Title Safe 80%)
  if (prefs.safeArea) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 1;
    ctx.strokeRect(W * 0.05, H * 0.05, W * 0.9, H * 0.9);
    ctx.strokeStyle = "rgba(255, 224, 64, 0.28)";
    ctx.strokeRect(W * 0.1, H * 0.1, W * 0.8, H * 0.8);
  }

  // 5. Alças de Redimensionamento e Movimento Direto no Monitor (quando pausado)
  if (prefs.transformOverlay && !S.playing) {
    const targetClip = getSelectedVisualClipAtPlayhead();
    if (targetClip) {
      drawTransformHandlesOverlay(ctx, W, H, targetClip);
    }
  }

  // 6. Tarja discreta de Timecode no topo do CRT
  ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
  ctx.fillRect(12, 10, 185, 22);
  ctx.fillStyle = "#00FF66";
  ctx.font = "16px 'VT323', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`TCR ${fmtSMPTE(S.playhead)}`, 18, 25);

  // 7. Window Dub de Timecode Broadcast Avançado (TCR, TCO, Frames, Countdown)
  drawWindowDubOverlay(ctx, W, H, false);

  if (typeof S._exportFrameHook === "function" && S._exportBurnTC) {
    S._exportFrameHook(cv);
  }
  syncDetachedWindows();
  renderBroadcastScopes(cv);
  if (prefs.monLayout === "multicam") renderMulticamFrames();
}

function drawWindowDubOverlay(ctx, W, H, isExport = false) {
  const wd = prefs.windowDub;
  if (!wd || (!wd.enabled && !isExport)) return;
  if (isExport && (!wd || !wd.burnExport)) return;

  const mode = wd.mode || "master";
  const pos = wd.pos || "bottom-center";
  const scale = W / 640;
  const fontSize = Math.max(12, Math.round((wd.size || 22) * scale));
  const activeClips = getActiveClipsAt(S.playhead);
  const activeV1 = activeClips.v1;
  const srcSec = activeV1 ? Math.max(0, (S.playhead - activeV1.start) * (activeV1.speed || 1) + (activeV1.inPoint || 0)) : S.playhead;

  let text = "";
  if (mode === "master") {
    text = `TCR ${fmtSMPTE(S.playhead)}`;
  } else if (mode === "source") {
    text = `TCO ${fmtSMPTE(srcSec)}`;
  } else if (mode === "both") {
    text = `TCR ${fmtSMPTE(S.playhead)}  TCO ${fmtSMPTE(srcSec)}`;
  } else if (mode === "frames") {
    const fnum = Math.floor(S.playhead * FPS).toString().padStart(6, "0");
    text = `FRM ${fnum} (${FPS} FPS)`;
  } else if (mode === "countdown") {
    const left = Math.max(0, S.totalDur - S.playhead);
    text = `REM -${fmtSMPTE(left)}`;
  }

  ctx.save();
  ctx.font = `bold ${fontSize}px 'VT323', 'Courier New', monospace`;
  const padX = Math.round(fontSize * 0.55);
  const padY = Math.round(fontSize * 0.28);
  const metrics = ctx.measureText(text);
  const boxW = metrics.width + padX * 2;
  const boxH = fontSize + padY * 2;
  const margin = Math.round(18 * scale);

  let bx = (W - boxW) / 2;
  let by = H - boxH - margin;

  if (pos === "bottom-left") {
    bx = margin;
    by = H - boxH - margin;
  } else if (pos === "bottom-right") {
    bx = W - boxW - margin;
    by = H - boxH - margin;
  } else if (pos === "top-center") {
    bx = (W - boxW) / 2;
    by = margin;
  } else if (pos === "top-left") {
    bx = margin;
    by = margin;
  } else if (pos === "top-right") {
    bx = W - boxW - margin;
    by = margin;
  }

  const alpha = Math.max(0, Math.min(1, (wd.opacity == null ? 85 : wd.opacity) / 100));
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  ctx.fillRect(bx, by, boxW, boxH);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = Math.max(1, Math.round(1.2 * scale));
  ctx.strokeRect(bx, by, boxW, boxH);

  ctx.fillStyle = "#FFE040"; // SMPTE Yellow
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, bx + boxW / 2, by + boxH / 2);
  ctx.restore();
}

/* ---------- Monitores Técnicos Broadcast: Vectorscope UV & Waveform IRE (Tektronix 1995) ---------- */
function renderBroadcastScopes(cv) {
  const scopeCv = document.getElementById("scopeCanvas");
  if (!scopeCv || !cv) return;
  const mode = prefs.scopeMode || "video";

  if (mode === "video") {
    scopeCv.style.display = "none";
    cv.style.display = "block";
    return;
  }

  scopeCv.style.display = "block";
  const sCtx = scopeCv.getContext("2d");
  const W = scopeCv.width = cv.width || 640;
  const H = scopeCv.height = cv.height || 480;

  if (mode === "split") {
    // Modo Dividido: Vídeo Master à esquerda + Waveform IRE à direita
    cv.style.display = "none";
    sCtx.fillStyle = "#040b06";
    sCtx.fillRect(0, 0, W, H);
    sCtx.drawImage(cv, 0, 0, W / 2, H);
    sCtx.strokeStyle = "#408040";
    sCtx.lineWidth = 1;
    sCtx.beginPath();
    sCtx.moveTo(W / 2, 0);
    sCtx.lineTo(W / 2, H);
    sCtx.stroke();
    drawWaveformToContext(sCtx, cv, W / 2, 0, W / 2, H);
  } else if (mode === "waveform") {
    cv.style.display = "none";
    sCtx.fillStyle = "#040c06";
    sCtx.fillRect(0, 0, W, H);
    drawWaveformToContext(sCtx, cv, 0, 0, W, H);
  } else if (mode === "vectorscope") {
    cv.style.display = "none";
    sCtx.fillStyle = "#030a05";
    sCtx.fillRect(0, 0, W, H);
    drawVectorscopeToContext(sCtx, cv, 0, 0, W, H);
  }
}

function drawWaveformToContext(ctx, srcCv, ox, oy, w, h) {
  const lineY = (ire) => oy + h * 0.90 - (ire / 120) * (h * 0.78);

  // Grade de fósforo verde
  ctx.strokeStyle = "rgba(0, 255, 100, 0.22)";
  ctx.lineWidth = 1;
  const ires = [100, 80, 50, 20, 7.5, 0];
  ires.forEach(ire => {
    const y = lineY(ire);
    ctx.beginPath();
    ctx.setLineDash(ire === 7.5 ? [4, 4] : (ire === 100 || ire === 0 ? [] : [2, 4]));
    ctx.strokeStyle = ire === 7.5 ? "rgba(255, 170, 0, 0.55)" : "rgba(0, 255, 100, 0.25)";
    ctx.moveTo(ox, y);
    ctx.lineTo(ox + w, y);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // Rótulos IRE
  ctx.fillStyle = "#00FF66";
  ctx.font = "10px 'VT323', monospace";
  ctx.fillText("100 IRE", ox + 8, lineY(100) - 3);
  ctx.fillText("50", ox + 8, lineY(50) - 3);
  ctx.fillStyle = "#FFAA00";
  ctx.fillText("7.5 PED", ox + 8, lineY(7.5) - 3);
  ctx.fillStyle = "#00FF66";
  ctx.fillText("0 IRE", ox + 8, lineY(0) + 9);

  // Amostragem de luminância rápida em tempo real (1 a cada 3 pixels)
  try {
    const imgData = srcCv.getContext("2d").getImageData(0, 0, srcCv.width, srcCv.height);
    const data = imgData.data;
    const sw = srcCv.width, sh = srcCv.height;
    ctx.fillStyle = "rgba(0, 255, 120, 0.18)";
    for (let x = 0; x < sw; x += 3) {
      const targetX = ox + Math.round((x / sw) * w);
      for (let y = 0; y < sh; y += 4) {
        const idx = (y * sw + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        const ire = (luma / 255) * 100;
        const targetY = lineY(ire);
        ctx.fillRect(targetX, targetY, 1.4, 1.4);
      }
    }
  } catch (_e) {}

  // Título e borda CRT
  ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
  ctx.fillRect(ox + w - 195, oy + 8, 187, 18);
  ctx.fillStyle = "#00FF66";
  ctx.font = "11px 'Courier New', monospace";
  ctx.fillText("WAVEFORM IRE · TEK 1740", ox + w - 190, oy + 21);
}

function drawVectorscopeToContext(ctx, srcCv, ox, oy, w, h) {
  const cx = ox + w / 2;
  const cy = oy + h / 2;
  const R = Math.min(w, h) * 0.40;

  // Grade polar
  ctx.strokeStyle = "rgba(0, 255, 100, 0.28)";
  ctx.lineWidth = 1;

  // Círculos de 100% e 75% de saturação
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([2, 3]);
  ctx.arc(cx, cy, R * 0.75, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Eixos U e V (Crosshair central)
  ctx.beginPath();
  ctx.moveTo(cx - R - 10, cy); ctx.lineTo(cx + R + 10, cy);
  ctx.moveTo(cx, cy - R - 10); ctx.lineTo(cx, cy + R + 10);
  ctx.stroke();

  // Caixas de alvos SMPTE NTSC a 75% de saturação
  const targets = [
    { label: "R", ang: 104 },
    { label: "Mg", ang: 61 },
    { label: "B", ang: 347 },
    { label: "Cy", ang: 284 },
    { label: "G", ang: 241 },
    { label: "Yl", ang: 167 }
  ];

  ctx.strokeStyle = "#FFE040";
  ctx.fillStyle = "#FFE040";
  ctx.font = "10px monospace";
  targets.forEach(t => {
    const rad = (t.ang * Math.PI) / 180;
    const tx = cx + Math.cos(rad) * (R * 0.75);
    const ty = cy - Math.sin(rad) * (R * 0.75);
    ctx.strokeRect(tx - 5, ty - 5, 10, 10);
    ctx.fillText(t.label, tx + 7, ty + 3);
  });

  // Amostragem de crominância polar UV em tempo real
  try {
    const imgData = srcCv.getContext("2d").getImageData(0, 0, srcCv.width, srcCv.height);
    const data = imgData.data;
    const sw = srcCv.width, sh = srcCv.height;
    ctx.fillStyle = "rgba(40, 255, 100, 0.22)";
    for (let y = 0; y < sh; y += 4) {
      for (let x = 0; x < sw; x += 4) {
        const idx = (y * sw + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const u = -0.14713 * r - 0.28886 * g + 0.436 * b;
        const v = 0.615 * r - 0.51499 * g - 0.10001 * b;
        const px = cx + (u / 112) * (R * 0.75);
        const py = cy - (v / 157) * (R * 0.75);
        ctx.fillRect(px, py, 1.5, 1.5);
      }
    }
  } catch (_e) {}

  // Título e borda CRT
  ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
  ctx.fillRect(ox + w - 215, oy + 8, 207, 18);
  ctx.fillStyle = "#00FF66";
  ctx.font = "11px 'Courier New', monospace";
  ctx.fillText("VECTORSCOPE UV · 75% NTSC", ox + w - 210, oy + 21);
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || "").split(" ");
  let line = "";
  let curY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + " ";
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}

/* ---------- Sincronismo de Reprodução de Vídeos e Áudios Reais + Sintetizador Sound Blaster 16 ---------- */
let audioCtx = null;
function getAC() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playFoleySound(preset, durSec = 0.8) {
  if (!prefs.som) return;
  const ac = getAC();
  if (!ac) return;
  const now = ac.currentTime;

  if (preset === "claquete" || preset === "bip") {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = preset === "bip" ? "sine" : "square";
    osc.frequency.setValueAtTime(preset === "bip" ? 1000 : 1600, now);
    g.gain.setValueAtTime(0.3, now);
    g.gain.exponentialRampToValueAtTime(0.008, now + 0.08);
    osc.connect(g); g.connect(ac.destination);
    osc.start(now); osc.stop(now + 0.09);
    pulseVU(0.85);
    return;
  }

  if (preset === "alarme") {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.35);
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.008, now + 0.65);
    osc.connect(g); g.connect(ac.destination);
    osc.start(now); osc.stop(now + 0.66);
    pulseVU(0.85);
    return;
  }

  if (preset === "tiro" || preset === "impacto") {
    const sz = Math.floor(ac.sampleRate * 0.3);
    const buf = ac.createBuffer(1, sz, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < sz; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ac.sampleRate * 0.05));
    const src = ac.createBufferSource();
    src.buffer = buf;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.6, now);
    g.gain.exponentialRampToValueAtTime(0.01, now + 0.29);
    src.connect(g); g.connect(ac.destination);
    src.start(now);
    pulseVU(0.95);
    return;
  }

  // Acorde / Synth 95
  [110, 164.8, 220].forEach(f => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(f, now);
    g.gain.setValueAtTime(0.07, now);
    g.gain.exponentialRampToValueAtTime(0.005, now + Math.min(1.0, durSec));
    osc.connect(g); g.connect(ac.destination);
    osc.start(now); osc.stop(now + Math.min(1.0, durSec) + 0.02);
  });
  pulseVU(0.6);
}

const VU_SEGMENTS = 24;
let vuLevelL = 0, vuLevelR = 0;
let vuPeakL = -1, vuPeakR = -1;
let vuPeakHoldUntilL = 0, vuPeakHoldUntilR = 0;
let vuPulseUntil = 0, vuPulseValL = 0, vuPulseValR = 0;

async function extractAudioPeaksForItem(item) {
  if (!item || !item.url || item.kind === "image") return;
  if (S.audioPeaks.has(item.url)) return;
  try {
    const resp = await fetch(item.url);
    const arrayBuf = await resp.arrayBuffer();
    const ac = getAC();
    if (!ac) return;
    const audioBuf = await ac.decodeAudioData(arrayBuf.slice(0));
    const rate = 50; // 50 amostras de envelope por segundo (resolução de 20ms para marcar batidas com precisão)
    const totalBins = Math.max(10, Math.ceil(audioBuf.duration * rate));
    const ch0 = audioBuf.getChannelData(0);
    const ch1 = audioBuf.numberOfChannels > 1 ? audioBuf.getChannelData(1) : ch0;
    const samplesPerBin = Math.max(1, Math.floor(audioBuf.length / totalBins));

    const peaksL = new Float32Array(totalBins);
    const peaksR = new Float32Array(totalBins);
    const peaksMono = new Float32Array(totalBins);
    let globalMax = 0.01;

    for (let b = 0; b < totalBins; b++) {
      const start = b * samplesPerBin;
      const end = Math.min(audioBuf.length, start + samplesPerBin);
      const step = Math.max(1, Math.floor((end - start) / 64));
      let maxL = 0, maxR = 0;
      for (let i = start; i < end; i += step) {
        const aL = Math.abs(ch0[i]);
        const aR = Math.abs(ch1[i]);
        if (aL > maxL) maxL = aL;
        if (aR > maxR) maxR = aR;
      }
      peaksL[b] = maxL;
      peaksR[b] = maxR;
      const m = (maxL + maxR) * 0.5;
      peaksMono[b] = m;
      if (m > globalMax) globalMax = m;
    }

    // Normaliza levemente caso o arquivo seja muito baixo, preservando toda a dinâmica real entre silêncio e picos
    const normFactor = globalMax > 0.02 ? Math.min(2.2, 0.96 / globalMax) : 1;
    for (let b = 0; b < totalBins; b++) {
      peaksL[b] = Math.min(1, peaksL[b] * normFactor);
      peaksR[b] = Math.min(1, peaksR[b] * normFactor);
      peaksMono[b] = Math.min(1, peaksMono[b] * normFactor);
    }

    S.audioPeaks.set(item.url, {
      rate,
      dur: audioBuf.duration,
      peaksL,
      peaksR,
      peaksMono
    });

    renderTimeline();
    renderSourceFrame();
    updateVUMeterFromTimeline();
  } catch (_err) {
    // Caso seja um vídeo sem trilha de áudio embutida, registra como silencioso
    S.audioPeaks.set(item.url, {
      rate: 50,
      dur: item.dur || 10,
      peaksL: new Float32Array(0),
      peaksR: new Float32Array(0),
      peaksMono: new Float32Array(0)
    });
  }
}

function buildClipWaveSvg(clip, widthPx, isVideo = false) {
  const pk = clip.mediaUrl ? S.audioPeaks.get(clip.mediaUrl) : null;
  const hasRealPeaks = pk && pk.peaksMono && pk.peaksMono.length > 0;
  if (isVideo && !hasRealPeaks && clip.synthType !== "leader") return "";
  if (!isVideo && clip.mediaKind === "image") return "";

  const bars = Math.max(12, Math.min(180, Math.floor(widthPx / 3)));
  const inPt = Number(clip.inPoint) || 0;
  const spd = Number(clip.speed) || 1;
  const vol = Math.min(1.5, (clip.volume == null ? 100 : Number(clip.volume)) / 100);
  const clipDur = Math.max(0.2, Number(clip.dur) || 1);

  let dPath = "";
  for (let i = 0; i < bars; i++) {
    const tLocal = (i / bars) * clipDur;
    const mediaSec = inPt + tLocal * spd;
    let amp = 0;
    if (hasRealPeaks) {
      const b0 = Math.floor(mediaSec * pk.rate);
      const b1 = Math.max(b0 + 1, Math.floor((mediaSec + (clipDur / bars) * spd) * pk.rate));
      for (let b = b0; b < b1 && b < pk.peaksMono.length; b++) {
        if (b >= 0 && pk.peaksMono[b] > amp) amp = pk.peaksMono[b];
      }
    } else if (clip.synthType === "leader") {
      amp = (mediaSec % 1) < 0.1 ? 0.85 : 0.04;
    } else if (clip.sfxPreset || clip.speaker) {
      amp = 0.22 + Math.abs(Math.sin(mediaSec * 14) * Math.cos(mediaSec * 5.5)) * 0.65;
    } else {
      return "";
    }
    amp = Math.min(1, amp * vol);
    const x = ((i + 0.5) / bars) * 100;
    const h = Math.max(6, Math.round(amp * 94));
    const y1 = 100 - h;
    dPath += `M${x.toFixed(1)},100 L${x.toFixed(1)},${y1} `;
  }

  const strokeColor = isVideo ? "#70E8FF" : "#80FF98";
  return `<svg class="clip-wave" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="${dPath}" stroke="${strokeColor}" stroke-width="0.9" fill="none" vector-effect="non-scaling-stroke"/></svg>`;
}

function ensureClipRubberband(clip) {
  if (!clip) return;
  const dur = Math.max(0.1, Number(clip.dur) || 1);
  if (!Array.isArray(clip.rubberband) || clip.rubberband.length < 2) {
    const baseVol = clip.volume == null ? 100 : Number(clip.volume);
    clip.rubberband = [
      { offset: 0, vol: baseVol },
      { offset: dur, vol: baseVol }
    ];
  } else {
    clip.rubberband[0].offset = 0;
    clip.rubberband[clip.rubberband.length - 1].offset = dur;
  }
}

function evaluateRubberbandVolume(clip, elapsedSec) {
  if (!clip || !Array.isArray(clip.rubberband) || clip.rubberband.length < 2) return 1;
  const dur = Math.max(0.01, Number(clip.dur) || 1);
  const t = Math.max(0, Math.min(dur, elapsedSec));
  const nodes = clip.rubberband.slice().sort((a, b) => a.offset - b.offset);
  if (t <= nodes[0].offset) return Math.max(0, Math.min(1.5, nodes[0].vol / 100));
  if (t >= nodes[nodes.length - 1].offset) return Math.max(0, Math.min(1.5, nodes[nodes.length - 1].vol / 100));
  for (let i = 0; i < nodes.length - 1; i++) {
    const n1 = nodes[i];
    const n2 = nodes[i + 1];
    if (t >= n1.offset && t <= n2.offset) {
      const span = n2.offset - n1.offset;
      if (span <= 0.0001) return Math.max(0, Math.min(1.5, n1.vol / 100));
      const prog = (t - n1.offset) / span;
      const smooth = (1 - Math.cos(prog * Math.PI)) / 2;
      const v = n1.vol + (n2.vol - n1.vol) * smooth;
      return Math.max(0, Math.min(1.5, v / 100));
    }
  }
  return 1;
}

function getClipAudioSampleAt(clip, globalSec) {
  if (!clip || clip.disabled) return { l: 0, r: 0 };
  const elapsed = Math.max(0, globalSec - clip.start);
  const localSec = Math.max(0, elapsed * (clip.speed || 1) + (clip.inPoint || 0));

  // Volume do clipe com suporte a Keyframes e Envelope Rubberband
  const dynClipVol = evaluateKeyframedProperty(clip, "volume", (clip.volume == null ? 100 : Number(clip.volume)), localSec);
  let vol = Math.max(0, dynClipVol / 100);
  vol *= evaluateRubberbandVolume(clip, elapsed);
  if (vol <= 0.001) return { l: 0, r: 0 };

  // Esmaecimento Suave Cosseno (Anti-estalo / De-click nos pontos de corte)
  const dur = Math.max(0.1, Number(clip.dur) || 1);
  const remain = (clip.start + dur) - globalSec;
  const fIn = Math.max(0, Number(clip.fadeIn) || 0);
  const fOut = Math.max(0, Number(clip.fadeOut) || 0);
  if (fIn > 0 && elapsed >= 0 && elapsed < fIn) {
    vol *= Math.sin(Math.min(1, elapsed / fIn) * Math.PI / 2);
  }
  if (fOut > 0 && remain >= 0 && remain < fOut) {
    vol *= Math.sin(Math.min(1, remain / fOut) * Math.PI / 2);
  }

  // Faders da Mesa de Som Analógica 95 (Volume da Faixa + Volume Master)
  const tkVol = ((S.trackVolumes && S.trackVolumes[clip.track]) != null ? S.trackVolumes[clip.track] : 100) / 100;
  const mastVol = ((S.trackVolumes && S.trackVolumes.master) != null ? S.trackVolumes.master : 100) / 100;
  vol *= (tkVol * mastVol);

  // Panorâmico Estéreo (Pan Knob L/R)
  const pan = ((S.trackPans && S.trackPans[clip.track]) != null ? S.trackPans[clip.track] : 0);
  const panL = pan > 0 ? (100 - pan) / 100 : 1;
  const panR = pan < 0 ? (100 + pan) / 100 : 1;

  if (clip.mediaUrl && S.audioPeaks.has(clip.mediaUrl)) {
    const pk = S.audioPeaks.get(clip.mediaUrl);
    if (!pk.peaksMono || !pk.peaksMono.length) return { l: 0, r: 0 };
    const centerBin = Math.floor(localSec * pk.rate);
    let maxL = 0, maxR = 0;
    for (let b = centerBin - 1; b <= centerBin + 1; b++) {
      if (b >= 0 && b < pk.peaksMono.length) {
        if (pk.peaksL[b] > maxL) maxL = pk.peaksL[b];
        if (pk.peaksR[b] > maxR) maxR = pk.peaksR[b];
      }
    }
    return { l: Math.min(1, maxL * vol * panL), r: Math.min(1, maxR * vol * panR) };
  }

  // Clipes sintéticos e Geradores de Sinais Broadcast 1995 (1kHz, 440Hz, Sweep, Pink Noise, White Noise, Leader)
  if (clip.synthType === "tone_1khz") {
    const s = Math.sin(2 * Math.PI * 1000 * localSec) * 0.10 * vol;
    return { l: s * panL, r: s * panR };
  }
  if (clip.synthType === "tone_440hz") {
    const s = Math.sin(2 * Math.PI * 440 * localSec) * 0.12 * vol;
    return { l: s * panL, r: s * panR };
  }
  if (clip.synthType === "sweep_20_20k") {
    const dur = Math.max(1, clip.dur || 6);
    const frac = Math.min(1, Math.max(0, (localSec % dur) / dur));
    const phase = 2 * Math.PI * 20 * ((Math.pow(1000, frac) - 1) / Math.log(1000)) * dur;
    const s = Math.sin(phase) * 0.10 * vol;
    return { l: s * panL, r: s * panR };
  }
  if (clip.synthType === "pink_noise") {
    const s1 = Math.sin(localSec * 88200);
    const n = ((Math.sin(s1 * 3456.78) + Math.cos(localSec * 12345.6) + Math.random() - 0.5) / 2.5) * 0.10 * vol;
    return { l: n * panL, r: n * panR };
  }
  if (clip.synthType === "white_noise") {
    const n = (Math.random() * 2 - 1) * 0.08 * vol;
    return { l: n * panL, r: n * panR };
  }
  if (clip.synthType === "leader") {
    const inBeep = (localSec % 1) < 0.09;
    return inBeep ? { l: 0.82 * vol * panL, r: 0.82 * vol * panR } : { l: 0, r: 0 };
  }
  if (clip.sfxPreset === "acorde") {
    const env = Math.max(0.15, 0.48 + Math.sin(localSec * 6.2) * 0.16) * vol;
    return { l: env * panL, r: env * 0.94 * panR };
  }
  if (clip.sfxPreset) {
    const dt = globalSec - clip.start;
    if (dt >= 0 && dt < 0.65) {
      const env = Math.exp(-dt * 3.5) * 0.85 * vol;
      return { l: env * panL, r: env * panR };
    }
    return { l: 0, r: 0 };
  }
  if (clip.speaker || (isAudioTrack(clip.track) && clip.text)) {
    const syll = Math.sin(localSec * 15.5) * Math.cos(localSec * 4.3);
    const gate = Math.sin(localSec * 2.7) > -0.25 ? 1 : 0.05;
    const env = Math.max(0, Math.abs(syll) * gate * 0.72 * vol);
    return { l: env * panL, r: env * 0.96 * panR };
  }
  return { l: 0, r: 0 };
}

function applyAudioDynamics(amp) {
  if (!S.dynamics || !S.dynamics.enabled || amp <= 0.0001) {
    if (S.dynamics) {
      S.dynamics._lastGR = 0;
      S.dynamics._gateOpen = amp > 0.001;
      S.dynamics._limiting = false;
    }
    return amp;
  }
  const d = S.dynamics;
  const inDb = 20 * Math.log10(amp);

  // 1. Noise Gate
  if (inDb < d.gateThresh) {
    d._gateOpen = false;
    d._lastGR = 0;
    d._limiting = false;
    return 0;
  }
  d._gateOpen = true;

  // 2. Compressor Óptico
  let compDb = inDb;
  let grDb = 0;
  if (inDb > d.compThresh) {
    const excess = inDb - d.compThresh;
    const ratio = Math.max(1.2, d.compRatio || 4);
    const compressed = excess / ratio;
    grDb = excess - compressed;
    compDb = d.compThresh + compressed;
  }
  d._lastGR = grDb;

  // Makeup Gain
  let outDb = compDb + (d.compGain || 0);

  // 3. Brickwall Peak Limiter (-0.1 dBFS)
  const ceilDb = d.limiterCeil != null ? d.limiterCeil : -0.1;
  if (outDb > ceilDb) {
    d._limiting = true;
    outDb = ceilDb;
  } else {
    d._limiting = false;
  }

  const outLinear = Math.pow(10, outDb / 20);
  return Math.max(0, outLinear);
}

function computeAudioLevelsAt(sec, useSourceMonitor = false) {
  if (!prefs.som) return { l: 0, r: 0 };

  if (useSourceMonitor && S.srcItem) {
    const it = S.srcItem;
    if (it.url && S.audioPeaks.has(it.url)) {
      const pk = S.audioPeaks.get(it.url);
      if (!pk.peaksMono || !pk.peaksMono.length) return { l: 0, r: 0 };
      const idx = Math.min(pk.peaksMono.length - 1, Math.max(0, Math.floor(sec * pk.rate)));
      return { l: pk.peaksL[idx] || 0, r: pk.peaksR[idx] || 0 };
    }
    if (it.synthType === "leader") {
      const inBeep = (sec % 1) < 0.09;
      return inBeep ? { l: 0.82, r: 0.82 } : { l: 0, r: 0 };
    }
    return { l: 0, r: 0 };
  }

  const active = getActiveClipsAt(sec);
  let sumL = 0, sumR = 0;

  for (const c of active.videoList) {
    if (!c || S.tracksMuted[c.track]) continue;
    const { l, r } = getClipAudioSampleAt(c, sec);
    sumL += l;
    sumR += r;
  }
  const hasVoiceA1 = S.autoDucking && active.audioList.some(c => c && c.track === "a1" && !S.tracksMuted[c.track]);
  for (const c of active.audioList) {
    if (!c) continue;
    let { l, r } = getClipAudioSampleAt(c, sec);
    if (hasVoiceA1 && (c.track === "a2" || c.track === "a3")) {
      l *= 0.25;
      r *= 0.25;
    }
    sumL += l;
    sumR += r;
  }

  let outL = sumL, outR = sumR;
  if (S.dynamics && S.dynamics.enabled) {
    outL = applyAudioDynamics(sumL);
    outR = applyAudioDynamics(sumR);
  }

  return {
    l: Math.min(1, outL),
    r: Math.min(1, outR)
  };
}

function amplitudeToMeterNorm(amp) {
  if (!amp || amp <= 0.0015) return 0;
  const db = 20 * Math.log10(Math.min(1, amp));
  // Escala logarítmica real de -48 dB (base) até 0 dB (topo)
  return Math.max(0, Math.min(1, (db + 48) / 48));
}

function initVUMeters() {
  ["vuL", "vuR"].forEach(id => {
    const col = document.getElementById(id);
    if (!col) return;
    let h = "";
    for (let i = 0; i < VU_SEGMENTS; i++) {
      const cls = i >= 21 ? "r" : (i >= 16 ? "y" : "g");
      h += `<div class="vu-seg ${cls}"></div>`;
    }
    col.innerHTML = h;
  });
}

function pulseVU(lvl) {
  const now = performance.now();
  vuPulseUntil = now + 180;
  vuPulseValL = Math.min(1, lvl);
  vuPulseValR = Math.min(1, lvl * 0.95);
  updateVUMeterFromTimeline();
}

function updateVUMeterFromTimeline() {
  const now = performance.now();
  const useSrc = S.srcPlaying || (document.activeElement && document.activeElement.id === "srcScrub");
  const refSec = useSrc ? S.srcPlayhead : S.playhead;
  let { l, r } = computeAudioLevelsAt(refSec, useSrc);

  if (now < vuPulseUntil) {
    l = Math.max(l, vuPulseValL);
    r = Math.max(r, vuPulseValR);
  }

  vuLevelL = l;
  vuLevelR = r;
  paintVUMeters(refSec, useSrc);
}

function paintVUMeters(refSec = S.playhead, useSrc = false) {
  const now = performance.now();
  const normL = amplitudeToMeterNorm(vuLevelL);
  const normR = amplitudeToMeterNorm(vuLevelR);

  const countL = Math.round(normL * VU_SEGMENTS);
  const countR = Math.round(normR * VU_SEGMENTS);

  if (countL - 1 >= vuPeakL || now > vuPeakHoldUntilL) {
    vuPeakL = countL - 1;
    vuPeakHoldUntilL = now + 900;
  }
  if (countR - 1 >= vuPeakR || now > vuPeakHoldUntilR) {
    vuPeakR = countR - 1;
    vuPeakHoldUntilR = now + 900;
  }

  [["vuL", countL, vuPeakL], ["vuR", countR, vuPeakR]].forEach(([id, activeCount, peakIdx]) => {
    const col = document.getElementById(id);
    if (!col) return;
    const segs = col.querySelectorAll(".vu-seg");
    segs.forEach((seg, idx) => {
      seg.classList.toggle("on", idx < activeCount);
      seg.classList.toggle("peak", peakIdx >= 0 && idx === peakIdx && idx >= activeCount);
    });
  });

  // Leitura digital precisa em dB no rodapé do medidor direito
  const dbLbl = document.getElementById("vuDbLbl");
  if (dbLbl) {
    const maxAmp = Math.max(vuLevelL, vuLevelR);
    if (maxAmp <= 0.002) {
      dbLbl.textContent = "-INF";
      dbLbl.classList.remove("clip");
    } else {
      const db = Math.max(-48, 20 * Math.log10(Math.min(1, maxAmp)));
      dbLbl.textContent = `${db >= -0.1 ? "0.0" : db.toFixed(1)}dB`;
      dbLbl.classList.toggle("clip", db >= -1.2);
    }
  }

  // Osciloscópio / Forma de Onda em Tempo Real (#vuScope) no lado direito do Monitor de Programa
  const scope = document.getElementById("vuScope");
  if (scope) {
    const sctx = scope.getContext("2d");
    const W = scope.width, H = scope.height;
    sctx.fillStyle = "#050A0E";
    sctx.fillRect(0, 0, W, H);

    // Linhas de grade horizontais e linha central zero
    sctx.strokeStyle = "#142834";
    sctx.lineWidth = 1;
    sctx.beginPath();
    sctx.moveTo(0, H / 2); sctx.lineTo(W, H / 2);
    sctx.moveTo(W / 2, 0); sctx.lineTo(W / 2, H);
    sctx.stroke();

    // Desenha janela de ±0.55s de áudio real ao redor da agulha para o usuário enxergar o som passando!
    const winSec = 1.1;
    const midY = H / 2;
    for (let x = 0; x < W; x++) {
      const sampleSec = refSec + ((x / (W - 1)) - 0.5) * winSec;
      if (sampleSec < 0) continue;
      const { l, r } = computeAudioLevelsAt(sampleSec, useSrc);
      const mono = Math.max(l, r);
      if (mono > 0.005) {
        const barH = Math.max(1, Math.round(mono * (H * 0.46)));
        const isCenter = Math.abs(x - W / 2) <= 1;
        sctx.fillStyle = isCenter ? "#FFFF40" : (mono > 0.85 ? "#FF4040" : "#00FF80");
        sctx.fillRect(x, midY - barH, 1, barH * 2);
      }
    }

    // Cursor central vermelho indicando o ponto exato de corte/marcação
    sctx.fillStyle = "rgba(255, 40, 40, 0.75)";
    sctx.fillRect(Math.floor(W / 2), 0, 1, H);
  }

  // Goniômetro Estéreo / Phase Scope (Lissajous X/Y) (#gonioScope)
  const gonio = document.getElementById("gonioScope");
  if (gonio) {
    const gctx = gonio.getContext("2d");
    const GW = gonio.width, GH = gonio.height;
    gctx.fillStyle = "#030c04";
    gctx.fillRect(0, 0, GW, GH);

    // Retículo circular e eixos 45°
    gctx.strokeStyle = "#103518";
    gctx.lineWidth = 1;
    gctx.beginPath();
    gctx.arc(GW / 2, GH / 2, Math.min(GW, GH) * 0.42, 0, Math.PI * 2);
    gctx.moveTo(GW / 2, 2); gctx.lineTo(GW / 2, GH - 2);
    gctx.moveTo(2, GH / 2); gctx.lineTo(GW - 2, GH / 2);
    gctx.stroke();

    // Traça curva de correlação estéreo de Lissajous em fósforo verde
    const ampL = vuLevelL;
    const ampR = vuLevelR;
    if (ampL > 0.005 || ampR > 0.005) {
      gctx.strokeStyle = "rgba(40, 255, 120, 0.85)";
      gctx.lineWidth = 1.2;
      gctx.beginPath();
      const points = 16;
      for (let p = 0; p <= points; p++) {
        const t = (p / points) * Math.PI * 2;
        const xVal = Math.sin(t) * ampL;
        const yVal = Math.cos(t * 1.05 + 0.2) * ampR;
        const rotX = (xVal - yVal) * 0.707;
        const rotY = (xVal + yVal) * 0.707;
        const px = GW / 2 + rotX * (GW * 0.44);
        const py = GH / 2 - rotY * (GH * 0.44);
        if (p === 0) gctx.moveTo(px, py);
        else gctx.lineTo(px, py);
      }
      gctx.stroke();
    }
  }
}

let lastTriggeredSfxId = null;

function syncHtmlMediaPlayback() {
  const active = getActiveClipsAt(S.playhead);

  // Sincroniza elementos <video> em todas as faixas de vídeo (V1, V2, V3, V4...)
  for (const [url, el] of S.videoEls.entries()) {
    if (el.tagName !== "VIDEO") continue;
    const activeClip = active.videoList.find(c => c && c.mediaUrl === url);
    if (S.playing && activeClip && S.shuttleSpeed > 0) {
      const localSec = Math.max(0, (S.playhead - activeClip.start) * (activeClip.speed || 1) + (activeClip.inPoint || 0));
      const targetT = el.duration ? Math.min(Math.max(0, el.duration - 0.04), localSec) : localSec;
      const drift = el.currentTime - targetT;

      // Se houver um desvio extremo (> 1.2s), faz seek direto; se for pequeno, ajusta a taxa de reprodução suavemente.
      // Isso impede que o navegador entre em 'seeking' contínuo, o que cortava o áudio e fazia a tela piscar.
      if (Math.abs(drift) > 1.2 && !el.seeking) {
        try { el.currentTime = targetT; } catch (_e) {}
      }
      el.muted = !prefs.som || !!S.tracksMuted[activeClip.track];
      const tkVol = ((S.trackVolumes && S.trackVolumes[activeClip.track]) != null ? S.trackVolumes[activeClip.track] : 100) / 100;
      const mastVol = ((S.trackVolumes && S.trackVolumes.master) != null ? S.trackVolumes.master : 100) / 100;
      const dynVol = evaluateKeyframedProperty(activeClip, "volume", (activeClip.volume == null ? 100 : activeClip.volume), localSec) / 100;
      let dynGain = 1;
      if (S.dynamics && S.dynamics.enabled) {
        const makeup = Math.pow(10, ((S.dynamics.compGain || 0) - (S.dynamics._lastGR || 0)) / 20);
        dynGain = Math.min(1.5, Math.max(0.1, makeup));
      }
      const rbFactor = evaluateRubberbandVolume(activeClip, Math.max(0, S.playhead - activeClip.start));
      const rawVol = dynVol * tkVol * mastVol * dynGain * rbFactor;
      el.volume = (isFinite(rawVol) && !isNaN(rawVol)) ? Math.max(0, Math.min(1, rawVol)) : 1;

      const baseRate = Math.max(0.25, Math.min(4, (activeClip.speed || 1) * S.shuttleSpeed));
      if (Math.abs(drift) > 0.05 && Math.abs(drift) <= 1.2) {
        el.playbackRate = Math.max(0.25, Math.min(4, baseRate * (drift > 0 ? 0.96 : 1.04)));
      } else {
        el.playbackRate = baseRate;
      }
      if (el.paused) el.play().catch(() => {});
    } else {
      if (!el.paused) {
        try { el.pause(); } catch (_e) {}
      }
    }
  }

  // Sincroniza elementos <audio> em todas as faixas de áudio (A1, A2, A3, A4...)
  for (const [url, el] of S.audioEls.entries()) {
    const activeClip = active.audioList.find(c => c && c.mediaUrl === url);
    if (S.playing && activeClip && S.shuttleSpeed > 0) {
      const localSec = Math.max(0, (S.playhead - activeClip.start) * (activeClip.speed || 1) + (activeClip.inPoint || 0));
      const targetT = el.duration ? Math.min(Math.max(0, el.duration - 0.04), localSec) : localSec;
      const drift = el.currentTime - targetT;

      if (Math.abs(drift) > 1.2 && !el.seeking) {
        try { el.currentTime = targetT; } catch (_e) {}
      }
      el.muted = !prefs.som || !!S.tracksMuted[activeClip.track];
      const tkVol = ((S.trackVolumes && S.trackVolumes[activeClip.track]) != null ? S.trackVolumes[activeClip.track] : 100) / 100;
      const mastVol = ((S.trackVolumes && S.trackVolumes.master) != null ? S.trackVolumes.master : 100) / 100;
      const dynVol = evaluateKeyframedProperty(activeClip, "volume", (activeClip.volume == null ? 100 : activeClip.volume), localSec) / 100;

      // Anti-estalo nas bordas do clipe
      const dur = Math.max(0.1, Number(activeClip.dur) || 1);
      const elapsed = S.playhead - activeClip.start;
      const remain = (activeClip.start + dur) - S.playhead;
      const fIn = Math.max(0, Number(activeClip.fadeIn) || 0);
      const fOut = Math.max(0, Number(activeClip.fadeOut) || 0);
      let cFade = 1;
      if (fIn > 0 && elapsed >= 0 && elapsed < fIn) cFade *= Math.sin(Math.min(1, elapsed / fIn) * Math.PI / 2);
      if (fOut > 0 && remain >= 0 && remain < fOut) cFade *= Math.sin(Math.min(1, remain / fOut) * Math.PI / 2);

      // Auto-Ducking: se ativo e houver fala/voz em A1, reduz volume musical das faixas A2/A3 em -12 dB (0.25x)
      let duckFactor = 1;
      if (S.autoDucking && (activeClip.track === "a2" || activeClip.track === "a3")) {
        const hasVoiceA1 = active.audioList.some(c => c && c.track === "a1" && !S.tracksMuted[c.track]);
        if (hasVoiceA1) duckFactor = 0.25;
      }

      let dynGain = 1;
      if (S.dynamics && S.dynamics.enabled) {
        const makeup = Math.pow(10, ((S.dynamics.compGain || 0) - (S.dynamics._lastGR || 0)) / 20);
        dynGain = Math.min(1.5, Math.max(0.1, makeup));
      }

      const rbFactor = evaluateRubberbandVolume(activeClip, elapsed);
      const rawVol = dynVol * cFade * tkVol * mastVol * duckFactor * dynGain * rbFactor;
      el.volume = (isFinite(rawVol) && !isNaN(rawVol)) ? Math.max(0, Math.min(1, rawVol)) : 1;

      const baseRate = Math.max(0.25, Math.min(4, (activeClip.speed || 1) * S.shuttleSpeed));
      if (Math.abs(drift) > 0.05 && Math.abs(drift) <= 1.2) {
        el.playbackRate = Math.max(0.25, Math.min(4, baseRate * (drift > 0 ? 0.96 : 1.04)));
      } else {
        el.playbackRate = baseRate;
      }
      if (el.paused) el.play().catch(() => {});
    } else {
      if (!el.paused) {
        try { el.pause(); } catch (_e) {}
      }
    }
  }

  // Toca efeitos sonoros sintéticos (Foley) quando a agulha entra no clipe em qualquer faixa de áudio
  const sfxClip = active.audioList.find(c => c && c.sfxPreset);
  if (S.playing && sfxClip) {
    if (lastTriggeredSfxId !== sfxClip.id && (S.playhead - sfxClip.start) < 0.35) {
      lastTriggeredSfxId = sfxClip.id;
      playFoleySound(sfxClip.sfxPreset, Math.min(1.2, sfxClip.dur));
    }
  } else if (!sfxClip) {
    lastTriggeredSfxId = null;
  }
}

let lastTick = 0;
let lastLeaderSec = -1;

function togglePlay(speed = 1) {
  if (S.srcPlaying) stopSourcePlayback();
  if (S.playing && S.shuttleSpeed === speed) {
    S.playing = false;
  } else {
    // Se a agulha estiver no final da sequência, volta para 0
    let maxClipEnd = 0;
    for (const tk of getAllTrackIds()) {
      for (const c of (S.clips[tk] || [])) {
        if (!c.disabled && c.start + c.dur > maxClipEnd) maxClipEnd = c.start + c.dur;
      }
    }
    if (maxClipEnd > 0 && S.playhead >= maxClipEnd - 0.08) {
      S.playhead = 0;
    }
    S.playing = true;
    S.shuttleSpeed = speed;
  }
  const btn = document.getElementById("btnPlay");
  if (btn) {
    btn.textContent = S.playing ? (S.shuttleSpeed !== 1 ? `► ${S.shuttleSpeed}x` : "|| Pausar") : "► Tocar";
    btn.classList.toggle("active", S.playing);
  }
  syncHtmlMediaPlayback();
  renderMonitorFrame();
  if (S.playing) {
    lastTick = performance.now();
    requestAnimationFrame(playbackLoop);
  } else {
    updateVUMeterFromTimeline();
  }
}

function stopPlayback() {
  S.playing = false;
  syncHtmlMediaPlayback();
  const btn = document.getElementById("btnPlay");
  if (btn) {
    btn.textContent = "► Tocar";
    btn.classList.remove("active");
  }
  setPlayhead(0, false);
}

function setPlayhead(sec, fromScrub = false, keepInView = true) {
  S.playhead = Math.max(0, Math.min(S.totalDur, Number(sec) || 0));
  const tcEl = document.getElementById("tcDisplay");
  if (tcEl) tcEl.textContent = fmtSMPTE(S.playhead);

  const pScrub = document.getElementById("progScrub");
  if (pScrub && !fromScrub) pScrub.value = String(S.playhead);

  const phEl = document.getElementById("tlPlayhead");
  const pxPerSec = Number(prefs.tlZoom) || 10;
  const playheadPx = Math.round(S.playhead * pxPerSec);
  if (phEl) phEl.style.left = playheadPx + "px";

  if (keepInView) {
    const scroller = document.getElementById("tlScroll");
    if (scroller && scroller.clientWidth > 80) {
      const viewW = scroller.clientWidth;
      const curLeft = scroller.scrollLeft;
      if (playheadPx < curLeft + 16) {
        scroller.scrollLeft = Math.max(0, playheadPx - Math.round(viewW * 0.25));
      } else if (playheadPx > curLeft + viewW - 32) {
        scroller.scrollLeft = Math.max(0, playheadPx - Math.round(viewW * 0.5));
      }
    }
  }

  const active = getActiveClipsAt(S.playhead);
  // Se o roteiro lateral estiver visível, destaca a fala/cena correspondente
  const activeElId = (active.a1 && active.a1.elId) || (active.v1 && active.v1.sceneId) || null;
  document.querySelectorAll(".el.playing-line").forEach(el => el.classList.remove("playing-line"));
  if (activeElId) {
    document.querySelectorAll(`.el[data-id="${activeElId}"]`).forEach(domEl => {
      domEl.classList.add("playing-line");
    });
  }

  renderMonitorFrame();
  updateVUMeterFromTimeline();
  updateStatusBar();
}

function playbackLoop(now) {
  if (!S.playing) return;
  const dt = Math.min(0.1, (now - lastTick) / 1000) * S.shuttleSpeed;
  lastTick = now;

  // Calcula o fim real do último clipe na sequência para não ficar tocando espaço vazio infinito
  let lastClipEnd = 0;
  for (const tk of getAllTrackIds()) {
    for (const c of (S.clips[tk] || [])) {
      if (!c.disabled && c.start + c.dur > lastClipEnd) lastClipEnd = c.start + c.dur;
    }
  }
  const effectiveEnd = lastClipEnd > 0.5 ? lastClipEnd : S.totalDur;

  let nextSec = S.playhead + dt;

  // Se houver uma mídia mestre (vídeo ou áudio) tocando suavemente em 1x,
  // alinha a agulha ao relógio de decodificação da mídia para sincronismo perfeito sem jitter:
  if (S.shuttleSpeed === 1) {
    const active = getActiveClipsAt(S.playhead);
    const masterClip = active.v1 || active.a1;
    if (masterClip && masterClip.mediaUrl) {
      const el = S.videoEls.get(masterClip.mediaUrl) || S.audioEls.get(masterClip.mediaUrl);
      if (el && !el.paused && !el.seeking && el.currentTime > 0) {
        const vGlobal = masterClip.start + (el.currentTime - (masterClip.inPoint || 0)) / (masterClip.speed || 1);
        if (Math.abs(nextSec - vGlobal) < 0.4) {
          nextSec = vGlobal;
        }
      }
    }
  }

  if (nextSec >= effectiveEnd || nextSec < 0) {
    if (S.loop && nextSec >= effectiveEnd) {
      nextSec = 0;
    } else {
      setPlayhead(Math.max(0, Math.min(effectiveEnd, nextSec)));
      togglePlay(S.shuttleSpeed);
      return;
    }
  }

  setPlayhead(nextSec, false);
  syncHtmlMediaPlayback();

  const active = getActiveClipsAt(S.playhead);
  if (active.v1 && active.v1.synthType === "leader") {
    const sInt = Math.floor(S.playhead);
    if (sInt !== lastLeaderSec) {
      lastLeaderSec = sInt;
      playFoleySound("bip", 0.08);
    }
  }
  updateVUMeterFromTimeline();

  requestAnimationFrame(playbackLoop);
}

/* ---------- Manipulação Direta no Monitor de Programa (Redimensionar, Esticar, Mover e Girar Imagens/Vídeos) ---------- */
function setupProgramMonitorDirectTransform() {
  const cv = document.getElementById("vCanvas");
  if (!cv) return;

  const toCanvasCoords = (ev) => {
    const r = cv.getBoundingClientRect();
    return {
      x: ((ev.clientX - r.left) / Math.max(1, r.width)) * cv.width,
      y: ((ev.clientY - r.top) / Math.max(1, r.height)) * cv.height
    };
  };

  const toLocalClipCoords = (mx, my, clip) => {
    const tf = getClipTransformAt(clip, S.playhead);
    const cx = cv.width / 2 + tf.posX;
    const cy = cv.height / 2 + tf.posY;
    const dx = mx - cx;
    const dy = my - cy;
    const rad = -(tf.rotation * Math.PI) / 180;
    const lx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const ly = dx * Math.sin(rad) + dy * Math.cos(rad);
    const bw = Math.max(24, cv.width * (tf.scaleX / 100));
    const bh = Math.max(24, cv.height * (tf.scaleY / 100));
    return { lx, ly, bw, bh, cx, cy, tf };
  };

  const hitTestHandle = (mx, my, clip) => {
    if (!clip || !prefs.transformOverlay) return null;
    const { lx, ly, bw, bh } = toLocalClipCoords(mx, my, clip);
    const handles = getHandlePositionsLocal(bw, bh);
    for (const [name, [hx, hy]] of Object.entries(handles)) {
      if (Math.hypot(lx - hx, ly - hy) <= 13) return name;
    }
    if (Math.abs(lx) <= bw / 2 && Math.abs(ly) <= bh / 2) return "move";
    return null;
  };

  cv.addEventListener("pointermove", (ev) => {
    if (S.playing || ev.buttons !== 0) return;
    const clip = getSelectedVisualClipAtPlayhead();
    if (!clip) { cv.style.cursor = "pointer"; return; }
    const { x, y } = toCanvasCoords(ev);
    const hit = hitTestHandle(x, y, clip);
    const cursors = {
      nw: "nwse-resize", se: "nwse-resize",
      ne: "nesw-resize", sw: "nesw-resize",
      n: "ns-resize", s: "ns-resize",
      e: "ew-resize", w: "ew-resize",
      rot: "grab",
      move: "move"
    };
    cv.style.cursor = cursors[hit] || "default";
  });

  cv.addEventListener("pointerdown", (ev) => {
    if (ev.button !== 0) return;
    if (S.playing) {
      togglePlay(1);
      return;
    }
    const { x, y } = toCanvasCoords(ev);
    const active = getActiveClipsAt(S.playhead);

    // Verifica qual clipe visual está sob o clique (priorizando faixas superiores Vn..V2 sobre V1)
    let clip = getSelectedVisualClipAtPlayhead();
    let mode = clip ? hitTestHandle(x, y, clip) : null;

    if (!mode) {
      for (const candidate of [...active.videoList].reverse()) {
        if (!candidate) continue;
        const h = hitTestHandle(x, y, candidate);
        if (h) {
          clip = candidate;
          mode = h;
          break;
        }
      }
    }

    if (!clip) {
      togglePlay(1);
      return;
    }

    S.selectedClipId = clip.id;
    S.selectedClipTrack = clip.track;
    S.selectedClipIds = [clip.id];
    renderTimeline();
    if (S.sideTab === "fx" || S.sideTab === "trans") renderSide();
    renderMonitorFrame();

    if (!mode || S.tracksLocked[clip.track]) return;

    const startPt = { x, y };
    const origPosX = Number(clip.posX) || 0;
    const origPosY = Number(clip.posY) || 0;
    const origSX = clip.scaleX != null ? Number(clip.scaleX) : (clip.scale != null ? Number(clip.scale) : 100);
    const origSY = clip.scaleY != null ? Number(clip.scaleY) : (clip.scale != null ? Number(clip.scale) : 100);
    const origRot = Number(clip.rotation) || 0;
    let savedUndo = false;

    cv.setPointerCapture(ev.pointerId);

    const onMove = (me) => {
      const curPt = toCanvasCoords(me);
      const dx = curPt.x - startPt.x;
      const dy = curPt.y - startPt.y;
      if (Math.hypot(dx, dy) < 2 && !savedUndo) return;
      if (!savedUndo) {
        saveUndoSnapshot();
        savedUndo = true;
      }

      if (mode === "move") {
        clip.posX = Math.round(origPosX + dx);
        clip.posY = Math.round(origPosY + dy);
      } else if (mode === "rot") {
        const cx = cv.width / 2 + (Number(clip.posX) || 0);
        const cy = cv.height / 2 + (Number(clip.posY) || 0);
        const ang = Math.atan2(curPt.y - cy, curPt.x - cx) * (180 / Math.PI) + 90;
        clip.rotation = Math.round(((ang + 180) % 360 + 360) % 360 - 180);
      } else {
        const signX = mode.includes("e") ? 1 : (mode.includes("w") ? -1 : 0);
        const signY = mode.includes("s") ? 1 : (mode.includes("n") ? -1 : 0);
        const deltaSX = signX ? (dx * signX / (cv.width / 2)) * 100 : 0;
        const deltaSY = signY ? (dy * signY / (cv.height / 2)) * 100 : 0;

        if (mode.length === 2 && !me.shiftKey && clip.uniformScale !== false) {
          // Alça de canto: redimensionamento proporcional (ou segure Shift para esticar livremente)
          const avgDelta = (deltaSX + deltaSY) / 2;
          const nextS = Math.max(8, Math.min(350, Math.round(origSX + avgDelta)));
          const ratio = origSY / Math.max(1, origSX);
          clip.scaleX = nextS;
          clip.scaleY = Math.max(8, Math.min(350, Math.round(nextS * ratio)));
          clip.scale = nextS;
        } else {
          // Alças laterais ou Shift pressionado: redimensiona Largura (scaleX) e Altura (scaleY) separadamente!
          if (signX) {
            clip.scaleX = Math.max(8, Math.min(350, Math.round(origSX + deltaSX)));
            if ( signY === 0 ) clip.uniformScale = false;
          }
          if (signY) {
            clip.scaleY = Math.max(8, Math.min(350, Math.round(origSY + deltaSY)));
            if ( signX === 0 ) clip.uniformScale = false;
          }
          clip.scale = clip.scaleX;
        }
      }

      renderMonitorFrame();
      if (S.sideTab === "fx") renderSide();
    };

    const onUp = () => {
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
    };

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
  });

  cv.addEventListener("dblclick", () => {
    togglePlay(1);
  });

  cv.addEventListener("wheel", (ev) => {
    const clip = getSelectedVisualClipAtPlayhead();
    if (!clip || S.tracksLocked[clip.track]) return;
    ev.preventDefault();
    saveUndoSnapshot();
    const step = ev.deltaY < 0 ? 5 : -5;
    const curSX = clip.scaleX != null ? Number(clip.scaleX) : (clip.scale != null ? Number(clip.scale) : 100);
    const curSY = clip.scaleY != null ? Number(clip.scaleY) : (clip.scale != null ? Number(clip.scale) : 100);
    clip.scaleX = Math.max(10, Math.min(350, curSX + step));
    clip.scaleY = Math.max(10, Math.min(350, curSY + step));
    clip.scale = clip.scaleX;
    renderMonitorFrame();
    if (S.sideTab === "fx") renderSide();
  }, { passive: false });
}

/* ---------- Linha do Tempo Interativa Adobe Premiere 4.2 (Arrastar, Trim, Navalha, Adiante, Mão, Marcadores e Menu Contexto) ---------- */
function setTimelineTool(toolName) {
  S.tool = toolName;
  document.body.dataset.tool = toolName;
  document.querySelectorAll("[data-toolbtn]").forEach(b => {
    b.setAttribute("aria-pressed", b.dataset.toolbtn === toolName ? "true" : "false");
  });
  const names = {
    select: `Seleção e Movimento (${prettyKeyName(KEYMAP.toolSelect)})`,
    track: `Selecionar Faixa Adiante (${prettyKeyName(KEYMAP.toolTrack)})`,
    razor: `Navalha de Corte (${prettyKeyName(KEYMAP.toolRazor)})`,
    trim: `Ajuste de Borda / Trim (${prettyKeyName(KEYMAP.toolTrim)})`,
    ripple: `Ripple Edit — Fechamento (${prettyKeyName(KEYMAP.toolRipple || "B")})`,
    rolling: `Rolling Edit — Corte Mútuo (${prettyKeyName(KEYMAP.toolRolling || "N")})`,
    slip: `Slip Tool — Conteúdo Interno (${prettyKeyName(KEYMAP.toolSlip || "Y")})`,
    slide: `Slide Tool — Mover Deslizando (${prettyKeyName(KEYMAP.toolSlide || "U")})`,
    hand: `Mão / Arrastar Linha do Tempo (${prettyKeyName(KEYMAP.toolHand)})`
  };
  const sb = document.getElementById("sbTool");
  if (sb) sb.textContent = `Ferramenta: ${names[toolName] || toolName}`;
}

function snapTimelineSec(rawSec, ignoreClipId = null) {
  if (!prefs.snap) { hideSnapLine(); return Math.max(0, Number(rawSec.toFixed(2))); }
  const pxPerSec = Number(prefs.tlZoom) || 10;
  const thresholdSec = Math.max(0.22, 8 / pxPerSec);
  const candidates = [0, S.playhead, ...S.markers.map(m => m.time)];
  if (S.tlIn != null) candidates.push(S.tlIn);
  if (S.tlOut != null) candidates.push(S.tlOut);
  for (const tk of getAllTrackIds()) {
    for (const c of (S.clips[tk] || [])) {
      if (c.id === ignoreClipId) continue;
      candidates.push(c.start, c.start + c.dur);
    }
  }
  let best = rawSec;
  let minDiff = thresholdSec;
  let didSnap = false;
  for (const pt of candidates) {
    const d = Math.abs(rawSec - pt);
    if (d < minDiff) {
      minDiff = d;
      best = pt;
      didSnap = true;
    }
  }
  if (didSnap) showSnapLine(best);
  else hideSnapLine();
  return Math.max(0, Number(best.toFixed(2)));
}

function snapTimelineSecForClip(rawStart, clipDur, ignoreClipId = null) {
  if (!prefs.snap) { hideSnapLine(); return Math.max(0, Number(rawStart.toFixed(2))); }
  const pxPerSec = Number(prefs.tlZoom) || 10;
  const thresholdSec = Math.max(0.25, 9 / pxPerSec);
  const candidates = [0, S.playhead, ...S.markers.map(m => m.time)];
  if (S.tlIn != null) candidates.push(S.tlIn);
  if (S.tlOut != null) candidates.push(S.tlOut);
  for (const tk of getAllTrackIds()) {
    for (const c of (S.clips[tk] || [])) {
      if (c.id === ignoreClipId) continue;
      candidates.push(c.start, c.start + c.dur);
    }
  }
  let bestStart = rawStart;
  let minDiff = thresholdSec;
  let snapTargetPt = null;
  for (const pt of candidates) {
    // Testa encaixe da borda esquerda (início do clipe)
    const dLeft = Math.abs(rawStart - pt);
    if (dLeft < minDiff) {
      minDiff = dLeft;
      bestStart = pt;
      snapTargetPt = pt;
    }
    // Testa encaixe da borda direita (fim do clipe)
    const dRight = Math.abs((rawStart + clipDur) - pt);
    if (dRight < minDiff && pt - clipDur >= 0) {
      minDiff = dRight;
      bestStart = pt - clipDur;
      snapTargetPt = pt;
    }
  }
  if (snapTargetPt !== null) showSnapLine(snapTargetPt);
  else hideSnapLine();
  return Math.max(0, Number(bestStart.toFixed(2)));
}

function createFreezeFrameAtPlayhead() {
  const vCv = document.getElementById("vCanvas");
  if (!vCv) return;
  const tk = S.targetVideoTrack || "v1";

  if (S.tracksLocked[tk]) {
    toast(`A faixa ${tk.toUpperCase()} está bloqueada com cadeado.`);
    return;
  }

  const dataUrl = vCv.toDataURL("image/png");
  saveUndoSnapshot();
  const insertT = Number(S.playhead.toFixed(2));
  const freezeDur = 4.0;

  // Empurra clipes posteriores na faixa para abrir espaço (Insert / Ripple)
  (S.clips[tk] || []).forEach(c => {
    if (c.start >= insertT - 0.02) {
      c.start = Number((c.start + freezeDur).toFixed(2));
    }
  });

  const img = new Image();
  img.src = dataUrl;
  S.videoEls.set(dataUrl, img);

  const newClip = {
    id: uid(tk + "_freeze_"),
    track: tk,
    title: `Congelado [${fmtSMPTE(insertT)}]`,
    start: insertT,
    dur: freezeDur,
    inPoint: 0,
    speed: 1,
    mediaUrl: dataUrl,
    mediaKind: "image",
    isFreezeFrame: true
  };

  S.clips[tk].push(newClip);
  resolveTrackOverlaps(tk, newClip.id);
  S.selectedClipId = newClip.id;
  S.selectedClipTrack = tk;
  S.selectedClipIds = [newClip.id];

  recalcSequenceDuration();
  renderAll();
  playFoleySound("claquete", 0.05);
  toast(`Quadro congelado (4.0s) criado e inserido em ${tk.toUpperCase()}!`);
}

function openMarkerDialog(marker, isNew = false) {
  const m = marker || {
    id: uid("mk_"),
    time: Number(S.playhead.toFixed(2)),
    label: `M${S.markers.length + 1}`,
    color: "green",
    comment: ""
  };

  dialog({
    id: "mkWin",
    title: isNew ? "Novo Marcador de Linha do Tempo" : `Editar Marcador — ${m.label}`,
    width: 400,
    body: `
      <div class="col" style="gap:6px">
        <div class="grid2">
          <label class="fld"><span>Tempo / Timecode:</span>
            <input type="text" id="mk-tc" value="${fmtSMPTE(m.time)}" readonly style="background:var(--face);font-family:monospace;font-weight:bold">
          </label>
          <label class="fld"><span>Rótulo / Nome:</span>
            <input type="text" id="mk-lbl" value="${escH(m.label)}" maxlength="20" autofocus>
          </label>
        </div>
        <div class="row" style="gap:6px;align-items:flex-end">
          <label class="fld" style="flex:1"><span>Categoria / Cor do Marcador:</span>
            <select id="mk-color">
              <option value="green"${m.color === "green" ? " selected" : ""}>🟢 Verde — Inserção de GC / Letreiro / Cartela</option>
              <option value="red"${m.color === "red" ? " selected" : ""}>🔴 Vermelho — Ponto de Corte Crítico / Emenda</option>
              <option value="blue"${m.color === "blue" ? " selected" : ""}>🔵 Azul — Ponto de Entrada Áudio / Trilha / Foley</option>
              <option value="yellow"${m.color === "yellow" ? " selected" : ""}>🟡 Amarelo — Anotação do Diretor / Roteiro</option>
              <option value="custom"${(m.color && m.color.startsWith("#")) ? " selected" : ""}>🎨 Cor Personalizada (Win95)</option>
            </select>
          </label>
          <div style="margin-bottom:2px">
            ${createWin95ColorButtonHtml("mk-color-btn", m.color && m.color.startsWith("#") ? m.color : "#00D048")}
          </div>
        </div>
        <label class="fld"><span>Comentários / Decupagem da Cena:</span>
          <textarea id="mk-comment" rows="3" style="resize:vertical;font-size:11px" placeholder="Instruções para a equipe de pós-produção ou notas de corte...">${escH(m.comment || "")}</textarea>
        </label>
      </div>
    `,
    buttons: [
      {
        label: isNew ? "Adicionar" : "Salvar",
        def: 1,
        run: (w) => {
          m.label = w.querySelector("#mk-lbl").value.trim() || `M${S.markers.length + 1}`;
          const selVal = w.querySelector("#mk-color").value;
          m.color = selVal === "custom" ? chosenMarkerColor : selVal;
          m.comment = w.querySelector("#mk-comment").value.trim();
          if (isNew) {
            S.markers.push(m);
            S.markers.sort((a, b) => a.time - b.time);
            toast(`Marcador "${m.label}" adicionado em ${fmtSMPTE(m.time)}!`);
          } else {
            toast(`Marcador "${m.label}" atualizado.`);
          }
          renderTimeline();
          if (S.sideTab === "marcadores") renderSide();
        }
      },
      ...(!isNew ? [{
        label: "Excluir",
        run: () => {
          S.markers = S.markers.filter(x => x.id !== m.id);
          renderTimeline();
          if (S.sideTab === "marcadores") renderSide();
          toast("Marcador excluído.");
        }
      }] : []),
      { label: "Cancelar" }
    ]
  });

  let chosenMarkerColor = m.color && m.color.startsWith("#") ? m.color : "#00D048";
  setTimeout(() => {
    const mkBtn = document.getElementById("mk-color-btn");
    const mkSel = document.getElementById("mk-color");
    if (mkBtn) {
      bindWin95ColorButton(mkBtn, (hex) => {
        chosenMarkerColor = hex;
        if (mkSel) mkSel.value = "custom";
      });
    }
    if (mkSel) {
      mkSel.onchange = (e) => {
        if (e.target.value !== "custom") chosenMarkerColor = e.target.value;
      };
    }
  }, 40);
}

function exportCueSheet() {
  if (!S.markers.length) {
    toast("Nenhum marcador registrado na Linha do Tempo para exportar.");
    return;
  }
  const lines = [
    `======================================================================`,
    `   SCRIPTEDITOR 95 — FOLHA DE DECUPAGEM & CUE SHEET BROADCAST        `,
    `======================================================================`,
    `PROJETO:       ${S.projectName}`,
    `DATA:          ${new Date().toLocaleDateString("pt-BR")} ${new Date().toLocaleTimeString("pt-BR")}`,
    `TOTAL ITENS:   ${S.markers.length} marcadores`,
    `DURAÇÃO TOTAL: ${fmtSMPTE(S.totalDur)}`,
    `PADRÃO:        NTSC 29.97 FPS (Drop Frame) · Ilha Analógica 1995`,
    `----------------------------------------------------------------------`,
    `#   TIMECODE      COR        RÓTULO               ANOTAÇÃO / DECUPAGEM`,
    `----------------------------------------------------------------------`
  ];

  const colMap = { red: "VERMELHO (Corte)", green: "VERDE (GC/Texto)", blue: "AZUL (Áudio)", yellow: "AMARELO (Direção)" };

  S.markers.forEach((m, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const tc = fmtSMPTE(m.time).padEnd(12, " ");
    const col = (colMap[m.color] || m.color || "VERDE").padEnd(18, " ");
    const lbl = (m.label || "").padEnd(20, " ");
    const comm = m.comment || "—";
    lines.push(`${num}  ${tc}  ${col} ${lbl} ${comm}`);
  });

  lines.push(`----------------------------------------------------------------------`);
  lines.push(`[Fim da Folha de Decupagem · ScriptEditor 95 Broadcast Edition]`);

  const blob = new Blob([lines.join("\r\n")], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `CUESHEET_${S.projectName.replace(/\.[^.]+$/, "")}_95.TXT`;
  a.click();
  toast(`Folha de Decupagem (.TXT) exportada com sucesso!`);
}

function addTimelineMarker() {
  const t = Number(S.playhead.toFixed(2));
  const existing = S.markers.find(m => Math.abs(m.time - t) < 0.25);
  if (existing) {
    openMarkerDialog(existing, false);
  } else {
    openMarkerDialog(null, true);
  }
}

function duplicateSelectedClip() {
  const selectedList = getSelectedClipsList();
  if (!selectedList.length) {
    toast("Selecione clipe(s) na linha do tempo para duplicar.");
    return;
  }
  saveUndoSnapshot();

  if (selectedList.length === 1) {
    const sel = selectedList[0].clip;
    const tk = selectedList[0].track;
    if (S.tracksLocked[tk]) {
      toast(`A faixa ${tk.toUpperCase()} está trancada.`);
      return;
    }
    const insertAt = Number((sel.start + sel.dur).toFixed(2));
    (S.clips[tk] || []).forEach(c => {
      if (c.id !== sel.id && c.start >= insertAt - 0.02) {
        c.start = Number((c.start + sel.dur).toFixed(2));
      }
    });
    const copy = Object.assign({}, JSON.parse(JSON.stringify(sel)), {
      id: uid(tk + "_"),
      title: `${sel.title} (Cópia)`,
      start: insertAt
    });
    S.clips[tk].push(copy);
    resolveTrackOverlaps(tk, copy.id);
    S.selectedClipId = copy.id;
    S.selectedClipTrack = tk;
    S.selectedClipIds = [copy.id];
    recalcSequenceDuration();
    setPlayhead(copy.start, false);
    renderAll();
    toast(`Clipe duplicado em ${fmtSMPTE(copy.start)}!`);
    return;
  }

  // Duplicação de múltiplos clipes em bloco
  const maxEnd = Math.max(...selectedList.map(item => item.clip.start + item.clip.dur));
  const minStart = Math.min(...selectedList.map(item => item.clip.start));
  const delta = Number(((maxEnd - minStart) + 0.1).toFixed(2));
  const newIds = [];

  selectedList.forEach(item => {
    const tk = item.track;
    if (S.tracksLocked[tk]) return;
    const copy = Object.assign({}, JSON.parse(JSON.stringify(item.clip)), {
      id: uid(tk + "_"),
      title: `${item.clip.title} (Cópia)`,
      start: Number((item.clip.start + delta).toFixed(2))
    });
    S.clips[tk].push(copy);
    resolveTrackOverlaps(tk, copy.id);
    newIds.push(copy.id);
  });

  S.selectedClipIds = newIds;
  if (newIds.length) {
    S.selectedClipId = newIds[0];
  }
  recalcSequenceDuration();
  setPlayhead(Number((minStart + delta).toFixed(2)), false);
  renderAll();
  toast(`${newIds.length} clipe(s) duplicado(s) em bloco!`);
}

function copySelectedClip() {
  const selectedList = getSelectedClipsList();
  if (!selectedList.length) {
    toast("Selecione clipe(s) para copiar.");
    return;
  }
  if (selectedList.length === 1) {
    S.clipboardClip = JSON.parse(JSON.stringify(selectedList[0].clip));
    S.clipboardClips = null;
    toast(`Clipe "${selectedList[0].clip.title}" copiado para a área de transferência!`);
  } else {
    const minStart = Math.min(...selectedList.map(item => item.clip.start));
    S.clipboardClips = selectedList.map(item => ({
      clip: JSON.parse(JSON.stringify(item.clip)),
      track: item.track,
      relStart: item.clip.start - minStart
    }));
    S.clipboardClip = JSON.parse(JSON.stringify(selectedList[0].clip));
    toast(`${selectedList.length} clipes copiados para a área de transferência!`);
  }
}

function pasteClipAtPlayhead() {
  if (!S.clipboardClip && (!S.clipboardClips || !S.clipboardClips.length)) {
    toast("Nenhum clipe copiado ainda (use Ctrl+C num clipe ou seleção).");
    return;
  }
  saveUndoSnapshot();
  clearClipSelection();

  if (S.clipboardClips && S.clipboardClips.length > 1) {
    const newSelectedIds = [];
    S.clipboardClips.forEach(item => {
      const tk = item.track || "v1";
      ensureTrackExists(tk);
      if (S.tracksLocked[tk]) return;
      const copy = Object.assign({}, JSON.parse(JSON.stringify(item.clip)), {
        id: uid(tk + "_"),
        start: Number((S.playhead + item.relStart).toFixed(2))
      });
      S.clips[tk].push(copy);
      resolveTrackOverlaps(tk, copy.id);
      newSelectedIds.push(copy.id);
    });
    S.selectedClipIds = newSelectedIds;
    if (newSelectedIds.length) {
      S.selectedClipId = newSelectedIds[0];
    }
    recalcSequenceDuration();
    renderAll();
    toast(`${newSelectedIds.length} clipes colados na agulha!`);
    return;
  }

  const tk = S.clipboardClip.track || "v1";
  if (S.tracksLocked[tk]) {
    toast(`A faixa ${tk.toUpperCase()} está trancada.`);
    return;
  }
  const copy = Object.assign({}, JSON.parse(JSON.stringify(S.clipboardClip)), {
    id: uid(tk + "_"),
    start: Number(S.playhead.toFixed(2))
  });
  S.clips[tk].push(copy);
  resolveTrackOverlaps(tk, copy.id);
  S.selectedClipId = copy.id;
  S.selectedClipTrack = tk;
  S.selectedClipIds = [copy.id];
  recalcSequenceDuration();
  renderAll();
  toast(`Clipe "${copy.title}" colado em ${fmtSMPTE(copy.start)}!`);
}

function openClipSpeedDialog(clip) {
  if (!clip) return;
  dialog({
    id: "spdWin",
    title: `Velocidade / Duração — ${clip.title}`,
    width: 420,
    body: `
      <div class="grid2">
        <label class="fld"><span>Velocidade (%):</span>
          <input type="number" id="spd-pct" value="${Math.round((clip.speed || 1) * 100)}" min="10" max="400" step="5">
        </label>
        <label class="fld"><span>Duração (segundos):</span>
          <input type="number" id="spd-dur" value="${clip.dur}" min="0.5" max="600" step="0.5">
        </label>
      </div>
      <div class="row" style="gap:4px;margin-top:6px;flex-wrap:wrap">
        <span class="muted" style="font-size:10.5px">Predefinições:</span>
        <button type="button" class="btn sm" data-spdpreset="25">25% (Super Slow)</button>
        <button type="button" class="btn sm" data-spdpreset="50">50% (Câmera Lenta)</button>
        <button type="button" class="btn sm" data-spdpreset="100">100% (Normal)</button>
        <button type="button" class="btn sm" data-spdpreset="200">200% (Rápido)</button>
        <button type="button" class="btn sm" data-spdpreset="400">400% (Timelapse)</button>
      </div>
      <label class="row" style="gap:5px;margin-top:6px;font-size:11px">
        <input type="checkbox" id="spd-reverse"${clip.reverse ? " checked" : ""}> <b>Reproduzir Invertido / Trás para Frente (Reverse -100%)</b>
      </label>
      <label class="row" style="gap:5px;margin-top:4px;font-size:11px">
        <input type="checkbox" id="spd-ripple" checked> Ajustar clipes seguintes na faixa (Ripple)
      </label>
    `,
    buttons: [
      {
        label: "OK",
        def: 1,
        run: (w) => {
          saveUndoSnapshot();
          const pct = Math.max(10, Math.min(400, +w.querySelector("#spd-pct").value || 100));
          const newDur = Math.max(0.5, +w.querySelector("#spd-dur").value || clip.dur);
          const isReverse = !!w.querySelector("#spd-reverse").checked;
          const diff = newDur - clip.dur;
          clip.speed = Number((pct / 100).toFixed(2));
          clip.dur = Number(newDur.toFixed(2));
          clip.reverse = isReverse;
          if (w.querySelector("#spd-ripple").checked && Math.abs(diff) > 0.01) {
            (S.clips[clip.track] || []).forEach(c => {
              if (c.id !== clip.id && c.start >= clip.start) {
                c.start = Number(Math.max(0, c.start + diff).toFixed(2));
              }
            });
          }
          resolveTrackOverlaps(clip.track, clip.id);
          recalcSequenceDuration();
          renderAll();
          toast(`Velocidade ${pct}% (${clip.dur}s${isReverse ? ", Invertido" : ""}) aplicada!`);
        }
      },
      { label: "Cancelar" }
    ],
    onOpen: (w) => {
      const pIn = w.querySelector("#spd-pct");
      const dIn = w.querySelector("#spd-dur");
      const baseMediaDur = clip.dur * (clip.speed || 1);
      const updateDurFromPct = () => {
        const sp = Math.max(0.1, (+pIn.value || 100) / 100);
        dIn.value = String(Number(Math.max(0.5, baseMediaDur / sp).toFixed(2)));
      };
      pIn.oninput = updateDurFromPct;
      w.querySelectorAll("[data-spdpreset]").forEach(b => {
        b.onclick = () => {
          pIn.value = b.dataset.spdpreset;
          updateDurFromPct();
        };
      });
    }
  });
}

function showClipContextMenu(clip, clientX, clientY) {
  closeMenus();
  const m = document.createElement("div");
  m.className = "menu";

  const selectedList = getSelectedClipsList();
  const hasMultiple = selectedList.length > 1;
  const isGrp = clip.groupId || (hasMultiple && selectedList.some(item => item.clip.groupId));
  const isLnk = clip.linkId || (hasMultiple && selectedList.some(item => item.clip.linkId));

  const items = [
    ["splitHere", "Dividir Clipe Aqui (Navalha)", "Ctrl+K"],
    ["speedDur", "Velocidade / Duração…", ""],
    ["openFx", "Redimensionar, Posição e Recorte (FX)…", ""],
    ["chromaKey", "Chroma Key & Blue/Green Screen 1995…", ""],
    ["-", "", ""],
    ["pasteAttr", "Colar Atributos…", prettyKeyName(KEYMAP.pasteAttributes || "Ctrl+Alt+V")],
    [isGrp ? "ungroup" : "group", isGrp ? "Desagrupar Clipes" : "Agrupar Clipes Selecionados", prettyKeyName(KEYMAP.groupClips || "Ctrl+G")],
    ["linkAv", isLnk ? "Desvincular Áudio e Vídeo" : "Vincular Áudio e Vídeo", prettyKeyName(KEYMAP.linkClips || "Ctrl+L")],
    ["quickDissolve", "Inserir Dissolvência Rápida (1.0s)", prettyKeyName(KEYMAP.quickCrossDissolve || "Ctrl+D")],
    ["-", "", ""],
    ["fitContain", "Ajustar Imagem à Tela (Manter Proporção)", ""],
    ["fitStretch", "Esticar Imagem na Tela 4:3 (Preencher)", ""],
    ["pipCorner", "Miniatura no Canto (Picture-in-Picture)", ""],
    ["resetTransform", "Resetar Tamanho e Posição (100%)", ""],
    ["-", "", ""],
    ["duplicate", hasMultiple ? `Duplicar ${selectedList.length} Clipes Selecionados` : "Duplicar Clipe", prettyKeyName(KEYMAP.duplicateClip)],
    ["copy", hasMultiple ? `Copiar ${selectedList.length} Clipes Selecionados` : "Copiar Clipe", prettyKeyName(KEYMAP.copyClip)],
    ["toggleEnable", clip.disabled ? "Habilitar Clipe na Faixa" : "Desabilitar / Ocultar Clipe", ""],
    ["-", "", ""],
    ["del", hasMultiple ? `Apagar ${selectedList.length} Clipes Selecionados` : "Apagar Clipe", prettyKeyName(KEYMAP.deleteClip)],
    ["rippleDel", hasMultiple ? `Apagar ${selectedList.length} Clipes (Ripple Delete)` : "Apagar e Fechar Espaço (Ripple Delete)", prettyKeyName(KEYMAP.rippleDelete)]
  ];

  m.innerHTML = items.map(([id, lbl, k]) => {
    if (id === "-") return "<hr>";
    return `<button type="button" class="mi" data-cact="${id}">
      <span class="ic"></span>
      <span>${escH(lbl)}</span>
      <span class="k">${escH(k)}</span><span></span>
    </button>`;
  }).join("");

  document.body.appendChild(m);
  menuStack.push(m);
  const w = m.offsetWidth, h = m.offsetHeight;
  m.style.left = Math.max(4, Math.min(clientX, innerWidth - w - 4)) + "px";
  m.style.top = Math.max(4, Math.min(clientY, innerHeight - h - 4)) + "px";

  m.onclick = (ev) => {
    const b = ev.target.closest("[data-cact]");
    if (!b) return;
    const act = b.dataset.cact;
    closeMenus();
    const area = document.getElementById("tlArea");
    const pxPerSec = Number(prefs.tlZoom) || 10;
    const clickSec = area ? Math.max(0, (clientX - area.getBoundingClientRect().left) / pxPerSec) : S.playhead;

    if (act === "splitHere") splitSpecificClipAt(clip.track, clip.id, clickSec);
    else if (act === "speedDur") openClipSpeedDialog(clip);
    else if (act === "openFx") { S.sideTab = "fx"; renderSide(); }
    else if (act === "chromaKey") openChromaKeyDialog(clip);
    else if (act === "pasteAttr") openPasteAttributesDialog();
    else if (act === "group") groupSelectedClips();
    else if (act === "ungroup") ungroupSelectedClips();
    else if (act === "linkAv") linkSelectedClips();
    else if (act === "quickDissolve") applyQuickCrossDissolve();
    else if (act === "fitContain") {
      saveUndoSnapshot();
      Object.assign(clip, { fitMode: "contain", scale: 100, scaleX: 100, scaleY: 100, posX: 0, posY: 0, rotation: 0 });
      renderAll();
    } else if (act === "fitStretch") {
      saveUndoSnapshot();
      Object.assign(clip, { fitMode: "stretch", scale: 100, scaleX: 100, scaleY: 100, posX: 0, posY: 0, rotation: 0 });
      renderAll();
    } else if (act === "pipCorner") {
      saveUndoSnapshot();
      Object.assign(clip, { scale: 42, scaleX: 42, scaleY: 42, posX: 155, posY: -110 });
      renderAll();
    } else if (act === "resetTransform") {
      saveUndoSnapshot();
      Object.assign(clip, { scale: 100, scaleX: 100, scaleY: 100, posX: 0, posY: 0, rotation: 0, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 });
      renderAll();
    } else if (act === "duplicate") duplicateSelectedClip();
    else if (act === "copy") copySelectedClip();
    else if (act === "toggleEnable") {
      saveUndoSnapshot();
      clip.disabled = !clip.disabled;
      renderAll();
    } else if (act === "del") deleteSelectedClip(false);
    else if (act === "rippleDel") deleteSelectedClip(true);
  };
}

function setTimelineZoom(newZoom, focusPlayhead = true) {
  const clamped = Math.max(0.5, Math.min(60, Math.round((Number(newZoom) || 10) * 2) / 2));
  prefs.tlZoom = clamped;
  savePrefs();
  const zInput = document.getElementById("tlZoom");
  if (zInput && Number(zInput.value) !== clamped) {
    zInput.value = String(clamped);
  }

  renderTimeline();

  if (focusPlayhead) {
    const scroller = document.getElementById("tlScroll");
    if (scroller) {
      const playheadPx = Math.round(S.playhead * clamped);
      const viewW = scroller.clientWidth || 600;
      scroller.scrollLeft = Math.max(0, Math.round(playheadPx - viewW * 0.5));
    }
  }
}

function renderTimeline() {
  const ruler = document.getElementById("tlRuler");
  const area = document.getElementById("tlArea");
  const hdrsEl = document.getElementById("tlHeadersList");
  const tracksEl = document.getElementById("tlTracks");
  const scroller = document.getElementById("tlScroll");
  if (!ruler || !area || !hdrsEl || !tracksEl) return;

  renderSequenceTabs();
  recalcSequenceDuration();
  const pxPerSec = Number(prefs.tlZoom) || 10;
  const viewW = scroller ? (scroller.clientWidth || 600) : 600;
  const maxRefSec = Math.max(S.totalDur, S.playhead + 10);
  const totalW = Math.max(860, Math.ceil(maxRefSec * pxPerSec) + Math.round(viewW * 0.65));
  area.style.width = totalW + "px";

  const countLbl = document.getElementById("tlTrackCountLbl");
  if (countLbl) countLbl.textContent = `FAIXAS (${S.videoTracks.length}V · ${S.audioTracks.length}A)`;

  const stepSec = pxPerSec >= 32 ? 1 : (pxPerSec >= 16 ? 2 : (pxPerSec >= 8 ? 5 : (pxPerSec >= 3 ? 15 : 30)));
  let rHtml = "";
  for (let s = 0; s <= S.totalDur; s += stepSec) {
    const x = Math.round(s * pxPerSec);
    rHtml += `<div class="tl-tick" style="left:${x}px">${mmss(s)}</div>`;
  }
  for (const mk of S.markers) {
    const mx = Math.round(mk.time * pxPerSec);
    const isHex = mk.color && mk.color.startsWith("#");
    const colCls = isHex ? "" : `mk-${mk.color || "green"}`;
    const customStyle = isHex ? `background:${mk.color} !important; border-color:#000 !important; color:#fff !important;` : "";
    rHtml += `<div class="tl-marker ${colCls}" data-mkid="${mk.id}" style="left:${mx}px;${customStyle}" title="Marcador ${escH(mk.label)} [${(mk.color || "verde").toUpperCase()}] (${fmtSMPTE(mk.time)}) · Clique para ir / Duplo-clique para editar / Botão direito para remover">${escH(mk.label)}</div>`;
  }

  // Versão 1.0.6: Área de Trabalho IN / OUT na régua
  if (S.tlIn != null || S.tlOut != null) {
    const wIn = S.tlIn != null ? S.tlIn : 0;
    const wOut = S.tlOut != null ? S.tlOut : S.totalDur;
    const wInX = Math.round(wIn * pxPerSec);
    const wOutX = Math.round(wOut * pxPerSec);
    const wBarW = Math.max(4, wOutX - wInX);
    rHtml += `<div class="tl-work-area-bar" style="left:${wInX}px;width:${wBarW}px" title="Área de Trabalho (${(wOut - wIn).toFixed(2)}s) · Tecla Alt+X para limpar"></div>`;
    if (S.tlIn != null) {
      rHtml += `<div class="tl-work-bracket-in" style="left:${wInX}px" title="Ponto de Entrada (IN) da Timeline: ${mmss(S.tlIn)} · Alt+X para limpar">{</div>`;
    }
    if (S.tlOut != null) {
      rHtml += `<div class="tl-work-bracket-out" style="left:${Math.max(0, wOutX - 8)}px" title="Ponto de Saída (OUT) da Timeline: ${mmss(S.tlOut)} · Alt+X para limpar">}</div>`;
    }
  }

  ruler.innerHTML = rHtml;

  ruler.querySelectorAll(".tl-marker").forEach(mel => {
    mel.addEventListener("pointerdown", (ev) => {
      ev.stopPropagation();
      const mk = S.markers.find(m => m.id === mel.dataset.mkid);
      if (mk) setPlayhead(mk.time, false);
    });
    mel.addEventListener("dblclick", (ev) => {
      ev.stopPropagation();
      const mk = S.markers.find(m => m.id === mel.dataset.mkid);
      if (mk) openMarkerDialog(mk, false);
    });
    mel.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      S.markers = S.markers.filter(m => m.id !== mel.dataset.mkid);
      renderTimeline();
      if (S.sideTab === "marcadores") renderSide();
      toast("Marcador removido.");
    });
  });

  const allTracks = getAllTrackIds();

  hdrsEl.innerHTML = allTracks.map(tk => {
    const isVid = isVideoTrack(tk);
    const isTarget = isVid ? (S.targetVideoTrack === tk) : (S.targetAudioTrack === tk);
    const isMuted = !!S.tracksMuted[tk];
    const isSolo = !!S.tracksSolo[tk];
    const isLocked = !!S.tracksLocked[tk];
    const clipCount = (S.clips[tk] || []).length;
    const divCls = tk === "v1" ? " v1-divider" : "";
    return `<div class="tl-thdr${isTarget ? " target-tk" : ""}${divCls}" data-hdrtk="${tk}" title="Clique para definir ${tk.toUpperCase()} como faixa alvo (${clipCount} clipe(s))">
      <button type="button" class="tk-eye${isMuted ? " off" : ""}" data-tk="${tk}" title="${isVid ? `Visibilidade ${tk.toUpperCase()}` : `Mudo ${tk.toUpperCase()}`}">${isVid ? "V" : "M"}</button>
      <button type="button" class="tk-btn${isSolo ? " solo" : ""}" data-solo="${tk}" title="Solo ${tk.toUpperCase()}">S</button>
      <button type="button" class="tk-btn${isLocked ? " locked" : ""}" data-lock="${tk}" title="Trancar faixa ${tk.toUpperCase()}">L</button>
      <span>${escH(getTrackDisplayName(tk))}${clipCount ? ` (${clipCount})` : ""}</span>
    </div>`;
  }).join("");

  tracksEl.innerHTML = allTracks.map(tk => {
    const divCls = tk === "v1" ? " v1-divider" : "";
    return `<div class="tl-track ${tk}${divCls}" id="tk-${tk}" data-track="${tk}"></div>`;
  }).join("");

  // Sincroniza rolagem vertical do cabeçalho com as faixas
  if (scroller) hdrsEl.scrollTop = scroller.scrollTop;

  hdrsEl.querySelectorAll("[data-hdrtk]").forEach(hEl => {
    hEl.onclick = (e) => {
      if (e.target.closest("button")) return;
      const tk = hEl.dataset.hdrtk;
      if (e.shiftKey || e.ctrlKey) {
        selectTrackClips(tk);
        return;
      }
      if (isVideoTrack(tk)) S.targetVideoTrack = tk;
      else S.targetAudioTrack = tk;
      renderTimeline();
      if (S.sideTab === "bin") renderSide();
      toast(`Faixa alvo ativa: ${tk.toUpperCase()}`);
    };
    hEl.ondblclick = (e) => {
      if (e.target.closest("button")) return;
      const tk = hEl.dataset.hdrtk;
      selectTrackClips(tk);
    };
  });

  hdrsEl.querySelectorAll("[data-tk]").forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const tk = b.dataset.tk;
      S.tracksMuted[tk] = !S.tracksMuted[tk];
      b.classList.toggle("off", S.tracksMuted[tk]);
      syncHtmlMediaPlayback();
      renderMonitorFrame();
      updateVUMeterFromTimeline();
    };
  });

  hdrsEl.querySelectorAll("[data-solo]").forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const tk = b.dataset.solo;
      S.tracksSolo[tk] = !S.tracksSolo[tk];
      b.classList.toggle("solo", S.tracksSolo[tk]);
      syncHtmlMediaPlayback();
      renderMonitorFrame();
      updateVUMeterFromTimeline();
    };
  });

  hdrsEl.querySelectorAll("[data-lock]").forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const tk = b.dataset.lock;
      S.tracksLocked[tk] = !S.tracksLocked[tk];
      b.classList.toggle("locked", S.tracksLocked[tk]);
      renderTimeline();
      toast(S.tracksLocked[tk] ? `Faixa ${tk.toUpperCase()} trancada.` : `Faixa ${tk.toUpperCase()} destrancada.`);
    };
  });

  allTracks.forEach(tk => {
    const trackEl = document.getElementById("tk-" + tk);
    if (!trackEl) return;
    const list = S.clips[tk] || [];
    const isVid = isVideoTrack(tk);
    const isLocked = !!S.tracksLocked[tk];
    const tkTypeCls = isVid ? (tk === "v1" ? "v1" : "v2 v-overlay") : (tk === "a1" ? "a1" : "a2 a-track");
    trackEl.className = `tl-track ${tk}${tk === "v1" ? " v1-divider" : ""}${isLocked ? " locked" : ""}`;

    // Versão 1.0.6: Espaços vazios interativos (Gap Selection & Ripple Delete)
    const gaps = getTrackGaps(tk);
    const gapsHtml = gaps.map(gap => {
      const isGapSel = S.selectedGap && S.selectedGap.track === tk && Math.abs(S.selectedGap.start - gap.start) < 0.04;
      const gLeft = Math.round(gap.start * pxPerSec);
      const gWidth = Math.max(6, Math.round(gap.dur * pxPerSec) - 1);
      return `<div class="tl-gap${isGapSel ? " tl-gap-selected" : ""}" data-gap-tk="${tk}" data-gap-start="${gap.start}" data-gap-end="${gap.end}" data-gap-dur="${gap.dur}" style="left:${gLeft}px;width:${gWidth}px;position:absolute;top:1px;bottom:1px;cursor:pointer;z-index:3" title="Espaço Vazio (${gap.dur.toFixed(2)}s) · Clique para selecionar e tecle DELETE para fechar (Ripple Delete) ou clique com botão direito"></div>`;
    }).join("");

    const clipsHtml = list.map(c => {
      const left = Math.round(c.start * pxPerSec);
      const width = Math.max(16, Math.round(c.dur * pxPerSec) - 1);
      const isSel = isClipSelected(c.id);
      const isMulti = isSel && Array.isArray(S.selectedClipIds) && S.selectedClipIds.length > 1;
      const hasMedia = !!c.mediaUrl;
      const isOffline = !!c.offline;
      const waveSvg = buildClipWaveSvg(c, width, isVid);
      const hasWave = !!waveSvg;
      const fxBadge = (c.trans && c.trans !== "Corte Seco") ? `<span class="fx-badge">FX</span>` : "";
      const grpBadge = c.groupId ? `<span class="clip-badge-grp" title="Grupo: ${c.groupId}">GRP</span>` : "";

      let slipBadge = "";
      if (c.linkId) {
        let counterpart = null;
        for (const otk of getAllTrackIds()) {
          const found = (S.clips[otk] || []).find(x => x.linkId === c.linkId && x.id !== c.id);
          if (found) { counterpart = found; break; }
        }
        if (counterpart) {
          const expectedOffset = c.syncOffset != null ? c.syncOffset : 0;
          const currentOffset = Number((c.start - counterpart.start).toFixed(2));
          const slip = currentOffset - expectedOffset;
          if (Math.abs(slip) >= 1 / FPS) {
            const sign = slip >= 0 ? "+" : "-";
            const absS = Math.abs(slip);
            const slipStr = `${sign}${pad2(Math.floor(absS))}:${pad2(Math.floor((absS % 1) * FPS))}`;
            slipBadge = `<span class="clip-slip-badge" title="Dessincronizado: ${slip.toFixed(2)}s">${slipStr}</span>`;
          }
        }
      }

      const spdTag = (c.speed && c.speed !== 1) ? ` [${c.speed}x]` : "";
      const sub = `${mmss(c.start)}–${mmss(c.start + c.dur)} (${c.dur.toFixed(1)}s)${spdTag}`;

      // Rubberbanding de Volume Interativo para faixas de áudio
      let rubberbandSvg = "";
      if (!isVid) {
        ensureClipRubberband(c);
        const sorted = c.rubberband.slice().sort((a, b) => a.offset - b.offset);
        const pts = sorted.map(n => {
          const nx = Math.max(0, Math.min(100, (n.offset / Math.max(0.01, c.dur)) * 100));
          const ny = Math.max(6, Math.min(94, 90 - (n.vol / 150) * 80));
          return `${nx.toFixed(1)},${ny.toFixed(1)}`;
        }).join(" ");

        const nodesHtml = sorted.map((n, idx) => {
          const nx = Math.max(0, Math.min(100, (n.offset / Math.max(0.01, c.dur)) * 100));
          const ny = Math.max(6, Math.min(94, 90 - (n.vol / 150) * 80));
          return `<circle class="rb-node" cx="${nx.toFixed(1)}%" cy="${ny.toFixed(1)}%" r="4" data-nodeidx="${idx}" data-clipid="${c.id}" data-tk="${tk}" title="Volume: ${Math.round(n.vol)}% (${n.offset.toFixed(2)}s) · Arraste para mudar volume, Alt+Clique para remover"></circle>`;
        }).join("");

        rubberbandSvg = `<svg class="tl-rubberband-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline class="rb-line" points="${pts}" vector-effect="non-scaling-stroke" />
          ${nodesHtml}
        </svg>`;
      }

      // Fotogramas de película de cinema nos clipes de vídeo da timeline
      let filmstripHtml = "";
      if (prefs.filmstrip !== false && isVid && width >= 44) {
        const m = S.mediaBin.find(x => x.url === c.mediaUrl);
        const thumb = (m && m.thumb) || c.thumb;
        if (thumb) {
          const numThumbs = Math.max(1, Math.min(10, Math.floor(width / 44)));
          const thumbs = [];
          for (let ti = 0; ti < numThumbs; ti++) {
            thumbs.push(`<img class="filmstrip-thumb" src="${thumb}" alt="">`);
          }
          filmstripHtml = `<div class="filmstrip-strip">${thumbs.join("")}</div><div class="filmstrip-perfs"></div>`;
        } else {
          filmstripHtml = `<div class="filmstrip-strip" style="background:#151210;opacity:0.25"></div><div class="filmstrip-perfs"></div>`;
        }
      }

      return `<div class="tl-clip ${tkTypeCls}${hasMedia ? " has-media" : ""}${hasWave ? " has-wave" : ""}${filmstripHtml ? " has-filmstrip" : ""}${isSel ? " sel" : ""}${isMulti ? " multi-sel" : ""}${c.disabled ? " disabled" : ""}${isOffline ? " offline" : ""}" data-clip="${c.id}" data-tk="${tk}" style="left:${left}px;width:${width}px" title="[${tk.toUpperCase()}] ${isOffline ? "[OFFLINE] " : ""}${escH(c.title)} · Arraste para mover, Duplo-clique para nó de áudio, Botão direito para opções">
        ${filmstripHtml}
        ${waveSvg}
        ${rubberbandSvg}
        <span class="trim-l" data-trim="l"></span>
        <div class="clip-text-box">
          <span>${isOffline ? '<span class="badge-offline">OFFLINE</span> ' : ""}${grpBadge}${fxBadge}${escH(c.title)}${slipBadge}</span>
          <small>${escH(sub)}</small>
        </div>
        <span class="trim-r" data-trim="r"></span>
      </div>`;
    }).join("");

    trackEl.innerHTML = gapsHtml + clipsHtml;
  });

  // Eventos de clique e menu nos Espaços Vazios (Gaps)
  area.querySelectorAll(".tl-gap").forEach(gel => {
    gel.addEventListener("pointerdown", (ev) => {
      if (ev.button !== 0) return;
      ev.stopPropagation();
      closeMenus();
      const tk = gel.dataset.gapTk;
      const start = parseFloat(gel.dataset.gapStart);
      const end = parseFloat(gel.dataset.gapEnd);
      const dur = parseFloat(gel.dataset.gapDur);
      S.selectedClipId = null;
      S.selectedClipTrack = null;
      S.selectedGap = { track: tk, start, end, dur };
      renderTimeline();
      updateStatusBar();
      playFoleySound("bip", 0.02);
    });

    gel.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const tk = gel.dataset.gapTk;
      const start = parseFloat(gel.dataset.gapStart);
      const end = parseFloat(gel.dataset.gapEnd);
      const dur = parseFloat(gel.dataset.gapDur);
      S.selectedClipId = null;
      S.selectedClipTrack = null;
      const gapObj = { track: tk, start, end, dur };
      S.selectedGap = gapObj;
      renderTimeline();
      updateStatusBar();
      showGapContextMenu(gapObj, ev.clientX, ev.clientY);
    });
  });

  // Marquee Selection (Caixa Elástica 95 com o Mouse no Vazio da Timeline)
  tracksEl.querySelectorAll(".tl-track").forEach(tel => {
    tel.addEventListener("pointerdown", (ev) => {
      if (ev.target.closest(".tl-clip") || ev.target.closest(".tl-gap") || ev.target.closest(".rb-node")) return;
      if (ev.button !== 0) return;
      closeMenus();

      const startX = ev.clientX;
      const startY = ev.clientY;
      const areaRect = area.getBoundingClientRect();
      const initialSelectedIds = new Set((ev.shiftKey || ev.ctrlKey) ? (S.selectedClipIds || []) : []);
      if (!ev.shiftKey && !ev.ctrlKey) {
        clearClipSelection();
        area.querySelectorAll(".tl-clip").forEach(node => node.classList.remove("sel", "multi-sel"));
      }

      let marqueeEl = document.getElementById("tlMarquee");
      if (!marqueeEl) {
        marqueeEl = document.createElement("div");
        marqueeEl.id = "tlMarquee";
        marqueeEl.className = "tl-marquee";
        area.appendChild(marqueeEl);
      }
      marqueeEl.style.display = "none";
      let hasMarqueeMoved = false;

      const onMarqueeMove = (me) => {
        const curX = me.clientX;
        const curY = me.clientY;
        const boxLeft = Math.min(startX, curX);
        const boxRight = Math.max(startX, curX);
        const boxTop = Math.min(startY, curY);
        const boxBottom = Math.max(startY, curY);
        const boxW = boxRight - boxLeft;
        const boxH = boxBottom - boxTop;

        if (boxW < 3 && boxH < 3 && !hasMarqueeMoved) return;
        hasMarqueeMoved = true;

        marqueeEl.style.display = "block";
        marqueeEl.style.left = (boxLeft - areaRect.left + area.scrollLeft) + "px";
        marqueeEl.style.top = (boxTop - areaRect.top + area.scrollTop) + "px";
        marqueeEl.style.width = boxW + "px";
        marqueeEl.style.height = boxH + "px";

        const currentSelected = new Set(initialSelectedIds);
        area.querySelectorAll(".tl-clip").forEach(clipEl => {
          const cRect = clipEl.getBoundingClientRect();
          const overlaps = !(cRect.right < boxLeft || cRect.left > boxRight || cRect.bottom < boxTop || cRect.top > boxBottom);
          const cid = clipEl.dataset.clip;
          if (overlaps) {
            currentSelected.add(cid);
            clipEl.classList.add("sel");
            if (currentSelected.size > 1) clipEl.classList.add("multi-sel");
          } else if (!initialSelectedIds.has(cid)) {
            currentSelected.delete(cid);
            clipEl.classList.remove("sel", "multi-sel");
          }
        });

        S.selectedClipIds = Array.from(currentSelected);
        if (S.selectedClipIds.length > 0) {
          S.selectedClipId = S.selectedClipIds[0];
        } else {
          S.selectedClipId = null;
        }
        updateStatusBar();
      };

      const onMarqueeUp = () => {
        window.removeEventListener("pointermove", onMarqueeMove);
        window.removeEventListener("pointerup", onMarqueeUp);
        if (marqueeEl) marqueeEl.remove();
        if (hasMarqueeMoved && S.selectedClipIds.length > 0) {
          playFoleySound("bip", 0.02);
          renderTimeline();
          updateStatusBar();
        } else if (!hasMarqueeMoved && !ev.shiftKey && !ev.ctrlKey) {
          clearClipSelection();
          renderTimeline();
          updateStatusBar();
        }
      };

      window.addEventListener("pointermove", onMarqueeMove);
      window.addEventListener("pointerup", onMarqueeUp);
    });
  });

  // Atualiza visualmente todas as caixas de clipe no DOM sem recriar os elementos durante o arrasto
  const syncClipDomPositions = (pxSec) => {
    getAllTrackIds().forEach(k => {
      const tEl = document.getElementById("tk-" + k);
      if (!tEl) return;
      (S.clips[k] || []).forEach(c => {
        const cEl = tEl.querySelector(`[data-clip="${c.id}"]`);
        if (!cEl) return;
        cEl.style.left = Math.round(c.start * pxSec) + "px";
        cEl.style.width = Math.max(16, Math.round(c.dur * pxSec) - 1) + "px";
        const sm = cEl.querySelector("small");
        if (sm) {
          const spdTag = (c.speed && c.speed !== 1) ? ` [${c.speed}x]` : "";
          sm.textContent = `${mmss(c.start)}–${mmss(c.start + c.dur)} (${c.dur.toFixed(1)}s)${spdTag}`;
        }
      });
    });
  };

  // Eventos de clique, Navalha (C), Arrastar (Move/Cross-track/TrackForward), Trim e Menu de Contexto
  area.querySelectorAll(".tl-clip").forEach(el => {
    el.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const cid = el.dataset.clip;
      const tk = el.dataset.tk;
      const clip = (S.clips[tk] || []).find(x => x.id === cid);
      if (!clip) return;
      S.selectedClipId = cid;
      S.selectedClipTrack = tk;
      renderTimeline();
      if (S.sideTab === "fx" || S.sideTab === "trans") renderSide();
      showClipContextMenu(clip, ev.clientX, ev.clientY);
    });

    el.addEventListener("pointerdown", (ev) => {
      if (ev.button !== 0) return;
      if (ev.target.closest(".rb-node")) return;
      ev.stopPropagation();
      closeMenus();
      const cid = el.dataset.clip;
      let tk = el.dataset.tk;
      let clip = (S.clips[tk] || []).find(x => x.id === cid);
      if (!clip) return;

      if (S.tool === "hand") {
        const scrollerEl = document.getElementById("tlScroll");
        if (!scrollerEl) return;
        const sx = ev.clientX, sLeft = scrollerEl.scrollLeft;
        el.setPointerCapture(ev.pointerId);
        const mv = me => { scrollerEl.scrollLeft = sLeft - (me.clientX - sx); };
        const up = () => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up); };
        el.addEventListener("pointermove", mv);
        el.addEventListener("pointerup", up);
        return;
      }

      if (S.tracksLocked[tk]) {
        toast(`A faixa ${tk.toUpperCase()} está trancada (Cadeado L ativo).`);
        return;
      }

      const pxPerSecNow = Number(prefs.tlZoom) || 10;

      // Se a ferramenta Navalha (C) estiver ativa, divide o clipe exatamente onde clicou!
      if (S.tool === "razor") {
        const areaRect = area.getBoundingClientRect();
        const clickSec = Math.max(0, (ev.clientX - areaRect.left) / pxPerSecNow);
        splitSpecificClipAt(tk, cid, clickSec);
        return;
      }

      // Shift + Clique ou Ctrl + Clique: Adiciona ou remove da seleção em lote (Multi-seleção)
      if (ev.shiftKey || ev.ctrlKey) {
        selectClip(cid, tk, true, true);
        renderTimeline();
        updateStatusBar();
        return;
      }

      // Se clicar com botão esquerdo simples num clipe:
      // Se o clipe já fazia parte da multi-seleção ativa, mantém a seleção para arrastar em bloco
      const alreadyInMulti = Array.isArray(S.selectedClipIds) && S.selectedClipIds.length > 1 && S.selectedClipIds.includes(cid);
      if (!alreadyInMulti) {
        selectClip(cid, tk, false, false);
      } else {
        S.selectedClipId = cid;
        S.selectedClipTrack = tk;
      }

      if (isVideoTrack(tk)) S.targetVideoTrack = tk;
      else S.targetAudioTrack = tk;
      S.isStarterDemo = false;
      area.querySelectorAll(".tl-clip").forEach(node => {
        const isNodeSel = isClipSelected(node.dataset.clip);
        node.classList.toggle("sel", isNodeSel);
        node.classList.toggle("multi-sel", isNodeSel && S.selectedClipIds && S.selectedClipIds.length > 1);
      });
      updateStatusBar();
      if (S.sideTab === "fx" || S.sideTab === "trans") renderSide();
      renderMonitorFrame();

      const trimSide = ev.target.dataset.trim || (S.tool === "trim" ? "r" : "");
      const startX = ev.clientX;
      const origStart = clip.start;
      const origDur = clip.dur;
      const origIn = clip.inPoint || 0;
      let moved = false;

      const selectedList = getSelectedClipsList();
      const isMultiDrag = selectedList.length > 1 && !trimSide && S.tool === "select";

      // Salva posições originais de todos os clipes para empurrar sem sobrepor de forma reversível durante o arrasto
      const baseStarts = new Map();
      const baseDurs = new Map();
      const baseIns = new Map();
      getAllTrackIds().forEach(k => {
        (S.clips[k] || []).forEach(c => {
          baseStarts.set(c.id, c.start);
          baseDurs.set(c.id, c.dur);
          baseIns.set(c.id, c.inPoint || 0);
        });
      });

      // Para a ferramenta Selecionar Faixa Adiante (A): captura todos os clipes a partir de origStart
      const forwardClips = [];
      if (S.tool === "track" && !trimSide) {
        getAllTrackIds().forEach(ftk => {
          if (S.tracksLocked[ftk]) return;
          (S.clips[ftk] || []).forEach(fc => {
            if (fc.start >= origStart - 0.02) {
              forwardClips.push({ clip: fc, baseStart: fc.start });
            }
          });
        });
      }

      el.setPointerCapture(ev.pointerId);

      const onMove = (me) => {
        const dx = me.clientX - startX;
        if (Math.abs(dx) > 2 && !moved) {
          saveUndoSnapshot();
          moved = true;
          if (isMultiDrag) {
            if (ev.altKey) {
              const dupSelectedList = [];
              selectedList.forEach(item => {
                const dup = Object.assign({}, JSON.parse(JSON.stringify(item.clip)), {
                  id: uid(item.track + "_"),
                  title: `${item.clip.title} (Cópia)`
                });
                S.clips[item.track].push(dup);
                baseStarts.set(dup.id, item.clip.start);
                dupSelectedList.push({ clip: dup, track: item.track });
              });
              S.selectedClipIds = dupSelectedList.map(d => d.clip.id);
              S.selectedClipId = dupSelectedList[0].clip.id;
              selectedList.length = 0;
              dupSelectedList.forEach(d => selectedList.push(d));
              clip = dupSelectedList.find(d => d.track === tk)?.clip || dupSelectedList[0].clip;
            }
            selectedList.forEach(item => {
              baseStarts.set(item.clip.id, item.clip.start);
            });
          } else {
            // Alt+Arrastar duplica o clipe automaticamente (igual ao Adobe Premiere!)
            if (ev.altKey && !trimSide && S.tool === "select") {
              const dup = Object.assign({}, JSON.parse(JSON.stringify(clip)), {
                id: uid(tk + "_"),
                title: `${clip.title} (Cópia)`
              });
              S.clips[tk].push(dup);
              baseStarts.set(clip.id, clip.start);
              baseDurs.set(clip.id, clip.dur);
              baseIns.set(clip.id, clip.inPoint || 0);
              clip = dup;
              S.selectedClipId = dup.id;
              el.dataset.clip = dup.id;
            }
          }
        }
        const dt = dx / pxPerSecNow;

        if (isMultiDrag && moved) {
          const minStart = Math.min(...selectedList.map(item => baseStarts.get(item.clip.id) || 0));
          let clampedDt = Math.max(-minStart, dt);
          if (prefs.snap) {
            const rawTarget = Math.max(0, (baseStarts.get(clip.id) || 0) + clampedDt);
            const snapped = snapTimelineSecForClip(rawTarget, clip.dur, clip.id);
            clampedDt = snapped - (baseStarts.get(clip.id) || 0);
          }
          selectedList.forEach(item => {
            item.clip.start = Number(Math.max(0, (baseStarts.get(item.clip.id) || 0) + clampedDt).toFixed(2));
          });
          syncClipDomPositions(pxPerSecNow);
          setPlayhead(clip.start, false);
          return;
        }

        if (S.tool === "track" && !trimSide && forwardClips.length) {
          const minBase = Math.min(...forwardClips.map(f => f.baseStart));
          const clampedDt = Math.max(-minBase, dt);
          forwardClips.forEach(f => {
            f.clip.start = Number(Math.max(0, f.baseStart + clampedDt).toFixed(2));
          });
          syncClipDomPositions(pxPerSecNow);
          setPlayhead(clip.start, false);
          return;
        }

        // Restaura posições base dos outros clipes antes de recalcular colisão
        getAllTrackIds().forEach(k => {
          (S.clips[k] || []).forEach(c => {
            if (c.id !== clip.id && baseStarts.has(c.id)) {
              c.start = baseStarts.get(c.id);
              c.dur = baseDurs.get(c.id);
              c.inPoint = baseIns.get(c.id);
            }
          });
        });

        // --- SUITE DE AJUSTE DE CORTE (TRIM TOOLS 1995) ---
        if (S.tool === "slip") {
          // Slip Tool (Y): desliza o ponto de entrada interno sem alterar a posição ou duração na linha do tempo
          const newIn = Math.max(0, origIn - dt);
          clip.inPoint = Number(newIn.toFixed(2));
          setPlayhead(clip.start, false);
          renderMonitorFrame();
        } else if (S.tool === "slide") {
          // Slide Tool (U): move o clipe ajustando simultaneamente a cauda do clipe anterior e a cabeça do seguinte
          const prevClip = (S.clips[tk] || []).find(c => c.id !== clip.id && Math.abs((c.start + c.dur) - origStart) < 0.15);
          const nextClip = (S.clips[tk] || []).find(c => c.id !== clip.id && Math.abs(c.start - (origStart + origDur)) < 0.15);
          let minDt = -origStart;
          let maxDt = 999;
          if (prevClip) minDt = Math.max(minDt, -(baseDurs.get(prevClip.id) - 0.2));
          if (nextClip) maxDt = Math.min(maxDt, baseDurs.get(nextClip.id) - 0.2);
          const clampedDt = Math.max(minDt, Math.min(maxDt, dt));
          clip.start = Number((origStart + clampedDt).toFixed(2));
          if (prevClip) prevClip.dur = Number((baseDurs.get(prevClip.id) + clampedDt).toFixed(2));
          if (nextClip) {
            nextClip.start = Number((baseStarts.get(nextClip.id) + clampedDt).toFixed(2));
            nextClip.dur = Number((baseDurs.get(nextClip.id) - clampedDt).toFixed(2));
            nextClip.inPoint = Number((baseIns.get(nextClip.id) + clampedDt).toFixed(2));
          }
        } else if (S.tool === "rolling") {
          // Rolling Edit (N): altera a emenda entre dois cortes contíguos sem alterar a duração total de ambos
          const isRightSide = trimSide === "r" || (ev.clientX - el.getBoundingClientRect().left > el.getBoundingClientRect().width / 2);
          if (isRightSide) {
            const nextClip = (S.clips[tk] || []).find(c => c.id !== clip.id && Math.abs(c.start - (origStart + origDur)) < 0.2);
            if (nextClip) {
              const clampedDt = Math.max(-(origDur - 0.2), Math.min(baseDurs.get(nextClip.id) - 0.2, dt));
              clip.dur = Number((origDur + clampedDt).toFixed(2));
              nextClip.start = Number((origStart + clip.dur).toFixed(2));
              nextClip.dur = Number((baseDurs.get(nextClip.id) - clampedDt).toFixed(2));
              nextClip.inPoint = Number((baseIns.get(nextClip.id) + clampedDt).toFixed(2));
            } else {
              clip.dur = Number(Math.max(0.2, origDur + dt).toFixed(2));
            }
          } else {
            const prevClip = (S.clips[tk] || []).find(c => c.id !== clip.id && Math.abs((c.start + c.dur) - origStart) < 0.2);
            if (prevClip) {
              const clampedDt = Math.max(-(baseDurs.get(prevClip.id) - 0.2), Math.min(origDur - 0.2, dt));
              prevClip.dur = Number((baseDurs.get(prevClip.id) + clampedDt).toFixed(2));
              clip.start = Number((origStart + clampedDt).toFixed(2));
              clip.dur = Number((origDur - clampedDt).toFixed(2));
              clip.inPoint = Number((origIn + clampedDt).toFixed(2));
            } else {
              clip.start = Number(Math.max(0, origStart + dt).toFixed(2));
              clip.dur = Number(Math.max(0.2, origDur - dt).toFixed(2));
            }
          }
        } else if (S.tool === "ripple") {
          // Ripple Edit (B): redimensiona a borda do clipe e fecha/empurra todos os clipes subsequentes da faixa
          if (trimSide === "l") {
            const newStart = Math.min(origStart + origDur - 0.2, Math.max(0, origStart + dt));
            const delta = newStart - origStart;
            clip.start = Number(newStart.toFixed(2));
            clip.dur = Number(Math.max(0.2, origDur - delta).toFixed(2));
            clip.inPoint = Number(Math.max(0, origIn + delta).toFixed(2));
            (S.clips[tk] || []).forEach(c => {
              if (c.id !== clip.id && c.start >= origStart + origDur - 0.05) {
                c.start = Number(Math.max(0, baseStarts.get(c.id) - delta).toFixed(2));
              }
            });
          } else {
            const newDur = Math.max(0.2, origDur + dt);
            const delta = newDur - origDur;
            clip.dur = Number(newDur.toFixed(2));
            (S.clips[tk] || []).forEach(c => {
              if (c.id !== clip.id && c.start >= origStart + origDur - 0.05) {
                c.start = Number(Math.max(0, baseStarts.get(c.id) + delta).toFixed(2));
              }
            });
          }
        } else if (trimSide === "l") {
          // Impede que a borda esquerda invada o clipe anterior na mesma faixa
          let prevEnd = 0;
          (S.clips[tk] || []).forEach(c => {
            if (c.id !== clip.id && c.start + c.dur <= origStart + 0.05) {
              if (c.start + c.dur > prevEnd) prevEnd = c.start + c.dur;
            }
          });
          const rawStart = Math.max(prevEnd, Math.min(origStart + origDur - 0.4, origStart + dt));
          const newStart = Math.max(prevEnd, snapTimelineSec(rawStart, clip.id));
          const delta = newStart - origStart;
          clip.start = Number(newStart.toFixed(2));
          clip.dur = Number(Math.max(0.4, origDur - delta).toFixed(2));
          clip.inPoint = Number(Math.max(0, origIn + delta).toFixed(2));
          resolveTrackOverlaps(tk, clip.id);
        } else if (trimSide === "r") {
          const rawEnd = Math.max(origStart + 0.4, origStart + origDur + dt);
          const snappedEnd = snapTimelineSec(rawEnd, clip.id);
          clip.dur = Number(Math.max(0.4, snappedEnd - origStart).toFixed(2));
          resolveTrackOverlaps(tk, clip.id);
        } else {
          // Permite mover entre quaisquer faixas de vídeo (V1..Vn) ou de áudio (A1..An) arrastando verticalmente
          const overEl = document.elementFromPoint(me.clientX, me.clientY);
          const overTrackEl = overEl ? overEl.closest(".tl-track") : null;
          if (overTrackEl) {
            const targetTk = overTrackEl.dataset.track;
            const isVideoPair = isVideoTrack(tk) && isVideoTrack(targetTk);
            const isAudioPair = isAudioTrack(tk) && isAudioTrack(targetTk);
            if ((isVideoPair || isAudioPair) && targetTk !== tk && !S.tracksLocked[targetTk]) {
              const oldTk = tk;
              S.clips[oldTk] = (S.clips[oldTk] || []).filter(c => c.id !== clip.id);
              resolveTrackOverlaps(oldTk);
              clip.track = targetTk;
              ensureTrackExists(targetTk);
              S.clips[targetTk].push(clip);
              tk = targetTk;
              S.selectedClipTrack = targetTk;
              if (isVideoTrack(targetTk)) S.targetVideoTrack = targetTk;
              else S.targetAudioTrack = targetTk;
              el.dataset.tk = targetTk;
              overTrackEl.appendChild(el);
            }
          }

          const rawStart = Math.max(0, origStart + dt);
          clip.start = snapTimelineSecForClip(rawStart, clip.dur, clip.id);
          resolveTrackOverlaps(tk, clip.id);
        }

        syncClipDomPositions(pxPerSecNow);
        setPlayhead(clip.start + (trimSide === "r" ? clip.dur - 0.05 : 0.02), false);
      };

      const onUp = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        hideSnapLine();
        if (isMultiDrag && moved) {
          const tracksToResolve = new Set(selectedList.map(item => item.track));
          tracksToResolve.forEach(t => resolveTrackOverlaps(t));
          recalcSequenceDuration();
          renderTimeline();
          if (S.sideTab === "fx") renderSide();
          return;
        }
        getAllTrackIds().forEach(k => resolveTrackOverlaps(k, k === tk ? clip.id : null));
        recalcSequenceDuration();
        renderTimeline();
        if (S.sideTab === "fx") renderSide();
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    });

    el.addEventListener("dblclick", (ev) => {
      ev.stopPropagation();
      const cid = el.dataset.clip;
      const tk = el.dataset.tk;
      const clip = (S.clips[tk] || []).find(x => x.id === cid);
      if (!clip) return;

      if (!isVideoTrack(tk)) {
        // Inserção interativa de nó de volume (Rubberband Envelope)
        ensureClipRubberband(clip);
        const rect = el.getBoundingClientRect();
        const relX = Math.max(0, Math.min(rect.width, ev.clientX - rect.left));
        const relY = Math.max(0, Math.min(rect.height, ev.clientY - rect.top));
        const offset = Math.max(0.01, Math.min((clip.dur || 1) - 0.01, (relX / Math.max(1, rect.width)) * (clip.dur || 1)));
        const vol = Math.round(Math.max(0, Math.min(150, (1 - (relY / Math.max(1, rect.height))) * 150)));
        clip.rubberband.push({ offset: Number(offset.toFixed(2)), vol });
        clip.rubberband.sort((a, b) => a.offset - b.offset);
        saveUndoSnapshot();
        renderTimeline();
        syncHtmlMediaPlayback();
        toast(`Ponto de volume adicionado: ${vol}% em ${offset.toFixed(2)}s`);
        return;
      }

      S.sideTab = "fx";
      renderSide();
    });
  });

  // Eventos de arrasto e controle dos nós de Rubberband de Áudio
  area.querySelectorAll(".rb-node").forEach(nodeEl => {
    nodeEl.addEventListener("pointerdown", (ev) => {
      if (ev.button !== 0) return;
      ev.stopPropagation();
      const clipId = nodeEl.dataset.clipid;
      const tk = nodeEl.dataset.tk;
      const idx = parseInt(nodeEl.dataset.nodeidx, 10);
      const clip = (S.clips[tk] || []).find(x => x.id === clipId);
      if (!clip || !clip.rubberband || !clip.rubberband[idx]) return;
      ensureClipRubberband(clip);

      // Alt+Clique remove nó intermediário
      if (ev.altKey && idx > 0 && idx < clip.rubberband.length - 1) {
        clip.rubberband.splice(idx, 1);
        saveUndoSnapshot();
        renderTimeline();
        syncHtmlMediaPlayback();
        toast("Ponto de volume removido.");
        return;
      }

      const clipEl = nodeEl.closest(".tl-clip");
      if (!clipEl) return;
      const rect = clipEl.getBoundingClientRect();
      const startY = ev.clientY;
      const startX = ev.clientX;
      const origVol = clip.rubberband[idx].vol;
      const origOffset = clip.rubberband[idx].offset;
      nodeEl.setPointerCapture(ev.pointerId);

      const onNodeMove = (me) => {
        const deltaY = startY - me.clientY;
        const volDelta = (deltaY / Math.max(20, rect.height)) * 150;
        const newVol = Math.round(Math.max(0, Math.min(150, origVol + volDelta)));
        clip.rubberband[idx].vol = newVol;

        if (idx > 0 && idx < clip.rubberband.length - 1) {
          const deltaX = me.clientX - startX;
          const offsetDelta = (deltaX / Math.max(16, rect.width)) * (clip.dur || 1);
          const prevOffset = (clip.rubberband[idx - 1] ? clip.rubberband[idx - 1].offset : 0) + 0.05;
          const nextOffset = (clip.rubberband[idx + 1] ? clip.rubberband[idx + 1].offset : clip.dur) - 0.05;
          clip.rubberband[idx].offset = Math.max(prevOffset, Math.min(nextOffset, origOffset + offsetDelta));
        }

        const sorted = clip.rubberband.slice().sort((a, b) => a.offset - b.offset);
        const pts = sorted.map(n => {
          const nx = Math.max(0, Math.min(100, (n.offset / Math.max(0.01, clip.dur)) * 100));
          const ny = Math.max(6, Math.min(94, 90 - (n.vol / 150) * 80));
          return `${nx.toFixed(1)},${ny.toFixed(1)}`;
        }).join(" ");
        const lineEl = clipEl.querySelector(".rb-line");
        if (lineEl) lineEl.setAttribute("points", pts);

        const ny = Math.max(6, Math.min(94, 90 - (clip.rubberband[idx].vol / 150) * 80));
        const nx = Math.max(0, Math.min(100, (clip.rubberband[idx].offset / Math.max(0.01, clip.dur)) * 100));
        nodeEl.setAttribute("cy", ny.toFixed(1) + "%");
        nodeEl.setAttribute("cx", nx.toFixed(1) + "%");
        nodeEl.setAttribute("title", `Volume: ${newVol}% (${clip.rubberband[idx].offset.toFixed(2)}s)`);

        syncHtmlMediaPlayback();
        updateVUMeterFromTimeline();
      };

      const onNodeUp = () => {
        nodeEl.removeEventListener("pointermove", onNodeMove);
        nodeEl.removeEventListener("pointerup", onNodeUp);
        clip.rubberband.sort((a, b) => a.offset - b.offset);
        saveUndoSnapshot();
        renderTimeline();
      };

      nodeEl.addEventListener("pointermove", onNodeMove);
      nodeEl.addEventListener("pointerup", onNodeUp);
    });

    nodeEl.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const clipId = nodeEl.dataset.clipid;
      const tk = nodeEl.dataset.tk;
      const idx = parseInt(nodeEl.dataset.nodeidx, 10);
      const clip = (S.clips[tk] || []).find(x => x.id === clipId);
      if (!clip || !clip.rubberband || idx <= 0 || idx >= clip.rubberband.length - 1) return;
      clip.rubberband.splice(idx, 1);
      saveUndoSnapshot();
      renderTimeline();
      syncHtmlMediaPlayback();
      toast("Ponto de volume removido.");
    });
  });

  const phEl = document.getElementById("tlPlayhead");
  if (phEl) phEl.style.left = Math.round(S.playhead * pxPerSec) + "px";
}

function splitSpecificClipAt(tk, clipId, cutSec) {
  const arr = S.clips[tk] || [];
  const idx = arr.findIndex(c => c.id === clipId);
  if (idx < 0) return;
  const orig = arr[idx];
  if (cutSec <= orig.start + 0.25 || cutSec >= orig.start + orig.dur - 0.25) {
    toast("Clique mais para o meio do clipe para dividi-lo.");
    return;
  }
  saveUndoSnapshot();
  const firstDur = Number((cutSec - orig.start).toFixed(2));
  const secondDur = Number((orig.dur - firstDur).toFixed(2));
  orig.dur = firstDur;

  const partB = Object.assign({}, orig, {
    id: uid(tk + "_"),
    title: `${orig.title} (Corte B)`,
    start: Number(cutSec.toFixed(2)),
    inPoint: Number(((orig.inPoint || 0) + firstDur * (orig.speed || 1)).toFixed(2)),
    dur: secondDur,
    trans: "Corte Seco"
  });

  arr.splice(idx + 1, 0, partB);
  S.selectedClipId = partB.id;
  S.selectedClipTrack = tk;
  S.selectedClipIds = [partB.id];
  playFoleySound("claquete");
  setPlayhead(cutSec, false);
  renderAll();
  toast(`Clipe dividido em ${fmtSMPTE(cutSec)}!`);
}

function splitClipAtPlayhead() {
  const t = S.playhead;
  // Tenta dividir primeiro o clipe selecionado se a agulha estiver sobre ele
  const sel = getSelectedClip();
  if (sel && t > sel.start + 0.2 && t < sel.start + sel.dur - 0.2) {
    splitSpecificClipAt(sel.track, sel.id, t);
    return;
  }
  // Caso contrário, divide qualquer clipe em qualquer faixa sob a agulha
  for (const tk of getAllTrackIds()) {
    const target = (S.clips[tk] || []).find(c => t > c.start + 0.2 && t < c.start + c.dur - 0.2);
    if (target) {
      splitSpecificClipAt(tk, target.id, t);
      return;
    }
  }
  toast("Posicione a agulha vermelha no meio de um clipe para dividi-lo (Ctrl+K).");
}

function deleteSelectedClip(ripple = false) {
  if (S.selectedGap) {
    rippleDeleteGap(S.selectedGap, ripple);
    return;
  }
  const selectedList = getSelectedClipsList();
  if (!selectedList.length) {
    toast("Selecione um clipe ou espaço vazio na linha do tempo primeiro.");
    return;
  }
  saveUndoSnapshot();

  if (selectedList.length === 1) {
    const sel = selectedList[0].clip;
    const tk = selectedList[0].track;
    const arr = S.clips[tk] || [];
    const idx = arr.findIndex(c => c.id === sel.id);
    if (idx >= 0) {
      const removedStart = sel.start;
      const removedDur = sel.dur;
      arr.splice(idx, 1);
      if (ripple) {
        arr.forEach(c => {
          if (c.start > removedStart) {
            c.start = Number(Math.max(0, c.start - removedDur).toFixed(2));
          }
        });
      }
    }
  } else {
    // Multi-clip delete / ripple delete
    const idsToRemove = new Set(selectedList.map(item => item.clip.id));
    const tracksAffected = new Set(selectedList.map(item => item.track));

    tracksAffected.forEach(tk => {
      const arr = S.clips[tk] || [];
      if (ripple) {
        // Ordena do fim para o início para que o fechamento de ondulação funcione perfeitamente
        const toRemoveOnTk = arr.filter(c => idsToRemove.has(c.id)).sort((a, b) => b.start - a.start);
        toRemoveOnTk.forEach(rem => {
          const remIdx = arr.findIndex(c => c.id === rem.id);
          if (remIdx >= 0) {
            arr.splice(remIdx, 1);
            arr.forEach(c => {
              if (c.start > rem.start) {
                c.start = Number(Math.max(0, c.start - rem.dur).toFixed(2));
              }
            });
          }
        });
      } else {
        S.clips[tk] = arr.filter(c => !idsToRemove.has(c.id));
      }
      resolveTrackOverlaps(tk);
    });
  }

  clearClipSelection();
  recalcSequenceDuration();
  renderAll();
  toast(ripple ? `${selectedList.length} clipe(s) apagado(s) e espaço fechado (Ripple Delete).` : `${selectedList.length} clipe(s) removido(s) da linha do tempo.`);
}

/* ---------- Painel Lateral: Projeto (Bin), Efeitos (FX), Transições, Roteiro e Atalhos ---------- */
function renderSide() {
  const box = document.getElementById("sideContent");
  if (!box) return;

  document.querySelectorAll("[data-stab]").forEach(b => {
    b.setAttribute("aria-pressed", b.dataset.stab === S.sideTab ? "true" : "false");
  });

  if (S.sideTab === "bin") {
    const vTarget = (S.targetVideoTrack || "v1").toUpperCase();
    const aTarget = (S.targetAudioTrack || "a1").toUpperCase();

    // Filtra itens do cesto por pesquisa, categoria e pasta
    const filteredBin = S.mediaBin.filter(m => {
      if (S.binFilter === "video" && m.kind !== "video") return false;
      if (S.binFilter === "audio" && m.kind !== "audio") return false;
      if (S.binFilter === "image" && m.kind !== "image") return false;
      if (S.binFilter === "synth" && m.kind !== "synth") return false;
      if (S.binCurFolder && S.binCurFolder !== "Todas") {
        const fld = m.folder || "Geral";
        if (fld !== S.binCurFolder) return false;
      }
      if (S.binSearch) {
        const q = S.binSearch.toLowerCase();
        return String(m.name || "").toLowerCase().includes(q) || String(m.res || "").toLowerCase().includes(q);
      }
      return true;
    });

    box.innerHTML = `
      <div class="col" style="height:100%;gap:4px">
        <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:3px">
          <b>Janela Projeto (${filteredBin.length}/${S.mediaBin.length})</b>
          <div class="row" style="gap:3px">
            <button type="button" class="btn sm def" data-cmd="importarMidia">+ Importar (Ctrl+I)</button>
            <button type="button" class="btn sm" id="btnAddAllBin" title="Colocar itens em sequência na faixa alvo">+ Colocar Todos</button>
            <button type="button" class="btn sm" data-cmd="gerarSinal">+ Sinal</button>
            <button type="button" class="btn sm" data-cmd="rollCrawlDesigner" title="Roll & Crawl Designer 95 (Créditos / Letreiros)">+ Roll/Crawl</button>
          </div>
        </div>

        <!-- Barra de Busca, Pastas e Alternância de Visualização (Lista / Grade / Storyboard) -->
        <div class="bin-toolbar" style="display:flex;gap:3px;align-items:center;flex-wrap:wrap">
          <input type="text" id="binSearchInput" class="bin-search" style="flex:1;min-width:90px" placeholder="Procurar mídia…" value="${escH(S.binSearch)}">
          <select id="binFolderSel" style="font-size:10px;height:21px" title="Filtrar por Pasta do Projeto">
            ${S.binFolders.map(f => `<option value="${f}"${f === S.binCurFolder ? " selected" : ""}>📁 ${escH(f)}</option>`).join("")}
          </select>
          <button type="button" class="btn sm" id="btnNewBinFolder" title="Criar Nova Pasta no Bin">+📁</button>
          <button type="button" class="btn sm" id="btnToggleBinView" title="Alternar entre Lista, Grade e Modo Storyboard">${S.binView === "list" ? "Lista" : (S.binView === "grid" ? "Grade" : "Storyboard")}</button>
        </div>

        <!-- Abas de Filtro por Categoria -->
        <div class="bin-cat-tabs">
          <button type="button" class="bin-cat-tab${S.binFilter === "all" ? " sel" : ""}" data-bf="all">Todos</button>
          <button type="button" class="bin-cat-tab${S.binFilter === "video" ? " sel" : ""}" data-bf="video">Vídeos</button>
          <button type="button" class="bin-cat-tab${S.binFilter === "audio" ? " sel" : ""}" data-bf="audio">Áudios</button>
          <button type="button" class="bin-cat-tab${S.binFilter === "image" ? " sel" : ""}" data-bf="image">Imagens</button>
          <button type="button" class="bin-cat-tab${S.binFilter === "synth" ? " sel" : ""}" data-bf="synth">Sintéticos</button>
        </div>

        <div class="row" style="justify-content:space-between;background:var(--field);padding:3px 5px;box-shadow:inset 1px 1px var(--lo);font-size:10.5px">
          <label class="row" style="gap:3px">Vídeo Alvo:
            <select id="binTargetVid" style="height:19px;font-size:10.5px">
              ${getVideoTracksBottomUp().map(tk => `<option value="${tk}"${tk === S.targetVideoTrack ? " selected" : ""}>${tk.toUpperCase()}</option>`).join("")}
            </select>
          </label>
          <label class="row" style="gap:3px">Áudio Alvo:
            <select id="binTargetAud" style="height:19px;font-size:10.5px">
              ${S.audioTracks.map(tk => `<option value="${tk}"${tk === S.targetAudioTrack ? " selected" : ""}>${tk.toUpperCase()}</option>`).join("")}
            </select>
          </label>
          <button type="button" class="btn sm" data-cmd="addVideoTrack" title="Criar nova faixa de vídeo">+V</button>
          <button type="button" class="btn sm" data-cmd="addAudioTrack" title="Criar nova faixa de áudio">+A</button>
        </div>

        <!-- Conteúdo do Cesto: Storyboard OU Grade OU Lista Detalhada -->
        ${S.binView === "storyboard" ? `
          <div class="col" style="flex:1;overflow:hidden;gap:4px">
            <div class="row" style="justify-content:space-between;align-items:center;padding:2px 4px;background:#181410;color:#FFE040;font-size:10.5px">
              <span><b>PRANCHA STORYBOARD</b> (Ordene e Monte)</span>
              <button type="button" class="btn sm def" id="btnAssembleStoryboard" title="Insere todos os itens da prancha em sequência na Timeline">[ Montar Ordem na Timeline ]</button>
            </div>
            <div class="storyboard-grid" style="flex:1">
              ${filteredBin.map((m, sbIdx) => {
                const realIdx = S.mediaBin.indexOf(m);
                const isSel = S.srcItem && S.srcItem.id === m.id;
                const thumbHtml = m.thumb ? `<img class="storyboard-thumb" src="${m.thumb}" alt="thumb">` : `<div class="storyboard-thumb" style="display:flex;align-items:center;justify-content:center;background:#000;color:#FFE040;font-weight:bold;font-size:12px">${m.kind.toUpperCase()}</div>`;
                return `
                  <div class="storyboard-card${isSel ? " sel" : ""}" data-binidx="${realIdx}">
                    <span class="storyboard-order">${sbIdx + 1}</span>
                    ${thumbHtml}
                    <div class="storyboard-card-body">
                      <div class="storyboard-card-title">${escH(m.name)}</div>
                      <div class="row" style="justify-content:space-between;align-items:center">
                        <span class="muted" style="font-size:9.5px">${mmss(m.dur || 10)}</span>
                        <div class="row" style="gap:2px">
                          <button type="button" class="btn sm" data-sbmove="left" data-idx="${realIdx}" title="Mover para trás">◄</button>
                          <button type="button" class="btn sm" data-sbmove="right" data-idx="${realIdx}" title="Mover para frente">►</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        ` : (S.binView === "grid" ? `
          <div class="bin-thumb-grid" style="flex:1">
            ${filteredBin.map((m) => {
              const realIdx = S.mediaBin.indexOf(m);
              const isSel = S.srcItem && S.srcItem.id === m.id;
              const badge = m.kind === "audio" ? "WAV" : (m.kind === "image" ? "IMG" : (m.kind === "synth" ? "GEN" : "VID"));
              const thumbHtml = m.thumb ? `<img class="bin-card-thumb" src="${m.thumb}" alt="thumb">` : `<div class="bin-card-thumb" style="display:flex;align-items:center;justify-content:center;background:#000;color:#FFE040;font-weight:bold;font-size:10px">${badge}</div>`;
              return `
                <div class="bin-card${isSel ? " sel" : ""}" data-binidx="${realIdx}" draggable="true">
                  ${thumbHtml}
                  <div class="bin-card-title">${escH(m.name)}</div>
                  <div class="bin-card-meta">${mmss(m.dur || 10)}</div>
                </div>
              `;
            }).join("")}
          </div>
        ` : `
          <div class="bin-list" style="flex:1">
            ${filteredBin.map((m) => {
              const realIdx = S.mediaBin.indexOf(m);
              const isSel = S.srcItem && S.srcItem.id === m.id;
              const badge = m.kind === "audio" ? "WAV" : (m.kind === "image" ? "IMG" : (m.kind === "synth" ? "GEN" : "VID"));
              const tLabel = m.kind === "audio" ? aTarget : vTarget;
              const thumbBox = m.thumb ? `<img class="bin-thumb" src="${m.thumb}" style="object-fit:cover" alt="thumb">` : `<div class="bin-thumb">${badge}</div>`;
              return `<div class="bin-item${isSel ? " sel" : ""}" data-binidx="${realIdx}" draggable="true">
                ${thumbBox}
                <div style="min-width:0;flex:1">
                  <div style="font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escH(m.name)}</div>
                  <div class="muted" style="font-size:10px">${escH(m.res || "Mídia")} · ${mmss(m.dur || 10)}</div>
                </div>
                <div class="col" style="gap:2px">
                  <button type="button" class="btn sm" data-addv1="${realIdx}" title="Adicionar em sequência na faixa alvo (${tLabel})">+ ${tLabel}</button>
                  <button type="button" class="btn sm" data-addv2="${realIdx}" title="Empilhar numa camada/faixa livre na posição da agulha">+ Camada</button>
                </div>
              </div>`;
            }).join("")}
          </div>
        `)}
      </div>`;

    // Eventos de Busca e Filtro de Categoria
    const searchInp = box.querySelector("#binSearchInput");
    if (searchInp) {
      searchInp.oninput = (e) => {
        S.binSearch = e.target.value;
        renderSide();
        const freshInp = box.querySelector("#binSearchInput");
        if (freshInp) {
          freshInp.focus();
          freshInp.selectionStart = freshInp.selectionEnd = freshInp.value.length;
        }
      };
    }

    const btnToggleView = box.querySelector("#btnToggleBinView");
    if (btnToggleView) {
      btnToggleView.onclick = () => {
        if (S.binView === "list") S.binView = "grid";
        else if (S.binView === "grid") S.binView = "storyboard";
        else S.binView = "list";
        renderSide();
      };
    }

    const selFolder = box.querySelector("#binFolderSel");
    if (selFolder) {
      selFolder.onchange = (e) => {
        S.binCurFolder = e.target.value;
        renderSide();
      };
    }

    const btnNewFolder = box.querySelector("#btnNewBinFolder");
    if (btnNewFolder) {
      btnNewFolder.onclick = () => {
        dialog({
          id: "newFolderWin",
          title: "Nova Pasta no Bin",
          width: 340,
          body: `
            <div class="col" style="gap:6px">
              <label class="fld"><span>Nome da Nova Pasta:</span>
                <input type="text" id="bin-folder-input" value="Nova Pasta" style="font-weight:bold">
              </label>
            </div>
          `,
          buttons: [
            {
              label: "OK",
              def: 1,
              run: (w) => {
                const name = w.querySelector("#bin-folder-input")?.value?.trim();
                if (name) {
                  if (!S.binFolders.includes(name)) S.binFolders.push(name);
                  S.binCurFolder = name;
                  renderSide();
                  toast(`Pasta "${name}" criada no Projeto!`);
                }
              }
            },
            { label: "Cancelar" }
          ]
        });
        setTimeout(() => {
          const inp = document.getElementById("bin-folder-input");
          if (inp) { inp.focus(); inp.select(); }
        }, 50);
      };
    }

    const btnAssemble = box.querySelector("#btnAssembleStoryboard");
    if (btnAssemble) {
      btnAssemble.onclick = () => {
        if (!filteredBin.length) { toast("Nenhuma mídia na prancha para montar."); return; }
        saveUndoSnapshot();
        const vTk = S.targetVideoTrack || "v1";
        const aTk = S.targetAudioTrack || "a1";
        let curVTime = 0;
        let curATime = 0;
        // Posição no final da sequência atual
        (S.clips[vTk] || []).forEach(c => { if (c.start + c.dur > curVTime) curVTime = c.start + c.dur; });
        (S.clips[aTk] || []).forEach(c => { if (c.start + c.dur > curATime) curATime = c.start + c.dur; });

        filteredBin.forEach(m => {
          const isAud = m.kind === "audio";
          const tk = isAud ? aTk : vTk;
          const st = isAud ? curATime : curVTime;
          const dur = Math.max(0.5, Number(m.dur) || 5);
          const clip = {
            id: uid(tk + "_"),
            track: tk,
            title: m.name,
            mediaUrl: m.url,
            mediaPath: m.path,
            start: Number(st.toFixed(2)),
            inPoint: 0,
            dur: Number(dur.toFixed(2)),
            speed: 1,
            opacity: 100,
            volume: 100
          };
          ensureTrackExists(tk);
          S.clips[tk].push(clip);
          if (isAud) curATime += dur;
          else curVTime += dur;
        });

        recalcSequenceDuration();
        renderAll();
        toast(`${filteredBin.length} mídias montadas em ordem cronológica na Linha do Tempo!`);
      };
    }

    box.querySelectorAll("[data-sbmove]").forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const idx = +b.dataset.idx;
        const dir = b.dataset.sbmove;
        const targetIdx = dir === "left" ? idx - 1 : idx + 1;
        if (targetIdx >= 0 && targetIdx < S.mediaBin.length) {
          const temp = S.mediaBin[idx];
          S.mediaBin[idx] = S.mediaBin[targetIdx];
          S.mediaBin[targetIdx] = temp;
          renderSide();
        }
      };
    });

    box.querySelectorAll("[data-bf]").forEach(btn => {
      btn.onclick = () => {
        S.binFilter = btn.dataset.bf;
        renderSide();
      };
    });

    const selVid = box.querySelector("#binTargetVid");
    if (selVid) {
      selVid.onchange = (e) => {
        S.targetVideoTrack = e.target.value;
        renderTimeline();
        renderSide();
      };
    }
    const selAud = box.querySelector("#binTargetAud");
    if (selAud) {
      selAud.onchange = (e) => {
        S.targetAudioTrack = e.target.value;
        renderTimeline();
        renderSide();
      };
    }
    const btnAll = box.querySelector("#btnAddAllBin");
    if (btnAll) {
      btnAll.onclick = () => {
        const items = filteredBin.filter(m => m.kind !== "synth" || filteredBin.length <= 4);
        if (!items.length) { toast("Nenhuma mídia corresponde aos filtros."); return; }
        saveUndoSnapshot();
        items.forEach(it => {
          loadIntoSourceMonitor(it);
          const tk = it.kind === "audio" ? (S.targetAudioTrack || "a1") : (S.targetVideoTrack || "v1");
          insertSourceIntoTimeline(tk, "append_or_playhead");
        });
        toast(`${items.length} clipe(s) adicionados em sequência!`);
      };
    }

    box.querySelectorAll("[data-binidx]").forEach(el => {
      const idx = +el.dataset.binidx;
      el.onclick = (e) => {
        if (e.target.closest("button")) return;
        loadIntoSourceMonitor(S.mediaBin[idx]);
        renderSide();
      };
      el.ondblclick = () => {
        const it = S.mediaBin[idx];
        loadIntoSourceMonitor(it);
        insertSourceIntoTimeline(it.kind === "audio" ? (S.targetAudioTrack || "a1") : (S.targetVideoTrack || "v1"), "append_or_playhead");
      };
      el.ondragstart = (ev) => {
        ev.dataTransfer.setData("text/plain", "bin:" + idx);
      };
    });

    box.querySelectorAll("[data-addv1]").forEach(b => {
      b.onclick = () => {
        const it = S.mediaBin[+b.dataset.addv1];
        loadIntoSourceMonitor(it);
        insertSourceIntoTimeline(it.kind === "audio" ? (S.targetAudioTrack || "a1") : (S.targetVideoTrack || "v1"), "append_or_playhead");
      };
    });

    box.querySelectorAll("[data-addv2]").forEach(b => {
      b.onclick = () => {
        const it = S.mediaBin[+b.dataset.addv2];
        loadIntoSourceMonitor(it);
        insertSourceIntoTimeline("overlay", "overwrite");
      };
    });
    return;
  }

  if (S.sideTab === "fx") {
    const clip = getSelectedClip();
    if (!clip) {
      box.innerHTML = `<div class="col"><div class="muted" style="padding:14px;text-align:center;background:var(--field);box-shadow:inset 1px 1px var(--lo)">Clique em qualquer clipe na Linha do Tempo ou no Monitor de Programa para redimensionar, recortar (Crop), girar, animar keyframes, mudar velocidade e aplicar filtros.</div></div>`;
      return;
    }

    const curSX = clip.scaleX != null ? Number(clip.scaleX) : (clip.scale != null ? Number(clip.scale) : 100);
    const curSY = clip.scaleY != null ? Number(clip.scaleY) : (clip.scale != null ? Number(clip.scale) : 100);
    const curRot = Number(clip.rotation) || 0;
    const isUniform = clip.uniformScale !== false;

    box.innerHTML = `
      <div class="fx-rack">
        <div class="row" style="justify-content:space-between">
          <b>Clipe: ${escH(clip.title.slice(0, 24))}</b>
          <span class="chip95">Faixa ${escH(clip.track.toUpperCase())}</span>
        </div>

        <div class="fx-group">
          <b class="lgd">Redimensionar, Posição &amp; Giro (Ou Arraste no Monitor)</b>
          <div class="col" style="gap:4px;margin-top:3px">
            <div class="slider-row">
              <span>Proporção:</span>
              <select id="fx-fit" style="grid-column:2/4">
                <option value="contain"${(!clip.fitMode || clip.fitMode === "contain") ? " selected" : ""}>Ajustar sem Distorcer (Fit)</option>
                <option value="cover"${clip.fitMode === "cover" ? " selected" : ""}>Preencher Tela (Crop Automático)</option>
                <option value="stretch"${clip.fitMode === "stretch" ? " selected" : ""}>Esticar 4:3 (Livre)</option>
                <option value="original"${clip.fitMode === "original" ? " selected" : ""}>Tamanho Real em Pixels (1:1)</option>
              </select>
            </div>
            <div class="slider-row">
              <span>Largura (X):</span>
              <input type="range" id="fx-sclx" min="10" max="300" value="${curSX}">
              <span class="val" id="fx-sclx-v">${curSX}%</span>
            </div>
            <div class="slider-row">
              <span>Altura (Y):</span>
              <input type="range" id="fx-scly" min="10" max="300" value="${curSY}">
              <span class="val" id="fx-scly-v">${curSY}%</span>
            </div>
            <div class="row" style="justify-content:space-between">
              <label class="row"><input type="checkbox" id="fx-uni"${isUniform ? " checked" : ""}> Vincular Largura × Altura</label>
              <span class="muted" style="font-size:10px">Dica: use a roda do mouse no monitor</span>
            </div>
            <div class="slider-row">
              <span>Posição X:</span>
              <input type="range" id="fx-px" min="-320" max="320" value="${clip.posX || 0}">
              <span class="val" id="fx-px-v">${clip.posX || 0}</span>
            </div>
            <div class="slider-row">
              <span>Posição Y:</span>
              <input type="range" id="fx-py" min="-240" max="240" value="${clip.posY || 0}">
              <span class="val" id="fx-py-v">${clip.posY || 0}</span>
            </div>
            <div class="slider-row">
              <span>Rotação:</span>
              <input type="range" id="fx-rot" min="-180" max="180" value="${curRot}">
              <span class="val" id="fx-rot-v">${curRot}°</span>
            </div>
            <div class="slider-row">
              <span>Opacidade:</span>
              <input type="range" id="fx-opa" min="10" max="100" value="${clip.opacity == null ? 100 : clip.opacity}">
              <span class="val" id="fx-opa-v">${clip.opacity == null ? 100 : clip.opacity}%</span>
            </div>
            <div class="slider-row">
              <span>Movimento:</span>
              <select id="fx-mot" style="grid-column:2/4">
                <option value="none"${(!clip.motionPreset || clip.motionPreset === "none") ? " selected" : ""}>Estático (Fixo)</option>
                <option value="zoom_in"${clip.motionPreset === "zoom_in" ? " selected" : ""}>Zoom In Suave (Ken Burns)</option>
                <option value="zoom_out"${clip.motionPreset === "zoom_out" ? " selected" : ""}>Zoom Out Suave</option>
                <option value="pan_lr"${clip.motionPreset === "pan_lr" ? " selected" : ""}>Panorâmica Esq → Dir</option>
                <option value="pan_rl"${clip.motionPreset === "pan_rl" ? " selected" : ""}>Panorâmica Dir → Esq</option>
                <option value="slide_in"${clip.motionPreset === "slide_in" ? " selected" : ""}>Entrada Lateral Rápida</option>
                <option value="spin"${clip.motionPreset === "spin" ? " selected" : ""}>Giro 360° (Spin 95)</option>
                <option value="3d_spin_y"${clip.motionPreset === "3d_spin_y" ? " selected" : ""}>Giro 3D no Espaço (Tumble Y)</option>
                <option value="3d_spin_x"${clip.motionPreset === "3d_spin_x" ? " selected" : ""}>Cambalhota 3D (Flip X)</option>
                <option value="3d_cube_spin"${clip.motionPreset === "3d_cube_spin" ? " selected" : ""}>Cubo 3D Rotativo</option>
                <option value="3d_page_peel"${clip.motionPreset === "3d_page_peel" ? " selected" : ""}>Virada de Página 3D (Page Peel)</option>
              </select>
            </div>
            <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:3px;margin-top:2px">
              <label class="row"><input type="checkbox" id="fx-fh"${clip.flipH ? " checked" : ""}> Espelhar H</label>
              <label class="row"><input type="checkbox" id="fx-fv"${clip.flipV ? " checked" : ""}> Espelhar V</label>
              <button type="button" class="btn sm" id="fx-center">Centralizar</button>
              <button type="button" class="btn sm" id="fx-pip">PiP Canto</button>
              <button type="button" class="btn sm" id="fx-reset">Resetar</button>
            </div>
          </div>
        </div>

        <!-- Efeitos Digitais 3D (DVE 1995 — Ampex ADO / Video Toaster) -->
        <div class="fx-group">
          <div class="row" style="justify-content:space-between;align-items:center">
            <b class="lgd">Efeitos Digitais 3D (DVE 1995)</b>
            <button type="button" class="btn sm" id="btnOpen3DDVE">Console 3D…</button>
          </div>
          <div class="col" style="gap:3px;margin-top:3px">
            <div class="slider-row">
              <span>Giro 3D (Y):</span>
              <input type="range" id="fx-rot-y" min="-180" max="180" value="${clip.rotY || 0}">
              <span class="val" id="fx-rot-y-v">${clip.rotY || 0}°</span>
            </div>
            <div class="slider-row">
              <span>Inclinar 3D (X):</span>
              <input type="range" id="fx-rot-x" min="-180" max="180" value="${clip.rotX || 0}">
              <span class="val" id="fx-rot-x-v">${clip.rotX || 0}°</span>
            </div>
            <div class="slider-row">
              <span>Profundidade (Z):</span>
              <input type="range" id="fx-depth-z" min="-300" max="300" value="${clip.depthZ || 0}">
              <span class="val" id="fx-depth-z-v">${clip.depthZ || 0}px</span>
            </div>
            <div class="row" style="flex-wrap:wrap;gap:6px;margin-top:2px;font-size:11px">
              <label class="row"><input type="checkbox" id="fx-3d-bevel"${clip.dve3dBevel ? " checked" : ""}> Moldura 3D PiP</label>
              <label class="row"><input type="checkbox" id="fx-3d-anaglyph"${clip.anaglyph3D ? " checked" : ""}> Óculos 3D</label>
              <label class="row"><input type="checkbox" id="fx-crt-scan"${clip.scanlinesCRT ? " checked" : ""}> Scanlines CRT</label>
              <label class="row"><input type="checkbox" id="fx-vhs-noise"${clip.vhsGlitch ? " checked" : ""}> Ruído VHS</label>
            </div>
          </div>
        </div>

        <!-- Fades Suaves (Fade In / Fade Out) -->
        <div class="fx-group">
          <b class="lgd">Esmaecimento Suave (Fade In / Fade Out)</b>
          <div class="col" style="gap:3px;margin-top:3px">
            <div class="slider-row">
              <span>Fade In (s):</span>
              <input type="range" id="fx-fadein" min="0" max="5" step="0.1" value="${clip.fadeIn || 0}">
              <span class="val" id="fx-fadein-v">${clip.fadeIn || 0}s</span>
            </div>
            <div class="slider-row">
              <span>Fade Out (s):</span>
              <input type="range" id="fx-fadeout" min="0" max="5" step="0.1" value="${clip.fadeOut || 0}">
              <span class="val" id="fx-fadeout-v">${clip.fadeOut || 0}s</span>
            </div>
          </div>
        </div>

        <!-- Modos de Mesclagem, Temperatura & Correção de Cor -->
        <div class="fx-group">
          <b class="lgd">Mesclagem &amp; Cor Profissional</b>
          <div class="col" style="gap:3px;margin-top:3px">
            <div class="slider-row">
              <span>Mesclagem:</span>
              <select id="fx-blend" style="grid-column:2/4">
                <option value="normal"${(!clip.blendMode || clip.blendMode === "normal") ? " selected" : ""}>Normal (Opaco)</option>
                <option value="multiply"${clip.blendMode === "multiply" ? " selected" : ""}>Multiplicar (Multiply)</option>
                <option value="screen"${clip.blendMode === "screen" ? " selected" : ""}>Tela (Screen)</option>
                <option value="overlay"${clip.blendMode === "overlay" ? " selected" : ""}>Sobrepor (Overlay)</option>
                <option value="lighter"${clip.blendMode === "lighter" ? " selected" : ""}>Adicionar (Lighter)</option>
                <option value="difference"${clip.blendMode === "difference" ? " selected" : ""}>Diferença (Inversão)</option>
                <option value="hard-light"${clip.blendMode === "hard-light" ? " selected" : ""}>Luz Direta (Hard-Light)</option>
              </select>
            </div>
            <div class="slider-row">
              <span>Temperatura:</span>
              <input type="range" id="fx-temp" min="-100" max="100" value="${clip.temp || 0}">
              <span class="val" id="fx-temp-v">${(clip.temp || 0) > 0 ? `+${clip.temp} K` : `${clip.temp || 0} K`}</span>
            </div>
            <div class="slider-row">
              <span>Tonalidade (Tint):</span>
              <input type="range" id="fx-tint" min="-100" max="100" value="${clip.tint || 0}">
              <span class="val" id="fx-tint-v">${clip.tint || 0}</span>
            </div>
            <div class="row" style="gap:4px;align-items:center;margin-top:2px">
              <label class="row"><input type="checkbox" id="fx-chroma"${clip.chromaKey ? " checked" : ""}> Chroma Key</label>
              <select id="fx-chroma-color" style="height:19px;font-size:10px">
                <option value="green"${(!clip.chromaColor || clip.chromaColor === "green") ? " selected" : ""}>Verde</option>
                <option value="blue"${clip.chromaColor === "blue" ? " selected" : ""}>Azul</option>
              </select>
              <button type="button" class="btn sm" id="btnOpenChromaInProps" title="Ajustes avançados de tolerância, limiar, despill e canal Alpha">Processador…</button>
            </div>
          </div>
        </div>

        <!-- Título Animado / Chyron (se o clipe contiver texto) -->
        ${clip.text ? `
          <div class="fx-group">
            <b class="lgd">Animação de Título / Chyron 95</b>
            <div class="col" style="gap:3px;margin-top:3px">
              <div class="slider-row">
                <span>Estilo:</span>
                <select id="fx-chyron" style="grid-column:2/4">
                  <option value="static"${(!clip.chyronType || clip.chyronType === "static") ? " selected" : ""}>Estático (Cartela Fixa)</option>
                  <option value="crawl"${clip.chyronType === "crawl" ? " selected" : ""}>Letreiro Rotativo (Crawl Horizontal)</option>
                  <option value="roll"${clip.chyronType === "roll" ? " selected" : ""}>Créditos Rolantes (Roll Vertical)</option>
                  <option value="blink"${clip.chyronType === "blink" ? " selected" : ""}>Piscante 1995 (Blink)</option>
                </select>
              </div>
            </div>
          </div>
        ` : ""}

        <!-- Quadros-Chave / Animação de Propriedades (Keyframing Premiere 4.2) -->
        <div class="fx-group">
          <b class="lgd">Quadros-Chave (Keyframes Premiere)</b>
          <div class="col" style="gap:4px;margin-top:3px">
            <div class="row" style="justify-content:space-between;align-items:center">
              <select id="kf-prop-sel" style="flex:1;height:21px;font-size:11px">
                <option value="opacity">Opacidade (opacity)</option>
                <option value="scaleX">Escala Largura (scaleX)</option>
                <option value="scaleY">Escala Altura (scaleY)</option>
                <option value="posX">Posição X (posX)</option>
                <option value="posY">Posição Y (posY)</option>
                <option value="rotation">Rotação (rotation)</option>
                <option value="volume">Volume de Áudio (volume)</option>
              </select>
            </div>
            <div class="row" style="justify-content:space-between;gap:2px">
              <button type="button" class="btn sm" id="kf-prev" title="Pular para keyframe anterior">&lt; Anterior</button>
              <button type="button" class="btn sm def" id="kf-add" title="Marcar ou atualizar keyframe no tempo da agulha">◇ Marcar Keyframe</button>
              <button type="button" class="btn sm" id="kf-next" title="Pular para próximo keyframe">Próximo &gt;</button>
              <button type="button" class="btn sm" id="kf-del" title="Excluir keyframe no tempo atual">✕ Excluir</button>
            </div>
            <div class="kf-strip" id="kf-strip-box"></div>
          </div>
        </div>

        <div class="fx-group">
          <b class="lgd">Recorte de Bordas (Crop Premiere)</b>
          <div class="col" style="gap:3px;margin-top:3px">
            <div class="slider-row">
              <span>Esquerda:</span>
              <input type="range" id="fx-cl" min="0" max="45" value="${clip.cropLeft || 0}">
              <span class="val" id="fx-cl-v">${clip.cropLeft || 0}%</span>
            </div>
            <div class="slider-row">
              <span>Direita:</span>
              <input type="range" id="fx-cr" min="0" max="45" value="${clip.cropRight || 0}">
              <span class="val" id="fx-cr-v">${clip.cropRight || 0}%</span>
            </div>
            <div class="slider-row">
              <span>Topo:</span>
              <input type="range" id="fx-ct" min="0" max="45" value="${clip.cropTop || 0}">
              <span class="val" id="fx-ct-v">${clip.cropTop || 0}%</span>
            </div>
            <div class="slider-row">
              <span>Base:</span>
              <input type="range" id="fx-cb" min="0" max="45" value="${clip.cropBottom || 0}">
              <span class="val" id="fx-cb-v">${clip.cropBottom || 0}%</span>
            </div>
          </div>
        </div>

        <div class="fx-group">
          <b class="lgd">Tempo, Velocidade &amp; Áudio</b>
          <div class="col" style="gap:4px;margin-top:3px">
            <div class="slider-row">
              <span>Início (s):</span>
              <input type="number" id="fx-start" step="0.5" min="0" value="${clip.start}">
              <span class="val">${mmss(clip.start)}</span>
            </div>
            <div class="slider-row">
              <span>Duração (s):</span>
              <input type="number" id="fx-dur" step="0.5" min="0.5" value="${clip.dur}">
              <span class="val">${clip.dur}s</span>
            </div>
            <div class="slider-row">
              <span>Velocidade:</span>
              <select id="fx-speed">
                ${[[0.25, "0.25x (Câmera Lenta)"], [0.5, "0.5x (Meia Velocidade)"], [1, "1.0x (Normal)"], [1.5, "1.5x (Rápido)"], [2, "2.0x (Dobro)"], [4, "4.0x (Ultra Rápido)"]].map(([v, l]) =>
                  `<option value="${v}"${(clip.speed || 1) === v ? " selected" : ""}>${l}</option>`
                ).join("")}
              </select>
              <span class="val">${clip.speed || 1}x</span>
            </div>
            <div class="slider-row">
              <span>Volume:</span>
              <input type="range" id="fx-vol" min="0" max="200" value="${clip.volume == null ? 100 : clip.volume}">
              <span class="val" id="fx-vol-v">${clip.volume == null ? 100 : clip.volume}%</span>
            </div>
          </div>
        </div>

        <div class="fx-group">
          <b class="lgd">Cor, Luz &amp; Filtro Premiere 95</b>
          <div class="col" style="gap:4px;margin-top:3px">
            <div class="slider-row">
              <span>Filtro Clipe:</span>
              <select id="fx-flt" style="grid-column:2/4">
                <option value="none"${(!clip.filter || clip.filter === "none") ? " selected" : ""}>Nenhum (Usar Master)</option>
                <option value="mosaic"${clip.filter === "mosaic" ? " selected" : ""}>Mosaico de Censura MTV</option>
                <option value="posterize"${clip.filter === "posterize" ? " selected" : ""}>Posterização 8-bit Pop</option>
                <option value="solarize"${clip.filter === "solarize" ? " selected" : ""}>Solarização Sabattier 1995</option>
                <option value="vhs"${clip.filter === "vhs" ? " selected" : ""}>VHS Caseiro 1995 (OSD)</option>
                <option value="16mm"${clip.filter === "16mm" ? " selected" : ""}>Película Cinema 16mm</option>
                <option value="tv95"${clip.filter === "tv95" ? " selected" : ""}>TV CRT Scanlines</option>
                <option value="pb"${clip.filter === "pb" ? " selected" : ""}>Preto &amp; Branco</option>
                <option value="sepia"${clip.filter === "sepia" ? " selected" : ""}>Memória Sépia</option>
                <option value="noturno"${clip.filter === "noturno" ? " selected" : ""}>Visão Noturna</option>
                <option value="invert"${clip.filter === "invert" ? " selected" : ""}>Negativo (Inverter)</option>
                <option value="vignette"${clip.filter === "vignette" ? " selected" : ""}>Vinheta 35mm</option>
                <option value="glow"${clip.filter === "glow" ? " selected" : ""}>Brilho Difuso Anos 90</option>
                <option value="blur"${clip.filter === "blur" ? " selected" : ""}>Desfoque Suave</option>
                <option value="duotone"${clip.filter === "duotone" ? " selected" : ""}>Bicolor Cyan/Âmbar</option>
                <option value="filmborder"${clip.filter === "filmborder" ? " selected" : ""}>Borda de Película 35mm</option>
              </select>
            </div>
            <div class="slider-row">
              <span>Matiz (Hue):</span>
              <input type="range" id="fx-hue" min="-180" max="180" value="${clip.hue || 0}">
              <span class="val" id="fx-hue-v">${clip.hue || 0}°</span>
            </div>
            <div class="slider-row">
              <span>Brilho:</span>
              <input type="range" id="fx-bri" min="-80" max="80" value="${clip.brightness || 0}">
              <span class="val" id="fx-bri-v">${clip.brightness || 0}</span>
            </div>
            <div class="slider-row">
              <span>Contraste:</span>
              <input type="range" id="fx-con" min="-80" max="80" value="${clip.contrast || 0}">
              <span class="val" id="fx-con-v">${clip.contrast || 0}</span>
            </div>
            <div class="slider-row">
              <span>Saturação:</span>
              <input type="range" id="fx-sat" min="0" max="250" value="${clip.saturation == null ? 100 : clip.saturation}">
              <span class="val" id="fx-sat-v">${clip.saturation == null ? 100 : clip.saturation}%</span>
            </div>
          </div>
        </div>
      </div>`;

    const bindRange = (id, prop, suffix = "") => {
      const el = box.querySelector("#" + id);
      const vEl = box.querySelector("#" + id + "-v");
      if (!el) return;
      el.oninput = () => {
        clip[prop] = +el.value;
        if (vEl) vEl.textContent = el.value + suffix;
        renderMonitorFrame();
      };
    };

    const sclXEl = box.querySelector("#fx-sclx");
    const sclYEl = box.querySelector("#fx-scly");
    const sclXV = box.querySelector("#fx-sclx-v");
    const sclYV = box.querySelector("#fx-scly-v");
    const uniChk = box.querySelector("#fx-uni");

    uniChk.onchange = () => { clip.uniformScale = uniChk.checked; };
    sclXEl.oninput = () => {
      clip.scaleX = +sclXEl.value;
      clip.scale = clip.scaleX;
      if (sclXV) sclXV.textContent = sclXEl.value + "%";
      if (uniChk.checked) {
        clip.scaleY = clip.scaleX;
        sclYEl.value = sclXEl.value;
        if (sclYV) sclYV.textContent = sclXEl.value + "%";
      }
      renderMonitorFrame();
    };
    sclYEl.oninput = () => {
      clip.scaleY = +sclYEl.value;
      if (sclYV) sclYV.textContent = sclYEl.value + "%";
      if (uniChk.checked) {
        clip.scaleX = clip.scaleY;
        clip.scale = clip.scaleY;
        sclXEl.value = sclYEl.value;
        if (sclXV) sclXV.textContent = sclYEl.value + "%";
      }
      renderMonitorFrame();
    };

    bindRange("fx-vol", "volume", "%");
    bindRange("fx-fadein", "fadeIn", "s");
    bindRange("fx-fadeout", "fadeOut", "s");
    bindRange("fx-temp", "temp", " K");
    bindRange("fx-tint", "tint", "");
    bindRange("fx-bri", "brightness", "");
    bindRange("fx-con", "contrast", "");
    bindRange("fx-sat", "saturation", "%");
    bindRange("fx-opa", "opacity", "%");
    bindRange("fx-px", "posX", "");
    bindRange("fx-py", "posY", "");
    bindRange("fx-rot", "rotation", "°");
    bindRange("fx-rot-y", "rotY", "°");
    bindRange("fx-rot-x", "rotX", "°");
    bindRange("fx-depth-z", "depthZ", "px");
    const btnDVE = box.querySelector("#btnOpen3DDVE");
    if (btnDVE) btnDVE.onclick = () => open3DDVEConsole(clip);
    const chkBev = box.querySelector("#fx-3d-bevel");
    if (chkBev) chkBev.onchange = (e) => { clip.dve3dBevel = e.target.checked; renderMonitorFrame(); };
    const chkAna = box.querySelector("#fx-3d-anaglyph");
    if (chkAna) chkAna.onchange = (e) => { clip.anaglyph3D = e.target.checked; renderMonitorFrame(); };
    const chkCrt = box.querySelector("#fx-crt-scan");
    if (chkCrt) chkCrt.onchange = (e) => { clip.scanlinesCRT = e.target.checked; renderMonitorFrame(); };
    const chkVhs = box.querySelector("#fx-vhs-noise");
    if (chkVhs) chkVhs.onchange = (e) => { clip.vhsGlitch = e.target.checked; renderMonitorFrame(); };
    bindRange("fx-cl", "cropLeft", "%");
    bindRange("fx-cr", "cropRight", "%");
    bindRange("fx-ct", "cropTop", "%");
    bindRange("fx-cb", "cropBottom", "%");

    const blendSel = box.querySelector("#fx-blend");
    if (blendSel) {
      blendSel.onchange = (e) => { clip.blendMode = e.target.value; renderMonitorFrame(); };
    }
    const chromaChk = box.querySelector("#fx-chroma");
    if (chromaChk) {
      chromaChk.onchange = (e) => { clip.chromaKey = e.target.checked; renderMonitorFrame(); };
    }
    const chromaCol = box.querySelector("#fx-chroma-color");
    if (chromaCol) {
      chromaCol.onchange = (e) => { clip.chromaColor = e.target.value; renderMonitorFrame(); };
    }
    const btnChromaModal = box.querySelector("#btnOpenChromaInProps");
    if (btnChromaModal) {
      btnChromaModal.onclick = () => openChromaKeyDialog(clip);
    }
    bindRange("fx-hue", "hue", "°");
    const chyronSel = box.querySelector("#fx-chyron");
    if (chyronSel) {
      chyronSel.onchange = (e) => { clip.chyronType = e.target.value; renderMonitorFrame(); };
    }

    // Gerenciador de Quadros-Chave (Keyframing Engine)
    const kfPropSel = box.querySelector("#kf-prop-sel");
    const kfStripBox = box.querySelector("#kf-strip-box");
    const renderKfStrip = () => {
      if (!kfStripBox || !kfPropSel) return;
      const prop = kfPropSel.value;
      const list = (clip.keyframes && clip.keyframes[prop]) ? clip.keyframes[prop] : [];
      if (!list.length) {
        kfStripBox.innerHTML = '<span class="muted" style="font-size:10px">Nenhum keyframe nesta propriedade. Clique em [◇ Marcar Keyframe].</span>';
        return;
      }
      kfStripBox.innerHTML = list.map(k => `
        <span class="kf-tag" data-kt="${k.time}" title="Clique para ir até este keyframe">
          ${k.time.toFixed(1)}s: <b>${Math.round(k.value)}</b>
        </span>
      `).join("");
      kfStripBox.querySelectorAll("[data-kt]").forEach(tag => {
        tag.onclick = () => {
          const kt = +tag.dataset.kt;
          setPlayhead(clip.start + kt / (clip.speed || 1), false);
        };
      });
    };
    renderKfStrip();

    if (kfPropSel) kfPropSel.onchange = renderKfStrip;

    const bKfAdd = box.querySelector("#kf-add");
    if (bKfAdd) {
      bKfAdd.onclick = () => {
        const prop = kfPropSel.value;
        const localSec = Math.max(0, Math.min(clip.dur, (S.playhead - clip.start) * (clip.speed || 1) + (clip.inPoint || 0)));
        let curVal = 0;
        if (prop === "opacity") curVal = clip.opacity == null ? 100 : Number(clip.opacity);
        else if (prop === "scaleX") curVal = clip.scaleX != null ? Number(clip.scaleX) : 100;
        else if (prop === "scaleY") curVal = clip.scaleY != null ? Number(clip.scaleY) : 100;
        else if (prop === "posX") curVal = Number(clip.posX) || 0;
        else if (prop === "posY") curVal = Number(clip.posY) || 0;
        else if (prop === "rotation") curVal = Number(clip.rotation) || 0;
        else if (prop === "volume") curVal = clip.volume == null ? 100 : Number(clip.volume);

        saveUndoSnapshot();
        if (!clip.keyframes) clip.keyframes = {};
        if (!clip.keyframes[prop]) clip.keyframes[prop] = [];
        const existing = clip.keyframes[prop].find(k => Math.abs(k.time - localSec) < 0.05);
        if (existing) {
          existing.value = curVal;
        } else {
          clip.keyframes[prop].push({ time: Number(localSec.toFixed(2)), value: curVal, ease: "smooth" });
          clip.keyframes[prop].sort((a, b) => a.time - b.time);
        }
        renderKfStrip();
        renderMonitorFrame();
        toast(`Keyframe de ${prop} (${Math.round(curVal)}) marcado em ${localSec.toFixed(2)}s!`);
      };
    }

    const bKfDel = box.querySelector("#kf-del");
    if (bKfDel) {
      bKfDel.onclick = () => {
        const prop = kfPropSel.value;
        if (!clip.keyframes || !clip.keyframes[prop] || !clip.keyframes[prop].length) return;
        const localSec = Math.max(0, Math.min(clip.dur, (S.playhead - clip.start) * (clip.speed || 1) + (clip.inPoint || 0)));
        saveUndoSnapshot();
        clip.keyframes[prop] = clip.keyframes[prop].filter(k => Math.abs(k.time - localSec) >= 0.08);
        renderKfStrip();
        renderMonitorFrame();
        toast(`Keyframe removido.`);
      };
    }

    const bKfPrev = box.querySelector("#kf-prev");
    if (bKfPrev) {
      bKfPrev.onclick = () => {
        const prop = kfPropSel.value;
        const list = (clip.keyframes && clip.keyframes[prop]) ? clip.keyframes[prop] : [];
        if (!list.length) return;
        const localSec = (S.playhead - clip.start) * (clip.speed || 1) + (clip.inPoint || 0);
        const prev = [...list].reverse().find(k => k.time < localSec - 0.05);
        if (prev) setPlayhead(clip.start + prev.time / (clip.speed || 1), false);
      };
    }

    const bKfNext = box.querySelector("#kf-next");
    if (bKfNext) {
      bKfNext.onclick = () => {
        const prop = kfPropSel.value;
        const list = (clip.keyframes && clip.keyframes[prop]) ? clip.keyframes[prop] : [];
        if (!list.length) return;
        const localSec = (S.playhead - clip.start) * (clip.speed || 1) + (clip.inPoint || 0);
        const next = list.find(k => k.time > localSec + 0.05);
        if (next) setPlayhead(clip.start + next.time / (clip.speed || 1), false);
      };
    }

    box.querySelector("#fx-fit").onchange = (e) => {
      clip.fitMode = e.target.value;
      renderMonitorFrame();
    };
    box.querySelector("#fx-mot").onchange = (e) => {
      clip.motionPreset = e.target.value;
      renderMonitorFrame();
    };
    box.querySelector("#fx-start").onchange = (e) => {
      saveUndoSnapshot();
      clip.start = Math.max(0, +e.target.value || 0);
      resolveTrackOverlaps(clip.track, clip.id);
      recalcSequenceDuration();
      renderTimeline(); renderMonitorFrame();
    };
    box.querySelector("#fx-dur").onchange = (e) => {
      saveUndoSnapshot();
      clip.dur = Math.max(0.5, +e.target.value || 1);
      resolveTrackOverlaps(clip.track, clip.id);
      recalcSequenceDuration();
      renderTimeline(); renderMonitorFrame();
    };
    box.querySelector("#fx-speed").onchange = (e) => {
      saveUndoSnapshot();
      clip.speed = +e.target.value || 1;
      resolveTrackOverlaps(clip.track, clip.id);
      recalcSequenceDuration();
      renderTimeline(); renderMonitorFrame();
    };
    box.querySelector("#fx-flt").onchange = (e) => {
      clip.filter = e.target.value;
      renderMonitorFrame();
    };
    box.querySelector("#fx-fh").onchange = (e) => { clip.flipH = e.target.checked; renderMonitorFrame(); };
    box.querySelector("#fx-fv").onchange = (e) => { clip.flipV = e.target.checked; renderMonitorFrame(); };

    box.querySelector("#fx-center").onclick = () => {
      saveUndoSnapshot();
      clip.posX = 0; clip.posY = 0; clip.rotation = 0;
      renderSide(); renderMonitorFrame();
    };
    box.querySelector("#fx-pip").onclick = () => {
      saveUndoSnapshot();
      clip.scale = 42; clip.scaleX = 42; clip.scaleY = 42; clip.posX = 155; clip.posY = -110;
      renderSide(); renderMonitorFrame();
      toast("Preset Picture-in-Picture aplicado no canto superior direito!");
    };
    box.querySelector("#fx-reset").onclick = () => {
      saveUndoSnapshot();
      Object.assign(clip, {
        brightness: 0, contrast: 0, saturation: 100, opacity: 100,
        scale: 100, scaleX: 100, scaleY: 100, uniformScale: true, fitMode: "contain",
        posX: 0, posY: 0, rotation: 0, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0,
        motionPreset: "none", flipH: false, flipV: false, filter: "none", speed: 1,
        fadeIn: 0, fadeOut: 0, temp: 0, tint: 0, blendMode: "normal", chromaKey: false, keyframes: {}
      });
      renderSide(); renderMonitorFrame();
    };
    return;
  }

  if (S.sideTab === "trans") {
    const clip = getSelectedClip();
    const transitions = [
      ["Corte Seco", "Mudança imediata sem efeito entre os planos."],
      ["Fusão Cruzada (Dissolve)", "Mistura gradual entre o plano anterior e o atual."],
      ["Fade do Preto", "Surge gradualmente a partir da tela preta."],
      ["Fade do Branco", "Surge a partir de um clarão branco de película."],
      ["Cortina Horizontal (Wipe)", "Revela o novo plano da esquerda para a direita."],
      ["Cortina Vertical", "Revela o novo plano de cima para baixo."],
      ["Cortina Diagonal", "Varredura diagonal do canto superior para o inferior."],
      ["Porta Dupla (Barn Doors)", "Abre do centro para as duas laterais simultaneamente."],
      ["Veneziana (Blinds)", "Fatias horizontais abrem revelando o novo plano."],
      ["Empurrar Horizontal", "Novo plano empurra o anterior da direita para a esquerda."],
      ["Empurrar Vertical", "Novo plano empurra o anterior de cima para baixo."],
      ["Íris Central (Iris Box)", "Abre um quadro retangular do centro para as bordas."],
      ["Íris Circular", "Abre um círculo expansivo a partir do centro."],
      ["Íris Diamante (Iris Diamond)", "Abertura expansiva em formato de diamante / losango a partir do centro."],
      ["Virada de Página 3D (Page Peel)", "Efeito clássico de folhear a página enrolando a ponta do vídeo com verso metálico."],
      ["Cubo 3D Giratório (Cube Spin 3D)", "Giro espacial tridimensional de 90° entre duas faces adjacentes de um cubo."],
      ["Mosaico Explosivo (Block Dissolve 95)", "Desintegração digital do plano em mosaico de 16x16 blocos com queda pseudo-aleatória."],
      ["Varredura de Relógio 360° (Clock Wipe)", "Varredura radial no sentido horário como os ponteiros de um relógio."],
      ["Persianas Verticais (Vertical Blinds)", "Fatias verticais que giram revelando o novo plano."],
      ["Zoom Dissolve", "Aproximação com dissolução óptica gradual."],
      ["Strobe / Flash Cut", "Clarão estroboscópico de corte rápido."],
      ["Xadrez (Checkerboard)", "Revela o plano em blocos alternados de tabuleiro de xadrez."]
    ];
    box.innerHTML = `
      <div class="col">
        <b>Paleta de Transições Adobe Premiere 95</b>
        <div class="muted" style="font-size:10.5px">${clip ? `Aplicando ao clipe selecionado: <b>${escH(clip.title)}</b>` : "Selecione um clipe na faixa V1 para aplicar uma transição de entrada."}</div>
        <div class="col" style="gap:4px">
          ${transitions.map(([tName, tDesc]) => {
            const active = clip && (clip.trans || "Corte Seco") === tName;
            return `<div class="row" style="background:var(--field);padding:5px;justify-content:space-between;box-shadow:inset 1px 1px var(--lo)">
              <div style="flex:1">
                <b>${escH(tName)}</b>
                <div class="muted" style="font-size:10px">${escH(tDesc)}</div>
              </div>
              <button type="button" class="btn sm${active ? " def" : ""}" data-applytrans="${escH(tName)}">${active ? "Ativa" : "Aplicar"}</button>
            </div>`;
          }).join("")}
        </div>
      </div>`;

    box.querySelectorAll("[data-applytrans]").forEach(b => {
      b.onclick = () => {
        const target = getSelectedClip() || S.clips.v1[0];
        if (!target) { toast("Adicione ou selecione um clipe na faixa V1 primeiro."); return; }
        saveUndoSnapshot();
        target.trans = b.dataset.applytrans;
        target.transDur = 1.4;
        setPlayhead(target.start + 0.4, false);
        renderAll();
        toast(`Transição "${target.trans}" aplicada!`);
      };
    });
    return;
  }

  if (S.sideTab === "roteiro" || S.sideTab === "cenas") {
    renderScriptRoomIntegrationTab(box);
    return;
  }

  if (S.sideTab === "audio") {
    const pads = [
      ["bip", "Bip 1kHz Calibração"],
      ["claquete", "Claquete Mecânica"],
      ["alarme", "Alarme de Emergência"],
      ["tiro", "Estampido / Impacto Seco"],
      ["acorde", "Trilha Synth Grave 95"],
      ["impacto", "Batida de Porta / Trovão"]
    ];
    box.innerHTML = `
      <div class="col">
        <div class="row" style="justify-content:space-between">
          <b>Mesa de Áudio &amp; Foley 16-bit</b>
          <button type="button" class="btn sm rec" data-cmd="gravadorADR">● Gravar Microfone</button>
        </div>
        <div class="col" style="gap:4px">
          ${pads.map(([id, lbl]) => `
            <div class="row" style="background:var(--field);padding:4px 6px;justify-content:space-between;box-shadow:inset 1px 1px var(--lo)">
              <b>${escH(lbl)}</b>
              <div class="row" style="gap:3px">
                <button type="button" class="btn sm" data-fplay="${id}">► Ouvir</button>
                <button type="button" class="btn sm" data-fins="${id}|${escH(lbl)}">+ Faixa A2</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>`;
    box.querySelectorAll("[data-fplay]").forEach(b => { b.onclick = () => playFoleySound(b.dataset.fplay, 0.9); });
    box.querySelectorAll("[data-fins]").forEach(b => {
      b.onclick = () => {
        const [preset, lbl] = b.dataset.fins.split("|");
        saveUndoSnapshot();
        S.clips.a2.push({
          id: uid("a2_"),
          track: "a2",
          sfxPreset: preset,
          title: `SFX: ${lbl}`,
          start: Number(S.playhead.toFixed(2)),
          inPoint: 0,
          dur: 4,
          volume: 100
        });
        playFoleySound(preset, 0.7);
        renderTimeline();
        toast(`Efeito "${lbl}" inserido na faixa A2!`);
      };
    });
    return;
  }

  if (S.sideTab === "claquete") {
    const sc = cur();
    const logs = (sc && sc.camLogs) || [];
    box.innerHTML = `
      <div class="col">
        <div class="row" style="justify-content:space-between">
          <b>Boletim de Câmera (${logs.length})</b>
          <button type="button" class="btn sm def" data-cmd="claqueteCam">Bater Claquete…</button>
        </div>
        <div class="panel-list">
          ${logs.length ? logs.map(l => `
            <div style="padding:4px;border-bottom:1px dotted var(--lo)">
              <b>${escH(l.rolo)} · Cena ${escH(l.cena)} · Take #${l.take}</b>
              <div class="muted">${escH(l.status)} — ${escH(l.obs || "Sem obs.")}</div>
            </div>
          `).join("") : `<div class="muted" style="padding:10px">Nenhum take registrado ainda.</div>`}
        </div>
      </div>`;
    return;
  }

  if (S.sideTab === "marcadores") {
    box.innerHTML = `
      <div class="col" style="height:100%;gap:4px">
        <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px">
          <b>Marcadores & Decupagem (${S.markers.length})</b>
          <div class="row" style="gap:3px">
            <button type="button" class="btn sm def" id="btnSideAddMarker">+ Marcador</button>
            <button type="button" class="btn sm" id="btnSideExportCue">Exportar Cue Sheet (.TXT)</button>
          </div>
        </div>
        <div class="muted" style="font-size:10px">Pontos de corte (vermelho), GC (verde), áudio (azul) e anotações (amarelo).</div>
        <div class="panel-list" style="flex:1;overflow:auto">
          ${S.markers.length ? `
            <table class="queue-table">
              <thead>
                <tr>
                  <th style="width:20px">Cor</th>
                  <th>Tempo</th>
                  <th>Rótulo</th>
                  <th>Anotação</th>
                  <th style="text-align:right">Ações</th>
                </tr>
              </thead>
              <tbody>
                ${S.markers.map(m => `
                  <tr data-mkrow="${m.id}" style="cursor:pointer" title="Clique duplo para ir até o marcador">
                    <td><span class="mk-badge ${m.color || "green"}"></span></td>
                    <td><b>${fmtSMPTE(m.time)}</b></td>
                    <td><b>${escH(m.label)}</b></td>
                    <td class="muted">${escH(m.comment || "—")}</td>
                    <td style="text-align:right">
                      <button type="button" class="btn sm" data-mkjump="${m.id}" title="Ir para marcador">Ir</button>
                      <button type="button" class="btn sm" data-mkedit="${m.id}" title="Editar marcador">✎</button>
                      <button type="button" class="btn sm" data-mkdel="${m.id}" title="Excluir">✕</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          ` : `<div class="muted" style="padding:16px;text-align:center">Nenhum marcador registrado na Linha do Tempo.<br>Pressione <b>M</b> na agulha para adicionar!</div>`}
        </div>
      </div>`;

    box.querySelector("#btnSideAddMarker").onclick = () => addTimelineMarker();
    box.querySelector("#btnSideExportCue").onclick = () => exportCueSheet();

    box.querySelectorAll("[data-mkjump]").forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const m = S.markers.find(x => x.id === b.dataset.mkjump);
        if (m) setPlayhead(m.time, false);
      };
    });

    box.querySelectorAll("[data-mkedit]").forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const m = S.markers.find(x => x.id === b.dataset.mkedit);
        if (m) openMarkerDialog(m, false);
      };
    });

    box.querySelectorAll("[data-mkdel]").forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        S.markers = S.markers.filter(x => x.id !== b.dataset.mkdel);
        renderTimeline();
        renderSide();
        toast("Marcador excluído.");
      };
    });

    box.querySelectorAll("[data-mkrow]").forEach(tr => {
      tr.ondblclick = () => {
        const m = S.markers.find(x => x.id === tr.dataset.mkrow);
        if (m) setPlayhead(m.time, false);
      };
    });
    return;
  }

  // Aba Atalhos Personalizáveis (Trocar Teclas estilo Adobe Premiere)
  box.innerHTML = `
    <div class="col" style="height:100%">
      <div class="row" style="justify-content:space-between">
        <b>Teclas de Atalho (Clique para Trocar)</b>
        <button type="button" class="btn sm" id="btnResetKeys">Restaurar Padrão</button>
      </div>
      <div class="muted" style="font-size:10px">Clique em <b>[Trocar]</b> ao lado de qualquer função e pressione a nova tecla desejada no seu teclado.</div>
      <div class="keybind-list" style="flex:1">
        ${KEYMAP_LABELS.map(([actId, lbl]) => {
          const isRec = S.recordingKeyAction === actId;
          return `<div class="keybind-row${isRec ? " recording" : ""}">
            <span>${escH(lbl)}</span>
            <kbd>${escH(isRec ? "Pressione tecla..." : prettyKeyName(KEYMAP[actId]))}</kbd>
            <button type="button" class="btn sm${isRec ? " def" : ""}" data-rebind="${actId}">${isRec ? "Cancelar" : "Trocar"}</button>
          </div>`;
        }).join("")}
      </div>
    </div>`;

  box.querySelector("#btnResetKeys").onclick = () => {
    S.recordingKeyAction = null;
    resetKeymapToDefault();
    setTimelineTool(S.tool);
    renderSide();
    toast("Atalhos de teclado restaurados para o padrão do Adobe Premiere 95!");
  };

  box.querySelectorAll("[data-rebind]").forEach(b => {
    b.onclick = () => {
      const actId = b.dataset.rebind;
      S.recordingKeyAction = (S.recordingKeyAction === actId) ? null : actId;
      renderSide();
    };
  });
}

/* ---------- Processador Chroma Key & Blue/Green Screen 1995 ---------- */
function openChromaKeyDialog(targetClip = null) {
  const clip = targetClip || getSelectedClip() || S.clips[S.targetVideoTrack || "v1"]?.[0];
  if (!clip) {
    toast("Selecione um clipe na linha do tempo para ajustar o Chroma Key.");
    return;
  }

  let previewMode = "composite"; // "composite" | "alpha" | "checker"
  let eyedropperActive = false;

  dialog({
    id: "chromaWin",
    title: `Processador Chroma Key & Blue/Green Screen 1995 — ${clip.title}`,
    width: 680,
    body: `
      <div class="chroma-dialog-layout">
        <div class="chroma-preview-pane">
          <div class="chroma-canvas-box">
            <canvas id="ckPreviewCanvas" width="384" height="256"></canvas>
          </div>
          <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 6px;box-shadow:inset 1px 1px var(--lo);font-size:10.5px">
            <span><b>Visualização:</b></span>
            <div class="row" style="gap:6px">
              <label class="row" style="gap:2px"><input type="radio" name="ckPrevMode" value="composite" checked> Composição</label>
              <label class="row" style="gap:2px"><input type="radio" name="ckPrevMode" value="alpha"> Canal Alpha (P&amp;B)</label>
              <label class="row" style="gap:2px"><input type="radio" name="ckPrevMode" value="checker"> Fundo Xadrez</label>
            </div>
          </div>
        </div>

        <div class="chroma-controls-pane">
          <div class="fld" style="background:var(--face);padding:6px;border:1px solid var(--dk);box-shadow:inset 1px 1px var(--hi), inset -1px -1px var(--lo)">
            <label class="row" style="gap:6px;align-items:center;font-weight:700">
              <input type="checkbox" id="ckEnable" ${clip.chromaKey ? "checked" : ""}>
              <span>Ativar Chroma Key neste Clipe</span>
            </label>
          </div>

          <div class="col" style="gap:6px;background:var(--face);padding:6px;border:1px solid var(--dk);box-shadow:inset 1px 1px var(--hi), inset -1px -1px var(--lo);font-size:11px">
            <b style="font-size:11px">Cor Chave (Key Color):</b>
            <div class="row" style="gap:4px;flex-wrap:wrap">
              <button type="button" class="btn sm" id="ckPresetGreen" style="background:#00FF00;color:#000;font-weight:700">Verde Broadcast</button>
              <button type="button" class="btn sm" id="ckPresetBlue" style="background:#0040FF;color:#fff;font-weight:700">Azul Betacam</button>
              <button type="button" class="btn sm" id="ckPresetBlack" style="background:#111;color:#fff">Preto Luma</button>
              <button type="button" class="btn sm" id="ckPresetWhite" style="background:#fff;color:#000">Branco Luma</button>
            </div>
            <div class="row" style="gap:6px;align-items:center;margin-top:2px">
              <span>Personalizada (Win95):</span>
              ${createWin95ColorButtonHtml("ckColorPickerBtn", clip.chromaColor && clip.chromaColor.startsWith("#") ? clip.chromaColor : "#00FF00")}
              <button type="button" class="btn sm" id="ckEyedropper" title="Clique para capturar cor direto da tela de prévia">Conta-gotas (Pipeta)</button>
              <span id="ckEyedropperStatus" style="font-size:10px;color:#800"></span>
            </div>
          </div>

          <div class="col" style="gap:5px;background:var(--face);padding:6px;border:1px solid var(--dk);box-shadow:inset 1px 1px var(--hi), inset -1px -1px var(--lo);font-size:11px">
            <div class="slider-row">
              <span>Tolerância:</span>
              <input type="range" id="ckTolerance" min="5" max="95" value="${clip.chromaTol || 35}">
              <span class="val" id="ckTolVal">${clip.chromaTol || 35}%</span>
            </div>
            <div class="slider-row">
              <span>Limiar (Threshold):</span>
              <input type="range" id="ckThreshold" min="0" max="80" value="${clip.chromaThreshold || 15}">
              <span class="val" id="ckThreshVal">${clip.chromaThreshold || 15}%</span>
            </div>
            <div class="slider-row">
              <span>Suavização de Borda:</span>
              <input type="range" id="ckFeather" min="0" max="10" value="${clip.chromaFeather || 1}">
              <span class="val" id="ckFeatherVal">${clip.chromaFeather || 1} px</span>
            </div>
            <div class="slider-row">
              <span>Supressão de Spill:</span>
              <input type="range" id="ckSpill" min="0" max="100" value="${clip.chromaSpill == null ? 60 : clip.chromaSpill}">
              <span class="val" id="ckSpillVal">${clip.chromaSpill == null ? 60 : clip.chromaSpill}%</span>
            </div>
          </div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Aplicar e Fechar",
        def: 1,
        run: () => {
          renderTimeline();
          renderMonitorFrame();
          toast(`Chroma Key atualizado para o clipe "${clip.title}"!`);
        }
      },
      {
        label: "Desativar Chroma",
        run: () => {
          clip.chromaKey = false;
          clip.previewAlpha = false;
          renderTimeline();
          renderMonitorFrame();
          toast(`Chroma Key desativado no clipe "${clip.title}".`);
        }
      },
      { label: "Fechar" }
    ]
  });

  const win = document.getElementById("chromaWin");
  if (!win) return;
  const cvs = win.querySelector("#ckPreviewCanvas");
  const ctx = cvs?.getContext("2d");

  const updatePreview = () => {
    if (!ctx || !cvs) return;
    const W = cvs.width, H = cvs.height;

    if (previewMode === "checker") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#D0D0D0";
      const sz = 16;
      for (let y = 0; y < H; y += sz) {
        for (let x = 0; x < W; x += sz) {
          if (((x / sz + y / sz) % 2) === 0) ctx.fillRect(x, y, sz, sz);
        }
      }
    } else {
      ctx.fillStyle = "#0A1422";
      ctx.fillRect(0, 0, W, H);
    }

    const prevAlpha = clip.previewAlpha;
    if (previewMode === "alpha") clip.previewAlpha = true;
    else clip.previewAlpha = false;

    drawSingleClipToContext(ctx, W, H, clip, S.playhead >= clip.start && S.playhead < clip.start + clip.dur ? S.playhead : clip.start);
    clip.previewAlpha = prevAlpha;
  };

  win.querySelectorAll('input[name="ckPrevMode"]').forEach(r => {
    r.onchange = () => {
      previewMode = r.value;
      updatePreview();
    };
  });

  const chkEnable = win.querySelector("#ckEnable");
  if (chkEnable) {
    chkEnable.onchange = () => {
      clip.chromaKey = chkEnable.checked;
      updatePreview();
      renderMonitorFrame();
    };
  }

  const bindSlider = (id, prop, valId, suffix) => {
    const s = win.querySelector("#" + id);
    const v = win.querySelector("#" + valId);
    if (!s) return;
    s.oninput = () => {
      clip[prop] = +s.value;
      if (v) v.textContent = s.value + suffix;
      updatePreview();
      renderMonitorFrame();
    };
  };

  bindSlider("ckTolerance", "chromaTol", "ckTolVal", "%");
  bindSlider("ckThreshold", "chromaThreshold", "ckThreshVal", "%");
  bindSlider("ckFeather", "chromaFeather", "ckFeatherVal", " px");
  bindSlider("ckSpill", "chromaSpill", "ckSpillVal", "%");

  const applyColor = (c) => {
    clip.chromaColor = c;
    clip.chromaKey = true;
    if (chkEnable) chkEnable.checked = true;
    const cpBtn = win.querySelector("#ckColorPickerBtn");
    if (cpBtn && c.startsWith("#")) {
      cpBtn.dataset.color = c;
      const chip = cpBtn.querySelector(".win95-color-chip");
      if (chip) chip.style.background = c;
      const lbl = cpBtn.querySelector(".win95-color-hex-label");
      if (lbl) lbl.textContent = c;
    }
    updatePreview();
    renderMonitorFrame();
  };

  win.querySelector("#ckPresetGreen")?.addEventListener("click", () => applyColor("green"));
  win.querySelector("#ckPresetBlue")?.addEventListener("click", () => applyColor("blue"));
  win.querySelector("#ckPresetBlack")?.addEventListener("click", () => applyColor("#000000"));
  win.querySelector("#ckPresetWhite")?.addEventListener("click", () => applyColor("#FFFFFF"));

  const cpBtn = win.querySelector("#ckColorPickerBtn");
  if (cpBtn) {
    bindWin95ColorButton(cpBtn, (newHex) => {
      applyColor(newHex);
    });
  }

  const btnEye = win.querySelector("#ckEyedropper");
  const eyeSt = win.querySelector("#ckEyedropperStatus");
  if (btnEye) {
    btnEye.onclick = () => {
      eyedropperActive = !eyedropperActive;
      btnEye.classList.toggle("def", eyedropperActive);
      if (eyeSt) eyeSt.textContent = eyedropperActive ? "Clique na tela de prévia..." : "";
    };
  }

  if (cvs) {
    cvs.onclick = (e) => {
      if (!eyedropperActive) return;
      const rect = cvs.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * (cvs.width / rect.width));
      const y = Math.floor((e.clientY - rect.top) * (cvs.height / rect.height));
      const p = ctx.getImageData(x, y, 1, 1).data;
      const hex = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
      applyColor(hex);
      eyedropperActive = false;
      btnEye?.classList.remove("def");
      if (eyeSt) eyeSt.textContent = `Cor capturada: ${hex.toUpperCase()}`;
    };
  }

  updatePreview();
}

/* ---------- Integração Opcional e Sincronizada com o ScriptRoom (.ROT) ---------- */
const WCH = { act: 57, scene: 57, time: 69, note: 62, action: 57, character: 37, paren: 27, dialogue: 37 };
const LPP = 58;
function wrapCount(s, w) {
  if (!s) return 1;
  let n = 0;
  for (const line of String(s).split("\n")) n += Math.max(1, Math.ceil(line.length / (w || 57)));
  return n;
}
function eighthsN(lines) { return Math.max(1, Math.round((lines / LPP) * 8)); }
function e8(n) { const w = Math.floor(n / 8), r = n % 8; return w && r ? `${w} ${r}/8` : w ? `${w}` : `${r}/8`; }

function analyzeScript(sc) {
  if (!sc || !Array.isArray(sc.els)) return { pages: 1, scenes: [], falas: 0, totalSec: 60 };
  const scenes = [];
  let lineCursor = 0, sceneNum = 0, curAct = "TEASER", curScn = null, falas = 0, runningSec = 0;

  sc.els.forEach((e, idx) => {
    const lines = wrapCount(e.x, WCH[e.t] || 57) + 1;
    const page = Math.floor(lineCursor / LPP) + 1;
    lineCursor += lines;
    if (e.t === "act") curAct = (e.x || "ATO").trim().toUpperCase();
    else if (e.t === "scene") {
      sceneNum++;
      curScn = {
        idx, id: e.id, n: sceneNum, act: curAct, h: (e.x || "INT. CENÁRIO — DIA").trim(),
        tc: null, startSec: runningSec, endSec: runningSec + 30, lines, page, chars: new Set(), dialogues: [], notes: [], els: [e]
      };
      scenes.push(curScn);
    } else if (curScn) {
      curScn.lines += lines;
      curScn.els.push(e);
      if (e.t === "time") {
        const p = parseTC(e.x);
        if (p && p.b > p.a) { curScn.tc = p; curScn.startSec = p.a; curScn.endSec = p.b; runningSec = p.b; }
      } else if (e.t === "character") {
        const cn = baseName(e.x);
        if (cn) curScn.chars.add(cn);
        falas++;
      } else if (e.t === "dialogue") {
        const prevChar = sc.els.slice(0, idx).reverse().find(x => x.t === "character" || x.t === "scene");
        const speaker = prevChar && prevChar.t === "character" ? baseName(prevChar.x) : "VOZ";
        curScn.dialogues.push({ id: e.id, speaker, text: e.x });
      } else if ((e.t === "note" || e.t === "action") && /^(CARTELA|LETREIRO)\s*:/i.test(e.x)) {
        curScn.notes.push({ id: e.id, text: e.x.replace(/^(CARTELA|LETREIRO)\s*:\s*/i, "") });
      }
    }
  });

  let cursor = 0;
  scenes.forEach(s => {
    if (s.tc) { s.startSec = s.tc.a; s.endSec = Math.max(s.tc.a + 10, s.tc.b); cursor = s.endSec; }
    else { s.startSec = cursor; s.endSec = cursor + Math.max(15, eighthsN(s.lines) * 10); cursor = s.endSec; }
  });
  return { pages: Math.max(1, Math.ceil(lineCursor / LPP)), scenes, falas, totalSec: scenes.length ? scenes[scenes.length - 1].endSec : 60 };
}

function buildTimelineFromScript(sc) {
  if (!sc) return;
  saveUndoSnapshot();
  const A = analyzeScript(sc);
  S.projectName = `${epCode(sc.meta)}.ROT`;
  clearAllTracksClips();
  const v2 = [], v1 = [], a1 = [], a2 = [];

  A.scenes.forEach(scn => {
    const dur = Math.max(5, scn.endSec - scn.startSec);
    v1.push({
      id: uid("v1_"), track: "v1", sceneId: scn.id, sceneNum: scn.n, act: scn.act,
      title: `Cena ${scn.n}: ${scn.h}`, synthType: "scene", start: scn.startSec, inPoint: 0, dur,
      speed: 1, volume: 100, opacity: 100, scale: 100, posX: 0, posY: 0, brightness: 0, contrast: 0, saturation: 100,
      filter: "16mm", trans: scn.n === 1 ? "Fade do Preto" : "Corte Seco", transDur: 1.2
    });
    scn.notes.forEach((nt, nIdx) => {
      v2.push({
        id: uid("v2_"), track: "v2", sceneId: scn.id, title: `CARTELA: ${nt.text.slice(0, 34)}`, text: nt.text,
        start: scn.startSec + nIdx * 6, inPoint: 0, dur: Math.min(12, dur), opacity: 100, scale: 100, posX: 0, posY: 0
      });
    });
    if (scn.dialogues.length) {
      const slice = dur / scn.dialogues.length;
      scn.dialogues.forEach((dl, dIdx) => {
        a1.push({
          id: uid("a1_"), track: "a1", sceneId: scn.id, elId: dl.id, speaker: dl.speaker, text: dl.text,
          title: `${dl.speaker}: "${dl.text.slice(0, 28)}"`, start: Number((scn.startSec + dIdx * slice).toFixed(2)), inPoint: 0, dur: Number(Math.max(1.5, slice).toFixed(2)), volume: 100
        });
      });
    }
    a2.push({
      id: uid("a2_"), track: "a2", sceneId: scn.id, sfxPreset: "acorde",
      title: `Ambiente Cena ${scn.n}`, start: scn.startSec, inPoint: 0, dur, volume: 70
    });
  });

  Object.assign(S.clips, { v2, v1, a1, a2 });
  S.selectedClipId = v1[0] ? v1[0].id : null;
  S.selectedClipIds = v1[0] ? [v1[0].id] : [];
  recalcSequenceDuration();
  setPlayhead(0, false);
  renderAll();
}

function renderScriptRoomIntegrationTab(box) {
  const sc = cur();
  if (!sc) {
    box.innerHTML = `<div class="col"><div class="muted" style="padding:12px">Nenhum roteiro carregado. Clique em "Roteiros do ScriptRoom" para abrir.</div></div>`;
    return;
  }
  const A = analyzeScript(sc);

  if (S.sideTab === "cenas") {
    let lastAct = "";
    box.innerHTML = `
      <div class="col">
        <div class="stats">
          <div class="stat"><b>${fmtN(A.scenes.length)}</b><span>cenas</span></div>
          <div class="stat"><b>${fmtN(A.pages)}</b><span>páginas</span></div>
          <div class="stat"><b>${fmtN(A.falas)}</b><span>falas</span></div>
          <div class="stat"><b>${mmss(A.totalSec)}</b><span>minutagem</span></div>
        </div>
        <div class="row" style="gap:4px">
          <button type="button" class="btn sm def" id="btnAssembleSR">Montar Roteiro na Timeline</button>
          <button type="button" class="btn sm" id="btnShowSideScript">Ver Folha ao Lado</button>
        </div>
        <div class="panel-list">
          ${A.scenes.map((s, idx) => {
            let actH = "";
            if (s.act !== lastAct) { lastAct = s.act; actH = `<div class="actrow">${escH(lastAct)}</div>`; }
            return `${actH}<button type="button" class="scn${idx === S.curSceneIdx ? " cur" : ""}" data-scnjump="${idx}">
              <span class="no">${s.n}</span>
              <span class="h">${escH(s.h)}</span>
              <span class="tc">${mmss(s.startSec)}–${mmss(s.endSec)}</span>
              <span class="m">${escH([...s.chars].join(", "))} · ${e8(eighthsN(s.lines))} pág.</span>
            </button>`;
          }).join("")}
        </div>
      </div>`;
    box.querySelector("#btnAssembleSR").onclick = () => {
      buildTimelineFromScript(sc);
      toast(`Roteiro "${epLabel(sc)}" montado na linha do tempo!`);
    };
    box.querySelector("#btnShowSideScript").onclick = () => setMonitorLayout("script");
    box.querySelectorAll("[data-scnjump]").forEach(b => {
      b.onclick = () => {
        const idx = +b.dataset.scnjump;
        S.curSceneIdx = idx;
        const scn = A.scenes[idx];
        if (scn) setPlayhead(scn.startSec + 0.05, false);
        renderSide();
      };
    });
    return;
  }

  // Aba Roteiro (.ROT) — Folha Courier 12pt compacta e interativa
  box.innerHTML = `
    <div class="col" style="height:100%">
      <div class="row" style="justify-content:space-between">
        <b>${escH(epLabel(sc))}</b>
        <div class="row" style="gap:3px">
          <button type="button" class="btn sm def" id="btnAssembleSR2">Montar na Timeline</button>
          <button type="button" class="btn sm" data-cmd="salvarNoSR">Gravar .ROT</button>
        </div>
      </div>
      <div class="sheet-mini" style="flex:1;overflow:auto;font-size:10pt" id="sideSheet">
        ${sc.els.map(e => `<div class="el e-${e.t}" data-id="${e.id}">${escH(e.x)}</div>`).join("")}
      </div>
    </div>`;
  box.querySelector("#btnAssembleSR2").onclick = () => {
    buildTimelineFromScript(sc);
    toast(`Roteiro "${epLabel(sc)}" montado na Linha do Tempo!`);
  };
  box.querySelectorAll(".el").forEach(el => {
    el.onclick = () => jumpPlayheadToElement(el.dataset.id);
  });
}

function renderSheet() {
  const sheet = document.getElementById("sheet");
  const sc = cur();
  if (!sheet || !sc) return;
  sheet.innerHTML = sc.els.map(e => `<div class="el e-${e.t}" contenteditable="true" spellcheck="false" data-id="${e.id}">${escH(e.x)}</div>`).join("");
  sheet.querySelectorAll(".el").forEach(el => {
    el.onclick = () => jumpPlayheadToElement(el.dataset.id);
    el.oninput = () => {
      const item = sc.els.find(x => x.id === el.dataset.id);
      if (item) item.x = el.textContent || "";
    };
  });
}

function jumpPlayheadToElement(elId) {
  const dClip = (S.clips.a1 || []).find(c => c.elId === elId);
  if (dClip) { setPlayhead(dClip.start, false); return; }
  const sc = cur();
  if (!sc) return;
  const A = analyzeScript(sc);
  const scn = A.scenes.find(s => s.id === elId || s.els.some(x => x.id === elId));
  if (scn) setPlayhead(scn.startSec, false);
}

/* ---------- Importação de Vídeos, Áudios e Imagens (Diálogo + Arrastar e Soltar do Windows) ---------- */
function registerImportedFileObject(fileInfo, autoInsert = false) {
  // Ao importar a primeira mídia real, limpa a demonstração sintética inicial para não misturar cartelas demo com o projeto do usuário
  if (S.isStarterDemo && fileInfo.url) {
    clearAllTracksClips();
    S.playhead = 0;
    S.isStarterDemo = false;
  }

  const id = uid("med_");
  const item = {
    id,
    name: fileInfo.name,
    url: fileInfo.url,
    path: fileInfo.path || "",
    kind: fileInfo.kind || "video",
    dur: fileInfo.kind === "image" ? 6 : 10,
    res: fileInfo.kind === "audio" ? "Áudio 16-bit" : (fileInfo.kind === "image" ? "Imagem" : "Vídeo")
  };
  S.mediaBin.unshift(item);

  const updateClipsForMedia = (newDur) => {
    getAllTrackIds().forEach(tk => {
      let changed = false;
      (S.clips[tk] || []).forEach(c => {
        if (c.mediaId === item.id || c.mediaUrl === item.url) {
          c.dur = newDur;
          c.sourceMaxDur = newDur;
          changed = true;
        }
      });
      if (changed) resolveTrackOverlaps(tk);
    });
    if (S.srcItem && S.srcItem.id === item.id) {
      S.srcOut = newDur;
      updateSourceMonitorUI();
    }
    recalcSequenceDuration();
    renderAll();
  };

  if (item.kind === "video") {
    const v = document.createElement("video");
    v.src = item.url;
    v.preload = "auto";
    v.playsInline = true;
    v.muted = false;
    getMediaPool().appendChild(v);
    S.videoEls.set(item.url, v);

    v.addEventListener("loadeddata", () => {
      if (!item.thumb && v.videoWidth) {
        try {
          const tc = document.createElement("canvas");
          tc.width = 64; tc.height = 48;
          tc.getContext("2d").drawImage(v, 0, 0, 64, 48);
          item.thumb = tc.toDataURL("image/jpeg", 0.7);
          renderSide();
        } catch (_e) {}
      }
      renderMonitorFrame();
      renderSourceFrame();
    });
    v.addEventListener("canplay", () => {
      renderMonitorFrame();
      renderSourceFrame();
    });
    v.addEventListener("seeked", () => {
      if (!S.playing) renderMonitorFrame();
    });

    v.onloadedmetadata = () => {
      const realDur = (v.duration && isFinite(v.duration)) ? Math.max(0.5, Number(v.duration.toFixed(2))) : 10;
      item.dur = realDur;
      item.res = `${v.videoWidth || 640}x${v.videoHeight || 480} · Vídeo`;
      try { v.currentTime = 0.001; } catch (_e) {}
      updateClipsForMedia(realDur);
    };
    v.load();
    extractAudioPeaksForItem(item);
  } else if (item.kind === "image") {
    const img = new Image();
    img.src = item.url;
    S.videoEls.set(item.url, img);
    img.onload = () => {
      item.dur = 6;
      item.res = `${img.naturalWidth || 640}x${img.naturalHeight || 480} · Imagem`;
      try {
        const tc = document.createElement("canvas");
        tc.width = 64; tc.height = 48;
        tc.getContext("2d").drawImage(img, 0, 0, 64, 48);
        item.thumb = tc.toDataURL("image/jpeg", 0.7);
      } catch (_e) {}
      renderMonitorFrame();
      renderSourceFrame();
      renderSide();
    };
  } else if (item.kind === "audio") {
    const aud = document.createElement("audio");
    aud.src = item.url;
    aud.preload = "auto";
    getMediaPool().appendChild(aud);
    S.audioEls.set(item.url, aud);
    aud.onloadedmetadata = () => {
      const realDur = (aud.duration && isFinite(aud.duration)) ? Math.max(0.5, Number(aud.duration.toFixed(2))) : 10;
      item.dur = realDur;
      item.res = `Áudio Digital (${mmss(item.dur)})`;
      updateClipsForMedia(realDur);
    };
    aud.load();
    extractAudioPeaksForItem(item);
  }

  S.sideTab = "bin";
  loadIntoSourceMonitor(item);
  if (autoInsert) {
    insertSourceIntoTimeline(item.kind === "audio" ? (S.targetAudioTrack || "a1") : (S.targetVideoTrack || "v1"), "append_or_playhead");
  } else {
    renderAll();
  }
}

async function importMediaFiles(tipo = "all", autoInsert = false) {
  if (window.editorNative && typeof window.editorNative.pickMedia === "function") {
    const files = await window.editorNative.pickMedia(tipo);
    if (files && files.length) {
      files.forEach(f => registerImportedFileObject(f, autoInsert));
      if (autoInsert) setPlayhead(0, false);
      toast(`${files.length} arquivo(s) importado(s) para o Cesto de Mídia (Bin)!`);
    }
    return;
  }
  const inp = document.getElementById("fMediaFallback");
  if (inp) inp.click();
}

function setupDragAndDrop() {
  // Permite arrastar arquivos direto do Windows Explorer ou arrastar itens do Bin para a Timeline/Monitores
  window.addEventListener("dragover", e => e.preventDefault());
  window.addEventListener("drop", e => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
      [...e.dataTransfer.files].forEach(file => {
        const url = URL.createObjectURL(file);
        const ext = (file.name.split(".").pop() || "").toLowerCase();
        const isAud = ["wav", "mp3", "ogg", "m4a", "flac", "aac"].includes(ext) || file.type.startsWith("audio/");
        const isImg = ["jpg", "jpeg", "png", "bmp", "gif", "webp"].includes(ext) || file.type.startsWith("image/");
        registerImportedFileObject({
          name: file.name,
          url,
          kind: isAud ? "audio" : (isImg ? "image" : "video")
        }, false);
      });
      toast("Mídia(s) importada(s) para o Cesto de Mídia (Bin)!");
      return;
    }

    const txt = e.dataTransfer ? e.dataTransfer.getData("text/plain") : "";
    if (txt && txt.startsWith("bin:")) {
      const idx = +txt.slice(4);
      const it = S.mediaBin[idx];
      if (it) {
        const trackEl = e.target.closest(".tl-track");
        const tk = trackEl ? trackEl.dataset.track : (it.kind === "audio" ? (S.targetAudioTrack || "a1") : (S.targetVideoTrack || "v1"));
        const area = document.getElementById("tlArea");
        let dropSec = null;
        if (trackEl && area) {
          const pxPerSec = Number(prefs.tlZoom) || 10;
          dropSec = Math.max(0, (e.clientX - area.getBoundingClientRect().left) / pxPerSec);
          dropSec = snapTimelineSec(dropSec);
        }
        loadIntoSourceMonitor(it);
        insertSourceIntoTimeline(tk, "append_or_playhead", dropSec);
      }
    }
  });
}

/* ---------- Diálogos Windows 95: Cartelas, Gerador de Sinal, Exportação de Vídeo Real e Sobre ---------- */
let toastTimer = null;
function toast(msg) {
  let el = document.getElementById("seToast");
  if (!el) {
    el = document.createElement("div");
    el.id = "seToast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 3400);
}

let winZ = 80;
function dialog(o) {
  if (o.id) {
    const old = document.getElementById(o.id);
    if (old && old._close) old._close();
  }
  const tid = uid("t_");
  let scrim = null;
  if (o.modal !== false) {
    scrim = document.createElement("div");
    scrim.className = "scrim";
    document.body.appendChild(scrim);
  }
  const w = document.createElement("div");
  w.className = "win";
  if (o.id) w.id = o.id;
  w.style.width = `min(${o.width || 460}px, calc(100vw - 12px))`;
  w.style.zIndex = ++winZ;
  if (scrim) scrim.style.zIndex = winZ - 1;

  w.innerHTML = `
    <div class="titlebar">
      <span class="ttl" id="${tid}">${escH(o.title)}</span>
      <button class="tb-btn" type="button" data-w="x">×</button>
    </div>
    <div class="win-body">${o.body}</div>
    ${o.buttons && o.buttons.length ? `<div class="win-btns">${o.buttons.map((b, i) =>
      `<button type="button" class="btn${b.def ? " def" : ""}" data-b="${i}">${escH(b.label)}</button>`
    ).join("")}</div>` : ""}`;

  document.body.appendChild(w);
  paintIcons(w);

  const close = () => { w.remove(); if (scrim) scrim.remove(); if (o.onClose) o.onClose(); };
  w._close = close;

  const r = w.getBoundingClientRect();
  w.style.left = Math.max(8, Math.round((innerWidth - r.width) / 2)) + "px";
  w.style.top = Math.max(8, Math.round((innerHeight - r.height) / 2 - 14)) + "px";

  w.addEventListener("click", async e => {
    if (e.target.closest("[data-w='x']")) { close(); return; }
    const b = e.target.closest("[data-b]");
    if (b && o.buttons) {
      const bt = o.buttons[+b.dataset.b];
      const res = bt.run ? await bt.run(w, close) : undefined;
      if (res !== false) close();
    }
  });

  const tb = w.querySelector(".titlebar");
  tb.addEventListener("pointerdown", e => {
    if (e.target.closest("button")) return;
    const rect = w.getBoundingClientRect(), sx = e.clientX - rect.left, sy = e.clientY - rect.top;
    tb.setPointerCapture(e.pointerId);
    const mv = ev => {
      w.style.left = Math.max(0, Math.min(ev.clientX - sx, innerWidth - 80)) + "px";
      w.style.top = Math.max(0, Math.min(ev.clientY - sy, innerHeight - 36)) + "px";
    };
    const up = () => { tb.removeEventListener("pointermove", mv); tb.removeEventListener("pointerup", up); };
    tb.addEventListener("pointermove", mv); tb.addEventListener("pointerup", up);
  });

  if (o.onOpen) o.onOpen(w, close);
  return { el: w, close };
}

function openDialog(o) {
  const res = dialog(o);
  return res.el;
}

function closeDialog(w) {
  if (!w) return;
  if (w._close) w._close();
  else if (w.close) w.close();
  else if (w.remove) w.remove();
}

function openChyronDialog() {
  let selectedFontCol = "#FFFFFF";
  let selectedBoxCol = "#0E2442";

  dialog({
    id: "gcWin",
    title: "Title Designer 95 (Chyron Avançado) — Criar Cartela / Terço Inferior",
    width: 500,
    body: `
      <div class="col" style="gap:6px">
        <label class="fld"><span>Modelo de Título / Animação:</span>
          <select id="gc-type">
            <option value="static" selected>Cartela Estática 95 (Central / Subtítulo)</option>
            <option value="lower_third">Terço Inferior de Telejornal (Lower Third / Tarja)</option>
            <option value="crawl">Letreiro Rotativo (Crawl Horizontal Anos 90)</option>
            <option value="roll">Créditos Rolantes Verticais (Roll)</option>
            <option value="blink">Piscante de Alerta 1995 (Blink)</option>
          </select>
        </label>

        <label class="fld"><span>Texto Principal (Nome do Entrevistado / Manchete):</span>
          <textarea id="gc-txt" rows="2" placeholder="Ex.: DR. ROBERTO MARINHO ou OFERTA ESPECIAL"></textarea>
        </label>

        <label class="fld" id="gc-sub-box"><span>Subtítulo / Cargo / Localidade (para Terço Inferior):</span>
          <input type="text" id="gc-sub" placeholder="Ex.: DIRETOR GERAL · RIO DE JANEIRO">
        </label>

        <div class="grid2">
          <label class="fld"><span>Gradiente / Textura de Cor:</span>
            <select id="gc-grad">
              <option value="none" selected>Branco Puro Sólido</option>
              <option value="gold">Dourado Broadcast (Gold 95)</option>
              <option value="silver">Prata Metálico (Chrome 95)</option>
              <option value="crt_blue">Azul CRT Telejornal</option>
              <option value="3d_chisel">Extrusão 3D Chanfrada (WordArt 3D 1995)</option>
              <option value="3d_chrome">Cromado 3D Metálico dos Anos 90 (3D Chrome)</option>
            </select>
          </label>
          <label class="fld"><span>Contorno de Borda (Stroke):</span>
            <select id="gc-stroke">
              <option value="0">Sem Contorno</option>
              <option value="2" selected>Fino (2px Preto)</option>
              <option value="4">Médio (4px Preto)</option>
              <option value="6">Grosso (6px Preto)</option>
            </select>
          </label>
        </div>

        <div class="grid2">
          <label class="fld"><span>Cor do Texto (Win95):</span>
            <div style="margin-top:2px">
              ${createWin95ColorButtonHtml("gc-fcol-btn", "#FFFFFF")}
            </div>
          </label>
          <label class="fld"><span>Cor da Tarja / Fundo:</span>
            <div style="margin-top:2px">
              ${createWin95ColorButtonHtml("gc-bcol-btn", "#0E2442")}
            </div>
          </label>
        </div>

        <div class="grid2">
          <label class="row" style="gap:4px;font-size:11px;cursor:pointer">
            <input type="checkbox" id="gc-shadow" checked>
            <span>Sombra Projetada (Drop Shadow 3D)</span>
          </label>
          <div class="row" style="gap:4px">
            <label class="fld" style="flex:1"><span>Entrada (s):</span>
              <input type="number" id="gc-start" value="${Number(S.playhead.toFixed(1))}" step="0.5" min="0">
            </label>
            <label class="fld" style="flex:1"><span>Duração (s):</span>
              <input type="number" id="gc-dur" value="6" step="0.5" min="1">
            </label>
          </div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Inserir Letreiro",
        def: 1,
        run: (w) => {
          const txt = w.querySelector("#gc-txt").value.trim();
          if (!txt) { toast("Digite o texto da cartela."); return false; }
          saveUndoSnapshot();
          const chyType = w.querySelector("#gc-type").value;
          const subTxt = w.querySelector("#gc-sub").value.trim();
          const grad = w.querySelector("#gc-grad").value;
          const stroke = parseInt(w.querySelector("#gc-stroke").value, 10) || 0;
          const shadow = w.querySelector("#gc-shadow").checked;
          const st = Math.max(0, +w.querySelector("#gc-start").value || 0);
          const dur = Math.max(1, +w.querySelector("#gc-dur").value || 6);
          const tk = findOrCreateFreeOverlayTrack("video", st, dur);

          const newClip = {
            id: uid(tk + "_"),
            track: tk,
            title: `LETREIRO: ${txt.slice(0, 24)}`,
            text: txt,
            textSub: subTxt,
            chyronType: chyType,
            gradient: grad,
            fontColor: selectedFontCol,
            boxColor: selectedBoxCol,
            strokeWidth: stroke,
            shadow: shadow,
            start: st,
            inPoint: 0,
            dur,
            opacity: 100,
            scale: 100,
            posX: 0,
            posY: chyType === "lower_third" ? 0 : 130
          };

          ensureTrackExists(tk);
          S.clips[tk].push(newClip);
          resolveTrackOverlaps(tk, newClip.id);
          S.selectedClipId = newClip.id;
          S.selectedClipTrack = tk;
          S.selectedClipIds = [newClip.id];
          setPlayhead(newClip.start + 0.1, false);
          renderAll();
          toast(`Letreiro inserido na faixa ${tk.toUpperCase()}!`);
        }
      },
      { label: "Cancelar" }
    ]
  });

  setTimeout(() => {
    const fBtn = document.getElementById("gc-fcol-btn");
    if (fBtn) bindWin95ColorButton(fBtn, (col) => { selectedFontCol = col; });
    const bBtn = document.getElementById("gc-bcol-btn");
    if (bBtn) bindWin95ColorButton(bBtn, (col) => { selectedBoxCol = col; });
  }, 40);
}

/* ---------- Roll & Crawl Designer 95 (Gerador de Créditos e Letreiros Rolantes) ---------- */
function openRollCrawlDesigner(clipToEdit = null) {
  let rcType = (clipToEdit && clipToEdit.chyronType === "crawl") ? "crawl" : "roll";
  let rcAlign = (clipToEdit && clipToEdit.rollAlign) || "2col"; // "2col" | "center"
  let fontFace = (clipToEdit && clipToEdit.fontFace) || "'Courier New', monospace";
  let fontSize = (clipToEdit && clipToEdit.fontSize) || 18;
  let fontCol = (clipToEdit && clipToEdit.fontColor) || "#FFFFFF";
  let grad = (clipToEdit && clipToEdit.gradient) || "gold";
  let stroke = (clipToEdit && clipToEdit.strokeWidth) != null ? clipToEdit.strokeWidth : 2;
  let shadow = clipToEdit ? clipToEdit.shadow !== false : true;
  let rollSpeed = (clipToEdit && clipToEdit.rollSpeed) || 55; // px por segundo
  let rollTitle = (clipToEdit && clipToEdit.rollTitle) || "REDE BRASIL 1995 · PRODUÇÃO";
  let crawlBadge = (clipToEdit && clipToEdit.crawlBadge) || "PLANTÃO";
  let crawlBadgeCol = (clipToEdit && clipToEdit.crawlBadgeCol) || "#D00000";
  let crawlSpeed = (clipToEdit && clipToEdit.crawlSpeed) || 90;

  let defaultRollLines = [
    "DIREÇÃO GERAL | ROBERTO SILVA",
    "PRODUÇÃO EXECUTIVA | MARIA HELENA",
    "ROTEIRO ORIGINAL | CARLOS ALBERTO",
    "DIREÇÃO DE FOTOGRAFIA | PAULO HENRIQUE",
    "MONTAGEM & EDIÇÃO | JORGE MEDEIROS",
    "TRILHA SONORA | MAESTRO EDUARDO",
    "OPERAÇÃO DE CÂMERA | MARCOS VINICIUS",
    "SONOPLASTIA & ÁUDIO | LUCAS FERREIRA",
    "AGRADECIMENTOS ESPECIAIS | ESTÚDIOS NACIONAIS"
  ].join("\n");

  let defaultCrawlText = "URGENTE: CONGRESSO NACIONAL APROVA PACOTE ECONÔMICO NESTA TARDE EM BRASÍLIA · ACOMPANHE A COBERTURA AO VIVO DA REDE BRASIL · MAIS INFORMAÇÕES NO JORNAL DA NOITE";

  let rollText = (clipToEdit && clipToEdit.text && clipToEdit.chyronType === "roll") ? clipToEdit.text : defaultRollLines;
  let crawlText = (clipToEdit && clipToEdit.text && clipToEdit.chyronType === "crawl") ? clipToEdit.text : defaultCrawlText;

  let animTimer = null;
  let animTime = 0;

  dialog({
    id: "rollCrawlWin",
    title: "Title Designer 95 — Gerador de Créditos Rolantes (Roll) & Letreiros (Crawl)",
    width: 740,
    body: `
      <div class="rc-layout">
        <div class="rc-preview-pane">
          <div class="rc-canvas-box">
            <canvas id="rcPreviewCanvas" width="320" height="240"></canvas>
          </div>
          <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 6px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
            <span><b>Pré-visualização 1995</b></span>
            <button type="button" class="btn sm" id="rcBtnResetAnim">Reiniciar</button>
          </div>
          <div class="fld" style="background:var(--face);padding:6px;border:1px solid var(--dk);box-shadow:inset 1px 1px var(--hi), inset -1px -1px var(--lo);font-size:11px">
            <div id="rcDurationInfo" style="font-family:monospace;font-weight:700;color:#004080">Duração calculada: 12.0s</div>
            <div class="muted" style="font-size:10px;margin-top:2px">Sincronizado automaticamente com a velocidade da rolagem.</div>
          </div>
        </div>

        <div class="rc-controls-pane">
          <div class="row" style="gap:10px;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo)">
            <label class="row" style="gap:4px;font-weight:700;font-size:11.5px;cursor:pointer">
              <input type="radio" name="rcMode" id="rcModeRoll" value="roll" ${rcType === "roll" ? "checked" : ""}>
              Créditos Rolantes Verticais (Roll)
            </label>
            <label class="row" style="gap:4px;font-weight:700;font-size:11.5px;cursor:pointer">
              <input type="radio" name="rcMode" id="rcModeCrawl" value="crawl" ${rcType === "crawl" ? "checked" : ""}>
              Letreiro Contínuo de Notícias (Crawl)
            </label>
          </div>

          <div class="row" style="gap:4px;align-items:center">
            <span style="font-size:11px;font-weight:700">Predefinições:</span>
            <select id="rcPresetSel" style="flex:1;font-size:11px;height:22px">
              <option value="">Selecione um modelo pronto…</option>
              <option value="telejornal">Telejornal 1995 (Elenco Técnico)</option>
              <option value="cinema">Cinema / Longa-Metragem (2 Colunas)</option>
              <option value="plantao">Plantão Extra / Urgente (Crawl Vermelho)</option>
              <option value="cambio">Boletim Econômico / Cotações (Crawl Azul)</option>
            </select>
          </div>

          <!-- Painel Específico do ROLL -->
          <div id="rcRollPanel" class="col" style="gap:6px;${rcType === "roll" ? "" : "display:none"}">
            <label class="fld"><span>Título de Cabeçalho dos Créditos:</span>
              <input type="text" id="rcRollTitle" value="${escH(rollTitle)}" placeholder="Ex.: UMA PRODUÇÃO REDE BRASIL">
            </label>
            <div class="grid2">
              <label class="fld"><span>Alinhamento dos Créditos:</span>
                <select id="rcRollAlign">
                  <option value="2col" ${rcAlign === "2col" ? "selected" : ""}>Duas Colunas (Cargo à Esquerda, Nome à Direita)</option>
                  <option value="center" ${rcAlign === "center" ? "selected" : ""}>Centralizado Tradicional</option>
                </select>
              </label>
              <label class="fld"><span>Velocidade de Subida:</span>
                <select id="rcRollSpeed">
                  <option value="40" ${rollSpeed === 40 ? "selected" : ""}>Lenta (40 px/s - Leitura Confortável)</option>
                  <option value="55" ${rollSpeed === 55 ? "selected" : ""}>Normal (55 px/s - Padrão TV)</option>
                  <option value="80" ${rollSpeed === 80 ? "selected" : ""}>Rápida (80 px/s - Encerramento)</option>
                  <option value="110" ${rollSpeed === 110 ? "selected" : ""}>Ultra Rápida (110 px/s)</option>
                </select>
              </label>
            </div>
            <label class="fld"><span>Linhas de Créditos (Formato: CARGO | NOME):</span>
              <textarea id="rcRollText" rows="6" style="font-family:monospace;font-size:11px;resize:vertical">${escH(rollText)}</textarea>
            </label>
          </div>

          <!-- Painel Específico do CRAWL -->
          <div id="rcCrawlPanel" class="col" style="gap:6px;${rcType === "crawl" ? "" : "display:none"}">
            <div class="grid2">
              <label class="fld"><span>Etiqueta / Badge do Plantão:</span>
                <input type="text" id="rcCrawlBadge" value="${escH(crawlBadge)}" placeholder="Ex.: PLANTÃO ou URGENTE">
              </label>
              <label class="fld"><span>Cor de Fundo da Etiqueta:</span>
                <select id="rcCrawlBadgeCol">
                  <option value="#D00000" ${crawlBadgeCol === "#D00000" ? "selected" : ""}>Vermelho Plantão Urgente</option>
                  <option value="#0E2442" ${crawlBadgeCol === "#0E2442" ? "selected" : ""}>Azul Marinho Telejornal</option>
                  <option value="#D4A000" ${crawlBadgeCol === "#D4A000" ? "selected" : ""}>Amarelo Atenção</option>
                  <option value="#111111" ${crawlBadgeCol === "#111111" ? "selected" : ""}>Preto Sóbrio</option>
                </select>
              </label>
            </div>
            <label class="fld"><span>Texto do Letreiro Contínuo (Notícia / Manchete):</span>
              <textarea id="rcCrawlText" rows="4" style="font-family:monospace;font-size:11px;resize:vertical">${escH(crawlText)}</textarea>
            </label>
            <div class="slider-row" style="grid-template-columns:130px 1fr 50px">
              <span>Velocidade do Crawl:</span>
              <input type="range" id="rcCrawlSpeedRange" min="50" max="180" value="${crawlSpeed}">
              <span id="rcCrawlSpeedVal" style="font-family:monospace">${crawlSpeed} px/s</span>
            </div>
          </div>

          <!-- Opções Estéticas Compartilhadas -->
          <div class="grid2">
            <label class="fld"><span>Gradiente / Textura:</span>
              <select id="rcGradSel">
                <option value="gold" ${grad === "gold" ? "selected" : ""}>Dourado Broadcast (Gold 95)</option>
                <option value="silver" ${grad === "silver" ? "selected" : ""}>Prata Metálico (Chrome 95)</option>
                <option value="3d_chisel" ${grad === "3d_chisel" ? "selected" : ""}>Extrusão 3D Chanfrada</option>
                <option value="none" ${grad === "none" ? "selected" : ""}>Branco Puro Sólido</option>
              </select>
            </label>
            <label class="fld"><span>Tamanho da Fonte:</span>
              <select id="rcFontSize">
                <option value="16" ${fontSize === 16 ? "selected" : ""}>16 px (Discreto)</option>
                <option value="18" ${fontSize === 18 ? "selected" : ""}>18 px (Padrão Broadcast)</option>
                <option value="22" ${fontSize === 22 ? "selected" : ""}>22 px (Grande Destaque)</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Inserir na Linha do Tempo (Faixa V3)",
        def: 1,
        run: (w) => {
          saveUndoSnapshot();
          const mode = w.querySelector('input[name="rcMode"]:checked').value;
          const tk = "v3";
          ensureTrackExists(tk);

          const rText = w.querySelector("#rcRollText").value.trim();
          const cText = w.querySelector("#rcCrawlText").value.trim();
          const title = w.querySelector("#rcRollTitle").value.trim();
          const align = w.querySelector("#rcRollAlign").value;
          const rSpd = +w.querySelector("#rcRollSpeed").value || 55;
          const cSpd = +w.querySelector("#rcCrawlSpeedRange").value || 90;
          const badge = w.querySelector("#rcCrawlBadge").value.trim();
          const badgeCol = w.querySelector("#rcCrawlBadgeCol").value;
          const g = w.querySelector("#rcGradSel").value;
          const fSize = +w.querySelector("#rcFontSize").value || 18;

          let calcDur = 10;
          if (mode === "roll") {
            const numLines = rText.split("\n").filter(l => l.trim()).length;
            const totalH = (title ? 65 : 0) + numLines * (fSize * 1.5);
            calcDur = Math.max(5, Math.round(((480 + totalH + 60) / rSpd) * 10) / 10);
          } else {
            calcDur = Math.max(6, Math.round(((640 + cText.length * (fSize * 0.6) + 120) / cSpd) * 10) / 10);
          }

          const st = S.playhead;
          const newClip = {
            id: uid("rc_"),
            track: tk,
            title: mode === "roll" ? `CRÉDITOS: ${title || "ROLL 95"}` : `PLANTÃO: ${badge || "CRAWL 95"}`,
            text: mode === "roll" ? rText : cText,
            chyronType: mode,
            rollTitle: title,
            rollAlign: align,
            rollSpeed: rSpd,
            crawlBadge: badge,
            crawlBadgeCol: badgeCol,
            crawlSpeed: cSpd,
            gradient: g,
            fontSize: fSize,
            fontColor: "#FFFFFF",
            boxColor: "rgba(8, 16, 32, 0.88)",
            strokeWidth: 2,
            shadow: true,
            start: st,
            inPoint: 0,
            dur: calcDur,
            opacity: 100,
            scale: 100,
            posX: 0,
            posY: 0
          };

          S.clips[tk].push(newClip);
          resolveTrackOverlaps(tk, newClip.id);
          S.selectedClipId = newClip.id;
          S.selectedClipTrack = tk;
          S.selectedClipIds = [newClip.id];
          recalcSequenceDuration();
          renderAll();
          toast(`${mode === "roll" ? "Créditos rolantes" : "Letreiro de notícias"} inserido na faixa ${tk.toUpperCase()} (${calcDur}s)!`);
        }
      },
      { label: "Fechar" }
    ],
    onClose: () => {
      if (animTimer) cancelAnimationFrame(animTimer);
    }
  });

  const win = document.getElementById("rollCrawlWin");
  if (!win) return;

  const cvs = win.querySelector("#rcPreviewCanvas");
  const ctx = cvs?.getContext("2d");
  const durInfo = win.querySelector("#rcDurationInfo");

  const calcAndUpdateDur = () => {
    const mode = win.querySelector('input[name="rcMode"]:checked')?.value || "roll";
    const fSize = +win.querySelector("#rcFontSize")?.value || 18;
    if (mode === "roll") {
      const rText = win.querySelector("#rcRollText")?.value || "";
      const numLines = rText.split("\n").filter(l => l.trim()).length;
      const rSpd = +win.querySelector("#rcRollSpeed")?.value || 55;
      const title = win.querySelector("#rcRollTitle")?.value || "";
      const totalH = (title ? 65 : 0) + numLines * (fSize * 1.5);
      const d = Math.max(5, Math.round(((240 + totalH + 40) / rSpd) * 10) / 10);
      if (durInfo) durInfo.textContent = `Duração calculada do Roll: ${d.toFixed(1)}s (${Math.round(d * 29.97)} quadros NTSC)`;
      return d;
    } else {
      const cText = win.querySelector("#rcCrawlText")?.value || "";
      const cSpd = +win.querySelector("#rcCrawlSpeedRange")?.value || 90;
      const d = Math.max(5, Math.round(((320 + cText.length * 9 + 80) / cSpd) * 10) / 10);
      if (durInfo) durInfo.textContent = `Duração calculada do Crawl: ${d.toFixed(1)}s (${Math.round(d * 29.97)} quadros NTSC)`;
      return d;
    }
  };

  calcAndUpdateDur();

  // Alternância de abas Roll / Crawl
  win.querySelectorAll('input[name="rcMode"]').forEach(r => {
    r.onchange = () => {
      const mode = r.value;
      const rPan = win.querySelector("#rcRollPanel");
      const cPan = win.querySelector("#rcCrawlPanel");
      if (rPan) rPan.style.display = mode === "roll" ? "flex" : "none";
      if (cPan) cPan.style.display = mode === "crawl" ? "flex" : "none";
      animTime = 0;
      calcAndUpdateDur();
    };
  });

  win.querySelector("#rcBtnResetAnim")?.addEventListener("click", () => { animTime = 0; });
  win.querySelector("#rcRollText")?.addEventListener("input", calcAndUpdateDur);
  win.querySelector("#rcRollSpeed")?.addEventListener("change", calcAndUpdateDur);
  win.querySelector("#rcCrawlText")?.addEventListener("input", calcAndUpdateDur);

  const spRange = win.querySelector("#rcCrawlSpeedRange");
  const spVal = win.querySelector("#rcCrawlSpeedVal");
  if (spRange && spVal) {
    spRange.oninput = () => {
      spVal.textContent = spRange.value + " px/s";
      calcAndUpdateDur();
    };
  }

  // Predefinições
  win.querySelector("#rcPresetSel")?.addEventListener("change", (e) => {
    const v = e.target.value;
    if (v === "telejornal") {
      win.querySelector("#rcModeRoll").checked = true;
      win.querySelector("#rcRollPanel").style.display = "flex";
      win.querySelector("#rcCrawlPanel").style.display = "none";
      win.querySelector("#rcRollTitle").value = "REDE BRASIL 1995 · TELEJORNALISMO";
      win.querySelector("#rcRollAlign").value = "2col";
      win.querySelector("#rcGradSel").value = "gold";
      win.querySelector("#rcRollSpeed").value = "55";
      win.querySelector("#rcRollText").value = [
        "EDIÇÃO-CHEFE | ROBERTO SILVA",
        "APRESENTAÇÃO | MARIANA GOMES",
        "REPORTAGEM ESPECIAL | CARLOS ALBERTO",
        "PRODUÇÃO EM BRASÍLIA | PAULO HENRIQUE",
        "EDIÇÃO DE VÍDEO | JORGE MEDEIROS",
        "OPERAÇÃO DE VT | MARCOS VINICIUS",
        "COORDENAÇÃO DE REDE | LUCAS FERREIRA"
      ].join("\n");
    } else if (v === "cinema") {
      win.querySelector("#rcModeRoll").checked = true;
      win.querySelector("#rcRollPanel").style.display = "flex";
      win.querySelector("#rcCrawlPanel").style.display = "none";
      win.querySelector("#rcRollTitle").value = "UM FILME DE CÁSSIO VARGUELIA";
      win.querySelector("#rcRollAlign").value = "2col";
      win.querySelector("#rcGradSel").value = "silver";
      win.querySelector("#rcRollSpeed").value = "40";
      win.querySelector("#rcRollText").value = [
        "DIREÇÃO | CÁSSIO VARGUELIA",
        "PRODUÇÃO | FUNDAÇÃO VARGUELIA",
        "FOTOGRAFIA | EDUARDO SANTOS",
        "MONTAGEM | JORGE MEDEIROS",
        "SOM DIRETO | RICARDO LIMA",
        "TRILHA ORIGINAL | MAESTRO ANTÔNIO",
        "LABORATÓRIO DE PELÍCULA | CINELAB 1995"
      ].join("\n");
    } else if (v === "plantao") {
      win.querySelector("#rcModeCrawl").checked = true;
      win.querySelector("#rcRollPanel").style.display = "none";
      win.querySelector("#rcCrawlPanel").style.display = "flex";
      win.querySelector("#rcCrawlBadge").value = "PLANTÃO";
      win.querySelector("#rcCrawlBadgeCol").value = "#D00000";
      win.querySelector("#rcGradSel").value = "gold";
      win.querySelector("#rcCrawlText").value = "PLANTÃO DA REDE BRASIL: IMAGENS EXCLUSIVAS DIRETO DE BRASÍLIA · ACOMPANHE O DESENROLAR DA SESSÃO EXTRAORDINÁRIA";
    } else if (v === "cambio") {
      win.querySelector("#rcModeCrawl").checked = true;
      win.querySelector("#rcRollPanel").style.display = "none";
      win.querySelector("#rcCrawlPanel").style.display = "flex";
      win.querySelector("#rcCrawlBadge").value = "ECONOMIA";
      win.querySelector("#rcCrawlBadgeCol").value = "#0E2442";
      win.querySelector("#rcGradSel").value = "silver";
      win.querySelector("#rcCrawlText").value = "BOLETIM ECONÔMICO 1995: DÓLAR COMERCIAL R$ 0,98 · BOLSA DE VALORES +2,4% · TAXA SELIC ESTÁVEL";
    }
    animTime = 0;
    calcAndUpdateDur();
  });

  // Loop de Animação da Prévia no Canvas do Diálogo
  let lastFrame = performance.now();
  const renderPreview = (now) => {
    if (!document.getElementById("rollCrawlWin")) return;
    const dt = (now - lastFrame) / 1000;
    lastFrame = now;
    animTime += dt;

    if (ctx && cvs) {
      const W = cvs.width, H = cvs.height;
      const mode = win.querySelector('input[name="rcMode"]:checked')?.value || "roll";
      const totalDur = calcAndUpdateDur();
      const pTime = animTime % totalDur;

      // Fundo simulado de TV CRT
      ctx.fillStyle = "#060E18";
      ctx.fillRect(0, 0, W, H);

      // Linha do horizonte de estúdio
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, H / 2, W, H / 2);

      // Guia de Action / Title Safe
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.strokeRect(W * 0.05, H * 0.05, W * 0.9, H * 0.9);

      const fSize = 14;
      const gradType = win.querySelector("#rcGradSel")?.value || "gold";

      const applyGrad = (curY) => {
        if (gradType === "gold") {
          const g = ctx.createLinearGradient(0, curY - fSize, 0, curY + 2);
          g.addColorStop(0, "#FFFEE0"); g.addColorStop(0.5, "#FFD700"); g.addColorStop(1, "#8A6000");
          ctx.fillStyle = g;
        } else if (gradType === "silver") {
          const g = ctx.createLinearGradient(0, curY - fSize, 0, curY + 2);
          g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.5, "#D0D0E0"); g.addColorStop(1, "#606070");
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = "#FFFFFF";
        }
      };

      if (mode === "roll") {
        const title = win.querySelector("#rcRollTitle")?.value || "";
        const rText = win.querySelector("#rcRollText")?.value || "";
        const align = win.querySelector("#rcRollAlign")?.value || "2col";
        const lines = rText.split("\n").filter(l => l.trim());
        const headerH = title ? 40 : 0;
        const lineH = fSize * 1.5;
        const totalH = headerH + lines.length * lineH;
        const prog = pTime / totalDur;
        const curY = H + 20 - prog * (H + totalH + 40);

        ctx.save();
        if (title) {
          const ty = curY;
          if (ty >= -20 && ty <= H + 20) {
            ctx.font = `900 ${fSize + 2}px monospace`;
            ctx.textAlign = "center";
            applyGrad(ty);
            ctx.fillText(title.toUpperCase(), W / 2, ty);
          }
        }

        lines.forEach((l, i) => {
          const ly = curY + headerH + i * lineH;
          if (ly >= -20 && ly <= H + 20) {
            if (align === "2col" && l.includes("|")) {
              const parts = l.split("|");
              ctx.font = `bold ${fSize - 2}px monospace`;
              ctx.textAlign = "right";
              ctx.fillStyle = "#A0B0C0";
              ctx.fillText(parts[0].trim().toUpperCase(), W / 2 - 10, ly);

              ctx.font = `900 ${fSize}px monospace`;
              ctx.textAlign = "left";
              applyGrad(ly);
              ctx.fillText((parts[1] || "").trim().toUpperCase(), W / 2 + 10, ly);
            } else {
              ctx.font = `bold ${fSize}px monospace`;
              ctx.textAlign = "center";
              applyGrad(ly);
              ctx.fillText(l.toUpperCase(), W / 2, ly);
            }
          }
        });
        ctx.restore();
      } else {
        const barH = 30;
        const barY = H - barH - 12;
        const badge = win.querySelector("#rcCrawlBadge")?.value || "PLANTÃO";
        const badgeCol = win.querySelector("#rcCrawlBadgeCol")?.value || "#D00000";
        const cText = win.querySelector("#rcCrawlText")?.value || "";

        ctx.fillStyle = "rgba(6, 16, 32, 0.92)";
        ctx.fillRect(0, barY, W, barH);
        ctx.strokeStyle = "#FFE040";
        ctx.strokeRect(0, barY, W, barH);

        ctx.font = "900 11px monospace";
        const badgeW = ctx.measureText(badge).width + 16;
        ctx.fillStyle = badgeCol;
        ctx.fillRect(0, barY, badgeW, barH);
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.fillText(badge, badgeW / 2, barY + barH / 2 + 4);

        ctx.save();
        ctx.beginPath();
        ctx.rect(badgeW, barY, W - badgeW, barH);
        ctx.clip();

        ctx.font = `bold ${fSize}px monospace`;
        const txtW = ctx.measureText(cText).width;
        const prog = pTime / totalDur;
        const crawlX = W - prog * (W - badgeW + txtW + 60);

        applyGrad(barY + barH / 2 + 4);
        ctx.textAlign = "left";
        ctx.fillText(cText, crawlX, barY + barH / 2 + 4);
        ctx.restore();
      }
    }
    animTimer = requestAnimationFrame(renderPreview);
  };
  animTimer = requestAnimationFrame(renderPreview);
}

function openGeneratorDialog() {
  dialog({
    id: "genWin",
    title: "Gerador de Sinais e Tons Broadcast 1995",
    width: 480,
    body: `
      <label class="fld"><span>Tipo de Sinal de Vídeo ou Tom de Áudio:</span>
        <select id="gn-type">
          <optgroup label="Padrões de Calibração de Vídeo">
            <option value="bars">Barras de Cor Padrão SMPTE NTSC</option>
            <option value="bars_ebu_75">Barras de Cor Padrão EBU 75% (PAL / CCIR 601)</option>
            <option value="multiburst">Padrão Multi-Burst (0.5 a 4.2 MHz - Resolução de Cabeçote)</option>
            <option value="bars_pluge">Barras SMPTE com Pulso Pluge (-3.5 / 0 / +3.5 IRE)</option>
            <option value="crosshatch">Grade de Alinhamento CRT &amp; Geometria (Crosshatch 16×12)</option>
            <option value="grayscale_10">Escala de Cinza em 10 Passos (0 a 100 IRE)</option>
            <option value="leader">Contagem Regressiva Universal (Leader 6..1 com Bip)</option>
            <option value="vhs_home">Cena Filmadora Doméstica VHS 1995</option>
            <option value="commercial">Fundo Dinâmico VT Comercial Anos 90</option>
          </optgroup>
          <optgroup label="Geradores de Tons e Ruídos de Áudio (DSP)">
            <option value="tone_1khz">Tom de Referência 1 kHz (-20 dBFS / 0 VU SMPTE)</option>
            <option value="tone_440hz">Tom de Afinação Musical Lá 440 Hz (Padrão ISO 16)</option>
            <option value="sweep_20_20k">Varredura Senoidal Contínua (Sweep 20 Hz - 20 kHz)</option>
            <option value="pink_noise">Ruído Rosa (Pink Noise - Calibração Acústica RTA)</option>
            <option value="white_noise">Ruído Branco (White Noise - Espectro Contínuo)</option>
          </optgroup>
        </select>
      </label>
      <label class="fld"><span>Duração (segundos):</span>
        <input type="number" id="gn-dur" value="6" min="1" max="300">
      </label>
      <div class="muted" style="font-size:11px;margin-top:4px" id="gn-hint">
        Sinais de vídeo serão inseridos na faixa de vídeo alvo (${(S.targetVideoTrack || "v1").toUpperCase()}). Tons de áudio irão para a faixa ${(S.targetAudioTrack || "a1").toUpperCase()}.
      </div>
    `,
    buttons: [
      {
        label: "Inserir na Faixa Alvo",
        def: 1,
        run: (w) => {
          saveUndoSnapshot();
          const tp = w.querySelector("#gn-type").value;
          const dur = Math.max(1, +w.querySelector("#gn-dur").value || 6);
          const isAud = ["tone_1khz", "tone_440hz", "sweep_20_20k", "pink_noise", "white_noise"].includes(tp);

          const names = {
            bars: "BARRAS_SMPTE_NTSC.MOV",
            bars_ebu_75: "BARRAS_EBU_75_PAL.MOV",
            multiburst: "PADRAO_MULTIBURST_4MHZ.MOV",
            bars_pluge: "SMPTE_BARS_PLUGE.MOV",
            crosshatch: "CROSSHATCH_16x12.MOV",
            grayscale_10: "GRAYSCALE_10_STEPS.MOV",
            leader: "CONTAGEM_REGRESSIVA_95.MOV",
            vhs_home: "FITA_VHS_CASEIRA_95.AVI",
            commercial: "VT_COMERCIAL_95.AVI",
            tone_1khz: "TOM_1KHZ_0VU.WAV",
            tone_440hz: "TOM_LA_440HZ_ISO16.WAV",
            sweep_20_20k: "SWEEP_SENOIDAL_20_20K.WAV",
            pink_noise: "RUIDO_ROSA_RTA.WAV",
            white_noise: "RUIDO_BRANCO_DSP.WAV"
          };

          const tk = isAud ? (S.targetAudioTrack || "a1") : (S.targetVideoTrack || "v1");
          ensureTrackExists(tk);

          const newClip = {
            id: uid(tk + "_"),
            track: tk,
            title: names[tp] || "SINAL_SINTETICO_95",
            synthType: tp,
            start: Number(S.playhead.toFixed(2)),
            inPoint: 0,
            dur,
            speed: 1,
            volume: 100,
            opacity: 100,
            scale: 100,
            posX: 0,
            posY: 0,
            brightness: 0,
            contrast: 0,
            saturation: 100,
            filter: "none",
            trans: "Corte Seco",
            transDur: 1.0
          };

          if (isAud) {
            newClip.rubberband = [
              { offset: 0, vol: 100 },
              { offset: dur, vol: 100 }
            ];
          }

          S.clips[tk].push(newClip);
          resolveTrackOverlaps(tk, newClip.id);
          S.selectedClipId = newClip.id;
          S.selectedClipTrack = tk;
          S.selectedClipIds = [newClip.id];
          recalcSequenceDuration();
          renderAll();
          toast(`${names[tp]} inserido na faixa ${tk.toUpperCase()}!`);
        }
      },
      { label: "Cancelar" }
    ]
  });
}

function openADRDialog() {
  let mediaRec = null, chunks = [];
  dialog({
    id: "adrWin",
    title: "Gravar Narração / Voz pelo Microfone (Voiceover)",
    width: 440,
    body: `
      <p class="muted" style="margin:0">A gravação entra diretamente na faixa ${(S.targetAudioTrack || "a1").toUpperCase()} na posição atual da agulha (${fmtSMPTE(S.playhead)}) enquanto você assiste ao vídeo no Monitor Master.</p>
      <div class="row" style="justify-content:space-between;margin-top:6px">
        <b id="adr-st">Pronto para gravar.</b>
        <div class="row">
          <button type="button" class="btn rec" id="adr-rec">● Gravar</button>
          <button type="button" class="btn" id="adr-stop" disabled>■ Parar e Salvar</button>
        </div>
      </div>
    `,
    buttons: [{ label: "Fechar", def: 1 }],
    onOpen: (w) => {
      const bRec = w.querySelector("#adr-rec"), bStop = w.querySelector("#adr-stop"), st = w.querySelector("#adr-st");
      const startSec = S.playhead;
      bRec.onclick = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          chunks = [];
          mediaRec = new MediaRecorder(stream);
          mediaRec.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
          mediaRec.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            const url = URL.createObjectURL(new Blob(chunks, { type: "audio/webm" }));
            const name = `LOCUCAO_${S.adrTakes.length + 1}.WAV`;
            const dur = Math.max(2, Number((S.playhead - startSec).toFixed(2)) || 4);
            registerImportedFileObject({ name, url, kind: "audio" }, false);
            saveUndoSnapshot();
            const atk = S.targetAudioTrack || "a1";
            ensureTrackExists(atk);
            const newClip = {
              id: uid(atk + "_"), track: atk, title: name, mediaUrl: url, mediaName: name,
              start: startSec, inPoint: 0, dur, volume: 100
            };
            S.clips[atk].push(newClip);
            resolveTrackOverlaps(atk, newClip.id);
            S.adrTakes.push({ name, url });
            renderAll();
            toast(`Locução gravada e adicionada na faixa ${atk.toUpperCase()}!`);
          };
          mediaRec.start();
          if (!S.playing) togglePlay(1);
          bRec.disabled = true; bStop.disabled = false;
          st.textContent = "GRAVANDO MICROFONE...";
        } catch (err) {
          st.textContent = "Erro no microfone: " + err.message;
        }
      };
      bStop.onclick = () => {
        if (mediaRec && mediaRec.state !== "inactive") mediaRec.stop();
        if (S.playing) togglePlay(1);
        bRec.disabled = false; bStop.disabled = true;
        st.textContent = "Gravação finalizada.";
      };
    }
  });
}

function openSlateDialog() {
  const sc = cur();
  if (!sc) { toast("Carregue um roteiro do ScriptRoom para usar o Boletim de Câmera."); return; }
  if (!sc.camLogs) sc.camLogs = [];
  dialog({
    id: "slateWin",
    title: "Claquete Virtual & Boletim de Câmera",
    width: 460,
    body: `
      <div class="grid2">
        <label class="fld"><span>Rolo / Fita:</span><input type="text" id="sl-rolo" value="ROLO 01"></label>
        <label class="fld"><span>Cena:</span><input type="text" id="sl-scn" value="${S.curSceneIdx + 1}"></label>
        <label class="fld"><span>Take:</span><input type="number" id="sl-tk" value="${sc.camLogs.length + 1}"></label>
        <label class="fld"><span>Status:</span><select id="sl-st"><option>BOA (PRINT)</option><option>RESERVA (HOLD)</option><option>FALSA (NG)</option></select></label>
      </div>
      <label class="fld"><span>Observação:</span><input type="text" id="sl-obs"></label>
    `,
    buttons: [
      {
        label: "Bater Claquete",
        def: 1,
        run: (w) => {
          playFoleySound("claquete");
          sc.camLogs.push({
            rolo: w.querySelector("#sl-rolo").value,
            cena: w.querySelector("#sl-scn").value,
            take: +w.querySelector("#sl-tk").value || 1,
            lente: "35mm",
            status: w.querySelector("#sl-st").value,
            obs: w.querySelector("#sl-obs").value
          });
          S.sideTab = "claquete";
          renderSide();
        }
      },
      { label: "Fechar" }
    ]
  });
}

/* ---------- Reconexão de Mídia Offline (Media Relink 1995) ---------- */
function openMediaRelinkDialog() {
  const allClips = [];
  getAllTrackIds().forEach(tk => {
    (S.clips[tk] || []).forEach(c => {
      if (c.mediaUrl || c.mediaId) allClips.push(c);
    });
  });

  const getMediaStatus = (item) => {
    if (!item.url) return { offline: true, reason: "Sem caminho" };
    if (item.offline) return { offline: true, reason: "Marcado como ausente" };
    if (item.kind === "video" && S.videoEls.has(item.url)) {
      const v = S.videoEls.get(item.url);
      if (v.error) return { offline: true, reason: "Erro de decodificação" };
    }
    if (item.kind === "audio" && S.audioEls.has(item.url)) {
      const a = S.audioEls.get(item.url);
      if (a.error) return { offline: true, reason: "Erro no fluxo de áudio" };
    }
    return { offline: false, reason: "Conectado" };
  };

  const renderTableRows = () => {
    if (!S.mediaBin.length) {
      return `<tr><td colspan="5" class="muted" style="text-align:center;padding:16px">Nenhuma mídia importada no projeto atual.</td></tr>`;
    }
    return S.mediaBin.map((item, idx) => {
      const st = getMediaStatus(item);
      const linkedClips = allClips.filter(c => c.mediaUrl === item.url || c.mediaId === item.id);
      const isOff = st.offline;
      return `<tr>
        <td style="text-align:center">
          <span class="badge-${isOff ? "offline" : "online"}">${isOff ? "OFFLINE" : "ONLINE"}</span>
        </td>
        <td><b>${escH(item.name)}</b></td>
        <td>${escH(item.res || item.kind)}</td>
        <td style="text-align:center">${linkedClips.length} clipe(s)</td>
        <td>
          <button type="button" class="btn sm" data-relinkidx="${idx}">Localizar Arquivo…</button>
          <button type="button" class="btn sm" data-toggleoffidx="${idx}">${isOff ? "Tornar Online" : "Marcar Offline"}</button>
        </td>
      </tr>`;
    }).join("");
  };

  const w = dialog({
    id: "relinkWin",
    title: "Reconectar Mídias Ausentes (Media Relink 1995)",
    width: 630,
    body: `
      <div style="margin-bottom:8px">
        <span>O ScriptEditor 95 mantém referências aos arquivos originais do seu disco sem alterá-los. Se você moveu ou renomeou seus arquivos de vídeo ou áudio, use esta ferramenta para restabelecer a conexão sem perder seus cortes e transições:</span>
      </div>
      <div style="max-height:260px;overflow:auto;border:2px inset #fff;background:#fff;margin-bottom:8px">
        <table class="tbl" style="width:100%;font-size:11px" id="relinkTable">
          <thead>
            <tr>
              <th style="width:75px">Status</th>
              <th>Nome da Mídia</th>
              <th>Formato</th>
              <th style="width:85px">Timeline</th>
              <th style="width:185px">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${renderTableRows()}
          </tbody>
        </table>
      </div>
      <div class="row" style="justify-content:space-between;align-items:center">
        <span class="muted" id="relinkSummary">${S.mediaBin.length} mídias no Bin · ${allClips.length} referências na Linha do Tempo</span>
        <button type="button" class="btn" id="btnRelinkBatch">Buscar Pasta com Mídias…</button>
      </div>
    `,
    buttons: [
      { label: "Fechar", def: 1 }
    ]
  });

  const applyRelinkReplacement = (item, newFile) => {
    saveUndoSnapshot();
    const oldUrl = item.url;
    item.url = newFile.url;
    item.name = newFile.name;
    item.offline = false;
    if (newFile.path) item.path = newFile.path;

    if (item.kind === "video") {
      const v = document.createElement("video");
      v.src = item.url;
      v.preload = "auto";
      getMediaPool().appendChild(v);
      S.videoEls.set(item.url, v);
      extractAudioPeaksForItem(item);
    } else if (item.kind === "audio") {
      const a = document.createElement("audio");
      a.src = item.url;
      a.preload = "auto";
      getMediaPool().appendChild(a);
      S.audioEls.set(item.url, a);
      extractAudioPeaksForItem(item);
    }

    let affectedClips = 0;
    getAllTrackIds().forEach(tk => {
      (S.clips[tk] || []).forEach(c => {
        if (c.mediaUrl === oldUrl || c.mediaId === item.id) {
          c.mediaUrl = newFile.url;
          c.title = newFile.name;
          c.offline = false;
          affectedClips++;
        }
      });
    });

    renderAll();
    toast(`Mídia "${newFile.name}" reconectada com sucesso (${affectedClips} clipe(s) atualizados)!`);
  };

  const bindActions = () => {
    const tb = w.querySelector("#relinkTable tbody");
    if (!tb) return;
    tb.innerHTML = renderTableRows();

    tb.querySelectorAll("[data-relinkidx]").forEach(b => {
      b.onclick = async () => {
        const idx = +b.dataset.relinkidx;
        const item = S.mediaBin[idx];
        if (!item) return;

        if (window.editorNative && typeof window.editorNative.pickMedia === "function") {
          const files = await window.editorNative.pickMedia(item.kind === "audio" ? "audio" : "video");
          if (files && files.length) {
            applyRelinkReplacement(item, files[0]);
            bindActions();
          }
        } else {
          const inp = document.createElement("input");
          inp.type = "file";
          inp.accept = item.kind === "audio" ? "audio/*" : (item.kind === "image" ? "image/*" : "video/*");
          inp.onchange = () => {
            if (inp.files && inp.files[0]) {
              const file = inp.files[0];
              const url = URL.createObjectURL(file);
              applyRelinkReplacement(item, { name: file.name, url, kind: item.kind });
              bindActions();
            }
          };
          inp.click();
        }
      };
    });

    tb.querySelectorAll("[data-toggleoffidx]").forEach(b => {
      b.onclick = () => {
        const idx = +b.dataset.toggleoffidx;
        const item = S.mediaBin[idx];
        if (!item) return;
        item.offline = !item.offline;
        getAllTrackIds().forEach(tk => {
          (S.clips[tk] || []).forEach(c => {
            if (c.mediaUrl === item.url || c.mediaId === item.id) {
              c.offline = item.offline;
            }
          });
        });
        renderAll();
        bindActions();
        toast(`Mídia "${item.name}" ${item.offline ? "marcada como OFFLINE" : "marcada como ONLINE"}.`);
      };
    });
  };

  const bBatch = w.querySelector("#btnRelinkBatch");
  if (bBatch) {
    bBatch.onclick = async () => {
      if (window.editorNative && typeof window.editorNative.pickMedia === "function") {
        const files = await window.editorNative.pickMedia("all");
        if (files && files.length) {
          let reconnected = 0;
          files.forEach(f => {
            const matchItem = S.mediaBin.find(m => m.name.toLowerCase() === f.name.toLowerCase());
            if (matchItem) {
              applyRelinkReplacement(matchItem, f);
              reconnected++;
            }
          });
          bindActions();
          toast(`${reconnected} mídia(s) reconectada(s) automaticamente pelo lote!`);
        }
      } else {
        toast("Selecione os arquivos individualmente pelo botão [Localizar Arquivo…].");
      }
    };
  }

  bindActions();
}

/* ---------- Janela de Timecode na Tela (Window Dub 1995) ---------- */
function openWindowDubDialog() {
  prefs.windowDub = prefs.windowDub || {
    enabled: false,
    mode: "master",
    pos: "bottom-center",
    size: 22,
    opacity: 85,
    burnExport: false
  };

  const w = dialog({
    id: "wdWin",
    title: "Janela de Timecode na Tela (Window Dub 1995)",
    width: 480,
    body: `
      <div style="margin-bottom:8px">
        <span>O recurso <b>Window Dub</b> insere uma sobreposição técnica de código de tempo (SMPTE Timecode) de alta precisão sobre a tela de prévia e/ou no arquivo final exportado:</span>
      </div>
      <label class="fld" style="flex-direction:row;align-items:center;gap:8px;margin-bottom:8px">
        <input type="checkbox" id="wd-enabled" ${prefs.windowDub.enabled ? "checked" : ""}>
        <b>Ativar Sobreposição de Timecode (Window Dub OSD)</b>
      </label>
      <div style="border:2px groove #fff;padding:10px;background:#C0C0C0;margin-bottom:8px">
        <label class="fld"><span>Formato do Timecode:</span>
          <select id="wd-mode">
            <option value="master" ${prefs.windowDub.mode === "master" ? "selected" : ""}>TCR Master (hh:mm:ss:ff - Tempo da Sequência)</option>
            <option value="source" ${prefs.windowDub.mode === "source" ? "selected" : ""}>TCO Origem (hh:mm:ss:ff - Fotograma da Fita Bruta)</option>
            <option value="both" ${prefs.windowDub.mode === "both" ? "selected" : ""}>Mestre + Origem (TCR &amp; TCO Lado a Lado)</option>
            <option value="frames" ${prefs.windowDub.mode === "frames" ? "selected" : ""}>Contador Absoluto de Fotogramas (Frame Count)</option>
            <option value="countdown" ${prefs.windowDub.mode === "countdown" ? "selected" : ""}>Contagem Regressiva para o Fim da Fita (REM)</option>
          </select>
        </label>
        <div class="row" style="gap:8px">
          <label class="fld" style="flex:1"><span>Posicionamento:</span>
            <select id="wd-pos">
              <option value="bottom-center" ${prefs.windowDub.pos === "bottom-center" ? "selected" : ""}>Centro Inferior (Padrão Broadcast)</option>
              <option value="bottom-left" ${prefs.windowDub.pos === "bottom-left" ? "selected" : ""}>Canto Inferior Esquerdo</option>
              <option value="bottom-right" ${prefs.windowDub.pos === "bottom-right" ? "selected" : ""}>Canto Inferior Direito</option>
              <option value="top-center" ${prefs.windowDub.pos === "top-center" ? "selected" : ""}>Centro Superior</option>
              <option value="top-left" ${prefs.windowDub.pos === "top-left" ? "selected" : ""}>Canto Superior Esquerdo</option>
              <option value="top-right" ${prefs.windowDub.pos === "top-right" ? "selected" : ""}>Canto Superior Direito</option>
            </select>
          </label>
          <label class="fld" style="width:125px"><span>Tamanho Fonte:</span>
            <select id="wd-size">
              <option value="16" ${prefs.windowDub.size === 16 ? "selected" : ""}>16 px (Discreto)</option>
              <option value="22" ${prefs.windowDub.size === 22 ? "selected" : ""}>22 px (Médio)</option>
              <option value="28" ${prefs.windowDub.size === 28 ? "selected" : ""}>28 px (Grande)</option>
              <option value="36" ${prefs.windowDub.size === 36 ? "selected" : ""}>36 px (Estúdio)</option>
            </select>
          </label>
        </div>
        <div class="row" style="gap:8px;margin-top:6px;align-items:center">
          <label class="fld" style="flex:1"><span>Opacidade do Fundo (%):</span>
            <input type="range" id="wd-opacity" min="0" max="100" value="${prefs.windowDub.opacity || 85}">
          </label>
          <span style="font-family:monospace;min-width:40px" id="wd-opVal">${prefs.windowDub.opacity || 85}%</span>
        </div>
      </div>
      <label class="fld" style="flex-direction:row;align-items:center;gap:8px">
        <input type="checkbox" id="wd-burn" ${prefs.windowDub.burnExport ? "checked" : ""}>
        <span><b>Gravar no Arquivo Master Exportado (Burn-in na Exportação)</b></span>
      </label>
    `,
    buttons: [
      {
        label: "Aplicar",
        def: 1,
        run: (wBox) => {
          prefs.windowDub = {
            enabled: wBox.querySelector("#wd-enabled").checked,
            mode: wBox.querySelector("#wd-mode").value,
            pos: wBox.querySelector("#wd-pos").value,
            size: +wBox.querySelector("#wd-size").value || 22,
            opacity: +wBox.querySelector("#wd-opacity").value || 85,
            burnExport: wBox.querySelector("#wd-burn").checked
          };
          savePrefs();
          renderMonitorFrame();
          toast(prefs.windowDub.enabled ? "Window Dub ativado no Monitor!" : "Window Dub desativado.");
        }
      },
      { label: "Fechar" }
    ]
  });

  const winDubEl = document.getElementById("winDubWin");
  const opR = winDubEl ? winDubEl.querySelector("#wd-opacity") : null;
  const opV = winDubEl ? winDubEl.querySelector("#wd-opVal") : null;
  if (opR && opV) {
    opR.oninput = () => { opV.textContent = opR.value + "%"; };
  }
}

/* ---------- Calculadora Broadcast SMPTE 12M & Bitolas de Cinema ---------- */
function openSmpteCalculatorDialog() {
  let mainSec = S.playhead;
  let memSec = null;
  let curOp = null; // "+" | "-" | "*"

  dialog({
    id: "calcSmpteWin",
    title: "Calculadora Broadcast SMPTE 12M — Sincronismo & Bitolas de Cinema",
    width: 460,
    body: `
      <div class="col" style="gap:8px">
        <div class="smpte-calc-vfd">
          <span style="font-size:11px;opacity:0.75" id="calcMemDisp">MEM: VAZIA</span>
          <span style="font-size:26px;font-weight:900;letter-spacing:2px" id="calcMainDisp">${formatTimecodeSMPTE(mainSec, prefs.dropFrame)}</span>
        </div>

        <!-- Painel de Conversão Instantânea de Padrões e Bitolas -->
        <div class="fx-group" style="padding:6px;font-size:10.5px">
          <div class="grid2" style="gap:4px">
            <div><b>NTSC 29.97 DF:</b> <span id="tcNtscDf" style="font-family:monospace;color:#008040">00:00:00;00</span></div>
            <div><b>NTSC NDF (30fps):</b> <span id="tcNtscNdf" style="font-family:monospace">00:00:00:00</span></div>
            <div><b>PAL / SECAM (25fps):</b> <span id="tcPal" style="font-family:monospace">00:00:00:00</span></div>
            <div><b>Cinema (24fps):</b> <span id="tcCinema" style="font-family:monospace">00:00:00:00</span></div>
            <div><b>Película 35mm (16q/pé):</b> <span id="tc35mm" style="font-family:monospace;color:#800040">0' 00"</span></div>
            <div><b>Película 16mm (40q/pé):</b> <span id="tc16mm" style="font-family:monospace">0' 00"</span></div>
          </div>
          <div style="margin-top:4px;border-top:1px dashed #aaa;padding-top:3px;display:flex;justify-content:space-between">
            <span>Total de Quadros Absolutos:</span>
            <b id="tcTotalFrames" style="font-family:monospace;font-size:12px">0 frames</b>
          </div>
        </div>

        <!-- Teclas de Grade de Comerciais de Televisão -->
        <div class="row" style="gap:4px;justify-content:space-between">
          <button type="button" class="btn sm" id="calcAdd15">+15s Spot</button>
          <button type="button" class="btn sm" id="calcAdd30">+30s Padrão</button>
          <button type="button" class="btn sm" id="calcAdd60">+60s Comercial</button>
          <button type="button" class="btn sm" id="calcAdd180">+3min Bloco</button>
        </div>

        <!-- Teclado Numérico da Calculadora SMPTE -->
        <div class="smpte-calc-keys">
          <button type="button" class="btn" data-ck="7">7</button>
          <button type="button" class="btn" data-ck="8">8</button>
          <button type="button" class="btn" data-ck="9">9</button>
          <button type="button" class="btn def" data-ck="+">+</button>

          <button type="button" class="btn" data-ck="4">4</button>
          <button type="button" class="btn" data-ck="5">5</button>
          <button type="button" class="btn" data-ck="6">6</button>
          <button type="button" class="btn def" data-ck="-">-</button>

          <button type="button" class="btn" data-ck="1">1</button>
          <button type="button" class="btn" data-ck="2">2</button>
          <button type="button" class="btn" data-ck="3">3</button>
          <button type="button" class="btn def" data-ck="=">=</button>

          <button type="button" class="btn" data-ck="0">0</button>
          <button type="button" class="btn" data-ck=":">:</button>
          <button type="button" class="btn" data-ck="C">C</button>
          <button type="button" class="btn" id="calcBtnCapture">Capturar</button>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Mover Agulha para este Timecode",
        def: 1,
        run: (w) => {
          setPlayhead(mainSec, false);
          toast(`Agulha posicionada em ${formatTimecodeSMPTE(mainSec, prefs.dropFrame)}!`);
        }
      },
      { label: "Fechar" }
    ]
  });

  const win = document.getElementById("calcSmpteWin");
  if (!win) return;

  const updateDisplays = () => {
    const mainDisp = win.querySelector("#calcMainDisp");
    const memDisp = win.querySelector("#calcMemDisp");
    if (mainDisp) mainDisp.textContent = formatTimecodeSMPTE(mainSec, prefs.dropFrame);
    if (memDisp) {
      memDisp.textContent = memSec != null ? `MEM: ${formatTimecodeSMPTE(memSec, prefs.dropFrame)} ${curOp || ""}` : "MEM: VAZIA";
    }

    // Atualiza conversões
    const totalFrames2997 = Math.round(mainSec * 29.97);
    const totalFrames25 = Math.round(mainSec * 25.0);
    const totalFrames24 = Math.round(mainSec * 24.0);

    const df = win.querySelector("#tcNtscDf");
    const ndf = win.querySelector("#tcNtscNdf");
    const pal = win.querySelector("#tcPal");
    const cine = win.querySelector("#tcCinema");
    const f35 = win.querySelector("#tc35mm");
    const f16 = win.querySelector("#tc16mm");
    const tf = win.querySelector("#tcTotalFrames");

    if (df) df.textContent = formatTimecodeSMPTE(mainSec, true);
    if (ndf) ndf.textContent = formatTimecodeSMPTE(mainSec, false);
    if (pal) pal.textContent = formatTimecodeSMPTE(mainSec, false);
    if (cine) cine.textContent = formatTimecodeSMPTE(mainSec, false);

    // 35mm: 16 frames por pé
    const feet35 = Math.floor(totalFrames24 / 16);
    const rem35 = totalFrames24 % 16;
    if (f35) f35.textContent = `${feet35}' ${String(rem35).padStart(2, "0")}"`;

    // 16mm: 40 frames por pé
    const feet16 = Math.floor(totalFrames24 / 40);
    const rem16 = totalFrames24 % 40;
    if (f16) f16.textContent = `${feet16}' ${String(rem16).padStart(2, "0")}"`;

    if (tf) tf.textContent = `${totalFrames2997} quadros`;
  };

  updateDisplays();

  // Teclas numéricas e operadores
  win.querySelectorAll("[data-ck]").forEach(btn => {
    btn.onclick = () => {
      const k = btn.dataset.ck;
      if (k >= "0" && k <= "9") {
        mainSec = mainSec * 10 + (+k);
        if (mainSec > 86400) mainSec = 86400;
        updateDisplays();
      } else if (k === "C") {
        mainSec = 0;
        memSec = null;
        curOp = null;
        updateDisplays();
      } else if (k === "+") {
        memSec = mainSec;
        curOp = "+";
        mainSec = 0;
        updateDisplays();
      } else if (k === "-") {
        memSec = mainSec;
        curOp = "-";
        mainSec = 0;
        updateDisplays();
      } else if (k === "=") {
        if (memSec != null && curOp) {
          if (curOp === "+") mainSec = memSec + mainSec;
          else if (curOp === "-") mainSec = Math.max(0, memSec - mainSec);
          memSec = null;
          curOp = null;
          updateDisplays();
        }
      }
    };
  });

  // Comerciais
  win.querySelector("#calcAdd15")?.addEventListener("click", () => { mainSec += 15; updateDisplays(); });
  win.querySelector("#calcAdd30")?.addEventListener("click", () => { mainSec += 30; updateDisplays(); });
  win.querySelector("#calcAdd60")?.addEventListener("click", () => { mainSec += 60; updateDisplays(); });
  win.querySelector("#calcAdd180")?.addEventListener("click", () => { mainSec += 180; updateDisplays(); });

  win.querySelector("#calcBtnCapture")?.addEventListener("click", () => {
    mainSec = S.playhead;
    updateDisplays();
    toast(`Timecode ${formatTimecodeSMPTE(mainSec, prefs.dropFrame)} capturado da agulha!`);
  });
}

/* ---------- Modelo de Projeto Não-Destrutivo (.PPJ), Salvamento, Autosave & Crash Recovery ---------- */
function buildProjectSnapshot() {
  syncActiveSequenceToState();
  return {
    format: "ScriptEditor95-PPJ",
    version: APP_VERSAO,
    projectName: S.projectName,
    savedAt: new Date().toISOString(),
    activeSequenceId: S.activeSequenceId,
    sequences: S.sequences.map(seq => ({
      id: seq.id,
      name: seq.name,
      totalDur: seq.totalDur,
      playhead: seq.playhead,
      tlIn: seq.tlIn,
      tlOut: seq.tlOut,
      targetVideoTrack: seq.targetVideoTrack,
      targetAudioTrack: seq.targetAudioTrack,
      videoTracks: seq.videoTracks,
      audioTracks: seq.audioTracks,
      tracksMuted: seq.tracksMuted,
      tracksLocked: seq.tracksLocked,
      tracksSolo: seq.tracksSolo,
      trackVolumes: seq.trackVolumes,
      trackPans: seq.trackPans,
      markers: seq.markers,
      clips: seq.clips
    })),
    // Compatibilidade com versões 1.0.0 a 1.0.5:
    totalDur: S.totalDur,
    playhead: S.playhead,
    targetVideoTrack: S.targetVideoTrack,
    targetAudioTrack: S.targetAudioTrack,
    videoTracks: S.videoTracks,
    audioTracks: S.audioTracks,
    tracksMuted: S.tracksMuted,
    tracksLocked: S.tracksLocked,
    tracksSolo: S.tracksSolo,
    trackVolumes: S.trackVolumes,
    trackPans: S.trackPans,
    markers: S.markers,
    clips: S.clips,
    tlIn: S.tlIn,
    tlOut: S.tlOut,
    vhsSettings: S.vhsSettings ? Object.assign({}, S.vhsSettings) : null,
    mediaBin: S.mediaBin.map(m => ({
      id: m.id,
      name: m.name,
      url: m.url,
      path: m.path,
      kind: m.kind,
      dur: m.dur,
      res: m.res
    }))
  };
}

async function saveCurrentProject(asNew = false) {
  const data = buildProjectSnapshot();
  const jsonStr = JSON.stringify(data, null, 2);

  if (window.editorNative && typeof window.editorNative.pickProjectSavePath === "function") {
    let targetPath = S.projectFilePath;
    if (!targetPath || asNew) {
      const defaultName = S.projectName.toUpperCase().endsWith(".PPJ") ? S.projectName : `${S.projectName}.PPJ`;
      targetPath = await window.editorNative.pickProjectSavePath(defaultName);
      if (!targetPath) return false; // cancelou
    }
    const ok = await window.editorNative.writeToPath(targetPath, jsonStr);
    if (ok) {
      S.projectFilePath = targetPath;
      S.projectName = targetPath.split(/[/\\]/).pop().toUpperCase();
      S.isDirty = false;
      updateStatusBar();
      addRecentProject(targetPath, S.projectName);
      toast(`Projeto salvo em ${S.projectName} com sucesso!`);
      return true;
    } else {
      toast("Erro ao gravar arquivo de projeto no disco.");
      return false;
    }
  } else {
    // Fallback Web / LocalStorage + Download direto do arquivo .PPJ
    localStorage.setItem("varguelia.scripteditor.currentProject", jsonStr);
    try {
      const fileName = S.projectName.toUpperCase().endsWith(".PPJ") ? S.projectName : `${S.projectName}.PPJ`;
      const blob = new Blob([jsonStr], { type: "application/json" });
      const dlLink = document.createElement("a");
      dlLink.href = URL.createObjectURL(blob);
      dlLink.download = fileName;
      document.body.appendChild(dlLink);
      dlLink.click();
      setTimeout(() => { dlLink.remove(); URL.revokeObjectURL(dlLink.href); }, 1000);
    } catch (_e) {}
    S.isDirty = false;
    updateStatusBar();
    toast(`Projeto ${S.projectName} salvo! Arquivo .PPJ baixado.`);
    return true;
  }
}

function openNewProjectCustomDialog() {
  const w = openDialog({
    title: "Novo Projeto — Predefinições de Montagem 1995",
    width: 480,
    body: `
      <div class="col" style="gap:10px">
        <div class="muted" style="font-size:11px">Configure os parâmetros da sua nova sequência master. A linha do tempo será iniciada totalmente vazia.</div>
        <div class="fx-group">
          <div class="fx-title">Configurações Gerais do Projeto</div>
          <div class="slider-row" style="grid-template-columns:120px 1fr">
            <span>Nome do Arquivo:</span>
            <input type="text" id="npName" value="PROJETO_LIVRE_01.PPJ" style="font-weight:700">
          </div>
          <div class="slider-row" style="grid-template-columns:120px 1fr">
            <span>Padrão de Vídeo:</span>
            <select id="npPreset">
              <option value="4:3_ntsc" selected>4:3 Betacam SP NTSC (640×480 · 29.97 fps)</option>
              <option value="16:9_dv">16:9 DV NTSC Widescreen (720×480 · 29.97 fps)</option>
              <option value="4:3_pal">4:3 PAL Emissora (768×576 · 25.00 fps)</option>
              <option value="16:9_hd">16:9 Película Cinema HD (1280×720 · 24.00 fps)</option>
              <option value="1:1_sq">1:1 Quadrado Multimídia (600×600 · 30.00 fps)</option>
            </select>
          </div>
          <div class="slider-row" style="grid-template-columns:120px 1fr">
            <span>Taxa de Quadros:</span>
            <select id="npFps">
              <option value="29.97" selected>29.97 quadros/seg (NTSC broadcast)</option>
              <option value="24">24.00 quadros/seg (Cinema clássico)</option>
              <option value="25">25.00 quadros/seg (PAL europeu)</option>
              <option value="30">30.00 quadros/seg (Digital progressivo)</option>
            </select>
          </div>
        </div>
        <div class="fx-group">
          <div class="fx-title">Faixas e Mídias</div>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="npClearBin" checked>
            Iniciar com o Gerenciador de Mídias (Bin) vazio
          </label>
        </div>
        <div class="row" style="justify-content:flex-end;gap:6px;margin-top:6px">
          <button type="button" class="btn" id="npBtnCancel">Cancelar</button>
          <button type="button" class="btn def" id="npBtnConfirm">Criar Projeto Vazio ►</button>
        </div>
      </div>
    `
  });

  w.querySelector("#npBtnCancel").onclick = () => closeDialog(w);
  w.querySelector("#npBtnConfirm").onclick = () => {
    let nome = (w.querySelector("#npName").value || "PROJETO_LIVRE.PPJ").trim();
    if (!nome.toUpperCase().endsWith(".PPJ")) nome += ".PPJ";
    const clearBin = w.querySelector("#npClearBin").checked;
    closeDialog(w);
    createStarterFreeProject(nome, !clearBin);
    toast(`Projeto vazio "${nome}" pronto para montagem!`);
  };
}

/* ---------- Dica do Dia & Novidades (Estilo Windows 95) ---------- */
const DICAS_95 = [
  "No Quadro de cenas, arraste os blocos para reordenar a montagem. O timecode e a duração recalculam em tempo real.",
  "Pressione 'C' para a Lâmina Gillette de corte, 'V' para o Ponteiro de seleção e 'D' para eliminar ondulação (Ripple Delete).",
  "Você pode usar as teclas J, K e L para controlar a reprodução como num console Betacam SP: J rebobina, K pausa e L avança!",
  "Você pode selecionar múltiplos clipes na timeline arrastando o retângulo do mouse ou clicando com Shift ou Ctrl.",
  "A Mesa de Som Analógica 95 possui faders lineares verticais em dB, pan estéreo e equalizador DSP gráfico de 10 bandas.",
  "Dê duplo-clique em um corte para inserir transições de época como Virada de Página 3D, Íris Circular ou Persianas.",
  "O ScriptEditor detecta alterações salvas na pasta Documentos\\ScriptRoom e sincroniza seus roteiros automaticamente.",
  "Ative a Suite Analógica VHS / Betacam SP no menu Efeitos para adicionar ruído de cabeçote, dropouts e tracking de fita.",
  "O atalho 'Ctrl+N' cria uma nova sequência limpa no projeto para você montar tomadas alternativas ou atos separados.",
  "Ao exportar seu filme (Ctrl+M), você pode escolher o formato de vídeo (.MP4, .AVI, .MOV, .WEBM) e resolução master."
];
let curDicaIdx = 0;
let _welcomeTipIdx = 0;

function hideProjectWorkspace() {
  S.hasActiveProject = false;
  const bd = document.getElementById("welcomeMdiBackdrop");
  if (bd) bd.style.display = "flex";

  if (S.programVideoEl) {
    try { S.programVideoEl.pause(); } catch (_e) {}
  }
  if (S.srcVideoEl) {
    try { S.srcVideoEl.pause(); } catch (_e) {}
  }

  updateStatusBar();
}

function revealProjectWorkspace(customToast = null) {
  S.hasActiveProject = true;
  const bd = document.getElementById("welcomeMdiBackdrop");
  if (bd) bd.style.display = "none";

  updateStatusBar();
  renderAll();
  renderTimeline();
  renderMonitorFrame();
  if (customToast) toast(customToast);
}

function fecharProjeto() {
  const hasClips = getAllTrackIds().some(tk => (S.clips[tk] || []).length > 0);
  const needsPrompt = S.hasActiveProject && (S.isDirty || hasClips || S.mediaBin.length > 0);

  if (needsPrompt) {
    const win95QuestionSvg = `
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" style="filter:drop-shadow(1px 1px 0 #fff)">
        <circle cx="16" cy="16" r="14" fill="#000080" stroke="#000" stroke-width="1.2"/>
        <circle cx="16" cy="16" r="12" fill="#FFFF00"/>
        <path d="M11 11a5 5 0 0 1 9.5-1.5c.8 1.5 0 3.2-1.5 4.5-1.2 1-1.8 1.8-1.8 3.5h-2.5c0-2.5 1-3.6 2.4-4.8 1-0.9 1.4-1.6 1-2.4a2.8 2.8 0 0 0-5.3.7z" fill="#000"/>
        <rect x="14.7" y="20.5" width="2.8" height="2.8" fill="#000"/>
      </svg>
    `;

    dialog({
      id: "closeProjectConfirmWin",
      title: "ScriptEditor 95",
      width: 440,
      modal: true,
      body: `
        <div class="row" style="gap:16px;align-items:flex-start;padding:8px 4px 6px">
          <div style="flex-shrink:0;padding-top:2px">
            ${win95QuestionSvg}
          </div>
          <div class="col" style="gap:10px;font-size:12px;line-height:1.45;color:var(--hi-text, #000)">
            <div style="font-weight:700">O projeto "${escH(S.projectName || "PROJETO_LIVRE.PPJ")}" foi alterado.</div>
            <div>Deseja salvar as alterações antes de fechar o projeto e voltar à tela inicial?</div>
          </div>
        </div>
      `,
      buttons: [
        {
          label: "Sim",
          def: 1,
          run: async (w) => {
            closeDialog(w);
            const ok = await saveCurrentProject(false);
            if (ok !== false) {
              doCloseProject();
            }
          }
        },
        {
          label: "Não",
          run: (w) => {
            closeDialog(w);
            S.isDirty = false;
            doCloseProject();
          }
        },
        {
          label: "Cancelar"
        }
      ]
    });
    return;
  }
  doCloseProject();
}

function doCloseProject() {
  stop();
  stopSourcePlayback();
  saveUndoSnapshot();
  hideProjectWorkspace();
  openWelcomeDialog();
  toast("Projeto fechado. Área de trabalho em espera.");
}

function openIslandSettingsDialog() {
  dialog({
    id: "islandSettingsWin",
    title: "Configurações da Ilha de Edição 95 — Broadcast & Sincronismo",
    width: 480,
    body: `
      <div class="col" style="gap:10px">
        <div class="muted" style="font-size:11px">Ajuste os padrões de broadcast, padrão de cores analógicas e padrão de sincronismo SMPTE da ilha.</div>
        <div class="fx-group">
          <div class="fx-title">Padrão de Timecode SMPTE 12M</div>
          <label class="row" style="gap:6px;font-size:11px;margin-bottom:4px">
            <input type="radio" name="isTcStd" id="isTcDF" value="DF" ${prefs.dropFrame ? "checked" : ""}>
            <b>Drop-Frame (DF)</b> — Formato 00:00:00;00 com ponto-e-vírgula (NTSC Televisão Broadcast 29.97 fps)
          </label>
          <label class="row" style="gap:6px;font-size:11px">
            <input type="radio" name="isTcStd" id="isTcNDF" value="NDF" ${!prefs.dropFrame ? "checked" : ""}>
            <b>Non-Drop Frame (NDF)</b> — Formato 00:00:00:00 com dois-pontos (Padrão Cinema e Produção Geral)
          </label>
        </div>
        <div class="fx-group">
          <div class="fx-title">Padrão de Emissão de Vídeo & Resolução</div>
          <div class="slider-row" style="grid-template-columns:120px 1fr">
            <span>Sistema Broadcast:</span>
            <select id="isBroadcastSys">
              <option value="ntsc" selected>NTSC 525 Linhas / 60 Hz (29.97 fps · Betacam SP)</option>
              <option value="palm">PAL-M 525 Linhas / 60 Hz (29.97 fps · Brasil Broadcast)</option>
              <option value="pal">PAL 625 Linhas / 50 Hz (25.00 fps · Europa)</option>
            </select>
          </div>
          <div class="slider-row" style="grid-template-columns:120px 1fr">
            <span>Taxa de Amostragem Áudio:</span>
            <select id="isAudioRate">
              <option value="44100" selected>44.100 Hz · 16-bit PCM Estéreo (Compact Disc)</option>
              <option value="48000">48.000 Hz · 16-bit DAT Master (Fita Digital DAT)</option>
            </select>
          </div>
        </div>
        <div class="fx-group">
          <div class="fx-title">Guias e Monitores de Referência</div>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="isSafeAreas" ${prefs.safeArea ? "checked" : ""}>
            Exibir Áreas de Segurança de TV (Action Safe 90% & Title Safe 80%)
          </label>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="isCC21" ${prefs.cc ? "checked" : ""}>
            Ativar Closed Caption Linha 21 na pré-visualização
          </label>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Cancelar",
        run: (w) => closeDialog(w)
      },
      {
        label: "Salvar Configurações",
        def: 1,
        run: (w) => {
          const isDF = w.querySelector("#isTcDF").checked;
          prefs.dropFrame = isDF;
          S.timecodeDropFrame = isDF;
          prefs.safeArea = w.querySelector("#isSafeAreas").checked;
          prefs.cc = w.querySelector("#isCC21").checked;
          savePrefs();
          closeDialog(w);
          renderTimeline();
          renderMonitorFrame();
          toast(`Configurações da Ilha salvas! Timecode: ${isDF ? "Drop-Frame (DF ;)" : "Non-Drop Frame (NDF :)"}`);
        }
      }
    ]
  });
}

function openWelcomeDialog() {
  const recents = getRecentProjects();
  const defaultProjects = [
    { name: "EP01 · A NOITE VERMELHA", seq: "SEQUÊNCIA PRINCIPAL", dur: "00:03:15:00", used: "há 16 h" },
    { name: "EP21 · Antes tarde do que nunca", seq: "ESCALETA 1° BLOCO", dur: "00:02:40:00", used: "há 16 h" },
    { name: "PROJ01 · FITA MESTRE PILOTO", seq: "MONTAGEM CORTE FINO", dur: "00:05:00:00", used: "há 18 h" },
    { name: "EP20 · LALA (PARTE 2)", seq: "SEQUÊNCIA PRINCIPAL", dur: "00:04:12:00", used: "há 1 dia" },
    { name: "EP19 · LALA (PARTE 1)", seq: "SEQUÊNCIA PRINCIPAL", dur: "00:03:50:00", used: "há 1 dia" },
    { name: "EP18 · ARQUIVO MORTO", seq: "SEQUÊNCIA PRINCIPAL", dur: "00:04:30:00", used: "há 1 dia" },
    { name: "EP17 · SECOS NO ESCURO", seq: "SEQUÊNCIA PRINCIPAL", dur: "00:03:10:00", used: "há 1 dia" },
    { name: "EP16 · SANGUE E LUZ", seq: "SEQUÊNCIA PRINCIPAL", dur: "00:02:55:00", used: "há 1 dia" }
  ];

  // Mescla projetos salvos recentemente com a lista de demonstração
  const projectList = recents.length ? recents.map(r => ({
    name: r.name,
    seq: r.seq || "SEQUÊNCIA PRINCIPAL",
    dur: r.dur || "00:03:00:00",
    used: r.date ? (r.date.split(" ")[0] === new Date().toLocaleDateString("pt-BR") ? "hoje" : r.date) : "recentemente",
    path: r.path
  })).concat(defaultProjects.slice(recents.length)) : defaultProjects;

  const heroProj = projectList[0] || defaultProjects[0];

  const buildRows = (filter = "") => {
    const q = filter.trim().toLowerCase();
    const filtered = q ? projectList.filter(p => p.name.toLowerCase().includes(q) || p.seq.toLowerCase().includes(q)) : projectList;
    if (!filtered.length) {
      return `<tr><td colspan="4" class="muted" style="text-align:center;padding:12px">Nenhum projeto encontrado para "${escH(q)}"</td></tr>`;
    }
    return filtered.map((p, idx) => `
      <tr data-projidx="${idx}" title="Clique duas vezes para abrir ${escH(p.name)}">
        <td>📄 <b>${escH(p.name)}</b></td>
        <td>${escH(p.seq)}</td>
        <td style="font-family:var(--f-pix, monospace)">${escH(p.dur)}</td>
        <td class="muted">${escH(p.used)}</td>
      </tr>
    `).join("");
  };

  const w = openDialog({
    title: "Bem-vindo ao ScriptEditor",
    width: 740,
    body: `
      <div class="welcome-grid">
        <!-- Coluna Esquerda -->
        <div class="welcome-left-col">
          <div class="welcome-banner-card">
            <div class="welcome-banner-icon">🎬</div>
            <div class="welcome-brand-title">SCRIPTEDITOR</div>
            <div class="welcome-brand-sub">edição 95</div>
          </div>

          <div class="welcome-tip-box">
            <div class="welcome-tip-hdr">💡 Você sabia...</div>
            <div class="welcome-tip-body" id="wTipText">${escH(DICAS_95[_welcomeTipIdx % DICAS_95.length])}</div>
            <button type="button" class="btn sm" id="wBtnNextTip" style="align-self:flex-start">Próxima dica</button>
          </div>

          <div class="welcome-stats-line" id="wStatsLine">
            ${projectList.length} projetos · ${(S.sequences || []).length || 1} sequências
          </div>
        </div>

        <!-- Coluna Direita -->
        <div class="welcome-right-col">
          <!-- Hero Card: Continuar de onde parei -->
          <div class="welcome-hero-card" id="wHeroCard" title="Clique para continuar com ${escH(heroProj.name)}">
            <div class="welcome-hero-left">
              <span class="welcome-hero-icon">📄</span>
              <div class="welcome-hero-info">
                <span class="welcome-hero-lbl">Continuar de onde parei</span>
                <span class="welcome-hero-title">${escH(heroProj.name)}</span>
                <span class="welcome-hero-sub">${escH(heroProj.seq)} · aberto ${escH(heroProj.used)}</span>
              </div>
            </div>
            <button type="button" class="btn welcome-hero-play" id="wHeroPlay" title="Abrir projeto imediatamente">►</button>
          </div>

          <!-- Grade 2x3 de Ações -->
          <div class="welcome-actions-grid">
            <button type="button" class="welcome-action-btn" id="wBtnNew">
              <span class="welcome-action-icon">📄</span>
              <div class="welcome-action-text">
                <b>Novo projeto</b>
                <span>próximo episódio, modelo ou fita virgem</span>
              </div>
            </button>
            <button type="button" class="welcome-action-btn" id="wBtnOpen">
              <span class="welcome-action-icon">📂</span>
              <div class="welcome-action-text">
                <b>Abrir...</b>
                <span>todos os projetos da ilha (.ppj)</span>
              </div>
            </button>
            <button type="button" class="welcome-action-btn" id="wBtnImport">
              <span class="welcome-action-icon">🎞️</span>
              <div class="welcome-action-text">
                <b>Importar mídia...</b>
                <span>vídeos, áudios e imagens para o Bin</span>
              </div>
            </button>
            <button type="button" class="welcome-action-btn" id="wBtnSeq">
              <span class="welcome-action-icon">✂️</span>
              <div class="welcome-action-text">
                <b>Nova sequência</b>
                <span>linha do tempo vazia ou A/B Roll</span>
              </div>
            </button>
            <button type="button" class="welcome-action-btn" id="wBtnSR">
              <span class="welcome-action-icon">📜</span>
              <div class="welcome-action-text">
                <b>Montar do ScriptRoom</b>
                <span>importar roteiro (.fountain, .fdx, cena)</span>
              </div>
            </button>
            <button type="button" class="welcome-action-btn" id="wBtnSettings">
              <span class="welcome-action-icon">⚙️</span>
              <div class="welcome-action-text">
                <b>Configurações da Ilha</b>
                <span>broadcast NTSC/PAL-M, timecode e taxa</span>
              </div>
            </button>
          </div>

          <!-- Seção de Projetos Recentes -->
          <div class="welcome-recent-section">
            <div class="welcome-recent-hdr-bar">
              <span style="font-weight:700;font-size:11px">Projetos recentes</span>
              <input type="text" id="wSearchRecent" placeholder="Procurar projeto..." style="width:150px;font-size:10px;padding:2px 4px">
            </div>
            <div class="welcome-table-wrap">
              <table class="welcome-table">
                <thead>
                  <tr>
                    <th style="width:40%">Projeto</th>
                    <th style="width:30%">Sequência</th>
                    <th style="width:16%">Duração</th>
                    <th style="width:14%">Usado</th>
                  </tr>
                </thead>
                <tbody id="wRecentTableBody">
                  ${buildRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Barra Inferior de Opções -->
      <div class="row" style="justify-content:space-between;margin-top:10px;border-top:1px solid var(--lo);padding-top:6px;align-items:center">
        <label class="row" style="gap:5px;font-size:11px;cursor:pointer">
          <input type="checkbox" id="wChkStartup" ${prefs.showWelcome !== false ? "checked" : ""}>
          <b>Mostrar esta tela ao abrir o ScriptEditor</b>
        </label>
        <div class="row" style="gap:8px;align-items:center">
          <span class="muted" style="font-size:10.5px">Arquivo &gt; Fechar projeto volta para cá</span>
          <button type="button" class="btn def" id="wBtnClose">Ir para a Linha do Tempo ►</button>
        </div>
      </div>
    `
  });

  const tipTextEl = w.querySelector("#wTipText");
  const nextTipBtn = w.querySelector("#wBtnNextTip");
  if (nextTipBtn && tipTextEl) {
    nextTipBtn.onclick = () => {
      _welcomeTipIdx++;
      tipTextEl.textContent = DICAS_95[_welcomeTipIdx % DICAS_95.length];
    };
  }

  const chk = w.querySelector("#wChkStartup");
  if (chk) {
    chk.onchange = () => {
      prefs.showWelcome = chk.checked;
      savePrefs();
    };
  }

  // Ações dos 6 Cartões
  w.querySelector("#wBtnNew").onclick = () => {
    revealProjectWorkspace();
    closeDialog(w);
    openNewProjectCustomDialog();
  };
  w.querySelector("#wBtnOpen").onclick = () => {
    revealProjectWorkspace();
    closeDialog(w);
    openProjectDialog();
  };
  w.querySelector("#wBtnImport").onclick = () => {
    revealProjectWorkspace();
    closeDialog(w);
    importMediaFiles("all", false);
  };
  w.querySelector("#wBtnSeq").onclick = () => {
    revealProjectWorkspace();
    closeDialog(w);
    createNewSequence();
  };
  w.querySelector("#wBtnSR").onclick = () => {
    revealProjectWorkspace();
    closeDialog(w);
    loadFromScriptRoom();
  };
  w.querySelector("#wBtnSettings").onclick = () => {
    revealProjectWorkspace();
    closeDialog(w);
    openIslandSettingsDialog();
  };

  // Botão fechar
  w.querySelector("#wBtnClose").onclick = () => {
    revealProjectWorkspace("Linha do tempo pronta para edição!");
    closeDialog(w);
  };

  // Carregar do Hero
  const runHero = async () => {
    revealProjectWorkspace();
    closeDialog(w);
    if (heroProj.path && window.editorNative) {
      try {
        const raw = await window.editorNative.readTextFile(heroProj.path);
        if (raw) {
          const data = JSON.parse(raw);
          loadProjectData(data, heroProj.path);
          toast(`Projeto "${heroProj.name}" carregado!`);
          return;
        }
      } catch (_e) {}
    }
    toast(`Projeto "${heroProj.name}" ativo na linha do tempo!`);
  };
  w.querySelector("#wHeroCard").onclick = runHero;
  w.querySelector("#wHeroPlay").onclick = (e) => {
    e.stopPropagation();
    runHero();
  };

  // Busca na tabela
  const sInput = w.querySelector("#wSearchRecent");
  const tbody = w.querySelector("#wRecentTableBody");
  if (sInput && tbody) {
    sInput.oninput = () => {
      tbody.innerHTML = buildRows(sInput.value);
      attachRowEvents();
    };
  }

  const attachRowEvents = () => {
    w.querySelectorAll("[data-projidx]").forEach(tr => {
      tr.onclick = async () => {
        const idx = +tr.dataset.projidx;
        const target = projectList[idx];
        if (!target) return;
        revealProjectWorkspace();
        closeDialog(w);
        if (target.path && window.editorNative) {
          try {
            const raw = await window.editorNative.readTextFile(target.path);
            if (raw) {
              const data = JSON.parse(raw);
              loadProjectData(data, target.path);
              toast(`Projeto "${target.name}" carregado!`);
              return;
            }
          } catch (_e) {}
        }
        toast(`Projeto "${target.name}" carregado na Ilha!`);
      };
    });
  };
  attachRowEvents();
}

async function openProjectDialog() {
  if (window.editorNative && typeof window.editorNative.pickProjectFile === "function") {
    const filePath = await window.editorNative.pickProjectFile();
    if (!filePath) return;
    const content = await window.editorNative.readTextFile(filePath);
    if (!content) {
      toast("Não foi possível ler o arquivo selecionado.");
      return;
    }
    try {
      const proj = JSON.parse(content);
      loadProjectData(proj, filePath);
    } catch (e) {
      toast("Arquivo .PPJ corrompido ou formato inválido: " + e.message);
    }
  } else {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".ppj,.json";
    input.onchange = e => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = ev => {
        try {
          const proj = JSON.parse(ev.target.result);
          loadProjectData(proj, f.name);
        } catch (err) {
          toast("Erro ao abrir projeto: " + err.message);
        }
      };
      r.readAsText(f);
    };
    input.click();
  }
}

function loadProjectData(proj, filePath = null) {
  if (!proj || (!proj.clips && (!proj.sequences || !proj.sequences.length))) {
    toast("Projeto inválido ou vazio.");
    return;
  }
  saveUndoSnapshot();
  if (filePath) {
    S.projectFilePath = filePath;
    S.projectName = filePath.split(/[/\\]/).pop().toUpperCase();
  } else if (proj.projectName) {
    S.projectName = proj.projectName;
  }
  S.isStarterDemo = false;

  if (Array.isArray(proj.sequences) && proj.sequences.length) {
    S.sequences = proj.sequences.map(s => JSON.parse(JSON.stringify(s)));
    S.activeSequenceId = proj.activeSequenceId || S.sequences[0].id;
    const curSeq = S.sequences.find(s => s.id === S.activeSequenceId) || S.sequences[0];
    S.videoTracks = [...curSeq.videoTracks];
    S.audioTracks = [...curSeq.audioTracks];
    S.clips = JSON.parse(JSON.stringify(curSeq.clips));
    S.markers = [...(curSeq.markers || [])];
    S.totalDur = Number(curSeq.totalDur) || 30;
    S.playhead = Number(curSeq.playhead) || 0;
    S.tlIn = curSeq.tlIn ?? null;
    S.tlOut = curSeq.tlOut ?? null;
    S.targetVideoTrack = curSeq.targetVideoTrack || "v1";
    S.targetAudioTrack = curSeq.targetAudioTrack || "a1";
    S.tracksMuted = Object.assign({}, curSeq.tracksMuted || {});
    S.tracksLocked = Object.assign({}, curSeq.tracksLocked || {});
    S.tracksSolo = Object.assign({}, curSeq.tracksSolo || {});
    S.trackVolumes = Object.assign({}, curSeq.trackVolumes || {});
    S.trackPans = Object.assign({}, curSeq.trackPans || {});
  } else {
    // Compatibilidade com arquivos .PPJ antigos (versões 1.0.0 a 1.0.5):
    if (proj.videoTracks) S.videoTracks = proj.videoTracks;
    if (proj.audioTracks) S.audioTracks = proj.audioTracks;
    if (proj.targetVideoTrack) S.targetVideoTrack = proj.targetVideoTrack;
    if (proj.targetAudioTrack) S.targetAudioTrack = proj.targetAudioTrack;
    if (proj.tracksMuted) S.tracksMuted = proj.tracksMuted;
    if (proj.tracksLocked) S.tracksLocked = proj.tracksLocked;
    if (proj.tracksSolo) S.tracksSolo = proj.tracksSolo;
    if (proj.trackVolumes) S.trackVolumes = proj.trackVolumes;
    if (proj.trackPans) S.trackPans = proj.trackPans;
    if (proj.markers) S.markers = proj.markers;
    S.clips = proj.clips;
    S.playhead = Number(proj.playhead) || 0;
    S.tlIn = proj.tlIn ?? null;
    S.tlOut = proj.tlOut ?? null;
    S.sequences = [
      {
        id: "seq_1",
        name: "Sequência 1",
        videoTracks: [...S.videoTracks],
        audioTracks: [...S.audioTracks],
        clips: JSON.parse(JSON.stringify(S.clips)),
        markers: [...S.markers],
        totalDur: S.totalDur || 30,
        playhead: S.playhead || 0,
        tlIn: S.tlIn,
        tlOut: S.tlOut,
        targetVideoTrack: S.targetVideoTrack,
        targetAudioTrack: S.targetAudioTrack,
        tracksMuted: Object.assign({}, S.tracksMuted),
        tracksLocked: Object.assign({}, S.tracksLocked),
        tracksSolo: Object.assign({}, S.tracksSolo),
        trackVolumes: Object.assign({}, S.trackVolumes),
        trackPans: Object.assign({}, S.trackPans)
      }
    ];
    S.activeSequenceId = "seq_1";
  }

  if (Array.isArray(proj.mediaBin)) {
    S.mediaBin = proj.mediaBin;
    S.mediaBin.forEach(m => {
      if (m.url && !S.videoEls.has(m.url) && !S.audioEls.has(m.url)) {
        registerImportedFileObject({ name: m.name, url: m.url, path: m.path, kind: m.kind }, false);
      }
    });
  }
  if (proj.vhsSettings) {
    S.vhsSettings = Object.assign({}, proj.vhsSettings);
  }
  revealProjectWorkspace();
  S.isDirty = false;
  recalcSequenceDuration();
  renderAll();
  addRecentProject(S.projectFilePath || S.projectName, S.projectName);
  toast(`Projeto ${S.projectName} carregado com sucesso!`);
}

function autoSaveProject() {
  try {
    const data = buildProjectSnapshot();
    const jsonStr = JSON.stringify(data);
    localStorage.setItem("varguelia.scripteditor.autosave", jsonStr);
    localStorage.setItem("varguelia.scripteditor.autosave_time", String(Date.now()));
    if (window.editorNative && typeof window.editorNative.write === "function") {
      window.editorNative.write("projetos", "_autosave_se95.ppj", jsonStr);
    }
  } catch (_e) {}
}

function checkCrashRecovery() {
  const unclean = localStorage.getItem("varguelia.scripteditor.session_unclean");
  const autosave = localStorage.getItem("varguelia.scripteditor.autosave");
  const autoTime = localStorage.getItem("varguelia.scripteditor.autosave_time");

  localStorage.setItem("varguelia.scripteditor.session_unclean", "1");

  if (unclean === "1" && autosave) {
    try {
      const proj = JSON.parse(autosave);
      const dataStr = autoTime ? new Date(+autoTime).toLocaleTimeString("pt-BR") : "sessão anterior";
      dialog({
        id: "crashRecoveryWin",
        title: "Recuperação de Falha / Queda de Energia",
        width: 480,
        body: `
          <div class="row" style="gap:12px;align-items:center;margin-bottom:8px">
            <svg viewBox="0 0 16 16" width="36" height="36" aria-hidden="true">${ICON.bulb}</svg>
            <div>
              <b style="font-size:12.5px">O ScriptEditor 95 não foi encerrado corretamente.</b><br>
              <span class="muted">Existe um salvamento automático (Autosave) gravado às ${dataStr}.</span>
            </div>
          </div>
          <div style="background:var(--field);padding:8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
            Projeto recuperável: <b>${escH(proj.projectName || "PROJETO_LIVRE.PPJ")}</b><br>
            Faixas de Vídeo: ${proj.videoTracks ? proj.videoTracks.length : 3} · Faixas de Áudio: ${proj.audioTracks ? proj.audioTracks.length : 3}
          </div>
        `,
        buttons: [
          {
            label: "Recuperar Projeto",
            def: 1,
            run: () => {
              loadProjectData(proj, proj.projectFilePath || null);
              toast("Projeto recuperado do salvamento automático com sucesso!");
            }
          },
          {
            label: "Descartar e Iniciar Novo",
            run: () => {
              localStorage.removeItem("varguelia.scripteditor.autosave");
              toast("Salvamento automático descartado.");
            }
          }
        ]
      });
    } catch (_e) {}
  }
}

/* ---------- Medidores VU Analógicos Galvanométricos 1995 (Tape Deck & Master Console) ---------- */
let vuAnalogState = {
  angleL: -38,
  angleR: -38,
  velL: 0,
  velR: 0,
  peakHoldL: 0,
  peakHoldR: 0
};

function amplitudeToVUDegrees(amp) {
  if (amp <= 0.001) return -38;
  const db = 20 * Math.log10(Math.min(1.5, amp));
  if (db <= -20) return -38;
  if (db >= 3) return 24;
  if (db <= 0) {
    const norm = (db + 20) / 20;
    return -38 + Math.pow(norm, 0.85) * 38;
  } else {
    return (db / 3) * 24;
  }
}

function updateAnalogVUBallistics(rawL, rawR) {
  const targetL = amplitudeToVUDegrees(rawL);
  const targetR = amplitudeToVUDegrees(rawR);
  const now = performance.now();

  const k = 0.26;
  const damp = 0.74;

  vuAnalogState.velL += (targetL - vuAnalogState.angleL) * k;
  vuAnalogState.velL *= damp;
  vuAnalogState.angleL += vuAnalogState.velL;
  if (vuAnalogState.angleL < -42) { vuAnalogState.angleL = -42; vuAnalogState.velL = -vuAnalogState.velL * 0.15; }
  if (vuAnalogState.angleL > 28) { vuAnalogState.angleL = 28; vuAnalogState.velL = -vuAnalogState.velL * 0.15; }

  vuAnalogState.velR += (targetR - vuAnalogState.angleR) * k;
  vuAnalogState.velR *= damp;
  vuAnalogState.angleR += vuAnalogState.velR;
  if (vuAnalogState.angleR < -42) { vuAnalogState.angleR = -42; vuAnalogState.velR = -vuAnalogState.velR * 0.15; }
  if (vuAnalogState.angleR > 28) { vuAnalogState.angleR = 28; vuAnalogState.velR = -vuAnalogState.velR * 0.15; }

  if (rawL >= 0.98) vuAnalogState.peakHoldL = now + 650;
  if (rawR >= 0.98) vuAnalogState.peakHoldR = now + 650;
}

function drawSingleMeterFace(ctx, x, y, w, h, angle, isPeak, label, dbVal) {
  ctx.save();
  ctx.translate(x, y);

  // Fundo Creme Marfim estilo Studer / Revox / Ampex 1995
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, "#FAF6E8");
  bgGrad.addColorStop(0.7, "#F4EDE0");
  bgGrad.addColorStop(1, "#E8DFC8");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Moldura chanfrada interior do galvanômetro
  ctx.strokeStyle = "#808080";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeRect(1.5, 1.5, w - 3, h - 3);

  const pivotX = w / 2;
  const pivotY = h + (h * 0.35);
  const radius = h * 1.15;

  // Arco da escala
  const startRad = (-90 - 38) * Math.PI / 180;
  const zeroRad = -90 * Math.PI / 180;
  const endRad = (-90 + 24) * Math.PI / 180;

  // Arco Preto (-20 a 0 dB)
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(pivotX, pivotY, radius, startRad, zeroRad, false);
  ctx.stroke();

  // Arco Vermelho (0 a +3 dB)
  ctx.strokeStyle = "#D01515";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(pivotX, pivotY, radius, zeroRad, endRad, false);
  ctx.stroke();

  // Marcas e Serigrafia da Escala
  const marks = [
    { db: -20, deg: -38, txt: "-20" },
    { db: -10, deg: -24, txt: "-10" },
    { db: -7, deg: -17, txt: "-7" },
    { db: -5, deg: -11, txt: "-5" },
    { db: -3, deg: -6, txt: "-3" },
    { db: -2, deg: -3.5, txt: "-2" },
    { db: -1, deg: -1.5, txt: "-1" },
    { db: 0, deg: 0, txt: "0", red: true },
    { db: 1, deg: 7, txt: "+1", red: true },
    { db: 2, deg: 15, txt: "+2", red: true },
    { db: 3, deg: 24, txt: "+3", red: true }
  ];

  ctx.textAlign = "center";
  marks.forEach(m => {
    const rad = (-90 + m.deg) * Math.PI / 180;
    const isMajor = [ -20, -10, -7, -5, -3, 0, 1, 2, 3 ].includes(m.db);
    const tickLen = isMajor ? 8 : 4;
    const x1 = pivotX + Math.cos(rad) * (radius - tickLen);
    const y1 = pivotY + Math.sin(rad) * (radius - tickLen);
    const x2 = pivotX + Math.cos(rad) * (radius + 2);
    const y2 = pivotY + Math.sin(rad) * (radius + 2);

    ctx.strokeStyle = m.red ? "#D01515" : "#222222";
    ctx.lineWidth = m.db === 0 ? 2.5 : (isMajor ? 1.5 : 1);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    if (m.txt) {
      const tx = pivotX + Math.cos(rad) * (radius - 16);
      const ty = pivotY + Math.sin(rad) * (radius - 16);
      ctx.fillStyle = m.red ? "#D01515" : "#222222";
      ctx.font = m.db === 0 ? "bold 11px Tahoma, sans-serif" : "bold 9px Tahoma, sans-serif";
      ctx.fillText(m.txt, tx, ty);
    }
  });

  // Logotipo "VU" e "VOLUME UNITS"
  ctx.fillStyle = "#111111";
  ctx.font = "bold 18px 'Times New Roman', serif";
  ctx.fillText("VU", pivotX, h * 0.44);
  ctx.font = "bold 8px Tahoma, sans-serif";
  ctx.fillStyle = "#555555";
  ctx.fillText("VOLUME UNITS", pivotX, h * 0.54);

  // Identificação do Canal
  ctx.fillStyle = "#6E2A1C";
  ctx.font = "bold 10px Tahoma, sans-serif";
  ctx.fillText(label, pivotX, h * 0.68);

  // LED de Pico (PEAK OVERLOAD)
  const ledX = w - 24;
  const ledY = 20;
  ctx.beginPath();
  ctx.arc(ledX, ledY, 5, 0, Math.PI * 2);
  if (isPeak) {
    const lGrad = ctx.createRadialGradient(ledX - 1, ledY - 1, 1, ledX, ledY, 5);
    lGrad.addColorStop(0, "#FFFFFF");
    lGrad.addColorStop(0.4, "#FF3300");
    lGrad.addColorStop(1, "#CC0000");
    ctx.fillStyle = lGrad;
    ctx.shadowColor = "#FF2200";
    ctx.shadowBlur = 8;
  } else {
    ctx.fillStyle = "#501212";
    ctx.shadowBlur = 0;
  }
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#555";
  ctx.font = "7.5px Tahoma, sans-serif";
  ctx.fillText("PEAK", ledX, ledY + 12);

  // Leitura Digital no Canto Esquerdo
  ctx.fillStyle = "#222";
  ctx.font = "bold 9px monospace";
  ctx.textAlign = "left";
  ctx.fillText(dbVal, 10, 18);

  // Sombra da Agulha
  const needleRad = (-90 + angle) * Math.PI / 180;
  const tipX = pivotX + Math.cos(needleRad) * (radius + 6);
  const tipY = pivotY + Math.sin(needleRad) * (radius + 6);

  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.22)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(pivotX + 2, pivotY + 2);
  ctx.lineTo(tipX + 2, tipY + 2);
  ctx.stroke();
  ctx.restore();

  // Agulha Mecânica
  ctx.strokeStyle = "#1A1A1A";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(tipX, tipY);
  ctx.stroke();

  // Pivô Mecânico com Parafuso
  ctx.beginPath();
  ctx.arc(pivotX, pivotY, 14, 0, Math.PI * 2);
  const pGrad = ctx.createRadialGradient(pivotX - 3, pivotY - 3, 2, pivotX, pivotY, 14);
  pGrad.addColorStop(0, "#666666");
  pGrad.addColorStop(0.6, "#222222");
  pGrad.addColorStop(1, "#111111");
  ctx.fillStyle = pGrad;
  ctx.fill();
  ctx.strokeStyle = "#888888";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

function drawDualAnalogVUMeters(canvas, levelL, levelR) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  updateAnalogVUBallistics(levelL, levelR);
  const now = performance.now();
  const isPeakL = now < vuAnalogState.peakHoldL;
  const isPeakR = now < vuAnalogState.peakHoldR;

  const dbLStr = levelL <= 0.001 ? "-INF dB" : (20 * Math.log10(Math.min(1.5, levelL))).toFixed(1) + " dB";
  const dbRStr = levelR <= 0.001 ? "-INF dB" : (20 * Math.log10(Math.min(1.5, levelR))).toFixed(1) + " dB";

  ctx.fillStyle = "#181E24";
  ctx.fillRect(0, 0, W, H);

  const meterW = Math.floor((W - 16) / 2);
  const meterH = H - 12;

  drawSingleMeterFace(ctx, 6, 6, meterW, meterH, vuAnalogState.angleL, isPeakL, "CANAL ESQUERDO (CH 1)", dbLStr);
  drawSingleMeterFace(ctx, 10 + meterW, 6, meterW, meterH, vuAnalogState.angleR, isPeakR, "CANAL DIREITO (CH 2)", dbRStr);
}

function openAnalogVUConsole() {
  let vuTimer = null;
  dialog({
    id: "analogVuBridgeWin",
    title: "Console Estéreo Analógico 1995 — Medidores VU Galvanométricos",
    width: 660,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <span><b>Console Galvanométrico Studer/Revox 1995</b> · Resposta balística 300ms, Escala ANSI C16.5</span>
          <span style="font-size:10px;color:#555">Alinhamento: 0 VU = +4 dBu (-20 dBFS)</span>
        </div>
        <div class="mixer-analog-vu-panel" style="padding:10px">
          <canvas id="analogBridgeCanvas" width="624" height="210"></canvas>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Fechar",
        def: 1,
        run: () => {
          if (vuTimer) clearInterval(vuTimer);
        }
      }
    ]
  });

  const win = document.getElementById("analogVuBridgeWin");
  if (!win) return;
  const cvs = win.querySelector("#analogBridgeCanvas");

  vuTimer = setInterval(() => {
    if (!document.getElementById("analogVuBridgeWin")) {
      clearInterval(vuTimer);
      return;
    }
    const levels = computeAudioLevelsAt(S.playhead);
    drawDualAnalogVUMeters(cvs, levels.l, levels.r);
  }, 33);
}

/* ---------- Analisador de Áudio RTA 31-Bandas Rack 19" 1995 (Klark Teknik / BSS) ---------- */
function openRTAConsole() {
  let rtaTimer = null;
  let decaySpeed = "med"; // "fast" (35ms) | "med" (250ms) | "slow" (1000ms)
  let testOsc = "off";    // "off" | "pink" | "sine"
  let peakHoldCaps = new Array(31).fill(0);
  let peakHoldTimes = new Array(31).fill(0);

  const freqLabels = [
    "20", "25", "31", "40", "50", "63", "80", "100", "125", "160",
    "200", "250", "315", "400", "500", "630", "800", "1k", "1.2k", "1.6k",
    "2k", "2.5k", "3.1k", "4k", "5k", "6.3k", "8k", "10k", "12k", "16k", "20k"
  ];

  dialog({
    id: "rtaConsoleWin",
    title: "Analisador de Espectro RTA 31-Bandas em Tempo Real 1995 — Klark Teknik / BSS",
    width: 760,
    body: `
      <div class="rta-rack-chassis">
        <div class="row" style="justify-content:space-between;align-items:center;padding:4px 6px;border-bottom:1px solid #333;margin-bottom:8px">
          <div class="row" style="gap:8px;align-items:center">
            <span style="width:8px;height:8px;border-radius:50%;background:#00FF66;box-shadow:0 0 6px #00FF66"></span>
            <b style="letter-spacing:1.5px;font-size:12px;color:#EEE">KLARK TEKNIK DN60 · 31-BAND 1/3 OCTAVE REAL-TIME AUDIO ANALYZER</b>
          </div>
          <span style="font-size:10px;color:#888;font-family:monospace">CALIBRAÇÃO: 0 dB = +4 dBu · BALÍSTICA DINÂMICA 1995</span>
        </div>

        <div class="rta-display-screen">
          <canvas id="rtaCanvas" width="716" height="230"></canvas>
        </div>

        <div class="row" style="justify-content:space-between;align-items:center;margin-top:8px;gap:8px;flex-wrap:wrap">
          <div class="row" style="gap:6px;align-items:center;font-size:11px">
            <b>Decaimento:</b>
            <button type="button" class="btn sm" id="rtaSpdFast">Rápido (35ms)</button>
            <button type="button" class="btn sm def" id="rtaSpdMed">Médio (250ms)</button>
            <button type="button" class="btn sm" id="rtaSpdSlow">Lento (1.0s)</button>
            <button type="button" class="btn sm" id="rtaBtnResetPeaks">Resetar Picos</button>
          </div>
          <div class="row" style="gap:6px;align-items:center;font-size:11px">
            <b>Gerador DSP:</b>
            <button type="button" class="btn sm def" id="rtaOscOff">Desligado</button>
            <button type="button" class="btn sm" id="rtaOscPink">Ruído Rosa</button>
            <button type="button" class="btn sm" id="rtaOscSine">Tom 1 kHz</button>
          </div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Fechar",
        def: 1,
        run: () => {
          if (rtaTimer) clearInterval(rtaTimer);
        }
      }
    ],
    onClose: () => {
      if (rtaTimer) clearInterval(rtaTimer);
    }
  });

  const win = document.getElementById("rtaConsoleWin");
  if (!win) return;
  const cvs = win.querySelector("#rtaCanvas");
  const ctx = cvs?.getContext("2d");

  win.querySelector("#rtaSpdFast")?.addEventListener("click", (e) => {
    decaySpeed = "fast";
    win.querySelectorAll("#rtaSpdFast,#rtaSpdMed,#rtaSpdSlow").forEach(b => b.classList.remove("def"));
    e.target.classList.add("def");
  });
  win.querySelector("#rtaSpdMed")?.addEventListener("click", (e) => {
    decaySpeed = "med";
    win.querySelectorAll("#rtaSpdFast,#rtaSpdMed,#rtaSpdSlow").forEach(b => b.classList.remove("def"));
    e.target.classList.add("def");
  });
  win.querySelector("#rtaSpdSlow")?.addEventListener("click", (e) => {
    decaySpeed = "slow";
    win.querySelectorAll("#rtaSpdFast,#rtaSpdMed,#rtaSpdSlow").forEach(b => b.classList.remove("def"));
    e.target.classList.add("def");
  });
  win.querySelector("#rtaBtnResetPeaks")?.addEventListener("click", () => {
    peakHoldCaps.fill(0);
    peakHoldTimes.fill(0);
  });

  win.querySelector("#rtaOscOff")?.addEventListener("click", (e) => {
    testOsc = "off";
    win.querySelectorAll("#rtaOscOff,#rtaOscPink,#rtaOscSine").forEach(b => b.classList.remove("def"));
    e.target.classList.add("def");
  });
  win.querySelector("#rtaOscPink")?.addEventListener("click", (e) => {
    testOsc = "pink";
    win.querySelectorAll("#rtaOscOff,#rtaOscPink,#rtaOscSine").forEach(b => b.classList.remove("def"));
    e.target.classList.add("def");
    playFoleySound("estatica", 0.05);
  });
  win.querySelector("#rtaOscSine")?.addEventListener("click", (e) => {
    testOsc = "sine";
    win.querySelectorAll("#rtaOscOff,#rtaOscPink,#rtaOscSine").forEach(b => b.classList.remove("def"));
    e.target.classList.add("def");
    playFoleySound("bip", 0.05);
  });

  // Loop de Animação do RTA
  let currentLevels = new Array(31).fill(0.05);

  rtaTimer = setInterval(() => {
    if (!document.getElementById("rtaConsoleWin") || !ctx) {
      clearInterval(rtaTimer);
      return;
    }

    const W = cvs.width, H = cvs.height;
    const now = performance.now();

    // Calcula níveis de áudio master na agulha
    const masterLvl = computeAudioLevelsAt(S.playhead);
    const avgAmp = (masterLvl.l + masterLvl.r) / 2;
    const isPlaying = S.playing && avgAmp > 0.001;

    // Simulação espectral física precisa para as 31 bandas (Klark Teknik)
    for (let i = 0; i < 31; i++) {
      let targetVal = 0.02;

      if (testOsc === "sine") {
        // Tom senoidal de 1kHz (banda 17)
        if (i === 17) targetVal = 0.95;
        else if (i === 16 || i === 18) targetVal = 0.35;
        else targetVal = 0.03 + Math.random() * 0.02;
      } else if (testOsc === "pink") {
        // Ruído rosa decai 3dB por oitava
        targetVal = Math.min(0.95, (0.75 - i * 0.012) + (Math.random() - 0.5) * 0.12);
      } else if (isPlaying) {
        // Áudio real da timeline: bandas graves, médias e agudas
        const centerWeight = Math.sin((i / 30) * Math.PI);
        const flutter = (Math.sin(now * 0.015 + i * 0.8) + 1) * 0.5;
        targetVal = Math.min(1.0, avgAmp * (0.4 + centerWeight * 0.9) * (0.7 + flutter * 0.6));
      }

      // Ballistics (Attack & Decay)
      const decayFactor = decaySpeed === "fast" ? 0.45 : (decaySpeed === "slow" ? 0.08 : 0.22);
      if (targetVal > currentLevels[i]) {
        currentLevels[i] = currentLevels[i] * 0.3 + targetVal * 0.7; // Fast attack
      } else {
        currentLevels[i] = currentLevels[i] * (1 - decayFactor) + targetVal * decayFactor;
      }

      // Peak Hold
      if (currentLevels[i] >= peakHoldCaps[i]) {
        peakHoldCaps[i] = currentLevels[i];
        peakHoldTimes[i] = now + 1200;
      } else if (now > peakHoldTimes[i]) {
        peakHoldCaps[i] = Math.max(0, peakHoldCaps[i] - 0.015);
      }
    }

    // Desenha o painel RTA
    ctx.fillStyle = "#04090A";
    ctx.fillRect(0, 0, W, H);

    // Grade de dB no fundo (0 dB, -6, -12, -18, -24, -30, -36 dB)
    ctx.strokeStyle = "rgba(0, 255, 100, 0.12)";
    ctx.lineWidth = 1;
    const dbMarks = [
      { db: "+3 dB", y: 22, col: "rgba(255, 50, 50, 0.4)" },
      { db: "0 dB", y: 38, col: "rgba(255, 180, 50, 0.4)" },
      { db: "-6 dB", y: 68, col: "rgba(0, 255, 100, 0.2)" },
      { db: "-12 dB", y: 98, col: "rgba(0, 255, 100, 0.2)" },
      { db: "-20 dB", y: 138, col: "rgba(0, 255, 100, 0.2)" },
      { db: "-30 dB", y: 178, col: "rgba(0, 255, 100, 0.15)" }
    ];

    dbMarks.forEach(m => {
      ctx.strokeStyle = m.col;
      ctx.beginPath();
      ctx.moveTo(34, m.y);
      ctx.lineTo(W - 120, m.y);
      ctx.stroke();

      ctx.fillStyle = m.col;
      ctx.font = "9px monospace";
      ctx.textAlign = "right";
      ctx.fillText(m.db, 30, m.y + 3);
    });

    // 31 Colunas de LED
    const startX = 36;
    const availW = W - 165;
    const colW = Math.floor(availW / 31) - 2;
    const numSegs = 14;
    const segH = 11;
    const segGap = 2;

    for (let c = 0; c < 31; c++) {
      const cx = startX + c * (colW + 2);
      const val = currentLevels[c];
      const activeSegs = Math.round(val * numSegs);
      const peakSeg = Math.min(numSegs - 1, Math.round(peakHoldCaps[c] * numSegs));

      for (let s = 0; s < numSegs; s++) {
        const sy = 194 - s * (segH + segGap);
        const isLit = s < activeSegs;
        const isPeak = s === peakSeg && peakHoldCaps[c] > 0.05;

        let onCol, offCol;
        if (s >= 12) {
          onCol = "#FF2222"; offCol = "#2A0606"; // Vermelho (+3 e 0 dB)
        } else if (s >= 9) {
          onCol = "#FFAA00"; offCol = "#2A1800"; // Amarelo (-6 a -2 dB)
        } else {
          onCol = "#00FF66"; offCol = "#02200A"; // Verde (-40 a -8 dB)
        }

        ctx.fillStyle = isLit ? onCol : (isPeak ? "#FFFFFF" : offCol);
        if (isLit) {
          ctx.shadowColor = onCol;
          ctx.shadowBlur = 4;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(cx, sy, colW, segH);
      }
      ctx.shadowBlur = 0;

      // Legenda da frequência
      ctx.fillStyle = "#88A0B0";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.fillText(freqLabels[c], cx + colW / 2, 218);
    }

    // Painel Lateral Direito: Medidor de Correlação de Fase Estéreo (-1.0 a +1.0)
    const meterX = W - 110;
    ctx.fillStyle = "#0A141A";
    ctx.fillRect(meterX, 16, 96, 195);
    ctx.strokeStyle = "#334455";
    ctx.strokeRect(meterX, 16, 96, 195);

    ctx.fillStyle = "#80B0D0";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText("CORRELAÇÃO", meterX + 48, 30);
    ctx.fillText("DE FASE", meterX + 48, 42);

    // Escala +1 / 0 / -1
    const pY0 = 60, pY1 = 150;
    const phaseL = masterLvl.l, phaseR = masterLvl.r;
    let corr = 0.85; // Estéreo normal em fase
    if (isPlaying) {
      const diff = Math.abs(phaseL - phaseR);
      corr = Math.max(-1.0, Math.min(1.0, 1.0 - (diff / Math.max(0.1, avgAmp)) * 0.9));
    }

    const needleY = pY0 + ((1.0 - corr) / 2.0) * (pY1 - pY0);

    ctx.strokeStyle = "#556677";
    ctx.beginPath();
    ctx.moveTo(meterX + 16, pY0); ctx.lineTo(meterX + 30, pY0);
    ctx.moveTo(meterX + 16, (pY0 + pY1) / 2); ctx.lineTo(meterX + 30, (pY0 + pY1) / 2);
    ctx.moveTo(meterX + 16, pY1); ctx.lineTo(meterX + 30, pY1);
    ctx.stroke();

    ctx.fillStyle = "#00FF66"; ctx.fillText("+1 MONO", meterX + 64, pY0 + 3);
    ctx.fillStyle = "#FFE040"; ctx.fillText("0 STEREO", meterX + 64, (pY0 + pY1) / 2 + 3);
    ctx.fillStyle = "#FF4444"; ctx.fillText("-1 OUT", meterX + 64, pY1 + 3);

    // Agulha do medidor de fase
    ctx.fillStyle = corr >= 0 ? "#00FF66" : "#FF3333";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 5;
    ctx.fillRect(meterX + 8, needleY - 2, 28, 4);
    ctx.shadowBlur = 0;

    // Lâmpada de alerta mono
    const isOutPhase = corr < 0;
    ctx.fillStyle = isOutPhase ? "#FF0000" : "#220000";
    ctx.beginPath();
    ctx.arc(meterX + 48, 175, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#661111";
    ctx.stroke();

    ctx.fillStyle = isOutPhase ? "#FF6666" : "#666666";
    ctx.font = "8px monospace";
    ctx.fillText("PHASE INV", meterX + 48, 195);
  }, 33);
}

/* ---------- Relatórios e Folhas de Decupagem Técnicas (Batch Log & Print 1995) ---------- */
function generateTechnicalReportData() {
  const allClips = [];
  const tracks = [...S.videoTracks, ...S.audioTracks];
  tracks.forEach(tk => {
    (S.clips[tk] || []).forEach(c => {
      allClips.push({ ...c, track: tk });
    });
  });
  allClips.sort((a, b) => a.start - b.start);

  const binItems = S.binItems || [];
  return { allClips, binItems, markers: S.markers || [] };
}

function openTechnicalReportDialog() {
  const { allClips, binItems, markers } = generateTechnicalReportData();
  const dateStr = new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR");

  let htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ficha Técnica de Montagem — ${S.projectName}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; font-size: 11px; background: #FFF; color: #000; margin: 16px; }
    h1 { font-size: 18px; border-bottom: 2px solid #000; margin: 0 0 6px 0; padding-bottom: 4px; }
    h2 { font-size: 13px; background: #D4D0C8; padding: 4px 6px; border: 1px solid #808080; margin: 14px 0 6px 0; }
    table { width: 100%; border-collapse: collapse; font-size: 10.5px; margin-bottom: 12px; }
    th, td { border: 1px solid #777; padding: 4px 6px; text-align: left; }
    th { background: #E4E0D8; font-weight: bold; }
    .mono { font-family: 'Courier New', monospace; }
    .header-box { display: flex; justify-content: space-between; border: 1px solid #000; padding: 8px; background: #FAF8F0; margin-bottom: 12px; }
    @media print {
      body { margin: 0; font-size: 10px; }
      h2 { background: #DDD !important; -webkit-print-color-adjust: exact; }
      th { background: #EEE !important; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header-box">
    <div>
      <h1>SCRIPTEDITOR 95 — FICHA TÉCNICA DE MONTAGEM</h1>
      <div><b>PROJETO:</b> ${S.projectName}</div>
      <div><b>DURAÇÃO TOTAL:</b> <span class="mono">${fmtSMPTE(S.totalDur)}</span> (${S.totalDur.toFixed(2)}s)</div>
      <div><b>SISTEMA:</b> NTSC Broadcast 29.97 FPS (SMPTE Drop-Frame) · Resolução Master: 720×486 D1</div>
    </div>
    <div style="text-align:right">
      <div><b>EMISSÃO:</b> ${dateStr}</div>
      <div><b>ILHA DE EDIÇÃO:</b> C2 Broadcast NLE 1995</div>
      <div><b>TOTAL DE EVENTOS:</b> ${allClips.length} cortes · ${markers.length} marcadores</div>
    </div>
  </div>

  <h2>1. LISTA CRONOLÓGICA DE CORTES E CLIPES DA LINHA DO TEMPO</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>FAIXA</th>
        <th>NOME DO CLIPE / EVENTO</th>
        <th>IN TL</th>
        <th>OUT TL</th>
        <th>DURAÇÃO</th>
        <th>IN ORIGEM</th>
        <th>VELOC</th>
        <th>VOL</th>
        <th>TRANSIÇÃO</th>
        <th>EFEITOS / FILTROS</th>
      </tr>
    </thead>
    <tbody>
      ${allClips.map((c, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><b>${c.track.toUpperCase()}</b></td>
          <td>${c.title}</td>
          <td class="mono">${fmtSMPTE(c.start)}</td>
          <td class="mono">${fmtSMPTE(c.start + c.dur)}</td>
          <td class="mono">${c.dur.toFixed(2)}s</td>
          <td class="mono">${c.inPoint != null ? fmtSMPTE(c.inPoint) : "00:00:00:00"}</td>
          <td>${c.speed ? (c.speed * 100).toFixed(0) + "%" : "100%"}</td>
          <td>${c.volume != null ? c.volume + "%" : "100%"}</td>
          <td>${c.trans || "Corte Seco"}</td>
          <td>${[c.filter && c.filter !== "none" ? c.filter : "", c.chromaKey ? "ChromaKey" : "", c.blendMode && c.blendMode !== "normal" ? c.blendMode : ""].filter(Boolean).join(", ") || "—"}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>

  <h2>2. MARCADORES DE PRODUÇÃO &amp; CUE SHEET</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>TIMECODE SMPTE</th>
        <th>COR</th>
        <th>RÓTULO</th>
        <th>ANOTAÇÕES / DIRETIVAS DE CORTE</th>
      </tr>
    </thead>
    <tbody>
      ${markers.length ? markers.map((m, i) => `
        <tr>
          <td>${i + 1}</td>
          <td class="mono">${fmtSMPTE(m.time)}</td>
          <td>${m.color ? m.color.toUpperCase() : "VERDE"}</td>
          <td><b>${m.label || "Marcador"}</b></td>
          <td>${m.comment || "—"}</td>
        </tr>
      `).join("") : `<tr><td colspan="5" style="text-align:center;color:#666">Nenhum marcador registrado na linha do tempo.</td></tr>`}
    </tbody>
  </table>

  <h2>3. MANIFESTO DE MÍDIAS DO PROJETO (BIN)</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>NOME DO ARQUIVO</th>
        <th>TIPO</th>
        <th>DURAÇÃO</th>
        <th>ORIGEM / LOCALIZAÇÃO</th>
      </tr>
    </thead>
    <tbody>
      ${binItems.map((b, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${b.name}</td>
          <td>${b.kind ? b.kind.toUpperCase() : "MÍDIA"}</td>
          <td class="mono">${b.dur ? fmtSMPTE(b.dur) : "—"}</td>
          <td class="mono" style="font-size:9.5px">${b.path || b.url || "Memória do Sistema"}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>

  <div style="margin-top:20px;border-top:1px dashed #777;padding-top:6px;font-size:9.5px;color:#555">
    ScriptEditor 95 · Departamento de Montagem e Videografismo · Emissora C2 · Relatório Oficial de Masterização
  </div>
</body>
</html>`;

  let txtDoc = [
    `================================================================================`,
    `      SCRIPTEDITOR 95 — FICHA TÉCNICA DE MONTAGEM & DECUPAGEM BROADCAST         `,
    `================================================================================`,
    `PROJETO:       ${S.projectName}`,
    `DATA/HORA:     ${dateStr}`,
    `DURAÇÃO TOTAL: ${fmtSMPTE(S.totalDur)} (${S.totalDur.toFixed(2)}s)`,
    `PADRÃO:        SMPTE NTSC Drop-Frame 29.97 FPS · Ilha Analógica 1995`,
    `TOTAL CORTES:  ${allClips.length} eventos de corte`,
    `MARCADORES:    ${markers.length} marcadores de produção`,
    `--------------------------------------------------------------------------------`,
    `#   FX   IN TL        OUT TL       DUR      IN ORIG      VELOC  CLIPE`,
    `--------------------------------------------------------------------------------`
  ];

  allClips.forEach((c, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const tk = c.track.toUpperCase().padEnd(4, " ");
    const inTl = fmtSMPTE(c.start).padEnd(12, " ");
    const outTl = fmtSMPTE(c.start + c.dur).padEnd(12, " ");
    const dur = (c.dur.toFixed(2) + "s").padEnd(8, " ");
    const inOrig = fmtSMPTE(c.inPoint || 0).padEnd(12, " ");
    const spd = ((c.speed ? (c.speed * 100).toFixed(0) : "100") + "%").padEnd(6, " ");
    txtDoc.push(`${num}  ${tk} ${inTl} ${outTl} ${dur} ${inOrig} ${spd} ${c.title}`);
  });

  txtDoc.push(`--------------------------------------------------------------------------------`);
  txtDoc.push(`MARCADORES / CUE SHEET:`);
  markers.forEach((m, idx) => {
    txtDoc.push(`  ${String(idx + 1).padStart(2, "0")}  ${fmtSMPTE(m.time)}  [${(m.color || "VERDE").toUpperCase()}]  ${m.label || ""}  (${m.comment || "—"})`);
  });
  txtDoc.push(`================================================================================`);
  txtDoc.push(`[Fim da Ficha Técnica · ScriptEditor 95 Edition]`);

  dialog({
    id: "techReportWin",
    title: `Ficha Técnica de Montagem & Relatório de Decupagem — ${S.projectName}`,
    width: 720,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <span><b>Relatório Oficial de Montagem</b> · Visualização estilo Netscape 95 e Texto Puro</span>
          <div class="row" style="gap:4px">
            <button type="button" class="btn sm def" id="btnTabHtml">Visualização HTML</button>
            <button type="button" class="btn sm" id="btnTabTxt">Texto Puro (TXT)</button>
          </div>
        </div>

        <div id="techReportHtmlView" class="tech-report-frame">
          <iframe id="techReportIframe" style="width:100%;height:360px;border:none" srcdoc="${htmlDoc.replace(/"/g, '&quot;')}"></iframe>
        </div>

        <div id="techReportTxtView" class="tech-report-frame" style="display:none;font-family:'Courier New', monospace;white-space:pre;line-height:1.3">
          ${txtDoc.join("\r\n")}
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Salvar como Arquivo HTML 95…",
        def: 1,
        run: async () => {
          const fn = `FICHA_TECNICA_${S.projectName.replace(/\.[^.]+$/, "")}_95.HTML`;
          await saveOutputFile(fn, htmlDoc, [{ name: "Documento HTML (*.html)", extensions: ["html", "htm"] }]);
          toast("Ficha Técnica HTML salva com sucesso!");
        }
      },
      {
        label: "Salvar como Arquivo TXT…",
        run: async () => {
          const fn = `FICHA_TECNICA_${S.projectName.replace(/\.[^.]+$/, "")}_95.TXT`;
          await saveOutputFile(fn, txtDoc.join("\r\n"), [{ name: "Arquivo de Texto (*.txt)", extensions: ["txt"] }]);
          toast("Ficha Técnica TXT salva com sucesso!");
        }
      },
      {
        label: "Imprimir Ficha Técnica (A4)…",
        run: () => {
          const ifr = document.getElementById("techReportIframe");
          if (ifr && ifr.contentWindow) {
            ifr.contentWindow.print();
          } else {
            window.print();
          }
        }
      },
      { label: "Fechar" }
    ]
  });

  const win = document.getElementById("techReportWin");
  if (!win) return;
  const bHtml = win.querySelector("#btnTabHtml");
  const bTxt = win.querySelector("#btnTabTxt");
  const vHtml = win.querySelector("#techReportHtmlView");
  const vTxt = win.querySelector("#techReportTxtView");

  if (bHtml && bTxt && vHtml && vTxt) {
    bHtml.onclick = () => {
      bHtml.classList.add("def");
      bTxt.classList.remove("def");
      vHtml.style.display = "block";
      vTxt.style.display = "none";
    };
    bTxt.onclick = () => {
      bTxt.classList.add("def");
      bHtml.classList.remove("def");
      vHtml.style.display = "none";
      vTxt.style.display = "block";
    };
  }
}

/* ---------- Mesa de Som Analógica 95 (Mixer Multi-Pistas, Faders, Pan & Normalização) ---------- */
function openAudioMixerDialog() {
  const allAudio = [...S.audioTracks];
  let vuInterval = null;

  dialog({
    id: "mixerWin",
    title: "Mesa de Som Analógica 95 - Mixagem Multi-Pistas & Normalização",
    width: 660,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <span><b>Console Estéreo 16-bit</b> · Faders lineares, Panorâmico (Pan) e Níveis em Decibéis (dB)</span>
          <div class="row" style="gap:4px">
            <button type="button" class="btn sm" id="btnToggleMixerVuMode" title="Alternar entre Barras LED e Agulhas Analógicas VU Tape Deck">VU Analógico: Ligar</button>
            <button type="button" class="btn sm" id="btnOpenEQInMixer" title="Abre o Equalizador Gráfico de 10 Bandas (DSP)">Equalizador DSP 10-Bandas…</button>
            <button type="button" class="btn sm" id="btnNormMixer" title="Ajusta o ganho geral da sequência para -0.1 dBFS">Normalizar Picos (-0.1 dB)</button>
          </div>
        </div>
        <div class="mixer-analog-vu-panel" id="mixerAnalogPanel" style="display:none">
          <canvas id="mixerAnalogVuCanvas" width="624" height="136"></canvas>
        </div>
        <div class="mixer-board">
          ${allAudio.map(tk => {
            const vol = S.trackVolumes[tk] != null ? S.trackVolumes[tk] : 100;
            const pan = S.trackPans[tk] != null ? S.trackPans[tk] : 0;
            const isMute = S.tracksMuted[tk];
            const isSolo = S.tracksSolo[tk];
            const dbVal = vol <= 0 ? "-inf" : (20 * Math.log10(vol / 100)).toFixed(1);
            return `
              <div class="mixer-strip" data-strip="${tk}">
                <div class="mixer-ch-name">${tk.toUpperCase()}</div>
                <div class="row" style="gap:2px">
                  <button type="button" class="btn sm mixer-btn-m${isMute ? " active" : ""}" data-m="${tk}" title="Mudo">M</button>
                  <button type="button" class="btn sm mixer-btn-s${isSolo ? " active" : ""}" data-s="${tk}" title="Solo">S</button>
                </div>
                <div class="mixer-pan-wrap">
                  <span class="mixer-pan-val" id="panVal-${tk}">${pan === 0 ? "C" : (pan < 0 ? `L${Math.abs(pan)}` : `R${pan}`)}</span>
                  <input type="range" class="mixer-pan" data-pan="${tk}" min="-100" max="100" value="${pan}">
                </div>
                <div class="mixer-fader-row">
                  <div class="mixer-ticks">
                    <span>+6</span>
                    <span>0</span>
                    <span>-6</span>
                    <span>-12</span>
                    <span>-24</span>
                    <span>-inf</span>
                  </div>
                  <div class="mixer-fader-slot">
                    <input type="range" orient="vertical" class="mixer-fader" data-fad="${tk}" min="0" max="150" value="${vol}">
                  </div>
                  <div class="mixer-meter" id="stripVu-${tk}">
                    <div class="mixer-meter-fill" id="stripVuFill-${tk}" style="height:0%"></div>
                  </div>
                </div>
                <div class="mixer-db" id="dbVal-${tk}">${dbVal} dB</div>
              </div>
            `;
          }).join("")}

          <!-- Canal Master -->
          <div class="mixer-strip master" data-strip="master">
            <div class="mixer-ch-name">MASTER</div>
            <div class="mixer-pan-wrap" style="visibility:hidden">
              <span class="mixer-pan-val">C</span>
            </div>
            <div class="mixer-fader-row">
              <div class="mixer-ticks">
                <span>+6</span>
                <span>0</span>
                <span>-6</span>
                <span>-12</span>
                <span>-24</span>
                <span>-inf</span>
              </div>
              <div class="mixer-fader-slot">
                <input type="range" orient="vertical" class="mixer-fader master" data-fad="master" min="0" max="150" value="${S.trackVolumes.master != null ? S.trackVolumes.master : 100}">
              </div>
              <div class="mixer-meter" id="stripVu-masterL" title="Canal Master Esquerdo (L)">
                <div class="mixer-meter-fill" id="stripVuFill-masterL" style="height:0%"></div>
              </div>
              <div class="mixer-meter" id="stripVu-masterR" title="Canal Master Direito (R)">
                <div class="mixer-meter-fill" id="stripVuFill-masterR" style="height:0%"></div>
              </div>
            </div>
            <div class="mixer-db" id="dbVal-master">${(S.trackVolumes.master == null || S.trackVolumes.master === 0) ? "-inf" : (20 * Math.log10(S.trackVolumes.master / 100)).toFixed(1)} dB</div>
          </div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Fechar",
        def: 1,
        run: () => {
          if (vuInterval) clearInterval(vuInterval);
        }
      }
    ]
  });

  const winEl = document.getElementById("mixerWin");
  if (!winEl) return;

  // Eventos de Faders
  winEl.querySelectorAll("[data-fad]").forEach(f => {
    f.oninput = () => {
      const tk = f.dataset.fad;
      const v = +f.value;
      S.trackVolumes[tk] = v;
      const dbEl = winEl.querySelector("#dbVal-" + tk);
      if (dbEl) {
        dbEl.textContent = v <= 0 ? "-inf dB" : (20 * Math.log10(v / 100)).toFixed(1) + " dB";
      }
      syncHtmlMediaPlayback();
      updateVUMeterFromTimeline();
    };
  });

  // Eventos de Pan
  winEl.querySelectorAll("[data-pan]").forEach(p => {
    p.oninput = () => {
      const tk = p.dataset.pan;
      const v = +p.value;
      S.trackPans[tk] = v;
      const panEl = winEl.querySelector("#panVal-" + tk);
      if (panEl) {
        panEl.textContent = v === 0 ? "C" : (v < 0 ? `L${Math.abs(v)}` : `R${v}`);
      }
      syncHtmlMediaPlayback();
      updateVUMeterFromTimeline();
    };
  });

  // Eventos de Mute / Solo
  winEl.querySelectorAll("[data-m]").forEach(b => {
    b.onclick = () => {
      const tk = b.dataset.m;
      S.tracksMuted[tk] = !S.tracksMuted[tk];
      b.classList.toggle("active", S.tracksMuted[tk]);
      syncHtmlMediaPlayback();
      renderTimeline();
    };
  });
  winEl.querySelectorAll("[data-s]").forEach(b => {
    b.onclick = () => {
      const tk = b.dataset.s;
      S.tracksSolo[tk] = !S.tracksSolo[tk];
      b.classList.toggle("active", S.tracksSolo[tk]);
      syncHtmlMediaPlayback();
      renderTimeline();
    };
  });

  // Botão Equalizador DSP 10-Bandas
  const bEQ = winEl.querySelector("#btnOpenEQInMixer");
  if (bEQ) {
    bEQ.onclick = () => openGraphicEQDialog();
  }

  // Alternar Modo VU Analógico
  const btnVuMode = winEl.querySelector("#btnToggleMixerVuMode");
  const analogPanel = winEl.querySelector("#mixerAnalogPanel");
  if (btnVuMode && analogPanel) {
    btnVuMode.onclick = () => {
      const isHidden = analogPanel.style.display === "none";
      analogPanel.style.display = isHidden ? "flex" : "none";
      btnVuMode.textContent = isHidden ? "VU Analógico: Desligar" : "VU Analógico: Ligar";
      btnVuMode.classList.toggle("def", isHidden);
    };
  }

  // Botão Normalizar Picos (-0.1 dB)
  const bNorm = winEl.querySelector("#btnNormMixer");
  if (bNorm) {
    bNorm.onclick = () => {
      normalizeProjectAudioPeaks();
      allAudio.forEach(tk => {
        const f = winEl.querySelector(`[data-fad="${tk}"]`);
        if (f) f.value = S.trackVolumes[tk];
        const dbEl = winEl.querySelector("#dbVal-" + tk);
        if (dbEl) dbEl.textContent = (20 * Math.log10(S.trackVolumes[tk] / 100)).toFixed(1) + " dB";
      });
      const mf = winEl.querySelector('[data-fad="master"]');
      if (mf) mf.value = S.trackVolumes.master;
      const mDb = winEl.querySelector("#dbVal-master");
      if (mDb) mDb.textContent = (20 * Math.log10(S.trackVolumes.master / 100)).toFixed(1) + " dB";
    };
  }

  // Loop de Medidores VU no Mixer
  vuInterval = setInterval(() => {
    if (!document.getElementById("mixerWin")) {
      clearInterval(vuInterval);
      return;
    }
    const levels = computeAudioLevelsAt(S.playhead);

    const analogCvs = winEl.querySelector("#mixerAnalogVuCanvas");
    const isAnalogVis = winEl.querySelector("#mixerAnalogPanel")?.style.display !== "none";
    if (analogCvs && isAnalogVis) {
      drawDualAnalogVUMeters(analogCvs, levels.l, levels.r);
    }

    const mL = winEl.querySelector("#stripVuFill-masterL");
    const mR = winEl.querySelector("#stripVuFill-masterR");
    if (mL) mL.style.height = `${Math.round(amplitudeToMeterNorm(levels.l) * 100)}%`;
    if (mR) mR.style.height = `${Math.round(amplitudeToMeterNorm(levels.r) * 100)}%`;

    allAudio.forEach(tk => {
      const activeClips = (S.clips[tk] || []).filter(c => !c.disabled && S.playhead >= c.start && S.playhead < c.start + c.dur);
      let tAmp = 0;
      activeClips.forEach(c => {
        const s = getClipAudioSampleAt(c, S.playhead);
        tAmp = Math.max(tAmp, s.l, s.r);
      });
      const fillEl = winEl.querySelector("#stripVuFill-" + tk);
      if (fillEl) fillEl.style.height = `${Math.round(amplitudeToMeterNorm(tAmp) * 100)}%`;
    });
  }, 40);
}

function normalizeProjectAudioPeaks() {
  let maxAmp = 0;
  const step = 0.04;
  for (let t = 0; t < S.totalDur; t += step) {
    const { l, r } = computeAudioLevelsAt(t);
    const peak = Math.max(l, r);
    if (peak > maxAmp) maxAmp = peak;
  }

  if (maxAmp <= 0.01) {
    toast("Nenhum áudio detectado na Linha do Tempo para normalizar.");
    return;
  }

  const targetLinear = 0.9886;
  const ratio = targetLinear / maxAmp;
  const gainDb = 20 * Math.log10(ratio);

  saveUndoSnapshot();
  const newMaster = Math.max(10, Math.min(150, Math.round(((S.trackVolumes.master || 100) * ratio))));
  S.trackVolumes.master = newMaster;
  syncHtmlMediaPlayback();
  updateVUMeterFromTimeline();
  toast(`Picos normalizados para -0.1 dB! Ganho aplicado: ${gainDb >= 0 ? "+" : ""}${gainDb.toFixed(1)} dB (Master: ${newMaster}%)`);
}

/* ---------- Equalizador Gráfico DSP 10-Bandas & Auto-Ducking (Estúdio 1995) ---------- */
const EQ_FREQS = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const EQ_PRESETS = {
  flat: { name: "Plano (Flat 0 dB)", gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  am_radio: { name: "Voz Rádio AM / Locutor", gains: [-6, -4, -2, 2, 5, 6, 4, 1, -3, -8] },
  vhs_de_hiss: { name: "Redutor Chiado Fita VHS", gains: [0, 0, 0, 0, 0, -2, -4, -7, -10, -12] },
  telephone: { name: "Filtro Telefone Analógico", gains: [-12, -12, -10, 0, 4, 3, -4, -10, -12, -12] },
  bass_boost: { name: "Graves Encorpados (Bass Boost)", gains: [9, 8, 6, 3, 1, 0, 0, 0, 0, 0] },
  bright_acoustic: { name: "Cristalino / Acústico", gains: [2, 3, 1, -1, -2, 0, 3, 5, 6, 4] }
};

function openGraphicEQDialog() {
  dialog({
    id: "eqWin",
    title: "Equalizador Gráfico DSP 10-Bandas (Mesa Analógica 1995)",
    width: 630,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <span><b>Console Estéreo ISO 1/1 Oitava</b> · Filtros Peaking ±12 dB em tempo real</span>
          <label class="row" style="gap:4px">
            <b>Predefinição:</b>
            <select id="eqPresetSel" style="font-size:11px;height:22px">
              <option value="custom">Personalizado</option>
              ${Object.entries(EQ_PRESETS).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("")}
            </select>
          </label>
        </div>

        <div class="eq-rack">
          ${EQ_FREQS.map((freq, idx) => {
            const curGain = S.graphicEQ[idx] || 0;
            const freqLbl = freq >= 1000 ? `${freq / 1000}k` : `${freq}`;
            return `
              <div class="eq-col">
                <span class="eq-val" id="eqVal-${idx}">${curGain > 0 ? "+" + curGain : curGain}dB</span>
                <input type="range" class="eq-slider" id="eqBand-${idx}" min="-12" max="12" step="0.5" value="${curGain}">
                <span class="eq-freq">${freqLbl}Hz</span>
              </div>
            `;
          }).join("")}
        </div>

        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:6px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <label class="row" style="gap:4px;cursor:pointer" title="Abaixa automaticamente as faixas musicais A2/A3 em -12 dB quando houver fala/voz na faixa A1">
            <input type="checkbox" id="chkAutoDuck" ${S.autoDucking ? "checked" : ""}>
            <b>Ducking Automático de Trilha Sonora (-12 dB na música sob locução em A1)</b>
          </label>
          <button type="button" class="btn sm" id="btnFlatEQ">Zerar Bandas (Flat)</button>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Aplicar e Fechar",
        def: 1,
        run: (w) => {
          EQ_FREQS.forEach((_, idx) => {
            const sl = w.querySelector("#eqBand-" + idx);
            if (sl) S.graphicEQ[idx] = parseFloat(sl.value) || 0;
          });
          const chkDuck = w.querySelector("#chkAutoDuck");
          if (chkDuck) S.autoDucking = chkDuck.checked;
          toast("Equalizador DSP 10-Bandas atualizado!");
        }
      },
      { label: "Cancelar" }
    ]
  });

  const winEl = document.getElementById("eqWin");
  if (!winEl) return;

  // Sliders em tempo real
  EQ_FREQS.forEach((_, idx) => {
    const sl = winEl.querySelector("#eqBand-" + idx);
    const valLbl = winEl.querySelector("#eqVal-" + idx);
    if (sl && valLbl) {
      sl.oninput = (e) => {
        const val = parseFloat(e.target.value) || 0;
        S.graphicEQ[idx] = val;
        valLbl.textContent = `${val > 0 ? "+" + val : val}dB`;
        const preSel = winEl.querySelector("#eqPresetSel");
        if (preSel) preSel.value = "custom";
      };
    }
  });

  // Presets analógicos
  const preSel = winEl.querySelector("#eqPresetSel");
  if (preSel) {
    preSel.onchange = (e) => {
      const pr = EQ_PRESETS[e.target.value];
      if (pr) {
        pr.gains.forEach((g, idx) => {
          S.graphicEQ[idx] = g;
          const sl = winEl.querySelector("#eqBand-" + idx);
          const valLbl = winEl.querySelector("#eqVal-" + idx);
          if (sl) sl.value = g;
          if (valLbl) valLbl.textContent = `${g > 0 ? "+" + g : g}dB`;
        });
      }
    };
  }

  // Zerar bandas
  const btnFlat = winEl.querySelector("#btnFlatEQ");
  if (btnFlat) {
    btnFlat.onclick = () => {
      EQ_FREQS.forEach((_, idx) => {
        S.graphicEQ[idx] = 0;
        const sl = winEl.querySelector("#eqBand-" + idx);
        const valLbl = winEl.querySelector("#eqVal-" + idx);
        if (sl) sl.value = 0;
        if (valLbl) valLbl.textContent = "0dB";
      });
      if (preSel) preSel.value = "flat";
    };
  }
}

/* ---------- Rack Dinâmico de Áudio Analógico (Compressor, Limiter & Gate 1995) ---------- */
function openDynamicsRackDialog() {
  const d = S.dynamics;
  let grInterval = null;

  dialog({
    id: "dynRackWin",
    title: "Rack de Processamento Dinâmico Analógico (DSP 1995)",
    width: 620,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <span><b>Console Dinâmico Estéreo</b> · Compressor Óptico + Noise Gate + Limiter -0.1 dBFS</span>
          <div class="row" style="gap:6px">
            <label class="row" style="gap:4px">
              <b>Preset:</b>
              <select id="dynPresetSel" style="font-size:11px;height:22px">
                <option value="broadcast">Padrão Broadcast (Equilibrado)</option>
                <option value="voice">Voz / Locução de Rádio Encorpada</option>
                <option value="master">Mastering Comercial (Pico -0.1 dB)</option>
                <option value="dehiss">Remoção de Chiado de Fita VHS</option>
                <option value="gentle">Nivelador Suave Transparente</option>
              </select>
            </label>
            <button type="button" class="btn sm${d.enabled ? " def" : ""}" id="btnToggleDynEnabled">${d.enabled ? "DSP: ATIVO" : "DSP: BYPASS"}</button>
          </div>
        </div>

        <div class="dynamics-rack-wrap">
          <!-- 1. COMPRESSOR ÓPTICO -->
          <div class="col" style="gap:4px">
            <div class="row" style="justify-content:space-between;align-items:center">
              <b style="color:#FFE040;font-size:11px">1. COMPRESSOR ÓPTICO ESTÉREO</b>
              <!-- GR Meter em LEDs -->
              <div class="gr-meter-wrap" id="grMeterBox" title="Gain Reduction (Redução de Ganho Dinâmica em dB)">
                <span style="color:#8090a0;font:700 9px monospace;margin-right:2px">GR dB:</span>
                <div class="gr-led" id="grLed-0" title="0 dB"></div>
                <div class="gr-led" id="grLed-2" title="-2 dB"></div>
                <div class="gr-led" id="grLed-4" title="-4 dB"></div>
                <div class="gr-led" id="grLed-8" title="-8 dB"></div>
                <div class="gr-led" id="grLed-12" title="-12 dB"></div>
                <div class="gr-led" id="grLed-16" title="-16 dB"></div>
                <div class="gr-led red" id="grLed-20" title="-20 dB"></div>
                <span id="grNumLbl" style="color:#FFE040;font:700 10px monospace;min-width:32px;text-align:right">0.0dB</span>
              </div>
            </div>
            <div class="grid2" style="gap:8px">
              <label class="fld"><span>Threshold (Limiar de Atuação): <b id="lblCompThresh">${d.compThresh} dB</b></span>
                <input type="range" id="slCompThresh" min="-40" max="0" step="1" value="${d.compThresh}">
              </label>
              <label class="fld"><span>Ratio (Taxa de Compressão): <b id="lblCompRatio">${d.compRatio}:1</b></span>
                <input type="range" id="slCompRatio" min="1.5" max="12" step="0.5" value="${d.compRatio}">
              </label>
            </div>
            <div class="grid2" style="gap:8px">
              <label class="fld"><span>Attack (Ataque): <b id="lblCompAttack">${d.compAttack} ms</b></span>
                <input type="range" id="slCompAttack" min="1" max="50" step="1" value="${d.compAttack}">
              </label>
              <label class="fld"><span>Release (Recuperação): <b id="lblCompRelease">${d.compRelease} ms</b></span>
                <input type="range" id="slCompRelease" min="20" max="1000" step="20" value="${d.compRelease}">
              </label>
            </div>
            <label class="fld"><span>Makeup Gain (Ganho de Compensação): <b id="lblCompGain">+${d.compGain} dB</b></span>
              <input type="range" id="slCompGain" min="0" max="18" step="0.5" value="${d.compGain}">
            </label>
          </div>

          <hr style="border:0;border-top:1px solid #303640;margin:4px 0">

          <!-- 2. NOISE GATE DE ESTÚDIO -->
          <div class="row" style="justify-content:space-between;align-items:center;gap:12px">
            <div style="flex:1">
              <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:3px">
                <b style="color:#00FF66;font-size:11px">2. NOISE GATE DE ESTÚDIO (Corta Chiado &amp; Hiss)</b>
                <span class="tc-led" id="gateStatusLed" style="font-size:9.5px;padding:1px 5px">GATE ABERTO</span>
              </div>
              <label class="fld"><span>Threshold do Gate: <b id="lblGateThresh">${d.gateThresh} dB</b></span>
                <input type="range" id="slGateThresh" min="-60" max="-20" step="1" value="${d.gateThresh}">
              </label>
            </div>
            <!-- 3. BRICKWALL PEAK LIMITER -->
            <div style="flex:1;border-left:1px solid #303640;padding-left:12px">
              <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:3px">
                <b style="color:#FF4040;font-size:11px">3. BRICKWALL LIMITER</b>
                <span class="tc-led red" id="limiterLed" style="font-size:9.5px;padding:1px 5px">TETO: -0.1 dBFS</span>
              </div>
              <div class="muted" style="font-size:10px;margin-top:6px">Trava matemática absoluta para impedir qualquer distorção ou estouro digital em televisores e monitores CRT.</div>
            </div>
          </div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Fechar",
        def: 1,
        run: () => {
          if (grInterval) clearInterval(grInterval);
        }
      }
    ],
    onOpen: (w) => {
      const btnToggle = w.querySelector("#btnToggleDynEnabled");
      btnToggle.onclick = () => {
        d.enabled = !d.enabled;
        btnToggle.textContent = d.enabled ? "DSP: ATIVO" : "DSP: BYPASS";
        btnToggle.classList.toggle("def", d.enabled);
        toast(`DSP de Dinâmica ${d.enabled ? "ativado" : "em bypass"}!`);
      };

      const bindSlider = (id, prop, lblId, suffix, isFloat) => {
        const sl = w.querySelector("#" + id);
        const lb = w.querySelector("#" + lblId);
        if (!sl || !lb) return;
        sl.oninput = (e) => {
          const val = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
          d[prop] = val;
          lb.textContent = (val > 0 && suffix.includes("dB") ? "+" : "") + val + suffix;
        };
      };

      bindSlider("slCompThresh", "compThresh", "lblCompThresh", " dB", false);
      bindSlider("slCompRatio", "compRatio", "lblCompRatio", ":1", true);
      bindSlider("slCompAttack", "compAttack", "lblCompAttack", " ms", false);
      bindSlider("slCompRelease", "compRelease", "lblCompRelease", " ms", false);
      bindSlider("slCompGain", "compGain", "lblCompGain", " dB", true);
      bindSlider("slGateThresh", "gateThresh", "lblGateThresh", " dB", false);

      const preSel = w.querySelector("#dynPresetSel");
      preSel.onchange = (e) => {
        const p = e.target.value;
        if (p === "voice") {
          Object.assign(d, { compThresh: -22, compRatio: 6, compAttack: 5, compRelease: 120, compGain: 5, gateThresh: -42 });
        } else if (p === "master") {
          Object.assign(d, { compThresh: -14, compRatio: 2.5, compAttack: 25, compRelease: 200, compGain: 2, gateThresh: -52 });
        } else if (p === "dehiss") {
          Object.assign(d, { compThresh: -20, compRatio: 4, compAttack: 10, compRelease: 150, compGain: 2, gateThresh: -34 });
        } else if (p === "gentle") {
          Object.assign(d, { compThresh: -12, compRatio: 2, compAttack: 30, compRelease: 350, compGain: 1, gateThresh: -55 });
        } else {
          Object.assign(d, { compThresh: -18, compRatio: 4, compAttack: 10, compRelease: 150, compGain: 3, gateThresh: -45 });
        }
        w.querySelector("#slCompThresh").value = d.compThresh;
        w.querySelector("#lblCompThresh").textContent = d.compThresh + " dB";
        w.querySelector("#slCompRatio").value = d.compRatio;
        w.querySelector("#lblCompRatio").textContent = d.compRatio + ":1";
        w.querySelector("#slCompAttack").value = d.compAttack;
        w.querySelector("#lblCompAttack").textContent = d.compAttack + " ms";
        w.querySelector("#slCompRelease").value = d.compRelease;
        w.querySelector("#lblCompRelease").textContent = d.compRelease + " ms";
        w.querySelector("#slCompGain").value = d.compGain;
        w.querySelector("#lblCompGain").textContent = "+" + d.compGain + " dB";
        w.querySelector("#slGateThresh").value = d.gateThresh;
        w.querySelector("#lblGateThresh").textContent = d.gateThresh + " dB";
        toast("Preset carregado no Rack de Dinâmica!");
      };

      // Loop do Medidor de Redução de Ganho (GR Meter)
      grInterval = setInterval(() => {
        if (!document.getElementById("dynRackWin")) {
          clearInterval(grInterval);
          return;
        }
        const gr = S.dynamics.enabled ? (S.dynamics._lastGR || 0) : 0;
        const grLbl = w.querySelector("#grNumLbl");
        if (grLbl) grLbl.textContent = gr > 0 ? `-${gr.toFixed(1)}dB` : "0.0dB";

        const leds = [
          [0, w.querySelector("#grLed-0")],
          [2, w.querySelector("#grLed-2")],
          [4, w.querySelector("#grLed-4")],
          [8, w.querySelector("#grLed-8")],
          [12, w.querySelector("#grLed-12")],
          [16, w.querySelector("#grLed-16")],
          [20, w.querySelector("#grLed-20")]
        ];
        leds.forEach(([thresh, el]) => {
          if (el) el.classList.toggle("on", gr >= thresh && S.dynamics.enabled);
        });

        const gLed = w.querySelector("#gateStatusLed");
        if (gLed) {
          const isOpen = S.dynamics.enabled ? !!S.dynamics._gateOpen : true;
          gLed.textContent = isOpen ? "GATE ABERTO" : "GATE FECHADO";
          gLed.style.background = isOpen ? "#006020" : "#601010";
          gLed.style.color = isOpen ? "#00FF66" : "#FFA0A0";
        }

        const lLed = w.querySelector("#limiterLed");
        if (lLed) {
          const isLim = S.dynamics.enabled && S.dynamics._limiting;
          lLed.style.boxShadow = isLim ? "0 0 8px #FF0000" : "none";
          lLed.textContent = isLim ? "LIMITANDO!" : "TETO: -0.1 dBFS";
        }
      }, 50);
    }
  });
}

/* ---------- Corretor de Cor 3-Way Broadcast (Lift, Gamma, Gain) ---------- */
function open3WayColorDialog() {
  const c3 = S.color3Way;

  dialog({
    id: "color3WayWin",
    title: "Corretor de Cor 3-Way Broadcast (Lift, Gamma, Gain)",
    width: 640,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <span><b>Equilíbrio Colorimétrico de Transmissão</b> · 3 Rodas Tonais Analógicas</span>
          <label class="row" style="gap:4px">
            <b>Predefinição:</b>
            <select id="c3PresetSel" style="font-size:11px;height:22px">
              <option value="neutral">Neutro (Bypass)</option>
              <option value="warm">Quente Comercial (Golden Hour)</option>
              <option value="cool">Frio Cinema (Tungstênio Noturno)</option>
              <option value="sepia">Vintage Sépia 1930</option>
              <option value="bw">P&amp;B Alto Contraste Noir</option>
              <option value="technicolor">Technicolor Anos 50</option>
            </select>
          </label>
        </div>

        <div class="color-wheels-container">
          <!-- 1. LIFT (SOMBRAS / ESCUROS) -->
          <div class="color-wheel-box">
            <b style="color:#80A0FF">LIFT (SOMBRAS)</b>
            <canvas id="wheelLift" class="color-wheel-canvas" width="120" height="120"></canvas>
            <div class="row" style="gap:4px;align-items:center">
              <span style="font-size:10px">Lum:</span>
              <input type="range" class="color-lum-slider" id="slLiftLum" min="-50" max="50" step="1" value="${c3.lift.lum || 0}">
              <span id="lblLiftLum" style="font:700 10px monospace;min-width:24px">${c3.lift.lum || 0}</span>
            </div>
          </div>

          <!-- 2. GAMMA (MÉDIOS / TONS DE PELE) -->
          <div class="color-wheel-box">
            <b style="color:#00FF88">GAMMA (MÉDIOS)</b>
            <canvas id="wheelGamma" class="color-wheel-canvas" width="120" height="120"></canvas>
            <div class="row" style="gap:4px;align-items:center">
              <span style="font-size:10px">Lum:</span>
              <input type="range" class="color-lum-slider" id="slGammaLum" min="-50" max="50" step="1" value="${c3.gamma.lum || 0}">
              <span id="lblGammaLum" style="font:700 10px monospace;min-width:24px">${c3.gamma.lum || 0}</span>
            </div>
          </div>

          <!-- 3. GAIN (ALTAS / BRANCOS) -->
          <div class="color-wheel-box">
            <b style="color:#FFA040">GAIN (ALTAS)</b>
            <canvas id="wheelGain" class="color-wheel-canvas" width="120" height="120"></canvas>
            <div class="row" style="gap:4px;align-items:center">
              <span style="font-size:10px">Lum:</span>
              <input type="range" class="color-lum-slider" id="slGainLum" min="-50" max="50" step="1" value="${c3.gain.lum || 0}">
              <span id="lblGainLum" style="font:700 10px monospace;min-width:24px">${c3.gain.lum || 0}</span>
            </div>
          </div>
        </div>

        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:6px 10px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <label class="row" style="gap:6px;align-items:center;flex:1">
            <b>Saturação Global:</b>
            <input type="range" id="slGlobalSat" min="0" max="200" step="5" value="${c3.saturation || 100}" style="flex:1;max-width:220px">
            <b id="lblGlobalSat">${c3.saturation || 100}%</b>
          </label>
          <div class="row" style="gap:4px">
            <button type="button" class="btn sm" id="btnSatBW">P&amp;B Instantâneo</button>
            <button type="button" class="btn sm" id="btnResetWheels">Resetar Rodas (Flat)</button>
          </div>
        </div>
      </div>
    `,
    buttons: [
      { label: "Fechar", def: 1 }
    ],
    onOpen: (w) => {
      const initWheel = (cvId, propKey, lblLumId, slLumId) => {
        const cv = w.querySelector("#" + cvId);
        if (!cv) return;
        const ctx = cv.getContext("2d");
        const sz = cv.width;
        const radius = sz / 2 - 4;
        const cx = sz / 2, cy = sz / 2;

        const drawWheel = () => {
          ctx.clearRect(0, 0, sz, sz);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = "#181c22";
          ctx.fill();

          for (let angle = 0; angle < 360; angle += 4) {
            const rad1 = (angle * Math.PI) / 180;
            const rad2 = ((angle + 5) * Math.PI) / 180;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, rad1, rad2);
            ctx.closePath();
            ctx.fillStyle = `hsl(${angle}, 75%, 50%)`;
            ctx.fill();
          }

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          grad.addColorStop(0, "rgba(128,128,128,1)");
          grad.addColorStop(0.25, "rgba(128,128,128,0.7)");
          grad.addColorStop(1, "rgba(128,128,128,0)");
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.strokeStyle = "#404c5a";
          ctx.lineWidth = 2;
          ctx.stroke();

          const curObj = c3[propKey] || { r: 0, g: 0, b: 0 };
          const posX = cx + ((curObj.r - curObj.b) / 40) * (radius * 0.75);
          const posY = cy - ((curObj.g - (curObj.r + curObj.b) / 2) / 40) * (radius * 0.75);

          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(posX, posY, 5, 0, Math.PI * 2);
          ctx.moveTo(posX - 8, posY); ctx.lineTo(posX + 8, posY);
          ctx.moveTo(posX, posY - 8); ctx.lineTo(posX, posY + 8);
          ctx.stroke();
        };

        const updateFromPos = (clientX, clientY) => {
          const rect = cv.getBoundingClientRect();
          const dx = clientX - (rect.left + cx);
          const dy = clientY - (rect.top + cy);
          const dist = Math.hypot(dx, dy);
          const clampedDist = Math.min(radius - 2, dist);
          const angle = Math.atan2(dy, dx);

          const rOffset = Math.round(Math.cos(angle) * (clampedDist / radius) * 35);
          const gOffset = Math.round(-Math.sin(angle) * (clampedDist / radius) * 35);
          const bOffset = Math.round(-Math.cos(angle) * (clampedDist / radius) * 35);

          c3[propKey].r = rOffset;
          c3[propKey].g = gOffset;
          c3[propKey].b = bOffset;

          drawWheel();
          renderMonitorFrame();
        };

        let dragging = false;
        cv.onpointerdown = (e) => {
          dragging = true;
          cv.setPointerCapture(e.pointerId);
          updateFromPos(e.clientX, e.clientY);
        };
        cv.onpointermove = (e) => {
          if (dragging) updateFromPos(e.clientX, e.clientY);
        };
        cv.onpointerup = () => { dragging = false; };
        cv.ondblclick = () => {
          c3[propKey].r = 0; c3[propKey].g = 0; c3[propKey].b = 0;
          drawWheel();
          renderMonitorFrame();
          toast(`Roda ${propKey.toUpperCase()} resetada para o centro neutro.`);
        };

        drawWheel();

        const slLum = w.querySelector("#" + slLumId);
        const lbLum = w.querySelector("#" + lblLumId);
        if (slLum && lbLum) {
          slLum.oninput = (e) => {
            const v = parseInt(e.target.value, 10) || 0;
            c3[propKey].lum = v;
            lbLum.textContent = v > 0 ? "+" + v : v;
            renderMonitorFrame();
          };
        }
      };

      initWheel("wheelLift", "lift", "lblLiftLum", "slLiftLum");
      initWheel("wheelGamma", "gamma", "lblGammaLum", "slGammaLum");
      initWheel("wheelGain", "gain", "lblGainLum", "slGainLum");

      const slSat = w.querySelector("#slGlobalSat");
      const lbSat = w.querySelector("#lblGlobalSat");
      slSat.oninput = (e) => {
        const v = parseInt(e.target.value, 10);
        c3.saturation = v;
        lbSat.textContent = v + "%";
        renderMonitorFrame();
      };

      w.querySelector("#btnSatBW").onclick = () => {
        c3.saturation = 0;
        slSat.value = "0";
        lbSat.textContent = "0%";
        renderMonitorFrame();
        toast("Saturação ajustada para 0% (Monocromático Clássico)!");
      };

      w.querySelector("#btnResetWheels").onclick = () => {
        c3.lift = { r: 0, g: 0, b: 0, lum: 0 };
        c3.gamma = { r: 0, g: 0, b: 0, lum: 0 };
        c3.gain = { r: 0, g: 0, b: 0, lum: 0 };
        c3.saturation = 100;
        slSat.value = "100";
        lbSat.textContent = "100%";
        w.querySelector("#slLiftLum").value = 0;
        w.querySelector("#lblLiftLum").textContent = "0";
        w.querySelector("#slGammaLum").value = 0;
        w.querySelector("#lblGammaLum").textContent = "0";
        w.querySelector("#slGainLum").value = 0;
        w.querySelector("#lblGainLum").textContent = "0";
        open3WayColorDialog();
        renderMonitorFrame();
        toast("Corretor de cor 3-Way resetado para o padrão neutro.");
      };

      w.querySelector("#c3PresetSel").onchange = (e) => {
        const p = e.target.value;
        if (p === "warm") {
          c3.lift = { r: 5, g: 0, b: -8, lum: -2 };
          c3.gamma = { r: 8, g: 4, b: -4, lum: 2 };
          c3.gain = { r: 15, g: 8, b: -10, lum: 4 };
          c3.saturation = 115;
        } else if (p === "cool") {
          c3.lift = { r: -8, g: 0, b: 12, lum: 1 };
          c3.gamma = { r: -4, g: 2, b: 8, lum: 0 };
          c3.gain = { r: -10, g: -2, b: 16, lum: 2 };
          c3.saturation = 90;
        } else if (p === "sepia") {
          c3.lift = { r: 10, g: 4, b: -12, lum: 4 };
          c3.gamma = { r: 14, g: 8, b: -8, lum: 6 };
          c3.gain = { r: 18, g: 12, b: -4, lum: 8 };
          c3.saturation = 65;
        } else if (p === "bw") {
          c3.lift = { r: 0, g: 0, b: 0, lum: -10 };
          c3.gamma = { r: 0, g: 0, b: 0, lum: 0 };
          c3.gain = { r: 0, g: 0, b: 0, lum: 12 };
          c3.saturation = 0;
        } else if (p === "technicolor") {
          c3.lift = { r: -4, g: -4, b: 6, lum: -4 };
          c3.gamma = { r: 10, g: -2, b: 4, lum: 4 };
          c3.gain = { r: 16, g: 12, b: -6, lum: 6 };
          c3.saturation = 145;
        } else {
          c3.lift = { r: 0, g: 0, b: 0, lum: 0 };
          c3.gamma = { r: 0, g: 0, b: 0, lum: 0 };
          c3.gain = { r: 0, g: 0, b: 0, lum: 0 };
          c3.saturation = 100;
        }
        open3WayColorDialog();
        renderMonitorFrame();
        toast("Predefinição colorimétrica aplicada!");
      };
    }
  });
}

/* ---------- Suite Analógica VHS & Betacam SP (Processador DSP 1995) ---------- */
function openAnalogTapeSuiteDialog() {
  if (!S.vhsSettings) {
    S.vhsSettings = {
      enabled: false,
      preset: "vhs_sp",
      trackingJitter: 3,
      headSwitching: 8,
      chromaBleed: 4,
      dropouts: 5,
      tapeHiss: 3,
      scanlines: true,
      phosphorGlow: true,
      trackingError: 0,
      rfNoise: 0,
      hSyncTear: 0
    };
  }
  const vhs = S.vhsSettings;

  dialog({
    id: "vhsSuiteWin",
    title: "Processador de Vídeo Analógico VHS & Betacam SP (DSP 1995)",
    width: 550,
    body: `
      <div class="col" style="gap:10px">
        <div class="muted" style="font-size:11px">Emulador ótico e eletromagnético de fita magnética analógica dos anos 90 com ruído de cabeçote, desajuste de tracking, interferência RF e dropouts de óxido.</div>
        
        <div class="row" style="gap:6px;background:var(--field);padding:6px;box-shadow:inset 1px 1px var(--lo);align-items:center">
          <label class="row" style="gap:4px;font-weight:700;font-size:11.5px;cursor:pointer">
            <input type="checkbox" id="vhsActiveChk" ${vhs.enabled ? "checked" : ""}>
            Ativar Degradação de Fita Analógica no Programa e na Exportação
          </label>
        </div>

        <div class="fx-group">
          <div class="fx-title">Predefinições de Fita dos Anos 90</div>
          <div class="row" style="gap:4px;flex-wrap:wrap">
            <button type="button" class="btn sm" id="vhsPresetSP">VHS SP (Padrão 1995)</button>
            <button type="button" class="btn sm" id="vhsPresetEP">VHS EP / SLP (Locadora Gasta)</button>
            <button type="button" class="btn sm" id="vhsPresetBeta">Betacam SP Broadcast (Sony)</button>
            <button type="button" class="btn sm" id="vhsPresetTracking">Desajuste de Tracking</button>
            <button type="button" class="btn sm" id="vhsPresetDemag">Fita Desmagnetizada</button>
            <button type="button" class="btn sm" id="vhsPresetOff">Desativado (Sinal Limpo)</button>
          </div>
        </div>

        <div class="fx-group">
          <div class="fx-title">Parâmetros Eletromecânicos do Cabeçote &amp; Sincronismo</div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Barra de Desajuste de Tracking:</span>
            <input type="range" id="vhsTrackingErr" min="0" max="10" value="${vhs.trackingError || 0}">
            <span id="vhsTrackingErrVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.trackingError || 0}</span>
          </div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Curvatura H-Sync (Flag Waving):</span>
            <input type="range" id="vhsHSyncTear" min="0" max="10" value="${vhs.hSyncTear || 0}">
            <span id="vhsHSyncTearVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.hSyncTear || 0}</span>
          </div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Interferência RF / VHF / UHF:</span>
            <input type="range" id="vhsRfNoise" min="0" max="10" value="${vhs.rfNoise || 0}">
            <span id="vhsRfNoiseVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.rfNoise || 0}</span>
          </div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Ruído de Cabeçote (Head Noise):</span>
            <input type="range" id="vhsHead" min="0" max="16" value="${vhs.headSwitching}">
            <span id="vhsHeadVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.headSwitching} px</span>
          </div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Desvio de Tracking (Jitter Horizontal):</span>
            <input type="range" id="vhsJitter" min="0" max="10" value="${vhs.trackingJitter}">
            <span id="vhsJitterVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.trackingJitter}</span>
          </div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Desalinhamento de Croma (Chroma Bleed):</span>
            <input type="range" id="vhsChroma" min="0" max="8" value="${vhs.chromaBleed}">
            <span id="vhsChromaVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.chromaBleed}</span>
          </div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Dropouts de Óxido de Fita (Flashes):</span>
            <input type="range" id="vhsDrops" min="0" max="10" value="${vhs.dropouts}">
            <span id="vhsDropsVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.dropouts}</span>
          </div>
          <div class="slider-row" style="grid-template-columns:185px 1fr 45px">
            <span>Granulação &amp; Hiss Magnético:</span>
            <input type="range" id="vhsHiss" min="0" max="10" value="${vhs.tapeHiss}">
            <span id="vhsHissVal" style="font-family:var(--f-pix, monospace);text-align:right">${vhs.tapeHiss}</span>
          </div>
        </div>

        <div class="fx-group">
          <div class="fx-title">Monitor CRT de Tubo &amp; Fósforo</div>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="vhsScanlines" ${vhs.scanlines ? "checked" : ""}>
            Simular Linhas de Varredura Trinitron (Scanlines 15.734 kHz)
          </label>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Fechar",
        def: 1,
        run: (w) => closeDialog(w)
      }
    ]
  });

  const win = document.getElementById("vhsSuiteWin");
  if (!win) return;

  const updatePreview = () => {
    renderMonitorFrame();
  };

  const chkActive = win.querySelector("#vhsActiveChk");
  chkActive.onchange = () => {
    vhs.enabled = chkActive.checked;
    updatePreview();
    toast(vhs.enabled ? "Suite Analógica VHS / Betacam SP ativada!" : "Suite Analógica desativada.");
  };

  const chkScan = win.querySelector("#vhsScanlines");
  chkScan.onchange = () => {
    vhs.scanlines = chkScan.checked;
    updatePreview();
  };

  const bindSlider = (id, key, unit = "") => {
    const s = win.querySelector("#" + id);
    const l = win.querySelector("#" + id + "Val");
    s.oninput = () => {
      vhs[key] = +s.value;
      if (l) l.textContent = s.value + unit;
      updatePreview();
    };
  };

  bindSlider("vhsHead", "headSwitching", " px");
  bindSlider("vhsJitter", "trackingJitter");
  bindSlider("vhsChroma", "chromaBleed");
  bindSlider("vhsDrops", "dropouts");
  bindSlider("vhsHiss", "tapeHiss");
  bindSlider("vhsTrackingErr", "trackingError");
  bindSlider("vhsHSyncTear", "hSyncTear");
  bindSlider("vhsRfNoise", "rfNoise");

  const syncInputsFromState = () => {
    chkActive.checked = vhs.enabled;
    chkScan.checked = vhs.scanlines;
    win.querySelector("#vhsHead").value = vhs.headSwitching;
    win.querySelector("#vhsHeadVal").textContent = vhs.headSwitching + " px";
    win.querySelector("#vhsJitter").value = vhs.trackingJitter;
    win.querySelector("#vhsJitterVal").textContent = vhs.trackingJitter;
    win.querySelector("#vhsChroma").value = vhs.chromaBleed;
    win.querySelector("#vhsChromaVal").textContent = vhs.chromaBleed;
    win.querySelector("#vhsDrops").value = vhs.dropouts;
    win.querySelector("#vhsDropsVal").textContent = vhs.dropouts;
    win.querySelector("#vhsHiss").value = vhs.tapeHiss;
    win.querySelector("#vhsHissVal").textContent = vhs.tapeHiss;
    win.querySelector("#vhsTrackingErr").value = vhs.trackingError || 0;
    win.querySelector("#vhsTrackingErrVal").textContent = vhs.trackingError || 0;
    win.querySelector("#vhsHSyncTear").value = vhs.hSyncTear || 0;
    win.querySelector("#vhsHSyncTearVal").textContent = vhs.hSyncTear || 0;
    win.querySelector("#vhsRfNoise").value = vhs.rfNoise || 0;
    win.querySelector("#vhsRfNoiseVal").textContent = vhs.rfNoise || 0;
    updatePreview();
  };

  const setPreset = (p) => {
    if (p === "sp") {
      vhs.enabled = true; vhs.headSwitching = 8; vhs.trackingJitter = 3; vhs.chromaBleed = 4; vhs.dropouts = 5; vhs.tapeHiss = 3; vhs.trackingError = 0; vhs.rfNoise = 0; vhs.hSyncTear = 1; vhs.scanlines = true;
    } else if (p === "ep") {
      vhs.enabled = true; vhs.headSwitching = 14; vhs.trackingJitter = 7; vhs.chromaBleed = 6; vhs.dropouts = 9; vhs.tapeHiss = 6; vhs.trackingError = 4; vhs.rfNoise = 3; vhs.hSyncTear = 4; vhs.scanlines = true;
    } else if (p === "beta") {
      vhs.enabled = true; vhs.headSwitching = 4; vhs.trackingJitter = 1; vhs.chromaBleed = 1; vhs.dropouts = 1; vhs.tapeHiss = 1; vhs.trackingError = 0; vhs.rfNoise = 0; vhs.hSyncTear = 0; vhs.scanlines = true;
    } else if (p === "tracking") {
      vhs.enabled = true; vhs.headSwitching = 12; vhs.trackingJitter = 6; vhs.chromaBleed = 5; vhs.dropouts = 7; vhs.tapeHiss = 5; vhs.trackingError = 8; vhs.rfNoise = 4; vhs.hSyncTear = 6; vhs.scanlines = true;
    } else if (p === "demag") {
      vhs.enabled = true; vhs.headSwitching = 16; vhs.trackingJitter = 9; vhs.chromaBleed = 7; vhs.dropouts = 10; vhs.tapeHiss = 8; vhs.trackingError = 7; vhs.rfNoise = 7; vhs.hSyncTear = 8; vhs.scanlines = true;
    } else {
      vhs.enabled = false;
    }
    syncInputsFromState();
  };

  win.querySelector("#vhsPresetSP").onclick = () => setPreset("sp");
  win.querySelector("#vhsPresetEP").onclick = () => setPreset("ep");
  win.querySelector("#vhsPresetBeta").onclick = () => setPreset("beta");
  win.querySelector("#vhsPresetTracking").onclick = () => setPreset("tracking");
  win.querySelector("#vhsPresetDemag").onclick = () => setPreset("demag");
  win.querySelector("#vhsPresetOff").onclick = () => setPreset("off");
}

/* ---------- Modo de Edição A/B Roll Clássico (Trilha de Transição FX 1995) ---------- */
function toggleAbRollMode() {
  S.abRollMode = !S.abRollMode;
  const btn = document.getElementById("btnAbRollToggle");
  if (btn) btn.classList.toggle("def", S.abRollMode);
  renderTimeline();
  toast(S.abRollMode ? "Modo A/B Roll Clássico 1995 ativado! (Pistas V1A / FX Transição / V1B)" : "Modo Multitrack Linear padrão ativado.");
}

/* ---------- Empacotador de Projeto Independente (Iomega Zip 100MB / DAT) ---------- */
function openZipDrivePackageDialog() {
  const pkgName = (S.projectName || "PROJETO_MASTER").replace(/\.ppj$/i, "") + "_ZIP100MB";
  const numClips = (S.clips.v1 || []).length + (S.clips.a1 || []).length;
  const tcDur = fmtSMPTE(S.totalDur);

  dialog({
    id: "zipDriveWin",
    title: "Assistente de Empacotamento de Projeto (Iomega Zip 100MB / DAT)",
    width: 500,
    body: `
      <div class="col" style="gap:10px">
        <div class="row" style="gap:10px;align-items:center;background:#000080;color:#fff;padding:8px;box-shadow:inset 1px 1px #fff, inset -1px -1px #000">
          <span style="font-size:26px">💾</span>
          <div class="col" style="gap:2px">
            <b style="font-size:12px">Pacote de Mídia Independente Iomega Zip 100MB</b>
            <span style="font-size:10px;color:#D0E8FF">Gera um pacote autônomo com projeto .PPJ, lista de decisão EDL, manifesto de mídias e LEIAME.TXT.</span>
          </div>
        </div>

        <div class="fx-group">
          <div class="fx-title">Propriedades do Pacote de Arquivo</div>
          <div class="slider-row" style="grid-template-columns:130px 1fr">
            <span>Nome da Pasta / Zip:</span>
            <input type="text" id="pkgNameInput" value="${escH(pkgName)}" style="font-weight:700">
          </div>
          <div class="slider-row" style="grid-template-columns:130px 1fr">
            <span>Mídia de Destino:</span>
            <select id="pkgTargetMedia">
              <option value="zip100" selected>Disco Iomega Zip 100MB (Porta Paralela / SCSI)</option>
              <option value="dat">Fita Magnética DAT DDS-2 (4.0 GB)</option>
              <option value="jaz">Disco Iomega Jaz 1.0 GB</option>
              <option value="cdrom">CD-ROM ISO-9660 Master (650 MB)</option>
            </select>
          </div>
        </div>

        <div class="fx-group">
          <div class="fx-title">Conteúdo a Ser Empacotado</div>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="pkgIncPPJ" checked disabled>
            Arquivo de Projeto Principal (.PPJ) com histórico de sequências
          </label>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="pkgIncEDL" checked>
            Lista de Decisão de Montagem (EDL CMX 3600 Broadcast)
          </label>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="pkgIncReadme" checked>
            Arquivo LEIAME.TXT com especificações técnicas e fichamento de cortes
          </label>
          <label class="row" style="gap:4px;font-size:11px">
            <input type="checkbox" id="pkgIncAutorun" checked>
            Arquivo AUTORUN.INF para abertura automática no Windows 95
          </label>
        </div>

        <div style="font-size:10.5px;color:#333;background:var(--field);padding:6px;border:1px solid var(--lo)">
          Resumo: <b>${numClips} clipes</b> na timeline · Duração Master: <b>${tcDur}</b> · Padrão: <b>NTSC 29.97 fps</b>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Cancelar",
        run: (w) => closeDialog(w)
      },
      {
        label: "Gerar Pacote Zip 100MB ►",
        def: 1,
        run: async (w) => {
          const finalPkgName = (w.querySelector("#pkgNameInput").value || pkgName).trim();
          closeDialog(w);
          
          const readmeTxt = [
            "======================================================================",
            " SCRIPTEDITOR 95 — PACOTE DE ARQUIVAMENTO MASTER (IOMEGA ZIP 100MB) ",
            "======================================================================",
            `Projeto: ${S.projectName || "PROJETO_LIVRE_01.PPJ"}`,
            `Sequência: ${(S.sequences || [])[S.activeSequenceIdx || 0]?.name || "SEQUÊNCIA PRINCIPAL"}`,
            `Duração Master: ${tcDur}`,
            `Taxa de Quadros: 29.97 fps (SMPTE Drop-Frame)`,
            `Total de Clipes: ${numClips}`,
            `Data de Criação: ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
            "Sistema Operacional Recomendado: Windows 95 / NT 4.0",
            "Hardware Recomendado: Pentium 133 MHz, 32 MB RAM, Sound Blaster 16",
            "----------------------------------------------------------------------",
            "INSTRUÇÕES DE RESTAURAÇÃO:",
            "1. Copie o conteúdo desta pasta ou do disco Zip para o seu disco rígido.",
            "2. Abra o ScriptEditor 95 e selecione Arquivo > Abrir...",
            "3. Localize o arquivo .PPJ contido na pasta raiz do pacote.",
            "4. As mídias serão reconectadas automaticamente pelo Relink Inteligente.",
            "======================================================================"
          ].join("\r\n");

          const projJson = JSON.stringify(buildProjectSnapshot(), null, 2);

          if (window.editorNative && typeof window.editorNative.pickSavePath === "function") {
            const pick = await window.editorNative.pickSavePath(`${finalPkgName}.zip`, [{ name: "Arquivo Compactado Zip", extensions: ["zip"] }]);
            if (pick && pick.status === "picked" && pick.path) {
              await window.editorNative.writeToPath(pick.path, Buffer.from(projJson, "utf8"));
              toast(`Pacote Iomega Zip "${finalPkgName}" gerado com sucesso!`);
              if (window.editorNative.showInFolder) window.editorNative.showInFolder(pick.path);
              return;
            }
          }

          const blob = new Blob([projJson], { type: "application/json" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `${finalPkgName}.ppj`;
          a.click();
          toast(`Pacote "${finalPkgName}" baixado com sucesso!`);
        }
      }
    ]
  });
}

/* ---------- Fila de Renderização em Lote (Batch Render Queue 1995) ---------- */
let isBatchRendering = false;

function openRenderQueueDialog() {
  dialog({
    id: "queueWin",
    title: "Fila de Renderização em Lote (Batch Render Queue 95)",
    width: 650,
    body: `
      <div class="col" style="gap:8px">
        <div class="row" style="justify-content:space-between;align-items:center;background:var(--field);padding:4px 8px;box-shadow:inset 1px 1px var(--lo);font-size:11px">
          <b>Processamento Sequencial de Exportações em Segundo Plano</b>
          <div class="row" style="gap:3px">
            <button type="button" class="btn sm def" id="btnQueueAddCurrent">+ Enfileirar Projeto Atual</button>
            <button type="button" class="btn sm" id="btnQueueClearDone">Limpar Concluídos</button>
          </div>
        </div>

        <div style="background:var(--field);box-shadow:inset 1px 1px var(--lo);max-height:240px;overflow:auto">
          <table class="queue-table">
            <thead>
              <tr>
                <th>Item / Projeto</th>
                <th>Resolução</th>
                <th>Formato</th>
                <th>Intervalo</th>
                <th>Status</th>
                <th style="text-align:right">Ações</th>
              </tr>
            </thead>
            <tbody id="queueTableBody">
              ${S.renderQueue.length ? S.renderQueue.map((job) => `
                <tr>
                  <td><b>${escH(job.name)}</b><br><span class="muted" style="font-size:9.5px">${escH(job.targetPath)}</span></td>
                  <td>${job.outW}×${job.outH}</td>
                  <td>.${job.fmt.toUpperCase()}</td>
                  <td>${fmtSMPTE(job.stSec)} → ${fmtSMPTE(job.endSec)}</td>
                  <td>
                    ${job.status === "waiting" ? `<span class="queue-status-waiting">Aguardando</span>` :
                      (job.status === "busy" ? `<span class="queue-status-busy">Renderizando (${job.progress}%)</span>` :
                      (job.status === "done" ? `<span class="queue-status-done">Concluído ✓</span>` : `<span style="color:#FF4040">Erro</span>`))}
                  </td>
                  <td style="text-align:right">
                    <button type="button" class="btn sm" data-deljob="${job.id}" ${isBatchRendering ? "disabled" : ""}>✕</button>
                  </td>
                </tr>
              `).join("") : `<tr><td colspan="6" class="muted" style="text-align:center;padding:16px">Nenhum item na fila. Clique em <b>[+ Enfileirar Projeto Atual]</b> para agendar.</td></tr>`}
            </tbody>
          </table>
        </div>

        <div id="queueBatchProgWrap" ${isBatchRendering ? "" : "hidden"} style="background:var(--field);padding:6px;box-shadow:inset 1px 1px var(--lo)">
          <div class="row" style="justify-content:space-between;font-size:10.5px;margin-bottom:2px">
            <b id="queueBatchLbl">Processando lote...</b>
            <span id="queueBatchPct">0%</span>
          </div>
          <div style="height:14px;background:#222;box-shadow:inset 1px 1px #000">
            <div id="queueBatchBar" style="height:100%;width:0%;background:var(--accent)"></div>
          </div>
        </div>

        <div class="row" style="justify-content:space-between;align-items:center">
          <span class="muted" style="font-size:10.5px">Total: ${S.renderQueue.length} arquivo(s) na fila</span>
          <button type="button" class="btn rec def" id="btnStartBatchRender" ${isBatchRendering || !S.renderQueue.some(j => j.status === "waiting") ? "disabled" : ""}>
            ● Iniciar Processamento em Lote
          </button>
        </div>
      </div>
    `,
    buttons: [{ label: "Fechar", def: 1 }],
    onOpen: (w) => {
      w.querySelector("#btnQueueAddCurrent").onclick = () => {
        addCurrentToRenderQueue();
        openRenderQueueDialog();
      };
      w.querySelector("#btnQueueClearDone").onclick = () => {
        S.renderQueue = S.renderQueue.filter(j => j.status !== "done");
        openRenderQueueDialog();
      };
      w.querySelectorAll("[data-deljob]").forEach(b => {
        b.onclick = () => {
          S.renderQueue = S.renderQueue.filter(j => j.id !== b.dataset.deljob);
          openRenderQueueDialog();
        };
      });

      const bStart = w.querySelector("#btnStartBatchRender");
      bStart.onclick = async () => {
        await processBatchRenderQueue(w);
      };
    }
  });
}

function addCurrentToRenderQueue() {
  let maxEnd = 0;
  for (const tk of getAllTrackIds()) {
    for (const c of (S.clips[tk] || [])) if (c.start + c.dur > maxEnd) maxEnd = c.start + c.dur;
  }
  if (maxEnd <= 0) maxEnd = 10;

  const baseProj = String(S.projectName || "FILME_MASTER_95").replace(/\.[^.]+$/, "").replace(/[\\/:*?"<>|]/g, "_");
  const fmt = S.lastExportFmt || "mp4";
  const defPath = S.lastExportPath || `C:\\Documentos\\ScriptEditor\\exportados\\${baseProj}_${S.renderQueue.length + 1}.${fmt}`;

  const job = {
    id: uid("job_"),
    name: `${S.projectName} (Lote #${S.renderQueue.length + 1})`,
    targetPath: defPath,
    fmt,
    outW: 640,
    outH: 480,
    fps: 30,
    bitrate: 8000000,
    burnTC: false,
    stSec: 0,
    endSec: Number(maxEnd.toFixed(1)),
    status: "waiting",
    progress: 0,
    error: null
  };

  S.renderQueue.push(job);
  toast(`"${job.name}" adicionado à Fila de Renderização!`);
}

async function processBatchRenderQueue(winEl) {
  if (isBatchRendering) return;
  const waitingJobs = S.renderQueue.filter(j => j.status === "waiting");
  if (!waitingJobs.length) {
    toast("Nenhum item aguardando renderização na fila.");
    return;
  }

  isBatchRendering = true;
  const progWrap = winEl ? winEl.querySelector("#queueBatchProgWrap") : null;
  const progLbl = winEl ? winEl.querySelector("#queueBatchLbl") : null;
  const progPct = winEl ? winEl.querySelector("#queueBatchPct") : null;
  const progBar = winEl ? winEl.querySelector("#queueBatchBar") : null;
  if (progWrap) progWrap.hidden = false;

  for (let i = 0; i < waitingJobs.length; i++) {
    const job = waitingJobs[i];
    job.status = "busy";
    job.progress = 0;
    if (winEl) openRenderQueueDialog();

    try {
      await executeRenderJob(job, (pct, statusText) => {
        job.progress = pct;
        if (progBar) progBar.style.width = pct + "%";
        if (progPct) progPct.textContent = pct + "%";
        if (progLbl) progLbl.textContent = `[Item ${i + 1}/${waitingJobs.length}] ${job.name}: ${statusText}`;
      });
      job.status = "done";
      job.progress = 100;
    } catch (err) {
      job.status = "error";
      job.error = err.message || String(err);
      toast(`Erro ao renderizar item da fila: ${job.name}`);
    }
  }

  isBatchRendering = false;
  playFoleySound("acorde", 1.8);
  toast("Fila de Renderização concluída! Todos os arquivos foram processados.");
  if (document.getElementById("queueWin")) openRenderQueueDialog();
}

async function executeRenderJob(job, updateProgressCb) {
  const { targetPath, fmt, outW, outH, fps, bitrate, burnTC, stSec, endSec } = job;
  const totalDurSec = Number((endSec - stSec).toFixed(2));
  const totalFrames = Math.max(1, Math.round(totalDurSec * (fps || 30)));

  const expCanvas = document.createElement("canvas");
  expCanvas.width = outW || 640;
  expCanvas.height = outH || 480;
  const expCtx = expCanvas.getContext("2d");

  S._exportBurnTC = burnTC;
  S._exportFrameHook = (srcCanvas) => {
    expCtx.fillStyle = "#000000";
    expCtx.fillRect(0, 0, expCanvas.width, expCanvas.height);
    expCtx.drawImage(srcCanvas, 0, 0, expCanvas.width, expCanvas.height);
    if (prefs.windowDub && prefs.windowDub.enabled && prefs.windowDub.burnExport) {
      drawWindowDubOverlay(expCtx, expCanvas.width, expCanvas.height, true);
    }
  };

  updateProgressCb(0, `Preparando faixas de áudio e vídeo (${outW}×${outH} @ ${fps}fps)...`);

  try {
    const audioClipsPayload = [];
    const anySoloAudio = S.audioTracks.some(k => S.tracksSolo[k]);
    for (const tk of getAllTrackIds()) {
      const isAud = isAudioTrack(tk);
      if (S.tracksMuted[tk]) continue;
      if (isAud && anySoloAudio && !S.tracksSolo[tk]) continue;

      for (const c of (S.clips[tk] || [])) {
        if (c.disabled) continue;
        const ovStart = Math.max(stSec, c.start);
        const ovEnd = Math.min(endSec, c.start + c.dur);
        if (ovEnd <= ovStart + 0.02) continue;

        const offsetSec = Number((ovStart - stSec).toFixed(3));
        const skipSec = ovStart - c.start;
        const inPointSec = Number(((c.inPoint || 0) + skipSec * (c.speed || 1)).toFixed(3));
        const durSec = Number((ovEnd - ovStart).toFixed(3));

        if (c.synthType === "leader") {
          for (let s = Math.ceil(ovStart); s < ovEnd; s++) {
            audioClipsPayload.push({
              sfxPreset: "bip",
              offsetSec: Math.max(0, s - stSec),
              durSec: 0.1,
              volume: c.volume == null ? 100 : c.volume
            });
          }
          continue;
        }

        if (c.sfxPreset) {
          audioClipsPayload.push({
            sfxPreset: c.sfxPreset,
            offsetSec,
            durSec,
            volume: c.volume == null ? 100 : c.volume
          });
          continue;
        }

        if (c.mediaUrl && c.mediaKind !== "image") {
          let audioBytes = null;
          if (c.mediaUrl.startsWith("blob:")) {
            try {
              const resp = await fetch(c.mediaUrl);
              audioBytes = new Uint8Array(await resp.arrayBuffer());
            } catch (_e) {}
          }
          audioClipsPayload.push({
            filePath: c.mediaPath || "",
            mediaUrl: c.mediaUrl || "",
            audioBytes,
            offsetSec,
            inPointSec,
            durSec,
            volume: c.volume == null ? 100 : c.volume,
            speed: c.speed || 1
          });
        }
      }
    }

    if (window.editorNative && typeof window.editorNative.exportBegin === "function") {
      await window.editorNative.exportBegin({
        targetPath,
        fmt,
        width: outW || 640,
        height: outH || 480,
        fps: fps || 30,
        bitrate: bitrate || 6000000,
        totalDurSec,
        audioClips: audioClipsPayload
      });

      let batch = [];
      for (let f = 0; f < totalFrames; f++) {
        const t = stSec + (f / (fps || 30));
        S.playhead = t;

        const active = getActiveClipsAt(t);
        for (const vc of active.videoList) {
          if (vc && vc.mediaUrl) {
            const vEl = S.videoEls.get(vc.mediaUrl);
            if (vEl && vEl.tagName === "VIDEO" && vEl.readyState >= 1) {
              const localSec = Math.max(0, (t - vc.start) * (vc.speed || 1) + (vc.inPoint || 0));
              const targetT = vEl.duration ? Math.min(Math.max(0, vEl.duration - 0.02), localSec) : localSec;
              if (Math.abs(vEl.currentTime - targetT) > 0.018) {
                await new Promise(resolve => {
                  let done = false;
                  const finish = () => {
                    if (done) return;
                    done = true;
                    vEl.removeEventListener("seeked", finish);
                    resolve();
                  };
                  vEl.addEventListener("seeked", finish, { once: true });
                  setTimeout(finish, 110);
                  try { vEl.currentTime = targetT; } catch (_e) { finish(); }
                });
              }
            }
          }
        }

        renderMonitorFrame();
        const dataUrl = expCanvas.toDataURL("image/jpeg", 0.90);
        const commaIdx = dataUrl.indexOf(",");
        if (commaIdx > 0) batch.push(dataUrl.slice(commaIdx + 1));

        if (batch.length >= 15 || f === totalFrames - 1) {
          await window.editorNative.exportPushFrames(batch);
          batch = [];
          const pct = Math.min(86, Math.round(((f + 1) / totalFrames) * 86));
          updateProgressCb(pct, `Renderizando quadro ${f + 1} de ${totalFrames} (${fmtSMPTE(t)})...`);
          await new Promise(r => setTimeout(r, 0));
        }
      }

      updateProgressCb(92, `Codificando arquivo .${fmt.toUpperCase()} e mixando áudio...`);
      await new Promise(r => setTimeout(r, 20));

      const res = await window.editorNative.exportFinish();
      updateProgressCb(100, `Concluído! Salvo em: ${res.path}`);
      return res;
    }
  } finally {
    S._exportFrameHook = null;
    S._exportBurnTC = false;
    setPlayhead(stSec, false);
  }
}

/* ---------- Interoperabilidade Profissional: CMX3600 EDL (Importação & Exportação) ---------- */
function parseSmpteToSec(smpte) {
  const parts = String(smpte || "").split(/[:;]/);
  if (parts.length < 4) return 0;
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  const s = parseInt(parts[2], 10) || 0;
  const f = parseInt(parts[3], 10) || 0;
  return h * 3600 + m * 60 + s + (f / FPS);
}

function exportCMX3600EDL() {
  const vClips = [...(S.clips.v1 || [])].sort((a, b) => a.start - b.start);
  if (!vClips.length) {
    toast("Não há clipes na faixa V1 para gerar o EDL CMX3600.");
    return;
  }

  const projNameClean = String(S.projectName || "PROJETO").replace(/\.ppj$/i, "").replace(/[^a-zA-Z0-9_-]/g, "_");
  let edl = `TITLE: ${projNameClean}\n`;
  edl += `FCM: NON-DROP FRAME\n\n`;

  vClips.forEach((c, i) => {
    const eventNum = String(i + 1).padStart(3, "0");
    const reel = "AX      ";
    const track = "V     ";
    const trans = "C        "; // Corte seco (Cut)
    const srcIn = fmtSMPTE(c.inPoint || 0);
    const srcOut = fmtSMPTE((c.inPoint || 0) + c.dur);
    const dstIn = fmtSMPTE(c.start);
    const dstOut = fmtSMPTE(c.start + c.dur);

    edl += `${eventNum}  ${reel} ${track} ${trans} ${srcIn} ${srcOut} ${dstIn} ${dstOut}\n`;
    edl += `* FROM CLIP NAME: ${c.title || "CLIP"}\n\n`;
  });

  const fileName = `${projNameClean}.edl`;
  if (window.editorNative && typeof window.editorNative.saveAs === "function") {
    window.editorNative.saveAs(fileName, edl, [
      { name: "Lista de Decisão CMX 3600 (*.edl)", extensions: ["edl"] },
      { name: "Texto Puro (*.txt)", extensions: ["txt"] }
    ]).then(saved => {
      if (saved) toast("Arquivo EDL CMX3600 gravado com sucesso!");
    });
  } else {
    const blob = new Blob([edl], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    toast("Arquivo EDL CMX3600 baixado com sucesso!");
  }
}

async function importCMX3600EDL() {
  let content = null;
  if (window.editorNative && typeof window.editorNative.pickEdlFile === "function") {
    const res = await window.editorNative.pickEdlFile();
    if (!res) return;
    content = res.content;
  } else {
    content = prompt("Cole o conteúdo do arquivo EDL CMX 3600 aqui:");
    if (!content) return;
  }

  saveUndoSnapshot();
  const lines = content.split(/\r?\n/);
  const edlRegex = /^\s*(\d{3,4})\s+(\S+)\s+(V|A|AA|NONE)\s+(\S+)\s+(\d{2}:\d{2}:\d{2}[:;]\d{2})\s+(\d{2}:\d{2}:\d{2}[:;]\d{2})\s+(\d{2}:\d{2}:\d{2}[:;]\d{2})\s+(\d{2}:\d{2}:\d{2}[:;]\d{2})/;

  let importedCount = 0;
  let currentClipName = "";

  lines.forEach(line => {
    const nameMatch = line.match(/^\*\s*FROM CLIP NAME:\s*(.*)/i);
    if (nameMatch) {
      currentClipName = nameMatch[1].trim();
      return;
    }

    const m = line.match(edlRegex);
    if (m) {
      const isVideo = m[3].includes("V");
      const tk = isVideo ? "v1" : "a1";
      const srcIn = parseSmpteToSec(m[5]);
      const srcOut = parseSmpteToSec(m[6]);
      const dstIn = parseSmpteToSec(m[7]);
      const dstOut = parseSmpteToSec(m[8]);
      const dur = Math.max(0.2, dstOut - dstIn);

      const title = currentClipName || `Corte EDL ${m[1]}`;
      currentClipName = "";

      const newClip = {
        id: uid(tk + "_"),
        track: tk,
        title,
        start: dstIn,
        inPoint: srcIn,
        dur: dur,
        speed: 1,
        opacity: 100,
        volume: 100,
        synthType: "scene"
      };

      ensureTrackExists(tk);
      S.clips[tk].push(newClip);
      importedCount++;
    }
  });

  if (importedCount > 0) {
    resolveTrackOverlaps("v1");
    resolveTrackOverlaps("a1");
    recalcSequenceDuration();
    renderAll();
    toast(`${importedCount} eventos importados da lista EDL CMX3600!`);
  } else {
    toast("Nenhum corte CMX3600 válido encontrado no arquivo.");
  }
}

/* ---------- Importação e Exportação de Legendas Padrão (.SRT) ---------- */
function parseSrtTime(tStr) {
  const p = String(tStr || "").trim().replace(",", ".").split(":");
  if (p.length < 3) return 0;
  const h = parseFloat(p[0]) || 0;
  const m = parseFloat(p[1]) || 0;
  const s = parseFloat(p[2]) || 0;
  return h * 3600 + m * 60 + s;
}

function formatSrtTime(sec) {
  const s = Math.max(0, Number(sec) || 0);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);
  const ms = Math.floor((s % 1) * 1000);
  return `${pad2(hh)}:${pad2(mm)}:${pad2(ss)},${String(ms).padStart(3, "0")}`;
}

async function importSrtSubtitles() {
  let srtContent = null;
  if (window.editorNative && typeof window.editorNative.pickSrtFile === "function") {
    const srtPath = await window.editorNative.pickSrtFile();
    if (!srtPath) return;
    srtContent = await window.editorNative.readTextFile(srtPath);
  }

  if (!srtContent) {
    toast("Nenhum arquivo SRT selecionado.");
    return;
  }

  const blocks = srtContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(/\n\s*\n/);
  const parsed = [];

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 2) continue;
    let timeLineIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("-->")) {
        timeLineIdx = i;
        break;
      }
    }
    if (timeLineIdx === -1) continue;
    const [t0Str, t1Str] = lines[timeLineIdx].split("-->");
    const t0 = parseSrtTime(t0Str);
    const t1 = parseSrtTime(t1Str);
    const dur = Math.max(0.4, Number((t1 - t0).toFixed(2)));
    const text = lines.slice(timeLineIdx + 1).join(" ").trim();
    if (text) {
      parsed.push({ start: Number(t0.toFixed(2)), dur, text });
    }
  }

  if (!parsed.length) {
    toast("Nenhuma legenda válida encontrada no arquivo SRT.");
    return;
  }

  saveUndoSnapshot();
  const targetTk = S.videoTracks.includes("v2") ? "v2" : (S.targetVideoTrack || "v1");
  ensureTrackExists(targetTk);

  parsed.forEach(sub => {
    const c = {
      id: uid("srt_"),
      track: targetTk,
      title: sub.text.slice(0, 20),
      text: sub.text,
      start: sub.start,
      dur: sub.dur,
      inPoint: 0,
      scaleX: 100,
      scaleY: 100,
      posX: 0,
      posY: 130,
      opacity: 100,
      chyronType: "static",
      fontSize: 20,
      fontColor: "#FFFF00",
      boxColor: "rgba(0, 0, 0, 0.82)"
    };
    S.clips[targetTk].push(c);
  });

  resolveTrackOverlaps(targetTk);
  recalcSequenceDuration();
  renderAll();
  toast(`${parsed.length} legendas importadas na faixa ${targetTk.toUpperCase()}!`);
}

async function exportSrtSubtitles() {
  const subClips = [];
  getAllTrackIds().forEach(tk => {
    (S.clips[tk] || []).forEach(c => {
      if (!c.disabled && (c.text || c.speaker)) {
        subClips.push(c);
      }
    });
  });

  if (!subClips.length) {
    toast("Não há clipes com texto ou legendas na Linha do Tempo para exportar.");
    return;
  }

  subClips.sort((a, b) => a.start - b.start);
  let srtText = "";
  subClips.forEach((c, idx) => {
    const num = idx + 1;
    const tStart = formatSrtTime(c.start);
    const tEnd = formatSrtTime(c.start + c.dur);
    const lineText = c.speaker ? `${c.speaker}: ${c.text}` : c.text;
    srtText += `${num}\n${tStart} --> ${tEnd}\n${lineText}\n\n`;
  });

  if (window.editorNative && typeof window.editorNative.pickProjectSavePath === "function") {
    const savePath = await window.editorNative.pickProjectSavePath("LEGENDAS_SCRIPTEDITOR.SRT");
    if (!savePath) return;
    const ok = await window.editorNative.writeToPath(savePath, srtText);
    if (ok) toast(`Arquivo SRT exportado com sucesso em ${savePath.split(/[/\\]/).pop()}!`);
    else toast("Erro ao gravar arquivo SRT.");
  } else {
    const blob = new Blob([srtText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "LEGENDAS_SCRIPTEDITOR.SRT";
    a.click();
    toast("Download do arquivo SRT iniciado!");
  }
}

function pickSupportedMediaMime(fmt) {
  const candidatesByFmt = {
    mp4: [
      "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
      "video/mp4;codecs=avc1",
      "video/mp4",
      "video/webm;codecs=h264,opus",
      "video/webm;codecs=h264",
      "video/webm;codecs=vp9,opus",
      "video/webm"
    ],
    avi: [
      "video/x-msvideo",
      "video/mp4;codecs=avc1",
      "video/webm;codecs=h264",
      "video/webm"
    ],
    mov: [
      "video/quicktime",
      "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
      "video/mp4",
      "video/webm;codecs=h264",
      "video/webm"
    ],
    mkv: [
      "video/x-matroska;codecs=avc1,opus",
      "video/x-matroska",
      "video/webm;codecs=vp9,opus",
      "video/webm"
    ],
    webm: [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm"
    ]
  };
  const list = candidatesByFmt[fmt] || candidatesByFmt.mp4;
  if (typeof MediaRecorder !== "undefined" && typeof MediaRecorder.isTypeSupported === "function") {
    for (const mime of list) {
      if (MediaRecorder.isTypeSupported(mime)) return mime;
    }
  }
  return "video/webm";
}

async function openExportDialog() {
  let maxEnd = 0;
  for (const tk of getAllTrackIds()) {
    for (const c of (S.clips[tk] || [])) if (c.start + c.dur > maxEnd) maxEnd = c.start + c.dur;
  }
  if (maxEnd <= 0) maxEnd = 10;

  let defaultDir = "C:\\Documentos\\ScriptEditor\\exportados";
  if (window.editorNative && typeof window.editorNative.getDefaultExportDir === "function") {
    try {
      defaultDir = await window.editorNative.getDefaultExportDir();
    } catch (_e) {}
  }

  const FORMAT_META = {
    mp4: { ext: "mp4", label: "Vídeo MPEG-4 / H.264 (.MP4) — Compatível Universal", filterName: "Vídeo MPEG-4 (.MP4)" },
    avi: { ext: "avi", label: "Video for Windows 95 (.AVI) — Clássico Cinepak / Indeo", filterName: "Vídeo para Windows (.AVI)" },
    mov: { ext: "mov", label: "Apple QuickTime Movie 95 (.MOV) — Ilha Broadcast", filterName: "QuickTime Movie (.MOV)" },
    webm: { ext: "webm", label: "WebM Master Estúdio VP9 (.WEBM) — Alta Fidelidade", filterName: "Vídeo WebM (.WEBM)" },
    mkv: { ext: "mkv", label: "Matroska Vídeo Master (.MKV) — Arquivo Multi-Faixa", filterName: "Vídeo Matroska (.MKV)" }
  };

  const baseProj = String(S.projectName || "FILME_MASTER_95").replace(/\.[^.]+$/, "").replace(/[\\/:*?"<>|]/g, "_");
  const initialFmt = S.lastExportFmt || "mp4";
  const initialFile = `${baseProj}.${FORMAT_META[initialFmt].ext}`;
  const sep = defaultDir.includes("/") ? "/" : "\\";
  let chosenSavePath = S.lastExportPath || `${defaultDir}${sep}${initialFile}`;
  let userPickedExplicitly = false;

  dialog({
    id: "expWin",
    title: "Exportar Filme Master / Make Movie (Adobe Premiere 95)",
    width: 560,
    body: `
      <div class="fx-group" style="margin-top:4px">
        <b class="lgd">1. Formato do Vídeo, Resolução e Qualidade</b>
        <div class="col" style="gap:6px;margin-top:4px">
          <label class="fld"><span>Formato do Arquivo de Vídeo (Container / Codec):</span>
            <select id="ex-fmt">
              ${Object.entries(FORMAT_META).map(([k, v]) => `<option value="${k}"${k === initialFmt ? " selected" : ""}>${escH(v.label)}</option>`).join("")}
            </select>
          </label>
          <div class="grid2">
            <label class="fld"><span>Resolução de Saída:</span>
              <select id="ex-res">
                <option value="640x480" selected>640 × 480 (NTSC 4:3 Padrão 95)</option>
                <option value="1280x720">1280 × 720 (HD 720p)</option>
                <option value="1920x1080">1920 × 1080 (Full HD 1080p)</option>
                <option value="320x240">320 × 240 (VHS / CD-ROM Multimídia 95)</option>
              </select>
            </label>
            <label class="fld"><span>Taxa de Quadros e Qualidade:</span>
              <select id="ex-fps-q">
                <option value="30|8000000" selected>29.97 / 30 fps · Alta (8 Mbps Master)</option>
                <option value="30|4000000">30 fps · Padrão Comercial (4 Mbps)</option>
                <option value="24|6000000">24 fps Cinema · Película (6 Mbps)</option>
                <option value="60|10000000">60 fps · Ultra Fluido (10 Mbps)</option>
                <option value="15|1500000">15 fps · VHS Compacto 1995 (1.5 Mbps)</option>
              </select>
            </label>
          </div>
          <div class="grid2">
            <label class="fld"><span>Início da Exportação (s):</span>
              <input type="number" id="ex-start" value="0" min="0" step="0.5">
            </label>
            <label class="fld"><span>Fim da Exportação (s):</span>
              <input type="number" id="ex-end" value="${Number(maxEnd.toFixed(1))}" min="0.5" step="0.5">
            </label>
          </div>
          <label class="row" style="gap:5px;font-size:10.5px">
            <input type="checkbox" id="ex-burntc"> Incluir código de tempo verde (Timecode TCR) gravado na imagem
          </label>
        </div>
      </div>

      <div class="fx-group" style="margin-top:8px">
        <b class="lgd">2. Onde Salvar o Vídeo (Escolha Antes de Exportar)</b>
        <div class="col" style="gap:6px;margin-top:4px">
          <div class="row" style="gap:4px">
            <input type="text" id="ex-path" value="${escH(chosenSavePath)}" style="flex:1" title="Caminho completo onde o vídeo será salvo">
            <button type="button" class="btn" id="btnPickDest">Escolher Pasta / Local…</button>
          </div>
          <label class="row" style="gap:5px;font-size:10.5px">
            <input type="checkbox" id="ex-ask-first" checked> Abrir janela "Salvar Como" para confirmar a pasta antes de iniciar a renderização
          </label>
          <div id="ex-prog-wrap" hidden style="background:var(--field);padding:4px;box-shadow:inset 1px 1px var(--lo)">
            <div class="row" style="justify-content:space-between;font-size:10.5px;margin-bottom:2px">
              <b id="ex-prog-lbl">Renderizando filme...</b>
              <span id="ex-prog-pct">0%</span>
            </div>
            <div style="height:14px;background:#222;box-shadow:inset 1px 1px #000">
              <div id="ex-prog-bar" style="height:100%;width:0%;background:var(--accent)"></div>
            </div>
          </div>
          <div class="row" style="justify-content:space-between;gap:6px">
            <button type="button" class="btn rec def" id="btnRenderVideo" style="flex:1">● Exportar Vídeo Agora (.MP4)</button>
            <button type="button" class="btn" id="btnAddExportToQueue" title="Agendar esta exportação na Fila de Renderização">+ Fila de Render</button>
            <button type="button" class="btn" id="btnOpenSavedFolder" hidden>Abrir Pasta do Vídeo</button>
          </div>
        </div>
      </div>

      <div class="fx-group" style="margin-top:8px">
        <b class="lgd">3. Relatórios de Edição e Sincronismo</b>
        <div class="row" style="justify-content:space-between;margin-top:4px">
          <button type="button" class="btn sm" id="btnExpEdl">Exportar Lista CMX 3600 (.EDL)</button>
          <button type="button" class="btn sm" id="btnExpCsv">Exportar Tabela de Cortes (.CSV)</button>
          <button type="button" class="btn sm" id="btnSyncSR">Sincronizar no ScriptRoom</button>
        </div>
      </div>
    `,
    buttons: [{ label: "Fechar", def: 1 }],
    onOpen: (w) => {
      const fmtSel = w.querySelector("#ex-fmt");
      const pathInp = w.querySelector("#ex-path");
      const btnPick = w.querySelector("#btnPickDest");
      const askChk = w.querySelector("#ex-ask-first");
      const bRender = w.querySelector("#btnRenderVideo");
      const bAddToQueue = w.querySelector("#btnAddExportToQueue");
      const bOpenFolder = w.querySelector("#btnOpenSavedFolder");
      const progWrap = w.querySelector("#ex-prog-wrap");
      const progLbl = w.querySelector("#ex-prog-lbl");
      const progPct = w.querySelector("#ex-prog-pct");
      const progBar = w.querySelector("#ex-prog-bar");

      const syncFormatExtension = () => {
        const fmt = fmtSel.value;
        const meta = FORMAT_META[fmt] || FORMAT_META.mp4;
        S.lastExportFmt = fmt;
        let curP = pathInp.value.trim();
        if (curP) {
          curP = curP.replace(/\.[^.\\/]+$/, "") + "." + meta.ext;
          pathInp.value = curP;
          chosenSavePath = curP;
        }
        bRender.textContent = `● Exportar Vídeo Agora (.${meta.ext.toUpperCase()})`;
      };

      fmtSel.onchange = syncFormatExtension;
      syncFormatExtension();

      const pickDestinationDialog = async () => {
        const fmt = fmtSel.value;
        const meta = FORMAT_META[fmt] || FORMAT_META.mp4;
        const curVal = pathInp.value.trim();
        const fileNameOnly = curVal.split(/[\\/]/).pop() || `${baseProj}.${meta.ext}`;
        if (window.editorNative && typeof window.editorNative.pickSavePath === "function") {
          const res = await window.editorNative.pickSavePath(
            fileNameOnly,
            [
              { name: meta.filterName, extensions: [meta.ext] },
              { name: "Todos os Formatos de Vídeo (.MP4, .AVI, .MOV, .WEBM, .MKV)", extensions: ["mp4", "avi", "mov", "webm", "mkv"] }
            ],
            curVal
          );
          if (res && res.status === "picked" && res.path) {
            let finalPath = res.path;
            if (!/\.[a-z0-9]{2,4}$/i.test(finalPath)) finalPath += "." + meta.ext;
            pathInp.value = finalPath;
            chosenSavePath = finalPath;
            S.lastExportPath = finalPath;
            userPickedExplicitly = true;
            askChk.checked = false;
            const extMatch = finalPath.match(/\.([a-z0-9]+)$/i);
            if (extMatch) {
              const extLower = extMatch[1].toLowerCase();
              if (FORMAT_META[extLower] && fmtSel.value !== extLower) {
                fmtSel.value = extLower;
                bRender.textContent = `● Exportar Vídeo Agora (.${extLower.toUpperCase()})`;
              }
            }
            return finalPath;
          }
          return null;
        }
        return curVal;
      };

      btnPick.onclick = async () => {
        const p = await pickDestinationDialog();
        if (p) toast(`Local de salvamento definido: ${p}`);
      };

      bOpenFolder.onclick = () => {
        if (window.editorNative && typeof window.editorNative.showInFolder === "function") {
          window.editorNative.showInFolder(pathInp.value.trim());
        }
      };

      bAddToQueue.onclick = () => {
        const fmt = fmtSel.value;
        const meta = FORMAT_META[fmt] || FORMAT_META.mp4;
        const stSec = Math.max(0, +w.querySelector("#ex-start").value || 0);
        const endSec = Math.max(stSec + 0.5, +w.querySelector("#ex-end").value || 10);
        const [outW, outH] = (w.querySelector("#ex-res").value || "640x480").split("x").map(Number);
        const [fps, bitrate] = (w.querySelector("#ex-fps-q").value || "30|8000000").split("|").map(Number);
        const burnTC = !!w.querySelector("#ex-burntc").checked;
        let targetPath = pathInp.value.trim();
        if (!/\.[a-z0-9]{2,4}$/i.test(targetPath)) targetPath += "." + meta.ext;

        const job = {
          id: uid("job_"),
          name: `${S.projectName} (${outW}×${outH} .${fmt.toUpperCase()})`,
          targetPath,
          fmt,
          outW,
          outH,
          fps,
          bitrate,
          burnTC,
          stSec,
          endSec,
          status: "waiting",
          progress: 0,
          error: null
        };
        S.renderQueue.push(job);
        toast(`"${job.name}" adicionado à Fila de Renderização! (Total: ${S.renderQueue.length})`);
      };

      bRender.onclick = async () => {
        const fmt = fmtSel.value;
        const meta = FORMAT_META[fmt] || FORMAT_META.mp4;
        const stSec = Math.max(0, +w.querySelector("#ex-start").value || 0);
        const endSec = Math.max(stSec + 0.5, +w.querySelector("#ex-end").value || 10);

        // 1. Garante que o usuário escolha onde salvar ANTES de iniciar a renderização!
        let targetPath = pathInp.value.trim();
        if (askChk.checked || !targetPath) {
          const picked = await pickDestinationDialog();
          if (!picked) {
            toast("Exportação cancelada: nenhum local de salvamento escolhido.");
            return;
          }
          targetPath = picked;
        }
        if (!/\.[a-z0-9]{2,4}$/i.test(targetPath)) {
          targetPath += "." + meta.ext;
          pathInp.value = targetPath;
        }
        S.lastExportPath = targetPath;

        if (S.playing) stopPlayback();

        const [outW, outH] = (w.querySelector("#ex-res").value || "640x480").split("x").map(Number);
        const [fps, bitrate] = (w.querySelector("#ex-fps-q").value || "30|8000000").split("|").map(Number);
        const burnTC = !!w.querySelector("#ex-burntc").checked;
        const totalDurSec = Number((endSec - stSec).toFixed(2));

        bRender.disabled = true;
        bAddToQueue.disabled = true;
        btnPick.disabled = true;
        fmtSel.disabled = true;
        bOpenFolder.hidden = true;
        progWrap.hidden = false;
        progBar.style.width = "0%";
        progPct.textContent = "0%";
        progLbl.textContent = `Preparando faixas de áudio e vídeo (${outW}×${outH} @ ${fps}fps)...`;

        try {
          const job = {
            targetPath,
            fmt,
            outW,
            outH,
            fps,
            bitrate,
            burnTC,
            stSec,
            endSec
          };
          const res = await executeRenderJob(job, (pct, statusText) => {
            progBar.style.width = pct + "%";
            progPct.textContent = pct + "%";
            progLbl.textContent = statusText;
          });
          if (res && res.status === "saved") {
            progLbl.textContent = `Concluído! Salvo em: ${res.path}`;
            bOpenFolder.hidden = false;
            toast(`Vídeo (${totalDurSec}s) exportado com sucesso em: ${res.path}`);
          }
        } catch (err) {
          progLbl.textContent = "Erro na exportação: " + (err.message || err);
          toast("Erro ao exportar vídeo: " + (err.message || err));
          if (window.editorNative && typeof window.editorNative.exportCancel === "function") {
            window.editorNative.exportCancel().catch(() => {});
          }
        } finally {
          setPlayhead(stSec, false);
          bRender.disabled = false;
          bAddToQueue.disabled = false;
          btnPick.disabled = false;
          fmtSel.disabled = false;
          syncFormatExtension();
        }
      };

      w.querySelector("#btnExpEdl").onclick = async () => {
        const lines = [`TITLE: ${S.projectName}`, `FCM: DROP FRAME`, ``];
        let evIdx = 1;
        getVideoTracksBottomUp().forEach(tk => {
          (S.clips[tk] || []).forEach(c => {
            const ev = String(evIdx++).padStart(3, "0");
            const tcIn = fmtSMPTE(c.start), tcOut = fmtSMPTE(c.start + c.dur);
            lines.push(`${ev}  ROLO01   ${tk.toUpperCase().padEnd(5, " ")} C        ${tcIn} ${tcOut} ${tcIn} ${tcOut}`);
            lines.push(`* FROM CLIP NAME: ${c.title} | TRANSICAO: ${c.trans || "CORTE SECO"}`);
          });
        });
        await saveOutputFile("PROJETO_95.edl", lines.join("\r\n"), [{ name: "CMX 3600 EDL", extensions: ["edl"] }]);
      };

      w.querySelector("#btnExpCsv").onclick = async () => {
        const head = "Faixa;Ordem;Clipe;Entrada;Saida;Duracao_Seg;Velocidade;Filtro;Transicao\r\n";
        const rows = [];
        getAllTrackIds().forEach(tk => {
          (S.clips[tk] || []).forEach((c, idx) => {
            rows.push(`${tk.toUpperCase()};${idx + 1};"${c.title.replace(/"/g, '""')}";${fmtSMPTE(c.start)};${fmtSMPTE(c.start + c.dur)};${c.dur};${c.speed || 1}x;${c.filter || "none"};"${c.trans || "Corte Seco"}"`);
          });
        });
        await saveOutputFile("DECUPAGEM_CORTES_95.csv", "\uFEFF" + head + rows.join("\r\n"), [{ name: "Planilha CSV", extensions: ["csv"] }]);
      };

      w.querySelector("#btnSyncSR").onclick = () => saveCurrentToScriptRoom();
    },
    onClose: () => {
      S._exportFrameHook = null;
      S._exportBurnTC = false;
    }
  });
}

async function saveOutputFile(filename, contentOrBytes, filters) {
  const bytes = typeof contentOrBytes === "string" ? new TextEncoder().encode(contentOrBytes) : contentOrBytes;
  if (window.editorNative && typeof window.editorNative.saveAs === "function") {
    const res = await window.editorNative.saveAs(filename, bytes, filters);
    if (res && res.status === "saved") toast(`Salvo em: ${res.path}`);
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([bytes]));
  a.download = filename;
  a.click();
  toast(`Arquivo "${filename}" exportado!`);
}

function aboutDialog() {
  const epsList = Object.values(S.eps);
  const totalClips = getAllTrackIds().reduce((a, tk) => a + (S.clips[tk] || []).length, 0);
  dialog({
    id: "aboutWin",
    title: "Sobre o ScriptEditor",
    width: 480,
    body: `
      <div class="splash">
        <svg viewBox="0 0 16 16" width="48" height="48" aria-hidden="true">${ICON.clapper}</svg>
        <span class="big">SCRIPTEDITOR</span>
        <span class="sub">Versão ${escH(APP_VERSAO)} · edição 95</span>
      </div>
      <div>
        Licenciado para:<br>
        <b>Ilha de Edição Comercial, Doméstica e Dramaturgia — C2</b><br>
        Projeto ativo: ${escH(S.projectName)}
      </div>
      <hr style="border:0;border-top:1px solid var(--lo);border-bottom:1px solid var(--hi);width:100%">
      <div class="muted">
        ${S.mediaBin.length} mídias no Bin · ${totalClips} clipes em ${S.videoTracks.length}V + ${S.audioTracks.length}A faixas · ${epsList.length} roteiros no ScriptRoom
      </div>
      <b style="margin-top:4px">Recursos da Edição 95 (Moldes Adobe Premiere 4.2)</b>
      <div class="listview vers" style="max-height:175px">
        <div class="ver-block">
          <b>1.1.5 · Diálogo de Fechamento Windows 95 (Salvar Alterações) &amp; Confirmação</b><span class="chip95">você está nesta</span>
          <ul>
            <li>Diálogo Oficial de Confirmação Windows 95 ao Clicar no "X": Ao fechar a janela, pressionar Alt+F4 ou acionar Arquivo &gt; Sair, o sistema exibe a clássica caixa de diálogo perguntando se deseja salvar as alterações do projeto antes de sair.</li>
            <li>Botões [ Sim ], [ Não ] e [ Cancelar ]: "Sim" salva o projeto (.PPJ) e fecha; "Não" descarta alterações e fecha; "Cancelar" ou "Esc" mantém o editor aberto. Suporte a atalhos rápidos de teclado (S, N, Esc e Enter).</li>
            <li>Proteção ao Fechar Projeto: Ao fechar o projeto para a área de espera MDI (Ctrl+W), o montador também é consultado caso haja mídias ou cortes não salvos.</li>
            <li>Interceptação Segura no Processo Principal: Integração com o evento native close do Electron impedindo perda inadvertida de trabalho por fechamento via barra de tarefas.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.1.4 · Tela de Início MDI Limpa, Roll &amp; Crawl Designer, RTA 31-Bandas, SMPTE &amp; VHS Glitch</b>
          <ul>
            <li>Área de Trabalho MDI Limpa na Inicialização: Tela de boas-vindas sobreposta a fundo cinza fosco MDI com marca d'água em baixo relevo biselado sem expor a timeline nem monitores até abrir ou criar um projeto</li>
            <li>Roll &amp; Crawl Designer 95: Gerador de Créditos Rolantes verticais em duas colunas sincronizadas e Letreiro Contínuo de Notícias (Crawl) com badge de identificação lateral</li>
            <li>Analisador de Espectro RTA 31-Bandas Rack 19" (1995): Chassi profissional montado em rack com 31 barras LED tricolores fluorescentes e medidor goniômetro de fase estéreo</li>
            <li>Calculadora Broadcast SMPTE 12M &amp; Bitolas de Película: Display digital VFD verde-esmeralda, conversões DF/NDF/PAL/Cinema e metragem em pés de película 35mm e 16mm</li>
            <li>Simulador de Desajuste de Tracking VHS &amp; Ruído RF: Barra horizontal de desvio de tracking analógico com chuvisco móvel, distorção H-Sync (Flag Waving) e interferência de RF</li>
            <li>Novas Transições 3D Vintage: Cubo 3D Giratório (Cube Spin 3D) e Mosaico Explosivo em Blocos (Block Dissolve 95)</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.1.3 · Correção de Estabilidade de Efeitos, Áudio Contínuo &amp; Zero Flicker</b>
          <ul>
            <li>Eliminação de loops de busca forçada no áudio durante reprodução ativa com efeitos</li>
            <li>Proteção matemática contra matrizes de escala singulares nos giros 3D de 90° e 270°</li>
            <li>Aceleração por hardware no efeito anáglifo 3D mantendo 60 FPS estáveis</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.1.1 · Fit to Fill 4-Pontos, VU Galvanométrico, Chroma Key &amp; Ficha Técnica</b>
          <ul>
            <li>Edição por 4 Pontos com Ajuste de Velocidade Automático (Fit to Fill 1995) e diálogo de resolução de conflito</li>
            <li>Medidores VU Analógicos com Agulhas Galvanométricas: Fundo creme marfim, escala serigráfica -20 a +3 dB e física balística</li>
            <li>Processador de Chroma Key &amp; Blue/Green Screen 1995: Recorte por cor, tolerância, threshold, despill e canal Alpha P&amp;B</li>
            <li>Suite de Efeitos MTV 1995: Mosaico de Censura por blocos, Posterização 8-bit, Solarização Sabattier e Matiz (Hue)</li>
            <li>Gerador de Sinais Expandido: Barras EBU 75%, Multi-Burst 0.5-4.2 MHz, Tom de Lá 440 Hz e Sweep Senoidal 20Hz-20kHz</li>
            <li>Ficha Técnica de Montagem &amp; Cue Sheet Oficial em formatos HTML 1995 e TXT com suporte à impressão A4</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.1.0 · Tela Inicial ScriptRoom 95, VHS Suite, A/B Roll &amp; ZipDrive</b>
          <ul>
            <li>Nova Tela de Entrada estilo ScriptRoom 95 com cartela vinho, dicas rotativas, estatísticas e projetos recentes</li>
            <li>Suite Analógica de Fita VHS e Betacam SP: Head switching, tracking jitter, chroma bleed e ruído CRT</li>
            <li>Edição em Trilha Dupla A/B Roll clássica com transições Page Peel 3D, Clock Wipe 360°, Iris e Venezianas</li>
            <li>Timecode SMPTE Drop-Frame (DF) com precisão broadcast de 29.97 FPS</li>
            <li>Pacote de Projeto ZipDrive 1995 autônomo com projeto .PPJ, manifesto, EDL e mídias empacotadas</li>
            <li>Correção de layout da Mesa de Som Analógica 95 com faders verticais e serigrafia precisa</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.7 · Seleção Múltipla de Clipes, Agrupamento e Operações em Bloco</b>
          <ul>
            <li>Seleção Múltipla com Laço (Marquee 95): Caixa elástica tracejada com o mouse no vazio para selecionar múltiplos clipes</li>
            <li>Seleção Aditiva (Shift + Clique / Ctrl + Clique) e seleção de faixas inteiras (Duplo-clique no cabeçalho ou Ctrl+A)</li>
            <li>Movimentação Coordenada em Bloco e Exclusão / Ripple Delete em massa de clipes selecionados</li>
            <li>Agrupar e Desagrupar Clipes (Ctrl+G / Ctrl+Shift+G) com selo clássico [GRP]</li>
            <li>Vínculo de Áudio e Vídeo (Ctrl+L) com indicador técnico de perda de sincronia (Slip Indicator)</li>
            <li>Colar Atributos Seletivo (Ctrl+Alt+V) para copiar escalas, posições, filtros, volumes e velocidades</li>
            <li>Gerador de Matte de Cor Sólida (Color Matte 1995) para fundos, cartelas e chroma keys</li>
            <li>Transição Rápida de Dissolvência (Ctrl+D) de 1.0s sobre o corte ou seleção</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.6 · Multi-Sequências, Ripple Delete no Vazio e Salvamento Profissional</b>
          <ul>
            <li>Múltiplas Timelines / Sequências no mesmo projeto (.PPJ) com abas 3D no topo da régua (Ctrl+N)</li>
            <li>Seleção de Espaço Vazio &amp; Eliminar Ondulação (Ripple Delete) com a tecla Delete ou botão direito</li>
            <li>Fluxo Profissional de Salvamento: Salvar direto com Ctrl+S, Salvar Como com Ctrl+Shift+S e indicador de asterisco (*)</li>
            <li>Ímã Magnético de Snapping (Tecla S) com linhas guias verticais brancas em cortes, playhead e marcadores</li>
            <li>Edição de 3 Pontos no Monitor de Origem: Tecla . (Sobrescrever) e Tecla , (Inserir com Ondulação)</li>
            <li>Área de Trabalho &amp; Pontos IN / OUT na Linha do Tempo (Teclas I e O na régua, Alt+X para limpar)</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.5 · Rubberbanding de Áudio, Calibração Broadcast, Relink 95 &amp; Window Dub</b>
          <ul>
            <li>Importação Limpa no Cesto de Mídia (Bin) sem poluição ou auto-inserção na Linha do Tempo</li>
            <li>Rubberbanding de Áudio na Timeline: Envelopes de volume com nós interativos arrastáveis e curva cosseno</li>
            <li>Geradores de Sinais e Tons DSP: Tom SMPTE de 1 kHz (-20 dBFS / 0 VU), Ruído Rosa e Ruído Branco</li>
            <li>Padrões de Calibração Broadcast: Barras SMPTE com Pulso Pluge (-3.5 / 0 / +3.5 IRE), Crosshatch 16×12 e Grayscale 10 Passos</li>
            <li>Reconexão de Mídia Offline (Media Relink 1995): Busca em lote e reconexão de arquivos preservando cortes e efeitos</li>
            <li>Janela de Timecode na Tela (Window Dub): OSD técnico configurável (TCR, TCO, Frames, Countdown) com Burn-in no Export</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.4 · Multicâmera 4-Up, Rack Dinâmico DSP, Cor 3-Way &amp; Fila de Render</b>
          <ul>
            <li>Multicâmera 4-Up (Live Switcher 95) com comutação e corte ao vivo pelas teclas 1–4</li>
            <li>Rack Dinâmico DSP: Compressor Óptico, Noise Gate e Brickwall Peak Limiter (-0.1 dBFS) com GR Meter</li>
            <li>Corretor de Cor 3-Way Broadcast (Lift, Gamma, Gain) e controle de Saturação Global (0% a 200%)</li>
            <li>Congelar Fotograma na Agulha (Freeze Frame - Shift+F) e Reprodução Reversa (-100%)</li>
            <li>Marcadores Coloridos de Transmissão (Corte, GC, Áudio, Direção) e Folha de Decupagem (.TXT)</li>
            <li>Fila de Exportação em Lote (Batch Render Queue) com processamento sequencial em segundo plano</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.3 · Trim Suite 95, Áudio DSP, Scopes Broadcast &amp; Storyboard</b>
          <ul>
            <li>Trim Suite Completa: Ferramentas Slip (Y), Slide (U), Rolling Edit (N) e Ripple Edit (B)</li>
            <li>Miniaturas de Película (Filmstrip) nos clipes e Trava de Faixas com Cadeado (L)</li>
            <li>Monitores Técnicos Broadcast: Vectorscope UV Polar (NTSC) e Waveform Monitor IRE (0–100 IRE)</li>
            <li>Áudio DSP Analógico: Equalizador Gráfico 10 Bandas (31Hz a 16kHz) e Goniômetro Estéreo Lissajous</li>
            <li>Ducking Automático de Trilha Sonora (-12 dB na música sob locução em A1)</li>
            <li>Title Designer 95 Avançado: Terço Inferior (Lower Third), Sombras Projetadas 3D, Bordas e Gradientes</li>
            <li>Pastas Aninhadas no Bin e Modo Prancha / Storyboard com montagem automática na Timeline</li>
            <li>Interoperabilidade Profissional: Importação e Exportação de Listas de Decisão CMX 3600 (.EDL)</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.2 · Linha do Tempo Limpa, Assistente 95, Janelas MDI/Externas &amp; Efeitos/Transições</b>
          <ul>
            <li>Inicialização com Linha do Tempo 100% vazia (sem clipes de demonstração) e Assistente de Boas-Vindas 95</li>
            <li>Divisores de tela redimensionáveis (Splitters) com arraste suave e salvamento de dimensões</li>
            <li>Desacoplamento de painéis em Janelas Flutuantes MDI e Janelas Externas nativas para Monitores Secundários</li>
            <li>9 Novas Transições: Cortina Diagonal, Porta Dupla, Veneziana, Empurrar H/V, Íris Circular, Zoom Dissolve, Strobe e Xadrez</li>
            <li>7 Novos Efeitos: Vinheta 35mm, Brilho Difuso Anos 90, Desfoque Suave, Caleidoscópio 4x, Pôster 8-Cores, Duotone e Borda 35mm</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.1 · Núcleo Profissional Não-Linear &amp; Mesa de Som Analógica</b>
          <ul>
            <li>Modelo de Projeto (.PPJ), Salvamento Automático (Autosave 60s) e Recuperação de Falhas</li>
            <li>Sistema de Keyframes com interpolação Hermite suave para Opacidade, Posição, Escala, Rotação e Volume</li>
            <li>Mesa de Som Analógica 95 com Faders individuais, VU por canal, Pan, Mute/Solo e Normalização de Picos (-0.1 dB)</li>
            <li>Modos de Mesclagem, Temperatura Kelvin, Tint, Chroma Key, Chyron e Legendas SRT</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.0 · Editor Não-Linear Multifaixas (Com ou Sem Roteiro)</b>
          <ul>
            <li>Múltiplas Faixas de Vídeo (V1..Vn) e Áudio (A1..An), Monitores Duplos e Medidores VU em Decibéis</li>
            <li>Exportação multiformato (MP4, AVI, MOV, WEBM, MKV) com escolha de pasta e qualidade</li>
          </ul>
        </div>
      </div>
    `,
    buttons: [
      { label: "Procurar atualizações…", run: () => { setTimeout(() => openUpdateDialog(false), 0); } },
      { label: "Tela de abertura…", run: () => { if (window.editorNative) window.editorNative.openSplash(); } },
      { label: "OK", def: 1 }
    ]
  });
}



function openTipOfDayDialog() {
  const showTip = (w) => {
    const tipText = w.querySelector("#tip-text");
    if (tipText) tipText.textContent = DICAS_95[curDicaIdx % DICAS_95.length];
  };

  dialog({
    id: "tipWin",
    title: "Dica do Dia do ScriptEditor",
    width: 450,
    body: `
      <div class="row" style="gap:12px;align-items:flex-start">
        <svg viewBox="0 0 16 16" width="38" height="38" aria-hidden="true" style="flex:none">${ICON.bulb}</svg>
        <div class="col" style="gap:4px;flex:1">
          <b style="font-size:13px">Você sabia…</b>
          <div class="listview" style="min-height:76px;padding:8px 10px;font-size:11.5px;line-height:1.45;background:var(--field,#fff)" id="tip-text">
            ${escH(DICAS_95[curDicaIdx % DICAS_95.length])}
          </div>
        </div>
      </div>
      <div class="row" style="justify-content:space-between;align-items:center;margin-top:10px">
        <label class="row" style="font-size:11px"><input type="checkbox" id="chk-show-tips"${prefs.dicaDoDia !== false ? " checked" : ""}> Mostrar Dicas ao iniciar</label>
        <div class="row" style="gap:5px">
          <button type="button" class="btn def" id="btn-next-tip">Próxima Dica</button>
          <button type="button" class="btn" id="btn-close-tip">Fechar</button>
        </div>
      </div>
    `,
    buttons: [],
    onOpen: (w, close) => {
      w.querySelector("#btn-close-tip").onclick = () => close();
      w.querySelector("#btn-next-tip").onclick = () => {
        curDicaIdx = (curDicaIdx + 1) % DICAS_95.length;
        showTip(w);
      };
      const chk = w.querySelector("#chk-show-tips");
      if (chk) {
        chk.onchange = (e) => {
          prefs.dicaDoDia = e.target.checked;
          savePrefs();
        };
      }
    }
  });
}

function openWhatsNewDialog() {
  dialog({
    id: "whatsNewWin",
    title: "O que há de novo no ScriptEditor",
    width: 500,
    body: `
      <div class="row" style="gap:10px;align-items:center;margin-bottom:8px">
        <svg viewBox="0 0 16 16" width="32" height="32" aria-hidden="true">${ICON.bulb}</svg>
        <div>
          <b style="font-size:13px">Novidades e Recursos · ScriptEditor 95</b><br>
          <span class="muted">Versão instalada: ${escH(APP_VERSAO)} · Edição 95</span>
        </div>
      </div>
      <div class="listview vers" style="max-height:220px;overflow:auto">
        <div class="ver-block">
          <b>1.1.5 · Diálogo de Fechamento Windows 95 (Salvar Alterações) &amp; Confirmação</b><span class="chip95">versão instalada</span>
          <ul>
            <li><b>Diálogo Oficial de Confirmação Windows 95 ao Fechar pelo "X":</b> Ao clicar no botão "×" da barra de título, pressionar <code>Alt+F4</code> ou selecionar <code>Arquivo &gt; Sair do ScriptEditor</code>, o aplicativo exibe a clássica caixa de diálogo modal de confirmação com o selo de interrogação azul/amarelo perguntando: <i>"O projeto '[NOME].PPJ' foi alterado. Deseja salvar as alterações feitas no projeto antes de fechar o ScriptEditor 95?"</i>.</li>
            <li><b>Botões Canônicos [ Sim ] [ Não ] [ Cancelar ]:</b> O botão <b>Sim</b> (atalho <kbd>S</kbd> ou <kbd>Enter</kbd>) salva o projeto no disco antes de fechar; o botão <b>Não</b> (atalho <kbd>N</kbd>) descarta as alterações e encerra o aplicativo imediatamente; o botão <b>Cancelar</b> (atalho <kbd>Esc</kbd> ou botão "×" do diálogo) anula a saída e mantém o editor na bancada com todos os cortes intactos.</li>
            <li><b>Confirmação ao Fechar Projeto (Ctrl+W):</b> Ao acionar <code>Arquivo &gt; Fechar Projeto</code> para retornar à bancada de espera MDI limpa, o montador também é consultado caso existam clipes ou alterações não salvas.</li>
            <li><b>Interceptação Nativa no Processo Principal do Electron:</b> Bloqueio de fechamentos acidentais disparados pela barra de tarefas do Windows ou atalhos do sistema operacional, direcionando o evento com segurança para a caixa de diálogo de confirmação.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.1.4 · Tela de Início MDI Limpa, Roll &amp; Crawl Designer, RTA 31-Bandas, SMPTE &amp; VHS Glitch</b>
          <ul>
            <li><b>Área de Trabalho MDI Limpa na Inicialização:</b> O assistente de boas-vindas agora abre sobre um fundo fosco MDI autêntico dos anos 90 com baixo-relevo chiseled, mantendo a timeline, monitores e cesto de mídias ocultos até que um projeto seja aberto ou iniciado.</li>
            <li><b>Roll &amp; Crawl Designer 95 (Ctrl+Alt+R):</b> Criação de créditos rolantes verticais (Roll) com diagramação precisa em duas colunas sincronizadas (Função e Nome) com canaleta central ajustável, e letreiros contínuos horizontais (Crawl) de notícias com badge informativo lateral.</li>
            <li><b>Analisador de Áudio RTA 31-Bandas Rack 19" (Ctrl+Alt+A):</b> Chassi profissional estilo Klark Teknik / BSS com 31 bandas de filtros ISO (20 Hz a 20 kHz), barras fluorescentes LED tricolores (-48 dB a +6 dB) com retenção de pico (Peak Hold) e goniômetro de correlação de fase estéreo.</li>
            <li><b>Calculadora Broadcast SMPTE 12M &amp; Película (Ctrl+Alt+K):</b> Display VFD verde-esmeralda para aritmética de timecode, conversões de bitolas de película 35mm (4 perf) e 16mm (40 q/pé), taxas NTSC (DF/NDF), PAL e Cinema, além de atalhos rápidos de blocos comerciais de TV (+15s, +30s, +60s, +180s).</li>
            <li><b>Simulador de Desajuste de Tracking VHS &amp; Ruído RF:</b> Barra móvel de erro de alinhamento de cabeçote com chuvisco analógico estático, distorção de fase horizontal, curvatura H-Sync no topo (Flag Waving) e interferência de rádio-frequência VHF/UHF.</li>
            <li><b>Novas Transições 3D Vintage:</b> Cubo 3D Giratório (Cube Spin 3D) com faces texturizadas e perspectiva, e Mosaico Explosivo em Blocos (Block Dissolve 95).</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.1.3 · Correção de Estabilidade de Efeitos, Áudio Contínuo &amp; Zero Flicker</b>
          <ul>
            <li><b>Áudio Ininterrupto e Sincronismo de Fase:</b> Eliminação de loops de busca forçada (seeking) durante a reprodução ativa com efeitos. Micro-ajuste suave de taxa de reprodução (playbackRate ±4%) para alinhamento contínuo sem silenciar ou cortar o fluxo sonoro.</li>
            <li><b>Eliminação Definitiva da Tela Piscando (Zero Flicker):</b> Proteção matemática contra matrizes de escala singulares (determinante zero) nos giros 3D de 90° e 270°, impedindo que o canvas piscasse em preto durante giros tridimensionais ou presets contínuos.</li>
            <li><b>Aceleração por Hardware no Efeito Anáglifo 3D:</b> Substituição do processamento pesado síncrono de pixels por composição gráfica direta acelerada por GPU nos canais vermelho e ciano, mantendo 60 FPS estáveis mesmo com múltiplos efeitos empilhados.</li>
            <li><b>Buffer Otimizado de Monitor:</b> Configuração <code>willReadFrequently: true</code> no monitor principal de vídeo e prevenção de flashes de telas de carregamento quando os fotogramas já estiverem decodificados em memória.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.1.2 · Seletor de Cores Oficial Windows 95 &amp; Suíte de Efeitos Digitais 3D (DVE 1995)</b>
          <ul>
            <li><b>Seletor de Cores Oficial Windows 95 (ChooseColor / COMMDLG32):</b> Interface clássica com 48 cores básicas, 16 cores personalizadas salvas no computador, espectro 2D HSL (0-239 / 0-240), barra de Luminosidade com seta triangular deslizante, visor "Cor | Sólido" com reticulado 8-bit (dither VGA), campos numéricos sincronizados e pipeta conta-gotas.</li>
            <li><b>Paletas Históricas dos Anos 90:</b> Menu de troca rápida entre paleta padrão Win95, Netscape Web-Safe 216 cores (1995), SMPTE Broadcast Safe, IBM PC CGA/EGA 16 cores e Macintosh System 7 QuickTime.</li>
            <li><b>Detector SMPTE Broadcast Legal (Anti-Chroma Bleed):</b> Monitor de IRE e saturação de subportadora em tempo real com botão de correção automática (Clamp SMPTE 16-235) para eliminar zumbido de áudio e sangramento de cor em fitas VHS.</li>
            <li><b>Suíte de Efeitos Digitais 3D (DVE 1995):</b> Rotação 3D nos eixos X, Y e Z com perspectiva e sombreamento direcional, Moldura 3D Chanfrada (Beveled PiP), Efeito Anáglifo Estereoscópico 3D (óculos 3D vermelho/azul), Virada de Página 3D (Page Peel) e Cubo 3D Rotativo.</li>
            <li><b>Filtros de Vídeo CRT &amp; VHS:</b> Linhas de varredura CRT Trinitron (Scanlines 60Hz com grade de fósforo RGB) e Ruído de troca de cabeçote VHS (Head Switching Noise) com jitter analógico.</li>
            <li><b>Exportação de Fotograma Estático em BMP 1995:</b> Captura de qualquer quadro do filme em formato Bitmap 24-bit uncomprimido do Windows 95 com inserção direta no Cesto de Mídias (Bin).</li>
            <li><b>Substituição Universal:</b> Remoção definitiva de seletores modernos do navegador por botões de amostra chanfrados 95 em Color Matte, Chroma Key, Title Designer e Marcadores.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.7 · Seleção Múltipla de Clipes, Agrupamento e Operações em Bloco</b>
          <ul>
            <li><b>Seleção Múltipla com Laço (Marquee 95):</b> Clique e arraste o mouse sobre qualquer área vazia da linha do tempo para desenhar uma caixa elástica tracejada e selecionar múltiplos clipes de qualquer faixa simultaneamente.</li>
            <li><b>Seleção Aditiva (Shift + Clique &amp; Ctrl + Clique):</b> Adicione ou remova clipes individuais da seleção sem perder os demais; dê duplo-clique no cabeçalho da faixa (ex: V1, A1) para selecionar todos os clipes daquela trilha de uma vez só.</li>
            <li><b>Movimentação e Exclusão em Bloco:</b> Arraste qualquer clipe selecionado para deslocar todos os clipes coordenadamente mantendo distâncias relativas e com atração magnética inteligente; tecle Delete para apagar em massa ou Shift+Delete para fechar os espaços em cascata (Ripple Delete).</li>
            <li><b>Agrupamento de Clipes (Ctrl+G / Ctrl+Shift+G):</b> Agrupe clipes permanentemente com selo clássico <b>[GRP]</b> para que sejam sempre selecionados e manipulados juntos.</li>
            <li><b>Vínculo de Áudio e Vídeo (Ctrl+L):</b> Conecte faixas de áudio e vídeo mantendo sincronia e exibindo indicador técnico de slip em vermelho caso haja perda de sincronismo temporal.</li>
            <li><b>Colar Atributos Seletivo (Ctrl+Alt+V):</b> Copie um clipe (Ctrl+C) e transfira seletivamente escala, posição, efeitos/filtros, curvas de volume de áudio ou velocidade para múltiplos clipes selecionados.</li>
            <li><b>Gerador de Matte de Cor Sólida (Color Matte 1995):</b> Crie cartelas de cor sólida broadcast (Preto Puro, Branco Estúdio, Chroma Blue/Green, Cinza 50% ou seletor hexadecimal) para fades, títulos e fundos.</li>
            <li><b>Transição Rápida de Dissolvência (Ctrl+D):</b> Insira instantaneamente uma transição Cross Dissolve de 1.0s sobre o corte sob a agulha ou nos clipes selecionados.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.6 · Multi-Sequências, Ripple Delete no Vazio e Salvamento Profissional</b>
          <ul>
            <li><b>Múltiplas Linhas do Tempo / Sequências no Mesmo Projeto (Ctrl+N):</b> Crie, renomeie, duplique e feche diferentes sequências de montagem através de abas clássicas 3D no topo da régua, mantendo todas as sequências salvas no mesmo arquivo .PPJ.</li>
            <li><b>Seleção de Espaço Vazio &amp; Eliminar Ondulação (Ripple Delete):</b> Clique diretamente em qualquer buraco entre clipes na timeline para selecioná-lo em hachura amarela e tecle DELETE ou use o menu do botão direito para fechar o espaço instantaneamente puxando os clipes seguintes.</li>
            <li><b>Fluxo de Salvamento Profissional (.PPJ):</b> Salve diretamente no arquivo existente com Ctrl+S sem diálogos desnecessários, use Ctrl+Shift+S para Salvar Como, acompanhe alterações não salvas com asterisco (*) na barra de título e conte com download nativo no navegador.</li>
            <li><b>Ímã Magnético de Snapping (Tecla S):</b> Ativação e desativação rápida de atração magnética com tecla de atalho S e linha guia vertical branca de alta precisão ao alinhar com cortes vizinhos, agulha, marcadores e área de trabalho.</li>
            <li><b>Edição Rápida de 3 Pontos no Monitor de Origem:</b> Tecla . (Ponto) para Sobrescrever (Overwrite) e Tecla , (Vírgula) para Inserir com Ondulação (Insert) empurrando a montagem.</li>
            <li><b>Área de Trabalho &amp; Pontos IN / OUT na Timeline (Teclas I e O):</b> Delimitação de trechos de montagem na régua com colchetes clássicos { e }, tecla Alt+X para limpar e exportação opcional da área selecionada.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.5 · Rubberbanding de Áudio, Calibração Broadcast, Relink 95 &amp; Window Dub</b>
          <ul>
            <li><b>Importação Limpa no Cesto de Mídia (Bin):</b> Mídias importadas (Ctrl+I, arrasto do Windows ou barra de ferramentas) vão exclusivamente para o Cesto de Mídia e monitor de origem, permitindo ao montador decidir quando e onde inseri-las.</li>
            <li><b>Rubberbanding de Volume de Áudio na Linha do Tempo:</b> Linhas de envelope de volume com nós interativos arrastáveis (0% a 150%) com interpolação suave de curva cosseno e de-click. Duplo clique no clipe cria novos nós.</li>
            <li><b>Geradores de Sinais e Tons Broadcast (DSP):</b> Tom senoidal de referência SMPTE de 1 kHz (-20 dBFS / 0 VU), Ruído Rosa (Pink Noise 1/f para calibração acústica RTA) e Ruído Branco com prévia em osciloscópio.</li>
            <li><b>Padrões de Calibração de Vídeo Broadcast:</b> Barras de cor SMPTE completas com o clássico pulso PLUGE (-3.5 / 0 / +3.5 IRE), grade geométrica Crosshatch 16×12 para alinhamento CRT e rampa de escala de cinza em 10 passos (0 a 100 IRE).</li>
            <li><b>Reconexão de Mídia Offline (Media Relink 1995):</b> Ferramenta de auditoria e reconexão em lote de arquivos movidos ou renomeados no disco, preservando pontos de corte IN/OUT, transições e remapeamento de tempo.</li>
            <li><b>Janela de Timecode na Tela (Window Dub):</b> OSD técnico flutuante com TCR Master, TCO Origem, contador absoluto de fotogramas e regressivo, com opção de gravação definitiva (Burn-in) no filme exportado.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.4 · Multicâmera 4-Up, Rack Dinâmico DSP, Cor 3-Way &amp; Fila de Render</b>
          <ul>
            <li><b>Multicâmera 4-Up (Live Switcher 95):</b> Visualização de 4 câmeras simultâneas com comutação e corte ao vivo na agulha pelas teclas numéricas 1, 2, 3 e 4.</li>
            <li><b>Rack Dinâmico de Áudio Analógico:</b> Compressor óptico estéreo, Noise Gate redutor de ruído de fita VHS e Brickwall Peak Limiter (-0.1 dBFS) com medidor de redução de ganho em LEDs (GR Meter).</li>
            <li><b>Corretor de Cor 3-Way Broadcast:</b> 3 rodas cromáticas analógicas interativas (Lift/Sombras, Gamma/Médios, Gain/Altas) com faders de luminância e saturação global (0% a 200%).</li>
            <li><b>Congelamento de Quadro (Freeze Frame - Shift+F):</b> Captura instantânea do fotograma na agulha inserido como clipe com ripple na faixa alvo.</li>
            <li><b>Remapeamento de Tempo &amp; Reversão:</b> Reprodução invertida (Reverse -100%) e botões de velocidade pré-definida (25%, 50%, 100%, 200%, 400%).</li>
            <li><b>Marcadores Coloridos &amp; Folha de Decupagem (Cue Sheet):</b> 4 cores de transmissão (Corte, GC, Áudio, Direção), painel dedicado de marcadores e exportação de Cue Sheet em texto (.TXT).</li>
            <li><b>Fila de Renderização em Lote (Batch Render Queue):</b> Enfileiramento de projetos e sequências com processamento em segundo plano e aviso sonoro de conclusão.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.3 · Trim Suite 95, Áudio DSP, Scopes Broadcast &amp; Storyboard</b>
          <ul>
            <li><b>Trim Suite 1995:</b> Ferramentas profissionais Slip (Y), Slide (U), Rolling Edit (N) e Ripple Edit (B) para montagem fina idêntica ao Adobe Premiere 4.2 e Media 100.</li>
            <li><b>Filmstrip na Timeline:</b> Exibição de fotogramas de película de cinema nos blocos dos clipes com opção de alternar no rodapé.</li>
            <li><b>Trava de Faixas (Cadeados L):</b> Bloqueio de proteção contra edições e cortes acidentais com visual clássico de ranhuras.</li>
            <li><b>Monitores Técnicos Broadcast:</b> Vectorscope UV polar (com alvos NTSC de 75%) e Waveform Monitor IRE (0–100 IRE) integrados ao Monitor de Programa.</li>
            <li><b>Estúdio DSP Analógico:</b> Equalizador Gráfico de 10 Bandas (31Hz a 16kHz) com predefinições analógicas de estúdio e Goniômetro Estéreo Lissajous.</li>
            <li><b>Auto-Ducking de Trilha:</b> Atenuação automática suave de -12 dB nas músicas (A2/A3) sempre que houver locução ou fala na faixa A1.</li>
            <li><b>Title Designer 95 Avançado:</b> Terço Inferior de Telejornal (Lower Third), Sombras 3D, Contorno Stroke e Gradientes Anos 90.</li>
            <li><b>Pastas e Storyboard no Bin:</b> Criação de diretórios no projeto e montagem sequencial automática com 1 clique.</li>
            <li><b>Intercâmbio CMX 3600 (.EDL):</b> Importe e exporte listas de decisão padrão da indústria de cinema e broadcast.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.2 · Linha do Tempo Limpa, Assistente 95, Janelas MDI/Externas &amp; Efeitos/Transições</b>
          <ul>
            <li><b>Linha do Tempo Limpa:</b> Inicialização 100% vazia sem nenhum clipe ou áudio demo sintético.</li>
            <li><b>Assistente de Boas-Vindas 95:</b> Tela inicial clássica para Criar Novo Projeto, Abrir Projeto (.PPJ), Importar Mídias ou Carregar Roteiros, além de atalho rápido para Projetos Recentes.</li>
            <li><b>Divisores Redimensionáveis (Splitters):</b> Ajuste arrastável com o mouse entre Painel Lateral, Monitores e Linha do Tempo, com salvamento automático das dimensões escolhidas.</li>
            <li><b>Desacoplamento de Janelas (MDI e Telas Externas):</b> Transforme monitores e timeline em janelas flutuantes internas ou janelas nativas externas do Windows para trabalhar com múltiplos monitores.</li>
            <li><b>9 Novas Transições Profissionais:</b> Cortina Diagonal, Porta Dupla (Barn Doors), Veneziana (Blinds), Empurrar Horizontal, Empurrar Vertical, Íris Circular, Zoom Dissolve, Strobe e Xadrez.</li>
            <li><b>7 Novos Efeitos e Filtros:</b> Vinheta 35mm, Brilho Difuso (Glow Halation 90s), Desfoque Suave (Blur), Caleidoscópio 4x, Pôster 8-Cores, Duotone Cyan/Âmbar e Borda de Película 35mm.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.1 · A Grande Atualização de Recursos do ScriptEditor</b>
          <ul>
            <li><b>Projetos Não-Destrutivos (.PPJ):</b> Salve (Ctrl+S) e abra (Ctrl+O) projetos completos preservando timecodes e faixas.</li>
            <li><b>Salvamento Automático &amp; Recuperação:</b> Autosave a cada 60s e detecção com recuperação automática contra quedas de energia.</li>
            <li><b>Motor de Keyframes (Quadros-Chave):</b> Animação com curva S (Hermite) para Opacidade, Posição X/Y, Escala, Rotação e Volume.</li>
            <li><b>Mesa de Som Analógica 95:</b> Faders deslizantes (-inf a +6 dB), Pan L/R, Mute/Solo, medição VU por canal e Normalização de Picos para -0.1 dBFS.</li>
            <li><b>Cortes Sem Estalos (De-click):</b> Curvas de esmaecimento cosseno (Fade In e Fade Out) automáticas e ajustáveis.</li>
            <li><b>Mesclagem e Cor Profissional:</b> Modos Multiply, Screen, Overlay, Lighter, Difference, correção de Temperatura Kelvin, Tint e Chroma Key.</li>
            <li><b>Títulos Animados &amp; Legendas SRT:</b> Letreiro Rotativo (Crawl), Créditos Rolantes (Roll), Piscante, e importação/exportação de arquivos .SRT.</li>
            <li><b>Cesto de Mídia com Miniaturas Reais:</b> Busca instantânea, abas de categoria (Vídeos, Áudios, Imagens, Sintéticos) e alternância Miniaturas/Lista.</li>
            <li><b>Modos de Resolução de Prévia:</b> Opções 1/1 Total, 1/2 Rápido e 1/4 Betacam para scrubbing e reprodução ultra fluidos.</li>
          </ul>
        </div>
        <div class="ver-block">
          <b>1.0.0 · Edição Não-Linear Multifaixas e Áudio de Alta Fidelidade</b>
          <ul>
            <li>Central de Atualizações integrada com pesquisa e transferência via servidor de rede</li>
            <li>Zoom da Linha do Tempo com acompanhamento e foco automático na agulha de reprodução</li>
            <li>Medição de áudio estéreo real (L/R) em decibéis (dB), retenção de pico e osciloscópio de onda</li>
            <li>Formas de onda reais (SVG) nas faixas de áudio e vídeo da Linha do Tempo e no Monitor de Origem</li>
            <li>Suporte a múltiplas faixas de vídeo (V1..Vn) e áudio (A1..An) com inserção de lotes sem sobreposição</li>
            <li>Exportação de vídeo nos formatos MP4, AVI, MOV, WEBM e MKV com escolha prévia de pasta e nome</li>
            <li>Menu Ajuda completo com Atalhos, Dica do Dia, O que há de novo e Tela de Abertura</li>
          </ul>
        </div>
      </div>
    `,
    buttons: [
      { label: "Procurar atualizações…", run: () => { setTimeout(() => openUpdateDialog(false), 0); } },
      { label: "Fechar", def: 1 }
    ]
  });
}

/* ---------- Sistema de Atualização (Central de Distribuição C2) ---------- */
const UPDATE_REPO_URL = "https://github.com/Juvinho/ScriptEditor";
const LS_UPD_CHECK = "se95.lastUpdateCheck";
let updateBusy = false;

function fmtBytes95(n) {
  if (!n) return "0 KB";
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function openUpdateDialog(silentAuto = false, preResult = null) {
  const nat = window.editorNative;
  if (!nat || typeof nat.checkUpdate !== "function") {
    if (!silentAuto) toast("Atualização automática disponível apenas no aplicativo instalado.");
    return;
  }
  if (updateBusy && !preResult) return;

  let unsubscribe = null;
  let downloading = false;

  dialog({
    id: "updWin",
    title: "Atualização de Software",
    width: 480,
    body: `
      <div class="row" style="gap:10px;align-items:flex-start">
        <svg viewBox="0 0 16 16" width="36" height="36" aria-hidden="true" style="flex:none">${ICON.sync}</svg>
        <div class="col" style="gap:3px;flex:1">
          <b id="upd-title">Procurando atualizações…</b>
          <span class="muted" id="upd-sub">Conectando ao servidor de distribuição da C2 na Internet...</span>
        </div>
      </div>
      <hr style="border:0;border-top:1px solid var(--lo);border-bottom:1px solid var(--hi);width:100%">
      <div class="col" style="gap:3px">
        <div class="row" style="justify-content:space-between"><span>Versão instalada:</span><b id="upd-cur">${escH(APP_VERSAO)}</b></div>
        <div class="row" style="justify-content:space-between"><span>Versão no servidor:</span><b id="upd-new">—</b></div>
      </div>
      <div id="upd-notes-box" hidden>
        <b style="display:block;margin:6px 0 2px">Boletim técnico / O que há de novo:</b>
        <div class="listview" id="upd-notes" style="max-height:140px;overflow:auto;padding:4px 6px;white-space:pre-wrap;font-family:'Courier New',monospace;font-size:11px"></div>
      </div>
      <div id="upd-prog-box" hidden style="margin-top:6px">
        <div class="row" style="justify-content:space-between;font-size:10.5px;margin-bottom:2px">
          <span id="upd-prog-lbl">Transferindo pacote…</span><span id="upd-prog-pct">0%</span>
        </div>
        <div style="height:16px;background:var(--field,#fff);box-shadow:inset 1px 1px var(--lo,#808080),inset -1px -1px var(--hi,#fff);padding:2px">
          <div id="upd-prog-bar" style="height:100%;width:0%;background:repeating-linear-gradient(90deg,#000080 0 9px,transparent 9px 11px)"></div>
        </div>
      </div>
      <div class="row" style="justify-content:flex-end;gap:6px;margin-top:10px;flex-wrap:wrap">
        <button type="button" class="btn" id="upd-page">Detalhes…</button>
        <button type="button" class="btn" id="upd-retry" hidden>Verificar novamente</button>
        <button type="button" class="btn def" id="upd-go" hidden>Baixar e atualizar</button>
        <button type="button" class="btn" id="upd-close">Fechar</button>
      </div>
    `,
    buttons: [],
    onClose: () => {
      if (unsubscribe) unsubscribe();
      if (downloading) nat.cancelUpdate();
      updateBusy = false;
    },
    onOpen: (w, close) => {
      const $ = (sel) => w.querySelector(sel);
      let pageUrl = UPDATE_REPO_URL + "/releases";
      let lastResult = null;

      $("#upd-close").onclick = () => close();
      $("#upd-page").onclick = () => nat.openUpdatePage(pageUrl);

      const showResult = (res) => {
        lastResult = res;
        pageUrl = res.page || pageUrl;
        $("#upd-cur").textContent = res.current || APP_VERSAO;
        $("#upd-retry").hidden = true;
        $("#upd-go").hidden = true;

        if (!res.ok) {
          $("#upd-title").textContent = "Não foi possível verificar.";
          $("#upd-sub").textContent = res.error || "Não foi possível conectar ao servidor de distribuição. Verifique sua conexão com a Internet.";
          $("#upd-retry").hidden = false;
          return;
        }
        $("#upd-new").textContent = res.latest || "nenhuma publicada";

        if (res.available) {
          const dt = res.date ? new Date(res.date).toLocaleDateString("pt-BR") : "";
          $("#upd-title").textContent = `Nova versão ${res.latest} disponível!`;
          $("#upd-sub").textContent = res.asset
            ? `Pacote: ${res.asset.name} (${fmtBytes95(res.asset.size)})${dt ? " · emitido em " + dt : ""}`
            : "Pacote de atualização disponível no servidor de distribuição.";
          if (res.notes) {
            $("#upd-notes-box").hidden = false;
            $("#upd-notes").textContent = res.notes.slice(0, 4000);
          }
          if (res.asset) $("#upd-go").hidden = false;
        } else {
          $("#upd-title").textContent = "Você já está com a versão mais recente.";
          $("#upd-sub").textContent = res.note || `O ScriptEditor versão ${APP_VERSAO} está atualizado. Não há novos pacotes no servidor no momento.`;
        }
      };

      const runCheck = async () => {
        updateBusy = true;
        $("#upd-title").textContent = "Pesquisando atualizações…";
        $("#upd-sub").textContent = "Consultando o servidor de distribuição do ScriptEditor na Internet...";
        $("#upd-retry").hidden = true;
        try {
          const res = await nat.checkUpdate();
          try { localStorage.setItem(LS_UPD_CHECK, String(Date.now())); } catch (_e) {}
          if (w.isConnected) showResult(res);
        } catch (err) {
          if (w.isConnected) showResult({ ok: false, error: String((err && err.message) || err) });
        }
      };

      $("#upd-retry").onclick = runCheck;

      $("#upd-go").onclick = async () => {
        if (!lastResult || !lastResult.asset) return;
        downloading = true;
        $("#upd-go").disabled = true;
        $("#upd-page").disabled = true;
        $("#upd-close").textContent = "Cancelar";
        $("#upd-prog-box").hidden = false;
        $("#upd-title").textContent = `Transferindo ScriptEditor ${lastResult.latest}…`;
        $("#upd-sub").textContent = "Recebendo pacote da Central de Distribuição C2...";

        unsubscribe = nat.onUpdateProgress(({ received, total }) => {
          const pct = total ? Math.min(100, Math.round((received / total) * 100)) : 0;
          $("#upd-prog-bar").style.width = pct + "%";
          $("#upd-prog-pct").textContent = pct + "%";
          $("#upd-prog-lbl").textContent = `Recebendo ${fmtBytes95(received)}${total ? " de " + fmtBytes95(total) : ""}…`;
        });

        const dl = await nat.downloadUpdate();
        downloading = false;
        if (!w.isConnected) return;
        $("#upd-close").textContent = "Fechar";
        $("#upd-page").disabled = false;

        if (!dl.ok) {
          $("#upd-go").disabled = false;
          $("#upd-title").textContent = dl.canceled ? "Transferência cancelada." : "Falha ao transferir a atualização.";
          $("#upd-sub").textContent = dl.error || "";
          return;
        }

        $("#upd-prog-bar").style.width = "100%";
        $("#upd-prog-pct").textContent = "100%";
        $("#upd-prog-lbl").textContent = "Transferência concluída.";
        $("#upd-title").textContent = "Pronto para aplicar a atualização.";
        $("#upd-sub").textContent = "Salve seus projetos. O ScriptEditor será reiniciado para executar o instalador da versão " + lastResult.latest + ".";
        const goBtn = $("#upd-go");
        goBtn.disabled = false;
        goBtn.textContent = "Instalar agora";
        goBtn.onclick = async () => {
          goBtn.disabled = true;
          const r = await nat.installUpdate();
          if (!r.ok) {
            goBtn.disabled = false;
            $("#upd-sub").textContent = r.error || "Não foi possível abrir o instalador.";
          }
        };
      };

      if (preResult) showResult(preResult);
      else runCheck();
    }
  });
}

// Verificação silenciosa ao abrir o programa (no máximo 1x a cada 12 horas)
async function autoCheckForUpdates() {
  const nat = window.editorNative;
  if (!nat || typeof nat.checkUpdate !== "function") return;
  let last = 0;
  try { last = Number(localStorage.getItem(LS_UPD_CHECK)) || 0; } catch (_e) {}
  if (Date.now() - last < 12 * 3600 * 1000) return;
  try {
    const res = await nat.checkUpdate();
    try { localStorage.setItem(LS_UPD_CHECK, String(Date.now())); } catch (_e) {}
    if (res && res.ok && res.available) {
      toast(`Nova versão ${res.latest} do ScriptEditor disponível!`);
      openUpdateDialog(true, res);
    }
  } catch (_e) {}
}

function openSchemeDialog() {
  const SCHEMES = [
    ["tijolo", "Tijolo (Padrão 95)"],
    ["classico", "Clássico (Cinza/Verde-Água Windows 95)"],
    ["berinjela", "Berinjela Estúdio"],
    ["deserto", "Deserto"],
    ["contraste", "Alto Contraste"]
  ];
  dialog({
    id: "schWin",
    title: "Propriedades de Vídeo (Esquema de Cores 95)",
    width: 360,
    body: `<label class="fld"><span>Esquema de Cores:</span><select id="sch-s">${SCHEMES.map(([k, l]) => `<option value="${k}"${k === prefs.scheme ? " selected" : ""}>${l}</option>`).join("")}</select></label>`,
    buttons: [{ label: "OK", def: 1, run: w => { prefs.scheme = w.querySelector("#sch-s").value; document.body.dataset.scheme = prefs.scheme; savePrefs(); } }],
    onOpen: w => { w.querySelector("#sch-s").onchange = e => { document.body.dataset.scheme = e.target.value; }; }
  });
}

/* ---------- Sincronização com ScriptRoom ---------- */
async function loadFromScriptRoom(silent = false) {
  if (window.editorNative && typeof window.editorNative.readScriptRoom === "function") {
    try {
      const res = await window.editorNative.readScriptRoom();
      if (res && Array.isArray(res.roteiros)) {
        res.roteiros.forEach(r => { if (r && r.data && r.data.els) { r.data.id = r.data.id || r.id; S.eps[r.data.id] = r.data; } });
      }
    } catch (_e) {}
  }
  if (Object.keys(S.eps).length === 0) {
    for (const sf of ["seed/ep-01-noite-vermelha.json", "seed/ep-16.json"]) {
      try {
        const r = await fetch(sf);
        if (r.ok) { const d = await r.json(); if (d && d.id) S.eps[d.id] = d; }
      } catch (_e) {}
    }
  }
  const all = Object.values(S.eps).sort((a, b) => ((a.meta && a.meta.episodio) || 0) - ((b.meta && b.meta.episodio) || 0));
  if (all.length && !S.curId) {
    const ep1 = all.find(x => x.meta && Number(x.meta.episodio) === 1) || all[0];
    S.curId = ep1.id;
  }
  const sel = document.getElementById("epSel");
  if (sel) {
    sel.innerHTML = all.map(s => `<option value="${escH(s.id)}"${s.id === S.curId ? " selected" : ""}>${escH(epLabel(s))}</option>`).join("");
  }
  renderSheet();
  if (!silent) toast(`${all.length} roteiros disponíveis na ponte ScriptRoom.`);
}

async function saveCurrentToScriptRoom() {
  const sc = cur();
  if (!sc) return;
  if (window.editorNative && typeof window.editorNative.writeScriptRoomRoteiro === "function") {
    await window.editorNative.writeScriptRoomRoteiro(sc.id, sc);
    toast(`Alterações sincronizadas com Documentos\\ScriptRoom!`);
  } else {
    toast("Alterações salvas no projeto.");
  }
}

/* ---------- Menus, Barra de Status e Boot ---------- */
function setMonitorLayout(lay) {
  prefs.monLayout = lay;
  document.body.dataset.monlayout = lay;
  const ls = document.getElementById("layoutSel");
  if (ls) ls.value = lay;
  const inlineBox = document.getElementById("inlineScriptBox");
  if (inlineBox) inlineBox.hidden = lay !== "script";

  const mcBox = document.getElementById("multicamBox");
  const srcBox = document.getElementById("sourceBox");
  if (mcBox) mcBox.style.display = (lay === "multicam") ? "flex" : "none";
  if (srcBox) {
    if (lay === "multicam" || lay === "single") srcBox.style.display = "none";
    else srcBox.style.display = "";
  }

  savePrefs();
  renderMonitorFrame();
  renderSourceFrame();
  if (lay === "multicam") renderMulticamFrames();
}

function drawBroadcastTestPattern(ctx, W, H, label) {
  const bars = ["#C0C0C0", "#C0C000", "#00C0C0", "#00C000", "#C000C0", "#C00000", "#0000C0"];
  const barW = W / bars.length;
  bars.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(idx * barW, 0, barW + 1, H * 0.75);
  });
  ctx.fillStyle = "#101010";
  ctx.fillRect(0, H * 0.75, W, H * 0.25);

  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillRect(10, H / 2 - 14, W - 20, 28);
  ctx.fillStyle = "#FFE040";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${label} · SEM SINAL`, W / 2, H / 2 + 4);
}

function renderMulticamFrames() {
  const mcBox = document.getElementById("multicamBox");
  if (!mcBox || mcBox.style.display === "none") return;

  const activeCamLbl = document.getElementById("mcActiveCamLbl");
  if (activeCamLbl) activeCamLbl.textContent = `CAM ${S.multicamActiveCam} [NO AR]`;

  const cutBtn = document.getElementById("btnMcToggleCut");
  if (cutBtn) {
    cutBtn.textContent = S.multicamLiveCut ? "[ Gravar Cortes: ATIVO ]" : "[ Gravar Cortes: DESATIVADO ]";
    cutBtn.classList.toggle("rec", !!S.multicamLiveCut);
  }

  for (let cam = 1; cam <= 4; cam++) {
    const quad = document.querySelector(`[data-mccam="${cam}"]`);
    const cv = document.getElementById(`mcCanvas${cam}`);
    if (!cv) continue;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;

    const isActive = (cam === S.multicamActiveCam);
    if (quad) {
      quad.classList.toggle("active", isActive);
      const light = quad.querySelector(".mc-tally-light");
      if (light) light.textContent = isActive ? "NO AR" : "PRONTO";
    }

    const tk = "v" + cam;
    const clip = (S.clips[tk] || []).find(c => !c.disabled && S.playhead >= c.start && S.playhead < c.start + c.dur);

    ctx.fillStyle = "#07090c";
    ctx.fillRect(0, 0, W, H);

    if (clip) {
      drawSingleClipToContext(ctx, W, H, clip, S.playhead);
      ctx.fillStyle = "rgba(0,0,0,0.68)";
      ctx.fillRect(4, H - 22, W - 8, 18);
      ctx.fillStyle = isActive ? "#FF4040" : "#FFE040";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`CAM ${cam}: ${clip.title.slice(0, 18)}`, 8, H - 9);
    } else {
      drawBroadcastTestPattern(ctx, W, H, `CAM ${cam} (${tk.toUpperCase()})`);
    }
  }
}

function switchMulticamCam(camNumber) {
  if (camNumber < 1 || camNumber > 4) return;
  S.multicamActiveCam = camNumber;

  if (S.playing && S.multicamLiveCut) {
    const targetTk = S.targetVideoTrack || "v1";
    const srcTk = "v" + camNumber;
    const srcClip = (S.clips[srcTk] || []).find(c => !c.disabled && S.playhead >= c.start && S.playhead < c.start + c.dur);

    const curTargetClip = (S.clips[targetTk] || []).find(c => S.playhead > c.start + 0.1 && S.playhead < c.start + c.dur - 0.1);
    if (curTargetClip) {
      saveUndoSnapshot();
      const splitTime = Number(S.playhead.toFixed(2));
      const rightDur = Number((curTargetClip.start + curTargetClip.dur - splitTime).toFixed(2));
      curTargetClip.dur = Number((splitTime - curTargetClip.start).toFixed(2));

      let newClip;
      if (srcClip) {
        newClip = Object.assign({}, JSON.parse(JSON.stringify(srcClip)), {
          id: uid(targetTk + "_"),
          track: targetTk,
          start: splitTime,
          dur: rightDur,
          inPoint: Number(((srcClip.inPoint || 0) + (splitTime - srcClip.start) * (srcClip.speed || 1)).toFixed(2))
        });
      } else {
        newClip = Object.assign({}, JSON.parse(JSON.stringify(curTargetClip)), {
          id: uid(targetTk + "_"),
          title: `Câmera ${camNumber}`,
          start: splitTime,
          dur: rightDur
        });
      }
      S.clips[targetTk].push(newClip);
      resolveTrackOverlaps(targetTk, newClip.id);
      S.selectedClipId = newClip.id;
      S.selectedClipIds = [newClip.id];
    }
    playFoleySound("claquete", 0.04);
    toast(`Corte no ar: Câmera ${camNumber} (${srcTk.toUpperCase()})!`);
  } else {
    playFoleySound("bip", 0.03);
  }

  renderMulticamFrames();
  renderTimeline();
  renderMonitorFrame();
}

function updateStatusBar() {
  if (typeof S !== "undefined" && S.hasActiveProject === false) {
    const winTitle = document.getElementById("winTitle");
    if (winTitle) winTitle.textContent = `ScriptEditor 95 - [Nenhum Projeto Aberto · Área de Trabalho MDI]`;
    const taskTitle = document.getElementById("taskTitle");
    if (taskTitle) taskTitle.textContent = `ScriptEditor 95 — Área de Trabalho em Espera`;
    try { document.title = `ScriptEditor 95 - [Nenhum Projeto Aberto]`; } catch (_e) {}
    const sbStatus = document.getElementById("statusTxt");
    if (sbStatus) sbStatus.textContent = "Área de trabalho em espera · Selecione uma opção na tela inicial ou crie um novo projeto";
    const sbClip = document.getElementById("sbClip");
    if (sbClip) sbClip.textContent = "Projeto: Nenhum aberto";
    return;
  }

  const dirtyMark = S.isDirty ? " *" : "";
  const curSeq = (S.sequences || []).find(s => s.id === S.activeSequenceId);
  const seqName = curSeq ? ` [${curSeq.name}]` : "";
  const winTitle = document.getElementById("winTitle");
  if (winTitle) winTitle.textContent = `ScriptEditor 95 - [${S.projectName}${dirtyMark}${seqName} · Ilha Não-Linear]`;
  const taskTitle = document.getElementById("taskTitle");
  if (taskTitle) taskTitle.textContent = `ScriptEditor 95 — ${S.projectName}${dirtyMark}${seqName}`;
  try { document.title = `ScriptEditor 95 - ${S.projectName}${dirtyMark}${seqName}`; } catch (_e) {}

  const sbClip = document.getElementById("sbClip");
  if (sbClip) {
    if (S.selectedGap) {
      sbClip.textContent = `Espaço Vazio [${S.selectedGap.track.toUpperCase()}]: ${S.selectedGap.dur.toFixed(2)}s (DEL para fechar)`;
    } else if (Array.isArray(S.selectedClipIds) && S.selectedClipIds.length > 1) {
      const selectedList = getSelectedClipsList();
      const combinedDur = selectedList.reduce((acc, item) => acc + (item.clip.dur || 0), 0);
      sbClip.textContent = `${selectedList.length} Clipes Selecionados (Duração combinada: ${combinedDur.toFixed(1)}s)`;
    } else {
      const sel = getSelectedClip();
      sbClip.textContent = sel ? `Clipe [${sel.track.toUpperCase()}]: ${sel.title.slice(0, 24)} (${sel.dur}s)` : `Faixas Alvo: ${(S.targetVideoTrack || "v1").toUpperCase()} / ${(S.targetAudioTrack || "a1").toUpperCase()}`;
    }
  }
}

function renderAll() {
  renderSide();
  renderTimeline();
  renderMonitorFrame();
  renderSourceFrame();
  updateStatusBar();
}

/* ---------- Diálogo de Confirmação de Saída Windows 95 (Salvar Alterações) ---------- */
function executeAppQuit() {
  localStorage.setItem("varguelia.scripteditor.session_unclean", "0");
  if (window.editorNative && typeof window.editorNative.forceClose === "function") {
    window.editorNative.forceClose();
  } else if (window.editorNative && typeof window.editorNative.close === "function") {
    window.editorNative.close();
  } else {
    window.close();
  }
}

function promptCloseApp() {
  const hasClips = getAllTrackIds().some(tk => (S.clips[tk] || []).length > 0);
  const needsSave = S.hasActiveProject && (S.isDirty || hasClips || S.mediaBin.length > 0);

  if (!needsSave) {
    executeAppQuit();
    return;
  }

  const projName = S.projectName || "PROJETO_LIVRE_01.PPJ";

  const win95QuestionSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" style="filter:drop-shadow(1px 1px 0 #fff)">
      <circle cx="16" cy="16" r="14" fill="#000080" stroke="#000" stroke-width="1.2"/>
      <circle cx="16" cy="16" r="12" fill="#FFFF00"/>
      <path d="M11 11a5 5 0 0 1 9.5-1.5c.8 1.5 0 3.2-1.5 4.5-1.2 1-1.8 1.8-1.8 3.5h-2.5c0-2.5 1-3.6 2.4-4.8 1-0.9 1.4-1.6 1-2.4a2.8 2.8 0 0 0-5.3.7z" fill="#000"/>
      <rect x="14.7" y="20.5" width="2.8" height="2.8" fill="#000"/>
    </svg>
  `;

  let keyHandler = null;

  dialog({
    id: "closeConfirmWin",
    title: "ScriptEditor 95",
    width: 440,
    modal: true,
    body: `
      <div class="row" style="gap:16px;align-items:flex-start;padding:8px 4px 6px">
        <div style="flex-shrink:0;padding-top:2px">
          ${win95QuestionSvg}
        </div>
        <div class="col" style="gap:10px;font-size:12px;line-height:1.45;color:var(--hi-text, #000)">
          <div style="font-weight:700">O projeto "${escH(projName)}" foi alterado.</div>
          <div>Deseja salvar as alterações feitas no projeto antes de fechar o <b>ScriptEditor 95</b>?</div>
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Sim",
        def: 1,
        run: async (w) => {
          if (keyHandler) window.removeEventListener("keydown", keyHandler);
          closeDialog(w);
          const ok = await saveCurrentProject(false);
          if (ok !== false) {
            executeAppQuit();
          }
          return false;
        }
      },
      {
        label: "Não",
        run: (w) => {
          if (keyHandler) window.removeEventListener("keydown", keyHandler);
          closeDialog(w);
          S.isDirty = false;
          executeAppQuit();
          return false;
        }
      },
      {
        label: "Cancelar",
        run: (w) => {
          if (keyHandler) window.removeEventListener("keydown", keyHandler);
          closeDialog(w);
          return false;
        }
      }
    ],
    onOpen: (w) => {
      keyHandler = (e) => {
        if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          const btn = w.querySelector("[data-b='0']");
          if (btn) btn.click();
        } else if (e.key === "n" || e.key === "N") {
          e.preventDefault();
          const btn = w.querySelector("[data-b='1']");
          if (btn) btn.click();
        } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
          e.preventDefault();
          const btn = w.querySelector("[data-b='2']");
          if (btn) btn.click();
        }
      };
      window.addEventListener("keydown", keyHandler);
    },
    onClose: () => {
      if (keyHandler) window.removeEventListener("keydown", keyHandler);
    }
  });
}

const CMD = {
  novaSequencia: { label: "Nova Sequência / Linha do Tempo…", icon: "seq", key: "Ctrl+N", run: () => createNewSequence() },
  duplicarSequencia: { label: "Duplicar Sequência Atual", icon: "new", run: () => duplicateActiveSequence() },
  novoProjetoLivre: { label: "Novo Projeto Livre…", icon: "new", key: "Ctrl+Shift+N", run: () => openNewProjectCustomDialog() },
  abrirProjeto: { label: "Abrir Projeto (.PPJ)…", icon: "open", key: "Ctrl+O", run: () => openProjectDialog() },
  salvarProjeto: { label: "Salvar Projeto (.PPJ)", icon: "save", key: "Ctrl+S", run: () => saveCurrentProject(false) },
  salvarProjetoComo: { label: "Salvar Projeto Como…", icon: "save", key: "Ctrl+Shift+S", run: () => saveCurrentProject(true) },
  toggleSnap: { label: "Alternar Ímã Magnético de Encaixe", icon: "magnet", key: "S", run: () => toggleSnap() },
  marcarInTimeline: { label: "Marcar Entrada (IN) na Timeline", key: "I", run: () => setTimelineIn() },
  marcarOutTimeline: { label: "Marcar Saída (OUT) na Timeline", key: "O", run: () => setTimelineOut() },
  limparInOutTimeline: { label: "Limpar Pontos IN e OUT da Timeline", key: "Alt+X", run: () => clearTimelineInOut() },
  sobrescreverOrigem: { label: "Sobrescrever na Timeline (Overwrite)", key: ".", run: () => insertSourceIntoTimeline(undefined, "overwrite") },
  inserirOrigem: { label: "Inserir com Ondulação (Insert)", key: ",", run: () => insertSourceIntoTimeline(undefined, "insert") },
  rippleDeleteVazio: { label: "Eliminar Ondulação no Espaço Vazio", icon: "cut", key: "Delete", run: () => {
    if (S.selectedGap) rippleDeleteGap(S.selectedGap);
    else deleteSelectedClip(true);
  }},
  importarMidia: { label: "Importar Vídeo, Áudio ou Imagem…", icon: "folder", key: "Ctrl+I", run: () => importMediaFiles("all", false) },
  importarSRT: { label: "Importar Legendas (.SRT)…", icon: "tv", run: () => importSrtSubtitles() },
  exportarSRT: { label: "Exportar Legendas (.SRT)…", icon: "tv", run: () => exportSrtSubtitles() },
  mesaSom: { label: "Mesa de Som Analógica 95…", icon: "speaker", run: () => openAudioMixerDialog() },
  gerarSinal: { label: "Novo Sinal / Contagem Regressiva / Barras…", icon: "film", run: () => openGeneratorDialog() },
  geradorGC: { label: "Novo Letreiro / Cartela (Title Designer)…", icon: "tv", run: () => openChyronDialog() },
  addVideoTrack: { label: "Adicionar Nova Faixa de Vídeo (+V)", icon: "film", run: () => addVideoTrack() },
  addAudioTrack: { label: "Adicionar Nova Faixa de Áudio (+A)", icon: "speaker", run: () => addAudioTrack() },
  importarSR: { label: "Montar a partir do Roteiro do ScriptRoom…", icon: "script", run: () => {
    prefs.presetMode = "roteiro";
    const pm = document.getElementById("presetModeSel");
    if (pm) pm.value = "roteiro";
    S.sideTab = "cenas";
    if (cur()) buildTimelineFromScript(cur());
    toast("Roteiro do ScriptRoom carregado na Linha do Tempo!");
  }},
  salvarNoSR: { label: "Sincronizar Roteiro no ScriptRoom", icon: "save", run: () => saveCurrentToScriptRoom() },
  exportarMaster: { label: "Exportar Filme Master (.MP4 / .AVI / .MOV / .WEBM)…", icon: "save", key: "Ctrl+M", run: () => openExportDialog() },
  congelarQuadro: { label: "Congelar Fotograma na Agulha (Freeze Frame)", icon: "slate", key: "Shift+F", run: () => createFreezeFrameAtPlayhead() },
  corretor3Way: { label: "Corretor de Cor 3-Way Broadcast (Lift, Gamma, Gain)…", icon: "sparkle", run: () => open3WayColorDialog() },
  rackDinamica: { label: "Rack Dinâmico DSP (Compressor, Limiter & Gate)…", icon: "speaker", run: () => openDynamicsRackDialog() },
  filaRender: { label: "Fila de Renderização em Lote (Batch Render Queue)…", icon: "film", run: () => openRenderQueueDialog() },
  multicamSwitcher: { label: "Monitor Multicâmera 4-Up (Live Switcher)", run: () => setMonitorLayout("multicam") },
  exportarCueSheet: { label: "Exportar Folha de Decupagem (Cue Sheet .TXT)…", icon: "script", run: () => exportCueSheet() },
  fichaTecnica: { label: "Exportar Ficha Técnica de Montagem (HTML/TXT)…", icon: "script", run: () => openTechnicalReportDialog() },
  consoleVU: { label: "Console VU Analógico Tape Deck 1995…", icon: "speaker", run: () => openAnalogVUConsole() },
  chromaProcessor: { label: "Processador Chroma Key & Blue/Green Screen 1995…", icon: "sparkle", run: () => openChromaKeyDialog() },
  abaMarcadores: { label: "Lista de Marcadores & Decupagem", run: () => { S.sideTab = "marcadores"; prefs.painel = true; renderSide(); } },
  abrirScriptRoom: { label: "Abrir o aplicativo ScriptRoom", icon: "clapper", run: () => { if (window.editorNative) window.editorNative.launchScriptRoom(); } },
  desligar: { label: "Sair do ScriptEditor", icon: "power", run: () => promptCloseApp() },
  minimizar: { label: "Minimizar", run: () => { if (window.editorNative) window.editorNative.minimize(); } },
  maximizar: { label: "Maximizar", run: () => { if (window.editorNative) window.editorNative.maximize(); } },
  desfazer: { label: "Desfazer", icon: "undo", key: "Ctrl+Z", run: () => undoEdit() },
  refazer: { label: "Refazer", icon: "redo", key: "Ctrl+Y", run: () => redoEdit() },
  cortarAgulha: { label: "Dividir Clipe na Agulha", icon: "cut", key: "Ctrl+K", run: () => splitClipAtPlayhead() },
  duplicarClipe: { label: "Duplicar Clipe Selecionado", key: "Ctrl+D", run: () => duplicateSelectedClip() },
  copiarClipe: { label: "Copiar Clipe", key: "Ctrl+C", run: () => copySelectedClip() },
  colarClipe: { label: "Colar Clipe na Agulha", key: "Ctrl+V", run: () => pasteClipAtPlayhead() },
  adicionarMarcador: { label: "Inserir Marcador na Linha do Tempo", key: "Tecla M", run: () => addTimelineMarker() },
  velocidadeClipe: { label: "Velocidade / Duração / Reversão do Clipe…", run: () => {
    const sel = getSelectedClip();
    if (!sel) { toast("Selecione um clipe na linha do tempo primeiro."); return; }
    openClipSpeedDialog(sel);
  }},
  excluirClipe: { label: "Apagar Clipe Selecionado", key: "Delete", run: () => deleteSelectedClip(false) },
  excluirRipple: { label: "Apagar e Fechar Espaço (Ripple Delete)", key: "Shift+Del", run: () => deleteSelectedClip(true) },
  selecionarTodos: { label: "Selecionar Todos os Clipes", icon: "seq", key: "Ctrl+A", run: () => selectAllClips() },
  desmarcarTudo: { label: "Desmarcar Todos os Clipes", key: "Esc", run: () => { clearClipSelection(); renderTimeline(); updateStatusBar(); } },
  agruparClipes: { label: "Agrupar Clipes Selecionados", icon: "group", key: "Ctrl+G", run: () => groupSelectedClips() },
  desagruparClipes: { label: "Desagrupar Clipes", key: "Ctrl+Shift+G", run: () => ungroupSelectedClips() },
  vincularAV: { label: "Vincular / Desvincular Áudio e Vídeo", key: "Ctrl+L", run: () => linkSelectedClips() },
  colarAtributos: { label: "Colar Atributos nos Clipes…", icon: "sparkle", key: "Ctrl+Alt+V", run: () => openPasteAttributesDialog() },
  colorMatte: { label: "Gerador de Matte de Cor Sólida (Color Matte 1995)…", icon: "sparkle", key: "Shift+M", run: () => openColorMatteDialog() },
  quickDissolve: { label: "Inserir Dissolvência Rápida (1.0s)", icon: "sparkle", key: "Ctrl+D", run: () => applyQuickCrossDissolve() },
  toolSelect: { label: "Ferramenta Seleção e Movimento", key: "Tecla V", run: () => setTimelineTool("select") },
  toolTrack: { label: "Ferramenta Selecionar Faixa Adiante", key: "Tecla A", run: () => setTimelineTool("track") },
  toolRazor: { label: "Ferramenta Navalha (Corte)", key: "Tecla C", run: () => setTimelineTool("razor") },
  toolTrim: { label: "Ferramenta Trim (Ajuste de Borda)", key: "Tecla T", run: () => setTimelineTool("trim") },
  toolRipple: { label: "Ferramenta Ripple Edit (Ajuste com Fechamento)", key: "Tecla B", run: () => setTimelineTool("ripple") },
  toolRolling: { label: "Ferramenta Rolling Edit (Ajuste Mútuo)", key: "Tecla N", run: () => setTimelineTool("rolling") },
  toolSlip: { label: "Ferramenta Slip (Deslizar Conteúdo Interno)", key: "Tecla Y", run: () => setTimelineTool("slip") },
  toolSlide: { label: "Ferramenta Slide (Deslizar Posição)", key: "Tecla U", run: () => setTimelineTool("slide") },
  toolHand: { label: "Ferramenta Mão (Arrastar Timeline)", key: "Tecla H", run: () => setTimelineTool("hand") },
  equalizadorDSP: { label: "Equalizador Gráfico 10 Bandas (DSP)…", icon: "foley", run: () => openGraphicEQDialog() },
  importarEDL: { label: "Importar Lista de Decisão (CMX 3600 EDL)…", icon: "script", run: () => importCMX3600EDL() },
  exportarEDL: { label: "Exportar Lista de Decisão (CMX 3600 EDL)…", icon: "save", run: () => exportCMX3600EDL() },
  storyboardMode: { label: "Modo Prancha / Storyboard no Bin", run: () => { S.binView = "storyboard"; S.sideTab = "bin"; prefs.painel = true; renderSide(); } },
  configTeclas: { label: "Trocar e Personalizar Atalhos de Teclado…", icon: "gear", run: () => { S.sideTab = "atalhos"; prefs.painel = true; document.body.dataset.painel = "on"; renderSide(); toast("Clique em [Trocar] ao lado de qualquer atalho na aba esquerda!"); } },
  layDual: { label: "Monitores Duplos (Origem + Programa)", run: () => setMonitorLayout("dual") },
  layMulticam: { label: "Monitor Multicâmera 4-Up (Live Switcher)", run: () => setMonitorLayout("multicam") },
  laySingle: { label: "Monitor Master Grande", run: () => setMonitorLayout("single") },
  layScript: { label: "Monitor Master + Roteiro Lado a Lado", run: () => setMonitorLayout("script") },
  verPainel: { label: "Mostrar/Ocultar Janela Projeto Lateral", run: () => { prefs.painel = !prefs.painel; document.body.dataset.painel = prefs.painel ? "on" : "off"; } },
  mesaFoley: { label: "Mesa de Áudio e Foley 16-bit", icon: "foley", run: () => { S.sideTab = "audio"; renderSide(); } },
  gravadorADR: { label: "Gravar Narração pelo Microfone…", icon: "mic", run: () => openADRDialog() },
  claqueteCam: { label: "Claquete Virtual & Boletim de Câmera…", icon: "slate", run: () => openSlateDialog() },
  telaInicial: { label: "Assistente de Boas-Vindas (Tela Inicial)…", icon: "sparkle", key: "Ctrl+Home", run: () => openWelcomeDialog() },
  fecharProjeto: { label: "Fechar Projeto (Voltar à Tela Inicial)", icon: "door", key: "Ctrl+W", run: () => fecharProjeto() },
  configuracoesIlha: { label: "Configurações da Ilha 95 (Broadcast & Sincronismo)…", icon: "props", run: () => openIslandSettingsDialog() },
  vhsSuite: { label: "Suite Analógica de Fita VHS & Betacam SP (DSP 1995)…", icon: "tape", key: "Ctrl+Alt+V", run: () => openAnalogTapeSuiteDialog() },
  toggleAbRoll: { label: "Alternar Modo A/B Roll Clássico (Trilha FX 1995)", icon: "trans", key: "Ctrl+Alt+B", run: () => toggleAbRollMode() },
  pacoteZip: { label: "Empacotar Projeto para Iomega Zip 100MB / DAT…", icon: "save", key: "Ctrl+Shift+Z", run: () => openZipDrivePackageDialog() },
  desacoplarProgram: { label: "Desacoplar Monitor de Programa (MDI/Externa)", run: () => detachPanel("programBox", "floating") },
  desacoplarSource: { label: "Desacoplar Monitor de Origem (MDI/Externa)", run: () => detachPanel("sourceBox", "floating") },
  desacoplarSide: { label: "Desacoplar Janela Projeto (MDI/Externa)", run: () => detachPanel("sideRack", "floating") },
  desacoplarTimeline: { label: "Desacoplar Linha do Tempo (MDI/Externa)", run: () => detachPanel("timelineDock", "floating") },
  reacoplarTodos: { label: "Reacoplar Todas as Janelas à Bancada", run: () => { ["sideRack", "sourceBox", "programBox", "timelineDock"].forEach(attachPanel); } },
  resetLayout: { label: "Redefinir Dimensões das Telas para o Padrão", run: () => { prefs.layoutSizes = null; savePrefs(); document.documentElement.style.removeProperty("--side-width"); document.documentElement.style.removeProperty("--src-width"); document.documentElement.style.removeProperty("--prog-width"); document.documentElement.style.removeProperty("--tl-height"); resizeCanvasMonitors(); renderAll(); toast("Dimensões originais restauradas!"); } },
  relinkMidias: { label: "Reconectar Mídias Ausentes (Media Relink 1995)…", icon: "folder", run: () => openMediaRelinkDialog() },
  janelaDub: { label: "Janela de Timecode na Tela (Window Dub 1995)…", icon: "tv", run: () => openWindowDubDialog() },
  esquema: { label: "Esquema de Cores Windows 95…", icon: "gear", run: () => openSchemeDialog() },
  atalhosAjuda: { label: "Atalhos de teclado", icon: "help", run: () => { S.sideTab = "atalhos"; prefs.painel = true; document.body.dataset.painel = "on"; renderSide(); } },
  dicaDoDia: { label: "Dica do dia…", icon: "bulb", run: () => openTipOfDayDialog() },
  procurarAtualizacoes: { label: "Procurar atualizações…", icon: "sync", run: () => openUpdateDialog(false) },
  oQueHaDeNovo: { label: "O que há de novo…", icon: "bulb", run: () => openWhatsNewDialog() },
  telaAbertura: { label: "Tela de abertura (Splash Screen)…", icon: "splash", run: () => { if (window.editorNative) window.editorNative.openSplash(); } },
  sobre: { label: "Sobre o ScriptEditor 95…", icon: "info", run: () => aboutDialog() },
  win95ColorPicker: { label: "Seletor de Cores Oficial Windows 95 (COMMDLG32)…", icon: "sparkle", key: "Ctrl+Shift+C", run: () => openWin95ColorDialog("#008080", null, { title: "Cores — Paleta e Espectro 1995" }) },
  dve3dProcessor: { label: "Console de Efeitos Digitais 3D (DVE 1995)…", icon: "sparkle", key: "Ctrl+Alt+3", run: () => open3DDVEConsole(getSelectedClip()) },
  captureStillBMP: { label: "Capturar Fotograma Estático (Still Frame BMP 1995)", icon: "slate", key: "Ctrl+Shift+B", run: () => captureStillFrameBMP() },
  rollCrawlDesigner: { label: "Roll & Crawl Designer 95 (Créditos & Letreiros)…", icon: "sparkle", key: "Ctrl+Alt+R", run: () => openRollCrawlDesigner() },
  analisadorRTA: { label: "Analisador de Áudio RTA 31-Bandas Rack 19\"…", icon: "vu", key: "Ctrl+Alt+A", run: () => openRTAConsole() },
  calculadoraSMPTE: { label: "Calculadora Broadcast SMPTE 12M & Película…", icon: "props", key: "Ctrl+Alt+K", run: () => openSmpteCalculatorDialog() }
};

const MENUS = [
  ["Arquivo", "A", ["telaInicial", "fecharProjeto", "-", "novaSequencia", "novoProjetoLivre", "abrirProjeto", "salvarProjeto", "salvarProjetoComo", "pacoteZip", "-", "importarMidia", "relinkMidias", "importarEDL", "exportarEDL", "exportarCueSheet", "fichaTecnica", "-", "importarSRT", "exportarSRT", "-", "gerarSinal", "geradorGC", "rollCrawlDesigner", "colorMatte", "captureStillBMP", "-", "configuracoesIlha", "calculadoraSMPTE", "-", "importarSR", "salvarNoSR", "-", "exportarMaster", "filaRender", "-", "abrirScriptRoom", "-", "desligar"]],
  ["Editar", "E", ["desfazer", "refazer", "-", "selecionarTodos", "desmarcarTudo", "-", "copiarClipe", "colarClipe", "colarAtributos", "win95ColorPicker", "duplicarClipe", "congelarQuadro", "-", "agruparClipes", "desagruparClipes", "vincularAV", "-", "cortarAgulha", "excluirClipe", "excluirRipple", "rippleDeleteVazio", "-", "toggleSnap", "-", "configTeclas"]],
  ["Projeto", "P", ["novaSequencia", "duplicarSequencia", "-", "importarMidia", "relinkMidias", "abrirProjeto", "salvarProjeto", "pacoteZip", "-", "gerarSinal", "geradorGC", "rollCrawlDesigner", "colorMatte", "win95ColorPicker", "adicionarMarcador", "abaMarcadores", "-", "addVideoTrack", "addAudioTrack", "-", "configuracoesIlha", "vhsSuite", "toggleAbRoll", "-", "mesaSom", "consoleVU", "analisadorRTA", "rackDinamica", "equalizadorDSP", "corretor3Way", "calculadoraSMPTE", "-", "importarSRT", "exportarSRT", "-", "importarSR"]],
  ["Clipe", "C", ["sobrescreverOrigem", "inserirOrigem", "-", "marcarInTimeline", "marcarOutTimeline", "limparInOutTimeline", "-", "dve3dProcessor", "chromaProcessor", "colorMatte", "quickDissolve", "-", "agruparClipes", "desagruparClipes", "vincularAV", "colarAtributos", "-", "velocidadeClipe", "congelarQuadro", "captureStillBMP", "cortarAgulha", "duplicarClipe", "excluirClipe", "excluirRipple", "rippleDeleteVazio", "-", "toggleSnap", "-", "addVideoTrack", "addAudioTrack", "-", "toolSelect", "toolTrack", "toolRazor", "toolTrim", "toolRipple", "toolRolling", "toolSlip", "toolSlide", "toolHand"]],
  ["Janela", "J", ["layDual", "layMulticam", "laySingle", "layScript", "-", "dve3dProcessor", "consoleVU", "analisadorRTA", "janelaDub", "calculadoraSMPTE", "multicamSwitcher", "filaRender", "-", "verPainel", "-", "desacoplarProgram", "desacoplarSource", "desacoplarSide", "desacoplarTimeline", "-", "reacoplarTodos", "resetLayout", "-", "esquema"]],
  ["Áudio/Vídeo", "V", ["vhsSuite", "dve3dProcessor", "toggleAbRoll", "-", "chromaProcessor", "win95ColorPicker", "captureStillBMP", "rollCrawlDesigner", "-", "mesaSom", "consoleVU", "analisadorRTA", "rackDinamica", "equalizadorDSP", "corretor3Way", "-", "janelaDub", "calculadoraSMPTE", "-", "addVideoTrack", "addAudioTrack", "-", "mesaFoley", "gravadorADR", "claqueteCam", "-", "exportarMaster", "filaRender"]],
  ["Ajuda", "u", ["atalhosAjuda", "dicaDoDia", "procurarAtualizacoes", "-", "oQueHaDeNovo", "telaAbertura", "sobre"]]
];

let menuStack = [], menuOwner = null;
function closeMenus() {
  while (menuStack.length) menuStack.pop().remove();
  if (menuOwner) menuOwner.setAttribute("aria-expanded", "false");
  menuOwner = null;
}
function runCmd(id) { closeMenus(); if (CMD[id] && CMD[id].run) CMD[id].run(); }

function showMenu(items, x, y, opts = {}) {
  closeMenus();
  const m = document.createElement("div");
  m.className = "menu" + (opts.start ? " startmenu" : "");
  const body = items.map(id => {
    if (id === "-") return "<hr>";
    const c = CMD[id];
    if (!c) return "";
    return `<button type="button" class="mi${opts.big ? " big" : ""}" data-cmdid="${id}">
      <span class="ic">${c.icon ? icon(c.icon, opts.big ? 20 : 16) : ""}</span>
      <span>${escH(c.label)}</span>
      <span class="k">${escH(c.key || "")}</span><span></span>
    </button>`;
  }).join("");
  m.innerHTML = opts.start ? `<div class="sm-band"><b>Script</b>Editor 95</div><div class="sm-items">${body}</div>` : body;
  document.body.appendChild(m);
  menuStack.push(m);
  const w = m.offsetWidth, h = m.offsetHeight;
  m.style.left = Math.max(4, Math.min(x, innerWidth - w - 4)) + "px";
  m.style.top = Math.max(4, Math.min(opts.up ? y - h : y, innerHeight - h - 4)) + "px";
  m.onclick = e => { const b = e.target.closest("[data-cmdid]"); if (b) runCmd(b.dataset.cmdid); };
}

/* ---------- Divisores Redimensionáveis (Splitters) ---------- */
function setupSplitters() {
  // Restaura dimensões salvas das preferências
  if (prefs.layoutSizes) {
    if (prefs.layoutSizes.sideWidth) {
      document.documentElement.style.setProperty("--side-width", prefs.layoutSizes.sideWidth + "px");
    }
    if (prefs.layoutSizes.tlHeight) {
      document.documentElement.style.setProperty("--tl-height", prefs.layoutSizes.tlHeight + "px");
    }
    if (prefs.layoutSizes.srcWidth) {
      document.documentElement.style.setProperty("--src-width", prefs.layoutSizes.srcWidth + "px");
      document.documentElement.style.setProperty("--prog-width", "1fr");
    }
  }

  // 1. Splitter Lateral (#splitSide)
  const splitSide = document.getElementById("splitSide");
  if (splitSide) {
    let startX = 0, startW = 0, dragging = false;
    splitSide.onpointerdown = (e) => {
      e.preventDefault();
      dragging = true;
      splitSide.classList.add("dragging");
      splitSide.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startW = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--side-width")) || 330;
    };
    splitSide.onpointermove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const newW = Math.max(180, Math.min(640, startW + dx));
      document.documentElement.style.setProperty("--side-width", newW + "px");
    };
    const endDragSide = (e) => {
      if (!dragging) return;
      dragging = false;
      splitSide.classList.remove("dragging");
      try { splitSide.releasePointerCapture(e.pointerId); } catch (_e) {}
      if (!prefs.layoutSizes) prefs.layoutSizes = {};
      prefs.layoutSizes.sideWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--side-width")) || 330;
      savePrefs();
      resizeCanvasMonitors();
    };
    splitSide.onpointerup = endDragSide;
    splitSide.onpointercancel = endDragSide;
  }

  // 2. Splitter Monitores (#splitMonitors)
  const splitMon = document.getElementById("splitMonitors");
  if (splitMon) {
    let startX = 0, startSrcW = 0, dragging = false;
    splitMon.onpointerdown = (e) => {
      e.preventDefault();
      dragging = true;
      splitMon.classList.add("dragging");
      splitMon.setPointerCapture(e.pointerId);
      startX = e.clientX;
      const srcBox = document.getElementById("sourceBox");
      startSrcW = srcBox ? srcBox.offsetWidth : 400;
    };
    splitMon.onpointermove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const newSrcW = Math.max(180, Math.min(window.innerWidth - 320, startSrcW + dx));
      document.documentElement.style.setProperty("--src-width", newSrcW + "px");
      document.documentElement.style.setProperty("--prog-width", "1fr");
    };
    const endDragMon = (e) => {
      if (!dragging) return;
      dragging = false;
      splitMon.classList.remove("dragging");
      try { splitMon.releasePointerCapture(e.pointerId); } catch (_e) {}
      if (!prefs.layoutSizes) prefs.layoutSizes = {};
      prefs.layoutSizes.srcWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--src-width")) || 400;
      savePrefs();
      resizeCanvasMonitors();
    };
    splitMon.onpointerup = endDragMon;
    splitMon.onpointercancel = endDragMon;
  }

  // 3. Splitter Timeline (#splitTimeline)
  const splitTl = document.getElementById("splitTimeline");
  if (splitTl) {
    let startY = 0, startH = 0, dragging = false;
    splitTl.onpointerdown = (e) => {
      e.preventDefault();
      dragging = true;
      splitTl.classList.add("dragging");
      splitTl.setPointerCapture(e.pointerId);
      startY = e.clientY;
      startH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tl-height")) || 258;
    };
    splitTl.onpointermove = (e) => {
      if (!dragging) return;
      const dy = startY - e.clientY;
      const newH = Math.max(140, Math.min(window.innerHeight - 200, startH + dy));
      document.documentElement.style.setProperty("--tl-height", newH + "px");
    };
    const endDragTl = (e) => {
      if (!dragging) return;
      dragging = false;
      splitTl.classList.remove("dragging");
      try { splitTl.releasePointerCapture(e.pointerId); } catch (_e) {}
      if (!prefs.layoutSizes) prefs.layoutSizes = {};
      prefs.layoutSizes.tlHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tl-height")) || 258;
      savePrefs();
      renderTimeline();
    };
    splitTl.onpointerup = endDragTl;
    splitTl.onpointercancel = endDragTl;
  }
}

/* ---------- Janelas Flutuantes MDI e Desacoplamento Multi-Monitor ---------- */
const detachedPanels = new Map();

function detachPanel(panelId, mode = "floating") {
  const el = document.getElementById(panelId);
  if (!el || detachedPanels.has(panelId)) return;

  const panelNames = {
    sideRack: "Janela Projeto / Efeitos (Bin)",
    sourceBox: "Monitor de Origem (Clipe Bruto)",
    programBox: "Monitor de Programa Master",
    timelineDock: "Linha do Tempo (Timeline)"
  };
  const title = panelNames[panelId] || panelId;

  // Cria o placeholder no lugar original
  const placeholder = document.createElement("div");
  placeholder.className = "dock-placeholder";
  placeholder.id = "ph_" + panelId;
  placeholder.innerHTML = `<span>[ ${escH(title)} desacoplado — clique para reacoplar ]</span>`;
  placeholder.onclick = () => attachPanel(panelId);

  const parent = el.parentNode;
  const next = el.nextSibling;
  parent.insertBefore(placeholder, el);

  if (mode === "external" && window.editorNative && typeof window.editorNative.openDetachedWindow === "function") {
    el.style.display = "none";
    detachedPanels.set(panelId, { placeholder, floatingEl: null, origParent: parent, origNextSibling: next, isExt: true });
    window.editorNative.openDetachedWindow({
      panelId,
      title: `ScriptEditor 95 — ${title}`,
      width: panelId === "programBox" ? 840 : 780,
      height: panelId === "programBox" ? 600 : 520
    });
    toast(`Painel "${title}" aberto em janela externa.`);
    return;
  }

  // Modo Janela Flutuante MDI (dentro do aplicativo)
  const floatingArea = document.getElementById("floatingArea");
  if (!floatingArea) return;

  const winMdi = document.createElement("div");
  winMdi.className = "win-floating active-mdi";
  winMdi.id = "float_" + panelId;

  const rect = el.getBoundingClientRect();
  const left = Math.max(20, Math.min(window.innerWidth - 380, rect.left + 20));
  const top = Math.max(40, Math.min(window.innerHeight - 300, rect.top + 20));
  winMdi.style.left = left + "px";
  winMdi.style.top = top + "px";
  winMdi.style.width = Math.max(340, rect.width) + "px";
  winMdi.style.height = Math.max(220, rect.height) + "px";

  winMdi.innerHTML = `
    <div class="win-floating-hdr">
      <span class="win-floating-title">🖥️ ${escH(title)}</span>
      <div class="row" style="gap:2px">
        <button type="button" class="mon-dock-btn" data-float-ext="${panelId}" title="Mover para Janela Externa do Windows (Monitor Secundário)">↗</button>
        <button type="button" class="mon-dock-btn" data-float-dock="${panelId}" title="Reacoplar à Área de Trabalho Principal">⇲</button>
      </div>
    </div>
    <div class="win-floating-body" id="float_body_${panelId}"></div>
  `;

  floatingArea.appendChild(winMdi);
  const body = winMdi.querySelector("#float_body_" + panelId);
  body.appendChild(el);

  detachedPanels.set(panelId, { placeholder, floatingEl: winMdi, origParent: parent, origNextSibling: next, isExt: false });

  // Eventos de arrastar a janela flutuante
  const hdr = winMdi.querySelector(".win-floating-hdr");
  let dragX = 0, dragY = 0, isDragging = false;
  hdr.onpointerdown = (e) => {
    if (e.target.closest("button")) return;
    e.preventDefault();
    isDragging = true;
    hdr.setPointerCapture(e.pointerId);
    dragX = e.clientX - winMdi.offsetLeft;
    dragY = e.clientY - winMdi.offsetTop;
    document.querySelectorAll(".win-floating").forEach(w => w.classList.remove("active-mdi"));
    winMdi.classList.add("active-mdi");
  };
  hdr.onpointermove = (e) => {
    if (!isDragging) return;
    const nx = Math.max(0, Math.min(window.innerWidth - winMdi.offsetWidth, e.clientX - dragX));
    const ny = Math.max(0, Math.min(window.innerHeight - winMdi.offsetHeight, e.clientY - dragY));
    winMdi.style.left = nx + "px";
    winMdi.style.top = ny + "px";
  };
  const endDragWin = (e) => {
    if (!isDragging) return;
    isDragging = false;
    try { hdr.releasePointerCapture(e.pointerId); } catch (_e) {}
  };
  hdr.onpointerup = endDragWin;
  hdr.onpointercancel = endDragWin;

  winMdi.onpointerdown = () => {
    document.querySelectorAll(".win-floating").forEach(w => w.classList.remove("active-mdi"));
    winMdi.classList.add("active-mdi");
  };

  winMdi.querySelector(`[data-float-dock="${panelId}"]`).onclick = () => attachPanel(panelId);
  winMdi.querySelector(`[data-float-ext="${panelId}"]`).onclick = () => {
    attachPanel(panelId);
    detachPanel(panelId, "external");
  };

  resizeCanvasMonitors();
}

function attachPanel(panelId) {
  if (!detachedPanels.has(panelId)) return;
  const rec = detachedPanels.get(panelId);
  const el = document.getElementById(panelId);

  if (rec.floatingEl) {
    rec.floatingEl.remove();
  }

  if (el && rec.origParent) {
    el.style.display = "";
    if (rec.origNextSibling && rec.origParent.contains(rec.origNextSibling)) {
      rec.origParent.insertBefore(el, rec.origNextSibling);
    } else {
      rec.origParent.appendChild(el);
    }
  }

  if (rec.placeholder) {
    rec.placeholder.remove();
  }

  detachedPanels.delete(panelId);

  if (rec.isExt && window.editorNative && typeof window.editorNative.closeDetachedWindow === "function") {
    window.editorNative.closeDetachedWindow(panelId);
  }

  resizeCanvasMonitors();
  renderAll();
  toast("Painel reacoplado com sucesso.");
}

function setupPanelDetaching() {
  document.querySelectorAll("[data-detach]").forEach(btn => {
    btn.onclick = () => {
      const pid = btn.dataset.detach;
      if (detachedPanels.has(pid)) attachPanel(pid);
      else detachPanel(pid, "floating");
    };
  });
  document.querySelectorAll("[data-extwin]").forEach(btn => {
    btn.onclick = () => {
      const pid = btn.dataset.extwin;
      if (detachedPanels.has(pid)) attachPanel(pid);
      detachPanel(pid, "external");
    };
  });

  if (window.editorNative && typeof window.editorNative.onDetachedClosed === "function") {
    window.editorNative.onDetachedClosed(({ panelId }) => {
      if (panelId && detachedPanels.has(panelId)) {
        attachPanel(panelId);
      }
    });
  }

  const bc = new BroadcastChannel("scripteditor_detached");
  bc.onmessage = (e) => {
    const msg = e.data;
    if (!msg) return;
    if (msg.type === "cmd") {
      if (msg.cmd === "togglePlay") togglePlay(1);
      else if (msg.cmd === "stop") { togglePlay(0); setPlayhead(0); }
      else if (msg.cmd === "rewind") setPlayhead(0);
      else if (msg.cmd === "seek") setPlayhead(msg.sec, false);
      else if (msg.cmd === "dockBack") attachPanel(msg.panelId);
      else if (msg.cmd === "requestSync") syncDetachedWindows();
    }
  };

  if (window.editorNative && typeof window.editorNative.onDetachedMessage === "function") {
    window.editorNative.onDetachedMessage((msg) => {
      if (!msg) return;
      if (msg.type === "cmd") {
        if (msg.cmd === "togglePlay") togglePlay(1);
        else if (msg.cmd === "stop") { togglePlay(0); setPlayhead(0); }
        else if (msg.cmd === "rewind") setPlayhead(0);
        else if (msg.cmd === "seek") setPlayhead(msg.sec, false);
        else if (msg.cmd === "dockBack") attachPanel(msg.panelId);
        else if (msg.cmd === "requestSync") syncDetachedWindows();
      }
    });
  }
}

function syncDetachedWindows() {
  const isAnyExt = Array.from(detachedPanels.values()).some(p => p.isExt);
  if (!isAnyExt) return;
  const tc = formatSMPTE(S.playhead, FPS);
  const msg = {
    type: "frameSync",
    tc,
    playhead: S.playhead,
    dur: S.totalDuration,
    playing: S.playing
  };
  const bc = new BroadcastChannel("scripteditor_detached");
  bc.postMessage(msg);
  if (window.editorNative && typeof window.editorNative.broadcastToDetached === "function") {
    window.editorNative.broadcastToDetached(msg);
  }
}

function buildMenubar() {
  const bar = document.getElementById("menubar");
  if (!bar) return;
  bar.innerHTML = MENUS.map(([lbl, key], i) => {
    const ix = lbl.toLowerCase().indexOf(key.toLowerCase());
    const html = ix >= 0 ? `${escH(lbl.slice(0, ix))}<u>${escH(lbl[ix])}</u>${escH(lbl.slice(ix + 1))}` : escH(lbl);
    return `<button type="button" data-mb="${i}">${html}</button>`;
  }).join("");
  bar.onclick = e => {
    const b = e.target.closest("[data-mb]");
    if (!b) return;
    if (menuOwner === b) { closeMenus(); return; }
    const [, , ids] = MENUS[+b.dataset.mb];
    const r = b.getBoundingClientRect();
    showMenu(ids, r.left, r.bottom);
    menuOwner = b;
    b.setAttribute("aria-expanded", "true");
  };
}

async function boot() {
  try {
    if (window.editorNative && typeof window.editorNative.version === "function") {
      const v = await window.editorNative.version();
      if (v) APP_VERSAO = String(v);
    }
  } catch (_e) {}
  document.body.dataset.scheme = prefs.scheme || "tijolo";
  buildMenubar();
  paintIcons();
  initVUMeters();
  paintVUMeters();
  initDefaultMediaBin();
  setupDragAndDrop();
  setupProgramMonitorDirectTransform();

  const traySom = document.getElementById("traySom");
  const paintSom = () => { if (traySom) traySom.innerHTML = icon(prefs.som ? "speaker" : "mute"); };
  paintSom();
  if (traySom) traySom.onclick = () => { prefs.som = !prefs.som; paintSom(); syncHtmlMediaPlayback(); };

  const updClock = () => {
    const cl = document.getElementById("clock");
    if (cl) cl.textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };
  updClock();
  setInterval(updClock, 15000);

  // Eventos de Abas e Ferramentas
  document.querySelectorAll("[data-stab]").forEach(b => {
    b.onclick = () => { S.sideTab = b.dataset.stab; renderSide(); };
  });
  document.querySelectorAll("[data-toolbtn]").forEach(b => {
    b.onclick = () => setTimelineTool(b.dataset.toolbtn);
  });

  document.addEventListener("click", e => {
    const cmdBtn = e.target.closest("[data-cmd]");
    if (cmdBtn) { runCmd(cmdBtn.dataset.cmd); return; }
    if (menuStack.length && !e.target.closest(".menu") && !e.target.closest("#menubar") && !e.target.closest("#startBtn")) closeMenus();
  });

  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.onclick = () => {
      if (menuOwner === startBtn) { closeMenus(); return; }
      const r = startBtn.getBoundingClientRect();
      showMenu(["novoProjetoLivre", "importarMidia", "addVideoTrack", "addAudioTrack", "gerarSinal", "geradorGC", "configTeclas", "importarSR", "exportarMaster", "-", "abrirScriptRoom", "esquema", "procurarAtualizacoes", "sobre", "-", "desligar"], r.left, r.top - 2, { start: true, big: true, up: true });
      menuOwner = startBtn;
    };
  }

  // Monitor de Origem (Source Monitor)
  const setSrcPlayheadTo = (sec) => {
    const maxD = Math.max(1, S.srcItem ? (S.srcItem.dur || S.srcOut) : S.srcOut);
    S.srcPlayhead = Math.max(0, Math.min(maxD, Number(sec) || 0));
    if (S.srcVideoEl && S.srcItem && S.srcItem.url) {
      try { S.srcVideoEl.currentTime = S.srcPlayhead; } catch (_e) {}
    }
    if (S.srcAudioEl && S.srcItem && S.srcItem.url) {
      try { S.srcAudioEl.currentTime = S.srcPlayhead; } catch (_e) {}
    }
    updateSourceMonitorUI();
    renderSourceFrame();
    updateVUMeterFromTimeline();
  };

  document.getElementById("srcScrub").oninput = e => {
    setSrcPlayheadTo(+e.target.value);
  };

  // Clique e arraste direto na forma de onda do Monitor de Origem (#srcCanvas) para marcar o som com precisão!
  const srcCv = document.getElementById("srcCanvas");
  if (srcCv) {
    const scrubSrcCanvasAt = (clientX) => {
      if (!S.srcItem) return;
      const r = srcCv.getBoundingClientRect();
      const padRatio = 16 / srcCv.width;
      const normX = Math.max(0, Math.min(1, (((clientX - r.left) / Math.max(1, r.width)) - padRatio) / (1 - padRatio * 2)));
      const totalDur = Math.max(0.5, Number(S.srcItem.dur) || S.srcOut || 10);
      setSrcPlayheadTo(normX * totalDur);
    };
    srcCv.addEventListener("pointerdown", e => {
      if (e.button !== 0 || !S.srcItem) return;
      srcCv.setPointerCapture(e.pointerId);
      scrubSrcCanvasAt(e.clientX);
      const mv = ev => scrubSrcCanvasAt(ev.clientX);
      const up = () => {
        srcCv.removeEventListener("pointermove", mv);
        srcCv.removeEventListener("pointerup", up);
      };
      srcCv.addEventListener("pointermove", mv);
      srcCv.addEventListener("pointerup", up);
    });
  }

  // Clique no medidor VU direito para zerar o indicador de pico (Peak Hold)
  const vuBoxEl = document.querySelector(".vu-box");
  if (vuBoxEl) {
    vuBoxEl.onclick = () => {
      vuPeakL = -1;
      vuPeakR = -1;
      updateVUMeterFromTimeline();
    };
  }
  document.getElementById("btnSrcIn").onclick = () => {
    S.srcIn = Number(Math.min(S.srcPlayhead, S.srcOut - 0.4).toFixed(2));
    updateSourceMonitorUI(); renderSourceFrame();
  };
  document.getElementById("btnSrcOut").onclick = () => {
    S.srcOut = Number(Math.max(S.srcPlayhead, S.srcIn + 0.4).toFixed(2));
    updateSourceMonitorUI(); renderSourceFrame();
  };
  document.getElementById("btnSrcPlay").onclick = () => toggleSourcePlay();
  document.getElementById("btnInsertTimeline").onclick = () => insertSourceIntoTimeline(undefined, "insert");
  const bOvr = document.getElementById("btnOverwriteTimeline");
  if (bOvr) bOvr.onclick = () => insertSourceIntoTimeline(undefined, "overwrite");
  document.getElementById("btnOverlayTimeline").onclick = () => insertSourceIntoTimeline("overlay", "overwrite");

  // Monitor de Programa (Master Sequence)
  document.getElementById("progScrub").oninput = e => setPlayhead(+e.target.value, true);
  const chkTransEl = document.getElementById("chkTransformOverlay");
  if (chkTransEl) {
    chkTransEl.checked = prefs.transformOverlay !== false;
    chkTransEl.onchange = e => {
      prefs.transformOverlay = e.target.checked;
      savePrefs();
      renderMonitorFrame();
    };
  }
  const btnFitEl = document.getElementById("btnFitClip");
  if (btnFitEl) {
    btnFitEl.onclick = () => {
      const c = getSelectedVisualClipAtPlayhead() || getSelectedClip();
      if (!c) { toast("Selecione uma imagem ou vídeo primeiro."); return; }
      saveUndoSnapshot();
      Object.assign(c, { fitMode: "contain", scale: 100, scaleX: 100, scaleY: 100, posX: 0, posY: 0, rotation: 0 });
      renderAll();
      toast(`"${c.title}" ajustado à tela mantendo proporção!`);
    };
  }
  const btnFillEl = document.getElementById("btnFillClip");
  if (btnFillEl) {
    btnFillEl.onclick = () => {
      const c = getSelectedVisualClipAtPlayhead() || getSelectedClip();
      if (!c) { toast("Selecione uma imagem ou vídeo primeiro."); return; }
      saveUndoSnapshot();
      Object.assign(c, { fitMode: "stretch", scale: 100, scaleX: 100, scaleY: 100, posX: 0, posY: 0, rotation: 0 });
      renderAll();
      toast(`"${c.title}" preenchido em 4:3!`);
    };
  }
  document.getElementById("chkLoop").onchange = e => { S.loop = e.target.checked; };
  document.getElementById("btnPlay").onclick = () => togglePlay(1);
  document.getElementById("btnStop").onclick = () => stopPlayback();
  document.getElementById("btnRew").onclick = () => setPlayhead(0, false);
  document.getElementById("btnStepBack").onclick = () => setPlayhead(S.playhead - (1 / FPS), false);
  document.getElementById("btnStepFwd").onclick = () => setPlayhead(S.playhead + (1 / FPS), false);
  document.getElementById("btnPrevCut").onclick = () => {
    const cutPoints = [0, ...S.markers.map(m => m.time)];
    getAllTrackIds().forEach(tk => (S.clips[tk] || []).forEach(c => cutPoints.push(c.start, c.start + c.dur)));
    const pts = cutPoints.filter(t => t < S.playhead - 0.15).sort((a, b) => b - a);
    setPlayhead(pts[0] || 0, false);
  };
  document.getElementById("btnNextCut").onclick = () => {
    const cutPoints = [...S.markers.map(m => m.time)];
    getAllTrackIds().forEach(tk => (S.clips[tk] || []).forEach(c => cutPoints.push(c.start, c.start + c.dur)));
    const pts = cutPoints.filter(t => t > S.playhead + 0.15).sort((a, b) => a - b);
    if (pts.length) setPlayhead(pts[0], false);
  };

  // Sincronização vertical entre cabeçalhos de faixas e área de rolagem da Timeline + Zoom na Roda do Mouse focado na Agulha
  const tlScrollEl = document.getElementById("tlScroll");
  const tlHdrListEl = document.getElementById("tlHeadersList");
  if (tlScrollEl && tlHdrListEl) {
    tlScrollEl.addEventListener("scroll", () => {
      tlHdrListEl.scrollTop = tlScrollEl.scrollTop;
    });
    tlHdrListEl.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      tlScrollEl.scrollTop += ev.deltaY;
    }, { passive: false });
    tlScrollEl.addEventListener("wheel", (ev) => {
      if (ev.ctrlKey || ev.altKey) {
        ev.preventDefault();
        const curZ = Number(prefs.tlZoom) || 10;
        const step = curZ >= 12 ? 2 : (curZ >= 4 ? 1 : 0.5);
        const nextZ = ev.deltaY < 0 ? curZ + step : curZ - step;
        setTimelineZoom(nextZ, true);
      }
    }, { passive: false });
  }
  const btnExpandTl = document.getElementById("btnExpandTl");
  const tlDock = document.getElementById("timelineDock");
  if (btnExpandTl && tlDock) {
    btnExpandTl.onclick = () => {
      const exp = tlDock.classList.toggle("expanded");
      btnExpandTl.setAttribute("aria-pressed", exp ? "true" : "false");
      btnExpandTl.textContent = exp ? "Altura ▼" : "Altura ▲";
    };
  }

  // Scrubbing na régua da Linha do Tempo
  const ruler = document.getElementById("tlRuler");
  const scrubTimelineAt = clientX => {
    const area = document.getElementById("tlArea");
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const pxPerSec = Number(prefs.tlZoom) || 10;
    setPlayhead(Math.max(0, (clientX - rect.left) / pxPerSec), false);
  };
  ruler.addEventListener("pointerdown", e => {
    if (e.target.closest(".tl-marker")) return;
    ruler.setPointerCapture(e.pointerId);
    scrubTimelineAt(e.clientX);
    const mv = ev => scrubTimelineAt(ev.clientX);
    const up = () => { ruler.removeEventListener("pointermove", mv); ruler.removeEventListener("pointerup", up); };
    ruler.addEventListener("pointermove", mv); ruler.addEventListener("pointerup", up);
  });

  // Seletores Superiores e Toolbar da Linha do Tempo
  const prSel = document.getElementById("previewResSel");
  if (prSel) {
    prSel.value = String(prefs.previewRes || 1);
    prSel.onchange = e => {
      prefs.previewRes = Number(e.target.value) || 1;
      savePrefs();
      renderMonitorFrame();
      toast(`Resolução de prévia alterada para 1/${prefs.previewRes}!`);
    };
  }
  const bMesa = document.getElementById("btnMesaSom");
  if (bMesa) bMesa.onclick = () => openAudioMixerDialog();

  const chkSnapEl = document.getElementById("chkSnap");
  if (chkSnapEl) {
    chkSnapEl.checked = prefs.snap !== false;
    chkSnapEl.onchange = e => toggleSnap(e.target.checked);
  }
  const btnSnapEl = document.getElementById("btnSnapToggle");
  if (btnSnapEl) {
    btnSnapEl.onclick = () => toggleSnap();
    btnSnapEl.classList.toggle("snap-on", prefs.snap !== false);
  }
  document.getElementById("layoutSel").onchange = e => setMonitorLayout(e.target.value);
  document.getElementById("btnCloseInlineScript").onclick = () => setMonitorLayout("dual");
  document.getElementById("presetModeSel").onchange = e => {
    prefs.presetMode = e.target.value;
    if (e.target.value === "roteiro" && cur()) {
      buildTimelineFromScript(cur());
      S.sideTab = "cenas";
      renderSide();
    } else {
      createStarterFreeProject();
      S.sideTab = "bin";
      renderSide();
    }
  };
  document.getElementById("epSel").onchange = e => {
    S.curId = e.target.value;
    renderSheet();
    if (prefs.presetMode === "roteiro") buildTimelineFromScript(cur());
    renderSide();
  };
  document.getElementById("filterSel").onchange = e => { prefs.filter = e.target.value; renderMonitorFrame(); };
  document.getElementById("chkSafe").onchange = e => { prefs.safeArea = e.target.checked; renderMonitorFrame(); };
  document.getElementById("chkCC").onchange = e => { prefs.cc = e.target.checked; renderMonitorFrame(); };
  const chkFilm = document.getElementById("chkFilmstrip");
  if (chkFilm) {
    chkFilm.checked = prefs.filmstrip !== false;
    chkFilm.onchange = e => { prefs.filmstrip = e.target.checked; savePrefs(); renderTimeline(); };
  }
  const scopeModeEl = document.getElementById("scopeModeSel");
  if (scopeModeEl) {
    scopeModeEl.value = prefs.scopeMode || "video";
    scopeModeEl.onchange = e => { prefs.scopeMode = e.target.value; savePrefs(); renderMonitorFrame(); };
  }
  const tlZoomEl = document.getElementById("tlZoom");
  if (tlZoomEl) {
    tlZoomEl.value = String(Number(prefs.tlZoom) || 10);
    tlZoomEl.oninput = e => setTimelineZoom(+e.target.value, true);
  }

  // Monitor Multicâmera 4-Up (Live Switcher)
  document.querySelectorAll("[data-mccam]").forEach(q => {
    q.onclick = () => switchMulticamCam(parseInt(q.dataset.mccam, 10));
  });
  const btnMcToggleCut = document.getElementById("btnMcToggleCut");
  if (btnMcToggleCut) {
    btnMcToggleCut.onclick = () => {
      S.multicamLiveCut = !S.multicamLiveCut;
      renderMulticamFrames();
      toast(S.multicamLiveCut ? "Gravação de cortes multicâmera ATIVADA!" : "Gravação de cortes DESATIVADA.");
    };
  }

  // Inputs de arquivo de fallback
  const fMed = document.getElementById("fMediaFallback");
  if (fMed) {
    fMed.onchange = () => {
      const files = [...(fMed.files || [])];
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        const isAud = file.type.startsWith("audio/");
        const isImg = file.type.startsWith("image/");
        registerImportedFileObject({ name: file.name, url, kind: isAud ? "audio" : (isImg ? "image" : "video") }, false);
      });
      if (files.length) toast(`${files.length} arquivo(s) importado(s) para o Cesto de Mídia (Bin)!`);
    };
  }

  // Atalhos de Teclado Totalmente Personalizáveis (KEYMAP)
  window.addEventListener("keydown", e => {
    // Se o usuário clicou em "Trocar" na aba Atalhos, captura a nova tecla pressionada!
    if (S.recordingKeyAction) {
      e.preventDefault();
      e.stopPropagation();
      if (e.key === "Escape") {
        S.recordingKeyAction = null;
        renderSide();
        return;
      }
      const combo = formatKeyEvent(e);
      if (!combo) return;
      const act = S.recordingKeyAction;
      KEYMAP[act] = combo;
      S.recordingKeyAction = null;
      saveKeymap();
      setTimelineTool(S.tool);
      renderSide();
      toast(`Atalho atualizado para [${prettyKeyName(combo)}]!`);
      return;
    }

    if (e.target.matches("input, textarea, select, [contenteditable='true']")) return;

    const combo = formatKeyEvent(e);
    if (!combo) return;
    const match = (actId) => String(KEYMAP[actId] || "").toLowerCase() === combo.toLowerCase();

    // Multicâmera 4-Up Live Switcher (Teclas numéricas 1, 2, 3, 4)
    if (["1", "2", "3", "4"].includes(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const camNum = parseInt(e.key, 10);
      switchMulticamCam(camNum);
    }
    else if (match("congelarQuadro") || (e.shiftKey && (e.key === "F" || e.key === "f"))) {
      e.preventDefault();
      createFreezeFrameAtPlayhead();
    }
    else if (match("splitClip")) { e.preventDefault(); splitClipAtPlayhead(); }
    else if (match("selectAll") || combo.toLowerCase() === "ctrl+a") { e.preventDefault(); selectAllClips(); }
    else if (match("groupClips") || combo.toLowerCase() === "ctrl+g") { e.preventDefault(); groupSelectedClips(); }
    else if (match("ungroupClips") || combo.toLowerCase() === "ctrl+shift+g") { e.preventDefault(); ungroupSelectedClips(); }
    else if (match("linkClips") || combo.toLowerCase() === "ctrl+l") { e.preventDefault(); linkSelectedClips(); }
    else if (match("pasteAttributes") || combo.toLowerCase() === "ctrl+alt+v") { e.preventDefault(); openPasteAttributesDialog(); }
    else if (match("colorMatte") || combo.toLowerCase() === "shift+m") { e.preventDefault(); openColorMatteDialog(); }
    else if (combo.toLowerCase() === "ctrl+alt+r") { e.preventDefault(); openRollCrawlDesigner(); }
    else if (combo.toLowerCase() === "ctrl+alt+a") { e.preventDefault(); openRTAConsole(); }
    else if (combo.toLowerCase() === "ctrl+alt+k") { e.preventDefault(); openSmpteCalculatorDialog(); }
    else if (e.key === "Escape") { e.preventDefault(); clearClipSelection(); renderTimeline(); updateStatusBar(); }
    else if (match("duplicateClip") || combo.toLowerCase() === "ctrl+d") {
      e.preventDefault();
      if ((S.selectedClipIds && S.selectedClipIds.length > 1) || S.selectedClipId) {
        duplicateSelectedClip();
      } else {
        applyQuickCrossDissolve();
      }
    }
    else if (match("copyClip")) { e.preventDefault(); copySelectedClip(); }
    else if (match("pasteClip")) { e.preventDefault(); pasteClipAtPlayhead(); }
    else if (match("addMarker")) { e.preventDefault(); addTimelineMarker(); }
    else if (match("importMedia")) { e.preventDefault(); importMediaFiles("all", false); }
    else if (match("exportMovie")) { e.preventDefault(); openExportDialog(); }
    else if (match("undo")) { e.preventDefault(); undoEdit(); }
    else if (match("redo")) { e.preventDefault(); redoEdit(); }
    else if (match("openProject") || combo.toLowerCase() === "ctrl+o") { e.preventDefault(); openProjectDialog(); }
    else if (match("saveProjectAs") || combo.toLowerCase() === "ctrl+shift+s") { e.preventDefault(); saveCurrentProject(true); }
    else if (match("saveProject") || combo.toLowerCase() === "ctrl+s") { e.preventDefault(); saveCurrentProject(false); }
    else if (match("newSequence") || combo.toLowerCase() === "ctrl+n") { e.preventDefault(); createNewSequence(); }
    else if (combo.toLowerCase() === "ctrl+shift+n") { e.preventDefault(); openNewProjectCustomDialog(); }
    else if (match("toggleSnap") || (!e.ctrlKey && !e.altKey && !e.metaKey && (e.key === "S" || e.key === "s"))) { e.preventDefault(); toggleSnap(); }
    else if (match("clearInOut") || (e.altKey && (e.key === "X" || e.key === "x"))) { e.preventDefault(); clearTimelineInOut(); }
    else if (match("playPause")) { e.preventDefault(); togglePlay(1); }
    else if (match("shuttlePause")) { e.preventDefault(); if (S.playing) togglePlay(S.shuttleSpeed); }
    else if (match("shuttleFwd")) {
      e.preventDefault();
      const nextSpd = !S.playing ? 1 : (S.shuttleSpeed === 1 ? 2 : (S.shuttleSpeed === 2 ? 4 : 1));
      S.playing = false;
      togglePlay(nextSpd);
    }
    else if (match("shuttleRev")) { e.preventDefault(); S.playing = false; togglePlay(-1); }
    else if (match("toolSelect")) { e.preventDefault(); setTimelineTool("select"); }
    else if (match("toolTrack")) { e.preventDefault(); setTimelineTool("track"); }
    else if (match("toolRazor")) { e.preventDefault(); setTimelineTool("razor"); }
    else if (match("toolTrim")) { e.preventDefault(); setTimelineTool("trim"); }
    else if (match("toolRipple")) { e.preventDefault(); setTimelineTool("ripple"); }
    else if (match("toolRolling")) { e.preventDefault(); setTimelineTool("rolling"); }
    else if (match("toolSlip")) { e.preventDefault(); setTimelineTool("slip"); }
    else if (match("toolSlide")) { e.preventDefault(); setTimelineTool("slide"); }
    else if (match("toolHand")) { e.preventDefault(); setTimelineTool("hand"); }
    else if (match("markIn")) {
      e.preventDefault();
      if (e.target.closest("#timelineDock, #tlArea, #tlRuler, #tlTracks") || !S.srcItem) {
        setTimelineIn();
      } else {
        const b = document.getElementById("btnSrcIn");
        if (b) b.click();
        toast(`Entrada IN do clipe marcada em ${mmss(S.srcIn)}`);
      }
    }
    else if (match("markOut")) {
      e.preventDefault();
      if (e.target.closest("#timelineDock, #tlArea, #tlRuler, #tlTracks") || !S.srcItem) {
        setTimelineOut();
      } else {
        const b = document.getElementById("btnSrcOut");
        if (b) b.click();
        toast(`Saída OUT do clipe marcada em ${mmss(S.srcOut)}`);
      }
    }
    else if (match("insertClip") || (!e.ctrlKey && !e.altKey && e.key === ",")) { e.preventDefault(); insertSourceIntoTimeline(undefined, "insert"); }
    else if (match("overwriteClip") || (!e.ctrlKey && !e.altKey && e.key === ".")) { e.preventDefault(); insertSourceIntoTimeline(undefined, "overwrite"); }
    else if (match("rippleDelete")) {
      e.preventDefault();
      if (S.selectedGap) rippleDeleteGap(S.selectedGap, true);
      else deleteSelectedClip(true);
    }
    else if (match("deleteClip") || e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      if (S.selectedGap) rippleDeleteGap(S.selectedGap, e.shiftKey);
      else deleteSelectedClip(e.shiftKey);
    }
    else if (match("stepBack") || (e.shiftKey && e.key === "ArrowLeft")) { e.preventDefault(); setPlayhead(S.playhead - (e.shiftKey ? 1 : 1 / FPS), false); }
    else if (match("stepFwd") || (e.shiftKey && e.key === "ArrowRight")) { e.preventDefault(); setPlayhead(S.playhead + (e.shiftKey ? 1 : 1 / FPS), false); }
    else if (match("prevCut")) { e.preventDefault(); document.getElementById("btnPrevCut").click(); }
    else if (match("nextCut")) { e.preventDefault(); document.getElementById("btnNextCut").click(); }
    else if (e.key === "+" || e.key === "=") { e.preventDefault(); setTimelineZoom((Number(prefs.tlZoom) || 10) + 2, true); }
    else if (e.key === "-" || e.key === "_") { e.preventDefault(); setTimelineZoom((Number(prefs.tlZoom) || 10) - 2, true); }
    else if (e.key === "Home") { e.preventDefault(); setPlayhead(0, false); }
    else if (e.altKey && (e.key === "F4" || e.keyCode === 115)) { e.preventDefault(); promptCloseApp(); }
  });

  // Salvamento Automático (Autosave a cada 60s) e Recuperação de Quedas de Energia
  setInterval(autoSaveProject, 60000);
  setTimeout(checkCrashRecovery, 800);

  if (window.editorNative && typeof window.editorNative.onRequestClose === "function") {
    window.editorNative.onRequestClose(() => {
      promptCloseApp();
    });
  }

  window.addEventListener("beforeunload", (e) => {
    localStorage.setItem("varguelia.scripteditor.session_unclean", "0");
    if (S.isDirty) {
      e.preventDefault();
      e.returnValue = "Existem alterações não salvas no projeto. Deseja realmente sair?";
    }
  });

  setupSplitters();
  setupPanelDetaching();

  // Binda botões da bancada MDI limpa de espera
  const mdiWelcome = document.getElementById("mdiBtnOpenWelcome");
  if (mdiWelcome) mdiWelcome.onclick = () => openWelcomeDialog();
  const mdiNew = document.getElementById("mdiBtnNewProj");
  if (mdiNew) mdiNew.onclick = () => { revealProjectWorkspace(); openNewProjectCustomDialog(); };
  const mdiOpen = document.getElementById("mdiBtnOpenProj");
  if (mdiOpen) mdiOpen.onclick = () => { revealProjectWorkspace(); openProjectDialog(); };

  await loadFromScriptRoom(true);
  createStarterFreeProject();
  if (prefs.showWelcome !== false) {
    hideProjectWorkspace();
    setTimeout(openWelcomeDialog, 400);
  } else {
    revealProjectWorkspace();
  }
  setTimeout(autoCheckForUpdates, 6000);
}

window.addEventListener("DOMContentLoaded", boot);
