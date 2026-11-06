// ScriptEditor (edição 95) — Processo principal do Electron.
// Ilha de edição não-linear de vídeo estilo 1995 integrada diretamente ao ScriptRoom.
// Lê e sincroniza os roteiros de Documentos\ScriptRoom e salva os projetos de montagem em Documentos\ScriptEditor.

const { app, BrowserWindow, ipcMain, dialog, shell, Menu, net } = require("electron");
const path = require("path");
const fs = require("fs");
const { pathToFileURL, fileURLToPath } = require("url");
const { spawn, execFileSync } = require("child_process");

app.setPath("userData", path.join(app.getPath("appData"), "ScriptEditor 95"));

const COLECOES_EDITOR = ["projetos", "fitas", "notas"];
const COLECOES_SR = ["roteiros", "personagens", "series", "notas", "versoes"];
const ID_OK = /^[A-Za-z0-9_.-]{1,120}$/;

let DATA_EDITOR = "";
let DATA_SR = "";
let win = null;
let splash = null;
let splashPronto = false;
let mainPronta = false;
let srWatcher = null;

function inicializarPastas() {
  DATA_EDITOR = path.join(app.getPath("documents"), "ScriptEditor");
  for (const c of COLECOES_EDITOR) {
    fs.mkdirSync(path.join(DATA_EDITOR, c), { recursive: true });
  }
  fs.mkdirSync(path.join(DATA_EDITOR, "exportados"), { recursive: true });

  // Localiza a pasta do ScriptRoom (ou Sala de Roteiro 95)
  const srNova = path.join(app.getPath("documents"), "ScriptRoom");
  const srAntiga = path.join(app.getPath("documents"), "Sala de Roteiro 95");
  DATA_SR = fs.existsSync(srNova) ? srNova : (fs.existsSync(srAntiga) ? srAntiga : srNova);

  for (const c of COLECOES_SR) {
    fs.mkdirSync(path.join(DATA_SR, c), { recursive: true });
  }

  // Se não houver nenhum roteiro ainda em Documentos\ScriptRoom\roteiros, popula com o seed
  const dirRoteiros = path.join(DATA_SR, "roteiros");
  const seedDir = path.join(__dirname, "app", "seed");
  if (fs.existsSync(seedDir)) {
    const existentes = fs.readdirSync(dirRoteiros).filter(f => f.endsWith(".json"));
    if (existentes.length === 0) {
      for (const f of fs.readdirSync(seedDir)) {
        if (f.endsWith(".json")) {
          fs.copyFileSync(path.join(seedDir, f), path.join(dirRoteiros, f));
        }
      }
    }
  }

  iniciarMonitorScriptRoom();
}

function iniciarMonitorScriptRoom() {
  if (srWatcher) {
    try { srWatcher.close(); } catch (_e) {}
    srWatcher = null;
  }
  const dirRoteiros = path.join(DATA_SR, "roteiros");
  if (!fs.existsSync(dirRoteiros)) return;

  let debounceTimer = null;
  try {
    srWatcher = fs.watch(dirRoteiros, (_eventType, filename) => {
      if (!filename || !filename.endsWith(".json") || filename.endsWith(".tmp")) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (win && !win.isDestroyed()) {
          win.webContents.send("sr:changed", { id: filename.slice(0, -5) });
        }
      }, 220);
    });
  } catch (err) {
    console.error("Aviso: monitor de pasta do ScriptRoom indisponível:", err.message);
  }
}

function lerColecaoDir(baseDir, colecao) {
  const dir = path.join(baseDir, colecao);
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    try {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      out.push({ id: f.slice(0, -5), data: JSON.parse(raw) });
    } catch (err) {
      console.error("Arquivo JSON ignorado:", f, err.message);
    }
  }
  return out;
}

function gravarAtomico(baseDir, colecao, id, data) {
  if (!ID_OK.test(String(id))) throw new Error("Identificador de arquivo inválido");
  const dir = path.join(baseDir, colecao);
  fs.mkdirSync(dir, { recursive: true });
  const alvo = path.join(dir, id + ".json");
  const tmp = alvo + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 1), "utf8");
  fs.renameSync(tmp, alvo);
  return true;
}

/* ---------- IPC: Banco de Projetos do ScriptEditor ---------- */
ipcMain.handle("db:readAll", (_e, colecao) => {
  if (!COLECOES_EDITOR.includes(colecao)) throw new Error("Coleção inválida");
  return lerColecaoDir(DATA_EDITOR, colecao);
});

ipcMain.handle("db:write", (_e, colecao, id, data) => {
  if (!COLECOES_EDITOR.includes(colecao)) throw new Error("Coleção inválida");
  return gravarAtomico(DATA_EDITOR, colecao, id, data);
});

ipcMain.handle("db:remove", (_e, colecao, id) => {
  if (!COLECOES_EDITOR.includes(colecao) || !ID_OK.test(String(id))) return false;
  const alvo = path.join(DATA_EDITOR, colecao, id + ".json");
  if (!fs.existsSync(alvo)) return false;
  const lix = path.join(DATA_EDITOR, ".lixeira");
  fs.mkdirSync(lix, { recursive: true });
  fs.renameSync(alvo, path.join(lix, `${colecao}~${id}~${Date.now()}.json`));
  return true;
});

/* ---------- IPC: Integração Direta com o ScriptRoom ---------- */
ipcMain.handle("sr:readAll", () => {
  const roteiros = lerColecaoDir(DATA_SR, "roteiros");
  const personagens = lerColecaoDir(DATA_SR, "personagens");
  const series = lerColecaoDir(DATA_SR, "series");
  const notas = lerColecaoDir(DATA_SR, "notas");
  return {
    pasta: DATA_SR,
    roteiros,
    personagens,
    series,
    notas
  };
});

