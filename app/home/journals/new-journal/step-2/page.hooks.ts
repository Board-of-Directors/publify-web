import {useStore} from "@/app/store/useStore";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {useShallow} from "zustand/react/shallow";
import {FieldValues, useForm} from "react-hook-form";
import {useEffect} from "react";
import {Exception} from "@/app/types/entities";

export const useCreateJournalSecondStep = () => {

    const router: AppRouterInstance = useRouter()

    const [fillJournalData, createJournal] = useStore(
        useShallow(state => [
                state.fillJournalData, state.createJournal
            ]))

    const [getEmployees, employees] = useStore(
        useShallow(state => [
            state.getEmployees, state.employees
        ]))

    useEffect(() => {
        getEmployees().then((exception) => {
            if (exception !== null) console.log((exception as Exception).message)
        })
    }, [])

    const {
        register,
        handleSubmit,
        control
    } = useForm({
        mode: "onSubmit"
    })

    const onSubmit = (data: FieldValues) => {
        fillJournalData({employeeEmails: Object.values(data)})
        createJournal().then((exception) => {
            if (exception === null) router.push("/home/journals")
        })
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        register, employees, control
    }

}