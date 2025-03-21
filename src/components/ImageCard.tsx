import { useState, useEffect } from "react";
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
      `;
      document.head.appendChild(style);
      stylesAdded = true;
    }
  }, []);

  return (
    <div
      className="relative opacity-0 translate-y-12"
      style={{
        animation: `fadeInUp 0.8s ${index * 0.2}s forwards ease-out`,
        opacity: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/gallery/${id}`}>
        <div className="relative mb-6 aspect-[3/4] overflow-hidden">
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
        style={{
          animation: `fadeInRight 0.6s ${index * 0.3 + 0.2}s forwards ease-out`,
          opacity: 0,
          transform: "translateX(-20px)",
        }}
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