ipcMain.handle("sr:writeRoteiro", (_e, id, data) => {
  if (!ID_OK.test(String(id))) throw new Error("ID de roteiro inválido");
  return gravarAtomico(DATA_SR, "roteiros", id, data);
});

ipcMain.handle("sr:openFolder", () => {
  shell.openPath(DATA_SR);
  return true;
});

ipcMain.handle("sr:launchApp", () => {
  // Procura o executável instalado do ScriptRoom ou o projeto local
  const candidatos = [
    path.join(app.getPath("home"), "AppData", "Local", "Programs", "ScriptRoom", "ScriptRoom.exe"),
    path.join(app.getPath("home"), "AppData", "Local", "Programs", "sala-de-roteiro-95", "ScriptRoom.exe"),
    path.join(app.getPath("downloads"), "sala-de-roteiro-95", "dist", "win-unpacked", "ScriptRoom.exe")
  ];
  for (const exe of candidatos) {
    if (fs.existsSync(exe)) {
      spawn(exe, [], { detached: true, stdio: "ignore" }).unref();
      return { ok: true, mode: "exe", path: exe };
    }
  }
  shell.openPath(DATA_SR);
  return { ok: true, mode: "folder", path: DATA_SR };
});

/* ---------- IPC: Importação de Mídia (Vídeo, Áudio, Imagem, Roteiros) ---------- */
ipcMain.handle("media:pick", async (e, tipo) => {
  const dono = BrowserWindow.fromWebContents(e.sender) || win;
  const filters = [];
  if (tipo === "audio") {
    filters.push({ name: "Áudio Digital (.WAV, .MP3, .OGG, .M4A)", extensions: ["wav", "mp3", "ogg", "m4a", "flac", "aac"] });
  } else if (tipo === "video") {
    filters.push({ name: "Fitas de Vídeo e Imagem (.MP4, .WEBM, .AVI, .MOV, .MKV, .JPG, .PNG, .BMP)", extensions: ["mp4", "webm", "avi", "mov", "mkv", "m4v", "mpg", "mpeg", "jpg", "jpeg", "png", "bmp", "gif"] });
  } else {
    filters.push(
      { name: "Todas as Mídias de Edição (Vídeo, Áudio, Imagem)", extensions: ["mp4", "webm", "avi", "mov", "mkv", "mpg", "wav", "mp3", "ogg", "m4a", "jpg", "jpeg", "png", "bmp", "gif"] },
      { name: "Vídeo (.MP4, .WEBM, .AVI, .MOV)", extensions: ["mp4", "webm", "avi", "mov", "mkv", "mpg"] },
      { name: "Áudio (.WAV, .MP3, .OGG)", extensions: ["wav", "mp3", "ogg", "m4a", "flac"] },
      { name: "Cartelas e Imagens (.BMP, .JPG, .PNG)", extensions: ["bmp", "jpg", "jpeg", "png", "gif"] }
    );
  }

  const r = await dialog.showOpenDialog(dono, {
    title: "Importar Fita / Arquivo de Mídia para o Bin",
    properties: ["openFile", "multiSelections"],
    filters
  });

  if (r.canceled || !r.filePaths.length) return [];
  return r.filePaths.map(fp => {
    let size = 0;
    try { size = fs.statSync(fp).size; } catch (_e) {}
    const ext = path.extname(fp).toLowerCase().slice(1);
    const isAudio = ["wav", "mp3", "ogg", "m4a", "flac", "aac"].includes(ext);
    const isImage = ["bmp", "jpg", "jpeg", "png", "gif", "webp"].includes(ext);
    return {
      name: path.basename(fp),
      path: fp,
      url: pathToFileURL(fp).href,
      size,
      ext,
      kind: isAudio ? "audio" : (isImage ? "image" : "video")
    };
  });
});

ipcMain.handle("script:pickFile", async (e) => {
  const dono = BrowserWindow.fromWebContents(e.sender) || win;
  const r = await dialog.showOpenDialog(dono, {
    title: "Importar Roteiro Externo (.JSON, .ROT, .FDX, .FOUNTAIN, .TXT)",
    defaultPath: path.join(DATA_SR, "roteiros"),
    properties: ["openFile"],
    filters: [
      { name: "Roteiros ScriptRoom / Final Draft / Fountain", extensions: ["json", "rot", "fdx", "fountain", "txt"] }
    ]
  });
  if (r.canceled || !r.filePaths.length) return null;
  const fp = r.filePaths[0];
  const content = fs.readFileSync(fp, "utf8");
  return {
    name: path.basename(fp),
    path: fp,
    ext: path.extname(fp).toLowerCase().slice(1),
    content
  };
});

/* ---------- IPC: Manipulação de Projetos (.PPJ) e Legendas (.SRT) ---------- */
ipcMain.handle("project:pickFile", async (e) => {
  const dono = BrowserWindow.fromWebContents(e.sender) || win;
  const r = await dialog.showOpenDialog(dono, {
    title: "Abrir Projeto do ScriptEditor (.PPJ, .JSON)",
    defaultPath: path.join(DATA_EDITOR, "projetos"),
    properties: ["openFile"],
    filters: [
      { name: "Projetos ScriptEditor / Premiere (.PPJ, .JSON)", extensions: ["ppj", "json"] },
      { name: "Todos os Arquivos", extensions: ["*"] }
    ]
  });
  if (r.canceled || !r.filePaths.length) return null;
  const fp = r.filePaths[0];
  return {
    name: path.basename(fp),
    path: fp,
    content: fs.readFileSync(fp, "utf8")
  };
});

