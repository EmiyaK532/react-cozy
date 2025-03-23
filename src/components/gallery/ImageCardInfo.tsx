import React from "react";
import { IMAGE_CARD_STYLES } from "../../animations/galleryAnimations";

interface ImageCardInfoProps {
  title: string;
  character: string;
  quote?: string;
  subQuote?: string;
  isHovered?: boolean;
}

/**
 * 图像卡片信息组件
 * 负责渲染卡片的文字信息部分
 */
const ImageCardInfo: React.FC<ImageCardInfoProps> = ({
  title,
  character,
  quote,
  subQuote,
  isHovered = false,
}) => {
  return (
    <div
      style={{
        ...IMAGE_CARD_STYLES.info,
        ...(isHovered ? IMAGE_CARD_STYLES.infoHover : {}),
      }}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="text-sm mt-1">{character}</div>
      {quote && <p className="mt-2 text-sm italic">"{quote}"</p>}
      {subQuote && <p className="mt-1 text-xs opacity-70">{subQuote}</p>}
    </div>
  );
};

export default React.memo(ImageCardInfo);
