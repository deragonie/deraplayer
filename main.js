const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 340,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true, // Fondo transparente nativo
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Enlazamos el puente seguro
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile("index.html");
}

// Canal IPC: El Renderizador pide canciones y Node.js las busca aquí
ipcMain.handle("get-local-audio", async () => {
  // Apuntamos a la carpeta 'canciones' dentro de tu proyecto
  const musicPath = path.join(__dirname, "canciones"); 

  try {
    // Si la carpeta no existe, la creamos automáticamente para evitar crashes
    if (!fs.existsSync(musicPath)) {
      fs.mkdirSync(musicPath);
    }

    const files = fs.readdirSync(musicPath);
    
    // Filtramos solo formatos de audio válidos
    const audioFiles = files.filter(file => 
      [".mp3", ".wav", ".ogg"].includes(path.extname(file).toLowerCase())
    );

    // Devolvemos el nombre limpio y la ruta relativa para que Chromium la lea sin problemas de CORS
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
