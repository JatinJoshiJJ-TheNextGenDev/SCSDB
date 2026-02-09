import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1F1E24] text-gray-300">
      <h1 className="text-6xl font-bold text-[#6556CD] mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you are looking for doesn’t exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#6556CD] rounded-md hover:bg-[#4d44a3] transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
