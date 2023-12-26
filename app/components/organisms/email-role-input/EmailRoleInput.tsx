"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import SelectInput from "@/app/components/atoms/inputs/SelectInput";
import {Employee, Role} from "@/app/types/entities";

type EmailRoleInputProps = {
    employees: Employee[],
    setEmployees: (value: Employee[]) => void,
    classNames?: EmailRoleClassName
}

const EmailRoleRow = ({employee, setEmployee, classNames}: {
    employee: Employee,
    setEmployee: (employee: Employee) => void,
    classNames?: EmailRoleClassName
}) => {

    const roles = ["Copyrighter", "Illustrator", "Editor"]

    const handleChangeEmployee = (email?: string, role?: string) => {
        const newEmployee: Employee = {
            email: email ? email : employee.email,
            role: (role ? role : employee.role) as Role
        }
        setEmployee(newEmployee)
    }

    return (
        <div className={"w-full flex flex-row gap-2 justify-between"}>
            <TextInput
                value={employee.email}
                onChange={(email) => handleChangeEmployee(email)}
                placeholder={"Enter member’s e-mail"}
                className={classNames?.emailWrapper}
            />
            <SelectInput
                value={employee.role}
                onChange={(role) => handleChangeEmployee(undefined, role)}
                options={roles}
                className={classNames?.roleWrapper}
            />
        </div>
    )

}

type EmailRoleClassName = {
    emailWrapper?: string,
    roleWrapper?: string
}

const EmailRoleInput = (
    {
        employees,
        setEmployees,
        classNames
    }: EmailRoleInputProps
) => {

    const updateEmployees = (index: number, employee: Employee) => {

        const newEmployees = employees.map((oldEmployee, idx) => {
            if (idx === index) return employee
            return oldEmployee
        })

        setEmployees(newEmployees)

    }

    return (
        <div className={"w-full flex flex-col gap-[16px]"}>
            <div className={"w-full flex flex-col gap-[12px]"}>
                {
                    employees.map((employee, index) => (
                        <EmailRoleRow
                            employee={employee}
                            setEmployee={(employee) => updateEmployees(index, employee)}
                            classNames={classNames}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default EmailRoleInput;
