"use client"

import React from 'react';
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import SelectInput from "@/app/components/atoms/inputs/SelectInput";
import {Employee, Role} from "@/app/types/entities";

type EmailRoleInputProps = {
    employees: Employee[],
    setEmployees: (value: Employee[]) => void
}

const EmailRoleRow = ({employee, setEmployee} : {
    employee : Employee,
    setEmployee : (employee : Employee) => void
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
        <div className={"w-full flex flex-row gap-2"}>
            <TextInput
                value={employee.email}
                onChange={(email) => handleChangeEmployee(email)}
                placeholder={"Enter member’s e-mail"}
            />
            <SelectInput
                value={employee.role}
                onChange={(role) => handleChangeEmployee(undefined, role)}
                options={roles}
            />
        </div>
    )

}

const EmailRoleInput = ({employees, setEmployees}: EmailRoleInputProps) => {

    const addNewEmployee = () => {
        setEmployees([...employees, {
            email: "",
            role: "Copyrighter"
        }])
    }

    const updateEmployees = (index : number, employee : Employee) => {

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
                        />
                    ))
                }
            </div>
            <TextButton
                text={"Add member"}
                icon={
                    <FiPlus
                        size={"22px"}
                        className={"stroke-info-blue"}
                    />
                }
                onClick={addNewEmployee}
            />
        </div>
    );
};

export default EmailRoleInput;
