export type FontSettings = {
    id: number,
    headingType: string,
    fontName?: string,
    fontType?: string
}

export type ArticleLayout = {
    id: number,
    title : string,
    articleId : number,
    templateType: string,
    picturePosition: string,
    columnCount: number,
    fonts: FontSettings[],
    lockedBy : {
        email : string
    }
}

export type ArticleBlock =  {
    content : string,
    layout : ArticleLayout,
    title : string
}