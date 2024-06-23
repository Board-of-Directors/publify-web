import {api} from "@/app/api/api";
import {createEffect, createEvent, sample} from "effector";
import {
    getLinkedIssuesFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-linked-issues";
import {
    getIssueLayoutFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-issue-layout";

type DeleteArticleLayoutData = {
    issueLayoutId : number,
    issueId : number
}

const deleteArticleLayout = async (req : DeleteArticleLayoutData) : Promise<number> => {
    return api.delete('/issue-layout', {params : {issueLayoutId : req.issueLayoutId}})
        .then(_ => req.issueId);
};

const deleteArticleLayoutFx = createEffect<DeleteArticleLayoutData, number, Error>(deleteArticleLayout);
export const deleteArticleLayoutEvent = createEvent<DeleteArticleLayoutData>();

sample({
    clock : deleteArticleLayoutEvent,
    target : deleteArticleLayoutFx
})

sample({
    clock : deleteArticleLayoutFx.doneData,
    target : getIssueLayoutFx
})

sample({
    clock : deleteArticleLayoutFx.doneData,
    fn : (issueId) => ({issueId : issueId}),
    target : getLinkedIssuesFx
})