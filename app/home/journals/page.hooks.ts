import {useEffect, useState} from "react";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {JournalCard} from "@/app/types/entities";
import {useRouter} from "next/navigation";

export const useJournalsPage = () => {

    const router = useRouter()

    const [journals, searchJournals] = useStore(
        useShallow(state => [
            state.journals, state.searchJournals
        ])
    )

    const deleteJournal = useStore(state => state.deleteJournal)

    const [
        journalIdToDelete,
        setJournalIdToDelete
    ] = useState<number | undefined>(undefined)

    const [
        journalToDelete,
        setJournalToDelete
    ] = useState<JournalCard | undefined>(undefined)

    const [
        confirmText,
        setText
    ] = useState<string>("")

    const [
        journalName,
        setJournalName
    ] = useState<string | undefined>(undefined)

    const handleCreateJournal = () => router.push("/home/journals/new-journal/step-1")
    const findJournalToDelete = () => journals.find((journal) => journal.id === journalIdToDelete)
    const handleDeleteJournal = () => {
        if (journalIdToDelete && confirmText === journalToDelete?.name) {
            deleteJournal(journalIdToDelete)
            setJournalIdToDelete(undefined)
        }
    }

    useEffect(() => {
        searchJournals(journalName)
        const interval = setInterval(searchJournals, 3000)
        return () => clearInterval(interval)
    }, [journalName])

    useEffect(() => {
        setJournalToDelete(findJournalToDelete())
    }, [journalIdToDelete]);

    return {
        journals, journalToDelete,
        journalName, confirmText,
        setText, setJournalIdToDelete,
        handleCreateJournal,
        handleDeleteJournal,
        setJournalName
    }

}