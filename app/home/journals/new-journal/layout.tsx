'use client'

import StepBanner from "@/app/components/moleculas/step-banner/StepBanner";
import {BannerStep} from "@/app/types/entities";
import {FormProvider, useForm} from "react-hook-form";
import {AddJournalData, AddJournalSchema} from "@/app/schemas/AddJournalSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";

const stepBanners: BannerStep[] = [
    {message: "Name and description", pathName: "/step-1"},
    {message: "Add members", pathName: "/step-2"},
]

const CreateNewJournalLayout = ({children}: {
    children: React.ReactNode
}) => {

    const methods = useForm<AddJournalData>({
        resolver: zodResolver(AddJournalSchema),
        mode: "onSubmit"
    })

    useEffect(() => {
        console.log(methods.formState.errors)
    }, [methods.formState.errors]);

    console.log(methods.watch())

    return (
        <FormProvider {...methods}>
            <div className={"mt-[-30px]"}>
                <StepBanner stepBanners={stepBanners}/>
                <div className={"w-full mt-[30px] px-[215px] flex flex-col gap-[20px]"}>
                    {children}
                </div>
            </div>
        </FormProvider>
    );
};

export default CreateNewJournalLayout;
