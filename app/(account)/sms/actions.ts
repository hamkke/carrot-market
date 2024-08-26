'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import crypto from 'crypto';
import validator from 'validator';
import db from '@/lib/db';

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
