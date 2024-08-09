import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function test() {
  const user = await db.user.findMany({
    where: {
      phone_number: {
        contains: '01012341234',
      },
    },
  });
  //   const user = await db.user.create({
  //     data: {
  //       username: 'wewewewe',
  //       phone_number: '01012341234',
  //     },
  //   });
  console.log(user);
}
test();
export default db;
