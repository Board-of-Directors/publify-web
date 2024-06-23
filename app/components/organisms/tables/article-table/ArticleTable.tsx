import React, {useEffect} from 'react';
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
import {useUnit} from "effector-react";
import {
    $linkedIssues,
    getLinkedIssuesEvent
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-linked-issues";
import {useGetIssueId} from "@/app/utils/hooks/useGetIssueId";

type ArticleTableProps = {
    editable?: boolean,
    exclude ?: boolean,
    onArticleClick?: (article: Article) => void,
    className?: string
}

const ArticleTable = ({editable = true, exclude = true, ...props}: ArticleTableProps) => {

    const issueId = useGetIssueId();
    const [chooseIssuePopupOpen, toggleOpenPopup] = useToggle();
    const [linkedIssues, getLinkedIssues] = useUnit([$linkedIssues, getLinkedIssuesEvent]);

    const titles = [
        "Article name", "Text blocks count",
        "Illustrations count"
    ]

    const mainWrapperCV: ClassValue[] = [
        "w-full !p-0 !gap-0",
        props.className
    ]

    useEffect(() => {
        getLinkedIssues({issueId : +issueId, excludeImported : exclude});
    }, []);

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
            <section className={'w-full flex flex-col'}>
                {linkedIssues.map((group, index) => (
                    <>
                        <h2 className={'text-[18px] font-semibold p-5 border-b-2 border-background bg-gray-50'}>{group.groupName}</h2>
                        <div className={'w-full flex flex-col'}>
                            {group.articles.map((article, articleIndex) =>
                                <ArticleTableRow
                                    onClick={props.onArticleClick}
                                    article={article} key={articleIndex}
                                    editable={editable}
                                />
                            )}
                        </div>
                    </>
                ))}
            </section>
        </CardWrapper>
    );

};

export default ArticleTable;
