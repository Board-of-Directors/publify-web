import {Article} from "@/app/types/article";
import React from "react";
import ArticleTable from "@/app/components/organisms/tables/article-table/ArticleTable";
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {Client} from "@stomp/stompjs";

type EditorAddArticleBlockProps = {
    articles : Article[],
    onAddArticle : (article : Article) => void,
    onAddTableOfContent : () => void,
}

const EditorAddArticleBlock = (props : EditorAddArticleBlockProps) => {

    const buttonCV: ClassValue[] = [
        "border-dashed text-text-gray border-2 border-border-gray bg-transparent",
        "hover:border-info-blue-default hover:text-info-blue-default",
        "transition hover:duration-200"
    ]

    return (
        <div className={"col-span-8 flex flex-col gap-[20px]"}>
            <Button
                icon={<FiPlus size={"18px"}/>}
                className={cn(buttonCV)}
                onClick={props.onAddTableOfContent}
                text={"Add table of contents"}
            />
            <ArticleTable
                onArticleClick={props.onAddArticle}
                editable={false}
            />
        </div>
    );
};

export default EditorAddArticleBlock;
