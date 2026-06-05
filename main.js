const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 430,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: true, 
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile("index.html");
}

ipcMain.handle("get-local-audio", async () => {
  const musicPath = path.join(__dirname, "canciones"); 

  try {
    if (!fs.existsSync(musicPath)) {
      fs.mkdirSync(musicPath);
    }

    const files = fs.readdirSync(musicPath);
    
    const audioFiles = files.filter(file => 
      [".mp3", ".wav", ".ogg"].includes(path.extname(file).toLowerCase())
    );

    return audioFiles.map(file => ({
      name: path.basename(file, path.extname(file)),
      url: path.join("canciones", file) 
    }));
  } catch (error) {
    console.error("Error leyendo la carpeta de canciones en Arch:", error);
    return [];
  }
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
