import {useState} from "react";
import {Employee} from "@/app/types/entities";

export const useOrganizationSettings = () =>  {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [organizationName, setOrganizationName] = useState<string>('');

    const handleAddEmployee = () => {
        //TODO
    }

    const handleDeleteEmployee = (rowIndex : number) => {
        //TODO
    }

    return {
        organizationName, setOrganizationName,
        handleDeleteEmployee, handleAddEmployee,
        employees, setEmployees,
    }

}
