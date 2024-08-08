'use server';

import { z } from 'zod';
const checkEmail = (email: string) => email.includes('@zod.com');
const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

// const usernameSchema = z.string().min(5).max(10);
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '온리 문자만 가능',
        required_error: '이름을 알려주세요',
      })
      .min(3, '너무 짧아요')
      .max(10, '너무 길어요'),
    email: z
      .string()
      .email()
      .refine(checkEmail, '@zod.com가 포함되어야 합니다'),
    password: z.string().min(3),
    confirm_password: z.string().min(3),
  })
  .refine(checkPassword, {
    message: '둘이 달라요',
    path: ['confirm_password'],
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
