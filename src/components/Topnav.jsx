import { useEffect, useRef, useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { MdImageNotSupported } from "react-icons/md";
import axiosInstance from "../utils/axios";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const res = await axiosInstance.get("/search/multi", {
          params: { query: value },
        });
        setResults(res.data.results);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setResults([]);
    }
  };

  

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  const saveRecent = (text) => {
    const t = text.trim();
    if (!t) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== t);
      const next = [t, ...filtered].slice(0, 8);
      localStorage.setItem("recentSearches", JSON.stringify(next));
      return next;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const t = query.trim();
      if (t) {
        saveRecent(t);
        setShowSuggestions(false);
      }
    }
  };

  const handleSelect = (item) => {
    const title = item.title || item.name || item;
    setQuery(title);
    saveRecent(title);
    setResults([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="w-full bg-[#1F1E24] text-white px-6 py-4 flex items-center justify-between relative shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-[#6556CD]">SCSDB</h1>

      {/* Search Bar */}
      <div className="relative w-1/2" ref={containerRef}>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onBlur={() => setShowSuggestions(false)}
          placeholder="Search anything..."
          className="w-full px-4 py-2 pr-10 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
        />
        
        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition text-xl font-bold"
            title="Clear search"
          >
            ✕
          </button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && (results.length > 0 || (query.trim() === "" && recentSearches.length > 0)) && (
          <div className="absolute top-12 left-0 w-full bg-[#1F1E24] text-white rounded-md shadow-lg max-h-80 overflow-y-auto hide-scrollbar z-50 border border-zinc-700">
            {query.trim().length > 2
              ? results.map((item) => (
                  <div
                    key={item.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(item);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-[#6556CD] transition cursor-pointer"
                  >
                    {item.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-10 h-14 object-cover rounded"
                      />
                    ) : (
                      <div className="w-10 h-14 bg-gray-600 rounded flex items-center justify-center">
                        <MdImageNotSupported className="text-gray-300 text-lg" />
                      </div>
                    )}
                    <p className="truncate">{item.title || item.name}</p>
                  </div>
                ))
                : recentSearches.map((text, idx) => (
                  <div
                    key={text + idx}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(text);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-[#6556CD] transition cursor-pointer"
                  >
                    <AiOutlineHistory className="text-gray-400" />
                    <p className="truncate">{text}</p>
                  </div>
                ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Topnav;
