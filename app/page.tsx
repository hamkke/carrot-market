export default function Home() {
  return (
    <main className='flex items-center justify-center w-screen h-screen p-5 bg-blue-900 dark:bg-slate-700 sm:bg-blue-700 md:bg-blue-500 lg:bg-blue-100 '>
      <div className='flex flex-col w-full max-w-screen-sm p-5 bg-white shadow-2xl md:flex-row rounded-2xl dark:bg-slate-500 *:outline-none has-[:invalid]:bg-red-300'>
        <input
          type='text'
          required
          placeholder='keyword'
          className='w-full h-10 px-4 mb-4 transition-shadow rounded-full md:m-0 bg-slate-100 ring ring-transparent focus:ring-rose-500 focus:ring-2 placeholder:text-rose-600 invalid:bg-blue-400 invalid:focus:ring-black peer'
        />
        <span className='hidden text-red-500 peer-invalid:block'>
          빈칸 ㄴㄴ
        </span>
        <button
          type='button'
          className='py-2 text-white transition-colors bg-black rounded-full active:text-rose-500 focus:text-rose-500 md:ml-2 md:px-4 peer-invalid:bg-red-500 peer-required:bg-green-500'
        >
          SEARCH
        </button>
      </div>
    </main>
  );
}
