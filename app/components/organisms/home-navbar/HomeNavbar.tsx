"use client"

import React from 'react';
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Logo from "@/app/components/svg/logo/Logo";
import {FiLogOut} from "react-icons/fi";
import HomeNavbarTab from "@/app/components/moleculas/home-navbar-tab/HomeNavbarTab";

const NavbarTabList = () => {

    const router = useRouter()
    const pathName = usePathname()

    const handleTabClick = (route: string) => {
        if (!pathName.includes(route)) {
            router.push(`/home/${route}`)
        }
    }

    return (
        <div className={"flex flex-row gap-[30px]"}>
            <HomeNavbarTab
                text={"Journals"}
                isActive={pathName.includes("journals")}
                onClick={() => handleTabClick("journals")}
            />
            <HomeNavbarTab
                text={"Profile"}
                isActive={pathName.includes("profile")}
                onClick={() => handleTabClick("profile")}
            />
        </div>
    )
}

const HomeNavbar = () => {

    const router: AppRouterInstance = useRouter()

    return (
        <div className={"w-full bg-white px-[215px]"}>
            <div className={"flex flex-row items-center justify-between"}>
                <Logo className={"h-[31px]"}/>
                <NavbarTabList/>
                <HomeNavbarTab
                    text={"Logout"}
                    icon={<FiLogOut size={"18px"}/>}
                    onClick={() => router.push("/")}
                    className={"hover:text-info-red"}
                />
            </div>
        </div>
    );
};

export default HomeNavbar;
