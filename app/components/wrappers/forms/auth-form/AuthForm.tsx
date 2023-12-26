"use client"

import React from 'react';
import Button from "@/app/components/atoms/buttons/button/Button";
import AuthNavbar from "@/app/components/moleculas/auth-navbar/AuthNavbar";
import Text from "@/app/components/atoms/text/Text";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

type AuthFormProps = {
    children: React.ReactNode
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
    nextPage?: string,
    buttonText?: string,
}

const AuthForm = ({children, onSubmit, nextPage, buttonText = "Next Step"}: AuthFormProps) => {

    const router: AppRouterInstance = useRouter()

    return (
        <>
            <AuthNavbar/>
            <form onSubmit={onSubmit} className={"flex flex-col items-center gap-4"}>
                {children}
                <Button type={"submit"} text={buttonText}/>
                {
                    nextPage && <Text
                        text={"Skip for now"}
                        className={"text-text-gray hover:cursor-pointer" +
                            " hover:text-text-black transition"}
                        onClick={() => router.push(nextPage)}
                    />
                }
            </form>
        </>
    );
};

export default AuthForm;
