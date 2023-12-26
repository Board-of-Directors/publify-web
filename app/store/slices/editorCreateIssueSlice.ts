import {FontStyle, IssueBlock, NodeStyles, TextStyle} from "@/app/types/IssueBlock";
import {StateCreator} from "zustand";

export type EditorCreateIssueSlice = {
    issueBlocks : IssueBlock[],
    onChangeIssueBlockCols : (issueBlockId : number, cols : number) => void,
    onChangeIssueBlockStyle : (issueBlockId : number, node : string, style : TextStyle) => void,
    onChangeIssueBlockFont : (issueBlockId : number, node : string, font : FontStyle) => void,
    populateIssueBlocks : (issueBlocks : IssueBlock[]) => void,
    deleteIssueBlock : (issueBlockId : number) => void
}

export const editorCreateIssueSlice : StateCreator<EditorCreateIssueSlice, [], [], EditorCreateIssueSlice>
    = (set, get) => ({

    issueBlocks : [],

    onChangeIssueBlockCols : (issueBlockId : number, cols : number) => {

        const predicate = (issueBlock : IssueBlock) => issueBlock.id === issueBlockId
        const issueIndexBlockToChange = get().issueBlocks.findIndex(predicate)
        const issueBlockToChange = get().issueBlocks[issueIndexBlockToChange]

        const changedIssueBlock = {...issueBlockToChange, cols : cols}
        const changedIssueBlocks = get().issueBlocks.with(issueIndexBlockToChange, changedIssueBlock)

        set({issueBlocks : changedIssueBlocks})

    },

    onChangeIssueBlockStyle : (issueBlockId : number, node : string, style : TextStyle) => {

        const predicate = (issueBlock : IssueBlock) => issueBlock.id === issueBlockId
        const issueIndexBlockToChange = get().issueBlocks.findIndex(predicate)
        const issueBlockToChange = get().issueBlocks[issueIndexBlockToChange]

        issueBlockToChange.textStyles[node as keyof TextStyle] = style

        const changedIssueBlock = {...issueBlockToChange}
        const changedIssueBlocks = get().issueBlocks.with(issueIndexBlockToChange, changedIssueBlock)

        set({issueBlocks : changedIssueBlocks})
    },

    onChangeIssueBlockFont : (issueBlockId : number, node : string, font : FontStyle) => {

        const predicate = (issueBlock : IssueBlock) => issueBlock.id === issueBlockId
        const issueIndexBlockToChange = get().issueBlocks.findIndex(predicate)
        const issueBlockToChange = get().issueBlocks[issueIndexBlockToChange]

        issueBlockToChange.fontStyles[node as keyof FontStyle] = font

        const changedIssueBlock = {...issueBlockToChange}
        const changedIssueBlocks = get().issueBlocks.with(issueIndexBlockToChange, changedIssueBlock)

        set({issueBlocks : changedIssueBlocks})
    },

    populateIssueBlocks : (issueBlocks : IssueBlock[]) => set({issueBlocks : issueBlocks}),

    deleteIssueBlock : (issueBlockId : number) => {
        const predicate = (issueBlock : IssueBlock) => issueBlock.id !== issueBlockId
        const changedIssueBlocks = get().issueBlocks.filter(predicate)
        set({issueBlocks : changedIssueBlocks})
    }

})