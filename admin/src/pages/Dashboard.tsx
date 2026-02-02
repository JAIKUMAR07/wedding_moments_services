import {
  Package,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import StatsCard from "../components/StatsCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { services, getServiceStats } = useAdmin();
  const stats = getServiceStats();

  const recentServices = services.slice(0, 5);

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Services"
          value={stats.totalServices}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
          iconColor="text-blue-400"
          iconBgColor="bg-blue-500/10"
        />
        <StatsCard
          title="Active Services"
          value={stats.activeServices}
          icon={CheckCircle}
          iconColor="text-green-400"
          iconBgColor="bg-green-500/10"
        />
        <StatsCard
          title="Average Price"
          value={`₹${stats.averagePricePerDay}`}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
          iconColor="text-amber-400"
          iconBgColor="bg-amber-500/10"
        />
        <StatsCard
          title="Sub Services"
          value={stats.totalSubServices}
          icon={Activity}
          iconColor="text-purple-400"
          iconBgColor="bg-purple-500/10"
        />
      </div>

      {/* Charts and Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Range */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Price Range Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-400">Highest Price</span>
              <span className="text-2xl font-bold text-green-400">
                ₹{stats.highestPrice}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-400">Average Price</span>
              <span className="text-2xl font-bold text-amber-400">
                ₹{stats.averagePricePerDay}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-400">Lowest Price</span>
              <span className="text-2xl font-bold text-blue-400">
                ₹{stats.lowestPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Service Status */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            Service Status Distribution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Active Services</span>
                <span className="text-sm font-medium text-green-400">
                  {stats.activeServices} (
                  {Math.round(
                    (stats.activeServices / stats.totalServices) * 100,
                  )}
                  %)
                </span>
              </div>
              <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats.activeServices / stats.totalServices) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Inactive Services</span>
                <span className="text-sm font-medium text-red-400">
                  {stats.inactiveServices} (
                  {Math.round(
                    (stats.inactiveServices / stats.totalServices) * 100,
                  )}
                  %)
                </span>
              </div>
              <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats.inactiveServices / stats.totalServices) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Services */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Services</h3>
          <Link
            to="/services"
            className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Service Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Sub Services
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {recentServices.map((service) => (
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
                  <td className="py-4 px-4 text-gray-400">
                    {service.subServices.length} items
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        service.isActive
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {service.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Inactive
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {service.updatedAt
                      ? new Date(service.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/services"
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 group"
        >
          <Package className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-lg font-semibold text-white mb-2">
            Manage Services
          </h4>
          <p className="text-sm text-gray-400">
            Add, edit, or remove photography services
          </p>
        </Link>

        <Link
          to="/pricing"
          className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all duration-300 group"
        >
          <DollarSign className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-lg font-semibold text-white mb-2">
            Update Pricing
          </h4>
          <p className="text-sm text-gray-400">
            Modify service prices and packages
          </p>
        </Link>

        <Link
          to="/analytics"
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 group"
        >
          <Activity className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-lg font-semibold text-white mb-2">
            View Analytics
          </h4>
          <p className="text-sm text-gray-400">
            Track performance and insights
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
