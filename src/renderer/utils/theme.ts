let _theme: string;

function _setRoot(): void {
    document.getElementById('root')?.classList.remove('dark--theme', 'light--theme');
    document.getElementById('root')?.classList.add(`${getTheme()}--theme`);
}

export function setTheme(theme: string): void {}

export function getTheme(): string {
    if (_theme === 'system') {
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
            else return 'light';
    
        } else {
            return 'dark';
        }
    }
    
    return _theme;
}

export function getThemes(): string[] {
    return ['system', 'dark', 'light'];
}

export function loadTheme(): string {
    _theme = global.window.Bridge.loadPreferences().theme;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', _setRoot);
    _setRoot();

    return _theme;
}
