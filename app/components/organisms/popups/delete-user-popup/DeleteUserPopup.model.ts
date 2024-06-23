import {Employee} from "@/app/types/entities";
import {api} from "@/app/api/api";
import {createEffect} from "effector/compat";

const deleteEmployee = async (employee : Employee) => {
    return api.delete('/employee', {params : {workerId : employee.id}})
        .then(response => response.data);
}

export const deleteEmployeeFx = createEffect<Employee, void, Error>(deleteEmployee);