"use client"

import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import React, {useState} from "react";
import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";
import MultipleSelectCol from "@/app/components/organisms/multiple-select-col/MultipleSelectCol";
import {useCreateJournalSecondStep} from "@/app/home/journals/new-journal/step-2/page.hooks";
import {InputData} from "@/app/types/entities";

const CreateJournalSecondStepPage = () => {

    const {
        handleSubmit,
        employees,
        control
    } = useCreateJournalSecondStep()

    const options = employees.map(item => item.email)

    const textButtonClassValues: ClassValue[] = [
        "w-[200px] max-text-w-fit bg-orange-500 text-info-blue-default hover:text-info-blue-hover",
        "hover:stroke-info-blue-hover"
    ]

    const initialInputData = Array.from({length: 2},
        (_, index) => {
            return {name: `input-${index}`, value: ""}
        })

    const [
        inputData,
        setInputData
    ] = useState<InputData[]>(initialInputData)

    const handleAddEmail = () => {
        if (inputData.length < employees.length) {
            const newInputName: string = `input_${inputData.length}`
            setInputData([...inputData, {name: newInputName, value: ""}])
        }
    }

    const handleInputChange = (value: string, index: number) => {
        const newValues = inputData.map((inputData, curIndex) => {
            return curIndex === index ? {value: value, name: inputData.name} : inputData
        })
        setInputData(newValues)
    }

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

export default CreateJournalSecondStepPage;
