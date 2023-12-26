import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {InputData} from "@/app/types/entities";
import SelectInput from "@/app/components/atoms/inputs/SelectInput";
import {Control, Controller, FieldValues} from "react-hook-form";

type MultipleTextInputProps = {
    control :  Control<FieldValues> | undefined,
    options : string[],
    inputDataList: InputData[]
    onChange: (value: string, index: number) => void,
    className?: string,
}

const MultipleSelectCol = (props: MultipleTextInputProps) => {

    const classValues: ClassValue[] = [
        props.className, "w-full flex flex-col gap-4"
    ]

    return (
        <div className={cn(classValues)}>
            {
                props.inputDataList.map((inputData, index) =>
                    <Controller
                        control={props.control}
                        render={({field: {onChange}}) => (<SelectInput
                                options={props.options}
                                value={inputData.value}
                                onChange={(value: string) => {
                                    onChange(value)
                                    props.onChange(value, index)
                                }}
                                placeholder={"Enter your first name"}
                            />)
                        }
                        name={inputData.name}
                    />
                )
            }
        </div>
    );
};

export default MultipleSelectCol;
