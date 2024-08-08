import { InputHTMLAttributes } from 'react';

interface inputProp {
  errors?: string[];
  name: string;
}

const Input = ({
  errors = [],
  name,
  ...rest
}: inputProp & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className='bg-transparent w-full h-10 focus:outline-none ring-1 transition-shadow ring-white focus:ring-green-500 border-none placeholder:text-white'
        name={name}
        {...rest}
      />
      {errors.map((item, idx) => {
        return (
          <span key={idx} className='text-pink-400 font-medium'>
            {item}
          </span>
        );
      })}
    </div>
  );
};
export default Input;
