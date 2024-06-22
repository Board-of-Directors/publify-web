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

const getLinkedIssues = async (issueId : number) : Promise<ArticleGroup[]> => {
    return api.get('/article/search-with-linked', {params : {issueId :issueId}})
        .then(response => response.data.result)
};

export const getLinkedIssuesFx = createEffect<number, ArticleGroup[], Error>(getLinkedIssues);
export const getLinkedIssuesEvent = createEvent<number>();
export const $linkedIssues = createStore<ArticleGroup[]>([]);

$linkedIssues.on(getLinkedIssuesFx.doneData, (_, group) => group);

sample({
    clock : getLinkedIssuesEvent,
    target : getLinkedIssuesFx
})