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
const notes = `### ScriptEditor ${version} · Edição 95 — Seleção Múltipla, Agrupamento e Edição em Bloco\n\n` +
  `- **Seleção Múltipla de Clipes (Marquee / Lasso):** Arraste o mouse em área desocupada para desenhar uma caixa elástica e selecionar vários clipes simultaneamente em qualquer faixa\n` +
  `- **Seleção Aditiva (Shift + Clique & Ctrl + Clique):** Adicione ou remova clipes da seleção com teclas modificadoras e selecione faixas inteiras com duplo-clique no cabeçalho ou Ctrl+A\n` +
  `- **Movimentação e Exclusão em Bloco:** Arraste qualquer clipe selecionado para mover todos juntos com precisão magnética, exclua em massa com Delete ou faça Ripple Delete em bloco com Shift+Delete\n` +
  `- **Agrupamento de Clipes (Ctrl+G / Ctrl+Shift+G):** Vincule clipes em grupos permanentes com identificador visual [GRP] para andarem e serem manipulados sempre em conjunto\n` +
  `- **Vínculo Áudio e Vídeo (Ctrl+L):** Vincule faixas de áudio e vídeo mantendo a sincronia e alertando desvios temporais em vermelho\n` +
  `- **Colar Atributos Seletivo (Ctrl+Alt+V):** Transfira efeitos, escalas, posições, volumes ou velocidades de um clipe para múltiplos clipes selecionados\n` +
  `- **Gerador de Matte de Cor Broadcast (Color Matte):** Crie cartelas de cor sólida (Preto broadcast, Branco, Chroma Blue/Green ou personalizada) diretamente no projeto\n` +
  `- **Transição Rápida no Corte (Ctrl+D):** Aplique dissolvência cruzada (Cross Dissolve) instantânea entre cortes na agulha`;

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

