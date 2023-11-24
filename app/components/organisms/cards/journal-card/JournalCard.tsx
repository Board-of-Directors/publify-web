import React from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {JournalCardDTO} from "@/app/types/entities";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

const CountCard = ({header, info}: {
    header: string,
    info: string
}) => {
    return (
        <div className={"w-full p-[20px] flex flex-row justify-between" +
            " items-center rounded-xl bg-background"}>
            <Text className={"text-text-gray"} text={header}/>
            <Text className={"text-[18px] text-text-black"} text={info}/>
        </div>
    )
}

const JournalCard = ({journalCard}: { journalCard: JournalCardDTO }) => {

    const descr = journalCard.updateCount === 0
        ? undefined : `${journalCard.updateCount} updates`

    const classValues: ClassValue[] = [
        "hover:cursor-pointer border-2 border-white col-span-6 p-10 gap-[30px]",
        "hover:border-2 hover:border-border-gray transition"
    ]

    return (
        <CardWrapper className={cn(classValues)}>
            <HeaderRow
                classNames={{wrapper: "w-full"}}
                header={journalCard.header}
            >
                {
                    descr && <Text
                        text={descr}
                        className={"text-text-gray"}
                    />
                }
            </HeaderRow>
            <div className={"w-full flex flex-row gap-[20px]"}>
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
