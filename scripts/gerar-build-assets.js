// Gera os arquivos visuais de época (1995) para o instalador NSIS e o executável Windows:
// - build/icon.ico (32x32 e 16x16, pixel-art de monitor CRT + fita de cinema + tesoura de corte)
// - build/icon.png (64x64 PNG pixel-art)
// - build/installerSidebar.bmp (164x314 24-bit BMP para o assistente estilo Windows 95)
// - build/installerHeader.bmp (150x57 24-bit BMP para o topo do instalador)

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const outDir = path.join(__dirname, "..", "build");
fs.mkdirSync(outDir, { recursive: true });

// Utilitário de criação de BMP 24-bit (formato esperado pelo NSIS)
function writeBmp24(filePath, width, height, pixelFn) {
  const rowStride = Math.ceil((width * 3) / 4) * 4;
  const imgSize = rowStride * height;
  const fileSize = 54 + imgSize;
  const buf = Buffer.alloc(fileSize);

  // BITMAPFILEHEADER
  buf.write("BM", 0);
  buf.writeUInt32LE(fileSize, 2);
  buf.writeUInt32LE(0, 6);
  buf.writeUInt32LE(54, 10);

  // BITMAPINFOHEADER
  buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(width, 18);
  buf.writeInt32LE(height, 22); // bottom-up
  buf.writeUInt16LE(1, 26);
  buf.writeUInt16LE(24, 28);
  buf.writeUInt32LE(0, 30);
  buf.writeUInt32LE(imgSize, 34);
  buf.writeInt32LE(2835, 38);
  buf.writeInt32LE(2835, 42);
  buf.writeUInt32LE(0, 46);
  buf.writeUInt32LE(0, 50);

  for (let y = 0; y < height; y++) {
    const bmpY = height - 1 - y;
    const rowOff = 54 + bmpY * rowStride;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixelFn(x, y, width, height);
      const off = rowOff + x * 3;
      buf[off] = b & 255;
      buf[off + 1] = g & 255;
      buf[off + 2] = r & 255;
    }
  }
  fs.writeFileSync(filePath, buf);
}

// Desenha o ícone 32x32 pixel-art do ScriptEditor 95 (Monitor de Edição + Película + Timecode)
function drawIconPixel(x, y, size) {
  const sx = Math.floor((x * 32) / size);
  const sy = Math.floor((y * 32) / size);

  // Fundo transparente nas bordas externas se fora da moldura
  if (sx < 1 || sx > 30 || sy < 1 || sy > 30) return [0, 0, 0, 0];

  // Rolo de película à esquerda (x: 1..6) e à direita (x: 25..30)
  if ((sx >= 1 && sx <= 5) || (sx >= 26 && sx <= 30)) {
    if (sx === 1 || sx === 5 || sx === 26 || sx === 30 || sy === 1 || sy === 30) {
      return [16, 16, 16, 255];
    }
    // Perfurações da película 16mm/35mm
    if (sy % 4 === 2 || sy % 4 === 3) {
      if (sx >= 2 && sx <= 4) return [245, 240, 220, 255];
      if (sx >= 27 && sx <= 29) return [245, 240, 220, 255];
    }
    return [45, 35, 35, 255];
  }

  // Corpo do Monitor Broadcast 95 (x: 6..25, y: 2..29)
  if (sy === 2 || sx === 6) return [225, 219, 198, 255]; // Borda iluminada 3D
  if (sy === 29 || sx === 25) return [30, 30, 30, 255];  // Sombra 3D

  // Barra de título vinho anos 90 (y: 3..6)
  if (sy >= 3 && sy <= 6 && sx >= 7 && sx <= 24) {
    if (sx >= 22 && sy >= 4 && sy <= 5) return [198, 191, 166, 255];
    return [128, 0, 0, 255];
  }

  // Tela CRT 4:3 (x: 8..23, y: 8..21)
  if (sx >= 8 && sx <= 23 && sy >= 8 && sy <= 21) {
    if (sx === 8 || sy === 8) return [10, 10, 10, 255];
    if (sx === 23 || sy === 21) return [180, 175, 160, 255];
    // Barras de cor SMPTE / Claquete na tela
    if (sy >= 9 && sy <= 12) {
      // Topo da claquete listrada
      return ((sx + sy) % 3 === 0) ? [255, 255, 255, 255] : [20, 20, 20, 255];
    }
    if (sy >= 13 && sy <= 18) {
      // Cena em exibição + linha de corte vermelha no meio
      if (sx === 15 || sx === 16) return [255, 50, 50, 255]; // Agulha da timeline/corte
      if (sy === 15 && sx >= 10 && sx <= 21) return [0, 220, 120, 255]; // Onda de áudio / horizonte
      return [18, 42, 68, 255];
    }
    // Timecode embaixo no CRT
    if (sy >= 19 && sy <= 20) {
      return (sx % 2 === 0 && sx >= 10 && sx <= 21) ? [255, 210, 0, 255] : [0, 0, 0, 255];
    }
  }

  // Faixas da Timeline na base do monitor (y: 23..27, x: 8..23)
  if (sy >= 23 && sy <= 27 && sx >= 8 && sx <= 23) {
    if (sx === 15) return [220, 20, 20, 255]; // Playhead
    if (sy === 24) return (sx % 5 === 0) ? [30, 30, 30, 255] : [128, 0, 0, 255]; // Track V1
    if (sy === 26) return (sx % 4 === 0) ? [30, 30, 30, 255] : [0, 100, 140, 255]; // Track A1
    return [255, 255, 255, 255];
  }

  // Gabinete bege/cinza Windows 95 (#C6BFA6)
  return [198, 191, 166, 255];
}

