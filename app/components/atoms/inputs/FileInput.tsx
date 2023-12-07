"use client"

import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import Text from "@/app/components/atoms/text/Text";
import {FiUpload, FiX} from "react-icons/fi";
import React, {ChangeEvent, LegacyRef, useRef} from "react";
import {FieldValues, UseFormRegister} from "react-hook-form";

type FileInputProps = {
    value: File | undefined,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onClear: () => void,
    register ?: UseFormRegister<FieldValues>,
    label?: string,
    placeholder?: string,
    className?: string,
}

const FileInput = (props: FileInputProps) => {

    const classValues: ClassValue[] = [
        "relative flex flex-row items-center justify-between",
        "bg-none border-2 border-background rounded-xl p-5",
        "hover:outline-none hover:border-text-black hover:cursor-pointer",
        props.className
    ]

    const textClassValues: ClassValue[] = [
        "text-[15px]",
        {
            "text-text-gray": props.value === undefined,
            "text-text-black": props.value !== undefined
        }
    ]

    const iconClassValue: ClassValue = "stroke-text-gray hover:stroke-info-blue-default"

    const inputRef = useRef<HTMLInputElement | undefined>(undefined)

    const handleInputClear = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = event.target as HTMLInputElement
        element.value = ''
    }

    const handleIconClick = () => {
        inputRef.current?.click()
    }

    return (
        <div className={"w-full flex flex-col gap-[10px]"}>
            <Text
                text={props.label}
                className={"text-[18px] text-text-black"}
            />
            <div className={cn(classValues)}>
                <Text
                    text={props.value?.name ?? props.placeholder}
                    className={cn(textClassValues)}
                />
                {
                    props.value ? <FiX
                        size={"18px"}
                        className={iconClassValue}
                        onClick={props.onClear}
                    /> : <FiUpload
                        size={"18px"}
                        className={iconClassValue}
                        onClick={handleIconClick}
                    />
                }
                <input
                    accept={".png, .jpg"}
                    onChange={props.onChange}
                    onClick={handleInputClear}
                    ref={inputRef as LegacyRef<HTMLInputElement>}
                    type={"file"}
                    className={"hidden absolute"}
                />
            </div>
            <Text
                text={"300x200px"}
                className={"text-[15px] text-text-gray"}
            />
        </div>
    )

};

export default FileInput;
