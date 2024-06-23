import {api} from "@/app/api/api";
import {createEffect, createEvent, sample} from "effector";
import {debounce} from "patronum";

type EditOrganizationData = {
    organizationId: number,
    organizationName: string
}

const editOrganizationName = async (req: EditOrganizationData) => {
    return api.put('/organization', {organizationName: req.organizationName}, {params: {organizationId: req.organizationId}})
        .then(response => response.data.result);
};

const editOrganizationNameFx = createEffect<EditOrganizationData, void, Error>(editOrganizationName);

export const editOrganizationNameEvent = createEvent<EditOrganizationData>();
const debouncedEditOrganizationNameEvent = debounce(editOrganizationNameEvent, 500);

sample({
    clock: debouncedEditOrganizationNameEvent,
    target: editOrganizationNameFx
})
