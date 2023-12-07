import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {Exception} from "@/app/types/entities";

export const useJournalPage = (journalId : number) => {

    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const createIssuePath = pathName.concat(`/new-issue/step-1`)
    const journalSettingsPath = pathName.concat('/settings')

    const [
        issueIdToDelete,
        setIssueIdToDelete
    ] = useState<number | undefined>(undefined)

    const handleSettingsClick = () => router.push(journalSettingsPath)
    const handleCreateIssue = () => router.push(createIssuePath)

    const handleClosePopup = () => setIssueIdToDelete(undefined)
    const handleDeleteIssue = (issueId : number) => setIssueIdToDelete(issueId)

    const [issues, getIssues] = useStore(
        useShallow(
            state => [state.issues, state.getIssues]
        )
    )

    const [journal, getJournal] = useStore(
        useShallow(
            state => [state.journal, state.getJournal]
        )
    )

    useEffect(() => {
        getIssues(journalId)
        const interval = setInterval(
            () => getIssues(journalId), 3000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        getJournal(journalId)
            .then((exception) => {
                if (exception !== null) {
                    console.log((exception as Exception).message)
                }
            })
    }, [])

    return {
        handleCreateIssue, handleSettingsClick,
        handleClosePopup, handleDeleteIssue,
        issueIdToDelete, issues, journal
    }

}