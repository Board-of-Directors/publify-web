"use client"

import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {JournalCardDTO} from "@/app/types/entities";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {usePathname, useRouter} from "next/navigation";
import {FiSettings, FiTrash2} from "react-icons/fi";
import {useState} from "react";

const CountCard = ({header, info}: {
    header: string,
    info: string
}) => {
    return (
        <div className={"w-full p-[20px] flex flex-row justify-between" +
            " items-center rounded-xl border-2 border-background hover:bg-background transition"}>
            <Text className={"text-[16px] text-text-gray"} text={header}/>
            <Text className={"text-[16px] text-text-black"} text={info}/>
        </div>
    )
}

type JournalCardProps = {
    journalCard : JournalCardDTO,
    onDelete : () => void
}

const JournalCard = ({journalCard, onDelete}: JournalCardProps) => {

    const router = useRouter()
    const pathName = usePathname()

    const classValues: ClassValue[] = [
        "hover:cursor-pointer border-2 !py-0 !gap-0 border-white col-span-6 p-5 gap-[30px]",
        "hover:border-2 hover:border-border-gray transition"
    ]

    const handleCardClick = () => router.push(pathName.concat("/journal"))

    return (
        <CardWrapper className={cn(classValues)}>
            <HeaderRow
                classNames={{
                    wrapper: "w-full py-5 justify-between border-b-2 border-background pb-[15px]",
                    header : "text-[20px]"
            }}
                header={journalCard.header}
            >
                <div className={"flex flex-row gap-[15px] items-center"}>
                    <FiSettings
                        size={"20px"}
                        className={"stroke-text-gray hover:cursor-pointer hover:stroke-info-blue-default"}
                        onClick={() => console.log("Settings Clicked")}
                    />
                    <FiTrash2
                        size={"20px"}
                        className={"text-text-gray hover:cursor-pointer hover:stroke-info-red"}
                        onClick={onDelete}
                    />
                </div>
            </HeaderRow>
            <div onClick={handleCardClick} className={"py-5 w-full flex flex-row gap-[20px]"}>
                <CountCard
                    header={"Issues"}
                    info={journalCard.issuesCount + " issues"}
                />
                <CountCard
                    header={"Workers"}
                    info={journalCard.workersCount + " workers"}
                />
            </div>
        </CardWrapper>
    );
};

export default JournalCard;
