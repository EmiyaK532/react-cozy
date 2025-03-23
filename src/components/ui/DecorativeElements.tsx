import React, { memo, CSSProperties } from "react";
import {
  DecorativeTextProps,
  DecorativeElementProps,
} from "../../types/gallery.types";

/**
 * 装饰性文本组件
 * 用于展示具有特定样式的文本元素
 */
export const DecorativeText = memo(
  ({ text, style, className = "" }: DecorativeTextProps) => {
    return (
      <div
        className={`absolute cursor-pointer ${className}`}
        style={style as CSSProperties}
      >
        {text}
      </div>
    );
  }
);

/**
 * 装饰性线条组件
 * 用于展示具有特定样式的线条元素
 */
export const DecorativeLine = memo(
  ({ style, className = "" }: DecorativeElementProps) => {
    return (
      <div
        className={`absolute cursor-pointer ${className}`}
        style={style as CSSProperties}
      ></div>
    );
  }
);

/**
 * 装饰性圆形组件
 * 用于展示具有特定样式的圆形元素
 */
export const DecorativeCircle = memo(
  ({ style, className = "" }: DecorativeElementProps) => {
    return (
      <div
        className={`absolute cursor-pointer ${className}`}
        style={style as CSSProperties}
      ></div>
    );
  }
);

// 为了更好的调试，为组件添加displayName
DecorativeText.displayName = "DecorativeText";
DecorativeLine.displayName = "DecorativeLine";
DecorativeCircle.displayName = "DecorativeCircle";
