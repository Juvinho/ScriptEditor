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
const notes = `### ScriptEditor ${version} · Edição 95 — Grande Atualização de Recursos\n\n` +
  `- **Modelo de Projeto Não-Destrutivo (.PPJ):** Salvar (Ctrl+S) e abrir (Ctrl+O) projetos completos preservando timecodes e faixas\n` +
  `- **Salvamento Automático (Autosave 60s) e Recuperação:** Detecção e restauração automática contra quedas de energia e falhas\n` +
  `- **Sistema de Keyframes (Quadros-Chave):** Animação com curva suave (Hermite S-Curve) para Opacidade, Posição X/Y, Escala, Rotação e Volume\n` +
  `- **Mesa de Som Analógica 95:** Faders deslizantes lineares (-inf a +6 dB), Pan L/R, Mute/Solo, VU por canal e Normalização de Picos (-0.1 dBFS)\n` +
  `- **Cortes de Áudio sem Estalos (De-click):** Curvas de esmaecimento cosseno (Fade In e Fade Out) automáticas e ajustáveis\n` +
  `- **Composição e Cor Profissional:** Modos de Mesclagem (Multiplicar, Tela, Sobrepor, Adicionar, Diferença), Temperatura Kelvin, Tint e Chroma Key\n` +
  `- **Títulos Animados Chyron & Legendas SRT:** Letreiro Rotativo (Crawl), Créditos Rolantes (Roll), Piscante e importação/exportação de legendas .SRT\n` +
  `- **Cesto de Mídia (Project Bin) Renovado:** Busca instantânea, abas de categoria (Vídeos, Áudios, Imagens, Sintéticos), Miniaturas reais e Lista Detalhada\n` +
  `- **Modos de Resolução de Prévia:** 1/1 Total, 1/2 Rápido e 1/4 Betacam para scrubbing e reprodução ultra fluidos\n` +
  `- **Menu Ajuda & Dica do Dia:** Atalhos personalizáveis, Dicas do Dia, O que há de novo e Tela de Abertura`;

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

