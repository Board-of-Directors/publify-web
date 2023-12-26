import {usePathname, useRouter} from "next/navigation";

export const useArticleHeaderRow = () => {

    const router = useRouter()
    const pathname = usePathname()

    const handleSettingsClick = () => router.push(pathname.concat("/settings"))
    const handleSaveChangesClick = () => console.log("SAVE CHANGES")
    const handleDownloadPDFClick = () => console.log("DOWNLOAD AS PDF")

    return {
        handleSaveChangesClick, handleSettingsClick,
        handleDownloadPDFClick
    }

}