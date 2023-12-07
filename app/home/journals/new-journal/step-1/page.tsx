"use client"

import TextInput from "@/app/components/atoms/inputs/TextInput";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import {useCreateJournalFirstStep} from "@/app/home/journals/new-journal/step-1/page.hooks";

const CreateJournalFirstStepPage = () => {

    const {
        register,
        errors, handleSubmit
    } = useCreateJournalFirstStep()

    return (
        <CreateJournalStepWrapper onSubmit={handleSubmit}>
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
