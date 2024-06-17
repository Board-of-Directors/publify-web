import {StateCreator} from "zustand";
import {api} from "@/app/api/api";
import {Exception} from "@/app/types/entities";

export type LoginData = {
    login : string,
    password : string
}

export type FirstStepData = {
    ownerFirstName: string,
    ownerLastName: string,
    ownerEmail: string,
}

export type SecondStepData = {
    organizationName: string,
    ownerPassword: string
}

type Organization = FirstStepData & SecondStepData

export type AuthorizationSlice = {
    fillFirstStep: (data: FirstStepData) => void,
    fillSecondStep: (data: SecondStepData) => void,
    organization: Organization,
    loginUser: (loginData: LoginData) => Promise<Exception | void>,
    registerOrganization: () => Promise<Exception | void>
}

export const authorizationSlice: StateCreator<AuthorizationSlice, [], [], AuthorizationSlice> = (set, get) => ({

    organization: {
        organizationName: "",
        ownerFirstName: "",
        ownerLastName: "",
        ownerEmail: "",
        ownerPassword: ""
    },

    fillFirstStep: (data: FirstStepData) => set((state) => ({
        organization: {
            ...state.organization,
            ...data
        }
    })),

    fillSecondStep: (data: SecondStepData) => set((state) => ({
        organization: {
            ...state.organization,
            ...data
        }
    })),

    loginUser: async (loginData: LoginData) => {
        return api.post("/login", loginData)
            .then((response) => {
                localStorage.setItem('ACCESS_TOKEN', response.data.result.accessToken);
                return response.data.exception as Exception
            })
            .catch((error) => console.log(error))
    },

    registerOrganization: async () => {
        return api.post("/registration", get().organization)
            .then((response) => {
                localStorage.setItem('ACCESS_TOKEN', response.data.result.accessToken);
                return response.data.exception as Exception
            })
            .catch((error) => console.log(error))
    }

})