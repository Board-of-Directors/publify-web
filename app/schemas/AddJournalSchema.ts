import {z} from 'zod';
import {createJournalSchema} from "@/app/schemas/createJournalSchema";

export const AddJournalSchema = z.object({
    name : z.string()
        .min(2, "Title must contain at least 2 Latin or Cyrillic character")
        .max(20, "Title must contain no more than 20 Latin or Cyrillic character"),
    description : z.string()
        .min(2, "Title must contain at least 2 Latin or Cyrillic character"),
    organizationId: z.number().optional(),
    employeeEmails: z.array(z.object({value : z.string()}))
})

export type AddJournalData = z.infer<typeof AddJournalSchema>