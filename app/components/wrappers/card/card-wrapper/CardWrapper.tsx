import React, {LegacyRef} from 'react';
import {cn} from "@/app/utils/cn";

type CardWrapperProps = {
    style?: {
        transition: string | undefined,
        transform: string | undefined
    },
    children: React.ReactNode,
    onClick?: () => void,
    className?: string
}

const CardWrapper = React.forwardRef(({className, onClick, children, style}: CardWrapperProps, ref) => {
    return (
        <div
            ref={ref as LegacyRef<HTMLDivElement>}
            style={style}
            onClick={onClick}
            className={cn("p-7 rounded-2xl bg-white flex flex-col gap-4", className)}
        >
            {children}
        </div>
    );
});

export default CardWrapper;
