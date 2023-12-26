import React, {useState} from "react";
import {FiArrowLeft, FiBold, FiHash, FiItalic, FiUnderline} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import SelectButton, {SelectItem} from "@/app/components/atoms/buttons/select-button/SelectButton";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";
import {Editor} from "@tiptap/react";
import DragDeleteButtonRow from "@/app/components/moleculas/rows/drag-delete-button-row/DragDeleteButtonRow";

export type IconButton = {
    icon: React.ReactNode,
    action: () => void
}

const TextDecoratorRow = ({editor}: { editor: Editor | null }) => {

    const iconCV: ClassValue[] = [
        "text-text-black hover:text-info-blue-default hover:cursor-pointer",
        "w-8 h-8 rounded-md bg-background flex items-center justify-center",
    ]

    const iconButtonData: (IconButton & { name: string })[] = [
        {
            icon: <FiBold size={"16px"}/>,
            action: () => editor?.chain().focus().toggleBold().run(),
            name: "bold"
        },
        {
            icon: <FiUnderline size={"16px"}/>,
            action: () => editor?.chain().focus().toggleUnderline().run(),
            name: "underline"
        },
        {
            icon: <FiItalic size={"16px"}/>,
            action: () => editor?.chain().focus().toggleItalic().run(),
            name: "italic"
        },
        {
            icon: <FiHash size={"16px"}/>,
            action: () => editor?.chain().focus().toggleHighlight().run(),
            name: "highlight"
        },
        {
            icon: <FiArrowLeft size={"16px"}/>,
            action: () => editor?.chain().focus().undo().run(),
            name: "undo"
        }
    ]

    return (
        <div className={"flex flex-row items-center gap-3"}>
            {
                iconButtonData.map((item) => {

                    const isActiveCV: ClassValue = {
                        "text-info-blue-default": editor?.isActive(item.name)
                    }

                    return (
                        <button
                            onClick={item.action}
                            className={cn(iconCV, isActiveCV)}
                        >
                            {item.icon}
                        </button>
                    )

                })
            }
        </div>
    )

}

const ArticleBlockEditRow = ({editor, setActivatorNodeRef, listeners, attributes, onDelete}: {
    editor: Editor | null
    setActivatorNodeRef?: (element: (HTMLElement | null)) => void,
    listeners?: SyntheticListenerMap | undefined,
    attributes?: DraggableAttributes,
    onDelete: () => void
}) => {

    const selectItems: SelectItem[] = [
        {
            name: "Text",
            action: () => editor?.chain().focus().setParagraph().run()
        },
        {
            name: "Heading3",
            action: () => editor?.chain().focus().setHeading({level: 3}).run()
        },
        {
            name: "Heading2",
            action: () => editor?.chain().focus().setHeading({level: 2}).run()
        }
    ]

    const [
        selectedItem,
        setSelected
    ] = useState<SelectItem>(selectItems[0])

    return (
        <div className={"flex flex-row items-center justify-between"}>
            <div className={"flex flex-row items-center gap-7"}>
                <SelectButton
                    selectedItem={selectedItem}
                    onSelect={setSelected}
                    items={selectItems}
                />
                <TextDecoratorRow editor={editor}/>
            </div>
            <DragDeleteButtonRow
                onDelete={onDelete}
                setActivatorNodeRef={setActivatorNodeRef}
                listeners={listeners}
                attributes={attributes}
            />
        </div>
    )
}

export default ArticleBlockEditRow