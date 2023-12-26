export type IssueBlock = {
    fontStyles : FontStyles,
    textStyles : TextStyles,
    cols : number,
    id : number,
    name : string,
    content ?: string
}

export type TextStyles = {
    heading : TextStyle,
    paragraph : TextStyle
}

export type FontStyles = {
    heading : FontStyle,
    paragraph : FontStyle
}

export type TextStyle = "boldStyle" | "italicStyle" | "highlightStyle" | "none"
export type FontStyle = "sansStyle" | "serifStyle" | "monoStyle" | "none"