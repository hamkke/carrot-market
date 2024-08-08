'use server';

import { z } from 'zod';

const passwordRegex = /\d/;
const checkEmail = (email: string) => email.includes('@zod.com');
// const checkPassword = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const usernameSchema = z.string().min(5).max(10);
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '온리 문자만 가능',
        required_error: '이름을 알려주세요',
      })
      .min(3, '너무 짧아요')
      .max(10, '너무 길어요')
      .trim()
      .transform((username) => `🔥${username}`),
    email: z
      .string()
      .email()
      .refine(checkEmail, '@zod.com가 포함되어야 합니다'),
    password: z.string().min(3),
    confirm_password: z.string().min(3),
  })
  // .refine(checkPassword, {
  //   message: '둘이 달라요',
  //   path: ['confirm_password'],
  // });
  /**
  .superRefine() 메서드는 여러 조건을 추가하고 더 복잡한 유효성 검사를 수행할 때 사용됩니다. 주로 객체 스키마에 사용되며, 조건이 실패할 때마다 여러 오류를 추가할 수 있습니다. ctx.addIssue 메서드를 사용하여 오류를 명시적으로 추가할 수 있습니다.
   */
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 달라요',
        path: ['confirm_password'],
      });
    }
    if (!passwordRegex.test(password)) {
      ctx.addIssue({
        code: 'custom',
        message: '숫자가 들어가야 해요',
        path: ['password'],
      });
    }
  });
export const createAccountAction = async (
  prevState: any,
  formData: FormData
) => {
  /**
  왜 데이터 객체를 만들고 또 result에 담아서 사용하는가?
  data는 아직 검증되지 않았고 .transform().trim()등 적용되어 있지 않기 때문에
  zod의 검증을 받은 데이터를 사용하는 거임
  *절대 data는 건들지 않는다*
   */
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  //   formSchema.parse(data); // 얘는 에러를 던짐, 앱이 멈춤
  //   console.log(formSchema.safeParse(data));
  const result = formSchema.safeParse(data);
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
