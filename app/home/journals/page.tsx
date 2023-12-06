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

    const [
        journalIdToDelete,
        setJournalIdToDelete
    ] = useState<number | undefined>(undefined)

    const router = useRouter()

    const {
        journals,
        journalName,
        setJournalName
    } = useJournalsPage()

    return (
        <>
            {
                journalIdToDelete &&
                <DeletePopup
                    journalId={journalIdToDelete}
                    onClose={() => setJournalIdToDelete(undefined)}
                />
            }
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
                        onChange={setJournalName}
                        value={journalName}
                    />
                    {
                        journals && journals.map(
                            (journalCard) => (
                                <JournalCard
                                    onDelete={() => setJournalIdToDelete(journalCard.id)}
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
