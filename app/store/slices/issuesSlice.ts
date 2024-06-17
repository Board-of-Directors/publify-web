import {Issue} from "@/app/types/issue";
import {Exception} from "@/app/types/entities";
import {api} from "@/app/api/api";
import {StateCreator} from "zustand";

type FirstStepData = {
    name: string,
    description: string
}

type SecondStepData = {
    number: number,
    releaseDate: string,
    cover: string
}

type RequestIssue = FirstStepData & SecondStepData

export type IssueSlice = {

    issue : Issue,
    issues: Issue[],
    requestIssue: RequestIssue,

    fillData : (data : FirstStepData | SecondStepData) => void,
    getIssues: (journalId: number) => Promise<Exception | void>,
    getIssue : (issueId: number) => Promise<Exception | void>,

    createIssue: (journalId: number) => Promise<Exception | void>,
    deleteIssue : (issueId : number) => Promise<Exception | void>

}

export const issuesSlice: StateCreator<IssueSlice, [], [], IssueSlice> = (set, get) => ({

    issue : {
        id : 0, title : "",
        number : 0, releaseDate : "",
        cover : ""
    },
    issues: [],

    requestIssue: {
        name: "", description: "",
        number: 0, releaseDate: "",
        cover: ""
    },

    fillData: (data: FirstStepData | SecondStepData) =>
        set((state) => ({
            requestIssue: {
                ...state.requestIssue,
                ...data
            }
        })),

    getIssues: async (journalId: number) => {
        return api.get('/issue/search', {params: {journalId: journalId}})
            .then((response) => {
                set({issues: response.data.result})
                return response.data.exception as Exception
            })
    },

    getIssue : async (issueId : number) => {
        return api.get('/issue', {params : {issueId : issueId}})
            .then((response) => {
                set({issue : response.data.result})
                return response.data.exception as Exception
            })
    },

    createIssue: async (journalId: number) => {
        return api.post('/issue', get().requestIssue, {
            params: {journalId: journalId}
        })
            .then((response) => {
                return response.data.exception as Exception
            })
    },

    deleteIssue : async (issueId : number) => {
        return api.delete('/issue', {params : {issueId : issueId}})
            .then((response) => response.data.exception as Exception)
    }

})