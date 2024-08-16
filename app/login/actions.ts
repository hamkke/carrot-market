'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import {
  MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';

/**
로그인 프로세스
1. find a user with the email
2. if the user is found, check password hash
3. log the user in
4. redirect /profile
 */

// 1. find a user with the email
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().email().refine(checkEmailExists, '존재하지 않는 이메일'),
  password: z.string().min(MIN_LENGTH, '너무 짧아요'),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function logIn(_: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    // console.log(result.error.flatten());
    // { formErrors: [], fieldErrors: { email: [ '존재하지 않는 이메일' ] } }
    // formErrors는 path를 알 수 없을 때 나오는 에러
    return result.error.flatten();
  } else {
    // zod로 1번 검증
    // 2. if the user is found, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: { id: true, password: true },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? '');
    if (ok) {
      // 3. log the user in
      console.log('로그인 함?');
      const cookie = await getSession();
      cookie.id = user!.id;
      await cookie.save();
      // 4. redirect /profile
      redirect('/profile');
    } else {
      //  result.error.flatten()의 모양대로 에러 보내주기
      return {
        fieldErrors: {
          password: ['땡'],
          email: [],
        },
      };
    }
  }
}
