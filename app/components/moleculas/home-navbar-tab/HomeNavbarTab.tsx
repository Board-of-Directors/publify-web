import React from 'react';
import {cn} from "@/app/utils/cn";
import {ClassValue} from "clsx";

const HomeNavbarTab = ({text, isActive, onClick, icon, className}: {
    text: string,
    isActive?: boolean,
    onClick: () => void,
    className? : string,
    icon?: React.ReactNode
}) => {

    const classValues: ClassValue[] = [
        "pt-[30px] pb-[25px] bg-white flex flex-row items-center gap-2",
        {"border-b-[5px] border-text-black": isActive},
        {"border-b-[5px] border-white": !isActive},
    ]

    const textClassValues: ClassValue[] = [
        "text-[15px] font-semibold text-text-gray hover:cursor-pointer",
        "hover:text-text-black hover:transition",
        {"text-text-black": isActive},
        className
    ]

    return (
        <div className={cn(classValues, textClassValues)} onClick={onClick}>
            {icon}{text}
        </div>
    )

}

export default HomeNavbarTab;
