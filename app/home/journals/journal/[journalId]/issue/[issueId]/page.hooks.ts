import {useStore} from "@/app/store/useStore";
import {useEffect, useState} from "react";
import {useShallow} from "zustand/react/shallow";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";
import {Article} from "@/app/types/article";

export const useIssuePage = (issueId: number) => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const [issue, getIssue] = useStore(
        useShallow(state =>
            [state.issue, state.getIssue])
    )

    const [articles, getArticles] = useStore(
        useShallow(state =>
            [state.articles, state.getArticles])
    )

    const [
        articleToDeleteId,
        setArticleToDeleteIc
    ] = useState<number | undefined>(undefined)

    const [
        articleToDelete,
        setArticleToDelete
    ] = useState<Article | undefined>(undefined)

    const handleBackClick = () => router.back()
    const handleArticleCreate = () => router.push(pathName.concat("/new-article"))
    const handleDeleteArticle = () => {}
    const findArticleToDelete = () => articles.find((article) => article.id === articleToDeleteId)

    useEffect(() => {
        getIssue(issueId)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => getArticles(issueId), 3000)
        return () => clearInterval(interval)
    }, [])

    return {
        handleBackClick, handleArticleCreate,
        issue, articles
    }

}