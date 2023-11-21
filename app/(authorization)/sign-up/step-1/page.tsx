"use client"

import React from 'react';
import AuthForm from "@/app/components/wrappers/forms/auth-form/AuthForm";
import {FieldValues, useForm} from "react-hook-form";

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "@/app/components/atoms/inputs/TextInput";

const SignUpPageStep1 = () => {

    const signUpSchema = z.object({
        firstName: z.string()
            .min(2, "The first name must contain at least 2 Latin or Cyrillic character")
            .max(20, "The first name must contain no" +
            "more than 20 Latin or Cyrillic characters"),
        lastName: z.string()
            .min(1, "The first name must contain at least 1 Latin or Cyrillic character")
            .max(30, "The last name must contain no" +
            "more than 30 Latin or Cyrillic characters"),
        email: z.string().email("Email address is invalid. Please enter a valid email address")
    })

    const {
        register, handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "all",
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }

    return (
        <AuthForm
            onSubmit={handleSubmit(onSubmit)}
            activeTab={"left"}
        >
            <TextInput
                register={register("firstName")}
                error={errors.firstName?.message}
                placeholder={"Enter your first name"}
            />
            <TextInput
                register={register("lastName")}
                error={errors.lastName?.message}
                placeholder={"Enter your last name"}
            />
            <TextInput
                register={register("email")}
                error={errors.email?.message}
                placeholder={"Enter your email"}
            />
        </AuthForm>
    );
};

export default SignUpPageStep1;
