"use client"

import React from 'react';
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import EmailRoleInput from "@/app/components/organisms/email-role-input/EmailRoleInput";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {FiPlus} from "react-icons/fi";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {useThirdStepContext} from "@/app/(authorization)/(auth)/sign-up/step-3/page.hooks";

const ThirdStepPage = () => {

    const {handleSubmit, ...context} = useThirdStepContext()

    return (
        <CardWrapper className={"w-[430px]"}>
            <AuthForm
                onSubmit={handleSubmit}
                nextPage={"/sign-up/step-4"}
                buttonText={"Send invitations"}
            >
                <EmailRoleInput
                    employees={context.employees}
                    setEmployees={context.setEmployees}
                />
                <TextButton
                    text={"Add member"}
                    icon={
                        <FiPlus
                            size={"22px"}
                            className={"stroke-info-blue"}
                        />
                    }
                    onClick={context.addNewEmployee}
                />
            </AuthForm>
        </CardWrapper>
    );

};

export default ThirdStepPage;