ipcMain.handle("project:pickSavePath", async (e, nomePadrao) => {
  const dono = BrowserWindow.fromWebContents(e.sender) || win;
  const safeName = String(nomePadrao || "PROJETO_01.PPJ").replace(/[\\/:*?"<>|]/g, "_");
  const r = await dialog.showSaveDialog(dono, {
    title: "Salvar Projeto Como (ScriptEditor 95)",
    defaultPath: path.join(DATA_EDITOR, "projetos", safeName),
    filters: [
      { name: "Projeto ScriptEditor (.PPJ)", extensions: ["ppj"] },
      { name: "Projeto JSON (.JSON)", extensions: ["json"] }
    ]
  });
  if (r.canceled || !r.filePath) return null;
  return r.filePath;
});

ipcMain.handle("file:readText", async (_e, filePath) => {
  if (!filePath || !fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
});

ipcMain.handle("srt:pickFile", async (e) => {
  const dono = BrowserWindow.fromWebContents(e.sender) || win;
  const r = await dialog.showOpenDialog(dono, {
    title: "Importar Legendas SubRip (.SRT)",
    properties: ["openFile"],
    filters: [
      { name: "Arquivos de Legendas SubRip (.SRT)", extensions: ["srt"] },
      { name: "Arquivos de Texto (.TXT)", extensions: ["txt"] }
    ]
  });
  if (r.canceled || !r.filePaths.length) return null;
  const fp = r.filePaths[0];
  return {
    name: path.basename(fp),
    path: fp,
    content: fs.readFileSync(fp, "utf8")
  };
});

ipcMain.handle("file:saveAs", async (e, nomePadrao, bytes, filtros) => {
  const dono = BrowserWindow.fromWebContents(e.sender) || win;
  const safeName = String(nomePadrao || "EXPORTACAO_MASTER").replace(/[\\/:*?"<>|]/g, "_");
  const r = await dialog.showSaveDialog(dono, {
    title: "Exportar da Ilha de Edição",
    defaultPath: path.join(DATA_EDITOR, "exportados", safeName),
    filters: filtros || [
      { name: "Todos os arquivos", extensions: ["*"] }
    ]
  });
  if (r.canceled || !r.filePath) return { status: "declined" };
  fs.writeFileSync(r.filePath, Buffer.from(bytes));
  return { status: "saved", path: r.filePath };
});

ipcMain.handle("file:getDefaultExportDir", () => {
  return path.join(DATA_EDITOR, "exportados");
});

ipcMain.handle("file:pickSavePath", async (e, nomePadrao, filtros, caminhoAtual) => {
  const dono = BrowserWindow.fromWebContents(e.sender) || win;
  const safeName = String(nomePadrao || "FILME_MASTER_95.mp4").replace(/[\\/:*?"<>|]/g, "_");
  let defPath = path.join(DATA_EDITOR, "exportados", safeName);
  if (caminhoAtual && typeof caminhoAtual === "string") {
    const dir = path.dirname(caminhoAtual);
    if (fs.existsSync(dir)) {
      defPath = path.join(dir, safeName);
    }
  }
  const r = await dialog.showSaveDialog(dono, {
    title: "Escolher Onde Salvar o Vídeo Exportado",
    defaultPath: defPath,
    filters: filtros || [
      { name: "Todos os arquivos", extensions: ["*"] }
    ]
  });
  if (r.canceled || !r.filePath) return { status: "declined" };
  return { status: "picked", path: r.filePath };
});

ipcMain.handle("file:writeToPath", async (_e, filePath, bytes) => {
  if (!filePath || typeof filePath !== "string") throw new Error("Caminho de destino inválido");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.from(bytes));
  return { status: "saved", path: filePath };
});

ipcMain.handle("file:showInFolder", (_e, filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    shell.showItemInFolder(filePath);
    return true;
  }
  shell.openPath(path.join(DATA_EDITOR, "exportados"));
  return true;
});

/* ---------- IPC: Motor de Exportação de Vídeo Real com Duração Exata e Mixagem de Áudio ---------- */
let cachedFfmpegPath = undefined;
function findFfmpegExecutable() {
  if (cachedFfmpegPath !== undefined) return cachedFfmpegPath;

  const candidates = [
    path.join(process.resourcesPath || "", "ffmpeg.exe"),
    path.join(__dirname, "build", "ffmpeg.exe"),
    "C:\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe"
  ];

  // Procura na pasta de pacotes do WinGet (ex.: Gyan.FFmpeg.Essentials)
  try {
    const wingetDir = path.join(app.getPath("home"), "AppData", "Local", "Microsoft", "WinGet", "Packages");
    if (fs.existsSync(wingetDir)) {
      for (const pkg of fs.readdirSync(wingetDir)) {
        if (/ffmpeg/i.test(pkg)) {
          const pkgPath = path.join(wingetDir, pkg);
          const subDirs = fs.readdirSync(pkgPath);
          for (const sub of subDirs) {
            const binCandidate = path.join(pkgPath, sub, "bin", "ffmpeg.exe");
            if (fs.existsSync(binCandidate)) candidates.unshift(binCandidate);
          }
          const directCandidate = path.join(pkgPath, "ffmpeg.exe");
          if (fs.existsSync(directCandidate)) candidates.unshift(directCandidate);
        }
      }
    }
  } catch (_e) {}

  for (const c of candidates) {
    if (c && fs.existsSync(c)) {
      cachedFfmpegPath = c;
      return c;
    }
  }

  try {
    const out = execFileSync("where.exe", ["ffmpeg"], { encoding: "utf8", timeout: 3000, windowsHide: true });
    const firstLine = String(out || "").split(/\r?\n/).map(s => s.trim()).find(Boolean);
    if (firstLine && fs.existsSync(firstLine)) {
      cachedFfmpegPath = firstLine;
      return firstLine;
    }
  } catch (_e) {}

  cachedFfmpegPath = null;
  return null;
}

function runFfmpegAsync(ffmpegBin, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegBin, args, { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    let errLog = "";
    proc.stderr.on("data", chunk => { errLog += chunk.toString(); });
    proc.on("error", err => reject(err));
    proc.on("close", code => {
      if (code === 0) resolve(true);
      else reject(new Error(`FFmpeg saiu com código ${code}: ${errLog.slice(-300)}`));
    });
  });
}

function writeWavFileFromInt16(wavPath, pcmInt16, sampleRate = 44100, channels = 2) {
  const dataByteLen = pcmInt16.byteLength;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataByteLen, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (PCM)
  header.writeUInt16LE(1, 20);  // AudioFormat = 1 (PCM)
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * channels * 2, 28); // ByteRate
  header.writeUInt16LE(channels * 2, 32); // BlockAlign
  header.writeUInt16LE(16, 34); // BitsPerSample
  header.write("data", 36);
  header.writeUInt32LE(dataByteLen, 40);

  const pcmBuf = Buffer.from(pcmInt16.buffer, pcmInt16.byteOffset, pcmInt16.byteLength);
  fs.writeFileSync(wavPath, Buffer.concat([header, pcmBuf]));
  return Buffer.concat([header, pcmBuf]);
}

function synthFoleyIntoMix(mixBuf, totalSamplesPerCh, preset, offsetSec, durSec, volScalar) {
  const sr = 44100;
  const startSample = Math.max(0, Math.round(offsetSec * sr));
  const lenSamples = Math.min(totalSamplesPerCh - startSample, Math.round(Math.min(1.5, durSec || 0.5) * sr));
  if (lenSamples <= 0) return;

  for (let i = 0; i < lenSamples; i++) {
    const t = i / sr;
    let val = 0;
    if (preset === "bip" || preset === "claquete") {
      if (t < 0.09) {
        const freq = preset === "bip" ? 1000 : 1600;
        const env = Math.exp(-t * 35);
        val = (preset === "bip" ? Math.sin(2 * Math.PI * freq * t) : (Math.sin(2 * Math.PI * freq * t) >= 0 ? 1 : -1)) * 0.35 * env;
      }
    } else if (preset === "alarme") {
      if (t < 0.65) {
        const freq = 620 + (880 - 620) * (t / 0.35);
        val = ((t * freq) % 1 * 2 - 1) * 0.25 * Math.exp(-t * 3.5);
      }
    } else if (preset === "tiro" || preset === "impacto") {
      if (t < 0.3) {
        val = (Math.random() * 2 - 1) * 0.6 * Math.exp(-t * 18);
      }
    } else {
      // Acorde / Synth 95
      const env = Math.exp(-t * 2.2);
      val = (Math.sin(2 * Math.PI * 110 * t) + Math.sin(2 * Math.PI * 164.8 * t) + Math.sin(2 * Math.PI * 220 * t)) * 0.09 * env;
    }
    const sampleInt = Math.round(val * volScalar * 32767);
    const idx = (startSample + i) * 2;
    mixBuf[idx] += sampleInt;
    mixBuf[idx + 1] += sampleInt;
  }
}

// Fallback nativo em Node.js puro (RIFF AVI MJPEG + Áudio PCM) caso FFmpeg não exista no computador
function writePureNodeAviWithAudio(targetPath, framesDir, frameCount, pcmInt16, fps, width, height) {
  const frameBuffers = [];
  for (let i = 0; i < frameCount; i++) {
    const fp = path.join(framesDir, "f_" + String(i).padStart(6, "0") + ".jpg");
    if (fs.existsSync(fp)) {
      let b = fs.readFileSync(fp);
      if (b.length % 2 === 1) b = Buffer.concat([b, Buffer.from([0])]);
      frameBuffers.push(b);
    }
  }
  const numFrames = frameBuffers.length || 1;
  const usecPerFrame = Math.round(1000000 / (fps || 30));
  const pcmBuf = Buffer.from(pcmInt16.buffer, pcmInt16.byteOffset, pcmInt16.byteLength);
  const pcmAligned = pcmBuf.length % 2 === 1 ? Buffer.concat([pcmBuf, Buffer.from([0])]) : pcmBuf;

  // Monta chunks movi (00dc para cada quadro JPEG + 01wb para áudio PCM)
  const moviChunks = [];
  const idxEntries = [];
  let moviOffset = 4; // depois de 'movi'

  for (let i = 0; i < frameBuffers.length; i++) {
    const fb = frameBuffers[i];
    const chHdr = Buffer.alloc(8);
    chHdr.write("00dc", 0);
    chHdr.writeUInt32LE(fb.length, 4);
    moviChunks.push(chHdr, fb);
    const idx = Buffer.alloc(16);
    idx.write("00dc", 0);
    idx.writeUInt32LE(0x10, 4); // AVIIF_KEYFRAME
    idx.writeUInt32LE(moviOffset, 8);
    idx.writeUInt32LE(fb.length, 12);
    idxEntries.push(idx);
    moviOffset += 8 + fb.length;
  }

  if (pcmAligned.length > 0) {
    const audHdr = Buffer.alloc(8);
    audHdr.write("01wb", 0);
    audHdr.writeUInt32LE(pcmAligned.length, 4);
    moviChunks.push(audHdr, pcmAligned);
    const idx = Buffer.alloc(16);
    idx.write("01wb", 0);
    idx.writeUInt32LE(0x10, 4);
    idx.writeUInt32LE(moviOffset, 8);
    idx.writeUInt32LE(pcmAligned.length, 12);
    idxEntries.push(idx);
    moviOffset += 8 + pcmAligned.length;
  }

  const moviData = Buffer.concat(moviChunks);
  const idx1Data = Buffer.concat(idxEntries);

  // Cabeçalho hdrl com 2 streams (vids MJPG + auds PCM)
  const avih = Buffer.alloc(56);
  avih.writeUInt32LE(usecPerFrame, 0);
  avih.writeUInt32LE(1000000, 4);
  avih.writeUInt32LE(0, 8);
  avih.writeUInt32LE(0x110, 12); // AVIF_HASINDEX | AVIF_ISINTERLEAVED
  avih.writeUInt32LE(numFrames, 16);
  avih.writeUInt32LE(0, 20);
  avih.writeUInt32LE(2, 24); // 2 streams
  avih.writeUInt32LE(width * height * 3, 28);
  avih.writeUInt32LE(width, 32);
  avih.writeUInt32LE(height, 36);

  const strhV = Buffer.alloc(56);
  strhV.write("vids", 0);
  strhV.write("MJPG", 4);
  strhV.writeUInt32LE(1, 20);
  strhV.writeUInt32LE(fps || 30, 24);
  strhV.writeUInt32LE(numFrames, 32);
  strhV.writeUInt32LE(width * height * 3, 36);
  strhV.writeUInt16LE(width, 52);
  strhV.writeUInt16LE(height, 54);

  const strfV = Buffer.alloc(40);
  strfV.writeUInt32LE(40, 0);
  strfV.writeInt32LE(width, 4);
  strfV.writeInt32LE(height, 8);
  strfV.writeUInt16LE(1, 12);
  strfV.writeUInt16LE(24, 14);
  strfV.write("MJPG", 16);
  strfV.writeUInt32LE(width * height * 3, 20);

  const strhA = Buffer.alloc(56);
  strhA.write("auds", 0);
  strhA.writeUInt32LE(1, 20);
  strhA.writeUInt32LE(44100, 24);
  strhA.writeUInt32LE(Math.floor(pcmAligned.length / 4), 32);
  strhA.writeUInt32LE(176400, 36);
  strhA.writeUInt32LE(4, 44);

  const strfA = Buffer.alloc(18);
  strfA.writeUInt16LE(1, 0); // PCM
  strfA.writeUInt16LE(2, 2); // Stereo
  strfA.writeUInt32LE(44100, 4);
  strfA.writeUInt32LE(176400, 8);
  strfA.writeUInt16LE(4, 12);
  strfA.writeUInt16LE(16, 14);
  strfA.writeUInt16LE(0, 16);

  const makeChunk = (fourcc, data) => {
    const h = Buffer.alloc(8);
    h.write(fourcc, 0);
    h.writeUInt32LE(data.length, 4);
    return Buffer.concat([h, data]);
  };
  const makeList = (listType, chunks) => {
    const body = Buffer.concat([Buffer.from(listType, "ascii"), ...chunks]);
    const h = Buffer.alloc(8);
    h.write("LIST", 0);
    h.writeUInt32LE(body.length, 4);
    return Buffer.concat([h, body]);
  };

  const strlV = makeList("strl", [makeChunk("strh", strhV), makeChunk("strf", strfV)]);
  const strlA = makeList("strl", [makeChunk("strh", strhA), makeChunk("strf", strfA)]);
  const hdrl = makeList("hdrl", [makeChunk("avih", avih), strlV, strlA]);
  const movi = makeList("movi", [moviData]);
  const idx1 = makeChunk("idx1", idx1Data);
  const riffBody = Buffer.concat([Buffer.from("AVI ", "ascii"), hdrl, movi, idx1]);
  const riffHdr = Buffer.alloc(8);
  riffHdr.write("RIFF", 0);
  riffHdr.writeUInt32LE(riffBody.length, 4);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, Buffer.concat([riffHdr, riffBody]));
}

let activeExportSession = null;

ipcMain.handle("export:begin", async (_e, opts) => {
  if (activeExportSession && activeExportSession.tempDir) {
    try { fs.rmSync(activeExportSession.tempDir, { recursive: true, force: true }); } catch (_err) {}
  }
  const tempDir = path.join(app.getPath("temp"), "se95_export_" + Date.now());
  const framesDir = path.join(tempDir, "frames");
  fs.mkdirSync(framesDir, { recursive: true });
  activeExportSession = {
    tempDir,
    framesDir,
    frameIndex: 0,
    opts: opts || {}
  };
  return { ok: true };
});

ipcMain.handle("export:pushFrames", async (_e, base64List) => {
  if (!activeExportSession || !Array.isArray(base64List)) return { ok: false };
  for (const b64 of base64List) {
    const fname = "f_" + String(activeExportSession.frameIndex++).padStart(6, "0") + ".jpg";
    const buf = Buffer.from(b64, "base64");
    fs.writeFileSync(path.join(activeExportSession.framesDir, fname), buf);
  }
  return { ok: true, count: activeExportSession.frameIndex };
});

ipcMain.handle("export:cancel", async () => {
  if (activeExportSession && activeExportSession.tempDir) {
    try { fs.rmSync(activeExportSession.tempDir, { recursive: true, force: true }); } catch (_err) {}
  }
  activeExportSession = null;
  return { ok: true };
});

ipcMain.handle("export:finish", async () => {
  if (!activeExportSession) throw new Error("Nenhuma sessão de exportação ativa");
  const session = activeExportSession;
  activeExportSession = null;

  const { tempDir, framesDir, frameIndex, opts } = session;
  const targetPath = opts.targetPath;
  const fmt = String(opts.fmt || "mp4").toLowerCase();
  const fps = Number(opts.fps) || 30;
  const width = Number(opts.width) || 640;
  const height = Number(opts.height) || 480;
  const bitrate = Number(opts.bitrate) || 6000000;
  const totalDurSec = Math.max(0.5, Number(opts.totalDurSec) || (frameIndex / fps));
  const ffmpegExe = findFfmpegExecutable();

  try {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });

    // 1. Monta a trilha de áudio Master (44.1kHz Stereo 16-bit PCM) misturando todas as faixas ativas
    const sr = 44100;
    const totalSamplesPerCh = Math.max(sr, Math.ceil(totalDurSec * sr));
    const mixBuf = new Int32Array(totalSamplesPerCh * 2);

    const audioClips = Array.isArray(opts.audioClips) ? opts.audioClips : [];
    for (let i = 0; i < audioClips.length; i++) {
      const ac = audioClips[i];
      const volScalar = Math.max(0, Math.min(2, (ac.volume == null ? 100 : Number(ac.volume)) / 100));
      if (volScalar <= 0.001) continue;

      if (ac.sfxPreset) {
        synthFoleyIntoMix(mixBuf, totalSamplesPerCh, ac.sfxPreset, Number(ac.offsetSec) || 0, Number(ac.durSec) || 1, volScalar);
        continue;
      }

      if (!ffmpegExe) continue;

      let srcMediaPath = null;
      if (ac.filePath && fs.existsSync(ac.filePath)) {
        srcMediaPath = ac.filePath;
      } else if (ac.mediaUrl && String(ac.mediaUrl).startsWith("file://")) {
        try {
          const p = fileURLToPath(ac.mediaUrl);
          if (fs.existsSync(p)) srcMediaPath = p;
        } catch (_err) {}
      } else if (ac.audioBytes) {
        const tmpIn = path.join(tempDir, `src_aud_${i}.bin`);
        fs.writeFileSync(tmpIn, Buffer.from(ac.audioBytes));
        srcMediaPath = tmpIn;
      }

      if (!srcMediaPath) continue;

      const rawPcmPath = path.join(tempDir, `pcm_${i}.raw`);
      const inPt = Math.max(0, Number(ac.inPointSec) || 0);
      const dur = Math.max(0.1, Number(ac.durSec) || 1);
      const spd = Math.max(0.5, Math.min(2.0, Number(ac.speed) || 1));

      try {
        const ffArgs = [
          "-y",
          "-ss", String(inPt),
          "-t", String(dur),
          "-i", srcMediaPath,
          "-vn"
        ];
        if (Math.abs(spd - 1) > 0.03) {
          ffArgs.push("-af", `atempo=${spd}`);
        }
        ffArgs.push("-ac", "2", "-ar", String(sr), "-f", "s16le", rawPcmPath);
        await runFfmpegAsync(ffmpegExe, ffArgs);

        if (fs.existsSync(rawPcmPath)) {
          const rawBuf = fs.readFileSync(rawPcmPath);
          const samplesCount = Math.floor(rawBuf.length / 2);
          const startIdx = Math.max(0, Math.round((Number(ac.offsetSec) || 0) * sr)) * 2;
          const maxCopy = Math.min(samplesCount, mixBuf.length - startIdx);
          for (let s = 0; s < maxCopy; s++) {
            const sample = rawBuf.readInt16LE(s * 2);
            mixBuf[startIdx + s] += Math.round(sample * volScalar);
          }
        }
      } catch (_audioErr) {
        // Se for um vídeo sem faixa de áudio embutida, ignora silenciosamente
      }
    }

    const pcmInt16 = new Int16Array(totalSamplesPerCh * 2);
    for (let i = 0; i < mixBuf.length; i++) {
      const v = mixBuf[i];
      pcmInt16[i] = v > 32767 ? 32767 : (v < -32768 ? -32768 : v);
    }
    const masterWavPath = path.join(tempDir, "master_audio.wav");
    writeWavFileFromInt16(masterWavPath, pcmInt16, sr, 2);

    // 2. Codifica o arquivo de vídeo final no formato escolhido com duração exata e tabela de busca completa
    if (ffmpegExe && frameIndex > 0) {
      const inputPattern = path.join(framesDir, "f_%06d.jpg");
      const baseArgs = [
        "-y",
        "-framerate", String(fps),
        "-i", inputPattern,
        "-i", masterWavPath
      ];

      if (fmt === "avi") {
        baseArgs.push(
          "-c:v", "mpeg4",
          "-vtag", "xvid",
          "-b:v", String(bitrate),
          "-pix_fmt", "yuv420p",
          "-c:a", "libmp3lame",
          "-b:a", "192k",
          "-shortest",
          "-f", "avi",
          targetPath
        );
      } else if (fmt === "webm") {
        baseArgs.push(
          "-c:v", "libvpx-vp9",
          "-b:v", String(bitrate),
          "-pix_fmt", "yuv420p",
          "-deadline", "realtime",
          "-cpu-used", "4",
          "-c:a", "libopus",
          "-b:a", "160k",
          "-shortest",
          "-f", "webm",
          targetPath
        );
      } else if (fmt === "mov") {
        baseArgs.push(
          "-c:v", "libx264",
          "-preset", "veryfast",
          "-pix_fmt", "yuv420p",
          "-b:v", String(bitrate),
          "-c:a", "aac",
          "-b:a", "192k",
          "-shortest",
          "-movflags", "+faststart",
          "-f", "mov",
          targetPath
        );
      } else if (fmt === "mkv") {
        baseArgs.push(
          "-c:v", "libx264",
          "-preset", "veryfast",
          "-pix_fmt", "yuv420p",
          "-b:v", String(bitrate),
          "-c:a", "aac",
          "-b:a", "192k",
          "-shortest",
          "-f", "matroska",
          targetPath
        );
      } else {
        // Padrão .MP4 H.264 + AAC com +faststart (compatível com todos os players do Windows, TV e Web)
        baseArgs.push(
          "-c:v", "libx264",
          "-preset", "veryfast",
          "-pix_fmt", "yuv420p",
          "-b:v", String(bitrate),
          "-c:a", "aac",
          "-b:a", "192k",
          "-shortest",
          "-movflags", "+faststart",
          "-f", "mp4",
          targetPath
        );
      }

      await runFfmpegAsync(ffmpegExe, baseArgs);
    } else {
      // Fallback nativo RIFF AVI MJPEG + PCM caso não haja FFmpeg
      writePureNodeAviWithAudio(targetPath, framesDir, frameIndex, pcmInt16, fps, width, height);
    }

    return { status: "saved", path: targetPath };
  } finally {
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (_e) {}
  }
});

