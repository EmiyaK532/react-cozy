import { motion } from "framer-motion";
import ImageCard from "./ImageCard";
import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// 滚动触发动画辅助钩子 - 优化性能
function useScrollInView(threshold = 0.1, rootMargin = "0px") {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // 使用IntersectionObserver API的options改善性能
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // 一旦可见就断开观察，减少持续计算
        }
      },
      {
        threshold,
        rootMargin, // 添加rootMargin提前触发，减少用户感知的延迟
      }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin]);

  return { ref, isInView };
}

function Gallery() {
  // 添加自动动画引用 - 优化自动动画配置
  const [parentRef] = useAutoAnimate({
    duration: 250, // 减少动画持续时间
    easing: "ease-out", // 使用更简单的缓动函数
    disrespectUserMotionPreference: false, // 尊重用户减少动作的设置
  });

  // 使用预先配置的触发值，提前开始动画
  const titleAnimation = useScrollInView(0.05, "-50px");
  const subtitleAnimation = useScrollInView(0.05, "-50px");

  // 使用useMemo缓存elements数组，避免重新渲染时重新创建
  const elements = useMemo(
    () => [
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
    ],
    []
  );

  // 高效的元素渲染函数组件 - 使用函数组件减少重复渲染
  const DecorativeText = useCallback(
    ({ text, style, className }: any) => (
      <div className={`cursor-pointer select-none ${style} ${className}`}>
        {text}
      </div>
    ),
    []
  );

  const DecorativeLine = useCallback(
    ({ style, className }: any) => <div className={`${style} ${className}`} />,
    []
  );

  const DecorativeCircle = useCallback(
    ({ style, className }: any) => <div className={`${style} ${className}`} />,
    []
  );

  // 优化元素渲染 - 减少位移动画的幅度和持续时间
  const renderElement = useCallback((element: any, index: number) => {
    return (
      <motion.div
        key={index}
        className={`absolute ${element.style}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: Math.min(index * 0.04, 0.8), // 减少最大延迟时间
        }}
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
    // 添加touch-manipulation类优化触摸滚动
    <div className="relative min-h-screen overflow-hidden touch-manipulation">
      {/* 背景大标题 - 使用 vw 单位确保响应式 */}
      <motion.div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black tracking-wider opacity-5 pointer-events-none hardware-accelerated"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 0.8 }}
      >
        ABOUT
      </motion.div>

      {/* 顶部导航区域 */}
      <div className="relative z-10 px-12 pt-12">
        <motion.div
          className="mb-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} // 减少持续时间
        >
          {/* Gallery 标题容器 */}
          <div
            ref={titleAnimation.ref}
            className="inline-block bg-black px-8 py-3 relative overflow-hidden group cursor-pointer transition-all duration-300 hardware-accelerated"
            style={{
              transform: titleAnimation.isInView
                ? "rotate(0deg) scale(1)"
                : "rotate(-3deg) scale(0.95)",
              transition: "transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)",
            }}
          >
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
          <div ref={subtitleAnimation.ref} className="mt-4 relative">
            {/* 开发者信息 */}
            <motion.p
              className="font-serif text-xl tracking-wide relative inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }} // 减少持续时间
            >
              {/* 名字部分 */}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium hardware-accelerated"
                style={{
                  opacity: subtitleAnimation.isInView ? 1 : 0,
                  transform: subtitleAnimation.isInView
                    ? "translateY(0)"
                    : "translateY(15px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                HoWhite
              </span>
              {/* 分隔符 */}
              <span
                className="mx-2 opacity-50"
                style={{
                  opacity: subtitleAnimation.isInView ? 0.5 : 0,
                  transition: "opacity 0.5s ease 0.2s",
                }}
              >
                /
              </span>
              {/* 身份描述 */}
              <motion.span
                className="italic"
                style={{
                  opacity: subtitleAnimation.isInView ? 0.75 : 0,
                  transform: subtitleAnimation.isInView
                    ? "translateY(0)"
                    : "translateY(10px)",
                  transition:
                    "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
                }}
              >
                a developer
              </motion.span>
            </motion.p>

            {/* 装饰性下划线 */}
            <motion.div
              className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-purple-600 to-pink-600"
              style={{
                width: subtitleAnimation.isInView ? "100%" : "0%",
                transition: "width 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* 内容区域分隔 */}
      <div className="h-auto" />

      {/* 主要内容区域 - 使用绝对定位实现错位布局 */}
      <div
        ref={parentRef}
        className="relative w-full h-[150vh] hardware-accelerated"
      >
        {elements.map(renderElement)}
      </div>
    </div>
  );
}

export default Gallery;
