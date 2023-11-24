import {StateCreator} from "zustand";
import api from "@/app/api/api";
import {JournalShortDTO} from "@/app/types/entities";

export type JournalsSlice = {
    journals: JournalShortDTO[],
    getJournals: (userId: number) => void,
}

export const journalsSlice: StateCreator<JournalsSlice, [], [], JournalsSlice> = (set) => ({

    journals: [],

    getJournals: (userId: number) => {
        api.get("/journal/all", {params: {userId: userId}})
            .then((response) => {
                const data = response.data.result
                set({journals: data})
            })
            .catch((error) => console.log(error))
    }

})