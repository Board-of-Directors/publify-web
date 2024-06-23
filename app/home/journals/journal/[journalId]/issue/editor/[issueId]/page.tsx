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

const EditorIssuePage = ({params: {issueId}}: {
    params: {
        issueId: number
    }
}) => {

    const context = useEditorIssuePage(issueId);
    const [createArticleBlock, getIssueLayout] = useUnit([createArticleBlockEvent, getIssueLayoutEvent]);

    const handleAddArticle = (article: Article) => {
        createArticleBlock({issueId: issueId, articleId: article.id});
    }

    useEffect(() => {
        getIssueLayout(issueId);
    }, []);

    return (
        <CollaborativeEditingProvider issueId={issueId}>
            <ArticleHeaderRow name={context.issue.title}/>
            <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>
                <GridBlock>
                    <img
                        className={"col-span-8 rounded-xl object-fill"}
                        src={`data:image/jpeg;base64,${context.issueCover}`}
                        alt={"/"}
                    />
                    <ArticleCoverSider/>
                    <ArticleBlocks issueId={issueId}/>
                    <EditorAddArticleBlock
                        onAddArticle={handleAddArticle}
                        onAddTableOfContent={() => console.log("TABLE OF CONTENTS")}
                        articles={context.availableArticles}
                    />
                </GridBlock>
            </div>
        </CollaborativeEditingProvider>
    );
};

export default EditorIssuePage;
