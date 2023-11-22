import {FieldValues, useForm} from "react-hook-form";

export const useThirdStepContext = () => {

    const {
        register, handleSubmit,
        control, formState : {errors}
    } = useForm({
        mode: "onSubmit"
    })

    const onSubmit = (data : FieldValues) => {
        console.log(data)
    }

    return {
        handleSubmit : handleSubmit(onSubmit),
        register, errors, control
    }

}