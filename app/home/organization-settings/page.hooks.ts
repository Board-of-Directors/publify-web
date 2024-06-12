import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useStore} from "@/app/store/useStore";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {createJournalSchema} from "@/app/schemas/createJournalSchema";

export const useOrganizationSettings = () =>  {

}
