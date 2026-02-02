import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import type { Service, SubService } from "../types";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  const { addService, updateService } = useAdmin();
  const isEditing = !!service;

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    isActive: true,
  });

  const [subServices, setSubServices] = useState<SubService[]>([]);

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id,
        name: service.name,
        description: service.description,
        image: service.image,
        isActive: service.isActive ?? true,
      });
      setSubServices(service.subServices);
    } else {
      resetForm();
    }
  }, [service]);

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      image: "",
      isActive: true,
    });
    setSubServices([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || subServices.length === 0) {
      alert("Please fill all required fields and add at least one sub-service");
      return;
    }

    const serviceData: Service = {
      id: isEditing ? formData.id : generateId(formData.name),
      name: formData.name,
      description: formData.description,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1000",
      subServices: subServices,
      isActive: formData.isActive,
    };

    if (isEditing) {
      updateService(service.id, serviceData);
    } else {
      addService(serviceData);
    }

    onClose();
    resetForm();
  };

  const generateId = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const addSubService = () => {
    setSubServices([
      ...subServices,
      {
        id: `sub-${Date.now()}`,
        name: "",
        pricePerDay: 0,
      },
    ]);
  };

  const updateSubService = (
    index: number,
    field: keyof SubService,
    value: string | number,
  ) => {
    const updated = [...subServices];
    updated[index] = { ...updated[index], [field]: value };
    setSubServices(updated);
  };

  const removeSubService = (index: number) => {
    setSubServices(subServices.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Service Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., Wedding Photography"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="Describe your service..."
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-3 w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1000";
                }}
              />
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-amber-500 bg-gray-800 border-gray-700 rounded focus:ring-amber-500"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-300"
            >
              Service is Active
            </label>
          </div>

          {/* Sub Services */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300">
                Sub Services <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={addSubService}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Sub Service
              </button>
            </div>

            <div className="space-y-3">
              {subServices.map((sub, index) => (
                <div
                  key={sub.id}
                  className="flex gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) =>
                        updateSubService(index, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Sub-service name"
                      required
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={sub.pricePerDay}
                      onChange={(e) =>
                        updateSubService(
                          index,
                          "pricePerDay",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Price"
                      min="0"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSubService(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {subServices.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No sub-services added yet. Click "Add Sub Service" to start.
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            {isEditing ? "Update Service" : "Add Service"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
