import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import GalleryDetail from "./components/GalleryDetail";
import { AnimatePresence } from "framer-motion";
import Gallery from "./components/Gallery";
import Background from "./components/Background";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <Background />
      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
