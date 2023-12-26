"use client"

import React, {useState} from 'react';
import {FiEye, FiEyeOff} from "react-icons/fi";
import TextInput, {TextInputProps} from "@/app/components/atoms/inputs/TextInput";

const EyeButton = ({isOpen, setOpen}: {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}) => {
    return (
        <div className={"hover:cursor-pointer absolute z-10 top-[25px] right-[24px]"}>
            {
                isOpen ? <FiEye size={"18px"}
                                className={"stroke-text-gray"}
                                onClick={() => setOpen(false)}
                    />
                    : <FiEyeOff size={"18px"}
                                className={"stroke-text-gray"}
                                onClick={() => setOpen(true)}
                    />
            }
        </div>
    )
}

type PasswordProps = Omit<TextInputProps, "type">

const PasswordInput = (props: PasswordProps) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <div className={"relative w-full"}>
            <EyeButton isOpen={isOpen} setOpen={setOpen}/>
            <TextInput
                {...props}
                type={isOpen ? "text" : "password"}
            />
        </div>
    );
};

export default PasswordInput;
