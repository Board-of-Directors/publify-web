"use client"

import Button from "@/app/components/atoms/buttons/button/Button";
import {useJournalsPage} from "@/app/home/journals/page.hooks";
import {FiPlus, FiSearch} from "react-icons/fi";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import {useState} from "react";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import JournalCard from "@/app/components/organisms/cards/journal-card/JournalCard";

const JournalsPage = () => {

    const context = useJournalsPage()
    const [text, setText] = useState("")

    return (
        <>
            <section className={"w-full grid grid-cols-12 gap-[30px]"}>
                <Button
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
            </section>
            <GridBlock>
                {
                    context.mockJournals.map(
                        (journalCard) => (
                            <JournalCard journalCard={journalCard} />
                        ))
                }
            </GridBlock>
        </>
    );
};

export default JournalsPage;
