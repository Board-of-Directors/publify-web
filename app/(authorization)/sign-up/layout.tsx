"use client"

import React from 'react';
import LogoWithCaption from "@/app/components/svg/logo/LogoWithCaption";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {useRouter} from "next/navigation";
import {FiArrowLeft} from "react-icons/fi";

const SignInLayout = ({children} : {
    children : React.ReactNode
}) => {

    const router = useRouter()
    const handleBackClick = () => router.back()

    return (
        <>
            <div className={"w-full flex flex-row items-center gap-[20px]"}>
                <FiArrowLeft
                    size={"24px"}
                    className={"hover:cursor-pointer stroke-text-gray"}
                    onClick={handleBackClick}
                />
                <LogoWithCaption className={"h-11"}/>
            </div>
            <CardWrapper className={"w-[430px]"}>
                {children}
            </CardWrapper>
        </>
    );
};

export default SignInLayout;
