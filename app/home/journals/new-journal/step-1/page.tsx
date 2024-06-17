"use client"

import TextInput from "@/app/components/atoms/inputs/TextInput";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {useFormContext} from "react-hook-form";
import {AddJournalData} from "@/app/schemas/AddJournalSchema";

const CreateJournalFirstStepPage = () => {

    const router: AppRouterInstance = useRouter()
    const {register, formState: {errors}, trigger} = useFormContext<AddJournalData>();

    const handleTriggerForm = async () => {
        if (await trigger(['name', 'description'])) {
            router.push("/home/journals/new-journal/step-2");
        }
    }

    return (
        <CreateJournalStepWrapper onClick={handleTriggerForm}>
            <TextInput
                label={"Journal name"}
                register={register("name")}
                error={errors.name?.message}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Type here name of your organization"}
            />
            <TextInput
                label={"Journal description"}
                register={register("description")}
                error={errors.description?.message}
                labelClassName={"text-[18px] text-text-black"}
                placeholder={"Enter description of your journal"}
            />
        </CreateJournalStepWrapper>
    );
};

export default CreateJournalFirstStepPage;
