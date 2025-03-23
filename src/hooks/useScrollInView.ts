import { useState, useRef, useEffect } from "react";

/**
 * 创建一个监听元素是否进入视口的钩子函数
 * @param threshold 触发交集比例阈值
 * @param rootMargin 根元素边距
 * @returns 引用对象和状态布尔值
 */
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

export default useScrollInView;
