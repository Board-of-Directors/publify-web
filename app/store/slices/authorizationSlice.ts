import {StateCreator} from "zustand";
import api from "@/app/api/api";

export type AuthorizationSlice = {
    postSignUpForm : (form : any) => void,
    postLogInForm : (form : any) => void
}

export const authorizationSlice : StateCreator<AuthorizationSlice, [], [], AuthorizationSlice> = () => ({

    postLogInForm : async (form : any) => {
        return api.post("/login", form)
            .then((response) => response.status)
            .catch((error) => console.log(error))
    },

    postSignUpForm : async (form : any) => {
        return api.post("/signup", form)
            .then((response) => response.status)
            .catch((error) => console.log(error))
    }

})