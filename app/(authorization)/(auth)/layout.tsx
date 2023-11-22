"use client"

import React from 'react';
import LogoWithCaption from "@/app/components/svg/logo/with-caption/LogoWithCaption";
import {useRouter} from "next/navigation";
import {FiArrowLeft} from "react-icons/fi";

const SignInLayout = ({children} : {
    children : React.ReactNode
}) => {

    const router = useRouter()
    const handleBackClick = () => router.back()

    return (
        <div className={"w-full flex flex-col items-center gap-10"}>
            <div className={"flex flex-row items-center gap-[20px]"}>
                <FiArrowLeft
                    size={"24px"}
                    className={"hover:cursor-pointer stroke-text-gray"}
                    onClick={handleBackClick}
                />
                <LogoWithCaption className={"h-11"}/>
            </div>
            {children}
        </div>
    );
};

export default SignInLayout;
