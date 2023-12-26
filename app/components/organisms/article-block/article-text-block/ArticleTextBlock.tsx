import React, {useEffect} from 'react';

import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import ArticleBlockEditRow from "@/app/components/organisms/article-block/article-block-edit-row/ArticleBlockEditRow";
import {AnyExtension, EditorContent, useEditor} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import {Highlight} from "@tiptap/extension-highlight";
import {BubbleMenu} from "@tiptap/extension-bubble-menu";
import {ArticleItem} from "@/app/types/article";
import DraggableCardWrapper from "@/app/components/wrappers/card/draggable-card-wrapper/DraggableCardWrapper";

const ArticleBlock = ({articleItem, onAddIllustration, onAddText, onDelete, onChange}: {
    articleItem: ArticleItem,
    onAddIllustration : () => void,
    onAddText : () => void,
    onDelete : () => void,
    onChange : (state : string, curSeqNumber : number) => void
}) => {

    const editorCV: ClassValue[] = [
        "p-5 border-2 border-background rounded-lg min-h-[200px]",
        "focus:outline-none text-[15px]"
    ]

    const extensions: AnyExtension[] = [
        StarterKit, Underline, Highlight, BubbleMenu
    ]

    const editor = useEditor({
        extensions: extensions,
        editorProps: {
            attributes: {
                class: cn(editorCV),
            }
        },
        onUpdate : ({editor}) => {
            onChange(editor.getHTML(), articleItem.id)
        },
    })

    useEffect(() => {
        if (editor?.isEmpty) {
            editor?.commands.setContent(articleItem.content)
        }
    }, [articleItem])

    return (
        <DraggableCardWrapper
            id={articleItem.id}
            onAddText={onAddText}
            onAddIllustration={onAddIllustration}
        >
            <ArticleBlockEditRow
                editor={editor}
                onDelete={onDelete}
            />
            <EditorContent editor={editor}/>
        </DraggableCardWrapper>
    )
};

export default ArticleBlock;
