import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
      <Helmet>
        <title>Page Not Found | Wedding Moments Studio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-lg w-full space-y-8 animate-fadeIn">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full"></div>
          <h1 className="relative text-9xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-b from-amber-200 to-amber-600">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
