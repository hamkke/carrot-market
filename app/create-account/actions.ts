'use server';

import { z } from 'zod';

const usernameSchema = z.string().min(5).max(10);

export const createAccountAction = async (
  prevState: any,
  formData: FormData
) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  console.log(data, 213);
  usernameSchema.parse(data.username);
};
