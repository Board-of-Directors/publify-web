"use client"

import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import Text from "@/app/components/atoms/text/Text";
import React from "react";

export type SelectItem = {
    name: string,
    action ?: () => void
}

type SelectButtonClassNames = {
    wrapper?: string,
    item?: string
}

const SelectButton = ({items, classNames, selectedItem, onSelect}: {
    selectedItem: SelectItem,
    onSelect: (item: SelectItem) => void,
    items: SelectItem[],
    classNames?: SelectButtonClassNames,
}) => {

    const wrapperClassValues: ClassValue[] = [
        "flex flex-row items-center",
        classNames?.wrapper
    ]

    const defaultItemCV: ClassValue[] = [
        "px-8 py-3 bg-none border-2 border-background text-text-black",
        "hover:bg-background transition hover:duration-200 hover:cursor-pointer",
        classNames?.item
    ]

    return (
        <div className={cn(wrapperClassValues)}>
            {
                items.map((item, index) => {
                    const curItemCV: ClassValue = {
                        "rounded-l-xl border-r-0": index === 0,
                        "rounded-r-xl border-l-0": index === items.length - 1,
                        "bg-black text-white border-text-black hover:bg-black":
                            item.name === selectedItem.name,
                    }
                    return <div
                        onClick={() => {
                            onSelect(item)
                            item.action?.()
                        }}
                        className={cn(defaultItemCV, curItemCV)}
                    >
                        <Text text={item.name}/>
                    </div>
                })
            }
        </div>
    )
}

export default SelectButton