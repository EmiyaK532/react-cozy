import { motion } from "framer-motion";
import ImageCard from "./ImageCard";

function Gallery() {
  // 图片和装饰性元素的统一配置
  const elements = [
    // 第一列元素
    {
      type: "image",
      data: {
        id: "white",
        title: "WHITE",
        character: "yuuki",
        quote: "I believe we can see someday again",
        subQuote: "white eternity...",
        image: "/images/01.jpg",
      },
      style: "left-[10%] top-[15%]"
    },
    {
      type: "text",
      text: "CHERRY",
      style: "left-[5%] top-[5%] -rotate-45 text-2xl"
    },
    
    // 第二列元素
    {
      type: "image",
      data: {
        id: "butterfly",
        title: "BUTTERFLY",
        character: "shiraha",
        quote: "Before the Blue",
        subQuote: "The end of the story promise",
        image: "/images/02.jpg",
      },
      style: "left-[40%] top-[25%]"
    },
    {
      type: "text",
      text: "SUNFLOWER",
      style: "left-[35%] top-[65%] border border-black px-3 py-1 text-xl"
    },
    
    // 第三列元素
    {
      type: "image",
      data: {
        id: "letter",
        title: "LETTER",
        character: "sena",
        quote: "Our first promise and your words I wanted to express",
        subQuote: "und Im Thale blüht der Frühling auf",
        image: "/images/03.jpg",
      },
      style: "left-[70%] top-[20%]"
    },
    {
      type: "text",
      text: "EMOTION",
      style: "right-[5%] top-[15%] border-2 border-black px-4 py-2 text-xl"
    },
    {
      type: "text",
      text: "CLOVER",
      style: "right-[15%] top-[5%] rotate-12 text-2xl"
    },
    {
      type: "text",
      text: "STAR",
      style: "right-[25%] bottom-[20%] bg-black text-white px-3 py-1"
    },
    {
      type: "text",
      text: "MARE",
      style: "right-[5%] bottom-[30%] -rotate-90 text-4xl font-bold"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 大标题 ABOUT */}
      <motion.div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black tracking-wider opacity-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        ABOUT
      </motion.div>

      {/* Gallery 标题部分 */}
      <div className="relative z-10 px-8 pt-8">
        <motion.div
          className="inline-block bg-black px-6 py-2 -rotate-3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-white text-2xl font-bold">GALLERY</h1>
        </motion.div>
        <p className="mt-4 text-sm text-gray-600">
          HoWhite / a developer
        </p>
      </div>

      {/* 主要内容区域 - 使用绝对定位实现错位布局 */}
      <div className="relative w-full h-[150vh]">
        {elements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.style}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            {element.type === "image" ? (
              <div className="w-[25vw] min-w-[280px] max-w-[400px]">
                <ImageCard {...element.data} index={index} />
              </div>
            ) : (
              <div className={`select-none ${element.type === "text" ? "font-medium" : ""}`}>
                {element.text}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
