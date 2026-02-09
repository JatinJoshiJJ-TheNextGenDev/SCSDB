import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const Header = () => {
  const [featured, setFeatured] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosInstance.get("/trending/all/day");
        const random =
          res.data.results[Math.floor(Math.random() * res.data.results.length)];
        setFeatured(random);

        // Fetch trailer for that featured item
        if (random.media_type === "movie") {
          const videoRes = await axiosInstance.get(`/movie/${random.id}/videos`);
          setTrailer(videoRes.data.results.find(v => v.type === "Trailer"));
        } else if (random.media_type === "tv") {
          const videoRes = await axiosInstance.get(`/tv/${random.id}/videos`);
          setTrailer(videoRes.data.results.find(v => v.type === "Trailer"));
        }
      } catch (error) {
        console.error("Error fetching featured content:", error);
      }
    };
    fetchFeatured();
  }, []);

  if (!featured) return null;

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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-4xl font-bold drop-shadow-lg">
          {featured.title || featured.name}
        </h2>
        <p className="mt-3 text-sm text-gray-300 line-clamp-3">
          {featured.overview}
        </p>

        {trailer && (
          <button
            onClick={() => setShowTrailer(true)}
            className="mt-5 px-5 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition"
          >
            ▶ Watch Trailer
          </button>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
            className="rounded-lg shadow-2xl"
          ></iframe>
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
