export default function Home() {
  return (
    <main className='flex items-center justify-center w-screen h-screen p-5 bg-blue-300 dark:bg-slate-700'>
      <div className='flex flex-col w-full max-w-screen-sm p-5 bg-white shadow-2xl rounded-2xl dark:bg-slate-500'>
        <input
          type='text'
          placeholder='keyword'
          className='w-full h-10 px-4 mb-4 transition-shadow rounded-full outline-none bg-slate-100 ring ring-transparent focus:ring-rose-500 focus:ring-1 placeholder:text-rose-400'
        />
        <button
          type='button'
          className='py-2 text-white transition-colors bg-black rounded-full outline-none active:text-rose-500 focus:text-rose-500'
        >
          SEARCH
        </button>
      </div>
    </main>
  );
}
