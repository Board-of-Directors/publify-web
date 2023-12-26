"use client"

import React from "react";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {cn} from "@/app/utils/cn";
import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {IssueStatus} from "@/app/types/entities";

export type IssueDTO = {
    issueId: number,
    articlesCount: number
    issueStatus: IssueStatus,
    title: string,
    date: string,
}

const IssueCard = ({issue, className}: {
    issue: IssueDTO,
    className?: string
}) => {

    const textClassValues: ClassValue[] = [
        "text-text-gray",
        {"text-info-blue-default": issue.issueStatus === IssueStatus.READY}
    ]

    const tagClassValues: ClassValue[] = [
        "w-fit rounded-full px-[15px] py-[8px] flex flex-row items-center justify-center bg-background",
        {"bg-info-blue-default bg-opacity-20": issue.issueStatus === IssueStatus.READY}
    ]

    const wrapperClassValues: ClassValue[] = [
        "col-span-4 p-[30px] gap-[15px] border-2 border-white",
        "hover:cursor-pointer transition hover:border-2 hover:border-border-gray",
        {"hover:border-info-blue-default hover:border-opacity-50": issue.issueStatus === IssueStatus.READY},
        className
    ]

    return (
        <CardWrapper className={cn(wrapperClassValues)}>

            <div className={cn(tagClassValues)}>
                <Text text={issue.issueStatus} className={cn(textClassValues)}/>
            </div>

            <Text
                text={issue.title}
                className={"text-text-black text-[20px] min-h-[60px]"}
            />

            <div className={"flex flex-row items-center gap-2"}>
                <Text text={issue.date} className={"text-text-gray"}/>
                <div className={"w-[5px] h-[5px] bg-border-gray rounded-full"}/>
                <Text text={issue.articlesCount + " articles"} className={"text-text-gray"}/>
            </div>

        </CardWrapper>
    );
};

export default IssueCard;
