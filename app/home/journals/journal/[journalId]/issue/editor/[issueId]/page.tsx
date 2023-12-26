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
import {IssueBlock} from "@/app/types/IssueBlock";
import {Heading} from "@tiptap/extension-heading";
import {Paragraph} from "@tiptap/extension-paragraph";

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

const HTMLIssueBlock = ({issueBlock}: { issueBlock: IssueBlock }) => {

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
        content: issueBlock.content,
        editable: false
    })

    useEffect(() => {
        editor?.chain()
            .selectAll()
            .updateAttributes('heading', {class: issueBlock.textStyles.heading})
            .updateAttributes('paragraph', {class : issueBlock.textStyles.paragraph})
            .run()
    }, [issueBlock.textStyles.heading, issueBlock.textStyles.paragraph])

    useEffect(() => {
        editor?.chain()
            .selectAll()
            .updateAttributes('heading', {class: issueBlock.fontStyles.heading})
            .updateAttributes('paragraph', {class : issueBlock.fontStyles.paragraph})
            .run()
    }, [issueBlock.fontStyles.heading, issueBlock.fontStyles.paragraph])

    return (
        <CardWrapper className={"col-span-8"}>
            <div style={{columnWidth: 600 / issueBlock.cols}}>
                <EditorContent editor={editor}/>
            </div>
        </CardWrapper>
    )

}

const EditorIssuePage = ({params}: {
    params: {
        issueId: number
    }
}) => {

    const context = useEditorIssuePage(params.issueId)

    if (context.getIssueQuery.isLoading) {
        if (context.getArticlesQuery.isLoading) {
            return (
                <div>
                    Page is loading..
                </div>
            )
        }
    }

    return (
        <>
            <ArticleHeaderRow name={"Tyler, the Creator"}/>
            <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>
                <GridBlock>

                    <img
                        className={"col-span-8 rounded-xl object-fill"}
                        src={`data:image/jpeg;base64,${context.issueCover}`}
                        alt={"/"}
                    />
                    <ArticleCoverSider/>

                    {
                        context.issueBlocks.map((issueBlock) => (
                            <GridBlock className={"col-span-full"}>
                                <HTMLIssueBlock issueBlock={issueBlock}/>
                                <HTMLIssueBlockSider issueBlock={issueBlock}/>
                            </GridBlock>
                        ))
                    }

                    <EditorAddArticleBlock
                        articles={context.availableArticles}
                        onAddArticle={context.handleAddIssueBlock}
                        onAddTableOfContent={() => console.log("TABLE OF CONTENTS")}
                        onAddAdvertisementPage={() => console.log("ADVERTISEMENT PAGE")}
                    />

                </GridBlock>
            </div>
        </>
    );
};

export default EditorIssuePage;
