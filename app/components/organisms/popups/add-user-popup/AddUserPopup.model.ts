import {AddMemberData} from "@/app/schemas/addMemberSchema";
import api from "@/app/api/api";
import {createEffect} from "effector";

export const addMember = async (member : AddMemberData) => {
    return api.post('/invite', member).then(response => response.data);
}

export const addMemberFx = createEffect<AddMemberData, void, Error>(addMember);