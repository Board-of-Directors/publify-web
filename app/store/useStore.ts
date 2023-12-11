import {create} from "zustand";
import {JournalsSlice, journalsSlice} from "@/app/store/slices/journalsSlice";
import {AuthorizationSlice, authorizationSlice} from "@/app/store/slices/authorizationSlice";
import {employeeSlice, EmployeeSlice} from "@/app/store/slices/employeeSlice";
import {CreateJournalSlice, createJournalSlice} from "@/app/store/slices/createJournalSlice";
import {IssueSlice, issuesSlice} from "@/app/store/slices/issuesSlice";
import {articleSlice, ArticleSlice} from "@/app/store/slices/articleSlice";

type StoreSlices = JournalsSlice & AuthorizationSlice & EmployeeSlice
    & CreateJournalSlice & IssueSlice & ArticleSlice

export const useStore = create<StoreSlices>()
((...config) => ({
    ...journalsSlice(...config),
    ...authorizationSlice(...config),
    ...employeeSlice(...config),
    ...createJournalSlice(...config),
    ...issuesSlice(...config),
    ...articleSlice(...config)
}))