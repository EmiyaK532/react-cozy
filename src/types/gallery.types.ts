// 画廊元素类型定义
export type ElementType = "image" | "text" | "decorative" | "shape";
export type DecorativeElement = "line" | "circle";

// 图片卡片数据接口
export interface ImageCardData {
  id: string;
  title: string;
  character: string;
  quote: string;
  subQuote: string;
  image: string;
}

// 画廊元素接口
export interface GalleryElement {
  type: ElementType;
  data?: ImageCardData;
  text?: string;
  element?: DecorativeElement;
  style: string;
  className?: string;
}

// 文本元素属性
export interface DecorativeTextProps {
  text: string;
  style: string;
  className?: string;
}

// 装饰元素属性
export interface DecorativeElementProps {
  style: string;
  className?: string;
}

// ImageCard组件属性
export interface ImageCardProps extends ImageCardData {
  index: number;
}

// 画廊详情数据接口
export interface DetailData {
  id: string;
  number: string;
  title: string;
  character: string;
  mainQuote: string;
  subQuotes: string[];
  image: string;
}
