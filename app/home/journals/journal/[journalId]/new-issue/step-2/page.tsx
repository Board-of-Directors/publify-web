"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import {useCreateIssueSecondStep} from "@/app/home/journals/journal/[journalId]/new-issue/step-2/page.hooks";
import FileInput from "@/app/components/atoms/inputs/FileInput";
import Text from "@/app/components/atoms/text/Text";
import {Controller} from "react-hook-form";
import {fileToBase64} from "@/app/utils/fileToBase64";
import MaskTextInput from "@/app/components/atoms/inputs/MaskTextInput";

const CreateIssueSecondStepPage = ({params} : {
    params : {journalId : string}
}) => {

    const {
        handleSubmit,
        control, register,
        exception, file, handleInputChange,
        handleInputClear, errors
    } = useCreateIssueSecondStep(+params.journalId)

    return (
        <CreateJournalStepWrapper onSubmit={handleSubmit} buttonText={"Create issue"}>
            <TextInput
                register={register("number")}
                label={"Issue number (optional)"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Enter the number of the issue"}
            />
            <MaskTextInput
                mask={"9999-99-99"}
                register={register("releaseDate")}
                label={"Release date (optional)"}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Enter the release date of the issue"}
            />
            <Controller
                control={control}
                render={
                    ({field: {onChange}}) => <FileInput
                        label={"Issue cover (optional)"}
                        placeholder={"Upload the cover"}
                        value={file}
                        onClear={handleInputClear}
                        onChange={(e) => {
                            handleInputChange(e)
                            fileToBase64(e.currentTarget.files!![0])
                                .then((image) => onChange(image))
                        }}
                    />
                }
                name={"cover"}
            />
            <Text
                text={exception}
                className={"text-[16px] text-info-red"}
            />
        </CreateJournalStepWrapper>
    );
};

export default CreateIssueSecondStepPage;
