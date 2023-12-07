"use client"

import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {JournalCard} from "@/app/types/entities";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {usePathname, useRouter} from "next/navigation";
import {FiSettings, FiTrash2} from "react-icons/fi";

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
    journalCard : JournalCard,
    onDelete : (id : number) => void,
}

const JournalCard = ({journalCard, onDelete}: JournalCardProps) => {

    const router = useRouter()
    const pathName = usePathname()

    // paths
    const journalSlugPath = `/journal/${journalCard.id}`
    const journalCardPath = pathName.concat(journalSlugPath)
    const journalSettingsPath = pathName.concat(journalSlugPath).concat("/settings/step-1")

    const classValues: ClassValue[] = [
        "hover:cursor-pointer border-2 !py-0 !gap-0 border-white col-span-6 p-5 gap-[30px]",
        "hover:border-2 hover:border-border-gray transition"
    ]

    const handleCardClick = () => router.push(journalCardPath)
    const handleSettingsClick = () => router.push(journalSettingsPath)

    return (
        <CardWrapper className={cn(classValues)}>
            <HeaderRow
                classNames={{
                    wrapper: "w-full py-5 justify-between border-b-2 border-background pb-[15px]",
                    header : "text-[20px]"
            }}
                header={journalCard.name}
            >
                <div className={"flex flex-row gap-[15px] items-center"}>
                    <FiSettings
                        size={"20px"}
                        className={"stroke-text-gray hover:cursor-pointer hover:stroke-info-blue-default"}
                        onClick={handleSettingsClick}
                    />
                    <FiTrash2
                        size={"20px"}
                        className={"text-text-gray hover:cursor-pointer hover:stroke-info-red"}
                        onClick={() => onDelete(journalCard.id)}
                    />
                </div>
            </HeaderRow>
            <div onClick={handleCardClick} className={"py-5 w-full flex flex-row gap-[20px]"}>
                <CountCard
                    header={"Issues"}
                    info={journalCard.issueCount + " issues"}
                />
                <CountCard
                    header={"Workers"}
                    info={journalCard.workerCount + " workers"}
                />
            </div>
        </CardWrapper>
    );
};

export default JournalCard;
