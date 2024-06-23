import {AddJournalData} from "@/app/schemas/AddJournalSchema";
import {api} from "@/app/api/api";

import {createEffect} from "effector";

type Response = {
    result : any,
    exception : any
}

const createJournal = async (data: AddJournalData) => {
    const request = {...data, employeeEmails : data.employeeEmails.map(email => email.value)};
    return api.post('/journal', request).then(response => response.data);
}

export const createJournalFx = createEffect<AddJournalData, Response, Error>(createJournal);