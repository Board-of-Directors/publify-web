"use client"

import React from 'react';
import PenImage from "@/public/images/pen_image.png"
import Image from "next/image";
import Text from "@/app/components/atoms/text/Text";
import Button from "@/app/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";

const TextCol = () => {
    return (
        <div className={"flex flex-col gap-[12px]"}>
            <Text
                text={"Organization created successfully!"}
                className={"text-text-black text-[20px]"}
            />
            <Text
                text={"Now wait for all the members get their" +
                    " links and start make brilliant journals!"}
                className={"text-text-gray w-[320px] text-[16px] font-medium"}
            />
        </div>
    )
}

const FourthStep = () => {

    const router : AppRouterInstance = useRouter()
    const handleButtonClick = () => router.push('/home')

    return (
        <CardWrapper className={"w-[660px]"}>
            <div className={"w-full flex flex-row gap-[40px] items-center"}>
                <Image
                    width={180}
                    height={230}
                    quality={100}
                    src={PenImage.src}
                    alt={'/'}/>
                <div className={"flex flex-col gap-[30px]"}>
                    <TextCol />
                    <Button
                        className={"w-[255px]"}
                        text={"Let’s start creating!"}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
        </CardWrapper>
    );

};

export default FourthStep;
