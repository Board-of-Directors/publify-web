type Role = "Illustrator" | "Copyrighter" | "Editor"

export type Employee = {
    email : string,
    role : Role
}

export enum IssueStatus {
    READY= "Ready for publish",
    TEXT = "Text",
    ILLUSTRATIONS = "Illustrations",
    BOTH = "Text & Illustrations"
}

export type JournalShortDTO = {
    header: string,
    date: string,
    articlesCount: number
}

export type JournalCardDTO = {
    header : string,
    updateCount : number,
    issuesCount : number,
    workersCount : number
}