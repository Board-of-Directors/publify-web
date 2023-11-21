import React from 'react';
import Button from "@/app/components/atoms/buttons/button/Button";
import AuthNavbar from "@/app/components/moleculas/auth-navbar/AuthNavbar";

type AuthFormProps = {
    children: React.ReactNode
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    activeTab : "left" | "right",
    buttonText?: string
}

const AuthForm = ({children, activeTab, buttonText = "Next Step", onSubmit}: AuthFormProps) => {
    return (
        <>
            <AuthNavbar activeTab={activeTab} />
            <form onSubmit={onSubmit} className={"flex flex-col gap-4"}>
                {children}
                <Button type={"submit"} text={buttonText}/>
            </form>
        </>
    );
};

export default AuthForm;
