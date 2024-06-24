import {api} from "@/app/api/api";
import {createEffect, sample} from "effector";
import {
    getTableOfContentsFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-table-of-contents";

const createTableOfContents = async (issueId : number) : Promise<number> => {
    return api.post('/table-of-content', null, {params : {issueId : issueId}})
        .then(_ => issueId);
};

export const createTableOfContentsFx = createEffect<number, number, Error>(createTableOfContents);

sample({
    clock : createTableOfContentsFx.doneData,
    target : getTableOfContentsFx
})