import {HTMLInputTypeAttribute} from "react";
import Text from "@/app/components/atoms/text/Text";
import {cn} from "@/app/utils/cn";
import {ClassValue} from "clsx";
import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

export type TextInputProps = {
    register?: any | undefined
    onChange?: (event: string) => void
    value?: string | undefined
    placeholder: string
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    type?: HTMLInputTypeAttribute
}

const TextInput = (props: TextInputProps) => {

    const classValue: ClassValue[] = [
        "focus:outline-none",
        {
            "border-2 border-background": !props.error,
            "border-2 border-info-red": props.error,
            "hover:border-2 hover:border-text-black": !props.error,
            "focus:border-background": !props.error
        }
    ]

    return (
        <div className={"w-full flex flex-col gap-[10px]"}>
            <input
                {...props.register}
                className={cn("px-6 py-5 flex flex-row text-[15px]" +
                    " items-center rounded-xl bg-none", classValue)}
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
    );
};

export default TextInput;
