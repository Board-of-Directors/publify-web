import {useStore} from "@/app/store/useStore";
import {useShallow} from "zustand/react/shallow";
import {ChangeEvent, useEffect, useState} from "react";
import {ArticleItem, ContentType} from "@/app/types/article";
import {DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {mockArticleItems} from "@/app/mock/mockArticleItems";
import {fileToBase64} from "@/app/utils/fileToBase64";

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
        editArticle(articleId, blocks)
    }

    const addNewItem = (items: ArticleItem[], articleId: number, newItem: ArticleItem) => {
        return items.flatMap((item: ArticleItem) =>
            item.id === articleId ? [newItem, item] : item)
    }

    const handleAddText = (articleId: number) => {
        const newItem: ArticleItem = {
            contentType: "text",
            content: "<p>Enter some text..</p>",
            sequenceNumber: blocks.length
        }
        setBlocks((items) => addNewItem(items, articleId, newItem))
    }

    const handleAddIllustration = (articleId: number) => {
        const newItem: ArticleItem = {
            id: blocks.length, contentType: "image",
            content: "",
            sequenceNumber: blocks.length
        }
        setBlocks((items) => addNewItem(items, articleId, newItem))
    }

    const handleDeleteItem = (articleId: number) => {
        return setBlocks((state) =>
            state.filter(item => item.id !== articleId)
        )
    }

    const getContentTypeCount = (items: ArticleItem[], contentType: ContentType) => {
        return items.reduce((acc, item) => {
            return item.contentType.toLowerCase() === contentType ? ++acc : acc
        }, 0)
    }

    const findArticleById = (itemId: number) => {
        return blocks.findIndex((item) => item.id === itemId)
    }

    const setImage = (itemId: number, content: string) => {
        const itemIndex = findArticleById(itemId)
        const item = blocks.at(itemIndex)
        const newItem: ArticleItem = {...item!!, content: content}
        setBlocks((state) => state.with(itemIndex, newItem))
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, itemId: number) => {
        const file = e.target.files && e.target.files[0]
        file && fileToBase64(file).then((encoded) => setImage(itemId, encoded as string))
    }

    const handleClearInput = (itemId: number) => {
        setImage(itemId, "")
    }

    const [
        textBlocksCount,
        setTextBlocksCount
    ] = useState<number>(article.textBlocksCount)

    const [
        illustrationBlocksCount,
        setIllustrationBlocksCount
    ] = useState<number>(article.illustrationBlocksCount)

    // set text & image blocks count
    useEffect(() => {
        setTextBlocksCount(getContentTypeCount(blocks, "text"))
        setIllustrationBlocksCount(getContentTypeCount(blocks, "image"))
        console.log("BLOCKS", blocks)
    }, [blocks])

    // compute blocks order and set initial text & image blocks count
    useEffect(() => {
        setBlocks(() => prepareBlocksOrder(articleItems))
        setTextBlocksCount(getContentTypeCount(blocks, "text"))
        setIllustrationBlocksCount(getContentTypeCount(blocks, "image"))
    }, [articleItems])

    // get article and items from database
    useEffect(() => {
        getArticle(articleId)
        getArticleItems(articleId)
    }, [])

    return {
        handleEditArticle, onDragEnd,
        handleAddText, handleAddIllustration,
        handleChangeEditorState, handleDeleteItem,
        handleInputChange, handleClearInput,
        textBlocksCount, illustrationBlocksCount,
        articleItems, article, blocks, sensors
    }

}