/* ---------- IPC: Controle de Janelas ---------- */
const janelaDe = (e) => BrowserWindow.fromWebContents(e.sender);
ipcMain.handle("win:min", (e) => { const w = janelaDe(e); if (w) w.minimize(); });
ipcMain.handle("win:max", (e) => { const w = janelaDe(e); if (w) w.isMaximized() ? w.unmaximize() : w.maximize(); });
ipcMain.handle("win:close", (e) => { const w = janelaDe(e); if (w) w.close(); });
ipcMain.handle("app:openData", () => shell.openPath(DATA_EDITOR));
ipcMain.handle("app:version", () => app.getVersion());

/* ---------- IPC: Sistema de Atualização via GitHub (Juvinho/ScriptEditor) ---------- */
const UPDATE_REPO = "Juvinho/ScriptEditor";
const UPDATE_API = `https://api.github.com/repos/${UPDATE_REPO}`;
const UPDATE_PAGE = `https://github.com/${UPDATE_REPO}/releases`;
let updateInfo = null;      // Última versão encontrada
let updateFile = null;      // Caminho do instalador baixado
let updateAbort = null;     // AbortController do download em andamento

function normalizarVersao(v) {
  return String(v || "0").trim().replace(/^v/i, "").split(/[-+]/)[0]
    .split(".").map(n => parseInt(n, 10) || 0);
}

