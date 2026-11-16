const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// نسخة واحدة فقط من البرنامج
if (!app.requestSingleInstanceLock()) app.quit();

let win;
function create() {
  win = new BrowserWindow({
    width: 1100, height: 800, minWidth: 380, minHeight: 600,
    title: 'استهلاك نوفا',
    icon: path.join(__dirname, 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
