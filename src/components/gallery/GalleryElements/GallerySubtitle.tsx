import React from "react";
import { motion } from "framer-motion";

interface GallerySubtitleProps {
  isInView: boolean;
}

/**
 * 画廊副标题组件
 * 显示作者信息和身份
 */
const GallerySubtitle: React.FC<GallerySubtitleProps> = ({ isInView }) => {
  return (
    <div className="mt-4 relative">
      {/* 开发者信息 */}
      <motion.p
        className="font-serif text-xl tracking-wide relative inline-block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* 名字部分 */}
        <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium hardware-accelerated"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(15px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          HoWhite
        </span>
        {/* 分隔符 */}
        <span
          className="mx-2 opacity-50"
          style={{
            opacity: isInView ? 0.5 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          /
        </span>
        {/* 身份描述 */}
        <motion.span
          className="italic"
          style={{
            opacity: isInView ? 0.75 : 0,
            transform: isInView ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
          }}
        >
          a developer
        </motion.span>
      </motion.p>

      {/* 装饰性下划线 */}
      <motion.div
        className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-purple-600 to-pink-600"
        style={{
          width: isInView ? "100%" : "0%",
          transition: "width 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
        }}
      />
    </div>
  );
};

export default React.memo(GallerySubtitle);
