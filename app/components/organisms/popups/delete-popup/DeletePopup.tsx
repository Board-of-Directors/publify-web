import React, {useState} from 'react';
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import PopupLayout from "@/app/components/wrappers/layout/popup-layout/PopupLayout";
import Text from "@/app/components/atoms/text/Text";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import Button from "@/app/components/atoms/buttons/button/Button";

type DeletePopupProps = {
    onClose : () => void
}

const ItemRow = () => {

    const mockData = [
        {header: "Journal name", content: "My journal"},
        {header: "Issues count", content: "22"},
        {header: "Workers count", content: "33"},
    ]

    return (
        <div className={"w-full p-5 flex flex-row justify-between border-b-2 border-t-2 border-background"}>
            {
                mockData.map((item) => (
                    <div className={"flex flex-col gap-[2px]"}>
                        <Text text={item.header} className={"text-[13px] text-text-gray"}/>
                        <Text text={item.content} className={"text-[16px] text-text-black"}/>
                    </div>
                ))
            }
        </div>
    )
}

const DeletePopup = ({onClose}: DeletePopupProps) => {

    const [text, setText] = useState<string>("")

    return (
        <PopupLayout classNames={{card : "w-[470px] top-[200px] p-0 gap-0"}}>

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
            <ItemRow />
            <TextInput
                wrapperClassName={"p-5 border-b-2 border-background "}
                placeholder={"Enter the name of the journal"}
                value={text}
                onChange={setText}
            />
            <Button
                className={"w-[220px] m-5 bg-info-red hover:text-info-red border-2 border-info-red hover:bg-none"}
                text={"Delete journal"}
            />
        </PopupLayout>
    );
};

export default DeletePopup;
