"use client"

import ArticleHeaderRow from "@/app/components/organisms/article-header-row/ArticleHeaderRow";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import ArticleCoverSider from "@/app/components/organisms/article-cover-sider/ArticleCoverSider";
import {useEditorIssuePage} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/page.hooks";
import EditorAddArticleBlock from "@/app/components/organisms/editor-add-article-block/EditorAddArticleBlock";
import React, {useEffect} from "react";
import {useUnit} from "effector-react";
import {getIssueLayoutEvent} from "./models/page.model.get-issue-layout";
import {Article} from "@/app/types/article";
import {createArticleBlockEvent} from "./models/page.model.create-article-layout";
import CollaborativeEditingProvider from "@/app/components/providers/CollaborativeEditingProvider";
import ArticleBlocks from "./ui/ArticleBlocks";
import CollaborativeCursors from "./ui/CollaborativeCursors";
import {
    $tableOfContents,
    getTableOfContentsFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-table-of-contents";
import TableOfContent from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/ui/TableOfContent";
import {
    createTableOfContentsFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.create-table-of-contents";
import {
    deleteTableOfContentsFx
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.delete-table-of-content";

const EditorIssuePage = ({params: {issueId}}: {
    params: {
        issueId: number
    }
}) => {

    const context = useEditorIssuePage(issueId);
    const [createArticleBlock, getIssueLayout] = useUnit([createArticleBlockEvent, getIssueLayoutEvent]);
    const [tableOfContent, getTableOfContent, createTableOfContent] = useUnit([$tableOfContents, getTableOfContentsFx, createTableOfContentsFx]);
    const deleteTableOfContents = useUnit(deleteTableOfContentsFx)

    const handleAddArticle = (article: Article) => {
        createArticleBlock({issueId: issueId, articleId: article.id});
    }

    const handleAddTableOfContent = () => {
        createTableOfContent(issueId);
    }

    const handleDeleteTableOfContent = () => {
        deleteTableOfContents(issueId);
    }

    useEffect(() => {
        getTableOfContent(issueId);
        getIssueLayout(issueId);
    }, []);

    return (
        <CollaborativeEditingProvider issueId={issueId}>
            <CollaborativeCursors/>
            <ArticleHeaderRow name={context.issue.title}/>
            <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>
                <GridBlock>
                    <img
                        className={"col-span-8 rounded-xl object-fill"}
                        src={`data:image/jpeg;base64,${context.issueCover}`}
                        alt={"/"}
                    />
                    <ArticleCoverSider/>
                    {tableOfContent ? <TableOfContent
                        tableOfContent={tableOfContent}
                        issue={context.issue}
                    /> : null}
                    <ArticleBlocks issueId={issueId}/>
                    <EditorAddArticleBlock
                        onAddArticle={handleAddArticle}
                        onAddTableOfContent={handleAddTableOfContent}
                        onDeleteTableOfContent={handleDeleteTableOfContent}
                        articles={context.availableArticles}
                    />
                </GridBlock>
            </div>
        </CollaborativeEditingProvider>
    );
};

export default EditorIssuePage;
