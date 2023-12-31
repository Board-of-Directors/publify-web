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

export type IssueShortDTO = {
    issueId : number,
    title : string,
    image : string,
    issueNumber : number,
    date : string
}

export type BannerStep = {
    message: string,
    pathName : string
}

export type Journal = {
    name : string,
    description : string,
    organizationId : number,
    employeeEmails : string[]
}

export type JournalCard = {
    id : number,
    name : string,
    issueCount : number,
    workerCount : number
}

export type InputData = {
    name : string,
    value : string
}

export type Exception = {
    message : string
}