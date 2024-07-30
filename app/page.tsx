export default function Home() {
  return (
    <main className='flex items-center justify-center w-screen h-screen p-5 bg-blue-300 dark:bg-slate-700'>
      <div className='w-full max-w-screen-sm p-5 bg-white shadow-2xl rounded-2xl dark:bg-slate-500'>
        <div className='flex justify-between'>
          <div className='flex flex-col '>
            <span className='-mb-1 font-semibold text-slate-500 dark:text-slate-100'>
              In transit
            </span>
            <span className='text-4xl font-bold dark:text-white'>Coolblue</span>
          </div>
          <div className='rounded-full size-12 bg-rose-300' />
        </div>
        <div className='flex gap-3 my-3 item-center'>
          <span className='px-4 py-1 text-xs font-bold text-white uppercase transition bg-green-400 rounded-2xl hover:bg-green-600'>
            Today
          </span>
          <span className='dark:text-white'>9:30-10:30</span>
        </div>
        <div className='relative'>
          <div className='w-full h-2 rounded-full bg-slate-200' />
          <div className='absolute top-0 left-0 w-3/4 h-2 bg-green-400 rounded-full' />
        </div>
        <div className='flex justify-between mt-4 item-center text-slate-600 dark:text-white'>
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className='text-slate-400'>Delivered</span>
        </div>
      </div>
    </main>
  );
}
