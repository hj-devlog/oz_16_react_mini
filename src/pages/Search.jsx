import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../App.css";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function run() {
      const q = query.trim();
      if (!q) {
        setMovies([]);
        setErrorMsg("");
        return;
      }

      setLoading(true);
      setErrorMsg("");

      try {
        const url = new URL("https://api.themoviedb.org/3/search/movie");
        url.searchParams.set("query", q);
        url.searchParams.set("include_adult", "false");
        url.searchParams.set("language", "ko-KR");

        const res = await fetch(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("search failed");

        const data = await res.json();
        const filtered = (data.results || []).filter((m) => m.adult === false);

        if (!ignore) setMovies(filtered);
      } catch (e) {
        if (!ignore) setErrorMsg("검색 중 오류가 발생했습니다.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    run();
    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <div className="wrap">
      <h1 className="title">검색 결과</h1>

      {query && (
        <p style={{ color: "#aaa", marginBottom: "16px" }}>“{query}”</p>
      )}

      {loading && <p>로딩중...</p>}
      {errorMsg && <p>{errorMsg}</p>}

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

      {!loading && query && movies.length === 0 && (
        <p style={{ marginTop: "20px" }}>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
