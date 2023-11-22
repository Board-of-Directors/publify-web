import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useSecondStepContext = () => {

    const router : AppRouterInstance = useRouter()

    const validationSchema = z.object({
        organizationName : z.string()
            .min(1, "Organization name must contain at least 2 Latin or Cyrillic character")
            .max(20, "Organization name must contain no" +
                " more than 20 Latin or Cyrillic characters"),
        password : z.string()
            .min(8, "Password must contain at least 1 letter, a number or" +
                " symbol, at least 8 characters")
            .max(20, "Password must contain no" +
                " more than 20 Latin or Cyrillic characters")
    })

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({
        mode : "onSubmit",
        resolver : zodResolver(validationSchema)
    })

    const onSubmit = (data : FieldValues) => {
        console.log(data)
        router.push("/sign-up/step-3")
    }

    return {
        handleSubmit : handleSubmit(onSubmit),
        register, errors
    }

}