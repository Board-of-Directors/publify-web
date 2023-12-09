import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {Exception} from "@/app/types/entities";
import {Issue} from "@/app/types/issue";

export const useJournalPage = (journalId : number) => {

    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const createIssuePath = pathName.concat(`/new-issue/step-1`)
    const journalSettingsPath = pathName.concat('/settings')

    const [issues, getIssues, deleteIssue] = useStore(
        useShallow(state => [
            state.issues, state.getIssues, state.deleteIssue
        ])
    )

    const [journal, getJournal] = useStore(
        useShallow(state => [state.journal, state.getJournal])
    )

    const [
        issueIdToDelete,
        setIssueIdToDelete
    ] = useState<number | undefined>(undefined)

    const [
        issueToDelete,
        setIssueToDelete
    ] = useState<Issue | undefined>(undefined)

    const [
        confirmText,
        setText
    ] = useState<string>("")

    const handleSettingsClick = () => router.push(journalSettingsPath)
    const handleCreateIssue = () => router.push(createIssuePath)

    const handleClosePopup = () => setIssueIdToDelete(undefined)
    const findIssueToDelete = () => issues.find((issue) => issue.id === issueIdToDelete)
    const handleDeleteIssue = () => {
        if (issueIdToDelete && confirmText === issueToDelete?.title) {
            deleteIssue(issueIdToDelete)
            setIssueIdToDelete(undefined)
        }
    }

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

    useEffect(() => {
        setIssueToDelete(findIssueToDelete)
    }, [issueIdToDelete])

    return {
        handleCreateIssue, handleSettingsClick,
        handleClosePopup, handleDeleteIssue,
        setText, setIssueIdToDelete,
        issueIdToDelete, issueToDelete, issues,
        journal, confirmText,
    }

}