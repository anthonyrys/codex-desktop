import React from 'react';

import { IconProps } from '../icon-props'

export function TitleRestoreIcon(props: IconProps): React.ReactElement {
    return (
        <svg height={ `${props.size}px` } width={ `${props.size}px` } viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M3 5v9h9V5H3zm8 8H4V6h7v7z"/>
            <path d="M5 5h1V4h7v7h-1v1h2V3H5v2z"/>
        </svg>
    );
}
