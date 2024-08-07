import FormBtn from '@/components/form-btn';
import FormInput from '@/components/form-input';

export default function SMSLogin() {
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Log in</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-4'>
        <FormInput
          name='phone_number'
          type='number'
          placeholder='Phone number'
          required
          errors={[]}
        />
        <FormInput
          name='number'
          type='number'
          placeholder='Verification code'
          required
          errors={[]}
        />
        <FormBtn text='Verify' />
      </form>
    </div>
  );
}
