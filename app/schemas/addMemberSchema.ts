import {z} from "zod";
import {EmailSchema, RequiredFieldSchema} from "@/app/schemas/utils";

export const AddMemberSchema = z.object({
    email : EmailSchema,
    role : z.object({value : RequiredFieldSchema})
});

export type AddMemberData = z.infer<typeof AddMemberSchema>;
