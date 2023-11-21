import React from 'react';
import style from "./Button.module.css"
import {cn} from "@/app/utils/cn";
import Text from "@/app/components/atoms/text/Text";

type ButtonProps = {
    text : string
    onClick? : () => void
    type? : "button" | "submit"
    icon? : React.ReactNode
    className? : string
}

const Button = ({onClick, text, type = "button", icon, className} : ButtonProps) => {
    return (
        <button
            className={cn(style.button, className)}
            type={type}
            onClick={onClick}
        >
            {icon}
            <Text text={text} className={"text-white leading-none"}/>
        </button>
    );
};

export default Button;
