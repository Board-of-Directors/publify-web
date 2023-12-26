import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import React from "react";

const TextArea = ({className}: {
    className?: string
}) => {

    const inputCV: ClassValue[] = [
        "w-full h-[180px] rounded-xl border-2 border-background",
        "px-6 py-5 text-[15px] focus:outline-0",
        className
    ]

    return (
        <textarea
            className={cn(inputCV)}
            placeholder={"Enter text"}
        />
    )

}

export default TextArea