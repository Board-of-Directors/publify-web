"use client"

import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {BannerStep} from "@/app/types/entities";

const BannerItem = ({step, message, isActive, onClick}: {
    step: number,
    message: string,
    isActive: boolean,
    onClick: () => void
}) => {

    const textClassValues: ClassValue[] = [
        "text-text-gray", {"text-text-black": isActive}
    ]

    const wrapperClassValues: ClassValue[] = [
        "flex flex-row flex-shrink-0 items-center gap-[15px]",
        {"hover:cursor-pointer": !isActive}
    ]

    return (
        <div
            onClick={() => !isActive && onClick()}
            className={cn(wrapperClassValues)}
        >
            <div className={"w-[40px] h-[40px] flex-shrink-0 flex flex-col items-center" +
                " justify-center rounded-full bg-background"}>
                <Text className={cn(textClassValues)} text={step.toString()}/>
            </div>
            <Text className={cn(textClassValues)} text={message}/>
        </div>
    )

}

const StepBanner = ({stepBanners} : {
    stepBanners : BannerStep[]
}) => {

    const currPathName = usePathname()
    const router: AppRouterInstance = useRouter()

    const handlePathName = (pathName: string) => {
        const currPathIndex = currPathName.at(-1) as string
        const nextPathIndex = pathName.at(-1) as string
        const nextPathName = currPathName.replace(currPathIndex, nextPathIndex)
        if (+nextPathIndex < +currPathIndex) router.push(nextPathName)
    }

    return (
        <div className={"w-full bg-white py-[25px] border-t-2 border-background"}>
            <div className={"w-full px-[215px] flex flex-row items-center justify-center gap-[20px]"}>
                {
                    stepBanners.map((step, index) => {
                        return <>
                            <BannerItem
                                step={index + 1}
                                message={step.message}
                                isActive={currPathName.includes((index + 1).toString())}
                                onClick={() => handlePathName(step.pathName)}
                            />
                            {
                                index !== stepBanners.length - 1 &&
                                <div className={"w-[200px] h-[2px] bg-background"}/>
                            }
                        </>
                    })
                }
            </div>
        </div>
    );

};

export default StepBanner;
