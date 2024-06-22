"use client"

import ArticleHeaderRow from "@/app/components/organisms/article-header-row/ArticleHeaderRow";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import ArticleCoverSider from "@/app/components/organisms/article-cover-sider/ArticleCoverSider";
import {useEditorIssuePage} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/page.hooks";
import EditorAddArticleBlock from "@/app/components/organisms/editor-add-article-block/EditorAddArticleBlock";
import React, {useEffect} from "react";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import HTMLIssueBlockSider from "@/app/components/organisms/html-issue-block-sider/HTMLIssueBlockSider";

import {AnyExtension, EditorContent, useEditor} from "@tiptap/react";
import Image from "@tiptap/extension-image"
import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import {Highlight} from "@tiptap/extension-highlight";
import {BubbleMenu} from "@tiptap/extension-bubble-menu";
import {Heading} from "@tiptap/extension-heading";
import {Paragraph} from "@tiptap/extension-paragraph";
import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import Text from "@/app/components/atoms/text/Text";
import {useUnit} from "effector-react";
import {
    getIssueLayoutEvent
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-issue-layout";
import {
    $articleBlocks
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-article-items";
import {ArticleBlock} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/types/ArticleLayout.types";
import {Article} from "@/app/types/article";
import {
    createArticleBlockEvent
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.create-article-layout";

const EditableHeading = Heading.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                renderHTML: attributes => {
                    return {
                        class: `${attributes.class}`,
                    }
                },
            },
        }
    },
})

const EditableParagraph = Paragraph.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                renderHTML: attributes => {
                    return {
                        class: `${attributes.class}`,
                    }
                },
            },
        }
    },
})

const HTMLIssueBlock = ({articleBlock, issueId}: { articleBlock: ArticleBlock, issueId: number }) => {

    const {layout} = articleBlock;
    const issueConfig = useStore(state => state.config)

    const [issue, getIssue] = useStore(useShallow(
        state => [state.issue, state.getIssue]
    ))

    const issueData = [
        {header: "Issue name", text: issue.title},
        {header: "Issue number", text: issue.number.toString()},
        {header: "Release date", text: issue.releaseDate},
    ]

    const getIssueQuery = useQuery({
        queryKey: ["get", "issue", issueId],
        queryFn: () => getIssue(issueId)
    })

    const extensions: AnyExtension[] = [
        StarterKit,
        EditableHeading,
        EditableParagraph,
        Underline, Highlight, BubbleMenu, Image.configure({
            allowBase64: true,
            inline: true,
            HTMLAttributes: {
                class: "object-fill"
            }
        })
    ]

    const editor = useEditor({
        extensions: extensions,
        content: articleBlock.content,
        editable: false
    })

    /*
    useEffect(() => {
        editor?.chain()
            .selectAll()
            .updateAttributes('heading', {class: layout.textStyles.heading})
            .updateAttributes('paragraph', {class: layout.textStyles.paragraph})
            .run()
    }, [layout.textStyles.heading, layout.textStyles.paragraph])

    useEffect(() => {
        editor?.chain()
            .selectAll()
            .updateAttributes('heading', {class: articleBlock.fontStyles.heading})
            .updateAttributes('paragraph', {class: articleBlock.fontStyles.paragraph})
            .run()
    }, [layout.fontStyles.heading, layout.fontStyles.paragraph])
     */

    if (getIssueQuery.isSuccess) return (
        <CardWrapper className={`col-span-8`}>
            <div
                style={{
                    columnWidth: 600 / layout.columnCount,
                    padding: issueConfig.padding
                }}
            >
                {issueConfig.header && <div className={"w-full flex flex-row justify-between"}>
                    {issueData.map((item) => (
                        <div className={"flex flex-col items-center gap-1"}>
                            <Text text={item.header} className={"text-[14px] text-text-gray"}/>
                            <Text text={item.text} className={"text-[16px] text-text-black"}/>
                        </div>
                    ))}
                </div>}
                <EditorContent editor={editor}/>
                {issueConfig.footer && <div className={"w-full flex justify-center items-center"}>
                    <Text className={"text-[16px] text-text-black"} text={`#1 page`}/>
                </div>}
            </div>
        </CardWrapper>
    )

}

const EditorIssuePage = ({params: {issueId}}: {
    params: {
        issueId: number
    }
}) => {

    const context = useEditorIssuePage(issueId);
    const [articleBlocks, createArticleBlock, getIssueLayout] = useUnit([$articleBlocks, createArticleBlockEvent, getIssueLayoutEvent]);

    const handleAddArticle = (article: Article) => {
        createArticleBlock({issueId: issueId, articleId: article.id});
    }

    useEffect(() => {
        getIssueLayout(issueId);
    }, []);

    return (
        <>
            <ArticleHeaderRow name={context.issue.title}/>
            <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>
                <GridBlock>
                    <img
                        className={"col-span-8 rounded-xl object-fill"}
                        src={`data:image/jpeg;base64,${context.issueCover}`}
                        alt={"/"}
                    />
                    <ArticleCoverSider/>
                    {articleBlocks.map((articleBlock, index) => (
                        <GridBlock className={"col-span-full"} key={index}>
                            <HTMLIssueBlock articleBlock={articleBlock} issueId={issueId}/>
                            <HTMLIssueBlockSider articleLayout={articleBlock.layout} issueId={issueId}/>
                        </GridBlock>
                    ))}
                    <EditorAddArticleBlock
                        onAddArticle={handleAddArticle}
                        onAddTableOfContent={() => console.log("TABLE OF CONTENTS")}
                        onAddAdvertisementPage={() => console.log("ADVERTISEMENT PAGE")}
                        articles={context.availableArticles}
                    />
                </GridBlock>
            </div>
        </>
    );
};

export default EditorIssuePage;
