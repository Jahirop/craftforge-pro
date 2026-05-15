import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import CuteRobotBackground from "./components/CuteRobotBackground";
import ChatAssistant from "./components/ChatAssistant";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen">
      <Starfield />              {/* z-index: -10 — dark base + star warp  */}
      <CuteRobotBackground />   {/* z-index: 0  — robot + full-screen glow */}

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"          element={<Home />}      />
          <Route path="/services"  element={<Services />}  />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about"     element={<About />}     />
          <Route path="/contact"   element={<Contact />}   />
        </Routes>
      </AnimatePresence>

      <Footer />
      <ChatAssistant />
    </div>
  );
}
