import React from 'react';
import {ClassValue} from "clsx";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {mockArticleCreationStructure} from "@/app/mock/mockArticleCreationData";
import {cn} from "@/app/utils/cn";
import {FiFile, FiImage} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";

const ArticleStructureSidebar = () => {

    const defaultTextCV: ClassValue = "text-text-gray hover:text-text-black" +
        " transition hover:duration-150 hover:cursor-pointer"
    const h2CV: ClassValue = "text-[18px] truncate font-semibold"
    const h3CV: ClassValue = "text-[15px] truncate font-medium"

    const iconTextRowCV: ClassValue = [
        "flex flex-row gap-2 items-center text-text-gray",
        "hover:text-text-black"
    ]

    return (
        <CardWrapper className={"col-span-3 h-fit sticky top-[110px] flex flex-col gap-8"}>
            {
                mockArticleCreationStructure.map((h2Block) => (
                    <div className={"flex flex-col gap-5"}>
                        <Text text={h2Block.name} className={cn(defaultTextCV, h2CV)}/>
                        {
                            h2Block.content.map((h3Block) => (
                                <div className={"flex flex-col gap-4"}>
                                    <Text text={h3Block.name} className={cn(defaultTextCV, h3CV)}/>
                                    {
                                        h3Block.content.map((item) => (
                                            <div className={cn(iconTextRowCV)}>
                                                {
                                                    item.name.includes("Иллюстрация")
                                                        ? <FiImage size={"16px"}/>
                                                        : <FiFile size={"16px"}/>
                                                }
                                                <Text text={item.name} className={cn(defaultTextCV, h3CV)}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </CardWrapper>
    )
};

export default ArticleStructureSidebar;
