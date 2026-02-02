import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="flex min-h-screen bg-black">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 ml-64">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header title="Dashboard" />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/services"
                element={
                  <>
                    <Header title="Services Management" />
                    <Services />
                  </>
                }
              />
              <Route
                path="/pricing"
                element={
                  <>
                    <Header title="Pricing Management" />
                    <Pricing />
                  </>
                }
              />
              <Route
                path="/analytics"
                element={
                  <>
                    <Header title="Analytics & Insights" />
                    <Analytics />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <Header title="Settings" />
                    <Settings />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
