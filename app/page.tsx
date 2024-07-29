export default function Home() {
  return (
    <main className='bg-blue-300 h-screen w-screen flex items-center justify-center p-5'>
      <div className='bg-white p-5 shadow-2xl w-full rounded-2xl'>
        <div>
          <div>
            <span>In transit</span>
            <span>Coolblue</span>
          </div>
          <div />
        </div>
        <div>
          <span>Today</span>
          <span>9:30-10:30</span>
        </div>
        <div>
          <div />
          <div />
        </div>
        <div>
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span>Delivered</span>
        </div>
      </div>
    </main>
  );
}
