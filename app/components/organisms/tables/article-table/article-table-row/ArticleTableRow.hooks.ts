import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useStore} from "@/app/store/useStore";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Article} from "@/app/types/article";
import {jwtDecode} from "jwt-decode";

export const useArticleTableRow = () => {

    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const searchParams = useSearchParams()
    const articleId = searchParams.get("articleId") ?? 0

    const handleDeleteClick = () => console.log(articleId)
    const handleRowClick = (
        article: Article,
        callbackFn ?: (article: Article) => void
    ) => {
        if (!callbackFn) {
            router.push(pathName.concat(`/article/${article.id}`))
        } else callbackFn(article)
    }

    return {
        handleDeleteClick,
        handleRowClick
    }

}