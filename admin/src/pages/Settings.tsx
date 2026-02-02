import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import {
  Download,
  Upload,
  RotateCcw,
  Settings as SettingsIcon,
  Shield,
  Database,
  FileJson,
} from "lucide-react";
import {
  exportServicesToJSON,
  importServicesFromJSON,
} from "../utils/localStorage";

const Settings = () => {
  const { services, resetServices } = useAdmin();
  const [importing, setImporting] = useState(false);

  const handleExport = () => {
    exportServicesToJSON(services);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const importedServices = await importServicesFromJSON(file);
      // You can add validation here
      console.log("Imported services:", importedServices);
      alert(
        `Successfully imported ${importedServices.length} services! (Note: This is a preview. Full import functionality requires additional implementation.)`,
      );
    } catch (error) {
      alert("Error importing file. Please check the JSON format.");
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all services to default? This cannot be undone!",
      )
    ) {
      resetServices();
      alert("Services reset to default successfully!");
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage your admin dashboard preferences and data
        </p>
      </div>

      {/* Data Management */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Database className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Data Management
            </h3>
            <p className="text-sm text-gray-400">
              Import, export, and manage your service data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Export */}
          <button
            onClick={handleExport}
            className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 border border-gray-700 hover:border-green-500/30 rounded-xl transition-all duration-300 group"
          >
            <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
              <Download className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-center">
              <p className="font-medium text-white mb-1">Export Data</p>
              <p className="text-xs text-gray-400">Download services as JSON</p>
            </div>
          </button>

          {/* Import */}
          <label className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 border border-gray-700 hover:border-amber-500/30 rounded-xl transition-all duration-300 cursor-pointer group">
            <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
              <Upload className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-center">
              <p className="font-medium text-white mb-1">
                {importing ? "Importing..." : "Import Data"}
              </p>
              <p className="text-xs text-gray-400">Upload JSON file</p>
            </div>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              disabled={importing}
            />
          </label>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 border border-gray-700 hover:border-red-500/30 rounded-xl transition-all duration-300 group"
          >
            <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
              <RotateCcw className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-center">
              <p className="font-medium text-white mb-1">Reset Data</p>
              <p className="text-xs text-gray-400">Restore to defaults</p>
            </div>
          </button>
        </div>
      </div>

      {/* Storage Information */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
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

      {/* Admin Preferences */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <SettingsIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Admin Preferences
            </h3>
            <p className="text-sm text-gray-400">
              Customize your dashboard experience
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Auto-save Changes</p>
              <p className="text-xs text-gray-400">
                Automatically save changes to localStorage
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Confirmation Dialogs</p>
              <p className="text-xs text-gray-400">
                Show confirmation before deleting
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Security & Access
            </h3>
            <p className="text-sm text-gray-400">
              Manage security settings (Coming Soon)
            </p>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-6 text-center">
          <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-400 mb-2">
            Authentication and role management features will be available when
            backend is integrated.
          </p>
          <p className="text-xs text-gray-500">
            Current version: Frontend-only with localStorage
          </p>
        </div>
      </div>

      {/* About */}
      <div className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          About This Dashboard
        </h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>
            <strong className="text-white">Version:</strong> 1.0.0
          </p>
          <p>
            <strong className="text-white">Build:</strong> React + TypeScript +
            Tailwind CSS
          </p>
          <p>
            <strong className="text-white">Storage:</strong> Local Storage
            (Backend-ready)
          </p>
          <p>
            <strong className="text-white">Status:</strong> Production Ready
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
