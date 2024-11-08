// pages/bands/index.js
import Link from 'next/link';
import { bands } from '../data/bands';

const BandsList = () => (
    <>
    <div className='mt-10 lg:ms-10 mb-5'>

    
    <h1 className= 'font-bold font-serif lg:text-left text-center text-5xl'>Band Information</h1>
    </div>
  <div className=' mx-auto lg:w-7/12 w-10/12'>
    <div className='grid pt-8 place-items-center     lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
  {bands.map((band) => (
    <div className='' key={band.id}>
      <Link href={`/bands/${band.id}`}>
        <div className='relative shadow-2xl rounded-2xl bg-red-300 w-64 h-56 overflow-hidden'>
          <img src={band.img} alt={`${band.name} image`} className='bandImg object-fill transition-transform duration-300' />
          <div className='absolute bottom-0 w-full h-10 bg-white font-bold text-lg rounded-b-2xl flex items-center justify-center'>
            {band.name}
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

  </div>
  </>
);

export default BandsList;
