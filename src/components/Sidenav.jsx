import { NavLink } from "react-router-dom";
import { FaFire, FaStar, FaFilm, FaTv, FaUser, FaInfoCircle, FaPhone } from "react-icons/fa";

const Sidenav = () => {
  const mainLinks = [
    { name: "Trending", path: "/trending", icon: <FaFire /> },
    { name: "Popular", path: "/popular", icon: <FaStar /> },
    { name: "Movies", path: "/movies", icon: <FaFilm /> },
    { name: "TV Shows", path: "/tv", icon: <FaTv /> },
    { name: "People", path: "/people", icon: <FaUser /> },
  ];

  const infoLinks = [
    { name: "About SCSDB", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact Us", path: "/contact", icon: <FaPhone /> },
  ];

  return (
    <aside className="w-64 h-screen bg-[#1F1E24] text-white flex flex-col justify-between border-r-4 border-zinc-700">
      {/* Top Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8 text-[#6556CD]">SCSDB</h1>
        <h2 className="text-lg font-semibold mb-4 text-gray-400">New Feeds</h2>
        <ul className="space-y-3 border-b-2 border-zinc-700 pb-6">
          {mainLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-[#6556CD] text-white"
                      : "hover:bg-[#6556CD] hover:text-white text-gray-300"
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-400">Website Information</h2>
        <ul className="space-y-3">
          {infoLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-[#6556CD] text-white"
                      : "hover:bg-[#6556CD] hover:text-white text-gray-300"
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 text-sm text-gray-500">
        <p>© 2026 SCSDB</p>
      </div>
    </aside>
  );
};

export default Sidenav;

