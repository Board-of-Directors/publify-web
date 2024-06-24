import {api} from "@/app/api/api";
import {createEffect, sample} from "effector";
import {
    getTableOfContentsFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-table-of-contents";

const deleteTableOfContents = async (issueId : number) : Promise<number> => {
    return api.delete('/table-of-content', {params : {issueId : issueId}})
        .then(_ => issueId);
};

export const deleteTableOfContentsFx = createEffect<number, number, Error>(deleteTableOfContents);

sample({
    clock : deleteTableOfContentsFx.doneData,
    target : getTableOfContentsFx
})