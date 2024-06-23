import {Role} from "@/app/types/entities";
import {api} from "@/app/api/api";
import {createEffect} from "effector";

type EditEmployeeData = {
    workerId : number,
    newRole : Role
}

const editEmployee = async (req : EditEmployeeData) => {
    return api.put('/employee', null, {params : req})
        .then(response => response.data.result);
};

export const editEmployeeFx = createEffect<EditEmployeeData, void, Error>(editEmployee);