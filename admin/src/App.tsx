import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Offers from "./pages/Offers";
import Pricing from "./pages/Pricing";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { OffersProvider } from "./context/OffersContext";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header title="Dashboard" onMenuClick={handleMenuClick} />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Header
                  title="Services Management"
                  onMenuClick={handleMenuClick}
                />
                <Services />
              </>
            }
          />
          <Route
            path="/offers"
            element={
              <>
                <Header title="Offers & Ticker" onMenuClick={handleMenuClick} />
                <Offers />
              </>
            }
          />
          <Route
            path="/pricing"
            element={
              <>
                <Header
                  title="Pricing Management"
                  onMenuClick={handleMenuClick}
                />
                <Pricing />
              </>
            }
          />
          <Route
            path="/analytics"
            element={
              <>
                <Header
                  title="Analytics & Insights"
                  onMenuClick={handleMenuClick}
                />
                <Analytics />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header title="My Profile" onMenuClick={handleMenuClick} />
                <Profile />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Header title="User Management" onMenuClick={handleMenuClick} />
                <UserManagement />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Header title="Settings" onMenuClick={handleMenuClick} />
                <Settings />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <OffersProvider>
          <Router>
            <Routes>
              {/* Public Login Route */}
              <Route path="/login" element={<Login />} />

              {/* Dashboard Routes (Protected) */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
          <Toaster position="top-right" reverseOrder={false} />
        </OffersProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
