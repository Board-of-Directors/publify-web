"use client"

import React from 'react';
import PenImage from "@/public/images/pen_image.png"
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import InfoCard from "@/app/components/organisms/info-card/InfoCard";

const FourthStep = () => {

    const router : AppRouterInstance = useRouter()
    const handleButtonClick = () => router.push('/home/journals')

    return (
        <InfoCard
            image={PenImage.src}
            onClick={handleButtonClick}
            buttonText={"Let’s start creating!"}
            header={"Organization created successfully!"}
            descr={"Now wait for all the members get their" +
                " links and start make brilliant journals!"}
        />
    );

};

export default FourthStep;
