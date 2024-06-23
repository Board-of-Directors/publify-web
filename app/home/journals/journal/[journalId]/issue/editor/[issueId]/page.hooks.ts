import {IssueBlock} from "@/app/types/IssueBlock";
import {useState} from "react";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {Article, ArticleItem} from "@/app/types/article";

export const useEditorIssuePage = (issueId: number) => {

    const [
        availableArticles,
        setAvailableArticles
    ] = useState<Article[]>([])

    const [
        selectedArticle,
        setSelectedArticle
    ] = useState<Article | undefined>(undefined)

    const [
        issueCover,
        setIssueCover
    ] = useState<string>("")

    const [issueBlocks, populateIssueBlocks] = useStore(
        useShallow(state =>
            [state.issueBlocks, state.populateIssueBlocks])
    )

    const [issue, getIssue] = useStore(
        useShallow(state =>
            [state.issue, state.getIssue])
    )

    const [articles, getArticles] = useStore(
        useShallow(state =>
            [state.articles, state.getArticles])
    )

    const [articleItems, getArticleItems] = useStore(
        useShallow(state =>
            [state.articleItems, state.getArticleItems])
    )

    const mapArticleItemsToIssueBlock = (articleItems: ArticleItem[]) => {

        let accumulator = new Object({files: [], content: ""}) as IssueBlock

        articleItems.forEach((item) => {

            let content : string

            if (item.contentType.toLowerCase() === "image") {
                content = `<img src="data:image/jpeg;base64,${item.content}" alt="/"/>`
            } else content = item.content

            accumulator = {
                content: accumulator.content?.concat(`<br>`).concat(content as string)
            } as IssueBlock

        })

        const styles : any = {
            heading : "none",
            paragraph : "none"
        }

        accumulator["cols"] = 1
        accumulator["name"] = selectedArticle?.name ?? ""
        accumulator["textStyles"] = styles
        accumulator["fontStyles"] = styles
        accumulator["id"] = issueBlocks.length

        populateIssueBlocks([...issueBlocks, accumulator])

    }

    const getIssueQuery = useQuery({
        queryKey: ["get", "issue", issueId],
        queryFn: () => getIssue(issueId),
        onSuccess: () => setIssueCover(issue.cover)
    })

    const getArticlesQuery = useQuery({
        queryKey: ["get", "articles", issueId],
        queryFn: () => getArticles(issueId),
        onSuccess: () => setAvailableArticles(articles)
    })

    const getArticleItemsQuery = useQuery({
        queryKey: ["get", "articleItems", selectedArticle],
        queryFn: () => getArticleItems(selectedArticle!!.id),
        onSuccess: () => mapArticleItemsToIssueBlock(articleItems),
        enabled: false,
        refetchOnWindowFocus: false,
    })

    const handleAddIssueBlock = (article: Article) => {
        setSelectedArticle(article)
        return getArticleItemsQuery.refetch()
    }

    return {
        handleAddIssueBlock, issueCover, issue,
        issueBlocks, availableArticles, getIssueQuery,
        getArticlesQuery, getArticleItemsQuery
    }

}