import InputMask from "react-input-mask"
import {TextInputProps} from "@/app/components/atoms/inputs/TextInput";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import Text from "@/app/components/atoms/text/Text";
import React from "react";

type MaskTextInputProps = TextInputProps & {
    mask: string
}

const MaskTextInput = (props: MaskTextInputProps) => {

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
                <InputMask
                    placeholder={props.placeholder}
                    className={cn(classValues)}
                    mask={props.mask}
                    {...props.register}
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

export default MaskTextInput;
