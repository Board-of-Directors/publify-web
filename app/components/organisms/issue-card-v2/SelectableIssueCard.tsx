import React from 'react';
import {Issue} from "@/app/types/issue";
import IssueCardV2 from "@/app/components/organisms/issue-card-v2/IssueCardV2";
import {cn} from "@/app/utils/cn";

type SelectableIssueCardProps = {
    issue: Issue,
    isSelected : boolean,
    onSelect : (issue : Issue) => void
}

const issueStyles = (isSelected : boolean) => ({
    "border-2 border-blue-400" : isSelected,
    "border-2 border-border-gray" : !isSelected
});

const SelectableIssueCard = (props : SelectableIssueCardProps) => (
    <IssueCardV2
        className={cn('col-span-1', issueStyles(props.isSelected))}
        onClick={() => props.onSelect(props.issue)}
        issue={props.issue} isInteractive={false}
    />
);

export default SelectableIssueCard;
