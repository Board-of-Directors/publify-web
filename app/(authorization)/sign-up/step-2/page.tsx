"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import {useSecondStepContext} from "@/app/(authorization)/sign-up/step-2/page.hooks";
import PasswordInput from "@/app/components/atoms/inputs/PasswordInput";

const SecondStepPage = () => {

    const {
        register,
        handleSubmit, errors
    } = useSecondStepContext()

    return (
        <AuthForm onSubmit={handleSubmit}>
            <TextInput
                register={register("organizationName")}
                error={errors.organizationName?.message}
                placeholder={"Enter name of your organization"}
            />
            <PasswordInput
                register={register("password")}
                error={errors.password?.message}
                placeholder={"Enter your password"}
            />
        </AuthForm>
    );
};

export default SecondStepPage;
