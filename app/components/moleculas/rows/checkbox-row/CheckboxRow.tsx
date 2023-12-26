import React from 'react';
import Checkbox, {CheckboxProps} from "@/app/components/atoms/buttons/checkbox/Checkbox";
import Text from "@/app/components/atoms/text/Text";

type CheckboxRowProps = {
    text : string
} & CheckboxProps

const CheckboxRow = ({text, ...props} : CheckboxRowProps) => {
    return (
        <div className={"w-fit flex flex-row gap-3 items-center"}>
            <Text text={text} className={"text-black text-[18px]"}/>
            <Checkbox {...props} />
        </div>
    );
};

export default CheckboxRow;
