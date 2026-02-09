import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/movie/popular?page=${page}`);
      setMovies((prev) => [...prev, ...res.data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="p-6 bg-[#1F1E24] min-h-screen text-white">
      <div className="flex items-center justify-between mb-6 gap-4">
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition">← Back</button>
        <input type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 px-4 py-2 rounded-md bg-[#2A2A2A] text-white border border-zinc-700 focus:outline-none" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.filter((m) => m.title?.toLowerCase().includes(query.toLowerCase())).map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/movie/${m.id}`)}
            className="bg-[#2A2A2A] rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 border border-zinc-700 cursor-pointer"
          >
            {m.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w300${m.poster_path}`} alt={m.title} className="w-full h-72 object-cover border-b border-zinc-700" />
            ) : (
              <div className="w-full h-72 bg-zinc-800 flex items-center justify-center text-gray-400">No Poster</div>
            )}
            <div className="p-3">
              <h3 className="text-base font-semibold truncate">{m.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{m.overview}</p>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="flex justify-center items-center mt-6"><div className="w-10 h-10 border-4 border-[#6556CD] border-t-transparent rounded-full animate-spin"></div></div>}
    </div>
  );
};

export default Movies;
