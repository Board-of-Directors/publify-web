import {useEffect, useState} from "react";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";

export const useJournalsPage = () => {

    const [journals, searchJournals] = useStore(
        useShallow(state => [
            state.journals, state.searchJournals
        ])
    )

    const [journalName, setJournalName] = useState<string | undefined>(undefined)

    useEffect(() => {
        searchJournals(journalName)
        const interval = setInterval(searchJournals, 3000)
        return () => clearInterval(interval)
    }, [journalName])

    return {journals, journalName, setJournalName}

}