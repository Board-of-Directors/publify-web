"use client"

import {useRouter} from "next/navigation";
import Text from "@/app/components/atoms/text/Text";
import {cn} from "@/app/utils/cn";
import {ClassValue} from "clsx";

const AuthNavbar = ({activeTab}: {
    activeTab: "left" | "right"
}) => {

    const router = useRouter();
    const handleSignUp = () => router.push('/sign-up/step-1')
    const handleLogIn = () => router.push('/log-in/step-1')

    const classValueLeft: ClassValue = {
        "text-text-black text-[18px]": activeTab === "left",
        "text-text-gray text-[15px]": activeTab === "right"
    }

    const classValueRight: ClassValue = {
        "text-text-black text-[18px]": activeTab === "right",
        "text-text-gray text-[15px]": activeTab === "left"
    }

    return (
        <div className={"w-full flex flex-row items-center justify-center gap-[6px]"}>
            <Text text={"Sign Up"} className={cn(classValueLeft)} onClick={handleSignUp}/>
            <Text text={"/"} className={"text-text-gray"}/>
            <Text text={"Log in"} className={cn(classValueRight)} onClick={handleLogIn}/>
        </div>
    );
};

export default AuthNavbar;
