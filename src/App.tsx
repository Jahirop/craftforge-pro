import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import LightBackground from "./components/LightBackground";
import CuteRobotBackground from "./components/CuteRobotBackground";
import ChatAssistant from "./components/ChatAssistant";
import ThemeTransitionOverlay from "./components/ThemeTransitionOverlay";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen">
      {isLoading && <LoadingScreen onDone={() => setIsLoading(false)} />}

      {/* Background layer — switches with theme */}
      {isDark ? <Starfield /> : <LightBackground />}
      <CuteRobotBackground />
      <ThemeTransitionOverlay />

      <div className="relative z-10 flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"          element={<Home />}      />
            <Route path="/services"  element={<Services />}  />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about"     element={<About />}     />
            <Route path="/contact"        element={<Contact />}        />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </AnimatePresence>

        <Footer />
        <ChatAssistant />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
