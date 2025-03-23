import React, { RefObject } from "react";
import { DetailData } from "../../../types/gallery.types";

interface DetailImageProps {
  detail: DetailData;
  isLoading: boolean;
  isVisible: boolean;
  imageContainerRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLDivElement>;
  numberRef: RefObject<HTMLDivElement>;
  titleRef: RefObject<HTMLDivElement>;
}

/**
 * 画廊详情图像组件
 * 负责渲染详情页的图像区域
 */
const DetailImage: React.FC<DetailImageProps> = ({
  detail,
  isLoading,
  isVisible,
  imageContainerRef,
  imageRef,
  numberRef,
  titleRef,
}) => {
  return (
    <div
      ref={imageContainerRef}
      className="relative w-[500px]"
      style={{
        opacity: 0,
        transform: "translateX(-50px)",
      }}
    >
      <div className="relative">
        {/* 相框效果 */}
        <div className="absolute inset-0 border-[24px] border-white shadow-2xl z-10" />

        {/* 主图片 */}
        <div
          ref={imageRef}
          className="relative aspect-[3/4] overflow-hidden bg-gray-100"
          style={{
            transform: "scale(1.1)",
          }}
        >
          <img
            src={detail.image}
            alt={detail.title}
            className="w-full h-full object-cover"
            style={{
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        </div>

        {/* 序号标签 */}
        <div
          ref={numberRef}
          className="absolute -top-6 -right-6 w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold z-20"
          style={{
            transform: "scale(0)",
          }}
        >
          {detail.number}
        </div>

        {/* 标题标签 */}
        <div
          ref={titleRef}
          className="absolute -bottom-4 left-8 bg-white border-2 border-black px-6 py-2 z-20"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          {detail.title}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailImage);
