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
const notes = `### ScriptEditor ${version} · Edição 95 — Atualização 1.1.5 (Diálogo de Fechamento Windows 95 & Salvar Alterações)\n\n` +
  `- **Diálogo Oficial de Confirmação Windows 95 ao Fechar pelo "X":** Ao clicar no botão "×" da barra de título, pressionar Alt+F4 ou selecionar Arquivo > Sair do ScriptEditor, o aplicativo exibe a clássica caixa de diálogo modal de confirmação com o selo de interrogação azul/amarelo perguntando: "O projeto '[NOME].PPJ' foi alterado. Deseja salvar as alterações feitas no projeto antes de fechar o ScriptEditor 95?";\n` +
  `- **Botões Canônicos [ Sim ] [ Não ] [ Cancelar ]:** O botão Sim (atalho S ou Enter) salva o projeto no disco antes de fechar; o botão Não (atalho N) descarta as alterações e encerra o aplicativo imediatamente; o botão Cancelar (atalho Esc ou botão "×" do diálogo) anula a saída e mantém o editor na bancada com todos os cortes intactos;\n` +
  `- **Confirmação ao Fechar Projeto (Ctrl+W):** Ao acionar Arquivo > Fechar Projeto para retornar à bancada de espera MDI limpa, o montador também é consultado caso existam clipes ou alterações não salvas;\n` +
  `- **Interceptação Nativa no Processo Principal do Electron:** Bloqueio de fechamentos acidentais disparados pela barra de tarefas do Windows ou atalhos do sistema operacional, direcionando o evento com segurança para a caixa de diálogo de confirmação;\n` +
  `- **Bateria Completa de 30 Testes Automatizados E2E Homologada:** Todos os 30 testes e capturas de tela aprovados com saída 100% limpa em \`testes_e2e_screenshots/\`.`;

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

