import {api} from "@/app/api/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {createTableOfContentFx} from "./page.model.create-table-of-content";

export type TableOfContent = {
    id : number,
    content : string
}

const getTableOfContent = async (issueId : number) : Promise<void> => {
    return api.get('/issue-layout/table-of-content', {params : {issueId}})
        .then(response => response.data.result);
}

const getTableOfContentFx = createEffect<number, void, Error>(getTableOfContent);
export const getTableOfContentEvent = createEvent<number>();
export const $tableOfContent = createStore<TableOfContent | null>(null);

$tableOfContent.on(getTableOfContentFx.doneData, (_, tableOfContent) => tableOfContent);

sample({
    clock : [createTableOfContentFx.doneData, getTableOfContentEvent],
    target : getTableOfContentFx
})