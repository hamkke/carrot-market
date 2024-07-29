export default function Home() {
  return (
    <main className='flex items-center justify-center w-screen h-screen p-5 bg-blue-300'>
      <div className='w-full p-5 bg-white shadow-2xl rounded-2xl'>
        <div className='flex justify-between'>
          <div className='flex flex-col '>
            <span className='-mb-1 font-semibold text-slate-500'>
              In transit
            </span>
            <span className='text-4xl font-bold'>Coolblue</span>
          </div>
          <div className='rounded-full size-12 bg-rose-300' />
        </div>
        <div className='flex gap-3 my-3 item-center'>
          <span className='px-4 py-1 text-xs font-bold text-white uppercase bg-green-400 rounded-2xl'>
            Today
          </span>
          <span>9:30-10:30</span>
        </div>
        <div className='relative'>
          <div className='w-full h-2 rounded-full bg-slate-200' />
          <div className='absolute top-0 left-0 w-3/4 h-2 bg-green-400 rounded-full' />
        </div>
        <div className='flex justify-between mt-4 item-center text-slate-600'>
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className='text-slate-400'>Delivered</span>
        </div>
      </div>
    </main>
  );
}
