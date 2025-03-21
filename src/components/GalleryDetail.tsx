import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// 定义详情页数据接口
interface DetailData {
  id: string;
  number: string;
  title: string;
  character: string;
  mainQuote: string;
  subQuotes: string[];
  image: string;
}

// 确保全局样式只添加一次
let stylesAdded = false;

function GalleryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // 添加全局动画样式
  useEffect(() => {
    if (!stylesAdded) {
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-50px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(50px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from { transform: scale(1.1); }
          to { transform: scale(1); }
        }
        
        @keyframes scaleUp {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
      stylesAdded = true;
    }
  }, []);

  // 进入动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // 详情页数据配置
  const details: Record<string, DetailData> = {
    white: {
      id: "white",
      number: "01",
      title: "WHITE",
      character: "HOWHITE",
      mainQuote: "I believe we can see someday again",
      subQuotes: [
        "white eternity...",
        "The first promise",
        "Looking forward to spring",
      ],
      image: "/images/01.jpg",
    },
    butterfly: {
      id: "butterfly",
      number: "02",
      title: "BUTTERFLY",
      character: "SHIRAHA",
      mainQuote: "Before the Blue",
      subQuotes: [
        "The end of the story promise",
        "Butterfly effect",
        "Wings of change",
      ],
      image: "/images/02.jpg",
    },
    letter: {
      id: "letter",
      number: "03",
      title: "LETTER",
      character: "SENA",
      mainQuote: "Our first promise and your words I wanted to express",
      subQuotes: [
        "und Im Thale blüht der Frühling auf",
        "Letters from the past",
        "Memories in ink",
      ],
      image: "/images/03.jpg",
    },
  };

  const currentDetail = details[id as keyof typeof details];

  // 图片预加载处理
  useEffect(() => {
    const img = new Image();
    img.src = currentDetail?.image;
    img.onload = () => setIsLoading(false);
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
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center z-10"
      >
        <span className="text-3xl rotate-45">+</span>
      </button>

      <div className="container mx-auto h-full flex items-center justify-center gap-24 px-8">
        {/* 左侧图片区域 */}
        <div
          className="relative w-[500px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-50px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="relative">
            {/* 相框效果 */}
            <div className="absolute inset-0 border-[24px] border-white shadow-2xl z-10" />

            {/* 主图片 */}
            <div
              className="relative aspect-[3/4] overflow-hidden bg-gray-100"
              style={{
                transform: isVisible ? "scale(1)" : "scale(1.1)",
                transition: "transform 0.6s ease",
              }}
            >
              <img
                src={currentDetail.image}
                alt={currentDetail.title}
                className="w-full h-full object-cover"
                style={{
                  opacity: isLoading ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            </div>

            {/* 序号标签 */}
            <div
              className="absolute -top-6 -right-6 w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold z-20"
              style={{
                transform: isVisible ? "scale(1)" : "scale(0)",
                transition: "transform 0.4s ease 0.3s",
              }}
            >
              {currentDetail.number}
            </div>

            {/* 标题标签 */}
            <div
              className="absolute -bottom-4 left-8 bg-white border-2 border-black px-6 py-2 z-20"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.4s ease 0.4s, transform 0.4s ease 0.4s",
              }}
            >
              {currentDetail.title}
            </div>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="w-[400px]">
          {/* 角色名称 */}
          <h2
            className="font-serif text-8xl font-black mb-16 relative tracking-wide"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {currentDetail.character}
            <div className="absolute -bottom-4 left-0 w-12 h-1 bg-black" />
          </h2>

          {/* 主标语 */}
          <p
            className="font-serif text-2xl mb-12 font-medium tracking-wide"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            {currentDetail.mainQuote}
          </p>

          {/* 引用列表 */}
          <div className="space-y-8">
            {currentDetail.subQuotes.map((quote, index) => (
              <div
                key={index}
                className="relative pl-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.6s ease ${
                    0.6 + index * 0.1
                  }s, transform 0.6s ease ${0.6 + index * 0.1}s`,
                }}
              >
                {/* 装饰性短线 */}
                <span className="absolute left-0 top-1/2 w-4 h-px bg-black" />
                <p className="font-serif text-lg tracking-wide">{quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 背景纹理 */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_6px)]" />
      </div>
    </div>
  );
}

export default GalleryDetail;
