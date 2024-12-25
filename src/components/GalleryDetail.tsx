import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function GalleryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const details = {
    white: {
      number: "01",
      title: "WHITE",
      character: "YUUKI",
      mainQuote: "I believe we can see someday again",
      subQuotes: [
        "white eternity...",
        "The first promise",
        "Looking forward to spring",
      ],
    },
    // ... 其他详情配置
  };

  const currentDetail = details[id as keyof typeof details];

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center"
      >
        <span className="text-3xl rotate-45">+</span>
      </button>

      <div className="container mx-auto h-full flex items-center justify-center gap-24 px-8">
        <div className="relative w-[500px]">
          <div className="relative border-8 border-white shadow-2xl">
            <img
              src={`/images/${id}.jpg`}
              alt={currentDetail?.title}
              className="w-full"
            />
            <motion.div
              className="absolute -top-6 -right-6 w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentDetail?.number}
            </motion.div>
          </div>
          <motion.div
            className="absolute -bottom-4 left-8 bg-white border-2 border-black px-6 py-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {currentDetail?.title}
          </motion.div>
        </div>

        <div className="w-[400px] pt-12">
          <motion.h2
            className="text-8xl font-black mb-16 relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {currentDetail?.character}
            <div className="absolute -bottom-4 left-0 w-12 h-1 bg-black" />
          </motion.h2>

          <div className="space-y-6 pl-6">
            {currentDetail?.subQuotes.map((quote, index) => (
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
    </motion.div>
  );
}

export default GalleryDetail;
