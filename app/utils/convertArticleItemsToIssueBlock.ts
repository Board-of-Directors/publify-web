import {ArticleBlock} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/types/ArticleLayout.types";
import {
    EditorArticleBlock
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-article-items";

export const convertArticleItemsToIssueBlock = (editorArticleBlock : EditorArticleBlock) : ArticleBlock => {
    let accumulator = new Object({files: [], content: ""}) as ArticleBlock;

    editorArticleBlock.articleItems.forEach((item) => {

        let content : string

        if (item.contentType.toLowerCase() === "image") {
            content = `<img src="data:image/jpeg;base64,${item.content}" alt="/"/>`
        } else content = item.content

        accumulator = {
            content: accumulator.content?.concat(`<br>`).concat(content as string)
        } as ArticleBlock

    })

    accumulator['title'] = editorArticleBlock.title;
    accumulator['layout'] = editorArticleBlock.articleLayout;

    return accumulator;

}