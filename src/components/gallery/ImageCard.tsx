import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ImageCardProps } from "../../types/gallery.types";
import { addGlobalStyles } from "../../animations/galleryAnimations";
import ImageCardContainer from "./ImageCardContainer";
import ImageCardContent from "./ImageCardContent";
import { CSSProperties } from "react";

/**
 * 图像卡片组件 - 展示画廊中的单个图像项
 * 已拆分为多个子组件以提高可维护性
 */
const ImageCard: React.FC<ImageCardProps & { style?: CSSProperties }> = (
  props
) => {
  // 添加全局动画样式
  useEffect(() => {
    addGlobalStyles();
  }, []);

  return (
    <ImageCardContainer>
      <Link to={`/gallery/${props.id}`}>
        <ImageCardContent {...props} />
      </Link>
    </ImageCardContainer>
  );
};

// 使用React.memo优化渲染性能
export default React.memo(ImageCard);
