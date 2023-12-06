import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useStore} from "@/app/store/useStore";
import {SecondStepData} from "@/app/store/slices/authorizationSlice";
import {useShallow} from "zustand/react/shallow";
import {useState} from "react";
import {Exception} from "@/app/types/entities";

export const useSecondStepContext = () => {

    const router: AppRouterInstance = useRouter()

    const [exception, setException] = useState<string>("")

    const validationSchema = z.object({
        organizationName: z.string()
            .min(1, "Organization name must contain at least 2 Latin or Cyrillic character")
            .max(20, "Organization name must contain no" +
                " more than 20 Latin or Cyrillic characters"),
        ownerPassword: z.string()
            .min(8, "Password must contain at least 1 letter, a number or" +
                " symbol, at least 8 characters")
            .max(20, "Password must contain no" +
                " more than 20 Latin or Cyrillic characters")
    })

    const [fillSecondStep, registerOrganization] = useStore(
        useShallow(state => [
            state.fillSecondStep, state.registerOrganization
        ])
    )

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(validationSchema)
    })

    const onSubmit = (data: FieldValues) => {
        fillSecondStep(data as SecondStepData)
        registerOrganization().then((exception) => {
            if (exception !== null) setException((exception as Exception).message)
            else router.push("/sign-up/step-3")
        })
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        register, errors, exception
    }

}