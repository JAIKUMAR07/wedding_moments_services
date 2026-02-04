import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";
import { OFFERS, FESTIVE_BADGE } from "../data/offers";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [animationStage, setAnimationStage] = useState("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Slide OUT to Left
      setAnimationStage("exiting");

      setTimeout(() => {
        // 2. Update Text and Snap to Right (Instant)
        setCurrentOfferIndex((prev) => (prev + 1) % OFFERS.length);
        setAnimationStage("entering");

        // 3. Small delay then Slide IN to Center
        requestAnimationFrame(() => {
          setTimeout(() => {
            setAnimationStage("idle");
          }, 50);
        });
      }, 500); // Wait for exit animation
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const getTransitionClass = () => {
    switch (animationStage) {
      case "exiting":
        return "opacity-0 -translate-x-8 transition-all duration-500 ease-in-out";
      case "entering":
        return "opacity-0 translate-x-8 transition-none"; // Instant
      case "idle":
        return "opacity-100 translate-x-0 transition-all duration-500 ease-out";
      default:
        return "opacity-100 translate-x-0";
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          {/* Global Offer Badge */}
          <div className="inline-block mb-6 relative group cursor-pointer w-full max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
            <div className="relative bg-black/40 backdrop-blur-md border border-amber-500/30 rounded-full px-6 py-2 flex items-center justify-center gap-3 hover:border-amber-400/60 transition-colors duration-300 min-h-[44px] overflow-hidden">
              <span className="flex h-3 w-3 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span
                className={`text-amber-300 font-medium text-sm tracking-wide text-center block ${getTransitionClass()}`}
              >
                {OFFERS[currentOfferIndex]}
              </span>
              <svg
                className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto mb-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white relative z-10 inline-block">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Services
              </span>
            </h1>

            {/* Festive Offer Badge - Positioned to Right & Larger */}
            <div className="relative mt-8 md:mt-0 md:absolute md:top-1/2 md:-right-24 lg:-right-40 md:-translate-y-1/2 group cursor-pointer z-20">
              <div className="transform hover:scale-110 transition-transform duration-300">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-red-500/50 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>

                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                  {/* Rolling Star / Seal SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full text-amber-500 drop-shadow-2xl animate-spin-slow"
                    style={{ animationDuration: "15s" }}
                  >
                    <defs>
                      <linearGradient
                        id="badgeGradientBig"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#badgeGradientBig)"
                      d="M50 0 L61 15 L78 10 L84 27 L100 35 L95 52 L100 69 L84 77 L78 94 L61 89 L50 104 L39 89 L22 94 L16 77 L0 69 L5 52 L0 35 L16 27 L22 10 L39 15 Z"
                    />
                  </svg>

                  {/* Oscillating Ring */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none animate-pendulum"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      className="stroke-amber-200 stroke-[1.5] fill-none opacity-90 stroke-dasharray-4"
                      strokeDasharray="4 2"
                    />
                    <circle
                      cx="50"
                      cy="10"
                      r="3"
                      className="fill-white animate-ping"
                    />
                  </svg>

                  {/* Badge Content */}
                  <div className="relative z-10 text-center transform -rotate-12">
                    <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-1 shadow-lg border border-red-400/50 ring-2 ring-red-500/30">
                      {FESTIVE_BADGE.title}
                    </div>
                    <div className="font-black text-white leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      <span className="text-3xl md:text-4xl block font-serif tracking-tighter">
                        {FESTIVE_BADGE.mainText}
                      </span>
                      <span className="text-sm md:text-base tracking-[0.3em] block uppercase text-amber-200">
                        {FESTIVE_BADGE.subText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Professional photography services tailored to capture your special
            moments
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300 placeholder-gray-500 backdrop-blur-sm shadow-lg shadow-black/20"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
            <svg
              className="h-16 w-16 text-gray-600 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-white mb-2">
              No services found
            </h3>
            <p className="text-gray-400">
              We couldn't find any services matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-400 mb-6">
              We offer custom photography packages tailored to your specific
              needs. Contact us to discuss your requirements.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
