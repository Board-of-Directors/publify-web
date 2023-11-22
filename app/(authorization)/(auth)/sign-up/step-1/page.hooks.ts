import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useFirstStepContext = () => {

    const router : AppRouterInstance = useRouter()

    const signUpSchema = z.object({
        firstName: z.string()
            .min(2, "The first name must contain at least 2 Latin or Cyrillic character")
            .max(20, "The first name must contain no" +
                "more than 20 Latin or Cyrillic characters"),
        lastName: z.string()
            .min(1, "The first name must contain at least 1 Latin or Cyrillic character")
            .max(30, "The last name must contain no" +
                "more than 30 Latin or Cyrillic characters"),
        email: z.string().email("Email address is invalid. Please enter a valid email address")
    })

    const {
        register, handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = (data: FieldValues) => {
        console.log(data)
        router.push("/sign-up/step-2")
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        register, errors
    }

}