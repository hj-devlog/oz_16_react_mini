import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        },
      );

      const data = await response.json();
      const filteredMovies = (data.results || []).filter(
        (m) => m.adult === false,
      );
      setMovies(filteredMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="wrap">
      <h1 className="title">OZ 무비</h1>

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            voteAverage={movie.vote_average}
            onClick={() => navigate(`/details/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
