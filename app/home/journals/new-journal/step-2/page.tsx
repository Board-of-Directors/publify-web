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
        "w-fit text-info-blue-default hover:text-info-blue-hover",
        "hover:stroke-info-blue-hover"
    ]

    return (
        <CreateJournalStepWrapper
            pageTitle={"Add members"}
            header={"Send invite link to members’ e-mail"}
            headerContent={
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
        </CreateJournalStepWrapper>
    );
};

export default CreateJournalSecondStepPage;
