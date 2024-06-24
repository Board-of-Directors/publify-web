import {api} from "@/app/api/api";
import {createEffect, createStore} from "effector";

export type TableOfContentsItem = {
    pageNumber: number,
    pageTitle: string
}

export type TableOfContents = {
    id: number,
    issueId: number,
    pages: TableOfContentsItem[]
}

const getTableOfContents = async (issueId : number) : Promise<TableOfContents> => {
    return api.get('/table-of-content', {params : {issueId : issueId}})
        .then(response => response.data.result);
};

export const getTableOfContentsFx = createEffect<number, TableOfContents, Error>(getTableOfContents);
export const $tableOfContents = createStore<TableOfContents | null>(null);

$tableOfContents.on(getTableOfContentsFx.doneData, (_, tableOfContents) => tableOfContents);
