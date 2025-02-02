// app/bands/[id]/page.jsx
"use client"; // Enables this component as a Client Component

import { useRouter } from 'next/navigation';
import { bands } from '@/app/data/bands';

const BandPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const band = bands.find((band) => band.id === id);

  if (!band) {
    return <p className="text-center text-2xl font-semibold mt-10">Band not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Header Section */}
      <header className="container mx-auto px-6 text-center mb-10">
        <h1 className="font-serif text-5xl font-bold text-gray-900">
          {band.name}
        </h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col lg:flex-row gap-10">
          {/* Left Side - Text */}
          <div className="flex-1">
            <p className="text-xl font-semibold">
              <span className="text-gray-700 font-bold">Band Member(s): </span>
              {band.members}
            </p>
            <p className="text-xl font-semibold mt-3">
              <span className="text-gray-700 font-bold">Genre: </span>
              {band.genre}
            </p>
            <p className="text-xl font-bold mt-6">Biography:</p>
            <p className="text-lg text-gray-700 mt-2">{band.description}</p>
          </div>

          {/* Right Side - Image (Now fully visible) */}
          <div className="flex-1 flex justify-center">
            <img
              src={band.img}
              alt={band.name}
              className="w-full max-w-md object-contain rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-md transition"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default BandPage;
