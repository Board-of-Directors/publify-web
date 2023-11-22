import React from 'react';
import Button, {ButtonProps} from "@/app/components/atoms/buttons/button/Button";
import {ClassValue} from "clsx";

const TextButton = (props: ButtonProps) => {

    const classValues : ClassValue[] = [
        "p-0 text-info-blue-default border-none outline-none bg-opacity-0 rounded-none",
        "hover:text-info-blue-hover"
    ]

    return (
        <Button
            {...props}
            className={classValues}
        />
    );
};

export default TextButton;
