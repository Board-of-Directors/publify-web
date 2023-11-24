"use client"

import TextInput from "@/app/components/atoms/inputs/TextInput";
import Text from "@/app/components/atoms/text/Text";
import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";

const CreateJournalFirstStepPage = () => {

    return (
        <CreateJournalStepWrapper
            pageTitle={"Name your journal"}
            header={"Jorunal name"}
            headerContent={
                <Text
                    text={"Max 200 symbols"}
                    className={"text-text-gray"}
                />
            }
        >
            <TextInput
                placeholder={"Type here name of your organization"}
            />
        </CreateJournalStepWrapper>
    );
};

export default CreateJournalFirstStepPage;
