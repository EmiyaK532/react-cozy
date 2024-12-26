import { motion, useScroll, useTransform } from "framer-motion";
import ImageCard from "./ImageCard";
import { useRef } from "react";

function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

  return (
    <div ref={containerRef} className="relative min-h-screen bg-transparent">
      <motion.div
        className="fixed top-0 left-0 w-full h-screen pointer-events-none"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0,rgba(0,0,0,0.01)_100%)]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-8 py-16">
        <motion.div
          className="mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="inline-block bg-black px-6 py-2 -rotate-3 relative overflow-hidden group"
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1 
              className="text-white text-2xl font-bold relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              GALLERY
            </motion.h1>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ mixBlendMode: 'overlay' }}
            />
          </motion.div>

          <div className="mt-6 relative">
            <motion.p 
              className="font-serif text-lg tracking-wide relative inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">
                HoWhite
              </span>
              <span className="mx-2 opacity-50">/</span>
              <motion.span 
                className="italic opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ delay: 0.4 }}
              >
                a developer
              </motion.span>
            </motion.p>
            
            <motion.div
              className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, index) => (
            <ImageCard key={item.id} {...item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
