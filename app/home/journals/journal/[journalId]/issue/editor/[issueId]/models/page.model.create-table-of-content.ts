import {api} from "@/app/api/api";
import {createEffect, createEvent, sample} from "effector";

const createTableOfContent = async (issueId : number) : Promise<number> => {
    return api.post('/issue-layout/table-of-content', null, {params : {issueId}})
        .then(_ => issueId);
}

export const createTableOfContentFx = createEffect<number, number, Error>(createTableOfContent);
export const createTableOfContentEvent = createEvent<number>();

sample({
    clock : createTableOfContentEvent,
    target : createTableOfContentFx
})