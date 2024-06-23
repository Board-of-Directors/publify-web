import React, {useContext, useEffect} from 'react';
import {Heading} from "@tiptap/extension-heading";
import {Paragraph} from "@tiptap/extension-paragraph";
import {ArticleBlock} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/types/ArticleLayout.types";
import {Client} from "@stomp/stompjs";
import {useStore} from "@/app/store/useStore";
import {useToggle} from "usehooks-ts";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {AnyExtension, EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import {Highlight} from "@tiptap/extension-highlight";
import {BubbleMenu} from "@tiptap/extension-bubble-menu";
import Image from "@tiptap/extension-image";
import {convertFontStylesToAttributes} from "@/app/utils/convertFontStylesToAttributes";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Text from "@/app/components/atoms/text/Text";
import {CollaborativeEditingContext} from "@/app/components/providers/CollaborativeEditingProvider";
import {cn} from "@/app/utils/cn";

const EditableHeading = Heading.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                renderHTML: attributes => {
                    return {
                        class: `${attributes.class}`,
                    }
                },
            },
        }
    },
})

const EditableParagraph = Paragraph.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                renderHTML: attributes => {
                    return {
                        class: `${attributes.class}`,
                    }
                },
            },
        }
    },
})

const extensions: AnyExtension[] = [
    StarterKit,
    EditableHeading,
    EditableParagraph,
    Underline, Highlight, BubbleMenu, Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
            class: "object-fill"
        }
    })
]

const HTMLArticleBlock = ({articleBlock, issueId}: { articleBlock: ArticleBlock, issueId: number }) => {

    const {userEmail, lockedLayouts, client} = useContext(CollaborativeEditingContext);
    const issueConfig = useStore(state => state.config)
    const [heading, paragraph] = articleBlock.layout.fonts;
    const [isLocked, toggleLocked] = useToggle();

    const [issue, getIssue] = useStore(useShallow(
        state => [state.issue, state.getIssue]
    ))

    const {layout} = articleBlock;

    const issueData = [
        {header: "Issue name", text: issue.title},
        {header: "Issue number", text: issue.number.toString()},
        {header: "Release date", text: issue.releaseDate},
    ]

    const getIssueQuery = useQuery({
        queryKey: ["get", "issue", issueId],
        queryFn: () => getIssue(issueId)
    })

    const editor = useEditor({
        extensions: extensions,
        content: articleBlock.content,
        editable: false
    })

    const lockedLayout = lockedLayouts.find(item => item.layoutId === layout.id);
    const isLockedByMe = lockedLayout?.email === userEmail;

    const handleLockLayout = () => {
        const url = isLocked ? 'unlock' : 'lock';

        client?.publish({
            headers: {'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`},
            destination: `/user/${url}/${layout.id}`,
            body: 'Hello world!'
        })

        toggleLocked();
    }

    useEffect(() => {
        editor?.chain()
            .selectAll()
            .updateAttributes('heading', {class: convertFontStylesToAttributes(heading?.fontType)})
            .updateAttributes('heading', {class: convertFontStylesToAttributes(heading?.fontName)})
            .updateAttributes('paragraph', {class: convertFontStylesToAttributes(paragraph?.fontType)})
            .updateAttributes('paragraph', {class: convertFontStylesToAttributes(paragraph?.fontName)})
            .run()
    }, [layout.fonts]);

    if (getIssueQuery.isSuccess) return (
        <section className={'col-span-8 flex flex-col'}>
            {Boolean(lockedLayout) && !isLockedByMe ? <div className={'w-fit rounded-t-xl bg-black p-3 pb-8 -mb-5'}>
                <Text text={lockedLayout?.email} className={'text-xs text-white'}/>
            </div> : null}
            <CardWrapper className={cn({
                'border-2 border-blue-400' : Boolean(lockedLayout) && isLockedByMe,
                'border-2 border-black' : Boolean(lockedLayout) && !isLockedByMe,
            })}>
                <div
                    onClick={handleLockLayout}
                    style={{
                        columnWidth: 600 / layout.columnCount,
                        padding: issueConfig.padding
                    }}
                >
                    {issueConfig.header && <div className={"w-full flex flex-row justify-between"}>
                        {issueData.map((item) => (
                            <div className={"flex flex-col items-center gap-1"}>
                                <Text text={item.header} className={"text-[14px] text-text-gray"}/>
                                <Text text={item.text} className={"text-[16px] text-text-black"}/>
                            </div>
                        ))}
                    </div>}
                    <EditorContent editor={editor}/>
                    {issueConfig.footer && <div className={"w-full flex justify-center items-center"}>
                        <Text className={"text-[16px] text-text-black"} text={`#1 page`}/>
                    </div>}
                </div>
            </CardWrapper>
        </section>
    );
};

export default HTMLArticleBlock;