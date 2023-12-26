import {useStore} from "@/app/store/useStore";
import {SelectItem} from "@/app/components/atoms/buttons/select-button/SelectButton";
import {useState} from "react";
import {FontStyle, TextStyle} from "@/app/types/IssueBlock";

export const useHTMLIssueBlockSider = () => {

    const onChangeIssueBlockCols = useStore(state => state.onChangeIssueBlockCols)

    const selectItems: SelectItem[] = [
        {name: "1", action: () => console.log("Selected 1")},
        {name: "2", action: () => console.log("Selected 2")},
        {name: "3", action: () => console.log("Selected 3")},
        {name: "4", action: () => console.log("Selected 4")},
    ]

    const [
        selectedItem,
        selectItem
    ] = useState<SelectItem>(selectItems[0])

    const textControls = {
        font: [{name: "Sans"}, {name: "Serif"}, {name : "Mono"}, {name: "Default"}],
        style: [{name: "Bold"}, {name: "Italic"}, {name : "None"}]
    }

    const textBlocks = [
        {header: "Heading", controls: textControls},
        {header: "Paragraph", controls: textControls}
    ]

    const initStyleState : {id : number, name : string}[] = Array.from({length : 2},
        (_, index) => {return {id : index, name : "Bold"}})

    const initFontStyle : {id : number, name : string}[] = Array.from({length : 3},
        (_, index) => {return {id : index, name : "Default"}})

    const [
        font,
        setFont
    ] = useState<{ id : number, name : string }[]>(initFontStyle)

    const [
        style,
        setStyle
    ] = useState<{id : number, name : string}[]>(initStyleState)

    const deleteIssueBlock = useStore(state => state.deleteIssueBlock)

    const onChangeIssueBlockStyle = useStore(state => state.onChangeIssueBlockStyle)
    const onChangeIssueBlockFont = useStore(state => state.onChangeIssueBlockFont)

    const handleSelectItem = (issueBlockId: number, item: SelectItem) => {
        onChangeIssueBlockCols(issueBlockId, +item.name)
        selectItem(item)
    }

    const handleChangeStyle = (issueBlockId : number, itemId : number, node : string, style : string) => {

        const newStyle = style === "Bold" ? "boldStyle" :
            style === "Italic" ? "italicStyle" : "none"

        onChangeIssueBlockStyle(issueBlockId, node.toLowerCase(), newStyle as TextStyle)

        setStyle(state =>
            state.with(itemId, {id : itemId, name : style})
        )
    }

    const handleChangeFont = (issueBlockId : number, itemId : number, node : string, font : string) => {

        const newFont = font === "Mono" ? "monoStyle" :
            font === "Sans" ? "sansStyle" : font === "Serif" ? "serifStyle" : "none" as FontStyle

        onChangeIssueBlockFont(issueBlockId, node.toLowerCase(), newFont)

        setFont(state =>
            state.with(itemId, {id : itemId, name : font})
        )
    }

    const handleDeleteIssueBlock = (issueBlockId: number) => deleteIssueBlock(issueBlockId)
    const handleSelectBlockTemplate = (templateId: number) => console.log(templateId)
    const handleSelectPictureTemplate = (templateId: number) => console.log(templateId)

    return {
        selectedItem, handleSelectItem, selectItems, textBlocks,
        handleDeleteIssueBlock, handleSelectPictureTemplate,
        handleSelectBlockTemplate, font, setFont, style, handleChangeStyle,
        handleChangeFont
    }

}