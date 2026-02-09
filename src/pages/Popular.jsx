import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("movie"); // default: movies
  const navigate = useNavigate();

  // Fetch popular data
  const fetchPopular = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/${category}/popular?page=${page}`   // ✅ Correct endpoint
      );
      setPopular((prev) => [...prev, ...res.data.results]);
    } catch (error) {
      console.error("Error fetching popular content:", error);
    } finally {
      setLoading(false);
    }
  }, [page, category]);

  useEffect(() => {
    fetchPopular();
  }, [fetchPopular]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="p-6 bg-[#1F1E24] min-h-screen text-white">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition"
        >
          ← Back
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search popular content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-[#2A2A2A] text-white border border-zinc-700 focus:outline-none"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => {
            setPopular([]);
            setPage(1);
            setCategory(e.target.value);
          }}
          className="px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition cursor-pointer"
        >
          <option value="movie">Movies</option>
          <option value="tv">Series</option>
        </select>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {popular
          .filter((item) =>
            item.title?.toLowerCase().includes(query.toLowerCase()) ||
            item.name?.toLowerCase().includes(query.toLowerCase())
          )
          .map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (category === "movie") {
                  navigate(`/movie/${item.id}`);
                } else if (category === "tv") {
                  navigate(`/tv/${item.id}`);
                }
              }}
              className="bg-[#2A2A2A] rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 border border-zinc-700 cursor-pointer"
            >
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-72 object-cover border-b border-zinc-700"
                />
              ) : (
                <div className="w-full h-72 bg-zinc-800 flex items-center justify-center text-gray-400">
                  No Poster
                </div>
              )}
              <div className="p-3">
                <h3 className="text-base font-semibold truncate">
                  {item.title || item.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.overview}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Loader at bottom */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-10 h-10 border-4 border-[#6556CD] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Popular;
