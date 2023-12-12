import React, { useEffect, useRef, useState} from 'react';
import {useSortable} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {cn} from "@/app/utils/cn";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {ClassValue} from "clsx";
import AddBlockButtonRow from "@/app/components/moleculas/rows/add-block-button-row/AddBlockButtonRow";

type DraggableCardWrapperProps = {
    id: number,
    children: React.ReactNode,
    onAddText: () => void,
    onAddIllustration: () => void
}

const DraggableCardWrapper = (props: DraggableCardWrapperProps) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        ...draggable
    } = useSortable(
        {
            id: props.id
        }
    )

    const droppable = useDroppable({id: props.id})
    const cardRef = useRef<HTMLDivElement | undefined>(undefined)
    const [height, setHeight] = useState<number | undefined>(undefined)

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const droppableCV: ClassValue[] = [
        "absolute z-0 top-[88px] h-[345px] w-full rounded-2xl border-2",
        "border-info-blue-default border-dashed bg-info-blue-default bg-opacity-10",
        {"bg-transparent border-none": !draggable.isOver},
    ]

    useEffect(() => {
        setHeight(cardRef?.current?.clientHeight)
    })

    const children = () => React.Children.map(props.children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
            setActivatorNodeRef: setActivatorNodeRef,
            listeners: listeners,
            attributes: attributes
        })
    })

    return (
        <div className={"relative h-fit col-span-full flex flex-col gap-[20px]"}>
            <AddBlockButtonRow {...props}/>
            <CardWrapper
                ref={setNodeRef}
                style={style}
                className={"z-10 col-span-full h-fit flex flex-col gap-[20px]"}
            >
                <div
                    className={"flex flex-col gap-[20px]"}
                    ref={cardRef as any}
                >
                    {children()}
                </div>
            </CardWrapper>
            <div
                style={{height : height}}
                className={cn(droppableCV)}
                ref={droppable.setNodeRef}
            />
        </div>
    )
};

export default DraggableCardWrapper;
