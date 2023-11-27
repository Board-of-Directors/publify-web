"use client"

import Button from "@/app/components/atoms/buttons/button/Button";
import {useJournalsPage} from "@/app/home/journals/page.hooks";
import {FiPlus, FiSearch} from "react-icons/fi";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import React, {useState} from "react";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import JournalCard from "@/app/components/organisms/cards/journal-card/JournalCard";
import {useRouter} from "next/navigation";
import DeletePopup from "@/app/components/organisms/popups/delete-popup/DeletePopup";

const JournalsPage = () => {

    const [deletePopupVisible, setDeleteVisible] = useState<boolean>(false)

    const router = useRouter()
    const context = useJournalsPage()
    const [text, setText] = useState("")

    return (
        <>
            {deletePopupVisible && <DeletePopup onClose={() => setDeleteVisible(false)}/>}
            <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
                <GridBlock>

                    <Button
                        onClick={() => router.push("/home/journals/new-journal/step-1")}
                        className={"col-span-3"}
                        icon={<FiPlus size={"18px"}/>}
                        text={"Add journal"}
                    />
                    <TextInput
                        wrapperClassName={"col-span-9"}
                        placeholder={"Type name of the company"}
                        icon={<FiSearch size={"18px"} className={"stroke-text-gray"}/>}
                        onChange={setText}
                        value={text}
                    />

                    {
                        context.mockJournals.map(
                            (journalCard) => (
                                <JournalCard
                                    onDelete={() => setDeleteVisible(true)}
                                    journalCard={journalCard}
                                />
                            ))
                    }
                </GridBlock>
            </div>
        </>
    );
};

export default JournalsPage;
