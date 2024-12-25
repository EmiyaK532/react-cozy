import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Gallery() {
  const navigate = useNavigate();

  const items = [
    {
      id: "white",
      title: "WHITE",
      character: "yuuki",
      quote: "I believe we can see someday again",
      subQuote: "white eternity...",
      image: "/images/01.jpg",
    },
    {
      id: "butterfly",
      title: "BUTTERFLY",
      character: "shiraha",
      quote: "Before the Blue",
      subQuote: "The end of the story promise",
      image: "/images/02.jpg",
    },
    {
      id: "letter",
      title: "LETTER",
      character: "sena",
      quote: "Our first promise and your words I wanted to express",
      subQuote: "und Im Thale blüht der Frühling auf",
      image: "/images/03.jpg",
    },
  ];

  const decorativeItems = [
    { text: "APPLE", top: "75%", left: "25%" },
    { text: "SUNFLOWER", top: "85%", left: "45%" },
    { text: "STAR", top: "80%", left: "65%" },
    { text: "MARE", top: "70%", left: "85%" },
    { text: "EMOTION", top: "35%", right: "15%" },
    { text: "THERAPY", top: "55%", left: "55%" },
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <motion.div
        className="relative z-10 px-8 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-block bg-black px-6 py-2 -rotate-3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-white text-2xl font-bold">GALLERY</h1>
        </motion.div>
        <p className="mt-4 text-sm text-gray-600">
          Shiraha Nanami, a galgame lover.
        </p>
      </motion.div>

      {/* Central ABOUT text */}
      <motion.h2
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black tracking-wider opacity-5 pointer-events-none whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        ABOUT
      </motion.h2>

      {/* Main Content */}
      <div className="relative w-full h-[85vh] px-[5vw]">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute w-[25vw] min-w-[280px] max-w-[400px]"
            style={{
              left: `${25 + index * 25}%`,
              top: `${20 + (index % 2) * 10}%`,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="relative mb-4 aspect-[3/4] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <motion.div
                className="absolute -bottom-3 left-4 bg-white border-2 border-black px-4 py-1"
                whileHover={{ y: -2 }}
              >
                {item.title}
              </motion.div>
            </div>
            <div className="space-y-3 pl-4 border-l-2 border-gray-200">
              <p className="text-xs uppercase tracking-wider">
                {item.character}
              </p>
              <p className="text-sm italic">"{item.quote}"</p>
              <p className="text-xs text-gray-500">{item.subQuote}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      {decorativeItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ ...item }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
        >
          <div className="border border-black px-3 py-1 text-xs bg-white whitespace-nowrap">
            {item.text}
          </div>
          <div className="mt-1 w-12 h-8 bg-[repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0_2px,transparent_2px,transparent_4px)]" />
        </motion.div>
      ))}

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#fafafa,#fafafa_1px,transparent_1px,transparent_6px)] opacity-30" />
      </div>
    </div>
  );
}

export default Gallery;
