import { useEffect } from "react";

// 全局样式添加标志
let cssStarsStylesAdded = false;

/**
 * 添加备用的纯CSS背景星星
 * 用于低性能设备的备选方案
 */
function CSSStars() {
  useEffect(() => {
    if (!cssStarsStylesAdded) {
      const style = document.createElement("style");
      style.innerHTML = `
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #000, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 120px 90px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 10px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 170px 60px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 210px 30px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 260px 70px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 300px 50px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 350px 20px, #000, rgba(0,0,0,0));
          background-size: 400px 400px;
          animation: moveStars 150s linear infinite;
          opacity: 0.3;
        }
        
        @keyframes moveStars {
          from { transform: translateY(0); }
          to { transform: translateY(-400px); }
        }
      `;
      document.head.appendChild(style);
      cssStarsStylesAdded = true;
    }
  }, []);

  return (
    <div className="absolute inset-0 bg-[#f8f8f8]">
      <div className="stars-container"></div>
    </div>
  );
}

export default CSSStars;
