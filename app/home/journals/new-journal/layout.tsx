import React from 'react';
import StepBanner from "@/app/components/moleculas/step-banner/StepBanner";

const CreateNewJournalLayout = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <div className={"mt-[-30px]"}>
            <StepBanner />
            <div className={"w-full mt-[30px] px-[215px] flex flex-col gap-[20px]"}>
                {children}
            </div>
        </div>
    );
};

export default CreateNewJournalLayout;
