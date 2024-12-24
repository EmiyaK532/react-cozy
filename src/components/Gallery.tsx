import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Gallery() {
  const navigate = useNavigate();

  const galleryItems = [
    {
      id: "white",
      title: "WHITE",
      character: "yuuki",
      quote: "I believe we can see someday again",
      image: "/images/01.jpg",
      style: { top: "30%", left: "25%" },
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
      style: { top: "35%", left: "75%" },
    },
  ];

  return (
    <motion.div
      className="app"
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <motion.div
        className="header"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
        }}
      >
        <h1 className="gallery-title">GALLERY</h1>
        <p className="subtitle">Shiraha Nanami, a galgame lover.</p>
      </motion.div>
      <motion.h2
        className="about-title"
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 0.08, scale: 1 },
        }}
      >
        ABOUT
      </motion.h2>
      <div className="gallery-container">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="gallery-item"
            style={item.style}
            variants={{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            onClick={() => navigate(`/gallery/${item.id}`)}
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Gallery;
