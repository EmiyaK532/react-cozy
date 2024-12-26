import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ImageCardProps {
  id: string;
  title: string;
  character: string;
  quote: string;
  subQuote: string;
  image: string;
  index: number;
}

function ImageCard({
  id,
  title,
  character,
  quote,
  subQuote,
  image,
  index,
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/gallery/${id}`}>
        <div className="relative mb-6 aspect-[3/4] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
            }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute -bottom-3 left-4 bg-white border-2 border-black px-4 py-1"
            whileHover={{ y: -2 }}
          >
            <span className="relative z-10">{title}</span>
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </Link>

      <motion.div
        className="space-y-3 pl-4 border-l-2 border-gray-200"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.3 }}
      >
        <motion.p 
          className="text-xs uppercase tracking-wider"
          whileHover={{ x: 5 }}
        >
          {character}
        </motion.p>
        <p className="text-sm italic">{quote}</p>
        <p className="text-xs text-gray-500">{subQuote}</p>
      </motion.div>
    </motion.div>
  );
}

export default ImageCard; 