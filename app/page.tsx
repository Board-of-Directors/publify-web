"use client"

import CenterLayout from "@/app/components/wrappers/layout/center-layout/CenterLayout";
import LogoWithCaption from "@/app/components/svg/logo/LogoWithCaption";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import Button from "@/app/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";

const MainPage = () => {

    const router = useRouter()

    const handleSignUp = () => router.push("/sign-up")
    const handleLogIn = () => router.push("/log-in")

    return (
        <CenterLayout axis={"y"} className={"mt-[240px]"}>
            <div className={"flex flex-col gap-8"}>
                <LogoWithCaption className={"h-11"}/>
                <CardWrapper className={"w-[370px]"}>
                    <Button onClick={handleSignUp} text={"Sign Up"} />
                    <Button onClick={handleLogIn} text={"Log In"} />
                </CardWrapper>
            </div>
        </CenterLayout>
    )
}

export default MainPage
