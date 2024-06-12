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

const OrganizationSettingsPage = () => {
    return (
        <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
            <GridBlock>
                <CardWrapper className={"w-full p-[20px] flex flex-row justify-between col-span-6"}>
                    <form onSubmit={undefined /*TODO*/} className={"flex flex-col gap-4"}>
                        <Text
                            text={"Ogranization members"}
                            className={"text-[18px] text-text-black"}
                        />
                            <EmailRoleInput
                                employees={[]} //TODO
                                setEmployees={()=>[]} //TODO
                            />
                            <TextButton
                                text={"Add member"}
                                className={"w-fit"}
                                icon={
                                    <FiPlus
                                        size={"22px"}
                                        className={"stroke-info-blue"}
                                    />
                                }
                                onClick={undefined /*TODO*/}
                            />
                    </form>
                </CardWrapper>                <CardWrapper className={"w-full p-[20px] flex flex-row justify-between col-span-6"}>
                <form onSubmit={undefined /*TODO*/} className={"w-full flex flex-col gap-4"}>
                    <div>
                        <TextInput
                            label={"Organization name"}
                            register="" //TODO
                            error="" //TODO
                            labelClassName={"text-[18px] text-text-black"}
                            placeholder={""} //TODO
                        />
                    </div>
                </form>
            </CardWrapper>
            </GridBlock>
        </div>
    );
};

export default OrganizationSettingsPage;
