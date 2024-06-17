import {PopupProps} from "@/app/components/organisms/popups/Popup.types";
import {Employee} from "@/app/types/entities";

export type DeleteUserPopupProps = {
    employeeToDelete : Employee
} & PopupProps