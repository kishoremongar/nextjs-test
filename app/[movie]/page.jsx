import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  return data?.results.map((item) => ({ movie: toString(item?.id) }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = 'https://image.tmdb.org/t/p/original';
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  return (
    <div>
      <div>
        <h2 className='text-2xl'>{data?.title}</h2>
        <h2 className='text-lg'>{data.release_date}</h2>
        <h2>Runtime : {data?.runtime} minutes</h2>
        <h2 className='text-sm bg-green-600 rounded-md inline-block my-2 py-2 px-4 text-white'>
          {data?.status}
        </h2>
        <Link href={'/'}>
          <h2 className='bg-red-600 hover:bg-red-400 rounded-md inline-block my-2 py-[6px] px-4 text-white ml-4'>
            Go back
          </h2>
        </Link>
        <Image
          className='my-12 w-full'
          src={imagePath + data?.backdrop_path}
          width={1000}
          height={1000}
          alt={data?.title}
          priority
        />
        <p>{data?.overview}</p>
      </div>
    </div>
  );
}
