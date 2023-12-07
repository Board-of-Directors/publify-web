"use client"

import React from 'react';

import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import {useEditJournalFirstStep} from "@/app/home/journals/journal/[journalId]/settings/step-1/page.hooks";

const EditJournalFirstStep = ({params} : {
    params : {journalId : number}
}) => {

    const {
        handleSubmit,
        register,
        errors, journal
    } = useEditJournalFirstStep(params.journalId)

    return (
        <CreateJournalStepWrapper
            onSubmit={handleSubmit}
            buttonText={"Save changes"}
        >
            <TextInput
                label={"Journal name"}
                register={register("title")}
                error={errors.title?.message}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={journal.name}
            />
            <TextInput
                label={"Journal description"}
                register={register("description")}
                error={errors.description?.message}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={journal.description}
            />
        </CreateJournalStepWrapper>
    );

};

export default EditJournalFirstStep;
