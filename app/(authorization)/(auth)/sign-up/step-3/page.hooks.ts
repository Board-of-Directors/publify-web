import {useForm} from "react-hook-form";
import {Employee} from "@/app/types/entities";
import {useStore} from "@/app/store/useStore";
import {useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

export const useThirdStepContext = () => {

    const router : AppRouterInstance = useRouter()
    const {handleSubmit} = useForm()

    const [exception, setException] = useState<string>("")

    // user states
    const initialEmployee: Partial<Employee> = {email: "", role: "Copyrighter"}
    const initialState: Partial<Employee>[] = Array.from({length: 2}, () => initialEmployee)
    const inviteUsers = useStore(state => state.inviteUsers)

    const [
        employees,
        setEmployees
    ] = useState<Partial<Employee>[]>(initialState)

    const addNewEmployee = () => {
        setEmployees([...employees, {
            email: "",
            role: "Copyrighter"
        }])
    }

    const sendInvitation = () => {
        inviteUsers(employees as Employee[])
            .then(_ => router.push('/sign-up/step-4'))
            .catch(setException)
    }

    return {
        handleSubmit : handleSubmit(sendInvitation),
        sendInvitation, addNewEmployee,
        employees, setEmployees
    }

}