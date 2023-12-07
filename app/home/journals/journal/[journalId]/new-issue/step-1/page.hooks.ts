import {z} from "zod"
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useStore} from "@/app/store/useStore";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";
import {getPreviousPathname} from "@/app/utils/getPreviousPathname";

export const useCreateIssueFirstStep = () => {

    const firstStepSchema = z.object({
        name : z.string().min(1, "The name of the issue must contain at least 1 character"),
        description : z.string().min(1, "The description of the issue must contain at least 1 character"),
    })

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()
    const nextPathName = getPreviousPathname(pathName).concat('/step-2')

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({
        resolver : zodResolver(firstStepSchema)
    })

    const fillData = useStore(state => state.fillData)
    const onFillData = (data : FieldValues) => {
        console.log(data)
        fillData(data as any)
        router.push(nextPathName)
    }

    return {
        handleSubmit : handleSubmit(onFillData),
        register, errors
    }

}