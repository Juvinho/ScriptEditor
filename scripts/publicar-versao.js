#!/usr/bin/env node
"use strict";

/**
 * Script de Publicação Automática de Versões — ScriptEditor 95
 * Compila o instalador, cria commit, tag e publica a Release no GitHub (Juvinho/ScriptEditor).
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function run(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  return execSync(cmd, { stdio: "inherit", encoding: "utf8", ...opts });
}

function runSilent(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" }).trim();
  } catch (_e) {
    return "";
  }
}

const rootDir = path.resolve(__dirname, "..");
process.chdir(rootDir);

const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
const version = pkg.version;
const tag = `v${version}`;
const installerName = `SETUP_SCRIPTEDITOR_${version}.exe`;
const installerPath = path.join(rootDir, "dist", installerName);

console.log(`\n========================================`);
console.log(` Publicando ScriptEditor ${version} (${tag})`);
console.log(`========================================\n`);

// 1. Garante que o instalador da versão atual esteja compilado em dist/
if (!fs.existsSync(installerPath)) {
  console.log(`Instalador ${installerName} não encontrado em dist/. Compilando...`);
  run("npm run instalador");
} else {
  console.log(`Instalador encontrado: ${installerPath} (${(fs.statSync(installerPath).size / (1024 * 1024)).toFixed(1)} MB)`);
}

// 2. Verifica repositório Git local
if (!fs.existsSync(path.join(rootDir, ".git"))) {
  console.log("Inicializando repositório Git local...");
  run("git init -b main");
}

const remoteUrl = runSilent("git remote get-url origin");
if (!remoteUrl) {
  console.log("Configurando remote origin para https://github.com/Juvinho/ScriptEditor.git...");
  run("git remote add origin https://github.com/Juvinho/ScriptEditor.git");
}

// 3. Adiciona arquivos e faz commit se houver alterações
run("git add .");
const status = runSilent("git status --porcelain");
if (status) {
  console.log("Criando commit de lançamento...");
  run(`git commit -m "ScriptEditor ${version}: Edição 95"`);
} else {
  console.log("Nenhuma alteração pendente de commit.");
}

// 4. Cria e envia branch main
const currentBranch = runSilent("git branch --show-current") || "main";
console.log(`Enviando branch ${currentBranch} para o GitHub...`);
run(`git push -u origin ${currentBranch}`);

// 5. Cria e envia a Tag
const tagExists = runSilent(`git tag -l ${tag}`);
if (!tagExists) {
  console.log(`Criando tag ${tag}...`);
  run(`git tag -a ${tag} -m "ScriptEditor ${version} - Edição 95"`);
}
console.log(`Enviando tag ${tag} para o GitHub...`);
run(`git push origin ${tag}`);

// 6. Publica Release no GitHub via gh CLI com o instalador anexado
console.log(`Criando Release ${tag} no GitHub...`);
const notes = `### ScriptEditor ${version} · Edição 95 — Atualização 1.1.2 (Seletor de Cores Windows 95, Suíte DVE 3D 1995 & Captura BMP 24-bit)\n\n` +
  `- **Seletor de Cores Oficial Windows 95 (COMMDLG32.DLL Replicado):** Eliminação completa do seletor moderno HTML5. Nova caixa de diálogo idêntica à do Windows 95 com grade de 48 cores básicas, 16 personalizadas salvas na máquina, campo espectral HSL 2D com retículo móvel, barra de luminância vertical com seta triangular preta, prévia bipartida "Cor | Sólido" com simulação autêntica de dithering 8-bit VGA Bayer 2x2, paletas históricas dos anos 90 (Win95, Netscape 216 Web-Safe, SMPTE Legal, IBM CGA/EGA, Apple Mac System 7 QuickTime), monitor IRE com indicador SMPTE Legal / Fora de Padrão e correção por grampeamento automático, conta-gotas integrado e campos numéricos HSL/RGB/Hex sincronizados;\n` +
  `- **Suíte de Efeitos Digitais 3D (DVE 1995 — Ampex ADO / Pinnacle Alladin):** Transformações 3D completas nos clipes com rotação simultânea em X, Y e Z, projeção em perspectiva matemática, profundidade de plano Z (-300px a +300px), sombreamento direcional dinâmico que simula iluminação de estúdio dos anos 90 e presets de animação (Giro Horizontal Y, Giro Vertical X, Cubo 3D e Virada de Página clássica Page Peel);\n` +
  `- **Processador DVE 3D Dedicado com Cubo Wireframe 3D:** Console visual completo acessível pelo menu e atalho Ctrl+Shift+3, contendo gizmo interativo de um cubo tridimensional em aramado com faces coloridas e controles manuais de rotação, inclinação e escala em tempo real;\n` +
  `- **Efeitos Visuais e Bordas 3D de Época:** Borda biselada 3D Bevel Picture-in-Picture (com relevo alto/baixo chanfrado), modo 3D Anáglifo Estereoscópico (separação cromática vermelho/ciano para óculos 3D), linhas de varredura CRT Trinitron 60Hz e ruído analógico de comutação de cabeçote VHS Head Switching Glitch;\n` +
  `- **Videografismo & Titulador 3D Chyron:** Suporte a estilos de texto tridimensional "3D Relevo Chanfrado" (chiseled bevel) e "3D Cromado 90s" com extrusão, além de integração universal com o novo Seletor de Cores Windows 95;\n` +
  `- **Captura de Fotograma Estático em Bitmap 24-bit (.BMP):** Congelamento instantâneo do quadro da linha do tempo gerando arquivo .BMP não compactado com cabeçalho BITMAPINFOHEADER autêntico de 1995, atalho Ctrl+Shift+B e inclusão imediata no cesto de mídias (Bin);\n` +
  `- **Bateria Completa de 25 Testes Automatizados E2E:** 25 capturas de tela cobrindo todas as janelas, consoles analógicos, seletor de cores oficial e processador 3D salvas em alta resolução na pasta raiz \`testes_e2e_screenshots/\`.`;

const releaseCheck = runSilent(`gh release view ${tag} --json tagName`);
if (!releaseCheck) {
  run(`gh release create ${tag} "${installerPath}" --title "ScriptEditor ${version} · Edição 95" --notes "${notes.replace(/"/g, '\\"')}"`);
} else {
  console.log(`Release ${tag} já existe. Atualizando instalador anexado...`);
  run(`gh release upload ${tag} "${installerPath}" --clobber`);
}

console.log(`\n========================================`);
console.log(` Publicação concluída com sucesso!`);
console.log(` Repositório: https://github.com/Juvinho/ScriptEditor`);
console.log(` Release: https://github.com/Juvinho/ScriptEditor/releases/tag/${tag}`);
console.log(` Instalador anexado: ${installerName}`);
console.log(`========================================\n`);

