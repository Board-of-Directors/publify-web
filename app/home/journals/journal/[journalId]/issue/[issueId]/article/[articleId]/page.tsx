"use client"

import React from 'react';
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiSettings, FiTrash2} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import ArticleBlock from "@/app/components/organisms/article-block/article-block/ArticleBlock";
import {closestCenter, DndContext, SensorDescriptor, SensorOptions} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {
    useEditArticlePage
} from "@/app/home/journals/journal/[journalId]/issue/[issueId]/article/[articleId]/page.hooks";
import {Article} from "@/app/types/article";

const ArticleHeaderRow = ({article, onSubmit}: {
    article?: Article,
    onSubmit: () => void
}) => {
    return (
        <HeaderRow
            header={article?.name}
            leftContent={
                <div className={"flex flex-row gap-4 items-baseline"}>
                    <Text
                        text={`${article?.textBlocksCount ?? 0} text blocks`}
                        className={"hint"}
                    />
                    <Text
                        text={`${article?.illustrationBlocksCount ?? 0} illustration blocks`}
                        className={"hint"}
                    />
                </div>
            }
        >
            <div className={"flex flex-row items-center gap-5"}>
                <FiSettings
                    type={"blue"}
                    size={"20px"}
                    className={"icon"}
                />
                <FiTrash2
                    type={"red"}
                    size={"20px"}
                    className={"icon"}
                />
                <Button
                    onClick={onSubmit}
                    className={"w-[220px]"}
                    text={"Save changes"}
                />
            </div>
        </HeaderRow>
    )
}

const ArticlePage = ({params}: {
    params: {
        articleId: number
    }
}) => {

    const {
        handleEditArticle, onDragEnd,
        handleChangeEditorState,
        article, blocks, sensors
    } = useEditArticlePage(params.articleId)

    return (
        <>
            <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>
                <ArticleHeaderRow onSubmit={handleEditArticle} article={article}/>
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
                                blocks.map((item) =>
                                    <ArticleBlock
                                        key={item.id}
                                        articleItem={item}
                                        onChange={handleChangeEditorState}
                                    />
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
