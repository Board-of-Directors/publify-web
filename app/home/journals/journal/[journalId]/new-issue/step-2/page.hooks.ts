import {FieldValues, useForm} from "react-hook-form";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {ChangeEvent, useState} from "react";
import {Exception} from "@/app/types/entities";

export const useCreateIssueSecondStep = (journalId : number) => {

    const {
        register,
        handleSubmit,
        control,
        formState : {errors}
    } = useForm()

    const router: AppRouterInstance = useRouter()

    const [exception, setException] = useState<string>("")
    const [file, setFile] = useState<File | undefined>(undefined)

    const [fillData, createIssue] = useStore(
        useShallow(
            state => [
                state.fillData, state.createIssue
            ])
    )

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && e.target.files[0] && setFile(e.target.files[0])
    }

    const handleInputClear = () => setFile(undefined)

    const onSubmit = (data : FieldValues) => {
        fillData(data as any)
        createIssue(journalId)
            .then((exception) => {
                if (exception !== null) {
                    setException((exception as Exception).message)
                } else router.push(`/home/journals/journal/${journalId}`)
            })
    }

    return {
        handleSubmit : handleSubmit(onSubmit),
        register, control, exception, file, handleInputChange,
        handleInputClear, errors
    }

}