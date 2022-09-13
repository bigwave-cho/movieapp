import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';
function Detail() {
  const { id } = useParams(); // url에 객체인 체로 들어갈 수 없으니.
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(movie);

  const getMovies = async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setMovie(json.data.movie);
    if (loading === true) {
      setLoading(!loading);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={`${style.getMovies}`}>
      {loading ? <h1>Loading......</h1> : null}
      <div>
        <img src={movie['medium_cover_image']}></img>
      </div>
      <div style={{ color: 'red', fontSize: '30px' }}>{movie.title}</div>
    </div>
  );
}
export default Detail;
