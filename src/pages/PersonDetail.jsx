import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const PersonDetail = () => {
  const { id } = useParams(); // person id from route
  const [person, setPerson] = useState(null);
  const [knownFor, setKnownFor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Person details
        const res = await axiosInstance.get(`/person/${id}`);
        setPerson(res.data);

        // Person combined credits (movies + TV shows)
        const creditsRes = await axiosInstance.get(`/person/${id}/combined_credits`);
        setKnownFor(creditsRes.data.cast.slice(0, 12)); // top 12 known-for items
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!person) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="p-6 bg-[#1F1E24] min-h-screen text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition mb-4"
      >
        ← Back
      </button>

      {/* Profile + Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w400${person.profile_path}`}
            alt={person.name}
            className="rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-64 h-80 bg-zinc-800 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div>
          <h2 className="text-3xl font-bold">{person.name}</h2>
          <p className="mt-2 text-gray-400">Popularity: {person.popularity?.toFixed(1)}</p>
          {person.birthday && (
            <p className="mt-2">🎂 Born: {person.birthday}</p>
          )}
          {person.place_of_birth && (
            <p className="mt-2">📍 Place: {person.place_of_birth}</p>
          )}
          {person.biography && (
            <p className="mt-4 text-gray-300">{person.biography}</p>
          )}
        </div>
      </div>

      {/* Known For */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Known For</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {knownFor.map(item => (
          <div
            key={item.id}
            className="bg-[#2A2A2A] rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer"
            onClick={() =>
              navigate(item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`)
            }
          >
            {item.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
              />
            ) : (
              <div className="w-full h-48 bg-zinc-800 flex items-center justify-center text-gray-400">
                No Poster
              </div>
            )}
            <p className="p-2 text-sm">{item.title || item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonDetail;
