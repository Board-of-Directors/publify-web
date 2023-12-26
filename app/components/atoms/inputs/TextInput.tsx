"use client"

import React, {HTMLInputTypeAttribute} from "react";
import Text from "@/app/components/atoms/text/Text";
import {cn} from "@/app/utils/cn";
import {ClassValue} from "clsx";
import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

export type TextInputProps = {
    placeholder: string,
    defaultValue ?: string,
    label ?: string,
    className?: string,
    labelClassName?: string,
    wrapperClassName?: string,
    icon?: React.ReactNode
    register?: any | undefined
    onChange?: (event: string) => void
    value?: string | undefined
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    type?: HTMLInputTypeAttribute
}

const TextInput = (props: TextInputProps) => {

    const classValues: ClassValue[] = [
        "focus:outline-none font-semibold",
        props.className,
        "w-full px-6 py-5 flex flex-row text-[15px] items-center rounded-xl bg-none",
        {
            "border-2 border-background": !props.error,
            "border-2 border-info-red": props.error,
            "hover:border-2 hover:border-text-black": !props.error,
            "focus:border-background": !props.error,
        }
    ]

    return (
        <div className={cn("w-full flex flex-col gap-[10px]", props.wrapperClassName)}>
            {
                props.label && <Text
                    text={props.label}
                    className={props.labelClassName}
                />
            }
            <div className={"w-full relative"}>
                <div className={"absolute top-1/3 right-[30px]"}>
                    {props.icon}
                </div>
                <input
                    {...props.register}
                    defaultValue={props.defaultValue}
                    className={cn(classValues)}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(event) => {
                        if (props.onChange) props.onChange(event.target.value)
                    }}
                    type={props.type}
                />
                {
                    props.error && <Text
                        text={props.error as string}
                        className={"text-info-red"}
                    />
                }
            </div>
        </div>
    );
};

export default TextInput;
