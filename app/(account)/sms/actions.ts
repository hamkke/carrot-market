'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import crypto from 'crypto';
import validator from 'validator';
import db from '@/lib/db';
import upsertSession from '@/lib/upsertSession';

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

const tokenExists = async (token: number) => {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: { id: true },
  });
  return exists ? true : false;
};
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, '당신이 보낸 인증번호는 맞지 않아요');

const getToken = async () => {
  const token = crypto.randomInt(100000, 999999).toString();
  // Probably have the same token. So we check
  const existsToken = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: { id: true },
  });
  if (existsToken) {
    return getToken();
  } else {
    return token;
  }
};

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
      /**
      사용자한테 인증번호 보내기 순서
      1. 일단 모든 sms token을 지운다
      2. create token
      3. send the token using twilio
      */
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone_number: result.data,
          },
        },
      });
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone_number: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                phone_number: result.data,
              },
            },
          },
        },
      });
      return { token: true };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });
      // token이 있다는 걸 확신하기에 if ㄴㄴ
      await upsertSession(token!.userId);
      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });

      redirect('/profile');
    }
  }
}
