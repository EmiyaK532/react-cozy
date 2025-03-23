import React from "react";
import { motion } from "framer-motion";

interface GalleryTitleProps {
  isInView: boolean;
}

/**
 * 画廊标题组件
 * 显示带有动画效果的标题
 */
const GalleryTitle: React.FC<GalleryTitleProps> = ({ isInView }) => {
  return (
    <div
      className="inline-block bg-black px-8 py-3 relative overflow-hidden group cursor-pointer transition-all duration-300 hardware-accelerated"
      style={{
        transform: isInView
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
  );
};

export default React.memo(GalleryTitle);
