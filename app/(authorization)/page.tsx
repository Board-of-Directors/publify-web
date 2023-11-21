"use client"

import React from 'react';
import Button from "@/app/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";
import LogoWithCaption from "@/app/components/svg/logo/LogoWithCaption";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";

const AuthorizationPage = () => {

    const router = useRouter()
    const handleSignUp = () => router.push("/sign-up/step-1")
    const handleLogIn = () => router.push("/log-in/step-1")

    return (
        <>
            <LogoWithCaption className={"h-11"}/>
            <CardWrapper className={"w-[370px]"}>
                <Button onClick={handleSignUp} text={"Sign Up"}/>
                <Button onClick={handleLogIn} text={"Log In"}/>
            </CardWrapper>
        </>
    );
};

export default AuthorizationPage;
