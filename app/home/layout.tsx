"use client"

import React from 'react';
import HomeNavbar from "@/app/components/organisms/home-navbar/HomeNavbar";
import {QueryClient, QueryClientProvider} from "react-query";
import PrimeReactProvider from "@/app/components/providers/PrimeReactProvider";
import {useRole} from "@/app/utils/hooks/useRole";
import Text from "@/app/components/atoms/text/Text";

const queryClient = new QueryClient()

const UserRoleCard = () => {
    const {role} = useRole();

    return (
        <section className={'fixed right-5 bottom-5 z-30 bg-white rounded-xl shadow-xl shadow-gray-400/30 p-5 flex flex-row items-baseline gap-5'}>
            <Text text={'Your current role'} className={'text-sm text-text-gray'}/>
            <Text text={role} className={'text-md text-text-black font-semibold'}/>
        </section>
    )
}

const ProfileLayout = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <PrimeReactProvider>
            <QueryClientProvider client={queryClient}>
                <div className={"w-full h-full flex flex-col gap-[30px]"}>
                    <HomeNavbar />
                    {children}
                    <UserRoleCard/>
                </div>
            </QueryClientProvider>
        </PrimeReactProvider>
    );
};

export default ProfileLayout;
