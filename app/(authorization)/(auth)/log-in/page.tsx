"use client"

import {useLogInContext} from "@/app/(authorization)/(auth)/log-in/page.hooks";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import PasswordInput from "@/app/components/atoms/inputs/PasswordInput";

const LogInPage = () => {

    const {
        register,
        errors,
        handleSubmit
    } = useLogInContext()

    return (
        <CardWrapper className={"w-[430px]"}>
            <AuthForm onSubmit={handleSubmit} buttonText={"Log in"}>
                <TextInput
                    register={register("email")}
                    error={errors.email?.message}
                    placeholder={"Enter your e-mail"}
                />
                <PasswordInput
                    register={register("password")}
                    error={errors.password?.message}
                    placeholder={"Enter your password"}
                />
            </AuthForm>
        </CardWrapper>
    );
};

export default LogInPage;
