import React from 'react';
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import {cn} from "@/app/utils/cn";
import {ClassValue} from "clsx";
import Text from "@/app/components/atoms/text/Text";
import Image from "next/image";
import {FiSettings, FiTrash2} from "react-icons/fi";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Issue} from "@/app/types/issue";
import {jwtDecode} from "jwt-decode";

import DefaultImage from '@/public/default-image.png';

type IssueCardV2Props = {
    issue: Issue,
    onDelete?: (issueId: number) => void,
    onClick?: () => void,
    isInteractive?: boolean,
    className?: string
}

const IssueCardV2 = ({issue, className, onDelete, onClick, isInteractive = true}: IssueCardV2Props) => {

    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const handleButtonClick = () => {
        if (onClick) return;

        const jwt = jwtDecode(localStorage.getItem('ACCESS_TOKEN')!!) as any;
        if (jwt.role !== 'EDITOR') {
            router.push(pathName.concat(`/issue/${issue.id}`))
        } else {
            router.push(pathName.concat(`/editor/issue/${issue.id}`));
        }
    }

    const handleDeleteIssue = (event: PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete?.(issue.id);
    }

    const classValues: ClassValue[] = [
        "col-span-3 p-5", className
    ]

    return (
        <CardWrapper onClick={onClick} className={cn(classValues)}>
            <Text
                text={issue.title}
                className={"text-[18px] text-text-black pb-5 border-b-2 border-background"}
            />
            <Image
                onClick={handleButtonClick}
                className={"hover:cursor-pointer w-full h-[300px] object-fill"}
                src={issue.cover ? `data:image/jpeg;base64,${issue.cover}` : DefaultImage.src}
                width={100} height={100}
                alt={'/'} quality={100}
            />
            <div className={"flex flex-row items-center justify-between"}>
                <Text
                    text={`#${issue.number}`}
                    className={"text-[18px] text-text-black"}
                />
                <Text
                    text={issue.releaseDate}
                    className={"text-[18px] text-text-black"}
                />
                {isInteractive ? <div className={"flex flex-row gap-[15px] items-center"}>
                    <FiSettings
                        size={"20px"}
                        className={"stroke-text-gray hover:cursor-pointer hover:stroke-info-blue-default"}
                        onClick={() => console.log("Settings Clicked")}
                    />
                    <FiTrash2
                        size={"20px"}
                        className={"text-text-gray hover:cursor-pointer hover:stroke-info-red"}
                        onClick={handleDeleteIssue}
                    />
                </div> : null}
            </div>
        </CardWrapper>
    );
};

export default IssueCardV2;
