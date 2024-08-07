'use server';
export const handleForm = async (prevState: any, formData: FormData) => {
  // prevState는 이 함수가 return한 값이 된다
  // console.log(formData.get('email'), formData.get('password'));
  console.log(prevState, 111);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    errors: ['wrong password', 'password too short'],
  };
};
