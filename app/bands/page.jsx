// pages/bands/index.js
import Link from 'next/link';
import { bands } from '../data/bands';

const BandsList = () => (
  <div>
    <h1>Band Directory</h1>
    <ul>
      {bands.map((band) => (
        <li key={band.id}>
          <Link href={`/bands/${band.id}`}>{band.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default BandsList;
