import React, { RefObject, MutableRefObject } from "react";
import { DetailData } from "../../../types/gallery.types";

interface DetailInfoProps {
  detail: DetailData;
  isVisible: boolean;
  splitCharacters: (text: string) => React.ReactNode;
  textContainerRef: RefObject<HTMLDivElement>;
  characterRef: RefObject<HTMLHeadingElement>;
  quoteRef: RefObject<HTMLParagraphElement>;
  quoteItemsRef: MutableRefObject<(HTMLDivElement | null)[]>;
}

/**
 * 画廊详情信息组件
 * 负责渲染详情页的文本信息区域
 */
const DetailInfo: React.FC<DetailInfoProps> = ({
  detail,
  isVisible,
  splitCharacters,
  textContainerRef,
  characterRef,
  quoteRef,
  quoteItemsRef,
}) => {
  return (
    <div
      ref={textContainerRef}
      className="w-[400px]"
      style={{ opacity: 0, transform: "translateX(50px)" }}
    >
      {/* 角色名称 */}
      <h2
        ref={characterRef}
        className="font-serif text-8xl font-black mb-16 relative tracking-wide"
        style={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        }}
      >
        {splitCharacters(detail.character)}
        <div className="absolute -bottom-4 left-0 w-12 h-1 bg-black" />
      </h2>

      {/* 主标语 */}
      <p
        ref={quoteRef}
        className="font-serif text-2xl mb-12 font-medium tracking-wide"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
        }}
      >
        {detail.mainQuote}
      </p>

      {/* 引用列表 */}
      <div className="space-y-8">
        {detail.subQuotes.map((quote, index) => (
          <div
            key={index}
            ref={(el) => {
              quoteItemsRef.current[index] = el;
            }}
            className="relative pl-8"
            style={{
              opacity: 0,
              transform: "translateX(20px)",
            }}
          >
            {/* 装饰性短线 */}
            <span className="absolute left-0 top-1/2 w-4 h-px bg-black" />
            <p className="font-serif text-lg tracking-wide">{quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DetailInfo);
