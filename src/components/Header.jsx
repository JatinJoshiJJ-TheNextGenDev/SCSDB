import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const Header = () => {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosInstance.get("/trending/all/day");
        const random =
          res.data.results[Math.floor(Math.random() * res.data.results.length)];
        setFeatured(random);
      } catch (error) {
        console.error("Error fetching featured content:", error);
      }
    };
    fetchFeatured();
  }, []);

  // Poster section only when featured is available
  if (!featured) return null; // ❌ local loader removed

  return (
    <div
      className="relative h-[70vh] w-full bg-cover bg-center text-white flex flex-col justify-end p-8"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          featured.backdrop_path || featured.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-4xl font-bold drop-shadow-lg">
          {featured.title || featured.name}
        </h2>
        <p className="mt-3 text-sm text-gray-300 line-clamp-3">
          {featured.overview}
        </p>
        <button className="mt-5 px-5 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition">
          Watch Trailer
        </button>
      </div>
    </div>
  );
};

export default Header;
