import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useStore} from "@/app/store/useStore";
import {FirstStepData} from "@/app/store/slices/authorizationSlice";

export const useFirstStepContext = () => {

    const router : AppRouterInstance = useRouter()

    const signUpSchema = z.object({
        ownerFirstName: z.string()
            .min(2, "The first name must contain at least 2 Latin or Cyrillic character")
            .max(20, "The first name must contain no" +
                "more than 20 Latin or Cyrillic characters"),
        ownerLastName: z.string()
            .min(1, "The first name must contain at least 1 Latin or Cyrillic character")
            .max(30, "The last name must contain no" +
                "more than 30 Latin or Cyrillic characters"),
        ownerEmail: z.string().email("Email address is invalid. Please enter a valid email address")
    })

    const fillFirstStep = useStore(state => state.fillFirstStep)

    const {
        register, handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = (data: FieldValues) => {
        fillFirstStep(data as FirstStepData)
        router.push("/sign-up/step-2")
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        register, errors
    }

}