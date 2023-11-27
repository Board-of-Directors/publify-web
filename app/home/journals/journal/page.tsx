"use client"

import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useState} from "react";
import {IssueShortDTO} from "@/app/types/entities";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import IssueImage from "@/public/images/issue-image.png"
import IssueCardV2 from "@/app/components/organisms/issue-card-v2/IssueCardV2";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import DeletePopup from "@/app/components/organisms/popups/delete-popup/DeletePopup";

const JournalPage = () => {

    const [text, setText] = useState<string>("")
    const [isDeletePopupActive, setActive] = useState<boolean>(false)

    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const mockIssuesList: IssueShortDTO[] = [
        {
            issueId: 0,
            title: "Tyler, the Creator",
            image: IssueImage.src,
            issueNumber: 1,
            date: "25.12.23"
        }, {
            issueId: 0,
            title: "Tyler, the Creator",
            image: IssueImage.src,
            issueNumber: 1,
            date: "25.12.23"
        }, {
            issueId: 0,
            title: "Tyler, the Creator",
            image: IssueImage.src,
            issueNumber: 1,
            date: "25.12.23"
        }, {
            issueId: 0,
            title: "Tyler, the Creator",
            image: IssueImage.src,
            issueNumber: 1,
            date: "25.12.23"
        },
    ]

    const handleSettingsClick = () => router.push(pathName.concat("/settings"))

    return (
        <>
            {
                isDeletePopupActive && <DeletePopup
                    onClose={() => setActive(false)}
                />
            }
            <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
                <GridBlock>
                    <HeaderRow
                        header={"My journal"}
                        descr={`${mockIssuesList.length} issues`}
                        classNames={{wrapper: "justify-between"}}
                    >
                        <Button
                            onClick={() => router.push(pathName.concat("/new-issue/step-1"))}
                            className={"w-[340px]"}
                            icon={<FiPlus size={"18px"}/>}
                            text={"Create new issue"}
                        />
                    </HeaderRow>
                    {
                        mockIssuesList.map((issue) => (
                            <IssueCardV2
                                issue={issue}
                                onDelete={() => setActive(true)}
                            />
                        ))
                    }
                </GridBlock>
            </div>
        </>
    );
};

export default JournalPage;
