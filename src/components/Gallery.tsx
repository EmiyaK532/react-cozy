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
      style: "left-[5%] top-[5%] -rotate-45 text-2xl",
      hoverEffect: "fill"
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
      style: "left-[35%] top-[65%] border border-black px-3 py-1 text-xl",
      hoverEffect: "glow"
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
      style: "right-[5%] top-[15%] border-2 border-black px-4 py-2 text-xl",
      hoverEffect: "outline"
    },
    {
      type: "text",
      text: "CLOVER",
      style: "right-[15%] top-[5%] rotate-12 text-2xl",
      hoverEffect: "scale"
    },
    {
      type: "text",
      text: "STAR",
      style: "right-[25%] bottom-[20%] bg-black text-white px-3 py-1",
      hoverEffect: "rotate"
    },
    {
      type: "text",
      text: "MARE",
      style: "right-[5%] bottom-[30%] -rotate-90 text-[5vw] font-bold tracking-widest",
      hoverEffect: "slide"
    },
    {
      type: "text",
      text: "DREAM",
      style: "left-[20%] top-[40%] writing-vertical text-2xl tracking-[0.5em]",
      hoverEffect: "blur"
    },
    {
      type: "text",
      text: "THERAPY",
      style: "right-[40%] top-[60%] skew-x-12 text-3xl font-light",
      hoverEffect: "color"
    }
  ];

  // 自定义文字悬停效果组件
  const DecorativeText = ({ text, style, hoverEffect }: any) => {
    const getHoverAnimation = () => {
      switch (hoverEffect) {
        case "fill":
          return {
            initial: { backgroundColor: "transparent", color: "black" },
            whileHover: { backgroundColor: "black", color: "white" },
            transition: { duration: 0.3 }
          };
        case "outline":
          return {
            initial: { borderColor: "black", scale: 1 },
            whileHover: { borderColor: "transparent", scale: 1.1, backgroundColor: "black", color: "white" },
            transition: { duration: 0.3 }
          };
        case "scale":
          return {
            whileHover: { scale: 1.2, rotate: 0 },
            transition: { type: "spring", stiffness: 300 }
          };
        case "rotate":
          return {
            whileHover: { rotate: 180, scale: 1.1 },
            transition: { duration: 0.4 }
          };
        case "slide":
          return {
            initial: { x: 0 },
            whileHover: { x: 20 },
            transition: { type: "spring", stiffness: 200 }
          };
        case "glow":
          return {
            whileHover: { 
              textShadow: "0 0 8px rgba(0,0,0,0.5)",
              scale: 1.05
            }
          };
        case "blur":
          return {
            initial: { filter: "blur(0px)" },
            whileHover: { filter: "blur(2px)", scale: 1.1 }
          };
        case "color":
          return {
            initial: { color: "black" },
            whileHover: { color: "#FF0066" },
            transition: { duration: 0.3 }
          };
        default:
          return {};
      }
    };

    return (
      <motion.div
        className={`cursor-pointer select-none ${style}`}
        {...getHoverAnimation()}
      >
        {text}
      </motion.div>
    );
  };

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
              <DecorativeText {...element} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
