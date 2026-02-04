import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import type { Service, SubService } from "../types";
import { PRICING_TYPES } from "../utils/pricing";

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
    offer: "",
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
        offer: service.offer || "",
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
      offer: "",
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
      offer: formData.offer,
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
        pricingType: "per-day", // Default pricing type
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isEditing ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Close"
            aria-label="Close modal"
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

          {/* Offer Badge Text - New Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Offer Badge Text (Optional)
            </label>
            <input
              type="text"
              value={formData.offer || ""}
              onChange={(e) =>
                setFormData({ ...formData, offer: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., 20% OFF, Special Deal"
            />
            <p className="text-xs text-gray-500 mt-1">
              This text will appear in the red badge on the service card.
            </p>
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
                  className="relative flex flex-wrap gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg pt-8"
                >
                  {/* Delete Button - Top Right */}
                  <button
                    type="button"
                    onClick={() => removeSubService(index)}
                    className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Remove sub-service"
                    aria-label="Remove sub-service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex-1 min-w-[200px]">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Name
                    </label>
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
                    <label className="text-xs text-gray-500 mb-1 block">
                      Original Price
                    </label>
                    <input
                      type="number"
                      value={sub.originalPrice || ""}
                      onChange={(e) =>
                        updateSubService(
                          index,
                          "originalPrice",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 line-through"
                      placeholder="Optional"
                      min="0"
                    />
                  </div>
                  <div className="w-40 flex flex-col gap-2">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Pricing Unit
                      </label>
                      <select
                        value={sub.pricingType || "per-day"}
                        onChange={(e) =>
                          updateSubService(index, "pricingType", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        aria-label="Pricing type"
                      >
                        {PRICING_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {sub.pricingType === "manual" && (
                      <div>
                        <input
                          type="text"
                          value={sub.customUnit || ""}
                          onChange={(e) =>
                            updateSubService(
                              index,
                              "customUnit",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-amber-400 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                          placeholder="e.g. per 50 photos"
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-32">
                    <label className="text-xs text-amber-500/80 mb-1 block">
                      Sale Price
                    </label>
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
                      className="w-full px-3 py-2 bg-gray-900 border border-amber-500/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                      placeholder="Price"
                      min="0"
                      required
                    />
                  </div>
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
