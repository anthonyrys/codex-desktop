import React from 'react';
import * as ReactIconsVSC from 'react-icons/vsc';

import { Button } from '../../components';

export function Titlebar(): React.ReactElement {
    const [maximized, setMaximized] = React.useState<boolean>(global.window.Bridge.isApp('maximized'));
    
    React.useEffect(function(): void {
        window.addEventListener('resize', function(): void {
            setMaximized(global.window.Bridge.isApp('maximized'));
        });
        
    }, []);

    function onMinimize(_: React.MouseEvent<HTMLButtonElement>): void {
        global.window.Bridge.onApp('minimize');
    }

    function onMaximizeRestore(_: React.MouseEvent<HTMLButtonElement>): void {
        if (maximized) global.window.Bridge.onApp('restore');
        else global.window.Bridge.onApp('maximize');
    }

    function onClose(_: React.MouseEvent<HTMLButtonElement>): void {
        global.window.Bridge.onApp('close');
    }

    return (
        <section id='titlebar'>
            <div id='titlebar-caption--wrapper'>
                <Button onClick={ onMinimize }>
                    <ReactIconsVSC.VscChromeMinimize size={ 16 } />
                </Button>

                <Button onClick={ onMaximizeRestore }>
                    { !maximized 
                        ? <ReactIconsVSC.VscChromeMaximize size={ 16 } /> 
                        : <ReactIconsVSC.VscChromeRestore size={ 16 } /> }
                </Button>

                <Button id='titlebar-close--button' onClick={ onClose }>
                    <ReactIconsVSC.VscChromeClose size={ 16 } />
                </Button>
            </div>
        </section>
    );
}
