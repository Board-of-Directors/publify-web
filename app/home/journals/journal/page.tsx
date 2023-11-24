"use client"

import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus, FiSearch, FiSettings} from "react-icons/fi";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useState} from "react";
import IssueCard, {IssueDTO} from "@/app/components/organisms/issue-card/IssueCard";
import {IssueStatus} from "@/app/types/entities";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";
import Text from "@/app/components/atoms/text/Text";

const JournalPage = () => {

    const [text, setText] = useState<string>("")
    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const mockIssuesList: IssueDTO[] = [
        {
            issueId: 0,
            title: "The Battle for Picasso’s Multi-Billion-Dollar Empire",
            date: "20.12.2023",
            articlesCount: 5,
            issueStatus: IssueStatus.READY
        }, {
            issueId: 1,
            title: "Unpacking the Impact of a Brown Paper Bag",
            date: "20.12.2023",
            articlesCount: 2,
            issueStatus: IssueStatus.BOTH
        }, {
            issueId: 2,
            title: "Go With the Flow, Joe!",
            date: "20.12.2023",
            articlesCount: 3,
            issueStatus: IssueStatus.TEXT
        }
    ]

    const handleSettingsClick = () => router.push(pathName.concat("/settings"))

    return (
        <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
            <GridBlock>
                <Button
                    onClick={() => router.push(pathName.concat("/new-issue"))}
                    className={"col-span-3"}
                    icon={<FiPlus size={"18px"}/>}
                    text={"New issue"}
                />
                <div className={"col-span-9 flex flex-row items-center gap-[20px]"}>
                    <TextInput
                        wrapperClassName={"col-span-9"}
                        placeholder={"Type title of the issue"}
                        icon={<FiSearch size={"18px"} className={"stroke-text-gray"}/>}
                        onChange={setText}
                        value={text}
                    />
                    <FiSettings size={"22px"} className={"stroke-text-gray" +
                        " hover:cursor-pointer hover:stroke-info-blue-default"}
                                onClick={handleSettingsClick}
                    />
                </div>

            </GridBlock>
            <HeaderBlock
                header={"MyJournal"}
                content={
                    <Text text={`${mockIssuesList.length} issues`}
                          className={"text-text-gray text-[18px]"}/>
                }
            >
                <GridBlock>
                    {
                        mockIssuesList.map((issue) => (
                            <IssueCard issue={issue}/>
                        ))
                    }
                </GridBlock>
            </HeaderBlock>
        </div>
    );
};

export default JournalPage;
