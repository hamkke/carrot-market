'use client';
import { useFormStatus } from 'react-dom';

interface IFormBtn {
  text: string;
}

const FormBtn = ({ text }: IFormBtn) => {
  const { pending, action, data, method } = useFormStatus();
  console.log(pending, data, action, method);
  return (
    <button
      disabled={pending}
      className='primary-btn py-2 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-pink-400'
    >
      {pending ? 'LOADING' : text}
    </button>
  );
};
export default FormBtn;