function compararVersoes(a, b) {
  const pa = normalizarVersao(a), pb = normalizarVersao(b);
  for (let i = 0; i < Math.max(pa.length, pb.length, 3); i++) {
    const x = pa[i] || 0, y = pb[i] || 0;
    if (x > y) return 1;
    if (x < y) return -1;
  }
  return 0;
}

async function githubJson(url) {
  const resp = await net.fetch(url, {
    headers: {
      "Accept": "application/vnd.github+json",
      "User-Agent": `ScriptEditor-95/${app.getVersion()}`
    }
  });
  if (resp.status === 404) return null;
  if (resp.status === 403) throw new Error("Servidor ocupado no momento. Tente novamente em alguns minutos.");
  if (!resp.ok) throw new Error(`O servidor respondeu com código ${resp.status}.`);
  return resp.json();
}

function escolherInstalador(assets) {
  const lista = (assets || []).filter(a => /\.exe$/i.test(a.name) && !/blockmap|uninstall/i.test(a.name));
  return lista.find(a => /setup|instal/i.test(a.name)) || lista[0] || null;
}

ipcMain.handle("update:check", async () => {
  const atual = app.getVersion();
  try {
    let rel = await githubJson(`${UPDATE_API}/releases/latest`);
    if (!rel) {
      // Sem "Releases" publicados: verifica as tags do repositório como alternativa
      const tags = await githubJson(`${UPDATE_API}/tags?per_page=30`);
      if (!tags || !tags.length) {
        return { ok: true, available: false, current: atual, latest: null, page: UPDATE_PAGE, note: "Nenhuma atualização disponível no servidor no momento." };
      }
      const maior = tags.map(t => t.name).sort((a, b) => compararVersoes(b, a))[0];
      const disponivel = compararVersoes(maior, atual) > 0;
      updateInfo = { version: maior.replace(/^v/i, ""), notes: "", page: `https://github.com/${UPDATE_REPO}/tree/${encodeURIComponent(maior)}`, asset: null };
      return { ok: true, available: disponivel, current: atual, latest: updateInfo.version, notes: "", page: updateInfo.page, asset: null, date: null };
    }

    const versao = String(rel.tag_name || rel.name || "0").replace(/^v/i, "");
    const asset = escolherInstalador(rel.assets);
    updateInfo = {
      version: versao,
      notes: rel.body || "",
      page: rel.html_url || UPDATE_PAGE,
      asset: asset ? { name: asset.name, url: asset.browser_download_url, size: asset.size } : null
    };
    return {
      ok: true,
      available: compararVersoes(versao, atual) > 0,
      current: atual,
      latest: versao,
      notes: updateInfo.notes,
      page: updateInfo.page,
      asset: updateInfo.asset,
      date: rel.published_at || null
    };
  } catch (err) {
    return { ok: false, current: atual, error: (err && err.message) || "Não foi possível conectar ao servidor de distribuição.", page: UPDATE_PAGE };
  }
});

