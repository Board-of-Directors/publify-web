"use client"

import React, {FormEvent, useState} from 'react';
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import EmailRoleInput from "@/app/components/organisms/email-role-input/EmailRoleInput";
import {Employee} from "@/app/types/entities";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";

const ThirdStepPage = () => {

    const initialEmployee: Employee = {email: "", role: "Copyrighter"}
    const initialState: Employee[] = Array.from({length: 2}, () => initialEmployee)

    const [
        employees,
        setEmployees
    ] = useState<Employee[]>(initialState)

    const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(employees)
    }

    return (
        <CardWrapper className={"w-[430px]"}>
            <AuthForm
                onSubmit={handleSubmit}
                nextPage={"/sign-up/step-4"}
                buttonText={"Send invitations"}
            >
                <EmailRoleInput
                    employees={employees}
                    setEmployees={setEmployees}
                />
            </AuthForm>
        </CardWrapper>
    );

};

export default ThirdStepPage;