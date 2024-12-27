import { motion } from "framer-motion";
import ImageCard from "./ImageCard";
import { gsap } from "gsap";
import SplitType from 'split-type';
import anime from 'animejs';

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
        hover:border-black/0
      `,
      hoverEffect: "creative-fill-hello"
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
      style: "right-[15%] top-[5%] rotate-12 text-3xl font-extrabold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-300",
      hoverEffect: "creative-scale"
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
    },
    {
      type: "text",
      text: "ABOUT",
      style: "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black tracking-wider opacity-[0.02] pointer-events-none z-0",
      hoverEffect: "none"
    },
    {
      type: "text",
      text: "CHERRY",
      style: "left-[5%] top-[15%] -rotate-45 text-2xl",
      hoverEffect: "fill-smooth"
    },
    {
      type: "text",
      text: "EMOTION",
      style: "right-[8%] top-[25%] border-2 border-black px-4 py-2 text-xl",
      hoverEffect: "outline-fade"
    },
    {
      type: "text",
      text: "MEMORY",
      style: "left-[15%] top-[45%] writing-vertical text-3xl font-light tracking-[0.5em] opacity-40",
      hoverEffect: "fade-scale"
    },
    {
      type: "text",
      text: "DESTINY",
      style: "right-[25%] top-[35%] text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400",
      hoverEffect: "gradient-shift"
    },
    {
      type: "text",
      text: "∞",
      style: "left-[40%] top-[70%] text-6xl opacity-20 rotate-90",
      hoverEffect: "spin-fade"
    },
    {
      type: "text",
      text: "ETERNITY",
      style: "right-[12%] top-[65%] text-xl tracking-[0.8em] uppercase font-light",
      hoverEffect: "letter-float"
    },
    {
      type: "text",
      text: "DREAM",
      style: "left-[22%] bottom-[25%] text-2xl font-bold skew-x-12",
      hoverEffect: "transform-smooth"
    },
    {
      type: "shape",
      style: "left-[35%] top-[40%] w-8 h-8 border-2 border-gray-300 rotate-45 opacity-30",
      hoverEffect: "rotate-scale"
    },
    {
      type: "text",
      text: "PROMISE",
      style: "left-[45%] bottom-[35%] text-xl font-medium border-b-2 border-gray-300",
      hoverEffect: "underline-expand"
    },
    {
      type: "text",
      text: "STORY",
      style: "right-[18%] bottom-[45%] text-3xl font-black opacity-10",
      hoverEffect: "fade-rise"
    },
    {
      type: "text",
      text: "MARE",
      style: "right-[5%] bottom-[20%] -rotate-90 text-[4vw] font-bold tracking-widest",
      hoverEffect: "rotate-reveal"
    },
    {
      type: "text",
      text: "ANZUI",
      style: "right-[2%] top-[8%] text-[6vw] font-black opacity-10 tracking-tighter",
      hoverEffect: "glitch"
    },
    {
      type: "text",
      text: "KUKURI",
      style: "left-[8%] bottom-[15%] -rotate-90 text-2xl font-bold writing-vertical",
      hoverEffect: "stroke-dash"
    },
    {
      type: "text",
      text: "SENA",
      style: "right-[30%] top-[40%] text-xl font-light tracking-[1em] opacity-20",
      hoverEffect: "character-scatter"
    },
    {
      type: "text",
      text: "PROMISE",
      style: "left-[25%] top-[60%] text-3xl font-black mix-blend-difference",
      hoverEffect: "neon-pulse"
    },
    {
      type: "decorative",
      element: "line",
      style: "left-[15%] top-[30%] w-[2px] h-[100px] bg-black/10 -rotate-45",
      hoverEffect: "line-extend"
    },
    {
      type: "text",
      text: "YUUKI",
      style: "right-[15%] bottom-[35%] text-2xl font-bold skew-y-12",
      hoverEffect: "3d-rotate"
    },
    {
      type: "text",
      text: "HoWhite",
      style: "left-[40%] bottom-[25%] text-xl tracking-widest opacity-30",
      hoverEffect: "wave-text"
    },
    {
      type: "decorative",
      element: "circle",
      style: "right-[45%] top-[15%] w-16 h-16 border border-black/20 rounded-full",
      hoverEffect: "circle-morph"
    }
  ];

  // 优化后的动画效果
  const getHoverAnimation = (effect: string) => {
    // 定义统一的过渡配置
    const transitions = {
      smooth: { 
        duration: 0.8,  // 增加持续时间
        ease: [0.43, 0.13, 0.23, 0.96]  // 使用更平滑的缓动函数
      },
      spring: { 
        type: "spring", 
        stiffness: 80,  // 降低弹性强度
        damping: 15,    // 增加阻尼
        mass: 1.2       // 增加质量感
      },
      elastic: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        mass: 1
      }
    };

    const effects = {
      "fill-smooth": {
        initial: { 
          backgroundColor: "transparent", 
          color: "black",
          backgroundSize: "0% 100%"  // 初始宽度为0
        },
        whileHover: { 
          backgroundImage: "linear-gradient(to right, black 0%, black 100%)",
          backgroundSize: "100% 100%",  // 悬停时宽度变为100%
          backgroundRepeat: "no-repeat",
          color: "white",
          transition: {
            backgroundSize: {
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96]  // 使用平滑的缓动函数
            },
            color: {
              duration: 0.4,
              delay: 0.2  // 文字颜色变化稍微延迟
            }
          }
        }
      },
      "outline-fade": {
        initial: { borderColor: "black", scale: 1 },
        whileHover: { 
          borderColor: "transparent", 
          scale: 1.1, 
          backgroundColor: "black", 
          color: "white" 
        },
        transition: {
          ...transitions.smooth,
          scale: { duration: 0.6, ease: "easeOut" }
        }
      },
      "fade-scale": {
        initial: { opacity: 0.4, scale: 1 },
        whileHover: { opacity: 1, scale: 1.1 },
        transition: {
          opacity: { duration: 0.4, ease: "easeOut" },
          scale: { duration: 0.6, ease: "easeOut" }
        }
      },
      "gradient-shift": {
        whileHover: { 
          backgroundImage: "linear-gradient(45deg, #333, #999)",
          scale: 1.05,
          y: -5
        },
        transition: {
          ...transitions.smooth,
          backgroundImage: { duration: 1 }
        }
      },
      "spin-fade": {
        whileHover: { 
          rotate: 360, 
          scale: 1.2, 
          opacity: 0.8 
        },
        transition: { 
          duration: 1.5,
          ease: "easeInOut",
          opacity: { duration: 0.6 }
        }
      },
      "letter-float": {
        whileHover: { 
          letterSpacing: "1em",
          y: -8,
          opacity: 0.8
        },
        transition: {
          ...transitions.smooth,
          letterSpacing: { duration: 0.8 }
        }
      },
      "transform-smooth": {
        whileHover: { 
          skewX: 0,
          scale: 1.1,
          y: -5
        },
        transition: transitions.spring
      },
      "rotate-scale": {
        whileHover: { 
          rotate: 225,
          scale: 1.2,
          opacity: 0.6
        },
        transition: transitions.elastic
      },
      "underline-expand": {
        initial: { borderBottomWidth: "2px", y: 0 },
        whileHover: { 
          borderBottomWidth: "4px",
          y: -4,
          scale: 1.05
        },
        transition: transitions.smooth
      },
      "fade-rise": {
        initial: { opacity: 0.1, y: 0 },
        whileHover: { 
          opacity: 1,
          y: -8,
          scale: 1.1
        },
        transition: transitions.smooth
      },
      "rotate-reveal": {
        initial: { rotate: -90, opacity: 0.6 },
        whileHover: { 
          rotate: 0,
          opacity: 1,
          scale: 1.1
        },
        transition: transitions.spring
      },
      "glitch": {
        initial: { textShadow: "none" },
        whileHover: {
          textShadow: [
            "2px 2px #ff0000, -2px -2px #00ff00",
            "-2px 2px #0000ff, 2px -2px #ff0000",
            "2px -2px #00ff00, -2px 2px #0000ff"
          ],
          x: [0, -2, 2, 0],
          transition: {
            textShadow: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 0.4, repeat: Infinity, ease: "easeInOut" }
          }
        }
      },
      "stroke-dash": {
        initial: { 
          WebkitTextStroke: "1px black",
          color: "transparent",
          opacity: 0.6
        },
        whileHover: {
          WebkitTextStroke: "2px black",
          scale: 1.1,
          opacity: 1
        },
        transition: {
          ...transitions.smooth,
          WebkitTextStroke: { duration: 0.6 }
        }
      },
      "character-scatter": {
        whileHover: (custom: any) => ({
          y: custom.map(() => Math.random() * 20 - 10),
          x: custom.map(() => Math.random() * 20 - 10),
          transition: { duration: 0.4, ease: "easeOut" }
        })
      },
      "neon-pulse": {
        initial: { textShadow: "0 0 0 #fff" },
        whileHover: {
          color: "#fff",
          textShadow: [
            "0 0 4px #fff",
            "0 0 11px #fff",
            "0 0 19px #fff",
            "0 0 40px #0fa",
            "0 0 80px #0fa",
            "0 0 90px #0fa",
            "0 0 100px #0fa",
            "0 0 150px #0fa"
          ],
          transition: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }
      },
      "wave-text": {
        initial: { y: 0 },
        whileHover: {
          y: [0, -10, 0],
          transition: {
            duration: 1.2,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            repeat: Infinity
          }
        }
      },
      "3d-rotate": {
        initial: { perspective: "1000px", rotateY: 0 },
        whileHover: {
          rotateY: 180,
          transition: {
            duration: 1,
            ease: [0.43, 0.13, 0.23, 0.96]
          }
        }
      },
      "creative-fill": {
        initial: { 
          backgroundSize: "0% 100%",
          backgroundImage: "linear-gradient(45deg, #000 0%, #333 100%)",
          WebkitTextStroke: "1px black",
          color: "transparent",
          textShadow: "none"
        },
        whileHover: { 
          backgroundSize: "100% 100%",
          color: "white",
          WebkitTextStroke: "0px black",
          textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
          scale: 1.1,
          y: -5,
          transition: {
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
            backgroundSize: { duration: 0.8 },
            color: { delay: 0.3, duration: 0.4 },
            scale: { duration: 0.6 },
            y: { duration: 0.6 }
          }
        }
      },
      "creative-scale": {
        initial: { 
          backgroundImage: "linear-gradient(45deg, #666 0%, #999 50%, #666 100%)",
          filter: "none",
          letterSpacing: "0.2em"
        },
        whileHover: { 
          backgroundImage: "linear-gradient(45deg, #000 0%, #333 50%, #000 100%)",
          scale: 1.2,
          letterSpacing: "0.3em",
          filter: "drop-shadow(0 0 8px rgba(0,0,0,0.3))",
          transition: {
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
            scale: { duration: 0.8 },
            letterSpacing: { duration: 0.8 },
            filter: { duration: 0.4 }
          }
        }
      },
      "creative-fill-hello": {
        initial: { 
          scale: 1,
          textShadow: "none",
          backgroundImage: "linear-gradient(45deg, #333 0%, #666 100%)",
          WebkitTextStroke: "1px rgba(0,0,0,0.3)",
        },
        whileHover: { 
          scale: 1.1,
          y: -5,
          backgroundImage: "linear-gradient(45deg, #000 0%, #333 100%)",
          WebkitTextStroke: "0px black",
          textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
          transition: {
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
            scale: { duration: 0.5 },
            y: { duration: 0.5 },
            backgroundImage: { duration: 0.8 }
          }
        }
      }
    };

    return effects[effect] || {};
  };

  const DecorativeText = ({ text, style, hoverEffect }: any) => (
    <motion.div
      className={`cursor-pointer select-none ${style} bg-left`}  // 添加 bg-left
      style={{
        backgroundPosition: "left",  // 确保渐变从左侧开始
        backgroundSize: "0% 100%",   // 初始宽度为0
        backgroundRepeat: "no-repeat"
      }}
      {...getHoverAnimation(hoverEffect)}
    >
      {text}
    </motion.div>
  );

  const DecorativeLine = ({ style, hoverEffect }: any) => (
    <motion.div
      className={`${style} transform origin-center`}
      whileHover={{
        scaleY: [1, 1.5, 1],
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
    />
  );

  const DecorativeCircle = ({ style, hoverEffect }: any) => (
    <motion.div
      className={`${style}`}
      whileHover={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        borderRadius: ["50%", "20%", "50%"],
        transition: { duration: 1, ease: "easeInOut" }
      }}
    />
  );

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

      {/* 顶部导航区域 - 增加内边距和字体大小 */}
      <div className="relative z-10 px-12 pt-12"> {/* 增加内边距 */}
        <motion.div
          className="mb-auto" // 减小底部间距
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Gallery 标题容器 - 添加悬停效果 */}
          <motion.div 
            className="inline-block bg-black px-8 py-3 -rotate-3 relative overflow-hidden group cursor-pointer"
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 标题文字 - 增加字体大小 */}
            <motion.h1 
              className="text-white text-5xl font-bold relative z-10" // 增大字体
              whileHover={{ scale: 1.05 }}
            >
              GALLERY
            </motion.h1>
            
            {/* 标题悬停渐变效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ mixBlendMode: 'overlay' }}
            />
          </motion.div>

          {/* 副标题区域 - 调整间距和样式 */}
          <div className="mt-4 relative"> {/* 减小顶部间距 */}
            {/* 开发者信息 - 使用渐变文字效果 */}
            <motion.p 
              className="font-serif text-xl tracking-wide relative inline-block" // 增大字体
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* 名字部分 - 使用渐变色文字 */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">
                HoWhite
              </span>
              {/* 分隔符 */}
              <span className="mx-2 opacity-50">/</span>
              {/* 身份描述 - 使用斜体效果 */}
              <motion.span 
                className="italic opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ delay: 0.4 }}
              >
                a developer
              </motion.span>
            </motion.p>
            
            {/* 装饰性下划线 - 使用渐变色和动画效果 */}
            <motion.div
              className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>
        </motion.div>
      </div>

      {/* 内容区域分隔 - 用于调整顶部区域与主内容的间距 */}
      <div className="h-auto"/> {/* 添加小间距 */}

      {/* 主要内容区域 - 使用绝对定位实现错位布局 */}
      <div className="relative w-full h-[150vh]">
        {/* 遍历渲染所有元素 */}
        {elements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.style}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            {/* 根据元素类型渲染不同的组件 */}
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
