"use client"

import HeaderBlock from "@/app/components/wrappers/blocks/header-block/HeaderBlock";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiTrash2} from "react-icons/fi";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import {Employee} from "@/app/types/entities";
import React, {useState} from "react";
import EmailRoleInput from "@/app/components/organisms/email-role-input/EmailRoleInput";
import Button from "@/app/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";

const SettingsPage = () => {

    const router : AppRouterInstance = useRouter()

    const handleDeleteClick = () => console.log("DELETED")
    const handleButtonClick = () => router.back()

    const initialEmployee: Employee = {email: "", role: "Copyrighter"}
    const initialState: Employee[] = Array.from({length: 2}, () => initialEmployee)

    const [
        employees,
        setEmployees
    ] = useState<Employee[]>(initialState)

    const addNewEmployee = () => {
        setEmployees([...employees, {
            email: "",
            role: "Copyrighter"
        }])
    }

    return (
        <div className={"w-full px-[215px] flex flex-col gap-[30px] mb-[50px]"}>
            <HeaderBlock
                classNames={{wrapper : "justify-between"}}
                header={"Organization settings"}
                content={
                    <TextButton
                        text={"Delete"}
                        onClick={handleDeleteClick}
                        icon={<FiTrash2 size={"18px"}/>}
                        className={"w-fit text-text-gray hover:text-info-red"}
                    />
                }
            >
                <GridBlock>
                    <CardWrapper className={"col-span-full"}>
                        <HeaderRow header={"Organization name"} classNames={{header : "text-[20px]"}}/>
                        <TextInput placeholder={"MyJournal"} />
                    </CardWrapper>
                    <CardWrapper className={"col-span-full"}>
                        <HeaderRow header={"Organization members"} classNames={{header : "text-[20px]"}}/>
                        <EmailRoleInput
                            classNames={{roleWrapper: "w-[200px]"}}
                            employees={employees}
                            setEmployees={setEmployees}
                        />
                    </CardWrapper>
                    <Button
                        onClick={handleButtonClick}
                        className={"col-span-3"}
                        text={"Save changes & Go back"}
                    />
                </GridBlock>
            </HeaderBlock>
        </div>
    );
};

export default SettingsPage;
