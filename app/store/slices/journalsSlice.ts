import {StateCreator} from "zustand";
import {api} from "@/app/api/api";
import {Exception, Journal, JournalCard} from "@/app/types/entities";
import {CreateJournalSlice} from "@/app/store/slices/createJournalSlice";

export type JournalsSlice = {

    journals: JournalCard[],
    requestJournal : Journal,

    fillPartialData : (data : Journal) => void,

    searchJournals: (organizationId : number, journalName ?: string) => void,
    getJournal: (journalId: number) => Promise<Exception | void>,
    createJournal: (journal: Journal) => Promise<number | void>,
    deleteJournal: (journalId: number) => Promise<Exception | void>,
    editJournal: (journalId: number) => Promise<Exception | void>

}

export const journalsSlice: StateCreator<JournalsSlice & CreateJournalSlice, [], [], JournalsSlice>
    = (set, get) => ({

    requestJournal : {
        name : "", description : "",
        employeeEmails : [], organizationId : 0
    },

    journals: [],

    fillPartialData : (data : Journal) => set((state) => ({
        requestJournal : {
            ...state.requestJournal,
            ...data
        }
    })),

    getJournal: async (id: number) => {
        return api.get('/journal', {params: {id: id}})
            .then((response) => {
                const data = response.data.result
                set({
                    requestJournal : {
                        organizationId : data.id,
                        name : data.name,
                        description : data.description,
                        employeeEmails : data.employeeEmails
                    }
                })
                set({journal: data})
                return response.data.exception as Exception
            })
    },

    searchJournals: async (journalName, organizationId) => {
        api.get("/journal/search", {
            params: {
                name: journalName,
                organizationId : organizationId
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

    deleteJournal: async (journalId: number) => {
        return api.delete('/journal', {params: {journalId: journalId}})
            .then((response) => response.data.exception as Exception)
    },

    editJournal: async (journalId: number) => {
        return api.put('/journal', get().requestJournal, {params: {id: journalId}})
            .then((response) => {
                return response.data.exception as Exception
            })

    }

})