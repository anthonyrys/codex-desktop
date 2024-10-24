import ReactDOMClient from 'react-dom/client';
import React from 'react';

import { Titlebar, Sidebar, Content } from '@ui';
import { loadTheme } from '@utils/theme';
import '@styles/app.scss'

function App(): React.ReactElement {
    React.useEffect(function(): void {
        loadTheme();
    });

    return (<>
        <Titlebar />

        <div id='content--wrapper'>
            <Sidebar />
            <Content />
        </div>
    </>);
}

let node: HTMLElement | null = document.getElementById('root');

if (node !== null) {
    let root: ReactDOMClient.Root = ReactDOMClient.createRoot(node);
    root.render(<App />);
}
