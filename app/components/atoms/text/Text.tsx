import React from 'react';
import {TextProps} from "@/app/types/text";
import {cn} from "@/app/utils/cn";

const Text = ({text, className, onClick} : TextProps) => {
    return (
        <h4
            className={cn("text-[15px] font-semibold", className)}
            onClick={onClick}
        >
            {text}
        </h4>
    );
};

export default Text;
