import {api} from "@/app/api/api";
import {createEffect, createEvent, sample} from "effector";
import {
    getIssueLayoutFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-issue-layout";
import {
    getLinkedIssuesFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-linked-issues";

export type CreateArticleBlockData = {
    issueId : number,
    articleId : number
}

const createArticleBlock = async (req : CreateArticleBlockData) : Promise<number> => {
    return api.post('/issue-layout', null, {params : req}).then(_ => req.issueId);
};

const createArticleBlockFx = createEffect<CreateArticleBlockData, number, Error>(createArticleBlock);
export const createArticleBlockEvent = createEvent<CreateArticleBlockData>();

sample({
    clock : createArticleBlockEvent,
    target : createArticleBlockFx
})

sample({
    clock : createArticleBlockFx.doneData,
    target : [getLinkedIssuesFx, getIssueLayoutFx]
})