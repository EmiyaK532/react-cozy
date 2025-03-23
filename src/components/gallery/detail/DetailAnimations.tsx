import { gsap } from "gsap";
import React from "react";

// 确保全局样式只添加一次
let stylesAdded = false;

/**
 * 添加详情页全局动画样式
 */
export const addDetailStyles = () => {
  if (!stylesAdded) {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInLeft {
        from { 
          opacity: 0;
          transform: translateX(-50px);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInRight {
        from { 
          opacity: 0;
          transform: translateX(50px);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes scaleIn {
        from { transform: scale(1.1); }
        to { transform: scale(1); }
      }
      
      @keyframes scaleUp {
        from { transform: scale(0); }
        to { transform: scale(1); }
      }
      
      @keyframes fadeInUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .gallery-detail-char {
        display: inline-block;
        transition: transform 0.4s, opacity 0.4s;
        transition-timing-function: cubic-bezier(0.2, 0.6, 0.4, 1);
      }
      
      .gallery-detail-char:hover {
        transform: translateY(-5px) scale(1.1);
        color: #333;
      }
    `;
    document.head.appendChild(style);
    stylesAdded = true;
  }
};

/**
 * 分割文本为带动画的单个字符
 */
export const splitCharacters = (
  text: string,
  isVisible: boolean = false
): React.ReactNode => {
  return text.split("").map((char, index) => (
    <span
      key={index}
      className="gallery-detail-char"
      style={{
        transitionDelay: `${index * 30}ms`,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {char}
    </span>
  ));
};

/**
 * 创建GSAP动画
 */
export const createDetailAnimation = (
  elements: {
    imageContainerRef: React.RefObject<HTMLDivElement>;
    imageRef: React.RefObject<HTMLDivElement>;
    numberRef: React.RefObject<HTMLDivElement>;
    titleRef: React.RefObject<HTMLDivElement>;
    textContainerRef: React.RefObject<HTMLDivElement>;
    characterRef: React.RefObject<HTMLHeadingElement>;
    quoteRef: React.RefObject<HTMLParagraphElement>;
    quoteItemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  },
  isVisible: boolean,
  isLoading: boolean
) => {
  // 如果组件不可见或正在加载，不执行动画
  if (!isVisible || isLoading) {
    return undefined;
  }

  const {
    imageContainerRef,
    imageRef,
    numberRef,
    titleRef,
    textContainerRef,
    characterRef,
    quoteRef,
    quoteItemsRef,
  } = elements;

  // 检查所有必需的元素引用
  if (
    !imageContainerRef?.current ||
    !imageRef?.current ||
    !numberRef?.current ||
    !titleRef?.current ||
    !textContainerRef?.current ||
    !characterRef?.current ||
    !quoteRef?.current
  ) {
    console.warn("详情页动画：一个或多个元素引用为null，动画未应用");
    return undefined;
  }

  // 创建动画时间线
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  try {
    // 设置初始状态
    tl.set([imageContainerRef.current, textContainerRef.current], {
      autoAlpha: 0,
    });

    // 图像容器淡入
    tl.to(imageContainerRef.current, {
      autoAlpha: 1,
      x: 0,
      duration: 0.8,
    });

    // 图像缩放
    tl.to(
      imageRef.current,
      {
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // 编号弹出
    tl.to(
      numberRef.current,
      {
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.6"
    );

    // 标题淡入
    tl.to(
      titleRef.current,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.4"
    );

    // 文本容器淡入
    tl.to(
      textContainerRef.current,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.8,
      },
      "-=0.6"
    );

    // 角色名称揭示
    tl.to(
      characterRef.current,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
      },
      "-=0.4"
    );

    // 引用淡入
    tl.to(
      quoteRef.current,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.6"
    );

    // 为引用项添加交错动画
    if (quoteItemsRef.current && quoteItemsRef.current.length > 0) {
      quoteItemsRef.current.forEach((ref, index) => {
        if (ref) {
          tl.to(
            ref,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.5,
            },
            `-=${0.4 - index * 0.1}`
          );
        }
      });
    }
  } catch (error) {
    console.error("GSAP动画错误:", error);
    tl.kill();
    return undefined;
  }

  // 返回清理函数
  return () => {
    if (tl) {
      tl.kill();
    }
  };
};
