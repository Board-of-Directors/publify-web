import React from 'react';
import Text from "@/app/components/atoms/text/Text";

const ArticleTableHeader = ({titles}: {
    titles: string[]
}) => {
    return (
        <div className={"w-full p-5 flex flex-row items-baseline gap-[60px] border-b-2 border-background"}>
            {
                titles.map((item) => (
                    <Text
                        text={item}
                        className={"w-[180px] text-[16px] text-text-gray"}
                    />
                ))
            }
        </div>
    )
}

export default ArticleTableHeader;
