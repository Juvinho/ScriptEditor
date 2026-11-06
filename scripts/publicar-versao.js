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
const notes = `### ScriptEditor ${version} · Edição 95 — Atualização 1.1.1 (Fit to Fill, VU Galvanométrico, Chroma Key, Sinais Broadcast & Ficha Técnica)\n\n` +
  `- **Edição por 4 Pontos com Ajuste de Velocidade Automático (Fit to Fill 1995):** Ao marcar pontos IN e OUT no monitor de Origem e também na Linha do Tempo com durações diferentes, o editor detecta a divergência e abre a janela clássica de resolução com opções: "Ajustar Velocidade para Preencher (Fit to Fill)", "Ignorar Ponto OUT da Origem", "Ignorar Ponto OUT da Linha do Tempo" ou "Ignorar Ponto IN da Linha do Tempo";\n` +
  `- **Medidores VU Analógicos Galvanométricos 1995:** Modo alternável na Mesa de Som e console dedicado ("Console VU Analógico Tape Deck") com mostradores estéreo em fundo creme marfim, escala serigráfica de -20 a +3 dB, indicador de sobrecarga PEAK e física balística realista (resposta 300ms, amortecimento mecânico);\n` +
  `- **Processador Chroma Key & Blue/Green Screen 1995:** Janela dedicada de recorte por cor para faixas de sobreposição com conta-gotas/pipeta direto na tela de prévia, presets Verde Broadcast e Azul Betacam, tolerância, limiar (threshold), suavização de borda, supressão de spill (despill) e visualização do canal Alpha (P&B) em tempo real;\n` +
  `- **Suite de Efeitos Visuais MTV 1995 & Telejornalismo:** Mosaico de censura/pixelização em blocos ajustáveis (4 a 64px), posterização de cores 8-bit, solarização psicodélica Sabattier e controle rotativo de Matiz (Hue Rotate -180° a +180°);\n` +
  `- **Gerador Expandido de Sinais Broadcast & Calibração:** Padrão EBU 75% (PAL/CCIR 601), Multi-Burst analógico de 0.5 a 4.2 MHz para teste de resposta de cabeçote, Tom musical Lá 440 Hz (ISO 16) e Varredura Senoidal Contínua (Sweep 20Hz - 20kHz) com áudio DSP;\n` +
  `- **Ficha Técnica de Montagem & Relatório Oficial de Decupagem:** Exportação nos formatos HTML 1995 (estilo Netscape Navigator 3) e texto puro (.TXT), contendo cronologia completa de cortes, timecodes SMPTE Drop-Frame, lista de marcadores/cue sheets, manifesto de mídias e layout otimizado para impressão A4;\n` +
  `- **Bateria Expandida de 23 Testes Automatizados E2E:** Todas as 23 funcionalidades testadas e capturadas em alta resolução na pasta raiz \`testes_e2e_screenshots/\`.`;

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

