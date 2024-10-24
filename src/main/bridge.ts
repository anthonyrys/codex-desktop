import Electron from 'electron';

import { loadPreferences, savePreferences } from './locals/preferences';

interface Bridge {
    onSplash(action: 'done'): void;

    isApp(query: 'maximized'): boolean;
    onApp(action: 'close' | 'maximize' | 'minimize' | 'restore'): void;

    loadPreferences: typeof loadPreferences;
    savePreferences: typeof savePreferences;
}

export const Bridge: Bridge = {
    onSplash: function(action: 'done'): void {
        Electron.ipcRenderer.send('splash', action);
    },

    isApp: function(query: 'maximized'): boolean {
        return Electron.ipcRenderer.sendSync('is app', query);
    },

    onApp: function(action: 'close' | 'maximize' | 'minimize' | 'restore'): void {
        return Electron.ipcRenderer.send('app', action);
    },

    loadPreferences: loadPreferences,
    savePreferences: savePreferences,
};

Electron.contextBridge.exposeInMainWorld('Bridge', Bridge);
