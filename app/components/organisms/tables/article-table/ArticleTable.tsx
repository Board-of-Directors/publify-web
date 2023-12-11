import React from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import ArticleTableHeader
    from "@/app/components/organisms/tables/article-table/article-table-header/ArticleTableHeader";
import ArticleTableRow from "@/app/components/organisms/tables/article-table/article-table-row/ArticleTableRow";
import {Article} from "@/app/types/article";

const ArticleTable = ({articles}: { articles: (Article | undefined)[] }) => {

    const titles = [
        "Article name", "Article description",
        "Text blocks count", "Illustrations count"
    ]

    return (
        <CardWrapper className={"w-full !p-0 !gap-0"}>
            <ArticleTableHeader titles={titles}/>
            {
                articles && articles.map((article) =>
                    <ArticleTableRow article={article}/>
                )
            }
        </CardWrapper>
    );

};

export default ArticleTable;
