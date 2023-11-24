"use client"

import PenImage from "@/public/images/pen_image.png"
import InfoCard from "@/app/components/organisms/info-card/InfoCard";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

const CreateJournalFinalStepPage = () => {

    const router : AppRouterInstance = useRouter()
    const handleButtonClick = () => router.push("/home/journals")

    return (
        <InfoCard
            classNames={{
                wrapper: "w-full flex flex-col items-center justify-center",
                image: "w-[400px] h-[400px] object-scale-down",
                textColClassNames : {
                    header : "text-[26px]",
                    descr : "text-[20px] w-[400px]"
                }
            }}
            image={PenImage.src}
            onClick={handleButtonClick}
            buttonText={"Go home"}
            header={"Organization created successfully!"}
            descr={"Now wait for all the members get their" +
                " links and start make brilliant journals!"}
        />
    );

};

export default CreateJournalFinalStepPage;
