const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    getLocalAudio: () => ipcRenderer.invoke("get-local-audio")
});