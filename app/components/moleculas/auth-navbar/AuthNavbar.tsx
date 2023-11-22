"use client"

import {usePathname, useRouter} from "next/navigation";
import Text from "@/app/components/atoms/text/Text";
import {cn} from "@/app/utils/cn";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ClassValue} from "clsx";

const NavbarTab = ({text, condition, onClick}: {
    text: string,
    condition: boolean
    onClick: () => void
}) => {

    const classValue: ClassValue = {
        "text-text-black text-[18px]": condition
    }

    return (
        <Text
            text={text}
            className={cn("text-text-gray text-[15px] hover:cursor-pointer", classValue)}
            onClick={onClick}
        />
    )

}

const AuthNavbar = () => {

    const pathName: string = usePathname()
    const router: AppRouterInstance = useRouter()

    const handleSignUp = () => router.push('/sign-up/step-1')
    const handleLogIn = () => router.push('/log-in/step-1')

    return (
        <div className={"w-full flex flex-row items-center justify-center gap-[6px]"}>
            <NavbarTab
                text={"Sign Up"}
                condition={pathName.includes("sign-up")}
                onClick={handleSignUp}
            />
            <Text text={"/"} className={"text-text-gray"}/>
            <NavbarTab
                text={"Log in"}
                condition={pathName.includes("log-in")}
                onClick={handleLogIn}
            />
        </div>
    );
};

export default AuthNavbar;
