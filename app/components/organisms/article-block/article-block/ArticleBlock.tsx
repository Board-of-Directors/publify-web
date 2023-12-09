import React from 'react';

import {ClassValue} from "clsx";
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {cn} from "@/app/utils/cn";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import ArticleBlockEditRow from "@/app/components/organisms/article-block/article-block-edit-row/ArticleBlockEditRow";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {AnyExtension, EditorContent, useEditor} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import {Highlight} from "@tiptap/extension-highlight";
import {useDroppable} from "@dnd-kit/core";
import {BubbleMenu} from "@tiptap/extension-bubble-menu";

const ButtonRow = () => {

    const buttonCV: ClassValue[] = [
        "border-dashed text-text-gray border-2 border-border-gray bg-transparent",
        "hover:border-info-blue-default hover:text-info-blue-default",
        "transition hover:duration-200"
    ]

    return (
        <div className={"h-fit col-span-full flex flex-row gap-[20px] items-center"}>
            <Button
                onClick={() => console.log("ADD TEXT BLOCK")}
                icon={<FiPlus size={"18px"}/>}
                text={"Add text block"}
                className={cn(buttonCV)}
            />
            <Button
                onClick={() => console.log("ADD ILLUSTRATION BLOCK")}
                icon={<FiPlus size={"18px"}/>}
                text={"Add illustration block"}
                className={cn(buttonCV)}
            />
        </div>
    )
}

const ArticleBlock = ({id}: {
    id: number
}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        ...draggable
    } = useSortable({id: id});

    const droppable = useDroppable({id : id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const editorCV: ClassValue[] = [
        "p-5 border-2 border-background rounded-lg min-h-[180px]",
        "focus:outline-none text-[15px]"
    ]

    const droppableCV : ClassValue[] = [
        "absolute z-0 top-[87px] left-[1px] h-[300px] w-[807px] rounded-xl border-2",
        "border-info-blue-default border-dashed bg-info-blue-default bg-opacity-10",
        {"bg-transparent border-none" : draggable.isDragging}
    ]


    const extensions: AnyExtension[] = [
        StarterKit, Underline, Highlight, BubbleMenu
    ]

    const content = '<p>Enter text content...</p>'

    const editor = useEditor({
        extensions: extensions,
        editorProps: {
            attributes: {
                class: cn(editorCV),
            }
        },
        content: content
    })

    return (
        <div className={"relative h-fit col-span-full flex flex-col gap-[20px]"}>
            <ButtonRow/>
            <CardWrapper
                ref={setNodeRef}
                style={style}
                className={"z-10 col-span-full h-fit flex flex-col gap-[20px]"}
            >
                <ArticleBlockEditRow
                    editor={editor}
                    setActivatorNodeRef={setActivatorNodeRef}
                    listeners={listeners}
                    attributes={attributes}
                />
                <EditorContent editor={editor}/>
            </CardWrapper>
            <div
                ref={droppable.setNodeRef}
                className={cn(droppableCV)}
            />
        </div>
    )
};

export default ArticleBlock;
