"use client"

import {useLogInContext} from "@/app/(authorization)/(auth)/log-in/page.hooks";
import CardWrapper from "@/app/components/wrappers/card/card-wrapper/CardWrapper";
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import TextInput from "@/app/components/atoms/inputs/TextInput";
import PasswordInput from "@/app/components/atoms/inputs/PasswordInput";
import Text from "@/app/components/atoms/text/Text";

const LogInPage = () => {

    const {
        register,
        errors,
        handleSubmit,
        exception
    } = useLogInContext()

    return (
        <CardWrapper className={"w-[430px]"}>
            <AuthForm onSubmit={handleSubmit} buttonText={"Log in"}>
                <TextInput
                    register={register("login")}
                    error={errors.login?.message}
                    placeholder={"Enter your e-mail"}
                />
                <PasswordInput
                    register={register("password")}
                    error={errors.password?.message}
                    placeholder={"Enter your password"}
                />
                <Text
                    text={exception}
                    className={"text-[16px] text-info-red"}
                />
            </AuthForm>
        </CardWrapper>
    );
};

export default LogInPage;
