import React from 'react';
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import PopupLayout from "@/app/components/wrappers/layout/popup-layout/PopupLayout";
import Text from "@/app/components/atoms/text/Text";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import Button from "@/app/components/atoms/buttons/button/Button";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {PopupProps} from "@/app/components/organisms/popups/Popup.types";

export type ItemData = {
    header: string,
    content?: string
}

type DeletePopupClassNames = {
    wrapper?: string,
    itemRow?: string
}

type DeletePopupProps = {
    classNames?: DeletePopupClassNames,
    confirmText?: string,
    onChange?: (confirmText: string) => void,
    itemData: ItemData[],
    onDelete: () => void
} & PopupProps

const ItemRow = ({itemData, className}: {
    itemData: ItemData[],
    className ?: string
}) => {

    const itemRowCV : ClassValue[] = [
        "w-full p-5 flex flex-row justify-between border-b-2 border-t-2 border-background",
        className
    ]

    return (
        <div className={cn(itemRowCV)}>
            {
                itemData.map((item) => (
                    <div className={"flex flex-col gap-[2px]"}>
                        <Text text={item.header} className={"text-[13px] text-text-gray"}/>
                        <Text text={item.content} className={"text-[16px] text-text-black"}/>
                    </div>
                ))
            }
        </div>
    )
}

const DeletePopup = (
    {
        itemData, confirmText, classNames,
        onChange, onDelete, onClose
    }: DeletePopupProps
) => {
    return (
        <PopupLayout classNames={{card: "w-[470px] top-[200px] p-0 gap-0"}}>
            <HeaderRow
                classNames={{
                    wrapper: "p-5 justify-between items-center",
                    header: "text-[20px]"
                }}
                header={"Journal deletion"}
            >
                <FiX
                    size={"20px"}
                    type={"red"}
                    className={"icon"}
                    onClick={onClose}
                />
            </HeaderRow>
            <ItemRow className={classNames?.itemRow} itemData={itemData}/>
            <TextInput
                wrapperClassName={"p-5 border-b-2 border-background "}
                placeholder={"Enter the name of the journal"}
                value={confirmText}
                onChange={onChange}
            />
            <Button
                className={"w-[220px] m-5 bg-info-red hover:text-info-red border-2 border-info-red hover:bg-none"}
                text={"Delete journal"}
                onClick={onDelete}
            />
        </PopupLayout>
    );
};

export default DeletePopup;
