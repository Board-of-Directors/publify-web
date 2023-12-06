import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {Exception} from "@/app/types/entities";
import {useSearchParams} from "next/navigation";

export const useJournalSettings = () => {

    const searchParams = useSearchParams()
    const journalId = +!!searchParams.get("id")

    const [getJournal, journal] = useStore(
        useShallow(state => [state.getJournal, state.journal])
    )

    useEffect(() => {
        getJournal(journalId)
            .then((exception) => {
                if (exception !== null) {
                    console.log((exception as Exception).message)
                }
            })
    }, [])

    return {journal}
}