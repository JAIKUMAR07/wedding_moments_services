import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ServicesProvider } from "./context/ServicesContext";
import { OffersProvider } from "./context/OffersContext";
import { ConfigProvider } from "./context/ConfigContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ConfigProvider>
      <ServicesProvider>
        <OffersProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-black">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route
                      path="/services/:serviceId"
                      element={<ServiceDetails />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </OffersProvider>
      </ServicesProvider>
    </ConfigProvider>
  );
}

export default App;
