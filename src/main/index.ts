import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import * as path from 'path';
import * as url from 'url';
import isDev from 'electron-is-dev';

let win: BrowserWindow | null = null;

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!win) {
    createWindow();
  }
});

const createWindow = () => {
  win = new BrowserWindow({
    title: 'Kiwi Launcher',
    frame: false,
    show: false,
    minWidth: 1200,
    icon: path.join(__dirname, '../../', 'resources/icon.png'),
    backgroundColor: '#191919',
    webPreferences: {
      preload: path.join(__dirname, '../preload', 'preload.js'),
      contextIsolation: true,
      experimentalFeatures: true,
      webSecurity: !isDev,
    },
  });

  const localUrl = url.pathToFileURL(path.join(__dirname, '../renderer/', 'index.html'));

  if (process.env.NODE_ENV !== 'production') {
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(localUrl.toString());
  }

  win.once('ready-to-show', () => {
    if (win) {
      win.maximize();
      win.show();
    }

    ipcMain.addListener('close-main-window', () => {
      if (win) {
        win.close();
      }
    });

    ipcMain.addListener('minimize-main-window', () => {
      if (win) {
        win.minimize();
      }
    });

    ipcMain.addListener('maximize-main-window', () => {
      if (win) {
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      }
    });

    protocol.interceptFileProtocol('file', (req, callback) => {
      callback(decodeURI(req.url.substring(8)));
    });
  });

  win.on('closed', () => {
    win = null;
  });
};
