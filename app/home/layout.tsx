"use client"

import React from 'react';
import HomeNavbar from "@/app/components/organisms/home-navbar/HomeNavbar";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

const ProfileLayout = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={"w-full h-full flex flex-col gap-[30px]"}>
                <HomeNavbar />
                {children}
            </div>
        </QueryClientProvider>
    );
};

export default ProfileLayout;
