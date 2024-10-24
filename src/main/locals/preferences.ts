import Electron from 'electron';
import Path from 'node:path';
import FS from 'node:fs';

const DATA_PATH: string = Electron.ipcRenderer.sendSync('get path', 'data');

interface Preferences {
    theme: 'system' | 'light' | 'dark';
}

function loadDefaultPreferences(): Preferences {
    let preferences: Preferences = {
        theme: 'system'
    };

    savePreferences(preferences);
    return preferences;
}

export function loadPreferences(): Preferences {
    if (!FS.existsSync(Path.join(DATA_PATH, 'preferences.json'))) {
        return loadDefaultPreferences();
    }

    let preferences: Preferences = JSON.parse(FS.readFileSync(Path.join(DATA_PATH, 'preferences.json'), 'utf8'));
    return preferences;
}

export function savePreferences(preferences: Preferences): void {
    FS.writeFileSync(Path.join(DATA_PATH, 'preferences.json'), JSON.stringify(preferences), 'utf8');
}
