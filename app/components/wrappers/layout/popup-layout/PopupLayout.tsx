import React from 'react';
import {ClassValue} from "clsx";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {cn} from "@/app/utils/cn";

type PopupLayoutClassValues = {
    wrapper?: string,
    card?: string
}

const PopupLayout = ({children, classNames}: {
    children: React.ReactNode,
    classNames?: PopupLayoutClassValues
}) => {

    const classValues: ClassValue[] = [
        "fixed top-0 left-0 z-30 w-full h-full bg-text-black bg-opacity-50",
        "flex items-center justify-center"
    ]

    return (
        <div className={cn(classValues, classNames?.wrapper)}>
            <CardWrapper className={cn(classNames?.card)}>
                {children}
            </CardWrapper>
        </div>
    );

};

export default PopupLayout;