ipcMain.handle("update:download", async (e) => {
  if (!updateInfo || !updateInfo.asset) {
    return { ok: false, error: "O pacote de instalação (.exe) não está disponível no servidor." };
  }
  const { name, url, size } = updateInfo.asset;
  const pastaTemp = path.join(app.getPath("temp"), "ScriptEditor-Update");
  fs.mkdirSync(pastaTemp, { recursive: true });
  const destino = path.join(pastaTemp, name.replace(/[^\w.\- ]+/g, "_"));
  const sender = e.sender;
  updateAbort = new AbortController();

  try {
    const resp = await net.fetch(url, {
      headers: { "User-Agent": `ScriptEditor-95/${app.getVersion()}` },
      signal: updateAbort.signal
    });
    if (!resp.ok || !resp.body) throw new Error(`Download falhou (HTTP ${resp.status}).`);
    const total = Number(resp.headers.get("content-length")) || size || 0;
    const out = fs.createWriteStream(destino);
    const reader = resp.body.getReader();
    let recebido = 0, ultimoAviso = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      recebido += value.length;
      if (!out.write(Buffer.from(value))) {
        await new Promise(r => out.once("drain", r));
      }
      const agora = Date.now();
      if (agora - ultimoAviso > 120 && !sender.isDestroyed()) {
        ultimoAviso = agora;
        sender.send("update:progress", { received: recebido, total });
      }
    }
    await new Promise((res, rej) => { out.end(); out.on("finish", res); out.on("error", rej); });
    if (!sender.isDestroyed()) sender.send("update:progress", { received: recebido, total: total || recebido });
    updateFile = destino;
    return { ok: true, path: destino };
  } catch (err) {
    try { fs.rmSync(destino, { force: true }); } catch (_e) {}
    const cancelado = err && err.name === "AbortError";
    return { ok: false, canceled: cancelado, error: cancelado ? "Download cancelado." : ((err && err.message) || "Falha no download.") };
  } finally {
    updateAbort = null;
  }
});

