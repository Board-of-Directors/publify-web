import React from 'react';
import {cn} from "@/app/utils/cn";

type CenterLayoutProps = {
    axis?: 'x' | 'y' | "both"
    children: React.ReactNode,
    className?: string
}

const CenterLayout = (
    {
        axis = "both",
        className,
        children
    }: CenterLayoutProps
) => {
    return (
        <main className={cn("w-full h-full flex flex-col", className, {
            "justify-center": axis === "both" || axis === "x",
            "items-center": axis === "both" || axis === "y",
        })}>
            {children}
        </main>
    );
};

export default CenterLayout;
