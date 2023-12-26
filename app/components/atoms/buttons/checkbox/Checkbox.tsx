import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {FiCheck} from "react-icons/fi";

export type CheckboxProps = {
    isSelected : boolean,
    setSelected : (isSelected : boolean) => void
}

const Checkbox = ({isSelected, setSelected} : CheckboxProps) => {

    const checkboxCV : ClassValue[] = [
        "w-6 h-6 rounded-[6px] flex items-center",
        "justify-center border-2 border-border-gray",
        "hover:bg-background hover:cursor-pointer hover:duration-200 transition"
    ]

    return (
        <div
            onClick={() => setSelected(!isSelected)}
            className={cn(checkboxCV)}
        >
            {
                isSelected && <FiCheck
                    className={"stroke-[3px]"}
                />
            }
        </div>
    );

};

export default Checkbox;
