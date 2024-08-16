'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import {
  USERNAME_MAX_LENGTH,
  MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

/**
회원가입 프로세스
1. check if username is taken
2. check if the email is already used
3. hash password
4. save the user to db
5. log the user in
6. redirect “/home”
 */

const checkSamePassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '온리 문자만 가능',
        required_error: '이름을 알려주세요',
      })
      .min(MIN_LENGTH, '너무 짧아요')
      .max(USERNAME_MAX_LENGTH, '너무 길어요')
      .trim(),
    // .transform((username) => `🔥${username}`),
    email: z.string().email(),
    password: z
      .string()
      .min(MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(MIN_LENGTH),
  })

  /**
  .superRefine() 메서드는 여러 조건을 추가하고 더 복잡한 유효성 검사를 수행할 때 사용됩니다. 주로 객체 스키마에 사용되며, 조건이 실패할 때마다 여러 오류를 추가할 수 있습니다. ctx(context).addIssue 메서드를 사용하여 오류를 명시적으로 추가할 수 있습니다.
   */
  // 1.check if username is taken
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '사용중인 사용자명',
        path: ['username'],
        // fatal: true,
      });
      // return z.NEVER;
    }
  })
  // 2. check if the email is already used
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '사용중인 이메일',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  // refine(false, '함수의 return값이 false여야 메세지를 보여줌')
  // 객체 하나에서 사용할 때는 path가 없지만 얘는 왜 path가 있냐? z.object를 한꺼번에 검사하는 애라서 path를 알려줘야 에러메세지를 보내지
  .refine(checkSamePassword, {
    message: '둘이 달라요',
    path: ['confirm_password'],
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
  // formSchema.parse(data); // 얘는 에러를 던짐, 앱이 멈춤
  // console.log(formSchema.safeParse(data));
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // 3. hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // console.log(hashedPassword); // 해시된 이상한 문자열이 나온다
    // 4. save the user to db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    // 5. log the user in
    const cookie = await getSession();
    cookie.id = user.id;
    await cookie.save();
    // 6. redirect “/home”
    redirect('/profile');
  }
};
