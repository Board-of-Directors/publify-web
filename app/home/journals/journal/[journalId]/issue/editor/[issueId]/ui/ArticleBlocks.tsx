import React, {useContext} from 'react';
import GridBlock from "@/app/components/wrappers/blocks/grid-block/GridBlock";
import HTMLIssueBlockSider from "@/app/components/organisms/html-issue-block-sider/HTMLIssueBlockSider";
import {useUnit} from "effector-react";
import {$articleBlocks} from "../models/page.model.get-article-items";
import HTMLArticleBlock from "./HTMLArticleBlock";
import {CollaborativeEditingContext} from "@/app/components/providers/CollaborativeEditingProvider";

const ArticleBlocks = ({issueId}: { issueId: number }) => {

    const articleBlocks = useUnit($articleBlocks);
    const {lockedLayouts, userEmail} = useContext(CollaborativeEditingContext);

    const checkShouldShowSidebar = (layoutId: number): boolean => {
        return lockedLayouts.find(item => item.layoutId === layoutId)?.email === userEmail;
    };

    return (
        <>
            {articleBlocks.map((articleBlock, index) => (
                <GridBlock className={"col-span-full"} key={index}>
                    <HTMLArticleBlock articleBlock={articleBlock} issueId={issueId}/>
                    {checkShouldShowSidebar(articleBlock.layout.id)
                        ? <HTMLIssueBlockSider
                            articleLayout={articleBlock.layout}
                            issueId={issueId}
                        /> : null}
                </GridBlock>
            ))}
        </>
    );
};

export default ArticleBlocks;