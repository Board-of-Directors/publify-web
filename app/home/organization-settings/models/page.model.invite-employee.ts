import {api} from "@/app/api/api";
import {createEffect} from "effector";
import {AddMemberData} from "@/app/schemas/addMemberSchema";

type InviteEmployeeData = {
    employee : AddMemberData,
    organizationId : number
}

const inviteEmployee = async (req : InviteEmployeeData) : Promise<void> => {
    return api.post("/invite", [{...req.employee, role : req.employee.role.value}], {params : {organizationId : req.organizationId}})
        .then(response => response.data.result);
};

export const inviteEmployeeFx = createEffect<InviteEmployeeData, void, Error>(inviteEmployee);