import React from 'react';
import * as Ariakit from "@ariakit/react";
import CLSX from 'clsx';

export const Button = React.forwardRef<HTMLButtonElement, Ariakit.ButtonProps>(
    function Button(props: Ariakit.ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>): React.ReactElement {
        return (
            <Ariakit.Button ref={ ref } className={ CLSX('--button', props.className) }
                { ...props }
            />
        );
    },
);
