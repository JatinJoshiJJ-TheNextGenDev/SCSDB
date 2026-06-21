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
    <div className="flex w-full min-h-screen relative">
      {/* Sidebar fixed */}
      <div className="fixed top-0 left-0 h-screen shrink-0 w-64 z-50">
        <Sidenav />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-[#1F1E24] overflow-x-hidden ml-64">
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
