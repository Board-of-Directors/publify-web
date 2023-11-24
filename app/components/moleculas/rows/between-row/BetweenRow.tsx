import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import Text from "@/app/components/atoms/text/Text";

const BetweenRow = ({header, descr, className} : {
    header : string,
    descr : string,
    className? : string
}) => {

    const classValues : ClassValue[] = [
        "w-full flex flex-row items-baseline justify-between",
        className
    ]

    return (
        <div className={cn(classValues)}>
            <Text text={header} className={"text-text-gray"} />
            <Text text={descr} className={"text-text-black"} />
        </div>
    );

};

export default BetweenRow;
