import { useState, useRef, useCallback } from "react";

/**
 * 创建3D倾斜效果的自定义钩子
 * @returns 引用和处理函数
 */
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tiltStyle, setTiltStyle] = useState({
    transform:
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.6s ease",
  });

  // 鼠标移动处理
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();

    // 计算鼠标在卡片上的相对位置 (从 -1 到 1)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePosition({ x, y });

    // 设置倾斜变换，倾斜角度限制在 ±10 度
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${
        x * 10
      }deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease",
    });
  }, []);

  // 重置效果
  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
    setTiltStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s ease",
    });
    setIsHovered(false);
  }, []);

  // 鼠标进入处理
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return {
    ref,
    tiltStyle,
    mousePosition,
    isHovered,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
  };
}

export default use3DTilt;
