import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {Control} from "react-hook-form";
import ControlledSelectInput
    from "@/app/components/atoms/inputs/controlled/controlled-select-input/ControlledSelectInput";

type MultipleTextInputProps = {
    control: Control<any> | undefined,
    options: string[],
    fields : any[]
    name: string,
    className?: string,
}

const MultipleSelectCol = (props: MultipleTextInputProps) => {

    const classValues: ClassValue[] = [
        props.className, "w-full flex flex-col gap-4"
    ]

    return (
        <div className={cn(classValues)}>
            {props.fields.map((_, index) =>
                <ControlledSelectInput
                    placeholder={'Pick employee which will be added to journal'}
                    name={`${props.name}.${index}`}
                    options={props.options}
                />
            )}
        </div>
    );
};

export default MultipleSelectCol;
