"use client"

import React from 'react';
import {
    useCreateJournalStepContext
} from "@/app/components/wrappers/layout/create-journal-step-wrapper/useCreateJournalStepContext";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {cn} from "@/app/utils/cn";
import {FiArrowLeft} from "react-icons/fi";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Button from "@/app/components/atoms/buttons/button/Button";
import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";

const CreateJournalStepWrapper = ({children, buttonText = "Next step"} : {
    buttonText? : string,
    children : React.ReactNode
}) => {

    const context = useCreateJournalStepContext()

    return (
        <CardWrapper className={"w-full gap-[30px]"}>
            {children}
            <div className={"flex flex-row gap-[20px] w-[400px]"}>
                <Button
                    className={"bg-background border-2 text-text-black border-background hover:bg-none"}
                    onClick={context.handleBackClick}
                    text={"Back"}
                />
                <Button
                    onClick={context.handleClick}
                    text={buttonText}
                />
            </div>
        </CardWrapper>
    );

};

export default CreateJournalStepWrapper;
