import React from 'react';
import style from "./Button.module.css"
import {cn} from "@/app/utils/cn";
import TextBase from "@/app/components/text/text-base/TextBase";

type ButtonProps = {
    onClick : () => void
    text : string
    icon? : React.ReactNode
    className? : string
}

const Button = ({onClick, text, icon, className} : ButtonProps) => {
    return (
        <button className={cn(style.button, className)} onClick={onClick}>
            {icon}
            <TextBase text={text} className={"text-white"}/>
        </button>
    );
};

export default Button;
