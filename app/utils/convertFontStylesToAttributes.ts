
export const convertFontStylesToAttributes = (style ?: string) => {
    return style !== 'NONE' ? style?.toLowerCase().concat('Style') : 'none';
}