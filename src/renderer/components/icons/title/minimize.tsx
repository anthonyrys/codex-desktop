import React from 'react';

import { IconProps } from '../icon-props'

export function TitleMinimizeIcon(props: IconProps): React.ReactElement {
    return (
        <svg height={ `${props.size}px` } width={ `${props.size}px` } viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M14 8v1H3V8h11z"/>
        </svg>
    );
}
