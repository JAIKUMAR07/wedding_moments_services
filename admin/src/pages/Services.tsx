import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import {
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Search,
  Filter,
} from "lucide-react";
import ServiceModal from "../components/ServiceModal";
import type { Service } from "../types";

const Services = () => {
  const { services, deleteService, toggleServiceStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && service.isActive) ||
      (filterStatus === "inactive" && !service.isActive);

    return matchesSearch && matchesFilter;
  });

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteService(id);
    }
  };

  const handleToggleStatus = (id: string) => {
    toggleServiceStatus(id);
  };

  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Services Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your photography services and packages
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Filter services by status"
            >
              <option value="all">All Services</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    service.isActive
                      ? "bg-green-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Sub Services */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">
                  {service.subServices.length} Sub Services
                </p>
                <div className="space-y-1">
                  {service.subServices.slice(0, 2).map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-400">{sub.name}</span>
                      <span className="text-amber-400 font-medium">
                        ₹{sub.pricePerDay}/day
                      </span>
                    </div>
                  ))}
                  {service.subServices.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{service.subServices.length - 2} more
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                <button
                  onClick={() => handleToggleStatus(service.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    service.isActive
                      ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                  }`}
                  title={service.isActive ? "Disable" : "Enable"}
                >
                  {service.isActive ? (
                    <PowerOff className="w-4 h-4" />
                  ) : (
                    <Power className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-medium transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(service.id, service.name)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-sm font-medium transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No services found
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          {searchTerm || filterStatus !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Add Your First Service
            </button>
          )}
        </div>
      )}

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

export default Services;
