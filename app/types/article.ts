export type RequestArticle = {
    issueId : number,
    name : string,
    description : string
}

export type Article = {
    id: number,
    name: string,
    description: string,
    textBlocksCount: number,
    illustrationBlocksCount : number
}

export type ContentType = "text" | "image"

export type ArticleItem = {
    id : number,
    content : string,
    contentType : ContentType,
    sequenceNumber : number
}