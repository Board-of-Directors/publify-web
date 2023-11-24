import React from 'react';
import HeaderRow from "@/app/components/moleculas/rows/header-row/HeaderRow";

type HeaderBlockProps = {
    header: string,
    children: React.ReactNode
    descr?: string,
    className?: string,
}

const HeaderBlock = ({header, descr, className, children}: HeaderBlockProps) => {
    return (
        <div className={"col-span-full flex flex-col gap-[30px]"}>
            <HeaderRow header={header} descr={descr}/>
            <div className={className}>
                {children}
            </div>
        </div>
    )
};

export default HeaderBlock;
