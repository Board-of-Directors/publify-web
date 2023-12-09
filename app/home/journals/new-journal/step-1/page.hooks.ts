import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useStore} from "@/app/store/useStore";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {createJournalSchema} from "@/app/schemas/createJournalSchema";

export const useCreateJournalFirstStep = () =>  {

    const router : AppRouterInstance = useRouter()

    const {
        register, handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(createJournalSchema)
    })

    const fillJournalData = useStore(state => state.fillJournalData)

    const onSubmit = (data : FieldValues) => {
        console.log(data)
        fillJournalData(data as any)
        router.push("/home/journals/new-journal/step-2")
    }

    return {
        handleSubmit : handleSubmit(onSubmit),
        register, errors
    }

}