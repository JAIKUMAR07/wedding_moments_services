import { Link } from "react-router-dom";
import type { Service } from "../types";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

        {/* Offer Badge */}
        {service.offer && (
          <div className="absolute top-4 right-4 z-10">
            <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg shadow-red-500/20 animate-pulse">
              <span className="relative z-10">{service.offer}</span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full animate-shimmer"></div>
            </div>
          </div>
        )}

        {/* Service Name on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-serif font-bold text-white mb-1">
            {service.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-300 mb-6 line-clamp-2">{service.description}</p>

        {/* Sub-services count */}
        <div className="flex items-center gap-2 mb-6 text-sm text-amber-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>{service.subServices.length} services available</span>
        </div>

        {/* Button */}
        <Link
          to={`/services/${service.id}`}
          className="block w-full text-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50 group-hover:scale-105"
        >
          View Services
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
