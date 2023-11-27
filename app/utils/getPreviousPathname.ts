
export const getPreviousPathname = (pathName : string) => {
    const lastSlashIndex = pathName.lastIndexOf("/")
    return pathName.substring(0, lastSlashIndex)
}