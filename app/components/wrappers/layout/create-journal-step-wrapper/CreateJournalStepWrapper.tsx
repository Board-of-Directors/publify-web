"use client"

import React from 'react';
import {
    useCreateJournalStepContext
} from "@/app/components/wrappers/layout/create-journal-step-wrapper/useCreateJournalStepContext";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {cn} from "@/app/utils/cn";
import {FiArrowLeft} from "react-icons/fi";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Button from "@/app/components/atoms/buttons/button/Button";
import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";

type CreateJournalStepWrapperProps = {
    pageTitle: string,
    header: string,
    children: React.ReactNode,
    headerContent?: React.ReactNode,
    buttonText? : string,
    onClick?: () => void,
}

const CreateJournalStepWrapper = (
    {
        pageTitle, header, children,
        headerContent, buttonText = "Next step", onClick
    }: CreateJournalStepWrapperProps
) => {

    const context = useCreateJournalStepContext()

    return (
        <HeaderBlock
            header={pageTitle}
            classNames={{
                wrapper: "justify-between",
                header: "text-[28px]"
            }}
            className={"grid grid-cols-12 gap-x-[30px] gap-y-[20px]"}
            content={
                <TextButton
                    text={"Back"}
                    onClick={context.handleBackClick}
                    className={cn(context.backClassValues)}
                    icon={
                        <FiArrowLeft size={"18px"}/>
                    }
                />
            }
        >
            <CardWrapper className={"p-[40px] col-span-full"}>
                <HeaderRow
                    header={header}
                    classNames={{
                        wrapper: "justify-between",
                        header: "text-[22px]"
                    }}
                >
                    {headerContent}
                </HeaderRow>
                {children}
            </CardWrapper>
            <Button
                onClick={context.handleClick}
                className={"col-span-3"}
                text={buttonText}
            />
        </HeaderBlock>
    );

};

export default CreateJournalStepWrapper;
