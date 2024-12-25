import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryDetail from "./components/GalleryDetail";
import { AnimatePresence } from "framer-motion";
import Gallery from "./components/Gallery";
import { div } from "framer-motion/client";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
    // <h1 className="text-red-400 text-3xl font-bold underline">Hello world!</h1>
  );
}

export default App;
