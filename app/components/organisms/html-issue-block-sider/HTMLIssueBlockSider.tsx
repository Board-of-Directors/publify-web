import React, {useState} from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Text from "@/app/components/atoms/text/Text";
import {FiTrash2} from "react-icons/fi";
import ModernTemplateIcon from "@/app/components/svg/templates/ModernTemplateIcon";
import GothicTemplateIcon from "@/app/components/svg/templates/GothicTemplateIcon";
import ClassicTemplateIcon from "@/app/components/svg/templates/ClassicTemplateIcon";
import PictureFirstBigIcon from "@/app/components/svg/pictures/PictureFirstBigIcon";
import PictureFullPageIcon from "@/app/components/svg/pictures/PictureFullPageIcon";
import PictureColumnIcon from "@/app/components/svg/pictures/PictureColumnIcon";
import SelectButton, {SelectItem} from "@/app/components/atoms/buttons/select-button/SelectButton";
import {IssueBlock} from "@/app/types/IssueBlock";
import {useHTMLIssueBlockSider} from "@/app/components/organisms/html-issue-block-sider/HTMLIssueBlockSider.hooks";
import SelectInput from "@/app/components/atoms/inputs/SelectInput";

type HTMLIssueBlockSider = {
    issueBlock: IssueBlock
}

const HeaderBlock = ({header, children}: {
    header: string,
    children: React.ReactNode
}) => {
    return (
        <div className={"w-full flex flex-col pb-5 border-b border-border-gray gap-4"}>
            <Text text={header} className={"text-[18px] text-text-black"}/>
            {children}
        </div>
    )
}

const HTMLIssueBlockSider = (props: HTMLIssueBlockSider) => {

    const context = useHTMLIssueBlockSider()

    const blockTemplates = [
        {icon: <ModernTemplateIcon type={"blue"} className={"icon w-full"}/>, id: 1},
        {icon: <GothicTemplateIcon type={"blue"} className={"icon w-full"}/>, id: 2},
        {icon: <ClassicTemplateIcon type={"blue"} className={"icon w-full"}/>, id: 3},
    ]

    const pictureTemplates = [
        {icon: <PictureFirstBigIcon type={"blue"} className={"icon w-full"}/>, id: 1},
        {icon: <PictureFullPageIcon type={"blue"} className={"icon w-full"}/>, id: 2},
        {icon: <PictureColumnIcon type={"blue"} className={"icon w-full"}/>, id: 3},
    ]

    return (
        <CardWrapper className={"col-span-4 h-fit"}>

            <div className={"w-full flex flex-row pb-5 border-b border-border-gray items-center justify-between"}>
                <Text text={props.issueBlock.name} className={"text-[20px] text-text-black"}/>
                <FiTrash2
                    size={"20px"}
                    type={"red"}
                    className={"icon"}
                    onClick={() => context.handleDeleteIssueBlock(props.issueBlock.id)}
                />
            </div>

            <HeaderBlock header={"Templates"}>
                <div className={"flex flex-row items-center gap-3"}>
                    {
                        blockTemplates.map((item) => (
                            <div onClick={() => context.handleSelectBlockTemplate(item.id)}>
                                {item.icon}
                            </div>
                        ))
                    }
                </div>
            </HeaderBlock>

            <HeaderBlock header={"Picture positions"}>
                <div className={"flex flex-row items-center gap-3"}>
                    {
                        pictureTemplates.map((item) => (
                            <div onClick={() => context.handleSelectPictureTemplate(item.id)}>
                                {item.icon}
                            </div>
                        ))
                    }
                </div>
            </HeaderBlock>

            <HeaderBlock header={"Columns"}>
                <SelectButton
                    selectedItem={context.selectedItem}
                    onSelect={(item) => context.handleSelectItem(props.issueBlock.id, item)}
                    items={context.selectItems}
                />
            </HeaderBlock>

            {
                context.textBlocks.map((textBlock, index) => (
                    <HeaderBlock header={textBlock.header}>
                        <div className={"w-full flex flex-row items-center gap-[10px]"}>
                            <SelectInput
                                className={"w-full"}
                                value={context.font.at(index)!!.name}
                                options={textBlock.controls.font.map(item => item.name)}
                                onChange={(newStyle : string) => {
                                    context.handleChangeFont(
                                        props.issueBlock.id,
                                        index, textBlock.header,
                                        newStyle
                                    )
                                }}
                            />
                            <SelectInput
                                className={"w-full"}
                                value={context.style.at(index)!!.name}
                                options={textBlock.controls.style.map(item => item.name)}
                                onChange={(newStyle : string) => {
                                    context.handleChangeStyle(
                                        props.issueBlock.id,
                                        index, textBlock.header,
                                        newStyle
                                    )
                                }}
                            />
                        </div>
                    </HeaderBlock>
                ))
            }

        </CardWrapper>
    );
};

export default HTMLIssueBlockSider;
