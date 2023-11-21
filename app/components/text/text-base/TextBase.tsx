import React from 'react';
import {TextProps} from "@/app/types/text";
import {cn} from "@/app/utils/cn";

const TextBase = ({text, className} : TextProps) => {
    return (
        <h4 className={cn("text-[15px] font-semibold", className)}>
            {text}
        </h4>
    );
};

export default TextBase;
