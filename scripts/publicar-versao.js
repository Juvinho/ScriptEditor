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
const notes = `### ScriptEditor ${version} · Edição 95 — Atualização Massiva 1.1\n\n` +
  `- **Assistente de Entrada & Hub de Projetos 95 (Padrão ScriptRoom):** Tela de boas-vindas estilo ScriptRoom com banner beveled vinho, cartão de continuidade ("Continuar de onde parei") com botão play direto, grade de 6 ações com ícones pixelados, busca em tempo real na tabela de projetos recentes e rotacionador de dicas do dia;\n` +
  `- **Mesa de Som Analógica 95 Corrigida:** Faders verticais em slots embutidos blindados contra overflow horizontal, escala de serigrafia graduada em decibéis (+6, 0, -6, -12, -24, -inf dB), medidores VU de LED estéreo calibrados em tempo real, potenciômetros de Pan e visor digital LCD em dB;\n` +
  `- **Suite Analógica de Fita VHS & Betacam SP 95 (Processador DSP):** Emulação ótica e eletromagnética autêntica de cabeçote giratório com ruído de comutação inferior (head switching noise), desvio e jitter de tracking horizontal, desalinhamento/sangramento de croma, dropouts de óxido magnético, granulação e scanlines CRT Trinitron de 15.734 kHz;\n` +
  `- **Modo de Edição A/B Roll Clássico 1995:** Alternância para o layout histórico das ilhas de corte dos anos 90 com trilhas de Vídeo A, pista intermediária de Transições [FX] e trilha de Vídeo B;\n` +
  `- **Novas Transições Época 1995:** Adicionadas Virada de Página 3D (Page Peel com verso metálico e sombra), Varredura de Relógio 360° (Clock Wipe radial), Íris Diamante/Losango e Persianas Verticais;\n` +
  `- **Padrão Broadcast SMPTE Drop-Frame (DF):** Sincronismo oficial para transmissão televisiva NTSC 29.97 fps com separador ponto-e-vírgula (\`;\`) e cálculo de descarte de 2 quadros a cada minuto;\n` +
  `- **Empacotador Autônomo para Iomega Zip 100MB / DAT:** Gera arquivo consolidado contendo projeto .PPJ, lista de decisão EDL CMX 3600, ficha técnica LEIAME.TXT no padrão dos anos 90 e AUTORUN.INF;\n` +
  `- **Bateria Completa de Testes E2E (18 Módulos):** Conjunto automatizado de testes simulando usuário real em todos os painéis, com capturas salvas na pasta raiz \`testes_e2e_screenshots/\`.`;

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