// Cria um arquivo .ICO (contendo imagem 32x32 BGRA 32-bit)
function createIco(filePath, size = 32) {
  const xorSize = size * size * 4;
  const andRowBytes = Math.ceil(size / 32) * 4;
  const andSize = andRowBytes * size;
  const bmpInfoSize = 40 + xorSize + andSize;

  const buf = Buffer.alloc(6 + 16 + bmpInfoSize);
  // ICONDIR
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2); // 1 = ICO
  buf.writeUInt16LE(1, 4); // 1 imagem

  // ICONDIRENTRY
  buf.writeUInt8(size === 256 ? 0 : size, 6);
  buf.writeUInt8(size === 256 ? 0 : size, 7);
  buf.writeUInt8(0, 8);
  buf.writeUInt8(0, 9);
  buf.writeUInt16LE(1, 10);
  buf.writeUInt16LE(32, 12);
  buf.writeUInt32LE(bmpInfoSize, 14);
  buf.writeUInt32LE(22, 18);

  // BITMAPINFOHEADER
  const hOff = 22;
  buf.writeUInt32LE(40, hOff);
  buf.writeInt32LE(size, hOff + 4);
  buf.writeInt32LE(size * 2, hOff + 8);
  buf.writeUInt16LE(1, hOff + 12);
  buf.writeUInt16LE(32, hOff + 14);
  buf.writeUInt32LE(0, hOff + 16);
  buf.writeUInt32LE(xorSize + andSize, hOff + 20);

  const xorOff = hOff + 40;
  for (let y = 0; y < size; y++) {
    const bmpY = size - 1 - y;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = drawIconPixel(x, y, size);
      const pOff = xorOff + (bmpY * size + x) * 4;
      buf[pOff] = b;
      buf[pOff + 1] = g;
      buf[pOff + 2] = r;
      buf[pOff + 3] = a;
    }
  }
  fs.writeFileSync(filePath, buf);
}

// Cria um PNG válido (sem dependências externas) usando zlib
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const tBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([tBuf, data])), 0);
  return Buffer.concat([len, tBuf, data, crcBuf]);
}

