"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import {useSecondStepContext} from "@/app/(authorization)/(auth)/sign-up/step-2/page.hooks";
import PasswordInput from "@/app/components/atoms/inputs/PasswordInput";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Text from "@/app/components/atoms/text/Text";

const SecondStepPage = () => {

    const {
        register,
        handleSubmit, errors,
        exception
    } = useSecondStepContext()

    return (
        <CardWrapper className={"w-[430px]"}>
            <AuthForm onSubmit={handleSubmit} buttonText={"Create organization"}>
                <TextInput
                    register={register("organizationName")}
                    error={errors.organizationName?.message}
                    placeholder={"Enter name of your organization"}
                />
                <PasswordInput
                    register={register("ownerPassword")}
                    error={errors.ownerPassword?.message}
                    placeholder={"Enter your password"}
                />
                <Text
                    text={exception}
                    className={"text-[16px] text-info-red"}
                />
            </AuthForm>
        </CardWrapper>
    );
};

export default SecondStepPage;
