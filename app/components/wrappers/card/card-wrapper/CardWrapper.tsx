import React from 'react';
import {cn} from "@/app/utils/cn";

type CardWrapperProps = {
    children: React.ReactNode,
    onClick? : () => void,
    className?: string
}

const CardWrapper = ({className, onClick, children}: CardWrapperProps) => {
    return (
        <div
            onClick={onClick}
            className={cn("p-7 rounded-2xl bg-white flex flex-col gap-4", className)}
        >
            {children}
        </div>
    );
};

export default CardWrapper;
