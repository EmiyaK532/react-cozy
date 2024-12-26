import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DetailData {
  id: string;
  number: string;
  title: string;
  character: string;
  mainQuote: string;
  subQuotes: string[];
  image: string;
}

function GalleryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const details: Record<string, DetailData> = {
    white: {
      id: "white",
      number: "01",
      title: "WHITE",
      character: "YUUKI",
      mainQuote: "I believe we can see someday again",
      subQuotes: [
        "white eternity...",
        "The first promise",
        "Looking forward to spring",
      ],
      image: "/images/01.jpg",
    },
    butterfly: {
      id: "butterfly",
      number: "02",
      title: "BUTTERFLY",
      character: "SHIRAHA",
      mainQuote: "Before the Blue",
      subQuotes: [
        "The end of the story promise",
        "Butterfly effect",
        "Wings of change",
      ],
      image: "/images/02.jpg",
    },
    letter: {
      id: "letter",
      number: "03",
      title: "LETTER",
      character: "SENA",
      mainQuote: "Our first promise and your words I wanted to express",
      subQuotes: [
        "und Im Thale blüht der Frühling auf",
        "Letters from the past",
        "Memories in ink",
      ],
      image: "/images/03.jpg",
    },
  };

  const currentDetail = details[id as keyof typeof details];

  useEffect(() => {
    const img = new Image();
    img.src = currentDetail?.image;
    img.onload = () => setIsLoading(false);
  }, [currentDetail?.image]);

  if (!currentDetail) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center z-10 mix-blend-difference"
      >
        <span className="text-3xl text-white rotate-45">+</span>
      </button>

      <div className="container mx-auto h-full flex items-center justify-center gap-24 px-8">
        {/* Image Section */}
        <motion.div
          className="relative w-[500px]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Frame */}
            <div className="absolute inset-0 border-[24px] border-white shadow-2xl z-10" />
            
            {/* Image */}
            <motion.div
              className="relative aspect-[3/4] overflow-hidden bg-gray-100"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={currentDetail.image}
                alt={currentDetail.title}
                className="w-full h-full object-cover"
                style={{
                  opacity: isLoading ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            </motion.div>

            {/* Number Badge */}
            <motion.div
              className="absolute -top-6 -right-6 w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentDetail.number}
            </motion.div>

            {/* Title Badge */}
            <motion.div
              className="absolute -bottom-4 left-8 bg-white border-2 border-black px-6 py-2 z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentDetail.title}
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="w-[400px]">
          <motion.h2
            className="text-8xl font-black mb-16 relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {currentDetail.character}
            <div className="absolute -bottom-4 left-0 w-12 h-1 bg-black" />
          </motion.h2>

          <motion.p
            className="text-xl mb-8 font-medium"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentDetail.mainQuote}
          </motion.p>

          <div className="space-y-6">
            {currentDetail.subQuotes.map((quote, index) => (
              <motion.p
                key={index}
                className="text-lg relative pl-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <span className="absolute left-0 top-1/2 w-3 h-px bg-black" />
                {quote}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_6px)]" />
      </div>
    </motion.div>
  );
}

export default GalleryDetail;
