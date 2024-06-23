import {z} from "zod";

export const createJournalSchema = z.object({
    name : z.string()
        .min(2, "Title must contain at least 2 Latin or Cyrillic character")
        .max(20, "Title must contain no more than 20 Latin or Cyrillic character"),
    description : z.string()
        .min(2, "Title must contain at least 2 Latin or Cyrillic character")
})