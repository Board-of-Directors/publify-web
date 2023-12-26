import Text from "@/app/components/atoms/text/Text";
import {cn} from "@/app/utils/cn";

export type TextColClassNames = {
    header?: string,
    descr?: string
}

const TextCol = ({header, descr, classNames}: {
    header?: string,
    descr?: string,
    classNames?: TextColClassNames
}) => {
    return (
        <div className={"flex flex-col gap-[12px]"}>
            {
                header && <Text
                    text={header}
                    className={cn(
                        "text-text-black text-[20px]",
                        classNames?.header
                    )}
                />
            }
            {
                descr && <Text
                    text={descr}
                    className={cn(
                        "text-text-gray w-[320px] text-[16px] font-medium",
                        classNames?.descr
                    )}
                />
            }
        </div>
    );
};

export default TextCol;
