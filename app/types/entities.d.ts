type Role = "Illustrator" | "Copyrighter" | "Editor"

export type Employee = {
    email : string,
    role : Role
}

export enum JournalStatus {
    READY, TEXT,
    ILLUSTRATIONS, BOTH
}

export type JournalShortDTO = {
    status: JournalStatus,
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