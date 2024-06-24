import React from 'react';
import {Issue} from "@/app/types/issue";
import Text from "@/app/components/atoms/text/Text";
import {
    TableOfContents
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.get-table-of-contents";

type TableOfContentProps=  {
    issue : Issue,
    tableOfContent : TableOfContents
}

const description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'

const TableOfContent = ({issue, tableOfContent} : TableOfContentProps) => (
    <section className={'col-span-8 rounded-xl bg-white flex flex-row'}>
        <div className={'h-full rounded-l-xl w-[170px] bg-text-black'}/>
        <div className={'py-10 px-8 flex flex-col gap-10'}>
            <div className={'flex flex-col gap-5'}>
                <Text className={'text-[64px] uppercase'} text={issue.title}/>
                <Text className={'text-xs'} text={description}/>
            </div>
            <div className={'flex flex-col gap-6'}>
                {tableOfContent.pages.map((page, index) => (
                    <div className={'w-full flex flex-col gap-4'} key={index}>
                        <Text text={String(page.pageNumber)} className={'text-[48px] text-text-black'}/>
                        <Text text={page.pageTitle} className={'text-[24px] text-text-black'}/>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default TableOfContent;