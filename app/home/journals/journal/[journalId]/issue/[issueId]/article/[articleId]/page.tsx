"use client"

import React from 'react';
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiSettings, FiTrash2} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import ArticleStructureSidebar
    from "@/app/components/organisms/sidebars/article-structure-sidebar/ArticleStructureSidebar";
import ArticleBlock from "@/app/components/organisms/article-block/article-block/ArticleBlock";

const ArticleHeaderRow = () => {
    return (
        <HeaderRow
            header={"How to fix the plane?"}
            leftContent={
                <div className={"flex flex-row gap-4 items-baseline"}>
                    <Text text={"3 text blocks"} className={"hint"}/>
                    <Text text={"5 illustration blocks"} className={"hint"}/>
                </div>
            }
        >
            <div className={"flex flex-row items-center gap-5"}>
                <FiSettings type={"blue"} size={"20px"} className={"icon"}/>
                <FiTrash2 type={"red"} size={"20px"} className={"icon"}/>
                <Button className={"w-[220px]"} text={"Save changes"}/>
            </div>
        </HeaderRow>
    )
}

const ArticlePage = ({params}: {
    params: { articleId: number }
}) => {
    return (
        <>
            <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>
                <ArticleHeaderRow/>
                <GridBlock>
                    <ArticleStructureSidebar/>
                    <GridBlock className={"col-span-9 grid grid-cols-9"}>
                        <ArticleBlock/>
                        <ArticleBlock/>
                        <ArticleBlock/>
                    </GridBlock>
                </GridBlock>
            </div>
        </>
    );
};

export default ArticlePage;
