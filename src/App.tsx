import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryDetail from "./components/GalleryDetail";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Gallery from "./components/Gallery";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
