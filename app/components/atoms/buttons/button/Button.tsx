import React from 'react';
import {cn} from "@/app/utils/cn";
import {ClassValue} from "clsx";

export type ButtonProps = {
    text: string
    onClick?: () => void
    type?: "button" | "submit"
    icon?: React.ReactNode
    className?: Iterable<ClassValue>
}

const Button = ({onClick, text, type = "button", icon, className}: ButtonProps) => {

    const classValues: ClassValue[] = [
        "appearance-none text-white font-semibold text-[15px] w-full py-5 rounded-xl flex flex-row",
        "justify-center items-center gap-3 border-2 border-text-black bg-text-black",
        "hover:outline-none hover:bg-opacity-0 hover:transition hover:text-text-black",
        className
    ]

    return (
        <button
            className={cn(classValues)}
            type={type}
            onClick={onClick}
        >
            {icon}{text}
        </button>
    );
};

export default Button;
