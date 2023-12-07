"use client"

import React from 'react';
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import {cn} from "@/app/utils/cn";
import MultipleSelectCol from "@/app/components/organisms/multiple-select-col/MultipleSelectCol";
import {ClassValue} from "clsx";
import {useEditJournalSecondStep} from "@/app/home/journals/journal/[journalId]/settings/step-2/page.hooks";

const EditJournalSecondStep = ({params} : {
    params : {journalId : number}
}) => {

    const {
        handleSubmit,
        control, inputData, handleInputChange,
        handleAddEmail, options
    } = useEditJournalSecondStep(params.journalId)

    const textButtonClassValues: ClassValue[] = [
        "w-[200px] max-text-w-fit bg-orange-500 text-info-blue-default hover:text-info-blue-hover",
        "hover:stroke-info-blue-hover"
    ]

    return (
        <CreateJournalStepWrapper onSubmit={handleSubmit}>
            <HeaderBlock
                classNames={{
                    header: "text-[18px] leading-none",
                    wrapper: "justify-between items-center"
                }}
                header={"Journal workers (optional)"}
                content={
                    <TextButton
                        text={"Add member"}
                        icon={<FiPlus size={"18px"}/>}
                        className={cn(textButtonClassValues)}
                        onClick={handleAddEmail}
                    />
                }
            >
                {
                    options && <MultipleSelectCol
                        control={control}
                        options={options}
                        inputDataList={inputData}
                        onChange={handleInputChange}
                    />
                }
            </HeaderBlock>
        </CreateJournalStepWrapper>
    );

};

export default EditJournalSecondStep;
