'use client'

import React from 'react';
import TextInput from "@/app/components/atoms/inputs/TextInput";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Button from "@/app/components/atoms/buttons/button/Button";
import StepBanner from "@/app/components/moleculas/step-banner/StepBanner";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import EmailRoleInput from "@/app/components/organisms/email-role-input/EmailRoleInput";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";
import {useOrganizationSettings} from "@/app/home/organization-settings/page.hooks";
import AddUserPopup from "@/app/components/organisms/popups/add-user-popup/AddUserPopup";

const OrganizationSettingsPage = () => {

    const methods = useOrganizationSettings();

    return (
        <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
            {false && <AddUserPopup onClose={() => {}}/>}
            <GridBlock>
                <CardWrapper className={"w-full p-[20px] flex flex-col gap-3 col-span-6"}>
                    <Text
                        className={"text-[18px] text-text-black"}
                        text={"Organization members"}
                    />
                    <EmailRoleInput
                        onDeleteEmployee={methods.handleDeleteEmployee}
                        {...methods}
                    />
                    <TextButton
                        onClick={methods.handleAddEmployee}
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
                <CardWrapper className={"w-full p-[20px] flex flex-col gap-3 col-span-6"}>
                    <TextInput
                        label={"Organization name"}
                        labelClassName={"text-[18px] text-text-black"}
                        placeholder={"Type here organization name"}
                        onChange={methods.setOrganizationName}
                        value={methods.organizationName}
                    />
            </CardWrapper>
            </GridBlock>
        </div>
    );
};

export default OrganizationSettingsPage;
