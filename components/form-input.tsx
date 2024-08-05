interface IFormInput {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

const FormInput = ({ type, placeholder, required, errors }: IFormInput) => {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className='bg-transparent w-full h-10 focus:outline-none ring-2 transition-shadow  focus:ring-4 ring-white focus:ring-green-500 border-none placeholder:text-neutral-400'
        type={type}
        placeholder={placeholder}
        required={required}
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
export default FormInput;
