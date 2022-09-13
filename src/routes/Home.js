import { useState, useEffect } from 'react';
import Movie from '../components/Movie';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  console.log(movies);
  const getMovies = async () => {
    // const response = await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year');
    // const json = await response.json();

    const json = await (await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year')).json();
    // rating에 따라서 데이터 가져옴. 9 -> 8 달라짐 ~

    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie key={movie.id} id={movie.id} coverImg={movie['medium_cover_image']} title={movie.title} summary={movie.summary} genres={movie.genres} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
