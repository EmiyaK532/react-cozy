import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, createRef } from "react";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import {
  addDetailStyles,
  splitCharacters,
  createDetailAnimation,
} from "./DetailAnimations";
import { galleryDetails } from "./DetailData";

/**
 * 画廊详情主组件
 * 整合和管理所有子组件
 */
function GalleryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // 声明ref对象用于存储子组件的ref
  const imageContainerRef = createRef<HTMLDivElement>();
  const imageRef = createRef<HTMLDivElement>();
  const numberRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLDivElement>();
  const textContainerRef = createRef<HTMLDivElement>();
  const characterRef = createRef<HTMLHeadingElement>();
  const quoteRef = createRef<HTMLParagraphElement>();
  const quoteItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 用于存储动画清理函数的ref
  const cleanupFnRef = useRef<(() => void) | undefined>(undefined);

  // 添加全局动画样式
  useEffect(() => {
    addDetailStyles();
  }, []);

  // 进入动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // GSAP动画
  useEffect(() => {
    // 如果之前有动画，先清理
    if (cleanupFnRef.current) {
      cleanupFnRef.current();
      cleanupFnRef.current = undefined;
    }

    // 确保组件加载完成并且所有ref都已赋值后再启动动画
    if (isVisible && !isLoading) {
      const timer = setTimeout(() => {
        const cleanup = createDetailAnimation(
          {
            imageContainerRef,
            imageRef,
            numberRef,
            titleRef,
            textContainerRef,
            characterRef,
            quoteRef,
            quoteItemsRef,
          },
          isVisible,
          isLoading
        );

        // 保存清理函数以便后续使用
        cleanupFnRef.current = cleanup;
      }, 100); // 添加短暂延迟确保DOM已完全挂载

      return () => {
        clearTimeout(timer);
        if (cleanupFnRef.current) {
          cleanupFnRef.current();
        }
      };
    }
  }, [isVisible, isLoading]);

  // 组件卸载时确保清理所有动画
  useEffect(() => {
    return () => {
      if (cleanupFnRef.current) {
        cleanupFnRef.current();
      }
    };
  }, []);

  // 获取当前展示的详情数据
  const currentDetail = galleryDetails[id as keyof typeof galleryDetails];

  // 图片预加载处理
  useEffect(() => {
    if (currentDetail) {
      const img = new Image();
      img.src = currentDetail.image;
      img.onload = () => setIsLoading(false);
    }
  }, [currentDetail?.image]);

  if (!currentDetail) return null;

  return (
    <div
      className="fixed inset-0 bg-white z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* 关闭按钮 */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center z-10 overflow-hidden"
      >
        <span
          className="text-3xl transition-transform duration-300 hover:rotate-90"
          style={{
            transform: isVisible ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out 0.6s",
          }}
        >
          +
        </span>
      </button>

      <div className="container mx-auto h-full flex items-center justify-center gap-24 px-8">
        {/* 左侧图片区域 */}
        <DetailImage
          detail={currentDetail}
          isLoading={isLoading}
          isVisible={isVisible}
          imageContainerRef={imageContainerRef}
          imageRef={imageRef}
          numberRef={numberRef}
          titleRef={titleRef}
        />

        {/* 右侧内容区域 */}
        <DetailInfo
          detail={currentDetail}
          isVisible={isVisible}
          splitCharacters={(text) => splitCharacters(text, isVisible)}
          textContainerRef={textContainerRef}
          characterRef={characterRef}
          quoteRef={quoteRef}
          quoteItemsRef={quoteItemsRef}
        />
      </div>

      {/* 背景纹理 */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_6px)]" />
      </div>
    </div>
  );
}

export default GalleryDetail;
