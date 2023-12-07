"use client"

import React, {useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {getPreviousPathname} from "@/app/utils/getPreviousPathname";
import HeaderBackRow from "@/app/components/organisms/header-back-row/HeaderBackRow";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Text from "@/app/components/atoms/text/Text";
import {FiSettings, FiTrash2} from "react-icons/fi";
import DeletePopup from "@/app/components/organisms/popups/delete-popup/DeletePopup";

const TableHeader = ({titles}: {
    titles: string[]
}) => {
    return (
        <div className={"w-full p-5 flex flex-row items-baseline gap-[60px] border-b-2 border-background"}>
            {
                titles.map((item) => (
                    <Text
                        text={item}
                        className={"w-[180px] text-[16px] text-text-gray"}
                    />
                ))
            }
        </div>
    )
}

const TableRow = ({items, onDelete}: {
    onDelete : () => void,
    items: string[]
}) => {
    return (
        <div className={"w-full p-5 flex flex-row items-center hover:bg-background" +
            " hover:cursor-pointer justify-between border-b-2 border-background"}>
            <div className={"flex flex-row items-baseline gap-[60px]"}>
                {
                    items.map((item) => (
                        <Text text={item} className={"w-[180px] text-text-black"}/>
                    ))
                }
            </div>
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
        </div>
    )
}

const IssuePage = ({params} : {
    params : {
        journalId : string,
        issueId : string
    }
}) => {

    console.log("JOURNAL_ID", params.journalId)
    console.log("ISSUE_ID", params.issueId)

    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()
    const prevPathName: string = getPreviousPathname(pathName)

    const titles = ["Article name", "Text blocks count", "Illustrations count"]
    const row = ["How to fix the plane?", "10 text blocks", "12 illustrations"]

    const handleBackClick = () => router.push(prevPathName)
    const handleButtonClick = () => router.push(pathName.concat("/new-article"))

    const [isPopupVisible, setVisible] = useState<boolean>(false)

    return (
        <>
            {isPopupVisible && <DeletePopup onClose={() => setVisible(false)}/>}
            <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
                <HeaderBackRow
                    text={"Tyler, the Creator"}
                    descr={"9 articles"}
                    buttonText={"Create new article"}
                    onBackClick={handleBackClick}
                    onButtonClick={handleButtonClick}
                />
                <CardWrapper className={"w-full !p-0 !gap-0"}>
                    <TableHeader titles={titles}/>
                    {
                        Array.from({length: 5}, i => i)
                            .map((_) => <TableRow items={row} onDelete={() => setVisible(true)}/>)
                    }
                </CardWrapper>
            </div>
        </>
    );
};

export default IssuePage;
