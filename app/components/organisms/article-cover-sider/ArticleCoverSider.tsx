import React from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Text from "@/app/components/atoms/text/Text";
import FileInput from "@/app/components/atoms/inputs/FileInput";
import {useArticleCoverSider} from "@/app/components/organisms/article-cover-sider/ArticleCoverSider.hooks";

const ArticleCoverSider = () => {

    const context = useArticleCoverSider()

    return (
        <CardWrapper className={"col-span-4 h-fit"}>
            <Text
                text={"Journal cover"}
                className={"text-[20px] text-text-black"}
            />
            <FileInput
                value={context.file}
                onChange={context.handleChangeFile}
                onClear={context.handeClearClick}
            />
        </CardWrapper>
    );
};

export default ArticleCoverSider;