function createPng(filePath, size = 64) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // 8-bit
  ihdr[9] = 6; // RGBA

  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0; // filter none
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = drawIconPixel(x, y, size);
      const p = rowStart + 1 + x * 4;
      raw[p] = r;
      raw[p + 1] = g;
      raw[p + 2] = b;
      raw[p + 3] = a;
    }
  }
  const idat = zlib.deflateSync(raw);
  const out = Buffer.concat([
    sig,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
  fs.writeFileSync(filePath, out);
}

// 1. Gera icon.ico (256x256 para suportar electron-builder no Windows sem reclamar de tamanho, mantendo pixel art nítido)
createIco(path.join(outDir, "icon.ico"), 256);
createPng(path.join(outDir, "icon.png"), 256);

// 2. Gera installerSidebar.bmp (164x314) estilo Windows 95 Setup Wizard (faixa lateral vinho/azul escura + película de cinema + monitor)
writeBmp24(path.join(outDir, "installerSidebar.bmp"), 164, 314, (x, y, w, h) => {
  // Moldura 3D afundada
  if (x === 0 || y === 0) return [128, 128, 128];
  if (x === w - 1 || y === h - 1) return [255, 255, 255];

  // Película cinematográfica na lateral esquerda (x: 6..24)
  if (x >= 6 && x <= 24) {
    if (x === 6 || x === 24) return [10, 10, 10];
    if (x >= 9 && x <= 14 && (y % 14 >= 3 && y % 14 <= 9)) return [230, 224, 204];
    return [30, 24, 24];
  }

  // Fundo em degradê anos 90 (Vinho Broadcast #800000 -> Preto #080404) with dithering
  const t = y / h;
  const dither = ((x + y) % 2 === 0) ? 4 : -4;
  const r = Math.max(0, Math.min(255, Math.round(128 * (1 - t * 0.88)) + dither));
  const g = Math.max(0, Math.min(255, Math.round(12 * (1 - t))));
  const b = Math.max(0, Math.min(255, Math.round(18 * (1 - t))));

  // Desenha um monitor de vídeo / claquete centralizado no topo (x: 48..136, y: 40..128)
  if (x >= 48 && x <= 136 && y >= 40 && y <= 128) {
    const ix = Math.floor(((x - 48) * 32) / 89);
    const iy = Math.floor(((y - 40) * 32) / 89);
    const [pr, pg, pb, pa] = drawIconPixel(ix, iy, 32);
    if (pa > 0) return [pr, pg, pb];
  }

  // Barras decorativas de timeline na parte inferior (y: 230..275)
  if (x >= 38 && x <= 148 && y >= 230 && y <= 275) {
    if (y === 230 || y === 245 || y === 260 || y === 275) return [198, 191, 166];
    if (x === 88 || x === 89) return [255, 60, 60]; // Agulha de corte
    if (y > 232 && y < 243) return (x % 18 < 2) ? [20, 20, 20] : [160, 40, 40];
    if (y > 247 && y < 258) return (x % 22 < 2) ? [20, 20, 20] : [40, 110, 160];
    if (y > 262 && y < 273) return (x % 14 < 2) ? [20, 20, 20] : [40, 140, 80];
  }

  return [r, g, b];
});

// 3. Gera installerHeader.bmp (150x57) para o cabeçalho das páginas internas do instalador
writeBmp24(path.join(outDir, "installerHeader.bmp"), 150, 57, (x, y, w, h) => {
  if (y === h - 1) return [128, 128, 128];
  const t = x / w;
  const r = Math.round(128 * (1 - t * 0.7));
  const g = Math.round(10 * (1 - t));
  const b = Math.round(10 * (1 - t));

  // Ícone à direita no header (x: 100..140, y: 8..48)
  if (x >= 100 && x <= 140 && y >= 8 && y <= 48) {
    const ix = Math.floor(((x - 100) * 32) / 41);
    const iy = Math.floor(((y - 8) * 32) / 41);
    const [pr, pg, pb, pa] = drawIconPixel(ix, iy, 32);
    if (pa > 0) return [pr, pg, pb];
  }
  return [r, g, b];
});

console.log("Arquivos de build 1995 gerados com sucesso em build/: icon.ico, icon.png, installerSidebar.bmp, installerHeader.bmp");

