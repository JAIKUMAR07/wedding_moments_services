import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { DollarSign, Save, RotateCcw } from "lucide-react";
import type { Service, SubService } from "../types";

const Pricing = () => {
  const { services, updateService } = useAdmin();
  const [hasChanges, setHasChanges] = useState(false);
  const [editedServices, setEditedServices] = useState<Service[]>([
    ...services,
  ]);

  const handlePriceChange = (
    serviceId: string,
    subServiceId: string,
    newPrice: number,
  ) => {
    setHasChanges(true);
    setEditedServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              subServices: service.subServices.map((sub) =>
                sub.id === subServiceId
                  ? { ...sub, pricePerDay: newPrice }
                  : sub,
              ),
            }
          : service,
      ),
    );
  };

  const handleSaveAll = () => {
    editedServices.forEach((service) => {
      updateService(service.id, { subServices: service.subServices });
    });
    setHasChanges(false);
    alert("All prices updated successfully!");
  };

  const handleReset = () => {
    setEditedServices([...services]);
    setHasChanges(false);
  };

  const calculateServiceTotal = (subServices: SubService[]) => {
    return subServices.reduce((sum, sub) => sum + sub.pricePerDay, 0);
  };

  const calculateGrandTotal = () => {
    return editedServices.reduce(
      (total, service) => total + calculateServiceTotal(service.subServices),
      0,
    );
  };

  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Pricing Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Update service prices centrally
          </p>
        </div>
        {hasChanges && (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save All Changes
            </button>
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Total Services</p>
          <p className="text-3xl font-bold text-white">
            {editedServices.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Total Sub-Services</p>
          <p className="text-3xl font-bold text-white">
            {editedServices.reduce((sum, s) => sum + s.subServices.length, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Average Price</p>
          <p className="text-3xl font-bold text-white">
            ₹
            {Math.round(
              calculateGrandTotal() /
                editedServices.reduce(
                  (sum, s) => sum + s.subServices.length,
                  0,
                ),
            )}
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
        {editedServices.map((service) => (
          <div
            key={service.id}
            className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden"
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
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Service Total</p>
                <p className="text-2xl font-bold text-amber-400">
                  ₹{calculateServiceTotal(service.subServices)}
                </p>
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
                          <input
                            type="number"
                            value={sub.pricePerDay}
                            onChange={(e) =>
                              handlePriceChange(
                                service.id,
                                sub.id,
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-right focus:outline-none focus:ring-2 focus:ring-amber-500"
                            min="0"
                            step="100"
                          />
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

      {/* Bottom Save Button */}
      {hasChanges && (
        <div className="fixed bottom-8 right-8 z-30">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-3 px-6 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 animate-scaleIn"
          >
            <Save className="w-5 h-5" />
            <span>Save All Changes</span>
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
              {editedServices.reduce((sum, s) => sum + s.subServices.length, 0)}{" "}
              prices
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pricing;
