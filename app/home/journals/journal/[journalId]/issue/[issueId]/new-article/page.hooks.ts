import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createJournalSchema} from "@/app/schemas/createJournalSchema";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {RequestArticle} from "@/app/store/slices/articleSlice";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useState} from "react";
import {Exception} from "@/app/types/entities";

export const useCreateNewArticle = (issueId: number) => {

    const router : AppRouterInstance = useRouter()

    const {
        register, handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(createJournalSchema)
    })

    const [fillData, createArticle] = useStore(
        useShallow(state => [state.fillCreateArticleData, state.createArticle])
    )

    const [
        exception,
        setException
    ] = useState<string>("")

    const onSubmit = (data: FieldValues) => {
        console.log(data)
        fillData(data as RequestArticle)
        createArticle(issueId).then((exception) => {
            if (exception === null) router.back()
            else setException((exception as Exception).message)
        })
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        register, errors, exception
    }

}