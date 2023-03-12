import Movies from './components/movies';

export default async function Home() {
  //https://api.themoviedb.org/3/movie/550?api_key=
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  // console.log(data);
  return (
    <main>
      <h1 className='text-2xl bg-green-600 rounded-md inline-block my-2 py-2 px-4 text-white'>
        Popular Movies
      </h1>
      <div className='grid gap-16 grid-cols-fluid'>
        {data?.results?.map((item) => (
          <Movies
            key={item?.id}
            id={item?.id}
            title={item?.title}
            poster_path={item?.poster_path}
            release_date={item?.release_date}
          />
        ))}
      </div>
    </main>
  );
}
