import {api} from "@/app/api/api";
import {createEffect, createEvent, createStore, sample} from "effector";

type IssueGroupItem = {
    id: number,
    name: string,
    description: string,
    textBlocksCount: number,
    illustrationBlocksCount: number
}

export type ArticleGroup = {
    groupName: string,
    articles: IssueGroupItem[]
}

export type GetLinkedIssuesData = {
    issueId : number,
    excludeImported ?: boolean
}

const getLinkedIssues = async (req : GetLinkedIssuesData) : Promise<ArticleGroup[]> => {
    return api.get('/article/search-with-linked', {params : req})
        .then(response => response.data.result)
};

export const getLinkedIssuesFx = createEffect<GetLinkedIssuesData, ArticleGroup[], Error>(getLinkedIssues);
export const getLinkedIssuesEvent = createEvent<GetLinkedIssuesData>();
export const $linkedIssues = createStore<ArticleGroup[]>([]);

$linkedIssues.on(getLinkedIssuesFx.doneData, (_, group) => group);

sample({
    clock : getLinkedIssuesEvent,
    target : getLinkedIssuesFx
})