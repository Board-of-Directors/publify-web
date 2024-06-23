import React from 'react';
import {useArticleHeaderRow} from "@/app/components/organisms/article-header-row/ArticleHeaderRow.hooks";
import Text from "@/app/components/atoms/text/Text";
import {FiDownload, FiPlus, FiSettings} from "react-icons/fi";
import Button from "@/app/components/atoms/buttons/button/Button";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import {usePathname} from "next/navigation";
import {useRole} from "@/app/utils/hooks/useRole";
import Link from "next/link";
import {useUnit} from "effector-react";
import {
    $articleBlocks
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-article-items";

import { jsPDF } from 'jspdf';

export type ArticleHeaderRowProps = {
    name: string
}

const buttonCV: ClassValue[] = [
    "w-fit border-text-gray border-2",
    "px-[20px] py-[15px] hover:border-white hover:text-white"
]

const mainWrapperCV: ClassValue[] = [
    "w-full mt-[-30px] px-[215px] bg-text-black flex",
    "py-[20px] flex-row items-center justify-between"
]

const ArticleHeaderRow = (props: ArticleHeaderRowProps) => {

    const articleBlocks = useUnit($articleBlocks);

    const pathname = usePathname();
    const {isOwner} = useRole();

    const lastIndexOfEditorPrefix = pathname.lastIndexOf('/');
    const lastIndexOfIssuePrefix = pathname.lastIndexOf('issue/');
    const issueId = pathname.substring(lastIndexOfEditorPrefix + 1);

    const prevPathname = pathname.substring(0, lastIndexOfIssuePrefix);
    const editorPathname = prevPathname.concat(`/issue/${issueId}`);

    const context = useArticleHeaderRow()

    const handleDownloadPDF = () => {
        const timestamp = Date.now().toString();
        const preparedPDF = articleBlocks.reduce((acc, fst) => {
            return acc.concat(fst.content).concat('<hr />');
        }, '');

        const doc = new jsPDF();
        doc.html(preparedPDF, {
            callback: (doc) => {
                doc.save(`${props.name}_${timestamp}.pdf`)
            }
        });
    }

    return (
        <div className={cn(mainWrapperCV)}>
            <span className={'flex flex-row items-baseline gap-3'}>
                <Text text={props.name} className={"text-white text-[20px]"}/>
                {isOwner ? (
                    <Link
                        className={'text-white text-opacity-50 hover:text-opacity-100'}
                        href={editorPathname}
                    >
                        Switch to Content mode
                    </Link>
                ) : null}
            </span>
            <div className={"w-fit flex flex-row items-center gap-4"}>
                <FiSettings
                    size={"20px"}
                    type={"blue"}
                    className={"icon"}
                    onClick={context.handleSettingsClick}
                />
                <Button
                    className={cn(buttonCV)}
                    icon={<FiDownload size={"18px"}/>}
                    text={"Download as PDF"}
                    onClick={handleDownloadPDF}
                />
            </div>
        </div>
    );

};

export default ArticleHeaderRow;
