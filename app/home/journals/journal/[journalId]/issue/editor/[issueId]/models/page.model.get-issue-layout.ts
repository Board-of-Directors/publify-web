import {api} from "@/app/api/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ArticleLayout} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/types/ArticleLayout.types";

const getIssueLayout = async (issueId : number) : Promise<ArticleLayout[]> => {
    return api.get('/issue-layout', {params : {issueId}})
        .then(response => response.data.result);
};

export const getIssueLayoutFx = createEffect<number, ArticleLayout[], Error>(getIssueLayout);

export const getIssueLayoutEvent = createEvent<number>();

export const $issueLayout = createStore<ArticleLayout[]>([]);

$issueLayout.on(getIssueLayoutFx.doneData, (_, layout) => layout);

sample({
    clock : getIssueLayoutEvent,
    target : getIssueLayoutFx
})