import Electron from 'electron';
import Path from 'node:path';

declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const SPLASH_WINDOW_WEBPACK_ENTRY: string;
declare const SPLASH_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const ROOT_PATH: string = process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : Electron.app.getAppPath();

const ASSETS_PATH: string = Path.join(ROOT_PATH, 'assets');
const DATA_PATH: string = Path.join(ROOT_PATH, 'data');

let appWindow: Electron.BrowserWindow | null;
let splashWindow: Electron.BrowserWindow | null;

function createAppWindow(): void {
    appWindow = new Electron.BrowserWindow({
        icon: Path.join(ASSETS_PATH, 'icon.png'),
        show: false,

        frame: false,
        autoHideMenuBar: true,

        width: 800,
        height: 500,
        
        minWidth: 800,
        minHeight: 500,

        backgroundColor: '#2C313C',
        
        webPreferences: {
            devTools: process.env.NODE_ENV === 'development',
            preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });

    appWindow?.loadURL(APP_WINDOW_WEBPACK_ENTRY);

    appWindow?.on('ready-to-show', function(): void {
        appWindow?.show();
        appWindow?.focus();
    });

    appWindow.on('closed', function(): void {
        appWindow = null;
    });
}

function createSplashWindow(): void {
    splashWindow = new Electron.BrowserWindow({
        icon: Path.join(ASSETS_PATH, 'icon.png'),
        show: false,

        frame: false,
        autoHideMenuBar: true,

        resizable: false,
        maximizable: false,
        minimizable: false,
        
        width: 300,
        height: 300,

        backgroundColor: '#2C313C',

        webPreferences: {
            devTools: process.env.NODE_ENV === 'development',
            preload: SPLASH_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });

    splashWindow.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY);

    splashWindow.on('ready-to-show', function(): void {
        splashWindow?.show();
        splashWindow?.focus();
    });

    splashWindow.on('closed', function(): void {
        splashWindow = null;
    });
}

async function registerListeners(): Promise<void> {
    Electron.ipcMain.on('get path', function(event: Electron.IpcMainEvent, path: 'root' | 'assets' | 'data'): void {
        if (path === 'root') event.returnValue = ROOT_PATH;
        else if (path === 'assets') event.returnValue = ASSETS_PATH;
        else if (path === 'data') event.returnValue = DATA_PATH;
    });

    Electron.ipcMain.on('splash', function(_, _action: 'done'): void {
        if (!splashWindow) return;

        splashWindow.close();
        if (!appWindow) createAppWindow();
    });

    Electron.ipcMain.on('is app', function(event: Electron.IpcMainEvent, _query: 'maximized'): void {
        if (!appWindow) return;

        event.returnValue = appWindow.isMaximized();
    });

    Electron.ipcMain.on('app', function(_, action: 'close' | 'maximize' | 'minimize' | 'restore'): void {
        if (!appWindow) return;
        
        if (action === 'close') appWindow.close();
        if (action === 'maximize') appWindow.maximize();
        if (action === 'minimize') appWindow.minimize();
        if (action === 'restore') appWindow.restore();
    });
}

const appLock: boolean = Electron.app.requestSingleInstanceLock();

if (!appLock) {
    Electron.app.quit();

} else {
    Electron.app.on('second-instance', function(_event: Electron.Event, _argv: string[], _workingDirectory: string, _additionalData: any): void {
        if (appWindow?.isVisible()) {
            if (appWindow.isMinimized()) appWindow.restore();
            appWindow.focus();  

        } else if (splashWindow?.isVisible()) {
            splashWindow.focus();
        }
    });

    Electron.app.on('ready', createSplashWindow)
        .whenReady()

        .then(registerListeners)

        .catch(function(e: any): void { 
            console.error(e); 
        });

    Electron.app.on('window-all-closed', function(): void {
        if (process.platform !== 'darwin') {
            Electron.app.quit();
        }
    });

    Electron.app.on('activate', function(): void {
        if (Electron.BrowserWindow.getAllWindows().length === 0) {
            createSplashWindow();
        }
    });
}
