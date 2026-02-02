import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { Edit2, DollarSign } from "lucide-react";
import ServiceModal from "../components/ServiceModal";
import type { Service, SubService } from "../types";
import { getPricingUnit } from "../utils/pricing";

const Pricing = () => {
  const { services } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const calculateServiceTotal = (subServices: SubService[]) => {
    return subServices.reduce((sum, sub) => sum + sub.pricePerDay, 0);
  };

  const calculateGrandTotal = () => {
    return services.reduce(
      (total, service) => total + calculateServiceTotal(service.subServices),
      0,
    );
  };

  const calculateAveragePrice = () => {
    const totalSubServices = services.reduce(
      (sum, s) => sum + s.subServices.length,
      0,
    );
    return totalSubServices > 0
      ? Math.round(calculateGrandTotal() / totalSubServices)
      : 0;
  };

  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Pricing Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            View and manage service pricing
          </p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Total Services</p>
          <p className="text-3xl font-bold text-white">{services.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Total Sub-Services</p>
          <p className="text-3xl font-bold text-white">
            {services.reduce((sum, s) => sum + s.subServices.length, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Average Price</p>
          <p className="text-3xl font-bold text-white">
            ₹{calculateAveragePrice()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Grand Total</p>
          <p className="text-3xl font-bold text-white">
            ₹{calculateGrandTotal()}
          </p>
        </div>
      </div>

      {/* Pricing Tables */}
      <div className="space-y-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300"
          >
            {/* Service Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800/80 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {service.subServices.length} sub-services
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">Service Total</p>
                  <p className="text-2xl font-bold text-amber-400">
                    ₹{calculateServiceTotal(service.subServices)}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(service)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-all duration-300"
                  title="Edit Service"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </div>
            </div>

            {/* Sub Services Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-400">
                      Sub-Service
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-400">
                      ID
                    </th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-gray-400">
                      Price per Day (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {service.subServices.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-t border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="font-medium text-white">
                          {sub.name}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <code className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                          {sub.id}
                        </code>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-lg font-semibold text-white">
                            {sub.pricePerDay}
                          </span>
                          <span className="text-sm text-gray-400">
                            {getPricingUnit(sub.pricingType)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        service={editingService}
      />
    </div>
  );
};

export default Pricing;
