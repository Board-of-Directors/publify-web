import React from 'react';
import Text from "@/app/components/atoms/text/Text";
import {FiSettings, FiTrash2} from "react-icons/fi";
import {
    useArticleTableRow
} from "@/app/components/organisms/tables/article-table/article-table-row/ArticleTableRow.hooks";
import {Article} from "@/app/types/article";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

const ArticleTableRow = ({article, editable, onClick}: {
    editable : boolean,
    onClick ?: (article : Article) => void,
    article: Article
}) => {

    const {
        handleRowClick,
        handleDeleteClick
    } = useArticleTableRow()

    const wrapperCV: ClassValue[] = [
        "w-full p-5 flex flex-row items-center hover:bg-background",
        "hover:cursor-pointer justify-between border-b-2 border-background"
    ]

    const articleData: string[] = [
        article.name, `${article.textBlocksCount} blocks`,
        `${article.illustrationBlocksCount} blocks`
    ]

    return (
        <div
            onClick={() => handleRowClick(article, onClick)}
            className={cn(wrapperCV)}
        >
            <div className={"flex flex-row items-baseline gap-[60px]"}>
                {
                    articleData.map((item) => <Text
                        text={item}
                        className={"text-text-black text-[16px] w-[180px]"}
                    />)
                }
            </div>
            {
                editable && <div className={"flex flex-row gap-[15px] items-center"}>
                    <FiSettings
                        size={"20px"}
                        className={"stroke-text-gray hover:cursor-pointer hover:stroke-info-blue-default"}
                        onClick={() => console.log("Settings Clicked")}
                    />
                    <FiTrash2
                        size={"20px"}
                        className={"text-text-gray hover:cursor-pointer hover:stroke-info-red"}
                        onClick={handleDeleteClick}
                    />
                </div>
            }
        </div>
    )
}

export default ArticleTableRow;
