import { useEffect } from "react";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";
import Header from "./Header";
import Trending from "./Trending";

const Home = () => {
  // Set document title only when Home mounts
  useEffect(() => {
    document.title = "SCSDB | Homepage";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixed */}
      <Sidenav />

      {/* Main content scrollable */}
      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar hide-scrollbar bg-[#1F1E24]">
        {/* Topnav with bottom border */}
        <div className="border-b border-zinc-700">
          <Topnav />
        </div>

        {/* Header with bottom border */}
        <div className="border-b border-zinc-700">
          <Header />
        </div>

        {/* Trending section with top border */}
        <div className="border-t border-zinc-700">
          <Trending />
        </div>
      </div>
    </div>
  );
};

export default Home;
