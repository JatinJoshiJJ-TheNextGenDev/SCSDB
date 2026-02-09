import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const TVDetail = () => {
  const { id } = useParams(); // TV show id from route
  const [tv, setTv] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TV show details
        const res = await axiosInstance.get(`/tv/${id}`);
        setTv(res.data);

        // Trailer
        const videoRes = await axiosInstance.get(`/tv/${id}/videos`);
        setTrailer(videoRes.data.results.find(v => v.type === "Trailer"));

        // Availability providers
        const providerRes = await axiosInstance.get(`/tv/${id}/watch/providers`);
        setProviders(providerRes.data.results.IN); // India providers

        // Recommendations
        const recRes = await axiosInstance.get(`/tv/${id}/recommendations`);
        setRecommendations(recRes.data.results);
      } catch (error) {
        console.error("Error fetching TV details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!tv) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="p-6 bg-[#1F1E24] min-h-screen text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition mb-4"
      >
        ← Back
      </button>

      {/* Poster + Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w400${tv.poster_path}`}
          alt={tv.name}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold">
            {tv.name} ({tv.first_air_date?.slice(0,4)})
          </h2>
          <p className="text-gray-400 mt-2">{tv.overview}</p>
          <p className="mt-2">⭐ User Score: {tv.vote_average * 10}%</p>
          <p className="mt-2">🎬 Genres: {tv.genres.map(g => g.name).join(", ")}</p>

          {/* Play Trailer */}
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition"
            >
              ▶ Play Trailer
            </a>
          )}

          {/* Availability */}
          {providers && providers.flatrate && (
            <p className="mt-4">
              Available on: {providers.flatrate.map(p => p.provider_name).join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Seasons */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Seasons</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {tv.seasons.map(season => (
          <div
            key={season.id}
            className="bg-[#2A2A2A] rounded-lg overflow-hidden hover:scale-105 transition"
          >
            {season.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                alt={season.name}
              />
            ) : (
              <div className="w-full h-48 bg-zinc-800 flex items-center justify-center text-gray-400">
                No Poster
              </div>
            )}
            <p className="p-2 text-sm">{season.name} ({season.air_date?.slice(0,4)})</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Recommended Series</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {recommendations.map(rec => (
          <div
            key={rec.id}
            className="bg-[#2A2A2A] rounded-lg overflow-hidden hover:scale-105 transition"
            onClick={() => navigate(`/tv/${rec.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
              alt={rec.name}
            />
            <p className="p-2 text-sm">{rec.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVDetail;