ipcMain.handle("update:cancel", () => {
  if (updateAbort) updateAbort.abort();
  return true;
});

ipcMain.handle("update:install", () => {
  if (!updateFile || !fs.existsSync(updateFile)) {
    return { ok: false, error: "Instalador não encontrado. Baixe a atualização novamente." };
  }
  try {
    const proc = spawn(updateFile, [], { detached: true, stdio: "ignore" });
    proc.unref();
    setTimeout(() => app.quit(), 400);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err && err.message) || "Não foi possível iniciar o instalador." };
  }
});

ipcMain.handle("update:openPage", (_e, url) => {
  const alvo = (typeof url === "string" && url.startsWith(`https://github.com/${UPDATE_REPO}`)) ? url : UPDATE_PAGE;
  shell.openExternal(alvo);
  return true;
});

function protegerNavegacao(w) {
  w.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  w.webContents.on("will-navigate", (e) => e.preventDefault());
}

function transitarParaPrincipal() {
  if (!mainPronta || !splashPronto) return;
  if (win && !win.isDestroyed()) {
    win.maximize();
    win.show();
    win.focus();
  }
  if (splash && !splash.isDestroyed()) {
    splash.destroy();
    splash = null;
  }
}

function criarSplash() {
  splash = new BrowserWindow({
    width: 620, height: 350, frame: false, resizable: false, center: true,
    show: false, alwaysOnTop: true, skipTaskbar: false, backgroundColor: "#C6BFA6",
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  protegerNavegacao(splash);
  splash.once("ready-to-show", () => {
    if (splash && !splash.isDestroyed()) splash.show();
  });
  splash.loadFile(path.join(__dirname, "app", "splash.html"));
}

function abrirSplashManual() {
  const manual = new BrowserWindow({
    width: 620, height: 350, frame: false, resizable: false, center: true,
    show: false, alwaysOnTop: false,
    parent: win && !win.isDestroyed() ? win : undefined,
    backgroundColor: "#C6BFA6",
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  protegerNavegacao(manual);
  manual.once("ready-to-show", () => manual.show());
  manual.loadFile(path.join(__dirname, "app", "splash.html"), { query: { modo: "sobre" } });
}

ipcMain.handle("splash:done", () => {
  splashPronto = true;
  transitarParaPrincipal();
  return true;
});

ipcMain.handle("app:splash", () => {
  abrirSplashManual();
  return true;
});

function criarJanela() {
  win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 860, minHeight: 580,
    frame: false, show: false, backgroundColor: "#6E2A1C", title: "ScriptEditor",
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      spellcheck: true
    }
  });
  win.webContents.session.setSpellCheckerLanguages(["pt-BR"]);
  protegerNavegacao(win);
  win.once("ready-to-show", () => {
    mainPronta = true;
    transitarParaPrincipal();
  });
  win.on("closed", () => {
    win = null;
    app.quit();
  });
  win.loadFile(path.join(__dirname, "app", "index.html"));
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    criarSplash();
    inicializarPastas();
    criarJanela();
    setTimeout(() => {
      mainPronta = true;
      splashPronto = true;
      transitarParaPrincipal();
    }, 5500);
  });
  app.on("window-all-closed", () => app.quit());
}

