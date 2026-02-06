import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ServicesProvider } from "./context/ServicesContext";
import { OffersProvider } from "./context/OffersContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import "./App.css";

function App() {
  return (
    <ServicesProvider>
      <OffersProvider>
        <CartProvider>
          <Router>
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
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </OffersProvider>
    </ServicesProvider>
  );
}

export default App;
