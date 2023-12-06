"use client"

import React from 'react';
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import {useFirstStepContext} from "@/app/(authorization)/(auth)/sign-up/step-1/page.hooks";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";

const FirstStepPage = () => {

    const {
        register,
        handleSubmit, errors
    } = useFirstStepContext()

    return (
        <CardWrapper className={"w-[430px]"}>
            <AuthForm onSubmit={handleSubmit}>
                <TextInput
                    register={register("ownerFirstName")}
                    error={errors.ownerFirstName?.message}
                    placeholder={"Enter your first name"}
                />
                <TextInput
                    register={register("ownerLastName")}
                    error={errors.ownerLastName?.message}
                    placeholder={"Enter your last name"}
                />
                <TextInput
                    register={register("ownerEmail")}
                    error={errors.ownerEmail?.message}
                    placeholder={"Enter your email"}
                />
            </AuthForm>
        </CardWrapper>
    );
};

export default FirstStepPage;
