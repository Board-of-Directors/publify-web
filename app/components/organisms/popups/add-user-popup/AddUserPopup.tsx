import React, {useEffect, useRef, useState} from 'react';
import PopupLayout from "@/app/components/wrappers/layout/popup-layout/PopupLayout";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {PopupProps} from "@/app/components/organisms/popups/Popup.types";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {AddMemberData, AddMemberSchema} from "@/app/schemas/addMemberSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import ControlledSelectInput
    from "@/app/components/atoms/inputs/controlled/controlled-select-input/ControlledSelectInput";
import Button from "@/app/components/atoms/buttons/button/Button";
import {inviteEmployeeFx} from "@/app/home/organization-settings/models/page.model.invite-employee";
import {$credentials} from "@/app/home/organization-settings/models/page.model.credentials";
import {Employee} from "@/app/types/entities";
import {createPortal} from "react-dom";
import {Toast as ToastProps} from "primereact/toast";
import Toast from "@/app/components/moleculas/toast/Toast";

const wrapperStyles = {card: "w-[470px] p-7 gap-4"}

const headerRowStyles = {
    wrapper: "justify-between items-center",
    header: "text-[20px]"
}

const roles = ["Copyrighter", "Illustrator", "Editor"]

const AddUserPopup = (props: PopupProps) => {

    const [credentials, inviteEmployee] = useUnit([$credentials, inviteEmployeeFx]);
    const toastRef = useRef<ToastProps>(null);

    const methods = useForm<AddMemberData>({
        resolver: zodResolver(AddMemberSchema),
        mode: "onSubmit"
    })

    const onSubmit = (fieldValues: FieldValues) => {
        inviteEmployee({organizationId: credentials!!.organizationId, employee: fieldValues as Employee})
            .then(_ => {
                toastRef.current?.show({
                    severity: 'success', summary: 'Success', detail: 'User added successfully', life: 3000
                })
                props.onClose();
            })
            .catch(_ => {
                toastRef.current?.show({
                    severity: 'error', summary: 'Error', detail: 'Can\'t add user', life: 3000
                })
            })
    }

    useEffect(() => {
        methods.reset({
            role: {
                value: roles[0]
            }
        });
    }, []);

    return (
        <FormProvider {...methods}>
            {createPortal(<Toast ref={toastRef}/>, document.body)}
            <PopupLayout classNames={wrapperStyles}>
                <HeaderRow
                    classNames={headerRowStyles}
                    header={"Add member"}
                >
                    <FiX
                        size={"20px"}
                        type={"red"}
                        className={"icon"}
                        onClick={props.onClose}
                    />
                </HeaderRow>
                <TextInput
                    placeholder={"Enter the e-mail of the user"}
                    register={methods.register("email")}
                    error={methods.formState.errors.email?.message}
                />
                <ControlledSelectInput
                    options={roles}
                    name={'role'}
                />
                <Button
                    text={'Send invitation'}
                    onClick={methods.handleSubmit(onSubmit)}
                    className={"w-[220px]"}
                />
            </PopupLayout>
        </FormProvider>
    );
};

export default AddUserPopup;
