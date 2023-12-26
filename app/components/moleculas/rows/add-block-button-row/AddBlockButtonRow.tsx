import React from 'react';
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {cn} from "@/app/utils/cn";
import {ClassValue} from "clsx";

const AddBlockButtonRow = ({onAddText, onAddIllustration}: {
    onAddText: () => void,
    onAddIllustration: () => void
}) => {

    const buttonCV: ClassValue[] = [
        "border-dashed text-text-gray border-2 border-border-gray bg-transparent",
        "hover:border-info-blue-default hover:text-info-blue-default",
        "transition hover:duration-200"
    ]

    return (
        <div className={"h-fit col-span-full flex flex-row gap-[20px] items-center"}>
            <Button
                onClick={onAddText}
                icon={<FiPlus size={"18px"}/>}
                text={"Add text block"}
                className={cn(buttonCV)}
            />
            <Button
                onClick={onAddIllustration}
                icon={<FiPlus size={"18px"}/>}
                text={"Add illustration block"}
                className={cn(buttonCV)}
            />
        </div>
    )
}

export default AddBlockButtonRow;
