const { spawn } = require("child_process");

if (!process.versions.electron) {
  delete process.env.ELECTRON_RUN_AS_NODE;
  const electronBin = require("electron");
  const child = spawn(electronBin, [__filename], { stdio: "inherit", env: process.env });
  child.on("exit", code => process.exit(code ?? 0));
  return;
}

const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "demonstracao_edicao_95", "prints");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    width: 1152,
    height: 864,
    show: true,
    backgroundColor: "#008080",
    title: "ScriptEditor 95 — Demonstração de Edição Real",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.webContents.on("console-message", (event, level, message, line, sourceId) => {
    console.log(`[Renderer Console]: ${message}`);
  });

  const capture = async (filename, label) => {
    await sleep(350);
    const img = await win.webContents.capturePage();
    const dest = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(dest, img.toPNG());
    console.log(`[PRINT CAPTURADO] ${filename} — ${label}`);
  };

  const exec = async (fnStr) => {
    return win.webContents.executeJavaScript(fnStr);
  };

  win.loadFile(path.join(__dirname, "..", "app", "index.html"));

  win.webContents.on("did-finish-load", async () => {
    try {
      console.log("=== INICIANDO SESSÃO DE DEMONSTRAÇÃO DE EDIÇÃO REAL NO SCRIPTEDITOR 95 ===");
      await sleep(1500);

      // Fecha qualquer janela modal inicial
      await exec(`
        document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
        document.querySelectorAll(".scrim").forEach(s => s.remove());
        if (typeof renderAll === "function") renderAll();
      `);
      await sleep(300);

      const mediaBasePath = path.join(__dirname, "..", "demonstracao_edicao_95", "midias").replace(/\\/g, "/");

      // ETAPA 1: IMPORTAÇÃO E ORGANIZAÇÃO NO BIN (PROJETO)
      console.log("Executando Etapa 1: Importação no Cesto de Mídia (Bin)...");
      await exec(`
        (async () => {
          S.projectName = "TELEJORNAL_REDE_95.PPJ";
          updateStatusBar();

          // Limpa mídias antigas para montar o projeto de demonstração
          S.mediaBin = [];
          S.binFolders = ["Todas", "Vídeos Brutos", "Trilhas & Áudio", "Vinhetas & GCs"];
          S.binCurFolder = "Todas";
          S.binView = "grid";

          const files = [
            { name: "CENA01_ABERTURA.MP4", path: "${mediaBasePath}/CENA01_ABERTURA_TESTSRC.mp4", url: "file:///${mediaBasePath}/CENA01_ABERTURA_TESTSRC.mp4", kind: "video", dur: 8.0, res: "640x480 · 30fps", folder: "Vídeos Brutos" },
            { name: "CENA02_CHROMA_KEY_VERDE.MP4", path: "${mediaBasePath}/CENA02_CHROMA_KEY_VERDE.mp4", url: "file:///${mediaBasePath}/CENA02_CHROMA_KEY_VERDE.mp4", kind: "video", dur: 8.0, res: "640x480 · 25fps", folder: "Vídeos Brutos" },
            { name: "CENA03_SMPTE_BARS_1995.MP4", path: "${mediaBasePath}/CENA03_SMPTE_BARS_1995.mp4", url: "file:///${mediaBasePath}/CENA03_SMPTE_BARS_1995.mp4", kind: "video", dur: 8.0, res: "640x480 · 30fps", folder: "Vídeos Brutos" },
            { name: "TRILHA_SINTETIZADOR_95.MP3", path: "${mediaBasePath}/TRILHA_SINTETIZADOR_95.mp3", url: "file:///${mediaBasePath}/TRILHA_SINTETIZADOR_95.mp3", kind: "audio", dur: 15.0, res: "Áudio 16-bit 44.1kHz", folder: "Trilhas & Áudio" },
            { name: "CARTELA_REDE_95.PNG", path: "${mediaBasePath}/CARTELA_REDE_95.png", url: "file:///${mediaBasePath}/CARTELA_REDE_95.png", kind: "image", dur: 6.0, res: "640x480 · PNG", folder: "Vinhetas & GCs" }
          ];

          for (const f of files) {
            registerImportedFileObject(f, false);
            const added = S.mediaBin[0];
            if (added) {
              added.folder = f.folder;
              added.dur = f.dur;
              added.res = f.res;
            }
          }

          S.sideTab = "bin";
          renderSide();
          renderTimeline();
          renderMonitorFrame();
        })()
      `);
      await sleep(500);
      await capture("01_importacao_e_organizacao_no_bin.png", "1. Importação e Organização de Mídias no Cesto (Bin 95)");

      // ETAPA 2: DECUPAGEM E MARCAÇÃO DE PONTOS IN/OUT NO MONITOR DE ORIGEM
      console.log("Executando Etapa 2: Decupagem no Monitor de Origem...");
      await exec(`
        (() => {
          const item = S.mediaBin.find(m => m.name === "CENA01_ABERTURA.MP4") || S.mediaBin[0];
          loadIntoSourceMonitor(item);
          S.srcIn = 1.0;
          S.srcOut = 5.5;
          S.srcPlayhead = 2.2;
          updateSourceMonitorUI();
          renderSourceFrame();
        })()
      `);
      await sleep(400);
      await capture("02_decupagem_pontos_in_out_monitor_origem.png", "2. Decupagem e Marcação IN/OUT no Monitor de Origem");

      // ETAPA 3: MONTAGEM COMPLETA NA TIMELINE MULTI-TRILHAS
      console.log("Executando Etapa 3: Montagem da Sequência na Timeline...");
      await exec(`
        (() => {
          clearAllTracksClips();
          S.videoTracks = ["v3", "v2", "v1"];
          S.audioTracks = ["a1", "a2"];

          const medVid1 = S.mediaBin.find(m => m.name === "CENA01_ABERTURA.MP4");
          const medVid2 = S.mediaBin.find(m => m.name === "CENA02_CHROMA_KEY_VERDE.MP4");
          const medVid3 = S.mediaBin.find(m => m.name === "CENA03_SMPTE_BARS_1995.MP4");
          const medAud = S.mediaBin.find(m => m.name === "TRILHA_SINTETIZADOR_95.MP3");
          const medImg = S.mediaBin.find(m => m.name === "CARTELA_REDE_95.PNG");

          // V1: Corte da reportagem (Cena 1 + Cena 3)
          S.clips.v1 = [
            {
              id: "v1_c1",
              track: "v1",
              title: "CENA01_ABERTURA.MP4",
              mediaId: medVid1?.id,
              mediaUrl: medVid1?.url,
              start: 0,
              inPoint: 1.0,
              dur: 4.5,
              speed: 1,
              volume: 100,
              opacity: 100,
              scale: 100,
              trans: "Fade do Preto",
              transDur: 1.2
            },
            {
              id: "v1_c2",
              track: "v1",
              title: "CENA03_SMPTE_BARS_1995.MP4",
              mediaId: medVid3?.id,
              mediaUrl: medVid3?.url,
              start: 4.5,
              inPoint: 0,
              dur: 5.5,
              speed: 1,
              volume: 100,
              opacity: 100,
              scale: 100,
              trans: "Fusão Cruzada (Dissolve)",
              transDur: 1.2
            }
          ];

          // V2: Janela Picture-in-Picture com Chroma Key
          S.clips.v2 = [
            {
              id: "v2_pip",
              track: "v2",
              title: "REPÓRTER_ESTÚDIO.MP4 (Chroma Key)",
              mediaId: medVid2?.id,
              mediaUrl: medVid2?.url,
              start: 1.5,
              inPoint: 0,
              dur: 6.5,
              speed: 1,
              volume: 100,
              opacity: 100,
              scale: 52,
              scaleX: 52,
              scaleY: 52,
              posX: 140,
              posY: -85,
              chromaKey: true,
              chromaColor: "green",
              chromaTol: 38,
              chromaThreshold: 15,
              chromaSpill: 65,
              dve3dBevel: true
            }
          ];

          // V3: Vinheta / GC
          S.clips.v3 = [
            {
              id: "v3_gc",
              track: "v3",
              title: "GC: REDE BRASIL 95 · AO VIVO",
              text: "REDE BRASIL 95 · EDIÇÃO EXTRA",
              textSub: "AO VIVO DE BRASÍLIA",
              chyronType: "lower_third",
              fontFace: "'Courier New', monospace",
              fontSize: 22,
              gradient: "3d_chisel",
              start: 1.0,
              inPoint: 0,
              dur: 6.0,
              opacity: 100,
              scale: 100,
              posX: 0,
              posY: 0
            }
          ];

          // A1: Som direto da matéria
          S.clips.a1 = [
            {
              id: "a1_sync",
              track: "a1",
              title: "ÁUDIO_DIRETO_REPÓRTER",
              mediaId: medVid1?.id,
              mediaUrl: medVid1?.url,
              start: 0,
              inPoint: 1.0,
              dur: 10.0,
              volume: 110,
              speaker: "REPÓRTER",
              text: "Atenção: imagens ao vivo direto da redação central em Brasília."
            }
          ];

          // A2: Trilha sonora com curva de automação Rubberband
          S.clips.a2 = [
            {
              id: "a2_trilha",
              track: "a2",
              title: "TRILHA_SINTETIZADOR_95.MP3",
              mediaId: medAud?.id,
              mediaUrl: medAud?.url,
              start: 0,
              inPoint: 0,
              dur: 12.0,
              volume: 75,
              rubberband: [
                { offset: 0, vol: 90 },
                { offset: 1.5, vol: 35 },
                { offset: 7.0, vol: 35 },
                { offset: 8.5, vol: 95 },
                { offset: 12.0, vol: 0 }
              ]
            }
          ];

          // Marcadores de cena (Cue Points)
          S.markers = [
            { id: "mk_1", time: 1.0, label: "ENTRADA GC", color: "green", comment: "Entrada do terço inferior de Brasília" },
            { id: "mk_2", time: 4.5, label: "CORTE VT", color: "red", comment: "Transição dissolve para sinal master" },
            { id: "mk_3", time: 7.0, label: "SAÍDA GC", color: "blue", comment: "Fim do letreiro animado" }
          ];

          S.playhead = 2.8;
          S.selectedClipId = "v1_c1";
          S.selectedClipIds = ["v1_c1", "a1_sync"];

          recalcSequenceDuration();
          renderTimeline();
          renderMonitorFrame();
          updateStatusBar();
        })()
      `);
      await sleep(500);
      await capture("03_montagem_timeline_multitrilhas.png", "3. Montagem na Linha do Tempo Multi-Trilhas (V1..V3 / A1..A2) com Curvas de Volume");

      // ETAPA 4: PALETA DE TRANSIÇÕES PREMIERE 95
      console.log("Executando Etapa 4: Paleta de Transições...");
      await exec(`
        (() => {
          S.sideTab = "trans";
          renderSide();
        })()
      `);
      await sleep(400);
      await capture("04_aplicacao_transicoes_dissolve_fade.png", "4. Paleta de Transições Adobe Premiere 95 (Dissolve & Fades no Corte)");

      // ETAPA 5: PROCESSO DE RECORTE CHROMA KEY NO DIÁLOGO DEDICADO
      console.log("Executando Etapa 5: Processador Chroma Key...");
      await exec(`
        (() => {
          const pipClip = S.clips.v2 && S.clips.v2[0];
          openChromaKeyDialog(pipClip);
          const ckWin = document.getElementById("chromaWin");
          if (ckWin) {
            ckWin.style.left = "260px";
            ckWin.style.top = "50px";
          }
        })()
      `);
      await sleep(600);
      await capture("05_recorte_chroma_key_processador.png", "5. Recorte de Chroma Key em Tempo Real no Processador Dedicado 1995");

      // ETAPA 6: PROCESSADOR DE EFEITOS DIGITAIS 3D (DVE 1995)
      console.log("Executando Etapa 6: Console 3D DVE...");
      await exec(`
        (() => {
          // Fecha chroma
          document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
          document.querySelectorAll(".scrim").forEach(s => s.remove());

          const pipClip = S.clips.v2 && S.clips.v2[0];
          pipClip.rotY = 32;
          pipClip.rotX = 18;
          pipClip.depthZ = -45;
          pipClip.dve3dBevel = true;
          pipClip.scanlinesCRT = true;

          open3DDVEConsole(pipClip);
          const dveWin = document.getElementById("dve3DConsoleWin");
          if (dveWin) {
            dveWin.style.left = "260px";
            dveWin.style.top = "50px";
          }
          renderMonitorFrame();
        })()
      `);
      await sleep(600);
      await capture("06_efeitos_3d_dve_rotacao_moldura.png", "6. Suíte de Efeitos Digitais 3D (DVE 1995 — Giro Yaw/Pitch & Moldura Biselada)");

      // ETAPA 7: TITULADOR CHYRON 95 & SELETOR DE CORES OFICIAL WINDOWS 95
      console.log("Executando Etapa 7: Titulador Chyron & Seletor de Cores Win95...");
      await exec(`
        (() => {
          // Fecha DVE
          document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
          document.querySelectorAll(".scrim").forEach(s => s.remove());

          openChyronDialog();
          const gcWin = document.getElementById("gcWin");
          if (gcWin) {
            gcWin.style.left = "40px";
            gcWin.style.top = "50px";
          }
          const txtIn = document.getElementById("gc-txt");
          if (txtIn) txtIn.value = "REDE BRASIL 95 · EDIÇÃO EXTRA";
          const subIn = document.getElementById("gc-sub");
          if (subIn) subIn.value = "AO VIVO DE BRASÍLIA";
          const gradSel = document.getElementById("gc-grad");
          if (gradSel) gradSel.value = "3d_chisel";
          const typeSel = document.getElementById("gc-type");
          if (typeSel) typeSel.value = "lower_third";

          // Abre o seletor oficial de cores Win95 posicionado ao lado do titulador
          openWin95ColorDialog("#FFD700", (cor) => {});
          const colWin = document.getElementById("win95ColorDialog");
          if (colWin) {
            colWin.style.left = "560px";
            colWin.style.top = "70px";
          }
        })()
      `);
      await sleep(700);
      await capture("07_titulador_chyron_lower_third_e_cores_win95.png", "7. Gerador de Videografismo Chyron 95 & Seletor de Cores Oficial Windows 95");

      // ETAPA 8: MESA DE SOM ANALÓGICA & MEDIDORES VU GALVANOMÉTRICOS
      console.log("Executando Etapa 8: Mesa de Som & Console VU...");
      await exec(`
        (() => {
          // Fecha diálogos anteriores
          document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
          document.querySelectorAll(".scrim").forEach(s => s.remove());

          openAudioMixerDialog();
          const mixWin = document.getElementById("mixerWin");
          if (mixWin) {
            mixWin.style.left = "30px";
            mixWin.style.top = "40px";
            const btnVu = document.getElementById("btnToggleMixerVuMode");
            if (btnVu) btnVu.click();
          }

          openAnalogVUConsole();
          const vuWin = document.getElementById("analogVuBridgeWin");
          if (vuWin) {
            vuWin.style.left = "450px";
            vuWin.style.top = "260px";
            const cvs = vuWin.querySelector("#analogBridgeCanvas");
            if (cvs && typeof drawDualAnalogVUMeters === "function") {
              drawDualAnalogVUMeters(cvs, 0.94, 0.88);
            }
          }
        })()
      `);
      await sleep(600);
      await capture("08_mixagem_audio_faders_e_vu_galvanometrico.png", "8. Mesa de Som Analógica 95 e Console de Medidores VU Galvanométricos Estéreo");

      // ETAPA 9: CORREÇÃO DE COR 3-VIAS & MONITORAMENTO EM VETORSCÓPIO
      console.log("Executando Etapa 9: Correção de Cor 3-Way & Vetorscópio...");
      await exec(`
        (() => {
          // Fecha janelas
          document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
          document.querySelectorAll(".scrim").forEach(s => s.remove());

          // Configura modo dividido no monitor
          prefs.scopeMode = "split";
          open3WayColorDialog();
          const col3Win = document.getElementById("color3WayWin");
          if (col3Win) {
            col3Win.style.left = "430px";
            col3Win.style.top = "50px";
          }
          renderMonitorFrame();
        })()
      `);
      await sleep(600);
      await capture("09_correcao_de_cor_3_vias_e_vetorscopio.png", "9. Correção de Cor 3-Vias (Lift, Gamma, Gain) e Vetorscópio Analógico");

      // ETAPA 10: REPRODUÇÃO DO MASTER FINAL COM TIMECODE BURN-IN (WINDOW DUB)
      console.log("Executando Etapa 10: Reprodução do Master Final com Timecode Burn-In...");
      await exec(`
        (() => {
          // Fecha todas as janelas para focar no monitor e na bancada limpa
          document.querySelectorAll(".win:not(#appWin)").forEach(w => { if (w._close) w._close(); else w.remove(); });
          document.querySelectorAll(".scrim").forEach(s => s.remove());

          prefs.scopeMode = "video";
          prefs.windowDub = {
            enabled: true,
            mode: "both",
            pos: "bottom-center",
            size: 22,
            opacity: 85,
            burnExport: true
          };

          S.playhead = 3.46;
          setPlayhead(3.46, false);
          renderMonitorFrame();
          renderTimeline();

          // Atualiza barra de status com indicador de broadcast ao vivo
          const st = document.getElementById("statusTxt");
          if (st) st.textContent = "REPRODUZINDO MASTER FINAL · TCR 00:00:03:14 · 30.00 FPS DROP-FRAME · ÁUDIO ESTÉREO 16-BIT DSP · SMPTE LEGAL";
        })()
      `);
      await sleep(600);
      await capture("10_reproducao_master_final_timecode_burnin.png", "10. Reprodução do Filme Master Final com Timecode Burn-In (Window Dub) & Compositing");

      console.log("\n=== TODAS AS 10 CAPTURAS DA DEMONSTRAÇÃO CONCLUÍDAS COM SUCESSO! ===");
      console.log("Arquivos salvos em: " + OUTPUT_DIR);

      app.quit();
    } catch (err) {
      console.error("Erro durante a captura de demonstração:", err);
      app.quit();
    }
  });
});
