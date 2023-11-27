"use client"

import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import EmailRoleInput from "@/app/components/organisms/email-role-input/EmailRoleInput";
import React, {useState} from "react";
import {Employee} from "@/app/types/entities";
import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";

const CreateJournalSecondStepPage = () => {

    const initialEmployee: Employee = {email: "", role: "Copyrighter"}
    const initialState: Employee[] = Array.from({length: 2}, () => initialEmployee)

    const [
        employees,
        setEmployees
    ] = useState<Employee[]>(initialState)

    const addNewEmployee = () => {
        setEmployees([...employees, {
            email: "",
            role: "Copyrighter"
        }])
    }

    const textButtonClassValues: ClassValue[] = [
        "w-[200px] max-text-w-fit bg-orange-500 text-info-blue-default hover:text-info-blue-hover",
        "hover:stroke-info-blue-hover"
    ]

    return (
        <CreateJournalStepWrapper>
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
                        onClick={addNewEmployee}
                    />
                }
            >
                <EmailRoleInput
                    classNames={{roleWrapper: "w-[200px]"}}
                    employees={employees}
                    setEmployees={setEmployees}
                />
            </HeaderBlock>
        </CreateJournalStepWrapper>
    );
};

export default CreateJournalSecondStepPage;
