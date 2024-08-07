'use server';

import { z } from 'zod';

// const usernameSchema = z.string().min(5).max(10);
const formSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(3),
  confirm_password: z.string().min(3),
});

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
  //   formSchema.parse(data);
  //   console.log(formSchema.safeParse(data));
  const result = formSchema.safeParse(data);
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  }
};
