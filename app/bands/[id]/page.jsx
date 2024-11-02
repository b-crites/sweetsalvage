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
    <div>
      <h1>{band.name}</h1>
      <p><strong>Genre:</strong> {band.genre}</p>
      <p>{band.description}</p>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default BandPage;
