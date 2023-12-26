import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useStore} from "@/app/store/useStore";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Article} from "@/app/types/article";

export const useArticleTableRow = () => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const searchParams = useSearchParams()
    const articleId = searchParams.get("articleId") ?? 0

    const deleteArticle = useStore(state => state.deleteArticle)

    const handleDeleteClick = () => console.log(articleId)
    const handleRowClick = (
        article : Article,
        callbackFn ?: (article : Article) => void
    ) => {
        if (callbackFn === undefined) router.push(pathName.concat(`/article/${article.id}`))
        else callbackFn(article)
    }
    
    return {
        handleDeleteClick,
        handleRowClick
    }

}