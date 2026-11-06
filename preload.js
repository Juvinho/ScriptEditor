// Ponte segura entre a interface 1995 do ScriptEditor e o sistema operacional Windows / ScriptRoom.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("editorNative", {
  // Projetos de montagem do ScriptEditor (Documentos\ScriptEditor)
  readAll: (colecao) => ipcRenderer.invoke("db:readAll", colecao),
  write: (colecao, id, data) => ipcRenderer.invoke("db:write", colecao, id, data),
  remove: (colecao, id) => ipcRenderer.invoke("db:remove", colecao, id),
  openDataFolder: () => ipcRenderer.invoke("app:openData"),

  // Integração ao vivo com o ScriptRoom (Documentos\ScriptRoom)
  readScriptRoom: () => ipcRenderer.invoke("sr:readAll"),
  writeScriptRoomRoteiro: (id, data) => ipcRenderer.invoke("sr:writeRoteiro", id, data),
  openScriptRoomFolder: () => ipcRenderer.invoke("sr:openFolder"),
  launchScriptRoom: () => ipcRenderer.invoke("sr:launchApp"),
  onScriptRoomChange: (cb) => ipcRenderer.on("sr:changed", (_e, d) => cb(d)),

  // Importação e Exportação de Mídias e Cortes
  pickMedia: (tipo) => ipcRenderer.invoke("media:pick", tipo),
  pickScriptFile: () => ipcRenderer.invoke("script:pickFile"),
  pickProjectFile: () => ipcRenderer.invoke("project:pickFile"),
  pickProjectSavePath: (nome) => ipcRenderer.invoke("project:pickSavePath", nome),
  readTextFile: (filePath) => ipcRenderer.invoke("file:readText", filePath),
  pickSrtFile: () => ipcRenderer.invoke("srt:pickFile"),
  saveAs: (nome, bytes, filtros) => ipcRenderer.invoke("file:saveAs", nome, bytes, filtros),
  getDefaultExportDir: () => ipcRenderer.invoke("file:getDefaultExportDir"),
  pickSavePath: (nome, filtros, caminhoAtual) => ipcRenderer.invoke("file:pickSavePath", nome, filtros, caminhoAtual),
  writeToPath: (filePath, bytes) => ipcRenderer.invoke("file:writeToPath", filePath, bytes),
  showInFolder: (filePath) => ipcRenderer.invoke("file:showInFolder", filePath),
  exportBegin: (opts) => ipcRenderer.invoke("export:begin", opts),
  exportPushFrames: (b64List) => ipcRenderer.invoke("export:pushFrames", b64List),
  exportFinish: () => ipcRenderer.invoke("export:finish"),
  exportCancel: () => ipcRenderer.invoke("export:cancel"),

  // Janela e Splash Screen
  minimize: () => ipcRenderer.invoke("win:min"),
  maximize: () => ipcRenderer.invoke("win:max"),
  close: () => ipcRenderer.invoke("win:close"),
  version: () => ipcRenderer.invoke("app:version"),
  splashDone: () => ipcRenderer.invoke("splash:done"),
  openSplash: () => ipcRenderer.invoke("app:splash"),

  // Sistema de Atualização (GitHub: Juvinho/ScriptEditor)
  checkUpdate: () => ipcRenderer.invoke("update:check"),
  downloadUpdate: () => ipcRenderer.invoke("update:download"),
  cancelUpdate: () => ipcRenderer.invoke("update:cancel"),
  installUpdate: () => ipcRenderer.invoke("update:install"),
  openUpdatePage: (url) => ipcRenderer.invoke("update:openPage", url),
  onUpdateProgress: (cb) => {
    const fn = (_e, d) => cb(d);
    ipcRenderer.on("update:progress", fn);
    return () => ipcRenderer.removeListener("update:progress", fn);
  }
});

