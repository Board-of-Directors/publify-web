import React from 'react';
import {FiTrash2} from "react-icons/fi";
import IconDrag from "@/app/components/icons/IconDrag";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";

type DragDeleteButtonRowProps = {
    setActivatorNodeRef ?: ((element: (HTMLElement | null)) => void) | undefined,
    listeners ?: SyntheticListenerMap | undefined,
    attributes ?: DraggableAttributes | undefined,
    onDelete : () => void
}

const DragDeleteButtonRow = (props : DragDeleteButtonRowProps) => {
    return (
        <div className={"flex flex-row items-center gap-3"}>
            <FiTrash2
                size={"20px"}
                type={"red"}
                className={"icon hover:cursor-pointer"}
                onClick={props.onDelete}
            />
            <div
                ref={props.setActivatorNodeRef}
                {...props.listeners}
                {...props.attributes}
            >
                <IconDrag className={"icon hover:cursor-grab active:cursor-grabbing"}/>
            </div>
        </div>
    );
};

export default DragDeleteButtonRow;
