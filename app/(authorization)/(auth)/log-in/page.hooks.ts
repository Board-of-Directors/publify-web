import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useStore} from "@/app/store/useStore";
import {LoginData} from "@/app/store/slices/authorizationSlice";
import {useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

export const useLogInContext = () => {

    const validationSchema = z.object({
        login: z.string().email("Email address is invalid. Please enter a valid email address"),
        password: z.string()
            .min(8, "Password must contain at least 1 letter, a number or" +
                " symbol, at least 8 characters")
            .max(20, "Password must contain no" +
                " more than 20 Latin or Cyrillic characters")
    })

    const router: AppRouterInstance = useRouter()

    const [exception, setException] = useState<string>("")
    const loginUser = useStore(state => state.loginUser)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(validationSchema)
    })

    const onSubmit = (data: FieldValues) => {
        loginUser(data as LoginData)
            .then(_ => router.push("/home/journals"))
            .catch(setException)
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        register, errors, exception
    }

}