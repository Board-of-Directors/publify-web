import React from 'react';
import {FiArrowLeft, FiPlus} from "react-icons/fi";
import Text from "@/app/components/atoms/text/Text";
import Button from "@/app/components/atoms/buttons/button/Button";

const HeaderBackRow = ({text, descr, buttonText, onBackClick, onButtonClick}: {
    text: string | undefined,
    descr : string,
    buttonText: string,
    onBackClick: () => void,
    onButtonClick: () => void
}) => {
    return (
        <div className={"w-full grid grid-cols-12 gap-[30px]"}>

            <div className={"col-span-9 flex flex-row items-center gap-[20px]"}>

                <FiArrowLeft
                    size={"20px"}
                    className={"stroke-text-gray hover:cursor-pointer"}
                    onClick={onBackClick}
                />

                <div className={"flex flex-row items-baseline gap-[20px]"}>
                    <Text
                        text={text}
                        className={"text-[20px] text-text-black"}
                    />
                    <Text
                        text={descr}
                        className={"text-text-gray text-[16px]"}
                    />
                </div>

            </div>

            <Button
                text={buttonText}
                onClick={onButtonClick}
                className={"col-span-3"}
                icon={<FiPlus size={"18px"}/>}
            />

        </div>
    )
}


export default HeaderBackRow;
