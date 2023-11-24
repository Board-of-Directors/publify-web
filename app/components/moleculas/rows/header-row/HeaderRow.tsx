import React from 'react';
import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

export type HeaderRowClassNames = {
    wrapper? : string,
    header? : string,
}

const HeaderRow = ({header, classNames, children}: {
    header: string,
    children?: React.ReactNode,
    classNames?: HeaderRowClassNames,
}) => {

    const wrapperClassValue : ClassValue = "col-span-full flex flex-row gap-[20px] items-baseline"
    const headerClassValue : ClassValue = "text-[24px] text-text-black"

    return (
        <div className={cn(wrapperClassValue, classNames?.wrapper)}>
            <Text text={header} className={cn(headerClassValue, classNames?.header)}/>
            {children}
        </div>
    )

}

export default HeaderRow;
