"use client"

import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import React, {useEffect} from "react";
import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";
import MultipleSelectCol from "@/app/components/organisms/multiple-select-col/MultipleSelectCol";
import {useUnit} from "effector-react";
import {$credentials, getCredentialsFx} from "@/app/home/organization-settings/models/page.model.credentials";
import {$employees, getAllEmployeesEvent} from "@/app/home/organization-settings/models/page.model.get-employees";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {FieldValues, useFieldArray, useFormContext} from "react-hook-form";
import {AddJournalData} from "@/app/schemas/AddJournalSchema";
import {createJournalFx} from "@/app/home/journals/new-journal/step-2/page.model.create-journal";

const textButtonStyles: ClassValue[] = [
    "w-[200px] max-text-w-fit bg-orange-500 text-info-blue-default hover:text-info-blue-hover",
    "hover:stroke-info-blue-hover"
]

const CreateJournalSecondStepPage = () => {

    const router: AppRouterInstance = useRouter()
    const {handleSubmit, control, reset} = useFormContext<AddJournalData>();
    const {fields, append, remove} = useFieldArray<AddJournalData>({control: control, name: 'employeeEmails'})

    const [employees, getEmployees] = useUnit([ $employees, getAllEmployeesEvent]);
    const [credentials, getCredentials] = useUnit([$credentials, getCredentialsFx]);

    const createJournal = useUnit(createJournalFx);

    const onSubmit = (fieldValues : FieldValues) => {
        const request = {...fieldValues, organizationId : credentials!!.organizationId};

        createJournal(request as AddJournalData).then((response) => {
            if (response.exception === null) router.push("/home/journals")
        })
    }

    useEffect(() => {
        append([{value : ''}])
        getCredentials().then((credentials) => {
            getEmployees(credentials.organizationId);
        });
    }, []);

    return (
        <CreateJournalStepWrapper onClick={handleSubmit(onSubmit)}>
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
                        className={cn(textButtonStyles)}
                        onClick={() => append({value : ''})}
                    />
                }
            >
                <MultipleSelectCol
                    options={employees.map(item => item.email)}
                    control={control} name={'employeeEmails'} fields={fields}
                />
            </HeaderBlock>
        </CreateJournalStepWrapper>
    );
};

export default CreateJournalSecondStepPage;
