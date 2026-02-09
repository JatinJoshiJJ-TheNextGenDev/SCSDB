import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axiosInstance.get("/trending/all/week");
        setTrending(res.data.results);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };
    fetchTrending();
  }, []);

  // filter logic
  const filteredItems = trending.filter((item) => {
    if (filter === "all") return true;
    if (filter === "movie") return item.media_type === "movie";
    if (filter === "tv") return item.media_type === "tv";
    return true;
  });

  return (
    <div className="p-6 border-t border-zinc-700">
      {/* Heading + Dropdown aligned */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-zinc-400">Trending</h2>

        {/* Dropdown filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#1F1E24] text-gray-300 px-4 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#6556CD] transition"
        >
          <option value="all">ALL</option>
          <option value="movie">MOVIE</option>
          <option value="tv">TV</option>
        </select>
      </div>

      {/* Horizontal scroll container */}
      <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-7">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="min-w-[200px] bg-[#2A2A2A] text-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 border border-zinc-700"
          >
            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-72 object-cover border-b border-zinc-700"
            />

            {/* Content */}
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
    </div>
  );
};

export default Trending;
