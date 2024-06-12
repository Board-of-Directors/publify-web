import React from 'react';
import {ControlledSelectInputProps} from "./ControlledSelectInput.types";
import {Controller, FieldValues, useFormContext} from "react-hook-form";
import SelectInput from "@/app/components/atoms/inputs/SelectInput";

const ControlledSelectInput = <T extends FieldValues, >(props: ControlledSelectInputProps<T>) => {

    const methods = useFormContext();

    return (
        <Controller
            control={methods.control}
            name={props.name}
            render={({field: {value, onChange}}) => (
                <SelectInput
                    {...props}
                    onChange={onChange}
                    value={value ?? props.options[0]}
                />
            )}
        />
    );
};

export default ControlledSelectInput;
