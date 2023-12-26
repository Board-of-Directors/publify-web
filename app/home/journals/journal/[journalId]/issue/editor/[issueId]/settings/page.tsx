"use client"

import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import CheckboxRow from "@/app/components/moleculas/rows/checkbox-row/CheckboxRow";
import {
    useEditorSettingsPage
} from "@/app/home/journals/journal/[journalId]/issue/editor/[issueId]/settings/page.hooks";
import Text from "@/app/components/atoms/text/Text";
import {ClassValue} from "clsx";
import {cn} from "@/app/utils/cn";
import SelectButton from "@/app/components/atoms/buttons/select-button/SelectButton";
import Button from "@/app/components/atoms/buttons/button/Button";

const EditorIssueSettingsPage = ({params}: {
    params: {
        issueId: number
    }
}) => {

    const context = useEditorSettingsPage(params.issueId)

    if (context.getIssueQuery.isLoading) {
        return (
            <div>
                Page is loading..
            </div>
        )
    }

    const rowWrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center pb-5 border-b-2",
        "border-background justify-between"
    ]

    if (context.getIssueQuery.isSuccess) return (

        <div className={"w-full px-[215px] flex mb-[30px] flex-col gap-[30px]"}>

        <CardWrapper>

            <div className={cn(rowWrapperCV)}>
                <CheckboxRow
                    text={"Headers"}
                    isSelected={context.headersFLag}
                    setSelected={context.setHeaderFlag}
                />
                <div className={"flex flex-row gap-[100px]"}>
                    {
                        context.issueData.map((item) => (
                            <div className={"flex flex-col gap-1"}>
                                <Text text={item.header} className={"text-[14px] text-text-gray"}/>
                                <Text text={item.text} className={"text-[16px] text-text-black"}/>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={cn(rowWrapperCV)}>
                <CheckboxRow
                    text={"Footers"}
                    isSelected={context.footersFlag}
                    setSelected={context.setFootersFlag}
                />
                <div className={"flex flex-col gap-1"}>
                    <Text text={"Page counter"} className={"text-[14px] text-text-gray"}/>
                    <Text text={"Auto"} className={"text-[16px] text-text-black"}/>
                </div>
            </div>

            <div className={cn(rowWrapperCV)}>
                <div className={"flex flex-col gap-3"}>
                    <Text text={"Page side margins"} className={"text-[18px] text-text-gray"}/>
                    <SelectButton
                        selectedItem={context.activeMarginItem}
                        onSelect={context.setActiveMarginItem}
                        items={context.marginSelectItems}
                    />
                </div>
            </div>

            <Button
                text={"Save changes"}
                onClick={context.handleSaveChanges}
                className={"w-[300px]"}
            />

        </CardWrapper>

        </div>
    );
};

export default EditorIssueSettingsPage;
