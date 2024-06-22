import React from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Text from "@/app/components/atoms/text/Text";
import {FiTrash2} from "react-icons/fi";
import ModernTemplateIcon from "@/app/components/svg/templates/ModernTemplateIcon";
import GothicTemplateIcon from "@/app/components/svg/templates/GothicTemplateIcon";
import ClassicTemplateIcon from "@/app/components/svg/templates/ClassicTemplateIcon";
import PictureFirstBigIcon from "@/app/components/svg/pictures/PictureFirstBigIcon";
import PictureFullPageIcon from "@/app/components/svg/pictures/PictureFullPageIcon";
import PictureColumnIcon from "@/app/components/svg/pictures/PictureColumnIcon";
import SelectButton from "@/app/components/atoms/buttons/select-button/SelectButton";
import {useHTMLIssueBlockSider} from "@/app/components/organisms/html-issue-block-sider/HTMLIssueBlockSider.hooks";
import SelectInput from "@/app/components/atoms/inputs/SelectInput";
import {ArticleLayout} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/types/ArticleLayout.types";
import {cn} from "@/app/utils/cn";
import {useUnit} from "effector-react";
import {
    changeArticleBlockEvent
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.change-article-block";
import {
    deleteArticleLayoutEvent
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/models/page.model.delete-issue-layout";

type HTMLIssueBlockSiderProps = {
    articleLayout: ArticleLayout,
    issueId : number
}

const textControls = {
    font: [{name: "Sans"}, {name: "Serif"}, {name : "Mono"}, {name: "Default"}],
    style: [{name: "Bold"}, {name: "Italic"}, {name : "None"}]
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

const HTMLIssueBlockSider = ({articleLayout, issueId}: HTMLIssueBlockSiderProps) => {

    const context = useHTMLIssueBlockSider()
    const [changeArticleBlock, deleteArticleLayout] = useUnit([changeArticleBlockEvent, deleteArticleLayoutEvent]);

    const [heading, paragraph] = [articleLayout.fonts[0], articleLayout.fonts[3]];

    const headingSelect = {
        itemType : {id: heading.id, name : heading.fontType},
        itemName : {id: heading.id, name : heading.fontName}
    };

    const paragraphSelect = {
        itemType : {id: paragraph.id, name : paragraph.fontType},
        itemName : {id: paragraph.id, name : paragraph.fontName}
    };

    const blockTemplates = [
        {icon: <ModernTemplateIcon type={"blue"} className={"icon w-full"}/>, id: 'MODERN'},
        {icon: <GothicTemplateIcon type={"blue"} className={"icon w-full"}/>, id: 'GOTHIC'},
        {icon: <ClassicTemplateIcon type={"blue"} className={"icon w-full"}/>, id: 'CLASSIC'},
    ]

    const pictureTemplates = [
        {icon: <PictureFirstBigIcon type={"blue"} className={"icon w-full"}/>, id: 'FIRST_BIG'},
        {icon: <PictureFullPageIcon type={"blue"} className={"icon w-full"}/>, id: 'FULL_PAGE'},
        {icon: <PictureColumnIcon type={"blue"} className={"icon w-full"}/>, id: 'COLUMN'},
    ]

    const handleChangeTemplateType = (newType : string) => {
        changeArticleBlock({
            issueId : issueId,
            articleBlock : {
                ...articleLayout,
                templateType : newType
            }
        })
    }

    const handleChangePicturePositions = (newPosition : string) => {
        changeArticleBlock({
            issueId : issueId,
            articleBlock : {
                ...articleLayout,
                picturePosition : newPosition
            }
        })
    }

    const handleChangeColumns = (newColumns : number) => {
        changeArticleBlock({
            issueId : issueId,
            articleBlock : {
                ...articleLayout,
                columnCount : newColumns
            }
        })
    }

    const handleChangeHeading = (mode : string, fontName ?: string, fontType ?: string) => {
        const indexToChange = mode === 'heading' ? 0 : 3

        changeArticleBlock({
            issueId : issueId,
            articleBlock : {
                ...articleLayout,
                fonts : [{
                    ...articleLayout.fonts[indexToChange],
                    fontName : fontName,
                    fontType : fontType
                }]
            }
        })
    }

    const handleDeleteArticleLayout = () => {
        deleteArticleLayout({issueId : issueId, issueLayoutId : articleLayout.id})
    }

    return (
        <CardWrapper className={"col-span-4 h-fit"}>

            <div className={"w-full flex flex-row pb-5 border-b border-border-gray items-center justify-between"}>
                <Text text={articleLayout.title} className={"text-[20px] text-text-black"}/>
                <FiTrash2
                    size={"20px"}
                    type={"red"}
                    className={"icon"}
                    onClick={handleDeleteArticleLayout}
                />
            </div>

            <HeaderBlock header={"Templates"}>
                <div className={"flex flex-row items-center gap-3"}>
                    {blockTemplates.map((item) => (
                        <div
                            onClick={() => handleChangeTemplateType(item.id)}
                            className={cn({'bg-orange-500' : item.id === articleLayout.templateType})}
                        >
                            {item.icon}
                        </div>
                    ))}
                </div>
            </HeaderBlock>

            <HeaderBlock header={"Picture positions"}>
                <div className={"flex flex-row items-center gap-3"}>
                    {pictureTemplates.map((item) => (
                        <div
                            onClick={() => handleChangePicturePositions(item.id)}
                            className={cn({'bg-orange-500' : item.id === articleLayout.picturePosition})}
                        >
                            {item.icon}
                        </div>
                    ))}
                </div>
            </HeaderBlock>

            <HeaderBlock header={"Columns"}>
                <SelectButton
                    selectedItem={{name : String(articleLayout.columnCount)}}
                    onSelect={(item) => handleChangeColumns(Number(item.name))}
                    items={context.selectItems}
                />
            </HeaderBlock>

            <HeaderBlock header={'Heading'}>
                <div className={"w-full flex flex-row items-center gap-[10px]"}>
                    <SelectInput
                        className={"w-full"}
                        value={headingSelect.itemName.name as string}
                        options={textControls.font.map(item => item.name)}
                        onChange={(newName) => handleChangeHeading('heading', newName)}
                    />
                    <SelectInput
                        className={"w-full"}
                        value={headingSelect.itemType.name as string}
                        options={textControls.style.map(item => item.name)}
                        onChange={(newType) => handleChangeHeading('heading', undefined, newType)}
                    />
                </div>
            </HeaderBlock>

            <HeaderBlock header={'Paragraph'}>
                <div className={"w-full flex flex-row items-center gap-[10px]"}>
                    <SelectInput
                        className={"w-full"}
                        value={paragraphSelect.itemName.name as string}
                        options={textControls.font.map(item => item.name)}
                        onChange={(newName) => handleChangeHeading('paragraph', newName)}
                    />
                    <SelectInput
                        className={"w-full"}
                        value={paragraphSelect.itemType.name as string}
                        options={textControls.style.map(item => item.name)}
                        onChange={(newType) => handleChangeHeading('paragraph', undefined, newType)}
                    />
                </div>
            </HeaderBlock>

        </CardWrapper>
    );
};

export default HTMLIssueBlockSider;
