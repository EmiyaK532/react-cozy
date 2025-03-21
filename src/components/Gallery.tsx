import { motion } from "framer-motion";
import ImageCard from "./ImageCard";
import { useRef, useCallback } from "react";

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
      style: "left-[10%] top-[15%]",
    },
    {
      type: "text",
      text: "Hello",
      style: `
        left-[5%] top-[5%] 
        text-5xl font-black 
        tracking-[0.2em]
        -rotate-12
        bg-clip-text text-transparent 
        bg-gradient-to-r from-gray-800 to-gray-400
        drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]
        border-b-[3px] border-gray-300
        px-4 py-2
        transition-all duration-300
      `,
      className:
        "hover:-translate-y-1 hover:scale-110 hover:border-transparent",
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
      style: "left-[40%] top-[25%]",
    },
    {
      type: "text",
      text: "SUNFLOWER",
      style:
        "left-[35%] top-[65%] border border-black px-3 py-1 text-xl transition-all duration-300",
      className: "hover:bg-black hover:text-white hover:shadow-lg",
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
      style: "left-[70%] top-[20%]",
    },
    {
      type: "text",
      text: "EMOTION",
      style:
        "right-[5%] top-[15%] border-2 border-black px-4 py-2 text-xl transition-all duration-300",
      className: "hover:border-transparent hover:bg-black hover:text-white",
    },
    {
      type: "text",
      text: "CLOVER",
      style:
        "right-[15%] top-[5%] rotate-12 text-3xl font-extrabold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-300 transition-all duration-300",
      className: "hover:scale-110 hover:rotate-0",
    },
    {
      type: "text",
      text: "STAR",
      style:
        "right-[25%] bottom-[20%] bg-black text-white px-3 py-1 transition-all duration-300",
      className: "hover:rotate-12 hover:scale-110",
    },
    {
      type: "text",
      text: "MARE",
      style:
        "right-[5%] bottom-[30%] -rotate-90 text-[5vw] font-bold tracking-widest transition-all duration-500",
      className: "hover:rotate-0 hover:-translate-y-2",
    },
    {
      type: "text",
      text: "DREAM",
      style:
        "left-[20%] top-[40%] writing-vertical text-2xl tracking-[0.5em] transition-all duration-300",
      className: "hover:tracking-[0.8em] hover:-translate-y-2",
    },
    {
      type: "text",
      text: "THERAPY",
      style:
        "right-[40%] top-[60%] skew-x-12 text-3xl font-light transition-all duration-300",
      className: "hover:skew-x-0 hover:font-normal",
    },
    {
      type: "text",
      text: "ABOUT",
      style:
        "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black tracking-wider opacity-[0.02] pointer-events-none z-0",
    },
    {
      type: "text",
      text: "CHERRY",
      style:
        "left-[5%] top-[15%] -rotate-45 text-2xl transition-all duration-300",
      className: "hover:rotate-0 hover:bg-black hover:text-white",
    },
    {
      type: "text",
      text: "EMOTION",
      style:
        "right-[8%] top-[25%] border-2 border-black px-4 py-2 text-xl transition-all duration-300",
      className:
        "hover:border-transparent hover:bg-black hover:text-white hover:translate-y-1",
    },
    {
      type: "text",
      text: "MEMORY",
      style:
        "left-[15%] top-[45%] writing-vertical text-3xl font-light tracking-[0.5em] opacity-40 transition-all duration-300",
      className: "hover:opacity-100 hover:scale-105",
    },
    {
      type: "text",
      text: "DESTINY",
      style:
        "right-[25%] top-[35%] text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 transition-all duration-300",
      className:
        "hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-600 hover:-translate-y-1",
    },
    {
      type: "text",
      text: "∞",
      style:
        "left-[40%] top-[70%] text-6xl opacity-20 rotate-90 transition-all duration-700",
      className: "hover:rotate-[450deg] hover:opacity-80 hover:scale-110",
    },
    {
      type: "text",
      text: "ETERNITY",
      style:
        "right-[12%] top-[65%] text-xl tracking-[0.8em] uppercase font-light transition-all duration-500",
      className: "hover:tracking-[1.2em] hover:-translate-y-2",
    },
    {
      type: "text",
      text: "DREAM",
      style:
        "left-[22%] bottom-[25%] text-2xl font-bold skew-x-12 transition-all duration-300",
      className: "hover:skew-x-0 hover:bg-black hover:text-white hover:px-3",
    },
    {
      type: "shape",
      style:
        "left-[35%] top-[40%] w-8 h-8 border-2 border-gray-300 rotate-45 opacity-30 transition-all duration-500",
      className: "hover:rotate-[225deg] hover:scale-125 hover:opacity-60",
    },
    {
      type: "text",
      text: "PROMISE",
      style:
        "left-[45%] bottom-[35%] text-xl font-medium border-b-2 border-gray-300 transition-all duration-300",
      className: "hover:border-b-4 hover:border-black hover:-translate-y-1",
    },
    {
      type: "text",
      text: "STORY",
      style:
        "right-[18%] bottom-[45%] text-3xl font-black opacity-10 transition-all duration-500",
      className: "hover:opacity-100 hover:-translate-y-2",
    },
    {
      type: "text",
      text: "MARE",
      style:
        "right-[5%] bottom-[20%] -rotate-90 text-[4vw] font-bold tracking-widest transition-all duration-500",
      className: "hover:rotate-0",
    },
    {
      type: "text",
      text: "ANZUI",
      style:
        "right-[2%] top-[8%] text-[6vw] font-black opacity-10 tracking-tighter transition-all duration-300",
      className: "hover:opacity-30 hover:text-shadow-glitch",
    },
    {
      type: "text",
      text: "KUKURI",
      style:
        "left-[8%] bottom-[15%] -rotate-90 text-2xl font-bold writing-vertical transition-all duration-300",
      className: "hover:rotate-0 hover:-translate-y-2",
    },
    {
      type: "text",
      text: "SENA",
      style:
        "right-[30%] top-[40%] text-xl font-light tracking-[1em] opacity-20 transition-all duration-300",
      className: "hover:opacity-80 hover:tracking-[1.5em]",
    },
    {
      type: "text",
      text: "PROMISE",
      style:
        "left-[25%] top-[60%] text-3xl font-black mix-blend-difference transition-all duration-300",
      className: "hover:scale-110 hover:text-white",
    },
    {
      type: "decorative",
      element: "line",
      style:
        "left-[15%] top-[30%] w-[2px] h-[100px] bg-black/10 -rotate-45 transition-all duration-300",
      className: "hover:h-[150px] hover:bg-black/30",
    },
    {
      type: "text",
      text: "YUUKI",
      style:
        "right-[15%] bottom-[35%] text-2xl font-bold skew-y-12 transition-all duration-300",
      className: "hover:skew-y-0 hover:-translate-y-2",
    },
    {
      type: "text",
      text: "HoWhite",
      style:
        "left-[40%] bottom-[25%] text-xl tracking-widest opacity-30 transition-all duration-500",
      className: "hover:opacity-100 hover:scale-110 hover:-translate-y-2",
    },
    {
      type: "decorative",
      element: "circle",
      style:
        "right-[45%] top-[15%] w-16 h-16 border border-black/20 rounded-full transition-all duration-500",
      className: "hover:scale-125 hover:border-black/50 hover:rotate-180",
    },
  ];

  const DecorativeText = ({ text, style, className }: any) => (
    <div className={`cursor-pointer select-none ${style} ${className}`}>
      {text}
    </div>
  );

  const DecorativeLine = ({ style, className }: any) => (
    <div className={`${style} ${className}`} />
  );

  const DecorativeCircle = ({ style, className }: any) => (
    <div className={`${style} ${className}`} />
  );

  // 使用 useCallback 优化渲染函数
  const renderElement = useCallback((element: any, index: number) => {
    return (
      <motion.div
        key={index}
        className={`absolute ${element.style}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: Math.min(index * 0.05, 1.5) }}
      >
        {element.type === "image" ? (
          <div className="w-[25vw] min-w-[280px] max-w-[400px]">
            <ImageCard {...element.data} index={index} />
          </div>
        ) : element.type === "text" || element.type === "shape" ? (
          <DecorativeText {...element} />
        ) : element.type === "decorative" && element.element === "line" ? (
          <DecorativeLine {...element} />
        ) : element.type === "decorative" && element.element === "circle" ? (
          <DecorativeCircle {...element} />
        ) : null}
      </motion.div>
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景大标题 - 使用 vw 单位确保响应式 */}
      <motion.div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black tracking-wider opacity-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        ABOUT
      </motion.div>

      {/* 顶部导航区域 */}
      <div className="relative z-10 px-12 pt-12">
        <motion.div
          className="mb-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Gallery 标题容器 */}
          <div className="inline-block bg-black px-8 py-3 -rotate-3 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:rotate-0">
            {/* 标题文字 */}
            <h1 className="text-white text-5xl font-bold relative z-10 transition-transform duration-300 group-hover:scale-105">
              GALLERY
            </h1>

            {/* 标题悬停渐变效果 */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>

          {/* 副标题区域 */}
          <div className="mt-4 relative">
            {/* 开发者信息 */}
            <motion.p
              className="font-serif text-xl tracking-wide relative inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* 名字部分 */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">
                HoWhite
              </span>
              {/* 分隔符 */}
              <span className="mx-2 opacity-50">/</span>
              {/* 身份描述 */}
              <motion.span
                className="italic opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ delay: 0.4 }}
              >
                a developer
              </motion.span>
            </motion.p>

            {/* 装饰性下划线 */}
            <motion.div
              className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>
        </motion.div>
      </div>

      {/* 内容区域分隔 */}
      <div className="h-auto" />

      {/* 主要内容区域 - 使用绝对定位实现错位布局 */}
      <div className="relative w-full h-[150vh]">
        {elements.map(renderElement)}
      </div>
    </div>
  );
}

export default Gallery;
