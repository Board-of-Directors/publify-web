import {Employee} from "@/app/types/entities";
import {api} from "@/app/api/api";
import {createEffect} from "effector";

type InviteEmployeeData = {
    employee : Employee,
    organizationId : number
}

const inviteEmployee = async (req : InviteEmployeeData) : Promise<void> => {
    return api.post("/invite", [req.employee], {params : {organizationId : req.organizationId}})
        .then(response => response.data.result);
};

export const inviteEmployeeFx = createEffect<InviteEmployeeData, void, Error>(inviteEmployee);