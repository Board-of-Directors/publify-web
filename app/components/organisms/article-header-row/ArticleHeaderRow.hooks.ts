export const useArticleHeaderRow = () => {

    const handleSettingsClick = () => console.log("SETTINGS CLICKED")
    const handleSaveChangesClick = () => console.log("SAVE CHANGES")
    const handleDownloadPDFClick = () => console.log("DOWNLOAD AS PDF")

    return {
        handleSaveChangesClick, handleSettingsClick,
        handleDownloadPDFClick
    }

}