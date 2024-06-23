import React, {ReactNode} from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import Link from "next/link";

type LinkButtonProps = {
    href : string,
    text : string,
    className ?: string,
    icon ?: ReactNode
}

const LinkButton = ({text, icon, className, href} : LinkButtonProps) => {
    const classValues: ClassValue[] = [
        "appearance-none text-white font-semibold text-[15px] w-full py-5 rounded-xl flex flex-row",
        "justify-center items-center gap-[10px] border-2 border-text-black bg-text-black",
        "hover:outline-none hover:bg-opacity-0 hover:transition hover:text-text-black",
        className
    ]

    return (
        <Link href={href} className={cn(classValues)}>
            {icon}{text}
        </Link>
    );
};

export default LinkButton;
