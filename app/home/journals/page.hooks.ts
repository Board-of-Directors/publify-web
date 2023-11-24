import {JournalCardDTO} from "@/app/types/entities";

export const useJournalsPage = () => {

    const mockJournals : JournalCardDTO[] = [
        {
            header : "MyJournal",
            updateCount : 2,
            workersCount : 2,
            issuesCount : 32
        }, {
            header : "AnotherJournal",
            updateCount : 0,
            issuesCount : 12,
            workersCount : 6
        }
    ]

    const handleAddJournal = () => {
        console.log("Add journal")
    }

    return {
        mockJournals
    }

}