import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryDetail from "./components/GalleryDetail";

function App() {
  const galleryItems = [
    {
      id: "white",
      title: "WHITE",
      character: "yuuki",
      quote: "I believe we can see someday again",
      image: "/images/01.jpg",
      style: { top: "35%", left: "20%" },
    },
    {
      id: "night",
      title: "NIGHT",
      character: "kuro",
      quote: "as the Reincarnation",
      image: "/images/02.jpg",
      style: { top: "25%", left: "50%" },
    },
    {
      id: "clover",
      title: "CLOVER",
      character: "anzu",
      quote: "Looking for a clover day's",
      image: "/images/03.jpg",
      style: { top: "45%", left: "80%" },
    },
  ];

  return (
    // <div className="howhite">
    //   <div className="hello">HoWhite</div>
    // </div>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <div className="header">
                <h1 className="gallery-title">GALLERY</h1>
                <p className="subtitle">Shiraha Nanami, a galgame lover.</p>
              </div>
              <h2 className="about-title">ABOUT</h2>
              <div className="gallery-container">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="gallery-item"
                    style={item.style}
                    onClick={() =>
                      (window.location.href = `/gallery/${item.id}`)
                    }
                  >
                    <div className="image-wrapper">
                      <img
                        src={item.image}
                        alt={item.character}
                        className="gallery-image grayscale"
                      />
                    </div>
                    <div className="item-content">
                      <div className="title-box">{item.title}</div>
                      <div className="character-name">{item.character}</div>
                      <div className="quote">"{item.quote}"</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/gallery/:id" element={<GalleryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
