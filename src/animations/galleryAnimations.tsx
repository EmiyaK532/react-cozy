import { CSSProperties } from "react";

// 全局样式添加函数 - 用于确保样式只被添加一次
let stylesAdded = false;
export const addGlobalStyles = () => {
  if (stylesAdded) return;

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes slideUp {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideDown {
      0% { transform: translateY(-20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    @keyframes scaleIn {
      0% { transform: scale(0.95); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes rotateIn {
      0% { transform: rotate(-10deg) scale(0.9); opacity: 0; }
      100% { transform: rotate(0) scale(1); opacity: 1; }
    }

    .animate-fade-in {
      animation: fadeIn 0.7s ease forwards;
    }
    
    .animate-slide-up {
      animation: slideUp 0.7s ease forwards;
    }
    
    .animate-slide-down {
      animation: slideDown 0.7s ease forwards;
    }

    .animate-scale-in {
      animation: scaleIn 0.6s ease forwards;
    }

    .animate-rotate-in {
      animation: rotateIn 0.7s ease forwards;
    }
    
    .animation-delay-100 {
      animation-delay: 100ms;
    }
    
    .animation-delay-200 {
      animation-delay: 200ms;
    }
    
    .animation-delay-300 {
      animation-delay: 300ms;
    }
    
    .animation-delay-400 {
      animation-delay: 400ms;
    }
    
    .animation-delay-500 {
      animation-delay: 500ms;
    }
    
    .animation-delay-600 {
      animation-delay: 600ms;
    }
    
    .animation-delay-700 {
      animation-delay: 700ms;
    }
    
    .animation-delay-800 {
      animation-delay: 800ms;
    }
    
    .animation-delay-900 {
      animation-delay: 900ms;
    }
    
    .animation-delay-1000 {
      animation-delay: 1000ms;
    }
  `;
  document.head.appendChild(style);
  stylesAdded = true;
};

// 画廊样式配置
export const GALLERY_STYLES = {
  container: {
    position: "relative",
    minHeight: "100vh",
    padding: "1rem",
    opacity: 0,
    animation: "fadeIn 1s ease forwards",
  } as CSSProperties,
};

// 详情页样式配置
export const GALLERY_DETAIL_STYLES = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
  } as CSSProperties,

  imageContainer: {
    position: "relative",
    width: "100%",
    height: "70vh",
    overflow: "hidden",
    opacity: 0,
    animation: "fadeIn 1s ease forwards 0.2s",
  } as CSSProperties,

  infoContainer: {
    position: "relative",
    marginTop: "2rem",
    opacity: 0,
    animation: "fadeIn 1s ease forwards 0.5s",
  } as CSSProperties,
};

// 图像卡片样式配置
export const IMAGE_CARD_STYLES = {
  container: {
    position: "absolute",
    width: "300px",
    cursor: "pointer",
    transition: "transform 0.3s ease, z-index 0s linear 0.15s",
    zIndex: 1,
  } as CSSProperties,

  containerHover: {
    zIndex: 10,
    transition: "transform 0.3s ease, z-index 0s",
  } as CSSProperties,

  image: {
    width: "100%",
    height: "auto",
    transition: "filter 0.3s ease",
  } as CSSProperties,

  imageHover: {
    filter: "brightness(1.1)",
  } as CSSProperties,

  info: {
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    color: "white",
    opacity: 0,
    transform: "translateY(10px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  } as CSSProperties,

  infoHover: {
    opacity: 1,
    transform: "translateY(0)",
  } as CSSProperties,
};

// 分割文本为单个字符
export const splitCharacters = (text: string) => {
  return text.split("").map((char, index) => (
    <span
      key={index}
      className="inline-block"
      style={{
        opacity: 0,
        animation: `fadeIn 0.3s ease forwards ${index * 0.03}s`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

// 创建详情页动画
export const createDetailAnimation = (
  element: HTMLElement | null,
  delay: number = 0
) => {
  if (!element) return;

  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`;

  // 强制回流
  void element.offsetWidth;

  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
};
