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

export type ArticleItem = {
    id : number,
    content : string,
    contentType : string,
    sequenceNumber : number
}