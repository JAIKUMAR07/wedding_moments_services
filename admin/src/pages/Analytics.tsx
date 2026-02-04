import { useAdmin } from "../context/AdminContext";
import {
  TrendingUp,
  Package,
  DollarSign,
  BarChart2,
  PieChart,
} from "lucide-react";

const Analytics = () => {
  const { services, getServiceStats } = useAdmin();
  const stats = getServiceStats();

  // Calculate service-wise statistics
  const serviceAnalytics = services.map((service) => {
    const totalPrice = service.subServices.reduce(
      (sum, sub) => sum + sub.pricePerDay,
      0,
    );
    const avgPrice =
      service.subServices.length > 0
        ? Math.round(totalPrice / service.subServices.length)
        : 0;

    return {
      ...service,
      totalPrice,
      avgPrice,
    };
  });

  // Sort services by total price
  const topServices = [...serviceAnalytics].sort(
    (a, b) => b.totalPrice - a.totalPrice,
  );

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
        <p className="text-sm text-gray-400 mt-1">
          Track performance and service statistics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">Total Services</p>
          <p className="text-3xl font-bold text-white mb-2">
            {stats.totalServices}
          </p>
          <p className="text-xs text-green-400">Active services ready</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-amber-500/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-amber-400" />
            </div>
            <BarChart2 className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">Average Price</p>
          <p className="text-3xl font-bold text-white mb-2">
            ₹{stats.averagePricePerDay}
          </p>
          <p className="text-xs text-gray-400">Per day per service</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <PieChart className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">Highest Price</p>
          <p className="text-3xl font-bold text-white mb-2">
            ₹{stats.highestPrice}
          </p>
          <p className="text-xs text-gray-400">Premium service</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Package className="w-6 h-6 text-purple-400" />
            </div>
            <BarChart2 className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">Sub Services</p>
          <p className="text-3xl font-bold text-white mb-2">
            {stats.totalSubServices}
          </p>
          <p className="text-xs text-gray-400">Total offerings</p>
        </div>
      </div>

      {/* Service Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services by Price */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Top Services by Total Price
          </h3>
          <div className="space-y-4">
            {topServices.slice(0, 5).map((service, index) => (
              <div key={service.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-white">{service.name}</p>
                  <p className="text-xs text-gray-400">
                    {service.subServices.length} sub-services
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-400">
                    ₹{service.totalPrice}
                  </p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Distribution */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            Price Distribution
          </h3>
          <div className="space-y-4">
            {topServices.map((service) => {
              const percentage = Math.round(
                (service.totalPrice /
                  topServices.reduce((sum, s) => sum + s.totalPrice, 0)) *
                  100,
              );

              return (
                <div key={service.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{service.name}</span>
                    <span className="text-sm font-medium text-gray-400">
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Service Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          Detailed Service Analytics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Service
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">
                  Sub Services
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Total Price
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Avg Price
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Price Range
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceAnalytics.map((service) => {
                const prices = service.subServices.map((s) => s.pricePerDay);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);

                return (
                  <tr
                    key={service.id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-white">
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          service.isActive
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-300">
                      {service.subServices.length}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-amber-400">
                      ₹{service.totalPrice}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-300">
                      ₹{service.avgPrice}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-gray-400">
                      ₹{minPrice} - ₹{maxPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-blue-500/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Service Availability</p>
          <p className="text-2xl font-bold text-white mb-3">
            {Math.round((stats.activeServices / stats.totalServices) * 100)}%
          </p>
          <p className="text-xs text-gray-500">
            {stats.activeServices} out of {stats.totalServices} services active
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 border border-amber-500/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Price Coverage</p>
          <p className="text-2xl font-bold text-white mb-3">
            ₹{stats.lowestPrice} - ₹{stats.highestPrice}
          </p>
          <p className="text-xs text-gray-500">Range across all services</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/5 to-green-600/5 border border-green-500/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Catalog Size</p>
          <p className="text-2xl font-bold text-white mb-3">
            {stats.totalSubServices}
          </p>
          <p className="text-xs text-gray-500">Total service offerings</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
