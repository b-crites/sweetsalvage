// app/bands/[id]/page.jsx
"use client"; // Enables this component as a Client Component

import { useRouter } from 'next/navigation';
import { bands } from '@/app/data/bands';

const BandPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const band = bands.find((band) => band.id === id);

  if (!band) {
    return <p>Band not found</p>; // Displays a message if the band is not found
  }

  return (
    <div className=' mx-auto w-3/5 grid grid-cols-1'>
        <div className=' col-span-1 mt-10 ms-10'>
        <h1 className='font-semibold text-5xl'>{band.name}</h1>
        </div>
    <div className=' col-span-1 w-8/12'>
    <div className='grid lg:grid-cols-2 grid-cols-1'>
        <div className=' col-span-1'>
      <p className='pt-5 ms-10 font-semibold text-xl'><span className='text-xl font-bold'>Band Member(s): </span> {band.members}</p>
      <p className='pt-5 ms-10 font-semibold text-xl'><span className='text-xl font-bold'>Genre:</span> {band.genre}</p>
      <div className='mt-5 ms-10'>
      <p className='text-xl font-bold'>Biography:<span className='font-semibold text-xl'> {band.description} </span></p>
      
      </div>
      </div>
      </div>
      <button className=' bg-gray-300 rounded-md py-2 px-4' onClick={() => router.back()}>Go Back</button>
    </div>
    </div>
  );
};

export default BandPage;
