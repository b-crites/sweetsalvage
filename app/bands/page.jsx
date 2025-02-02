// pages/bands/index.js
import Link from 'next/link';
import { bands } from '../data/bands';

const BandsList = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Header Section */}
      <header className="container mx-auto px-6 text-center mb-16">
        <h1 className="font-serif text-5xl font-bold text-gray-900">
          Discover Your Favorite Bands
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Browse through our collection of amazing bands.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Band Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {bands.map((band) => (
              <BandCard key={band.id} band={band} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Band Card Component
const BandCard = ({ band }) => {
  return (
    <Link href={`/bands/${band.id}`} className="block">
      <div className="group relative w-80 h-80 rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
        {/* Band Image */}
        <img
          src={band.img}
          alt={band.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay for Band Name */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-lg font-bold text-white text-center">
            {band.name}
          </h2>
        </div>
      </div>
    </Link>
  );
};


export default BandsList;