import React from 'react';
import {useUnit} from "effector-react";
import {Issue} from "@/app/types/issue";
import Text from "@/app/components/atoms/text/Text";
import {TableOfContent} from "../models/page.model.get-table-of-content";

type TableOfContentProps=  {
    issue : Issue,
    tableOfContent : TableOfContent
}

const description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'

const TableOfContent = ({issue, tableOfContent} : TableOfContentProps) => (
    <section className={'col-span-8 rounded-xl flex flex-row'}>
        <div className={'h-full w-[170px] bg-text-black'}/>
        <div className={'py-16 px-8 flex flex-col gap-10'}>
            <div className={'flex flex-col gap-5'}>
                <Text className={'text-[80px] uppercase'} text={issue.title}/>
                <Text className={'text-xs'} text={description}/>
            </div>
            <div className={'flex flex-col gap-6'}>
            </div>
        </div>
    </section>
);

export default TableOfContent;