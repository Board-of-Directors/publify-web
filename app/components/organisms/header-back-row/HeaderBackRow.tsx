import React from 'react';
import {FiArrowLeft} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";

const HeaderBackRow = ({header, leftContent, children, onBackClick}: {
    header: string | undefined,
    leftContent : React.ReactNode,
    children : React.ReactNode,
    onBackClick: () => void,
}) => {
    return (
        <div className={"w-full grid grid-cols-12 gap-[30px]"}>

            <div className={"col-span-8 flex flex-row items-center gap-[20px]"}>

                <FiArrowLeft
                    size={"20px"}
                    className={"stroke-text-gray hover:cursor-pointer"}
                    onClick={onBackClick}
                />

                <div className={"flex flex-row items-center gap-[20px]"}>
                    <Text
                        text={header}
                        className={"text-[20px] text-text-black"}
                    />
                    {leftContent}
                </div>

            </div>

            {children}

        </div>
    )
}


export default HeaderBackRow;
