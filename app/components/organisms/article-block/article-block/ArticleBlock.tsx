import React from 'react';
import {ClassValue} from "clsx";
import Button from "@/app/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {cn} from "@/app/utils/cn";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import TextArea from "@/app/components/atoms/inputs/TextArea";
import ArticleBlockEditRow from "@/app/components/organisms/article-block/article-block-edit-row/ArticleBlockEditRow";

const ButtonRow = () => {

    const buttonCV: ClassValue[] = [
        "border-dashed text-text-gray border-2 border-border-gray bg-transparent",
        "hover:border-info-blue-default hover:text-info-blue-default",
        "transition hover:duration-200"
    ]

    return (
        <div className={"h-fit col-span-full flex flex-row gap-[20px] items-center"}>
            <Button
                onClick={() => console.log("ADD TEXT BLOCK")}
                icon={<FiPlus size={"18px"}/>}
                text={"Add text block"}
                className={cn(buttonCV)}
            />
            <Button
                onClick={() => console.log("ADD ILLUSTRATION BLOCK")}
                icon={<FiPlus size={"18px"}/>}
                text={"Add illustration block"}
                className={cn(buttonCV)}
            />
        </div>
    )
}

const ArticleBlock = () => {
    return (
        <div className={"h-fit col-span-full flex flex-col gap-[20px]"}>
            <ButtonRow/>
            <CardWrapper className={"col-span-full h-fit flex flex-col gap-[20px]"}>
                <ArticleBlockEditRow/>
                <TextArea/>
            </CardWrapper>
        </div>
    )
};

export default ArticleBlock;
