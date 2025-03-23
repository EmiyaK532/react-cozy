import React from "react";
import { ImageCardProps } from "../../types/gallery.types";
import { IMAGE_CARD_STYLES } from "../../animations/galleryAnimations";
import { CSSProperties } from "react";
import ImageCardImage from "./ImageCardImage";
import ImageCardInfo from "./ImageCardInfo";
import { getAnimationDelayClass } from "./constants";

interface ImageCardContentProps {
  id: string;
  title: string;
  character: string;
  quote?: string;
  subQuote?: string;
  image: string;
  style?: CSSProperties;
  index?: number;
  isHovered?: boolean;
  tiltStyle?: { transform: string };
}

/**
 * 图像卡片内容组件
 * 负责渲染卡片的视觉内容和信息，组合图像和信息子组件
 */
const ImageCardContent: React.FC<ImageCardContentProps> = ({
  id,
  title,
  character,
  quote,
  subQuote,
  image,
  style,
  index = 0,
  isHovered = false,
  tiltStyle = { transform: "" },
}) => {
  // 使用通用函数计算动画延迟类
  const animationDelayClass = getAnimationDelayClass(index);

  return (
    <div
      style={{
        ...IMAGE_CARD_STYLES.container,
        ...(style || {}),
        ...(isHovered ? IMAGE_CARD_STYLES.containerHover : {}),
        transform: tiltStyle.transform,
        display: "block",
      }}
      className={`opacity-0 animate-fade-in ${animationDelayClass}`}
    >
      {/* 使用图像子组件 */}
      <ImageCardImage src={image} alt={title} isHovered={isHovered} />

      {/* 使用信息子组件 */}
      <ImageCardInfo
        title={title}
        character={character}
        quote={quote}
        subQuote={subQuote}
        isHovered={isHovered}
      />
    </div>
  );
};

export default React.memo(ImageCardContent);
