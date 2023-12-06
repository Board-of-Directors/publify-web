import {StateCreator} from "zustand";
import api from "@/app/api/api";
import {Exception, Journal, JournalCard} from "@/app/types/entities";

export type JournalsSlice = {

    journal: JournalCard | undefined,
    journals: JournalCard[],

    searchJournals: (journalName ?: string) => void,
    getJournal: (journalId: number) => Promise<Exception | void>,
    createJournal: (journal: Journal) => Promise<number | void>,
    deleteJournal : (journalId : number) => Promise<Exception | void>
}

export const journalsSlice: StateCreator<JournalsSlice, [], [], JournalsSlice> = (set) => ({

    journal: undefined,
    journals: [],

    getJournal: async (id: number) => {
        return api.get('/journal', {params: {id: id}})
            .then((response) => {
                if (response.data.exception == null) {
                    set({journal: response.data.result})
                } else return response.data.exception as Exception
            })
    },

    searchJournals: async (journalName) => {
        api.get("/journal/search", {
            params: {
                name: journalName
            }
        })
            .then((response) => {
                const data = response.data.result
                set({journals: data})
            })
            .catch((error) => console.log(error))
    },

    createJournal: async (journal: Journal) => {
        return api.post("/journal", journal)
            .then((response) => {
                console.log(response)
                return response.status
            })
            .catch(console.log)
    },

    deleteJournal : async (journalId : number) => {
        return api.delete('/journal', {params : {journalId : journalId}})
            .then((response) => response.data.exception as Exception)
    }

})