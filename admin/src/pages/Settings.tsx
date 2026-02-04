import { useAdmin } from "../context/AdminContext";
import { FileJson } from "lucide-react";

const Settings = () => {
  const { services } = useAdmin();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage system configurations and security preferences
        </p>
      </div>

      {/* Storage Information */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <FileJson className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Storage Information
            </h3>
            <p className="text-sm text-gray-400">Current data statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Total Services</p>
            <p className="text-2xl font-bold text-white">{services.length}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Total Sub-Services</p>
            <p className="text-2xl font-bold text-white">
              {services.reduce((sum, s) => sum + s.subServices.length, 0)}
            </p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Storage Used</p>
            <p className="text-2xl font-bold text-white">
              {Math.round(JSON.stringify(services).length / 1024)} KB
            </p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Last Updated</p>
            <p className="text-2xl font-bold text-white">
              {services[0]?.updatedAt
                ? new Date(services[0].updatedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
