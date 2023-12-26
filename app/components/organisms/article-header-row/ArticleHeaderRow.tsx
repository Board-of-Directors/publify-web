import React from 'react';
import {useArticleHeaderRow} from "@/app/components/organisms/article-header-row/ArticleHeaderRow.hooks";
import Text from "@/app/components/atoms/text/Text";
import {FiDownload, FiPlus, FiSettings} from "react-icons/fi";
import Button from "@/app/components/atoms/buttons/button/Button";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";

export type ArticleHeaderRowProps = {
    name: string
}

const ArticleHeaderRow = (props: ArticleHeaderRowProps) => {

    const context = useArticleHeaderRow()

    const buttonCV : ClassValue[] = [
        "w-fit border-text-gray border-2",
        "px-[20px] py-[15px] hover:border-white hover:text-white"
    ]

    const mainWrapperCV : ClassValue[] = [
        "w-full mt-[-30px] px-[215px] bg-text-black flex",
        "py-[20px] flex-row items-center justify-between"
    ]

    return (
        <div className={cn(mainWrapperCV)}>
            <Text text={props.name} className={"text-white text-[20px]"}/>
            <div className={"w-fit flex flex-row items-center gap-4"}>
                <FiSettings
                    size={"20px"}
                    type={"blue"}
                    className={"icon"}
                    onClick={context.handleSettingsClick}
                />
                <Button
                    className={cn(buttonCV)}
                    icon={<FiPlus size={"18px"}/>}
                    text={"Save changes"}
                    onClick={context.handleSaveChangesClick}
                />
                <Button
                    className={cn(buttonCV)}
                    icon={<FiDownload size={"18px"}/>}
                    text={"Download as PDF"}
                    onClick={context.handleDownloadPDFClick}
                />
            </div>
        </div>
    );

};

export default ArticleHeaderRow;
