import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createJournalSchema} from "@/app/schemas/createJournalSchema";
import {useStore} from "@/app/store/useStore";
import {useEffect, useState} from "react";
import {useShallow} from "zustand/react/shallow";
import {InputData} from "@/app/types/entities";

export const useEditJournalSecondStep = (journalId: number) => {

    const {
        handleSubmit,
        control
    } = useForm()

    const [journal, editJournal, getJournal, fillPartialData] = useStore(
        useShallow(state => [state.journal,
            state.editJournal, state.getJournal, state.fillPartialData])
    )

    const [organizationEmployees, getEmployees] = useStore(
        useShallow(state => [state.employees, state.getEmployees])
    )

    useEffect(() => {
        getJournal(journalId)
        getEmployees()
    }, [])

    const options = organizationEmployees.map(item => item.email)

    const initialInputData = journal.employeeEmails.map((email, index) => {
        return {name: `input-${index}`, value: email}
    })

    const [
        inputData,
        setInputData
    ] = useState<InputData[]>(initialInputData)

    const handleAddEmail = () => {
        if (inputData.length < organizationEmployees.length) {
            const newInputName: string = `input_${inputData.length}`
            setInputData([...inputData, {name: newInputName, value: ""}])
        }
    }

    const handleInputChange = (value: string, index: number) => {
        const newValues = inputData.map((inputData, curIndex) => {
            return curIndex === index ? {value: value, name: inputData.name} : inputData
        })
        setInputData(newValues)
    }

    const onSubmit = (data: FieldValues) => {
        console.log(data)
        fillPartialData({employeeEmails: Object.values(data)} as any)
        editJournal(journalId)
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        control, journal, handleInputChange,
        handleAddEmail, options, inputData
    }

}