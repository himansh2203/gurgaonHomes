import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./admin/Admin";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Properties from "./pages/Properties";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function AppRoutes() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideChrome && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {!hideChrome && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
