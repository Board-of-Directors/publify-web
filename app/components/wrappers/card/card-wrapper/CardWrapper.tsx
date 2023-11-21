import React from 'react';
import {cn} from "@/app/utils/cn";

type CardWrapperProps = {
    children: React.ReactNode,
    className?: string
}

const CardWrapper = ({className, children}: CardWrapperProps) => {
    return (
        <div className={cn("p-7 rounded-2xl bg-white flex flex-col gap-4", className)}>
            {children}
        </div>
    );
};

export default CardWrapper;
