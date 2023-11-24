"use client"

import CreateJournalStepWrapper
    from "@/app/components/wrappers/layout/create-journal-step-wrapper/CreateJournalStepWrapper";
import FormInfo, {FormInfoDTO} from "@/app/components/organisms/form-info/FormInfo";

const CreateJournalThirdStepPage = () => {

    const mockFormInfo : FormInfoDTO = {
        name : "MyJournal",
        employees : [
            {email : "alex_seleznev@gmail.com", role : "Copyrighter"},
            {email : "efeodalov@gmail.com", role : "Illustrator"},
            {email : "molochevan@ya.ru", role : "Editor"},
        ]
    }

    return (
        <CreateJournalStepWrapper
            pageTitle={"Finish setup"}
            header={"Check your organization settings"}
            buttonText={"Send links & finish"}
        >
            <FormInfo formInfo={mockFormInfo} />
        </CreateJournalStepWrapper>
    );
};

export default CreateJournalThirdStepPage;
