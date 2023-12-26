import Image from "next/image";
import Button from "@/app/components/atoms/buttons/button/Button";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import React from "react";
import {cn} from "@/app/utils/cn";
import TextCol, {TextColClassNames} from "@/app/components/moleculas/cols/text-col/TextCol";

type InfoCardClassNames = {
    image?: string,
    wrapper?: string,
    textColClassNames? : TextColClassNames
}

type InfoCardProps = {
    image: string,
    buttonText: string,
    header?: string,
    descr?: string,
    onClick: () => void,
    classNames?: InfoCardClassNames,
}
const InfoCard = ({image, buttonText, header, descr, onClick, classNames}: InfoCardProps) => {
    return (
        <CardWrapper className={cn("w-[660px]", classNames?.wrapper)}>
            <div className={"w-full flex flex-row gap-[40px] items-center"}>
                <Image
                    className={classNames?.image}
                    width={180}
                    height={230}
                    quality={100}
                    src={image}
                    alt={'/'}/>
                <div className={"flex flex-col gap-[30px]"}>
                    <TextCol
                        classNames={classNames?.textColClassNames}
                        header={header}
                        descr={descr}
                    />
                    <Button
                        className={"w-[255px]"}
                        text={buttonText}
                        onClick={onClick}
                    />
                </div>
            </div>
        </CardWrapper>
    );
};

export default InfoCard;
