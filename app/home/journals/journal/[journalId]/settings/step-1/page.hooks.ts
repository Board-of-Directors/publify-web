import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createJournalSchema} from "@/app/schemas/createJournalSchema";

export const useEditJournalFirstStep = (journalId: number) => {

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({
        resolver : zodResolver(createJournalSchema)
    })

    const [journal, editJournal, getJournal, fillData] = useStore(
        useShallow(state => [state.journal,
            state.editJournal, state.getJournal, state.fillData])
    )

    useEffect(() => {
        getJournal(journalId)
    }, [])

    const onSubmit = (data : FieldValues) => {
        fillData(data as any)
        editJournal(journalId)
    }

    return {
        handleSubmit : handleSubmit(onSubmit),
        register, errors, journal
    }

}