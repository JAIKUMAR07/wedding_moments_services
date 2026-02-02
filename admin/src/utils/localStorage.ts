import type { Service } from "../types";

const STORAGE_KEY = "wedding-moments-admin-services";

export const saveServicesToStorage = (services: Service[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadServicesFromStorage = (): Service[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

// Export services to JSON file
export const exportServicesToJSON = (services: Service[]): void => {
  const dataStr = JSON.stringify(services, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `services-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Import services from JSON file
export const importServicesFromJSON = (file: File): Promise<Service[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const services = JSON.parse(e.target?.result as string);
        resolve(services);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };

    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};
