import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useServices } from "../context/ServicesContext";
import { useCart } from "../context/CartContext";
import type { SubService } from "../types";

const ServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getServiceById, loading } = useServices();
  const service = serviceId ? getServiceById(serviceId) : undefined;

  const [selectedSubServices, setSelectedSubServices] = useState<SubService[]>(
    [],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-white mb-4">
            Service Not Found
          </h2>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const handleDaysChange = (subServiceId: string, change: number) => {
    setSelectedSubServices((prev) => {
      const existing = prev.find((s) => s.id === subServiceId);

      if (existing) {
        const newDays = existing.days + change;

        // If days reach 0, remove the service from selection
        if (newDays <= 0) {
          return prev.filter((s) => s.id !== subServiceId);
        }

        // Otherwise update the days
        return prev.map((s) =>
          s.id === subServiceId ? { ...s, days: newDays } : s,
        );
      } else {
        // Adding new service, start with 1 day
        const subService = service.subServices.find(
          (s) => s.id === subServiceId,
        );
        if (subService) {
          return [...prev, { ...subService, days: 1 }];
        }
      }
      return prev;
    });
  };

  const getSubServiceDays = (subServiceId: string): number => {
    const found = selectedSubServices.find((s) => s.id === subServiceId);
    return found ? found.days : 0;
  };

  const getSubServiceTotal = (subService: SubService): number => {
    return subService.pricePerDay * subService.days;
  };

  const getTotalPrice = (): number => {
    return selectedSubServices.reduce(
      (total, sub) => total + sub.pricePerDay * sub.days,
      0,
    );
  };

  const handleAddToCart = () => {
    if (selectedSubServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    addToCart({
      serviceId: service.id,
      serviceName: service.name,
      subServices: selectedSubServices,
      totalPrice: getTotalPrice(),
    });

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Service Image */}
          <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Service Info */}
          <div>
            <h1 className="text-5xl font-serif font-bold text-white mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-gray-400 mb-8">{service.description}</p>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-serif font-semibold text-white mb-4">
                Available Services
              </h3>
              <p className="text-gray-400 mb-6">
                Select the services you need and choose the number of days
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Services Selection */}
        <div className="space-y-6 mb-12">
          {service.subServices.map((subService) => {
            const days = getSubServiceDays(subService.id);
            const isSelected = days > 0;

            return (
              <div
                key={subService.id}
                className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
                  isSelected
                    ? "border-amber-400/50 shadow-lg shadow-amber-500/20"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Service Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {subService.name}
                    </h3>
                    <div className="flex flex-col">
                      {subService.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">
                          ₹{subService.originalPrice}
                        </span>
                      )}
                      <p className="text-amber-400 text-lg font-medium">
                        ₹{subService.pricePerDay} INR{" "}
                        {subService.pricingType === "manual"
                          ? subService.customUnit || ""
                          : subService.pricingType === "per-piece"
                            ? "per piece"
                            : subService.pricingType === "per-hour"
                              ? "per hour"
                              : subService.pricingType === "per-event"
                                ? "per event"
                                : "per day"}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDaysChange(subService.id, -1)}
                        disabled={days === 0}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 disabled:opacity-30 disabled:hover:bg-white/10 transition-colors flex items-center justify-center text-white font-bold"
                      >
                        −
                      </button>
                      <div className="w-16 text-center">
                        <div className="text-2xl font-bold text-white">
                          {days}
                        </div>
                        <div className="text-xs text-gray-400">
                          {subService.pricingType === "manual"
                            ? "units" // Generic for manual
                            : subService.pricingType === "per-piece"
                              ? "pcs"
                              : subService.pricingType === "per-hour"
                                ? "hrs"
                                : subService.pricingType === "per-event"
                                  ? "events"
                                  : "days"}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDaysChange(subService.id, 1)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 transition-colors flex items-center justify-center text-white font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    {isSelected && (
                      <div className="text-right min-w-[120px]">
                        <div className="text-sm text-gray-400">Subtotal</div>
                        <div className="text-xl font-bold text-amber-400">
                          ₹
                          {getSubServiceTotal(
                            selectedSubServices.find(
                              (s) => s.id === subService.id,
                            )!,
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total and Add to Cart */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-serif font-semibold text-white mb-2">
                Total Price
              </h3>
              <p className="text-gray-400">
                {selectedSubServices.length} service(s) selected
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-bold text-amber-400">
                  ₹{getTotalPrice()}
                </div>
                <div className="text-sm text-gray-400">INR</div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={selectedSubServices.length === 0}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-amber-500 disabled:hover:to-amber-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
