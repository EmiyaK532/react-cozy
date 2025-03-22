import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface ImageCardProps {
  id: string;
  title: string;
  character: string;
  quote: string;
  subQuote: string;
  image: string;
  index: number;
}

// 确保全局样式只添加一次
let stylesAdded = false;

function ImageCard({
  id,
  title,
  character,
  quote,
  subQuote,
  image,
  index,
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D悬停效果状态
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tiltStyle, setTiltStyle] = useState({
    transform:
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.6s ease",
  });

  // 添加全局动画样式
  useEffect(() => {
    if (!stylesAdded) {
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes floatAnimation {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        
        .float-on-hover:hover {
          animation: floatAnimation 3s ease-in-out infinite;
        }
        
        .card-image-shadow {
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: box-shadow 0.3s ease;
        }
        
        .card-image-shadow:hover {
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
      `;
      document.head.appendChild(style);
      stylesAdded = true;
    }
  }, []);

  // 3D悬停效果处理
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

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
  };

  // 重置倾斜效果
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setTiltStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s ease",
    });
    setIsHovered(false);
  };

  // 计算信息区域的样式
  const getInfoStyle = () => {
    return {
      animation: `fadeInRight 0.6s ${index * 0.3 + 0.2}s forwards ease-out`,
      opacity: 0,
      transformStyle: "preserve-3d" as "preserve-3d",
      transformOrigin: "left center",
      transform: `translateZ(${isHovered ? 20 : 0}px) translateX(${
        isHovered ? 5 : -20
      }px)`,
      transition: "transform 0.3s ease",
    };
  };

  return (
    <div
      ref={cardRef}
      className="relative opacity-0 translate-y-12 float-on-hover"
      style={{
        animation: `fadeInUp 0.8s ${index * 0.2}s forwards ease-out`,
        opacity: 0,
        transformStyle: "preserve-3d",
        ...tiltStyle,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/gallery/${id}`}>
        <div className="relative mb-6 aspect-[3/4] overflow-hidden card-image-shadow">
          {/* 发光效果 */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${
                mousePosition.x * 50 + 50
              }% ${
                mousePosition.y * 50 + 50
              }%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)`,
              opacity: isHovered ? 0.8 : 0,
              mixBlendMode: "overlay",
            }}
          />

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-400"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
            }}
          />
          <div
            className="absolute -bottom-3 left-4 bg-white border-2 border-black px-4 py-1 transition-transform duration-300"
            style={{
              transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              transformStyle: "preserve-3d",
              transformOrigin: "center bottom",
              // 添加一点Z轴位移让它更突出
              zIndex: isHovered ? 2 : 1,
            }}
          >
            <span className="relative z-10">{title}</span>
            <div
              className="absolute inset-0 bg-black transition-all duration-300"
              style={{ width: isHovered ? "100%" : "0%" }}
            />
          </div>
        </div>
      </Link>

      <div
        className="space-y-3 pl-4 border-l-2 border-gray-200"
        style={getInfoStyle()}
      >
        <p
          className="text-xs uppercase tracking-wider transition-transform duration-300"
          style={{ transform: isHovered ? "translateX(5px)" : "translateX(0)" }}
        >
          {character}
        </p>
        <p className="text-sm italic">{quote}</p>
        <p className="text-xs text-gray-500">{subQuote}</p>
      </div>
    </div>
  );
}

export default ImageCard;
