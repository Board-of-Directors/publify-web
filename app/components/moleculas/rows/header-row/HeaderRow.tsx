import React from 'react';
import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

const HeaderRow = ({header, className, descr}: {
    header: string,
    descr?: string,
    className?: string
}) => {

    const classValues : ClassValue[] = [
        "col-span-full flex flex-row gap-[20px] items-baseline",
        className
    ]

    return (
        <div className={cn(classValues)}>
            <Text text={header} className={"text-[24px] text-text-black"}/>
            {
                descr && <Text
                    text={descr}
                    className={"text-[18px] text-text-gray"}
                />
            }
        </div>
    )

}

export default HeaderRow;
