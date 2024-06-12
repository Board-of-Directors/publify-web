import React, {useState} from 'react';
import PopupLayout from "@/app/components/wrappers/layout/popup-layout/PopupLayout";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {PopupProps} from "@/app/components/organisms/popups/Popup.types";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {AddMemberData, AddMemberSchema} from "@/app/schemas/addMemberSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {addMemberFx} from "@/app/components/organisms/popups/add-user-popup/AddUserPopup.model";
import {useUnit} from "effector-react";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import ControlledSelectInput
    from "@/app/components/atoms/inputs/controlled/controlled-select-input/ControlledSelectInput";
import Button from "@/app/components/atoms/buttons/button/Button";

const wrapperStyles = {card: "w-[470px] top-[200px] p-7 gap-4"}

const headerRowStyles = {
    wrapper: "justify-between items-center",
    header: "text-[20px]"
}

const roles = ["Copyrighter", "Illustrator", "Editor"]

const AddUserPopup = (props: PopupProps) => {

    const addMember = useUnit(addMemberFx);
    const [addMemberStatus, setAddMemberStatus] = useState<boolean | undefined>(undefined);

    const methods = useForm<AddMemberData>({
        resolver: zodResolver(AddMemberSchema),
        mode: "onSubmit"
    })

    const onSubmit = (fieldValues: FieldValues) => {
        addMember(fieldValues as AddMemberData)
            .then(_ => setAddMemberStatus(true))
            .catch(_ => setAddMemberStatus(false))
    }

    return (
        <FormProvider {...methods}>
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
