import React, {ChangeEvent} from 'react';
import DraggableCardWrapper from "@/app/components/wrappers/card/draggable-card-wrapper/DraggableCardWrapper";
import Text from "@/app/components/atoms/text/Text";
import FileInput from "@/app/components/atoms/inputs/FileInput";
import {ArticleItem} from "@/app/types/article";
import DragDeleteButtonRow from "@/app/components/moleculas/rows/drag-delete-button-row/DragDeleteButtonRow";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";

type ArticleIllustrationBlockProps = {
    onClear: () => void,
    onAddText: () => void,
    onAddIllustration: () => void,
    onDelete: () => void,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    articleItem: ArticleItem
}

type ArticleIllustrationHeaderRowProps = {
    onDeleteItem: () => void,
    setActivatorNodeRef?: (element: (HTMLElement | null)) => void,
    listeners?: SyntheticListenerMap | undefined,
    attributes?: DraggableAttributes,
}

const ArticleIllustrationHeaderRow = (props: ArticleIllustrationHeaderRowProps) => {
    return (
        <div className={"w-full flex flex-row justify-between items-center"}>
            <Text text={"Illustration"} className={"text-[16px] text-text-black"}/>
            <DragDeleteButtonRow onDelete={props.onDeleteItem} {...props}/>
        </div>
    )
}

const ArticleIllustrationBlock = (props: ArticleIllustrationBlockProps) => {

    const value = props.articleItem.content !== ""
        ? "File uploaded" : undefined

    return (
        <DraggableCardWrapper
            id={props.articleItem.id}
            onAddText={props.onAddText}
            onAddIllustration={props.onAddIllustration}
        >
            <ArticleIllustrationHeaderRow
                onDeleteItem={props.onDelete}
            />
            <FileInput
                placeholder={"Upload the file"}
                value={value}
                onChange={props.onChange}
                onClear={props.onClear}
            />
            <>
                {
                    props.articleItem.content !== "" && <img
                        className={"w-full h-[200px] rounded-xl object-cover"}
                        src={`data:image/jpeg;base64,${props.articleItem.content}`}
                        alt={"/"}
                    />
                }
            </>
        </DraggableCardWrapper>
    );
};

export default ArticleIllustrationBlock;
