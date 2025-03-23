/**
 * 图像卡片相关常量
 */

// 动画延迟的基础值（毫秒）
export const ANIMATION_DELAY_BASE = 100;

// 动画延迟的最大数量
export const ANIMATION_DELAY_MAX_COUNT = 10;

// 图像卡片的基础宽度
export const IMAGE_CARD_BASE_WIDTH = "300px";

// 3D倾斜效果的角度限制（度）
export const TILT_ANGLE_LIMIT = 10;

// 3D倾斜效果的缩放比例
export const TILT_SCALE = 1.02;

/**
 * 计算动画延迟类
 * @param index 元素索引
 * @returns 对应的CSS类名
 */
export const getAnimationDelayClass = (index: number): string => {
  const delayNum = (index % ANIMATION_DELAY_MAX_COUNT) * ANIMATION_DELAY_BASE;
  return `animation-delay-${delayNum}`;
};
