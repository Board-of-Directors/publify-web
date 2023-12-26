import React from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import ArticleTableHeader
    from "@/app/components/organisms/tables/article-table/article-table-header/ArticleTableHeader";
import ArticleTableRow from "@/app/components/organisms/tables/article-table/article-table-row/ArticleTableRow";
import {Article} from "@/app/types/article";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

type ArticleTableProps = {
    articles : Article[] | undefined,
    editable ?: boolean,
    onArticleClick ?: (article : Article) => void,
    className ?: string
}

const ArticleTable = ({editable = true, ...props} : ArticleTableProps) => {

    const titles = [
        "Article name", "Text blocks count",
        "Illustrations count"
    ]

    const mainWrapperCV : ClassValue[] = [
        "w-full !p-0 !gap-0",
        props.className
    ]

    return (
        <CardWrapper className={cn(mainWrapperCV)}>
            <ArticleTableHeader titles={titles}/>
            {
                props.articles && props.articles.map((article) =>
                    <ArticleTableRow
                        editable={editable}
                        onClick={props.onArticleClick}
                        article={article}
                    />
                )
            }
        </CardWrapper>
    );

};

export default ArticleTable;
