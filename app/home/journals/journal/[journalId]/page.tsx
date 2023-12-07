"use client"

import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import IssueCardV2 from "@/app/components/organisms/issue-card-v2/IssueCardV2";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import DeletePopup from "@/app/components/organisms/popups/delete-popup/DeletePopup";
import {useJournalPage} from "@/app/home/journals/journal/[journalId]/page.hooks";
import Text from "@/app/components/atoms/text/Text";

const JournalPage = ({params}: {
    params: { journalId: string }
}) => {

    const {
        handleCreateIssue, handleSettingsClick,
        handleClosePopup, handleDeleteIssue,
        issueIdToDelete, issues, journal
    } = useJournalPage(+params.journalId)

    return (
        <>
            {
                issueIdToDelete && <DeletePopup
                    onClose={handleClosePopup}
                />
            }
            <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
                <GridBlock>
                    <HeaderRow
                        header={journal && journal.name}
                        classNames={{wrapper: "justify-between"}}
                        leftContent={
                            <Text
                                text={`${journal.issueCount} issues`}
                                className={"hint"}
                            />
                        }
                    >
                        <Button
                            onClick={handleCreateIssue}
                            className={"w-[340px]"}
                            icon={<FiPlus size={"18px"}/>}
                            text={"Create new issue"}
                        />
                    </HeaderRow>
                    {
                        issues.map((issue) => (
                            <IssueCardV2
                                issue={issue}
                                onDelete={handleDeleteIssue}
                            />
                        ))
                    }
                </GridBlock>
            </div>
        </>
    );
};

export default JournalPage;
