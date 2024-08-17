// export default function Profile() {
//   return <div>HELLO</div>;
// }

import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

const Profile = async () => {
  const user = await getUser();

  const handleLogout = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };

  return (
    <div>
      {user?.username} WELCOME
      <form action={handleLogout}>
        <button>로그아웃</button>
      </form>
    </div>
  );
};

export default Profile;
