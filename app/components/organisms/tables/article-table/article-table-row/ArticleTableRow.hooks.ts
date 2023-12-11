import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useStore} from "@/app/store/useStore";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useArticleTableRow = () => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const searchParams = useSearchParams()
    const articleId = searchParams.get("articleId") ?? 0

    const deleteArticle = useStore(state => state.deleteArticle)

    const handleDeleteClick = () => console.log(articleId)
    const handleRowClick = (articleId : number) => router.push(pathName.concat(`/article/${articleId}`))
    
    return {
        handleDeleteClick,
        handleRowClick
    }

}