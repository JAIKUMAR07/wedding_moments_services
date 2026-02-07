import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center animate-fadeIn">
      <div className="max-w-lg w-full space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
          <h1 className="relative text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-600">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg">
            This page doesn't exist in the admin panel. Check the URL or return
            to dashboard.
          </p>
        </div>

        <div className="pt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
