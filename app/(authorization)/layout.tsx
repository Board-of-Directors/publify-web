import React from 'react';
import CenterLayout from "@/app/components/wrappers/layout/center-layout/CenterLayout";

const AuthorizationLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <CenterLayout axis={"y"} className={"mt-[100px]"}>
            <div className={"flex flex-col items-center gap-8"}>
                {children}
            </div>
        </CenterLayout>
    );
};

export default AuthorizationLayout;
