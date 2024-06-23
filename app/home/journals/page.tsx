"use client"

import Button from "@/app/components/atoms/buttons/button/Button";
import {useJournalsPage} from "@/app/home/journals/page.hooks";
import {FiPlus, FiSearch} from "react-icons/fi";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import React from "react";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import JournalCard from "@/app/components/organisms/cards/journal-card/JournalCard";
import DeletePopup, {ItemData} from "@/app/components/organisms/popups/delete-popup/DeletePopup";
import LinkButton from "@/app/components/atoms/buttons/LinkButton";

const JournalsPage = () => {

    const {
        journals, journalToDelete,
        journalName, confirmText,
        setText, setJournalIdToDelete,
        handleCreateJournal,
        handleDeleteJournal,
        setJournalName
    } = useJournalsPage()

    const itemData : ItemData[] = [
        {header : "Journal name", content : journalToDelete?.name},
        {header : "Issues count", content : journalToDelete?.issueCount.toString()},
        {header : "Workers count", content : journalToDelete?.workerCount.toString()},
    ]

    return (
        <>
            {
                journalToDelete && <DeletePopup
                    confirmText={confirmText}
                    itemData={itemData}
                    onChange={setText}
                    onDelete={handleDeleteJournal}
                    onClose={() => setJournalIdToDelete(undefined)}
                />
            }
            <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
                <GridBlock>
                    <LinkButton
                        href={"/home/journals/new-journal/step-1"}
                        className={"col-span-3"}
                        icon={<FiPlus size={"18px"}/>}
                        text={"Add journal"}
                    />
                    <TextInput
                        wrapperClassName={"col-span-9"}
                        placeholder={"Type name of the journal"}
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
