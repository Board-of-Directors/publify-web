import React from 'react';
import HeaderRow, {HeaderRowClassNames} from "@/app/components/moleculas/rows/header-row/HeaderRow";

type HeaderBlockProps = {
    header: string,
    children: React.ReactNode
    content?: React.ReactNode,
    className?: string,
    classNames?: HeaderRowClassNames
}

const HeaderBlock = ({header, content, className, classNames, children}: HeaderBlockProps) => {
    return (
        <div className={"col-span-full flex flex-col gap-[30px]"}>
            <HeaderRow
                header={header}
                classNames={classNames}
            >
                {content}
            </HeaderRow>
            <div className={className}>
                {children}
            </div>
        </div>
    )
};

export default HeaderBlock;
