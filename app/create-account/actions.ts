'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { USERNAME_MAX_LENGTH, MIN_LENGTH } from '@/lib/constants';
import db from '@/lib/db';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

/**
로그인 프로세스
1.check if username is taken
2. check if the email is already used
3. hash password
4. save the user to db
5. log the user in
6. redirect “/home”
 */

// 1.check if username is taken
const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  // console.log(user); // 있으면 {id:1}, 없으면 null
  // refine에서 사용되는 함수,
  // 값이 있을 땐 사용 중인 아이디라는 걸 보여줘야 하기 때문에 false를 return
  return !Boolean(user);
};
// 2. check if the email is already used
const ceckUniqueEmail = async (email: string) => {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(userEmail);
};
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
      .min(MIN_LENGTH, '너무 짧아요')
      .max(USERNAME_MAX_LENGTH, '너무 길어요')
      .trim()
      // refine(false, '함수의 return값이 false여야 메세지를 보여줌')
      .refine(checkUniqueUsername, '사용 중인 아이디'),
    // .transform((username) => `🔥${username}`),
    email: z.string().email().refine(ceckUniqueEmail, '사용 중인 이메일'),
    // .refine(checkEmail, '@zod.com가 포함되어야 합니다'),
    password: z.string().min(MIN_LENGTH),
    confirm_password: z.string().min(MIN_LENGTH),
  })
  // 얘는 왜 path가 있냐? z.object를 한꺼번에 검사하는 애라서 path를 알려줘야 에러메세지를 보내지
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
    // if (!PASSWORD_REGEX.test(password)) {
    //   ctx.addIssue({
    //     code: 'custom',
    //     message: PASSWORD_REGEX_ERROR,
    //     path: ['password'],
    //   });
    // }
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
  // console.log(formSchema.safeParse(data));
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // 3. hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // console.log(hashedPassword); // $2b$12$m89qcc9O9NUqclZXgf5VfuoyjzKyn5flNoS6wMlhG6x7HEUbqQ2Vu
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
