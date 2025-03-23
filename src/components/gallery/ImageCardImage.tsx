import React from "react";
import { IMAGE_CARD_STYLES } from "../../animations/galleryAnimations";

interface ImageCardImageProps {
  src: string;
  alt: string;
  isHovered?: boolean;
}

/**
 * 图像卡片图片组件
 * 负责渲染卡片的图像部分
 */
const ImageCardImage: React.FC<ImageCardImageProps> = ({
  src,
  alt,
  isHovered = false,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full shadow-md"
      style={{
        ...IMAGE_CARD_STYLES.image,
        ...(isHovered ? IMAGE_CARD_STYLES.imageHover : {}),
      }}
    />
  );
};

export default React.memo(ImageCardImage);
