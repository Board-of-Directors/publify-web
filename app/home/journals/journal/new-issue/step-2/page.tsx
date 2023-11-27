"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

const CreateIssueSecondStepPage = () => {

    const router: AppRouterInstance = useRouter()

    const handleButtonClick = () => router.push("/home/journals/journal")

    return (
        <CreateJournalStepWrapper onClick={handleButtonClick} buttonText={"Create issue"}>
            <TextInput
                label={"Issue number (optional)"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Enter the number of the issue"}
            />
            <TextInput
                label={"Release date (optional)"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Enter the release date of the issue"}
            />
            <TextInput
                label={"Issue cover (optional)"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Upload the cover"}
            />
        </CreateJournalStepWrapper>
    );
};

export default CreateIssueSecondStepPage;
