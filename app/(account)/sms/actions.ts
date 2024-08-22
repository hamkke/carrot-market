'use server';
import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

interface ActionState {
  token: boolean;
}

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone_number) => validator.isMobilePhone(phone_number, 'ko-KR'),
    'Wrong phone format'
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsVerification(
  prevState: ActionState,
  formData: FormData
) {
  const phone_number = formData.get('phone_number');
  const token = formData.get('token');
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone_number);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect('/');
    }
  }
}
