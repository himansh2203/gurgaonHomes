import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Admin from "./admin/Admin";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Properties from "./pages/Properties";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function AppRoutes() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith("/admin");

  return (
    <div className="gh-app">
      {!hideChrome && <Navbar />}

      <main className="gh-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!hideChrome && <Footer />}

      {/* WhatsApp floating button (hidden on admin) */}
      {!hideChrome && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
