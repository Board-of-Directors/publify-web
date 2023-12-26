import {useState} from "react";
import {SelectItem} from "@/app/components/atoms/buttons/select-button/SelectButton";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {IssueConfig} from "@/app/types/IssueConfig";

export const useEditorSettingsPage = (issueId : number) => {

    const [issue, getIssue] = useStore(useShallow(
        state =>
            [state.issue, state.getIssue]
    ))

    const [config, setConfig] = useStore(
        useShallow(state =>
            [state.config, state.setConfig])
    )

    const issueData = [
        {header : "Issue name", text : issue.title},
        {header : "Issue number", text : issue.number.toString()},
        {header : "Release date", text : issue.releaseDate},
    ]

    const marginSelectItems : SelectItem[] = [
        {name : "Small", action : () => setActiveMarginValue(0)},
        {name : "Medium", action : () => setActiveMarginValue(20)},
        {name : "Large", action : () => setActiveMarginValue(40)},
    ]

    const [
        headersFLag,
        setHeaderFlag
    ] = useState<boolean>(config.header)

    const [
        footersFlag,
        setFootersFlag
    ] = useState<boolean>(config.footer)

    const [
        activeMarginValue,
        setActiveMarginValue
    ] = useState<number>(40)

    const initialActiveItem = config.padding == 0 ? marginSelectItems[0]
        : config.padding == 20 ? marginSelectItems[1] : marginSelectItems[2]

    const [
        activeMarginItem,
        setActiveMarginItem
    ] = useState<SelectItem>(initialActiveItem)

    const getIssueQuery = useQuery({
        queryKey : ["get", "issue", issueId],
        queryFn : () => getIssue(issueId)
    })

    const handleSaveChanges = () => {
        const config : IssueConfig = {
            padding : activeMarginValue,
            header : headersFLag,
            footer : footersFlag
        }
        setConfig(config)
    }

    return {
        headersFLag, setHeaderFlag,
        footersFlag, setFootersFlag,
        activeMarginItem, setActiveMarginItem,
        getIssueQuery, issueData, marginSelectItems,
        handleSaveChanges
    }

}