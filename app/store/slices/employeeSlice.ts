import {api} from "@/app/api/api";
import {StateCreator} from "zustand";
import {Employee, Exception} from "@/app/types/entities";
import {AuthorizationSlice} from "@/app/store/slices/authorizationSlice";

export type EmployeeSlice = {
    employees : Employee[],
    inviteUsers : (data : Employee[]) => Promise<Exception | void>,
    getEmployees : () => Promise<Exception | void>
}

export const employeeSlice : StateCreator<EmployeeSlice & AuthorizationSlice, [], [], EmployeeSlice> = (set) => ({

    employees : [],

    inviteUsers : async (data : Employee[]) => {
        return api.post("/invite", data, {
            params : {
                organizationId : localStorage.getItem("ORGANIZATION_ID")
            }
        })
            .then((response) => {
                console.log(response)
                return response.data.exception as Exception
            })
            .catch(console.log)
    },

    getEmployees : async () => {
        api.get('/employee', {
            params : {
                organizationId : localStorage.getItem("ORGANIZATION_ID")
            }
        }).then((response) => {
            if (response.data.exception == null) {
                set({employees : response.data.result})
            } else return response.data.exception as Exception
        })
    }

})