'use server';
import { z } from 'zod';
import validator from 'validator';

// import {
//   MIN_LENGTH,
//   PASSWORD_REGEX,
//   PASSWORD_REGEX_ERROR,
// } from '@/lib/constants';

// const formSchema = z.object({
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(MIN_LENGTH, '너무 짧아요')
//     .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
// });
const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsVerification(prevState: any, formData: FormData) {}
