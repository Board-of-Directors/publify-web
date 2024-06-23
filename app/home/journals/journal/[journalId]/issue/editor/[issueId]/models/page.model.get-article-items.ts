import {api} from "@/app/api/api";
import {createEffect, createStore, sample} from "effector";
import {ArticleItem} from "@/app/types/article";
import {
    ArticleBlock,
    ArticleLayout
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/types/ArticleLayout.types";
import {convertArticleItemsToIssueBlock} from "@/app/utils/convertArticleItemsToIssueBlock";
import {
    $issueLayout,
    getIssueLayoutFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-issue-layout";

export type EditorArticleBlock = {
    articleItems : ArticleItem[],
    articleLayout : ArticleLayout,
    title : string
}

type GetArticleItemsData = {
    articleId : number,
    articleLayout : ArticleLayout,
    title : string
}

const getArticleItems = async (req : GetArticleItemsData) : Promise<EditorArticleBlock>=> {
    return api.get('/article/items', {params: {articleId: req.articleId}})
        .then((response) => ({...req, articleItems : response.data.result}));
};

const getAllArticleItems = async (issueLayout : ArticleLayout[]) : Promise<EditorArticleBlock[]> => {
    return Promise.all(issueLayout.map(async (articleLayout) => {
        return getArticleItems({...articleLayout, articleLayout : articleLayout})
    }))
}

export const getArticleItemsFx = createEffect<GetArticleItemsData, EditorArticleBlock, Error>(getArticleItems);
const getAllArticleItemsFx = createEffect<ArticleLayout[], EditorArticleBlock[], Error>(getAllArticleItems);

export const $articleBlocks = createStore<ArticleBlock[]>([]);

$articleBlocks.on(getArticleItemsFx.doneData, (state, articleBlock) => {
    const convertedArticle = convertArticleItemsToIssueBlock(articleBlock);
    return [...state, convertedArticle];
});

$articleBlocks.on(getAllArticleItemsFx.doneData, (_, articleBlocks) => {
    return articleBlocks.map(block => convertArticleItemsToIssueBlock(block));
});

$articleBlocks.watch(console.log);

sample({
    clock : getIssueLayoutFx.doneData,
    source : $issueLayout,
    target : getAllArticleItemsFx
});


