import React, {useEffect, useState} from 'react';
import {PopupProps} from "@/app/components/organisms/popups/Popup.types";
import PopupLayout from "@/app/components/wrappers/layout/popup-layout/PopupLayout";
import {useUnit} from "effector-react";
import {
    $notLinkedIssues,
    getNotLinkedIssuesEvent
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/page.model.get-not-linked-issues";
import {usePathname} from "next/navigation";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import SelectableIssueCard from "@/app/components/organisms/issue-card-v2/SelectableIssueCard";
import {Issue} from "@/app/types/issue";
import Button from "@/app/components/atoms/buttons/button/Button";
import {importIssuesFx} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/page.model.import-issues";

const wrapperStyles = {card: "w-[1000px] p-7 gap-4"}

const headerRowStyles = {
    wrapper: "justify-between items-center",
    header: "text-[20px]"
}

const ChooseIssuePopup = (props: PopupProps) => {
    const importIssues = useUnit(importIssuesFx);
    const [notLinkedIssues, getNotLinkedIssues] = useUnit([$notLinkedIssues, getNotLinkedIssuesEvent]);
    const [selectedIssues, updateSelectedIssues] = useState<Issue[]>([]);

    const pathname = usePathname();
    const issueId = pathname.substring(pathname.lastIndexOf('/') + 1);

    const handleImportIssues = () => {
        importIssues({issueId : +issueId, linkedIssues : selectedIssues.map(issue => issue.id)})
            .then(_ => props.onClose());
    }

    const handleUpdateIssue = (issue : Issue) => {
        updateSelectedIssues(issues => {
            if (issues.includes(issue)) {
                return issues.filter(item => item !== issue);
            } else {
                return [...issues, issue];
            }
        })
    }

    useEffect(() => {
        getNotLinkedIssues(+issueId);
    }, []);

    return (
        <PopupLayout classNames={wrapperStyles}>
            <HeaderRow
                header={"Import from other issues"}
                classNames={headerRowStyles}
            >
                <FiX
                    onClick={props.onClose}
                    className={"icon"}
                    size={"20px"}
                />
            </HeaderRow>
            <section className={'grid grid-cols-4 gap-5'}>
                {notLinkedIssues?.map((issue, index) => (
                    <SelectableIssueCard
                        isSelected={selectedIssues.includes(issue)}
                        onSelect={handleUpdateIssue}
                        issue={issue} key={index}
                    />
                ))}
            </section>
            <Button
                text={'Import'}
                onClick={handleImportIssues}
                className={"w-[220px]"}
            />
        </PopupLayout>
    );
};

export default ChooseIssuePopup;
