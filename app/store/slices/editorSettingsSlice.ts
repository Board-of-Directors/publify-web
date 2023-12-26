import {IssueConfig} from "@/app/types/IssueConfig";
import {StateCreator} from "zustand";

export type EditorSettingsSlice = {
    config : IssueConfig,
    setConfig : (config : IssueConfig) => void
}

export const editorSettingsSlice : StateCreator<EditorSettingsSlice, [], [], EditorSettingsSlice> = (set) => ({

    config : {
        padding : 40,
        header : false,
        footer : false
    },

    setConfig : (config : IssueConfig) => set({config : config})

})