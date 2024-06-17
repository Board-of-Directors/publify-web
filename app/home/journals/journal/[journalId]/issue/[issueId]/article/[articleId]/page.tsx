"use client"

import React from 'react';
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiSettings, FiTrash2} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import ArticleTextBlock from "@/app/components/organisms/article-block/article-text-block/ArticleTextBlock";
import {closestCenter, DndContext, SensorDescriptor, SensorOptions} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {
    useEditArticlePage
} from "@/app/home/journals/journal/[journalId]/issue/[issueId]/article/[articleId]/page.hooks";
import {Article} from "@/app/types/article";
import ArticleIllustrationBlock
    from "@/app/components/organisms/article-block/article-illustration-block/ArticleIllustrationBlock";
import HeaderBackRow from "@/app/components/organisms/header-back-row/HeaderBackRow";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

const ArticleHeaderRow = ({article, textBlocksCount, illustrationBlocksCount, onSubmit}: {
    textBlocksCount: number,
    illustrationBlocksCount: number,
    article?: Article,
    onSubmit: () => void
}) => {

    const router: AppRouterInstance = useRouter()
    const handleBackClick = () => router.back()

    return (
        <HeaderBackRow
            header={article?.name}
            onBackClick={handleBackClick}
            leftContent={
                <div className={"flex flex-row gap-4 items-baseline"}>
                    <Text
                        text={`${textBlocksCount} text blocks`}
                        className={"hint"}
                    />
                    <Text
                        text={`${illustrationBlocksCount} illustration blocks`}
                        className={"hint"}
                    />
                </div>
            }
        >
            <div className={"col-start-9 col-span-full flex flex-row items-center gap-[20px]"}>
                <FiSettings
                    type={"blue"}
                    size={"24px"}
                    className={"icon"}
                />
                <FiTrash2
                    type={"red"}
                    size={"24px"}
                    className={"icon"}
                />
                <Button
                    onClick={onSubmit}
                    className={"!w-full"}
                    text={"Save changes"}
                />
            </div>
        </HeaderBackRow>
    )
}

const ArticlePage = ({params}: {
    params: {
        articleId: number
    }
}) => {

    const {
        handleEditArticle, onDragEnd,
        handleAddText, handleAddIllustration,
        handleChangeEditorState, handleDeleteItem,
        handleInputChange, handleClearInput,
        textBlocksCount, illustrationBlocksCount,
        article, blocks, sensors
    } = useEditArticlePage(params.articleId)

    return (
        <>
            <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>
                <ArticleHeaderRow
                    illustrationBlocksCount={illustrationBlocksCount}
                    textBlocksCount={textBlocksCount}
                    onSubmit={handleEditArticle}
                    article={article}
                />
                <DndContext
                    sensors={sensors as SensorDescriptor<SensorOptions>[]}
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={blocks.map(block => block.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <GridBlock className={"col-span-12 grid grid-cols-12"}>
                            {
                                blocks.map((item) => {
                                        return item.contentType.toLowerCase() === "text" ?
                                            <ArticleTextBlock
                                                key={item.id}
                                                onChange={(value, curSeqNumber) => handleChangeEditorState(value, curSeqNumber)}
                                                onDelete={() => handleDeleteItem(item.id)}
                                                onAddIllustration={() => handleAddIllustration(item.id)}
                                                onAddText={() => handleAddText(item.id)}
                                                articleItem={item}
                                            /> : <ArticleIllustrationBlock
                                                key={item.id}
                                                onDelete={() => handleDeleteItem(item.id)}
                                                onClear={() => handleClearInput(item.id)}
                                                onAddText={() => handleAddText(item.id)}
                                                onAddIllustration={() => handleAddIllustration(item.id)}
                                                onChange={(e) => handleInputChange(e, item.id)}
                                                articleItem={item}/>
                                    }
                                )
                            }
                        </GridBlock>
                    </SortableContext>
                </DndContext>
            </div>
        </>
    );
};

export default ArticlePage;
