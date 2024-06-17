import {api} from "@/app/api/api";
import {Issue} from "@/app/types/issue";
import {createEffect, createEvent, createStore, sample} from "effector";

const getNotLinkedIssues = async (issueId : number) : Promise<Issue[]> => {
    return api.get('/issue/search-not-linked', {params : {issueId : issueId}})
        .then(response => response.data.result)
}

const getNotLinkedIssuesFx = createEffect<number, Issue[], Error>(getNotLinkedIssues);
export const getNotLinkedIssuesEvent = createEvent<number>();

export const $notLinkedIssues = createStore<Issue[]>([]);
$notLinkedIssues.on(getNotLinkedIssuesFx.doneData, (_, issues) => issues);

sample({
    clock : getNotLinkedIssuesEvent,
    target : getNotLinkedIssuesFx
})