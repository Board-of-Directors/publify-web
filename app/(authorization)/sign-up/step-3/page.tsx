"use client"

import React, {FormEvent, useState} from 'react';
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import EmailRoleInput from "@/app/components/organisms/email-role-input/EmailRoleInput";
import {Employee} from "@/app/types/entities";

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
    );

};

export default ThirdStepPage;
