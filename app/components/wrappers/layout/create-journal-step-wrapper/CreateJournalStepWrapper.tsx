"use client"

import React from 'react';
import {
    useCreateJournalStepContext
} from "@/app/components/wrappers/layout/create-journal-step-wrapper/useCreateJournalStepContext";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Button from "@/app/components/atoms/buttons/button/Button";

type CreateJournalStepWrapperProps = {
    buttonText?: string,
    onClick?: () => void,
    children: React.ReactNode,
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
}

const CreateJournalStepWrapper = (
    {
        children, onSubmit,
        buttonText = "Next step"
    }: CreateJournalStepWrapperProps
) => {

    const context = useCreateJournalStepContext()

    return (
        <CardWrapper className={"w-full gap-[30px]"}>
            <form onSubmit={onSubmit} className={"flex flex-col gap-4"}>
                {children}
                <div className={"flex flex-row gap-[20px] w-[400px]"}>
                    <Button
                        className={"bg-background border-2 text-text-black border-background hover:bg-none"}
                        onClick={context.handleBackClick}
                        text={"Back"}
                    />
                    <Button
                        type={"submit"}
                        text={buttonText}
                    />
                </div>
            </form>
        </CardWrapper>
    );

};

export default CreateJournalStepWrapper;
