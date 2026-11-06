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
const notes = `### ScriptEditor ${version} · Edição 95 — Atualização 1.1.4 (Tela de Início MDI Limpa, Roll & Crawl Designer, RTA 31-Bandas, SMPTE & Tracking VHS)\n\n` +
  `- **Área de Trabalho MDI Limpa na Inicialização:** O assistente de boas-vindas abre sobre um fundo fosco MDI autêntico dos anos 90 com textura pontilhada e baixo-relevo chiseled, ocultando linha do tempo, monitores e cesto de mídias até que um projeto seja aberto ou iniciado;\n` +
  `- **Roll & Crawl Designer 95 (Ctrl+Alt+R):** Gerador profissional de créditos rolantes verticais em duas colunas sincronizadas (Cargo | Nome) com canaleta central e letreiros contínuos de notícias (Crawl) com badges e gradientes metálicos tridimensionais dos anos 90;\n` +
  `- **Analisador de Áudio RTA 31-Bandas Rack 19" (Ctrl+Alt+A):** Chassi Klark Teknik / BSS em rack com 31 bandas ISO (20 Hz a 20 kHz), escada de LEDs fluorescentes tricolores com retenção de pico e goniômetro de correlação de fase estéreo;\n` +
  `- **Calculadora Broadcast SMPTE 12M & Película (Ctrl+Alt+K):** Display digital VFD verde-esmeralda, conversões DF/NDF/PAL/Cinema, metragem de película 35mm e 16mm e teclas de inserção rápida de comerciais de TV;\n` +
  `- **Simulador de Desajuste de Tracking VHS & Ruído RF:** Barra móvel de erro de alinhamento de cabeçote com chuvisco analógico estático, distorção H-Sync (Flag Waving) e interferência de rádio-frequência VHF/UHF;\n` +
  `- **Novas Transições 3D Vintage:** Cubo 3D Giratório (Cube Spin 3D) com faces mapeadas e perspectiva, e Mosaico Explosivo em Blocos (Block Dissolve 95);\n` +
  `- **Bateria Completa de 29 Testes Automatizados E2E Homologada:** Todos os 29 testes e capturas de tela aprovados com saída 100% limpa em \`testes_e2e_screenshots/\`.`;

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

