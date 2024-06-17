import {api} from "@/app/api/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {Credentials} from "@/app/types/entities";

const getCredentials = async () => {
    return api.get('/employee/me').then(response => response.data.result)
};

export const getCredentialsFx = createEffect<void, Credentials, Error>(getCredentials);
export const getCredentialsEvent = createEvent<void>();

export const $credentials = createStore<Credentials | null>(null);
$credentials.on(getCredentialsFx.doneData, (_, credentials) => credentials);

sample({
    clock : getCredentialsEvent,
    target : getCredentialsFx
})