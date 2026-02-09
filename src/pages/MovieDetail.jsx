import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const MovieDetail = () => {
  const { id } = useParams(); // movie id from route
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/movie/${id}`);
        setMovie(res.data);

        const videoRes = await axiosInstance.get(`/movie/${id}/videos`);
        setTrailer(videoRes.data.results.find(v => v.type === "Trailer"));

        const providerRes = await axiosInstance.get(`/movie/${id}/watch/providers`);
        setProviders(providerRes.data.results.IN); // India providers

        const recRes = await axiosInstance.get(`/movie/${id}/recommendations`);
        setRecommendations(recRes.data.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-[#1F1E24] min-h-screen text-white">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition mb-4">
        ← Back
      </button>

      {/* Poster + Info */}
      <div className="flex gap-6">
        <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} className="rounded-lg shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold">{movie.title} ({movie.release_date?.slice(0,4)})</h2>
          <p className="text-gray-400 mt-2">{movie.overview}</p>
          <p className="mt-2">⭐ User Score: {movie.vote_average * 10}%</p>
          <p className="mt-2">🎬 Genres: {movie.genres.map(g => g.name).join(", ")}</p>

          {/* Play Trailer */}
          {trailer && (
            <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer" className="mt-4 inline-block px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition">
              ▶ Play Trailer
            </a>
          )}

          {/* Availability */}
          {providers && providers.flatrate && (
            <p className="mt-4">Available on: {providers.flatrate.map(p => p.provider_name).join(", ")}</p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Recommended Movies</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-[#2A2A2A] rounded-lg overflow-hidden hover:scale-105 transition">
            <img src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`} alt={rec.title} />
            <p className="p-2 text-sm">{rec.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;