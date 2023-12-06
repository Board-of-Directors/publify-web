import React, {useEffect, useState} from 'react';
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import PopupLayout from "@/app/components/wrappers/layout/popup-layout/PopupLayout";
import Text from "@/app/components/atoms/text/Text";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import Button from "@/app/components/atoms/buttons/button/Button";
import {useShallow} from "zustand/react/shallow";
import {useStore} from "@/app/store/useStore";
import {JournalCard} from "@/app/types/entities";

type DeletePopupProps = {
    journalId : number,
    onClose : () => void
}

const ItemRow = ({journal} : {journal : JournalCard}) => {

    const data = [
        {header: "Journal name", content: journal.name},
        {header: "Issues count", content: journal.issueCount},
        {header: "Workers count", content: journal.workerCount},
    ]

    return (
        <div className={"w-full p-5 flex flex-row justify-between border-b-2 border-t-2 border-background"}>
            {
                data.map((item) => (
                    <div className={"flex flex-col gap-[2px]"}>
                        <Text text={item.header} className={"text-[13px] text-text-gray"}/>
                        <Text text={item.content?.toString()} className={"text-[16px] text-text-black"}/>
                    </div>
                ))
            }
        </div>
    )
}

const DeletePopup = ({journalId, onClose}: DeletePopupProps) => {

    const [text, setText] = useState<string>("")

    const [getJournal, journal] = useStore(
        useShallow(state =>
            [state.getJournal, state.journal]))

    const deleteJournal = useStore(state => state.deleteJournal)

    useEffect(() => {
        getJournal(journalId)
    }, [])

    const handleOnDelete = () => {
        if (text === journal.name) {
            deleteJournal(journalId)
            onClose()
        }
    }

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
            <ItemRow journal={journal}/>
            <TextInput
                wrapperClassName={"p-5 border-b-2 border-background "}
                placeholder={"Enter the name of the journal"}
                value={text}
                onChange={setText}
            />
            <Button
                className={"w-[220px] m-5 bg-info-red hover:text-info-red border-2 border-info-red hover:bg-none"}
                text={"Delete journal"}
                onClick={handleOnDelete}
            />
        </PopupLayout>
    );
};

export default DeletePopup;
