import { motion } from "framer-motion";
import ImageCard from "./ImageCard";
import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  GalleryElement,
  getAllElements,
  addImageToColumn,
  galleryColumns,
  GalleryImage,
} from "../data/galleryElements";

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

// 模拟图片数据 - 实际使用时可以替换为真实的数据
const sampleImages = [
  {
    title: "DREAMS",
    character: "character4",
    quote: "Our times made of dreams and colors",
    subQuote: "Colorful moments that last forever",
    image: "/images/01.jpg", // 实际使用时替换为新图片
  },
  {
    title: "MEMORY",
    character: "character5",
    quote: "The fragments of our journey",
    subQuote: "Scattered pieces of shared moments",
    image: "/images/02.jpg", // 实际使用时替换为新图片
  },
  {
    title: "SILENCE",
    character: "character6",
    quote: "When words can't express feelings",
    subQuote: "The quiet moments speak the loudest",
    image: "/images/03.jpg", // 实际使用时替换为新图片
  },
];

function Gallery() {
  // 状态用于跟踪画廊元素
  const [galleryItems, setGalleryItems] = useState<GalleryElement[]>(() =>
    getAllElements()
  );

  // 控制添加界面的显示状态
  const [showAddInterface, setShowAddInterface] = useState(false);

  // 当前选中的列
  const [selectedColumn, setSelectedColumn] = useState<
    "left" | "middle" | "right"
  >("left");

  // 添加自动动画引用 - 优化自动动画配置
  const [parentRef] = useAutoAnimate({
    duration: 250, // 减少动画持续时间
    easing: "ease-out", // 使用更简单的缓动函数
    disrespectUserMotionPreference: false, // 尊重用户减少动作的设置
  });

  // 使用预先配置的触发值，提前开始动画
  const titleAnimation = useScrollInView(0.05, "-50px");
  const subtitleAnimation = useScrollInView(0.05, "-50px");

  // 添加新图片到画廊
  const addImageToGallery = useCallback(
    (imageData: Omit<GalleryImage, "id">) => {
      const newElement = addImageToColumn(selectedColumn, imageData);

      // 更新galleryColumns数据结构
      galleryColumns[`${selectedColumn}Column`].push(newElement);

      // 更新状态以触发重新渲染
      setGalleryItems(getAllElements());
    },
    [selectedColumn]
  );

  // 添加示例图片
  const addSampleImage = useCallback(
    (index: number) => {
      if (index >= 0 && index < sampleImages.length) {
        addImageToGallery(sampleImages[index]);
      }
    },
    [addImageToGallery]
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
  const renderElement = useCallback(
    (element: GalleryElement, index: number) => {
      return (
        <motion.div
          key={`element-${index}-${element.type}-${element.type === "image" ? element.data.id : ""}`}
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
          ) : element.type === "text" ? (
            <DecorativeText {...element} />
          ) : element.type === "decorative" && element.element === "line" ? (
            <DecorativeLine {...element} />
          ) : element.type === "decorative" && element.element === "circle" ? (
            <DecorativeCircle {...element} />
          ) : null}
        </motion.div>
      );
    },
    []
  );

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

      {/* 添加图片按钮 */}
      <div className="fixed right-8 bottom-8 z-30">
        <button
          onClick={() => setShowAddInterface(!showAddInterface)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
        >
          {showAddInterface ? "X" : "+"}
        </button>
      </div>

      {/* 添加图片界面 */}
      {showAddInterface && (
        <div className="fixed left-0 bottom-0 w-full bg-white shadow-lg z-20 p-4 border-t border-gray-200 transition-all duration-300">
          <div className="container mx-auto">
            <h3 className="text-xl font-bold mb-4">添加新图片</h3>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center">
                <span className="mr-2">选择列:</span>
                <select
                  value={selectedColumn}
                  onChange={(e) =>
                    setSelectedColumn(
                      e.target.value as "left" | "middle" | "right"
                    )
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="left">左列</option>
                  <option value="middle">中列</option>
                  <option value="right">右列</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {sampleImages.map((image, idx) => (
                <div
                  key={`sample-${idx}`}
                  className="border border-gray-200 p-3 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => addSampleImage(idx)}
                >
                  <h4 className="font-bold">{image.title}</h4>
                  <p className="text-sm text-gray-600 truncate">
                    {image.quote}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic truncate">
                    {image.subQuote}
                  </p>
                  <div className="mt-2 text-right">
                    <button className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors duration-300">
                      添加到{" "}
                      {selectedColumn === "left"
                        ? "左列"
                        : selectedColumn === "middle"
                          ? "中列"
                          : "右列"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 italic">
              注意：这是一个演示界面，实际应用中您可以添加图片上传功能和更多自定义选项。
            </p>
          </div>
        </div>
      )}

      {/* 内容区域分隔 */}
      <div className="h-auto" />

      {/* 主要内容区域 - 使用绝对定位实现错位布局 */}
      <div
        ref={parentRef}
        className="relative w-full h-[150vh] hardware-accelerated"
      >
        {galleryItems.map(renderElement)}
      </div>
    </div>
  );
}

export default Gallery;
