'use server';
import { z } from 'zod';

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

export async function smsVerification(prevState: any, formData: FormData) {}
