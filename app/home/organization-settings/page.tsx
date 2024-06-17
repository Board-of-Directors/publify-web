'use client'

import React, {useEffect, useRef, useState} from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import EmailRoleInput from "@/app/components/organisms/email-role-input/EmailRoleInput";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";
import AddUserPopup from "@/app/components/organisms/popups/add-user-popup/AddUserPopup";
import {useToggle} from "usehooks-ts";
import {Employee, Role} from "@/app/types/entities";
import DeleteUserPopup from "@/app/components/organisms/popups/delete-user-popup/DeleteUserPopup";
import {useUnit} from "effector-react";
import {$employees, getAllEmployeesEvent} from "@/app/home/organization-settings/models/page.model.get-employees";
import {editOrganizationNameEvent} from "@/app/home/organization-settings/models/page.model.organization-name";
import {$credentials, getCredentialsFx} from "@/app/home/organization-settings/models/page.model.credentials";
import {createPortal} from "react-dom";
import {editEmployeeFx} from "@/app/home/organization-settings/models/page.model.edit-employee";
import Toast from "@/app/components/moleculas/toast/Toast";
import {Toast as ToastProps} from 'primereact/toast';

const OrganizationSettingsPage = () => {

    const [credentials, getCredentials, editOrganizationName] = useUnit([$credentials, getCredentialsFx, editOrganizationNameEvent]);
    const [employees, getAllEmployees, editEmployee] = useUnit([$employees, getAllEmployeesEvent, editEmployeeFx]);

    const [organizationName, setOrganizationName] = useState<string>('');
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [addPopupVisible, toggleAddPopupVisible] = useToggle();

    const toastRef = useRef<ToastProps>(null);

    const handleChangeOrganizationName = (newName: string) => {
        setOrganizationName(newName);
        editOrganizationName({
            organizationId: credentials!!.organizationId,
            organizationName: newName
        });
    }

    useEffect(() => {
        getCredentials().then(credentials => {
            setOrganizationName(credentials.organizationName);
            getAllEmployees(credentials.organizationId);
        });
    }, []);

    const handleChangeEmployee = (employee: Employee, newRole : string) => {
        editEmployee({workerId : employee.id, newRole : newRole as Role})
            .then(_ => toastRef.current?.show({
                severity: 'success', summary: 'Success', detail: `Role changed to «${newRole}»`, life: 5000
            }))
            .catch(_ => toastRef.current?.show({
                severity: 'error', summary: 'Error', detail: `Can\'t change role to «${newRole}»`, life: 5000
            }))
    }

    return (
        <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
            {createPortal(<Toast ref={toastRef}/>, document.body)}
            {addPopupVisible ? createPortal(<AddUserPopup onClose={toggleAddPopupVisible}/>, document.body) : null}
            {employeeToDelete ? createPortal(<DeleteUserPopup
                onClose={() => setEmployeeToDelete(null)}
                employeeToDelete={employeeToDelete}
            />, document.body) : null}
            <GridBlock>
                <CardWrapper className={"w-full p-[20px] flex flex-col gap-4 col-span-6"}>
                    <Text
                        className={"text-[18px] text-text-black"}
                        text={"Organization members"}
                    />
                    <EmailRoleInput
                        onChangeEmployee={handleChangeEmployee}
                        onDeleteEmployee={setEmployeeToDelete}
                        employees={employees}
                    />
                    <TextButton
                        onClick={toggleAddPopupVisible}
                        text={"Add member"}
                        className={"w-fit"}
                        icon={
                            <FiPlus
                                className={"stroke-info-blue"}
                                size={"22px"}
                            />
                        }
                    />
                </CardWrapper>
                <CardWrapper className={"w-full h-fit p-[20px] flex flex-col gap-4 col-span-6"}>
                    <TextInput
                        label={"Organization name"}
                        labelClassName={"text-[18px] text-text-black"}
                        placeholder={"Type here organization name"}
                        onChange={handleChangeOrganizationName}
                        value={organizationName}
                    />
                </CardWrapper>
            </GridBlock>
        </div>
    );
};

export default OrganizationSettingsPage;
