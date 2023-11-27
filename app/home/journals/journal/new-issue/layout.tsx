import React from 'react';
import {BannerStep} from "@/app/types/entities";
import StepBanner from "@/app/components/moleculas/step-banner/StepBanner";

const NewIssueLayout = ({children} : {
    children : React.ReactNode
}) => {

    const stepBanners : BannerStep[] = [
        {message : "Name and decsription", pathName : "/step-1"},
        {message : "Number, realase date and cover", pathName : "/step-2"},
    ]

    return (
        <div className={"mt-[-30px]"}>
            <StepBanner stepBanners={stepBanners}/>
            <div className={"w-full mt-[30px] px-[215px] flex flex-col gap-[20px]"}>
                {children}
            </div>
        </div>
    );
};

export default NewIssueLayout;
