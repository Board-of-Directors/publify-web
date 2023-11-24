import {create} from "zustand";
import {JournalsSlice, journalsSlice} from "@/app/store/slices/journalsSlice";
import {AuthorizationSlice, authorizationSlice} from "@/app/store/slices/authorizationSlice";

export const useStore = create<JournalsSlice & AuthorizationSlice>()
((...config) => ({
    ...journalsSlice(...config),
    ...authorizationSlice(...config)
}))