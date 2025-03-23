import React, { useEffect, useRef, ReactNode } from "react";
import use3DTilt from "../../hooks/use3DTilt";
import { CSSProperties } from "react";

interface ImageCardContainerProps {
  children: ReactNode;
  isHovered: boolean;
  tiltStyle: { transform: string };
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * 图像卡片容器组件
 * 负责处理3D倾斜效果和事件监听
 */
const ImageCardContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 创建引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用3D倾斜效果钩子
  const {
    tiltStyle,
    isHovered,
    handleMouseMove: onTiltMouseMove,
    handleMouseEnter: onTiltMouseEnter,
    handleMouseLeave: onTiltMouseLeave,
  } = use3DTilt();

  // 注册DOM事件监听器
  useEffect(() => {
    // 设置引用
    if (containerRef.current) {
      // 注册事件处理程序
      const element = containerRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        if (!element) return;

        // 创建一个合成React事件对象用于传递给钩子的处理函数
        const syntheticEvent = {
          clientX: e.clientX,
          clientY: e.clientY,
          currentTarget: element,
          target: element,
        } as unknown as React.MouseEvent<HTMLDivElement>;

        onTiltMouseMove(syntheticEvent);
      };

      const handleMouseEnter = () => onTiltMouseEnter();
      const handleMouseLeave = () => onTiltMouseLeave();

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [onTiltMouseMove, onTiltMouseEnter, onTiltMouseLeave]);

  // 创建克隆的子元素并传递props
  const childrenWithProps = React.Children.map(children, (child) => {
    // 确保child是一个React元素
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isHovered,
        tiltStyle,
      } as any);
    }
    return child;
  });

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {childrenWithProps}
    </div>
  );
};

export default React.memo(ImageCardContainer);
