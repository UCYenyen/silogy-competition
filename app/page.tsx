import Image from 'next/image';

import Navbar from '@/components/navbar';
export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="bg-[url('/images/background-home-desktop.svg')] bg-cover flex min-h-screen min-w-screen flex-col items-center justify-center">
        <div className='flex flex-col items-center justify-center gap-8'>
          <h1 className="text-8xl text-[#E9F2F4] w-[45%] text-center">Mengubah 
              Suara Warga 
              Menjadi Aksi Nyata
          </h1>
          <h1 className='text-2xl text-[#DCE7EB] text-center w-[45%]'>lorem ipsum yen yen lorem ipsum yen yen lorem ipsum yen yen lorem ipsum yen yen lorem ipsum yen yen lorem ipsum yen yen lorem ipsum yen yen lorem ipsum yen yen lorem.</h1>
        </div>
      </main>
        <section className='relative min-h-screen flex justify-center'>
          <div className="z-50 absolute rounded-2xl flex justify-between items-center -top-[15%] bg-[#F2F2F2] w-[80%] h-[30%] shadow-2xl gap-2">
            <div className='bg-white rounded-bl-2xl rounded-tl-2xl w-full h-full flex flex-col justify-center items-center gap-2'>
              <Image src={"/images/icon-location.svg"} width={100} height={100} alt="Location Icon" />
              <h1 className='text-[#322C2C] text-center text-2xl font-semibold'>Pelayanan</h1>
              <h2 className='text-[#8C8C8C] text-xl text-center w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, labore?</h2>
            </div>
            <div className='bg-white w-full h-full flex flex-col justify-center items-center gap-2'>
              <Image src={"/images/icon-location.svg"} width={100} height={100} alt="Location Icon" />
              <h1 className='text-[#322C2C] text-center text-2xl font-semibold'>Pelayanan</h1>
              <h2 className='text-[#8C8C8C] text-xl text-center w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, labore?</h2>
            </div>
            <div className='bg-white rounded-br-2xl rounded-tr-2xl w-full h-full flex flex-col justify-center items-center gap-2'>
              <Image src={"/images/icon-location.svg"} width={100} height={100} alt="Location Icon" />
              <h1 className='text-[#322C2C] text-center text-2xl font-semibold'>Pelayanan</h1>
              <h2 className='text-[#8C8C8C] text-xl text-center w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, labore?</h2>
            </div>
        </div>
        <div className='flex items-center w-full h-full'>
        <div className='w-full h-full'>
          <Image src={"/images/gotong-royong-3.svg"} className='flex absolute -bottom-[20%] w-full h-full' width={100} height={100} alt="Location Icon" />
        </div>
        <div className='flex flex-col items-start justify-center gap-4'>
            <h1 className='text-[#322C2C] text-4xl font-semibold'>Mengapa Tolong Yuk?</h1>
            <p className='text-[#322C2C] text-4xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio facilis optio impedit quo vero qui natus aliquam quia, esse commodi expedita ipsum recusandae, perspiciatis fugiat ipsa sed quos ducimus molestias assumenda dolore rerum amet perferendis. Delectus architecto voluptates eos officiis.</p>
          </div>
        </div>
          
        </section>
    </div>
  );
}
