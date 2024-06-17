import {createEffect, createEvent, createStore, sample} from "effector";
import {Employee} from "@/app/types/entities";
import {api} from "@/app/api/api";
import {deleteEmployeeFx} from "@/app/components/organisms/popups/delete-user-popup/DeleteUserPopup.model";
import {editEmployeeFx} from "@/app/home/organization-settings/models/page.model.edit-employee";
import {$credentials} from "@/app/home/organization-settings/models/page.model.credentials";
import {inviteEmployeeFx} from "@/app/home/organization-settings/models/page.model.invite-employee";

const getAllEmployees = async (organizationId: number): Promise<Employee[]> => {
    return api.get('/employee', {params: {organizationId: organizationId}})
        .then(response => response.data.result);
};

const getAllEmployeesFx = createEffect<number, Employee[], Error>(getAllEmployees);

export const getAllEmployeesEvent = createEvent<number>();

export const $employees = createStore<Employee[]>([]);
$employees.on(getAllEmployeesFx.doneData, (_, employees) => employees);

sample({
    clock: getAllEmployeesEvent,
    target: getAllEmployeesFx
})

sample({
    clock: [deleteEmployeeFx.doneData, editEmployeeFx.doneData, inviteEmployeeFx.doneData],
    source: $credentials,
    fn: (credentials) => credentials!!.organizationId,
    target: getAllEmployeesFx
})