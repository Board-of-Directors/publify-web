import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {ArticleItem} from "@/app/types/article";
import {DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {mockArticleItems} from "@/app/mock/mockArticleItems";

export const useEditArticlePage = (articleId: number) => {

    const [article, getArticle] = useStore(
        useShallow(state =>
            [state.article, state.getArticle])
    )

    const [articleItems, getArticleItems] = useStore(
        useShallow(state =>
            [state.articleItems, state.getArticleItems])
    )

    const [
        blocks,
        setBlocks
    ] = useState<ArticleItem[]>(articleItems)

    const prepareBlocksOrder = (articleItems: ArticleItem[]) => {
        if (articleItems.length === 0) return mockArticleItems
        return articleItems.sort((fst, snd) =>
            fst.sequenceNumber > snd.sequenceNumber ? 1 : 0
        )
    }

    const handleChangeEditorState = (value: string, itemId: number) => {
        setBlocks((state) => {
            return state.map((item) => {
                if (item.id === itemId) {
                    return {...item, content: value}
                } else return item
            })
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const onDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setBlocks((blocks) => {
                const oldIndex = blocks.findIndex((block) => block.id === active.id);
                const newIndex = blocks.findIndex((block) => block.id === over?.id);
                return arrayMove(blocks, oldIndex, newIndex);
            });
        }
    }

    const editArticle = useStore(state => state.editArticle)

    const enumerateBlocks = () => {
        setBlocks((blocks) => blocks.map((item, index) => {
            return {...item, sequenceNumber: index}
        }))
    }

    const handleEditArticle = () => {
        enumerateBlocks()
        console.log(blocks)
        editArticle(articleId, blocks)
    }

    useEffect(() => {
        setBlocks(() => prepareBlocksOrder(articleItems))
    }, [articleItems])

    useEffect(() => {
        getArticle(articleId)
        getArticleItems(articleId)
    }, [])

    return {
        handleEditArticle, onDragEnd,
        handleChangeEditorState,
        articleItems, article, blocks, sensors
    }

}