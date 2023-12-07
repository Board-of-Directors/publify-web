"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import {useCreateIssueFirstStep} from "@/app/home/journals/journal/[journalId]/new-issue/step-1/page.hooks";

const CreateIssueFirstStepPage = () => {

    const {
        handleSubmit,
        register,
        errors
    } = useCreateIssueFirstStep()

    return (
        <CreateJournalStepWrapper onSubmit={handleSubmit}>
            <TextInput
                register={register("name")}
                error={errors.name?.message}
                label={"Issue name"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Type here name of your organization"}
            />
            <TextInput
                register={register("description")}
                error={errors.description?.message}
                label={"Issue description"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Enter description of your journal"}
            />
        </CreateJournalStepWrapper>
    );
};

export default CreateIssueFirstStepPage;
