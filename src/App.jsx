import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import Trending from "./pages/Trending";   // ✅ Trending page import
import Popular from "./pages/Popular";     // ✅ Popular page import
import Movies from "./pages/Movies";       // ✅ Movies page import
import TV from "./pages/TV";               // ✅ TV Shows page import
import People from "./pages/People";       // ✅ People page import

// ✅ Detail pages
import MovieDetail from "./pages/MovieDetail";
import TVDetail from "./pages/TVDetail";
import PersonDetail from "./pages/PersonDetail";

import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate initial load (API call ya setup)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // ✅ global loader dikh raha hai
  }

  return (
    <div className="w-screen h-screen bg-[#1F1E24] text-white">
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Trending route */}
        <Route path="/trending" element={<Trending />} />

        {/* Popular route */}
        <Route path="/popular" element={<Popular />} />

        {/* Movies route */}
        <Route path="/movies" element={<Movies />} />

        {/* TV Shows route */}
        <Route path="/tv" element={<TV />} />

        {/* People route */}
        <Route path="/people" element={<People />} />

        {/* Detail routes */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/tv/:id" element={<TVDetail />} />
        <Route path="/person/:id" element={<PersonDetail />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
