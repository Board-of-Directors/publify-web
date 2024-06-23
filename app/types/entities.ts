export type Role = "Illustrator" | "Copyrighter" | "Editor" | "Owner"

export type Employee = {
    email : string,
    role : Role,
    id : number,
    organizationId : number
}

export type Credentials = {
    email : string,
    role : Role,
    id : number,
    organizationId : number,
    organizationName : string
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