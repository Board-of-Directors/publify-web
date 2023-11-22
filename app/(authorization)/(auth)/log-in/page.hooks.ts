import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const useLogInContext = () => {

    const validationSchema = z.object({
        email: z.string().email("Email address is invalid. Please enter a valid email address"),
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
    }

    return {
        handleSubmit : handleSubmit(onSubmit),
        register, errors
    }

}