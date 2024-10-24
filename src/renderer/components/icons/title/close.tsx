import React from 'react';

import { IconProps } from '../icon-props'

export function TitleCloseIcon(props: IconProps): React.ReactElement {
    return (
        <svg height={ `${props.size}px` } width={ `${props.size}px` } viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"/>
        </svg>
    );
}
