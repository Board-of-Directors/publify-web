"use client"

import React from 'react';
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Logo from "@/app/components/svg/logo/Logo";
import {FiLogOut} from "react-icons/fi";
import HomeNavbarTab from "@/app/components/moleculas/home-navbar-tab/HomeNavbarTab";
import {useRole} from "@/app/utils/hooks/useRole";

const NavbarTabList = () => {

    const {isOwner} = useRole();
    const router = useRouter()
    const pathName = usePathname()

    const handleTabClick = (route: string) => router.push(`/home/${route}`)

    return (
        <div className={"flex flex-row gap-[30px]"}>
            <HomeNavbarTab
                text={"Journals"}
                isActive={pathName.includes("journals")}
                onClick={() => handleTabClick("journals")}
            />
            {isOwner ? <HomeNavbarTab
                text={"Organization"}
                isActive={pathName.includes("organization-settings")}
                onClick={() => handleTabClick("organization-settings")}
            /> : null}
        </div>
    )
}

const HomeNavbar = () => {

    const router: AppRouterInstance = useRouter()

    const handleLogoClick = () => router.push("/home/journals")

    const handleLogout = () => {
        sessionStorage.removeItem('ACCESS_TOKEN');
        router.push('/');
    }

    return (
        <div className={"sticky top-0 z-20 w-full bg-white px-[215px]"}>
            <div className={"flex flex-row items-center justify-between"}>
                <div onClick={handleLogoClick} className={"hover:cursor-pointer"}>
                    <Logo className={"h-[31px]"}/>
                </div>
                <NavbarTabList/>
                <HomeNavbarTab
                    text={"Logout"}
                    icon={<FiLogOut size={"18px"}/>}
                    onClick={handleLogout}
                    className={"hover:text-info-red"}
                />
            </div>
        </div>
    );
};

export default HomeNavbar;
