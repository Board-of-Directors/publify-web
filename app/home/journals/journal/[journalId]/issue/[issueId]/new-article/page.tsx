"use client"

import React from 'react';
import {useCreateNewArticle} from "@/app/home/journals/journal/[journalId]/issue/[issueId]/new-article/page.hooks";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import Text from "@/app/components/atoms/text/Text";

const CreateArticlePage = ({params}: {
    params: {
        issueId: number
    }
}) => {

    const {
        handleSubmit, register,
        errors, exception
    } = useCreateNewArticle(params.issueId)

    return (
        <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
            <CreateJournalStepWrapper
                onSubmit={handleSubmit}
                buttonText={"Create article"}
            >
                <TextInput
                    label={"Article name"}
                    register={register("name")}
                    error={errors.name?.message}
                    labelClassName={"text-[18px] text-text-black"}
                    placeholder={"Enter name of your article"}
                />
                <TextInput
                    label={"Article description"}
                    register={register("description")}
                    error={errors.description?.message}
                    labelClassName={"text-[18px] text-text-black"}
                    placeholder={"Enter description of your article"}
                />
                <Text
                    text={exception}
                    className={"text-[16px] text-info-red"}
                />
            </CreateJournalStepWrapper>
        </div>
    );

};

export default CreateArticlePage;
