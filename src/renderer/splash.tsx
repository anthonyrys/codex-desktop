import ReactDOMClient from 'react-dom/client';
import React from 'react';

import { loadTheme } from './utils/theme';
import './styles/splash.scss';

export default function Splash(): React.ReactElement {
    React.useEffect(function(): any {
        loadTheme();

        const interval: NodeJS.Timeout = setInterval(function(): void {
            global.window.Bridge.onSplash('done');
        }, 2000);

        return function(): void { 
            clearInterval(interval); 
        };

    }, []);

    return (<>
        <section id='splash'>
            <div id='splash-loader--container'>
                <div id='splash--loader' />
            </div>
        </section>
    </>);
}

let node: HTMLElement | null = document.getElementById('root');

if (node !== null) {
    let root: ReactDOMClient.Root = ReactDOMClient.createRoot(node);
    root.render(<Splash />);
}
