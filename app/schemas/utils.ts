import {z} from 'zod';

const requiredFieldError = 'This field is required';

export const RequiredFieldSchema = z.string().min(1, requiredFieldError);
export const EmailSchema = RequiredFieldSchema.email();