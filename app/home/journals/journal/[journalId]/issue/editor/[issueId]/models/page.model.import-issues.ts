import {api} from "@/app/api/api";
import {createEffect} from "effector";

export type ImportIssuesData = {
    issueId : number,
    linkedIssues : number[]
}

const importIssues = async (req : ImportIssuesData) : Promise<void> => {
    const issueArrayQuery = req.linkedIssues.map(issue => `&linkedIssues=${issue}`).join('');
    const query = `?issueId=${req.issueId}${issueArrayQuery}`;

    return api.put(`/issue/link${query}`).then(response => response.data.result);
}

export const importIssuesFx = createEffect<ImportIssuesData, void, Error>(importIssues);