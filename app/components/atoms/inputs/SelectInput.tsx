import React, {useState} from 'react';
import Text from "@/app/components/atoms/text/Text";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

type SelectInputProps = {
    value: string,
    options: Array<string>,
    onChange: (value: string) => void,
    placeholder?: string,
    isMulti?: boolean,
    errorMessage?: string,
    className?: Iterable<ClassValue>
}

type PopoverListProps = {
    options: Array<string>,
    selectedOption: string,
    onSelect: (selectedItem: string) => void
}

const ChevronButton = ({isOpen, setOpen}: {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}) => {
    return (
        <>
            {
                isOpen ? <FiChevronUp
                    size={"22px"}
                    className={"hover:cursor-pointer stroke-text-gray"}
                    onClick={() => setOpen(false)}
                /> : <FiChevronDown
                    size={"22px"}
                    className={"hover:cursor-pointer stroke-text-gray"}
                    onClick={() => setOpen(true)}
                />
            }
        </>
    )
}

const PopoverList = (props: PopoverListProps) => {

    const itemClassValues: ClassValue[] = [
        "w-full p-5 bg-white text-text-gray",
        "hover:bg-background hover:cursor-pointer", "active:bg-border-gray"
    ]

    const mainWrapper = "absolute z-10 top-[70px] left-0 w-full rounded-xl" +
        " bg-white drop-shadow-lg flex flex-col overflow-clip"

    return (
        <div className={mainWrapper}>
            {
                props.options.map((option) => (
                    <div
                        className={cn(itemClassValues, {
                            "text-text-black": props.selectedOption === option
                        })}
                        onClick={() => props.onSelect(option)}
                    >
                        <Text text={option}/>
                    </div>
                ))
            }
        </div>
    )
}

const SelectInput = (props: SelectInputProps) => {

    const [isOpen, setOpen] = useState<boolean>(false)

    const classValues: ClassValue[] = [
        "relative w-full flex flex-row items-center justify-between",
        "px-4 py-5 rounded-xl border-2 border-background border-background",
        props.className
    ]

    const textStyles = {
        'text-text-black' : props.value?.length > 0,
        'text-text-gray' : props.value?.length === 0,
    }

    return (
        <div className={cn("w-full flex flex-col gap-[10px]", props.className)}>
            <div className={cn(classValues)}>
                <Text
                    text={props.value?.length > 0 ? props.value : props.placeholder}
                    className={cn(textStyles)}
                />
                <ChevronButton
                    isOpen={isOpen}
                    setOpen={setOpen}
                />
                {
                    isOpen && (
                        <PopoverList
                            options={props.options}
                            selectedOption={props.value}
                            onSelect={props.onChange}
                        />
                    )
                }
            </div>
            {
                props.errorMessage && <Text
                    text={props.errorMessage}
                />
            }
        </div>
    );
};

export default SelectInput;
