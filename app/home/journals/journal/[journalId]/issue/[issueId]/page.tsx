"use client"

import React from 'react';
import HeaderBackRow from "@/app/components/organisms/header-back-row/HeaderBackRow";
import {useIssuePage} from "@/app/home/journals/journal/[journalId]/issue/[issueId]/page.hooks";
import ArticleTable from "@/app/components/organisms/tables/article-table/ArticleTable";

const IssuePage = ({params}: {
    params: {
        issueId: number
    }
}) => {

    const {
        handleBackClick, handleArticleCreate,
        issue, articles
    } = useIssuePage(params.issueId)

    return (
        <>
            <div className={"w-full px-[215px] flex flex-col gap-[30px]"}>
                <HeaderBackRow
                    text={issue && issue.title}
                    descr={`${articles?.length} articles`}
                    buttonText={"Create new article"}
                    onBackClick={handleBackClick}
                    onButtonClick={handleArticleCreate}
                />
                {
                    articles && <ArticleTable articles={articles}/>
                }
            </div>
        </>
    );

};

export default IssuePage;
