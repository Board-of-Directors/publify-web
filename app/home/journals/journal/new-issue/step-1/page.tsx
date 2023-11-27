"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";

const CreateIssueFirstStepPage = () => {
    return (
        <CreateJournalStepWrapper>
            <TextInput
                label={"Issue name"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Type here name of your organization"}
            />
            <TextInput
                label={"Issue description"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Enter description of your journal"}
            />
        </CreateJournalStepWrapper>
    );
};

export default CreateIssueFirstStepPage;
