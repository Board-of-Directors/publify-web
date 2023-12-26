import React from 'react';
import {Employee} from "@/app/types/entities";
import BetweenRow from "@/app/components/moleculas/rows/between-row/BetweenRow";

export type FormInfoDTO = {
    name: string,
    employees: Employee[]
}

const FormInfo = ({formInfo}: {
    formInfo: FormInfoDTO
}) => {
    return (
        <div className={"w-full flex flex-col gap-[20px]"}>

            <BetweenRow
                className={"pb-[20px] border-b-2 border-background"}
                header={"Organization name"}
                descr={formInfo.name}
            />

            <div className={"w-full flex flex-col gap-[20px]"}>
                {
                    formInfo.employees.map((employee: Employee) => (
                        <BetweenRow header={employee.role} descr={employee.email}/>
                    ))
                }
            </div>

        </div>
    )
}

export default FormInfo;
