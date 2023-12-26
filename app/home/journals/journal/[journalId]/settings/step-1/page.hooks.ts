import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createJournalSchema} from "@/app/schemas/createJournalSchema";

export const useEditJournalFirstStep = (journalId: number) => {

    const [requestJournal, editJournal, getJournal, fillPartialData] = useStore(
        useShallow(state => [state.requestJournal,
            state.editJournal, state.getJournal, state.fillPartialData])
    )

    useEffect(() => {
        getJournal(journalId)
    }, [])

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({
        resolver : zodResolver(createJournalSchema)
    })

    const onSubmit = (data : FieldValues) => {
        fillPartialData(data as any)
        console.log(requestJournal)
        editJournal(journalId)
    }

    return {
        handleSubmit : handleSubmit(onSubmit),
        register, errors, journal : requestJournal
    }

}