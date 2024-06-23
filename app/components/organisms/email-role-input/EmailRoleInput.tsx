"use client"

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import SelectInput from "@/app/components/atoms/inputs/SelectInput";
import {Employee, Role} from "@/app/types/entities";
import {FiTrash2} from "react-icons/fi";

type EmailRoleClassName = {
    emailWrapper?: string,
    roleWrapper?: string
}

type EmailRoleInputProps = {
    employees: Employee[],
    setEmployees ?: (value: Employee[]) => void,
    classNames?: EmailRoleClassName
    onDeleteEmployee?: (employee: Employee) => void,
    onChangeEmployee?: (employee: Employee, newRole : string) => void
}

const EmailRoleRow = ({employee, setEmployee, classNames, onDeleteEmployee, onChangeEmployee}: {
    employee: Employee,
    setEmployee: (employee: Employee) => void,
    classNames?: EmailRoleClassName
    onDeleteEmployee?: (employee: Employee) => void,
    onChangeEmployee?: (employee: Employee, newRole : string) => void
}) => {

    const roles = ["Copyrighter", "Illustrator", "Editor"]
    const employeeRole = employee.role[0].toUpperCase() + employee.role.substring(1).toLowerCase();

    const handleChangeEmployee = (email?: string, role?: string) => {
        const newEmployee: Employee = {
            email: email ? email : employee.email,
            role: (role ? role : employee.role) as Role
        }
        setEmployee(newEmployee)
    }

    if (employeeRole !== 'Owner') return (
        <div className={"w-full flex flex-row gap-4 justify-between"}>
            <TextInput
                value={employee.email}
                onChange={(email) => handleChangeEmployee(email)}
                placeholder={"Enter member’s e-mail"}
                className={classNames?.emailWrapper}
            />
            <SelectInput
                value={employeeRole} className={classNames?.roleWrapper}
                onChange={(role) => {
                    if (onChangeEmployee) {
                        onChangeEmployee(employee, role);
                    } else {
                        handleChangeEmployee(undefined, role)
                    }
                }}
                options={roles}
            />
            {
                onDeleteEmployee ? (
                    <button
                        className={'size-5 text-text-gray hover:cursor-pointer hover:text-info-red'}
                        onClick={() => onDeleteEmployee(employee)}
                    >
                        <FiTrash2 size={"20px"}/>
                    </button>
                ) : null
            }
        </div>
    )
}

const EmailRoleInput = ({employees, setEmployees, classNames, onDeleteEmployee, onChangeEmployee}: EmailRoleInputProps) => {

    const updateEmployees = (index: number, employee: Employee) => {

        const newEmployees = employees.map((oldEmployee, idx) => {
            if (idx === index) return employee
            return oldEmployee
        })

        setEmployees?.(newEmployees)

    }

    return (
        <div className={"w-full flex flex-col gap-[16px]"}>
            <div className={"w-full flex flex-col gap-[12px]"}>
                {employees.map((employee, index) => (
                    <EmailRoleRow
                        onChangeEmployee={onChangeEmployee}
                        onDeleteEmployee={onDeleteEmployee}
                        setEmployee={(employee) => updateEmployees(index, employee)}
                        employee={employee} classNames={classNames}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmailRoleInput;
