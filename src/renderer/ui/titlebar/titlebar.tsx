import React from 'react';

import { Button } from '../../components';
import { TitleMinimizeIcon, TitleMaximizeIcon, TitleRestoreIcon, TitleCloseIcon } from '../../components';

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
                    <TitleMinimizeIcon size={ 16 } />
                </Button>

                <Button onClick={ onMaximizeRestore }>
                    { !maximized 
                        ? <TitleMaximizeIcon size={ 16 } /> 
                        : <TitleRestoreIcon size={ 16 } /> }
                </Button>

                <Button id='titlebar-close--button' onClick={ onClose }>
                    <TitleCloseIcon size={ 16 } />
                </Button>
            </div>
        </section>
    );
}
