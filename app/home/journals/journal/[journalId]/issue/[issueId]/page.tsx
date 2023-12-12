"use client"

import React from 'react';
import HeaderBackRow from "@/app/components/organisms/header-back-row/HeaderBackRow";
import {useIssuePage} from "@/app/home/journals/journal/[journalId]/issue/[issueId]/page.hooks";
import ArticleTable from "@/app/components/organisms/tables/article-table/ArticleTable";
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";

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
                    header={issue && issue.title}
                    onBackClick={handleBackClick}
                    leftContent={
                        <Text
                            text={`${articles?.length} articles`}
                            className={"text-[16px] text-text-gray"}
                        />
                    }
                >
                    <Button
                        icon={<FiPlus size={"18px"}/>}
                        className={"col-start-10 col-span-full"}
                        text={"Create article"}
                        onClick={handleArticleCreate}
                    />
                </HeaderBackRow>
                {
                    articles && <ArticleTable articles={articles}/>
                }
            </div>
        </>
    );

};

export default IssuePage;
