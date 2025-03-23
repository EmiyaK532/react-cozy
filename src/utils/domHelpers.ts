/**
 * DOM 相关辅助函数
 */

/**
 * 添加全局样式
 * @param styleString CSS样式字符串
 * @param id 样式标识，防止重复添加
 * @returns 是否成功添加
 */
export const addGlobalStyle = (styleString: string, id: string): boolean => {
  // 检查样式是否已存在
  if (document.getElementById(id)) return false;

  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = styleString;
  document.head.appendChild(style);
  return true;
};

/**
 * 创建去抖动函数
 * @param func 要执行的函数
 * @param wait 等待时间
 * @returns 去抖动后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};

/**
 * 创建节流函数
 * @param func 要执行的函数
 * @param limit 限制时间
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * 获取元素相对于视口的位置
 * @param el DOM元素
 * @returns 元素位置信息
 */
export const getElementPosition = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
    center: {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    },
    inViewport:
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth,
  };
};

/**
 * 动画辅助函数 - 线性插值
 * @param start 起始值
 * @param end 结束值
 * @param amount 插值系数
 * @returns 插值结果
 */
export const lerp = (start: number, end: number, amount: number): number => {
  return (1 - amount) * start + amount * end;
};

/**
 * 计算鼠标位置与元素的关系
 * @param mouseX 鼠标X坐标
 * @param mouseY 鼠标Y坐标
 * @param element DOM元素
 * @returns 相对位置（-1到1）
 */
export const getMouseElementRelation = (
  mouseX: number,
  mouseY: number,
  element: HTMLElement
) => {
  const rect = element.getBoundingClientRect();
  const x = ((mouseX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
  const y = ((mouseY - rect.top) / rect.height - 0.5) * 2; // -1 to 1

  return { x, y };
};
