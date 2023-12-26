import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";
import {ClassValue} from "clsx";

export const useCreateJournalStepContext = () => {

    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const handleClick = () => {
        const curIndex = pathName.at(-1) as string
        const nextIndex = (+curIndex + 1).toString()
        router.push(pathName.replace(curIndex, nextIndex))
    }

    const handleBackClick = () => router.back()

    const backClassValues: ClassValue[] = [
        "w-fit text-text-gray",
        "hover:stroke-info-blue-default hover:text-info-blue-default"
    ]

    return {
        handleClick, handleBackClick, backClassValues
    }

}