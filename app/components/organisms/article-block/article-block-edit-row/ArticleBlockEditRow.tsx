import React, {useState} from "react";
import {FiBold, FiItalic, FiTrash2, FiUnderline} from "react-icons/fi";
import IconDrag from "@/app/components/icons/IconDrag";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import SelectButton, {SelectItem} from "@/app/components/atoms/buttons/select-button/SelectButton";

export type IconButton = {
    icon: React.ReactNode,
    action: () => void
}

const TextDecoratorRow = () => {

    const iconCV: ClassValue[] = [
        "text-text-black hover:text-info-blue-default hover:cursor-pointer",
        "w-8 h-8 rounded-md bg-background flex items-center justify-center"
    ]

    const iconButtonData: IconButton[] = [
        {
            icon: <FiBold size={"16px"}/>,
            action: () => console.log("MAKE BOLD!")
        },
        {
            icon: <FiUnderline size={"16px"}/>,
            action: () => console.log("MAKE UNDERLINE")
        },
        {
            icon: <FiItalic size={"16px"}/>,
            action: () => console.log("MAKE ITALIC")
        }
    ]

    return (
        <div className={"flex flex-row items-center gap-3"}>
            {
                iconButtonData.map((item) => (
                    <div
                        onClick={item.action}
                        className={cn(iconCV)}
                    >
                        {item.icon}
                    </div>
                ))
            }
        </div>
    )

}

const ArticleBlockEditRow = () => {

    const selectItems: SelectItem[] = [
        {name: "Text"}, {name: "Heading2"}, {name: "Heading3"}
    ]

    const [
        selectedItem,
        setSelected
    ] = useState<SelectItem>(selectItems[0])

    return (
        <div className={"flex flex-row items-center justify-between"}>
            <div className={"flex flex-row items-center gap-7"}>
                <SelectButton
                    selectedItem={selectedItem}
                    onSelect={setSelected}
                    items={selectItems}
                />
                <TextDecoratorRow/>
            </div>
            <div className={"flex flex-row items-center gap-3"}>
                <FiTrash2
                    size={"20px"}
                    type={"red"}
                    className={"icon hover:cursor-pointer"}
                    onClick={() => console.log("DELETE")}
                />
                <IconDrag
                    className={"icon hover:cursor-grab active:cursor-grabbing"}
                    onClick={() => console.log("DRAG")}
                />
            </div>
        </div>
    )
}

export default ArticleBlockEditRow