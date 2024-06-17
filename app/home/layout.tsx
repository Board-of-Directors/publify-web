"use client"

import React from 'react';
import HomeNavbar from "@/app/components/organisms/home-navbar/HomeNavbar";
import {QueryClient, QueryClientProvider} from "react-query";
import PrimeReactProvider from "@/app/components/providers/PrimeReactProvider";

const queryClient = new QueryClient()

const ProfileLayout = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <PrimeReactProvider>
            <QueryClientProvider client={queryClient}>
                <div className={"w-full h-full flex flex-col gap-[30px]"}>
                    <HomeNavbar />
                    {children}
                </div>
            </QueryClientProvider>
        </PrimeReactProvider>
    );
};

export default ProfileLayout;
