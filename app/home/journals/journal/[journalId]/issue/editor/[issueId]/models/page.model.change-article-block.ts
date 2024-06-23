import {ArticleLayout} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/types/ArticleLayout.types";
import {api} from "@/app/api/api";
import {createEffect, createEvent, sample} from "effector";
import {getIssueLayoutFx} from "../models/page.model.get-issue-layout";

export type ChangeArticleBlockData = {
    articleBlock : ArticleLayout,
    issueId : number
}

const changeArticleBlock = async (req : ChangeArticleBlockData) : Promise<number> => {
    return api.put('/issue-layout', req.articleBlock).then(_ => req.issueId);
};

const changeArticleBlockFx = createEffect<ChangeArticleBlockData, number, Error>(changeArticleBlock);
export const changeArticleBlockEvent = createEvent<ChangeArticleBlockData>();

sample({
    clock : changeArticleBlockEvent,
    target : changeArticleBlockFx
})

sample({
   clock : changeArticleBlockFx.doneData,
   target : getIssueLayoutFx
})
