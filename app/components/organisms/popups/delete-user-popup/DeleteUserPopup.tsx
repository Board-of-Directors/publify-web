import React from 'react';
import {DeleteUserPopupProps} from "./DeleteUserPopup.types";
import PopupLayout from "@/app/components/wrappers/layout/popup-layout/PopupLayout";
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Button from "@/app/components/atoms/buttons/button/Button";
import Text from "@/app/components/atoms/text/Text";
import {useUnit} from "effector-react/compat";
import {deleteEmployeeFx} from "./DeleteUserPopup.model";
import {cn} from "@/app/utils/cn";

const wrapperStyles = {card: "w-[470px] top-[200px] p-7 gap-4"}

const headerRowStyles = {
    wrapper: "justify-between items-center",
    header: "text-[20px]"
}

const buttonStyles = [
    "w-full bg-info-red hover:text-info-red",
    "border-2 border-info-red hover:bg-none"
]

const startTextPrefix = 'Are you sure to delete'
const endTextPrefix = "User will lose all access to organization"

const DeleteUserPopup = (props: DeleteUserPopupProps) => {

    const deleteUser = useUnit(deleteEmployeeFx);

    const handleDeleteUser = () => {
        deleteUser(props.employeeToDelete);
        props.onClose();
    }

    return (
        <PopupLayout classNames={wrapperStyles}>
            <HeaderRow
                classNames={headerRowStyles}
                header={"User deletion"}
            >
                <FiX
                    size={"20px"}
                    type={"red"}
                    className={"icon"}
                    onClick={props.onClose}
                />
            </HeaderRow>
            <Text
                text={`${startTextPrefix} ${props.employeeToDelete.email}? ${endTextPrefix}`}
                className={'pb-5 border-b-2 border-border-gray'}
            />
            <section className={'w-full flex flex-row gap-8 pb-5 border-b-2 border-border-gray'}>
                <div className={'flex flex-col gap-1'}>
                    <Text text={'User email'} className={'text-xs text-text-gray'}/>
                    <Text text={props.employeeToDelete.email}/>
                </div>
                <div className={'flex flex-col gap-1'}>
                    <Text text={'User role'} className={'text-xs text-text-gray'}/>
                    <Text text={props.employeeToDelete.role}/>
                </div>
            </section>
            <Button
                className={cn(buttonStyles)}
                onClick={handleDeleteUser}
                text={'I understand and i want to delete'}
            />
        </PopupLayout>
    );
};

export default DeleteUserPopup;
