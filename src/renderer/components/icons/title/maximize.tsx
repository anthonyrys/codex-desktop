import React from 'react';

import { IconProps } from '../icon-props'

export function TitleMaximizeIcon(props: IconProps): React.ReactElement {
    return (
        <svg height={ `${props.size}px` } width={ `${props.size}px` } viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M3 3v10h10V3H3zm9 9H4V4h8v8z"/>
        </svg>
    );
}
