export default function Home() {
  return (
    <main className='bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5'>
      <div className='bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-4'>
        {['Nico', 'Me', 'You', 'Yourself', ''].map((person, index) => (
          <div key={index} className='flex items-center gap-5 group'>
            <div className='size-[33px] bg-[#69886a] rounded-full group-hover:bg-lime-100 transition-all' />
            <span className='text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-blue-300'>
              {person}
            </span>
            <div className='animatePing size6'>
              <span className='z-10'>{index}</span>
              <div className='testApply testApplyPlus' />
            </div>
            <div className='animatePing size10'>
              <span className='z-10'>{index}</span>
              <div className='testApply' />
            </div>
          </div>
        ))}
        <input type='text' />
      </div>
    </main>
  );
}
