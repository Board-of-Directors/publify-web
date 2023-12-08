import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

type WrapperProps = {
    children : React.ReactNode[],
    className? : string
}

const GridBlock = ({children, className} : WrapperProps) => {

    const classValues : ClassValue[] = [
        "w-full grid grid-cols-12 gap-[30px]",
        className
    ]

    return (
        <div className={cn(classValues)}>
            {children}
        </div>
    );

};

export default GridBlock;
