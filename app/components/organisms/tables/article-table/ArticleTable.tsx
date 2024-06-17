import React from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import ArticleTableHeader
    from "@/app/components/organisms/tables/article-table/article-table-header/ArticleTableHeader";
import ArticleTableRow from "@/app/components/organisms/tables/article-table/article-table-row/ArticleTableRow";
import {Article} from "@/app/types/article";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import TextButton from "@/app/components/atoms/buttons/text-button/TextButton";
import {FiPlus} from "react-icons/fi";
import {useToggle} from "usehooks-ts";
import {createPortal} from "react-dom";
import ChooseIssuePopup from "@/app/components/organisms/popups/choose-issue-popup/ChooseIssuePopup";

type ArticleTableProps = {
    articles: Article[] | undefined,
    editable?: boolean,
    onArticleClick?: (article: Article) => void,
    className?: string
}

const ArticleTable = ({editable = true, ...props}: ArticleTableProps) => {

    const [chooseIssuePopupOpen, toggleOpenPopup] = useToggle();

    const titles = [
        "Article name", "Text blocks count",
        "Illustrations count"
    ]

    const mainWrapperCV: ClassValue[] = [
        "w-full !p-0 !gap-0",
        props.className
    ]

    return (
        <CardWrapper className={cn(mainWrapperCV)}>
            {chooseIssuePopupOpen ? createPortal(<ChooseIssuePopup onClose={toggleOpenPopup}/>, document.body) : null}
            <span className={'p-5 w-full flex flex-row items-center justify-between'}>
                <h2 className={'text-lg text-text-black font-semibold'}>Choose the article</h2>
                <TextButton
                    className={'gap-2 w-fit'}
                    text={'Import from other issues'}
                    icon={<FiPlus size={'18px'}/>}
                    onClick={toggleOpenPopup}
                />
            </span>
            <ArticleTableHeader titles={titles}/>
            {props.articles && props.articles.map((article) =>
                <ArticleTableRow
                    editable={editable}
                    onClick={props.onArticleClick}
                    article={article}
                />
            )}
        </CardWrapper>
    );

};

export default ArticleTable;
