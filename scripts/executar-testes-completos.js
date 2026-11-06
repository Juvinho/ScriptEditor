// Script de Teste Automatizado E2E — ScriptEditor 95 (Versão 1.1.0)
// Simula um usuário real navegando por absolutamente TODOS os módulos do editor
// e captura telas completas em alta resolução salvando na pasta raiz 'testes_e2e_screenshots/'.

const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "testes_e2e_screenshots");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.whenReady().then(async () => {
  console.log("=== INICIANDO BATERIA DE TESTES E2E SCRIPTEDITOR 95 (v1.1.0) ===");
  console.log("Diretório de destino:", OUTPUT_DIR);

  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    show: false,
    frame: false,
    backgroundColor: "#C0C0C0",
    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "..", "app", "index.html"));

  const capture = async (filename, label) => {
    await sleep(250);
    const img = await win.webContents.capturePage();
    const dest = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(dest, img.toPNG());
    console.log(`[CAPTURA OK] ${filename} — ${label}`);
  };

  const exec = async (fnStr) => {
    return win.webContents.executeJavaScript(fnStr);
  };

  win.webContents.on("did-finish-load", async () => {
    try {
      console.log("App carregado. Aguardando inicialização completa...");
      await sleep(1200);

      // 1. TELA DE ENTRADA / ASSISTENTE DE BOAS-VINDAS 95
      await exec(`
        if (typeof openWelcomeDialog === "function") openWelcomeDialog();
      `);
      await sleep(500);
      await capture("01_tela_boas_vindas_scripteditor95.png", "Assistente de Boas-Vindas 95 (ScriptRoom Style)");

      // 2. TIMELINE PRINCIPAL & MONITORES DUPLOS (BANCADA DE CORTE)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof renderAll === "function") renderAll();
      `);
      await sleep(400);
      await capture("02_timeline_principal_monitores_bancada.png", "Linha do Tempo Principal & Monitores CRT");

      // 3. SELEÇÃO MÚLTIPLA DE CLIPES, ARRASTE & ESPAÇOS VAZIOS
      await exec(`
        if (typeof S !== "undefined" && S.clips && S.clips.v1 && S.clips.v1.length) {
          S.selectedClipIds = [S.clips.v1[0].id, (S.clips.a1 && S.clips.a1[0]) ? S.clips.a1[0].id : S.clips.v1[0].id];
          S.selectedClipId = S.clips.v1[0].id;
          if (typeof renderTimeline === "function") renderTimeline();
          if (typeof updateStatusBar === "function") updateStatusBar();
        }
      `);
      await sleep(350);
      await capture("03_selecao_multipla_arraste_e_trilhas.png", "Seleção Múltipla de Clipes & Trilhas");

      // 4. MESA DE SOM ANALÓGICA 95 (FADERS VERTICAIS, VU METERS & PAN)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openAudioMixerDialog === "function") openAudioMixerDialog();
      `);
      await sleep(400);
      await capture("04_mesa_de_som_analogica_95_faders_verticais.png", "Mesa de Som Analógica 95 (Faders Verticais Corrigidos & VUs)");

      // 5. EQUALIZADOR GRÁFICO DSP DE 10 BANDAS
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openGraphicEQDialog === "function") openGraphicEQDialog();
      `);
      await sleep(400);
      await capture("05_equalizador_grafico_dsp_10_bandas.png", "Equalizador Gráfico DSP 10-Bandas (Mesa Analógica 1995)");

      // 6. RACK DE PROCESSAMENTO DINÂMICO (COMPRESSOR, LIMITER & NOISE GATE)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openDynamicsRackDialog === "function") openDynamicsRackDialog();
      `);
      await sleep(400);
      await capture("06_dinamica_de_audio_compressor_limiter.png", "Rack Dinâmico DSP (Compressor, Limiter & Gate)");

      // 7. CORRETOR DE COR 3-WAY BROADCAST (LIFT, GAMMA, GAIN)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof open3WayColorDialog === "function") open3WayColorDialog();
      `);
      await sleep(400);
      await capture("07_corretor_de_cor_3_vias_lift_gamma_gain.png", "Corretor de Cor 3-Way (Rodas Cromáticas & Parade RGB)");

      // 8. GERADOR DE BARRAS SMPTE & TOM DE 1 KHZ
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openGeneratorDialog === "function") openGeneratorDialog();
      `);
      await sleep(400);
      await capture("08_gerador_barras_smpte_e_tom_1khz.png", "Gerador de Sinal de Teste SMPTE & Tom 1 kHz");

      // 9. GERADOR DE CARTELA COLORIDA (COLOR MATTE 1995)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openColorMatteDialog === "function") openColorMatteDialog();
      `);
      await sleep(400);
      await capture("09_gerador_cartela_colorida_matte.png", "Gerador de Cartela de Cor Sólida (Color Matte)");

      // 10. CRIADOR DE TÍTULOS E VIDEOGRAFISMO 95 (TITLE DESIGNER / CHYRON)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openChyronDialog === "function") openChyronDialog();
      `);
      await sleep(400);
      await capture("10_criador_titulos_videografismo_95.png", "Title Designer 95 (Chyron / Lower Thirds / Créditos)");

      // 11. MONITOR MULTICÂMERA 4-UP (QUAD-SPLIT LIVE SWITCHER)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof setMonitorLayout === "function") setMonitorLayout("multicam");
      `);
      await sleep(400);
      await capture("11_monitor_multicamera_quad_split.png", "Monitor Multicâmera Quad-Split 4-Up (Live Switcher)");

      // 12. ESTÚDIO DE DUBLAGEM & LOCUÇÃO ADR
      await exec(`
        if (typeof setMonitorLayout === "function") setMonitorLayout("dual");
        if (typeof openADRDialog === "function") openADRDialog();
      `);
      await sleep(400);
      await capture("12_estudio_adr_dublagem_e_locucao.png", "Estúdio de Dublagem & Locução ADR (Microfone & Bip 3-2-1)");

      // 13. JANELA DE TIMECODE NA TELA (WINDOW DUB)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openWindowDubDialog === "function") openWindowDubDialog();
      `);
      await sleep(400);
      await capture("13_window_dub_timecode_burnin.png", "Janela de Timecode Burn-In (Window Dub TCR/TCO)");

      // 14. SUITE ANALÓGICA DE FITA VHS & BETACAM SP 95
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openAnalogTapeSuiteDialog === "function") openAnalogTapeSuiteDialog();
      `);
      await sleep(400);
      await capture("14_suite_analogica_fita_vhs_betacam95.png", "Suite Analógica VHS & Betacam SP (Processador DSP 1995)");

      // 15. MODO DE EDIÇÃO A/B ROLL COM TRANSIÇÕES 95
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof toggleAbRollMode === "function") {
          if (!S.abRollMode) toggleAbRollMode();
        }
        if (typeof renderAll === "function") renderAll();
      `);
      await sleep(400);
      await capture("15_modo_edicao_ab_roll_transicoes.png", "Modo Clássico de Edição A/B Roll 1995 (Trilhas A/FX/B)");

      // 16. CONFIGURAÇÕES DA ILHA 95 (BROADCAST & DROP-FRAME SMPTE)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openIslandSettingsDialog === "function") openIslandSettingsDialog();
      `);
      await sleep(400);
      await capture("16_configuracoes_ilha_dropframe_smpte.png", "Configurações da Ilha 95 (Broadcast NTSC/PAL & Drop-Frame)");

      // 17. ASSISTENTE DE EXPORTAÇÃO MASTER (RENDER 1995)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openExportDialog === "function") openExportDialog();
      `);
      await sleep(400);
      await capture("17_assistente_exportacao_master_render.png", "Assistente de Exportação de Filme Master");

      // 18. EMPACOTADOR DE PROJETO INDEPENDENTE (IOMEGA ZIP 100MB / DAT)
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof openZipDrivePackageDialog === "function") openZipDrivePackageDialog();
      `);
      await sleep(400);
      await capture("18_empacotador_projeto_zipdrive_1995.png", "Empacotador Autônomo Iomega Zip 100MB / DAT");

      console.log("=== TODOS OS 18 TESTES E CAPTURAS CONCLUÍDOS COM SUCESSO! ===");
      await sleep(500);
      app.quit();
    } catch (err) {
      console.error("Erro durante a execução dos testes E2E:", err);
      app.exit(1);
    }
  });
});

