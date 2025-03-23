import { ReactNode } from "react";

// 定义元素类型接口
export interface GalleryImage {
  id: string;
  title: string;
  character: string;
  quote: string;
  subQuote: string;
  image: string;
}

export interface GalleryText {
  text: string;
  style: string;
  className: string;
}

export interface GalleryDecorative {
  element: "line" | "circle";
  style: string;
  className: string;
}

export type GalleryElement =
  | { type: "image"; data: GalleryImage; style: string }
  | { type: "text"; text: string; style: string; className: string }
  | {
      type: "decorative";
      element: "line" | "circle";
      style: string;
      className: string;
    };

// 将元素分为三列
export const galleryColumns: {
  leftColumn: GalleryElement[];
  middleColumn: GalleryElement[];
  rightColumn: GalleryElement[];
} = {
  // 左列元素 - 约占屏幕宽度的33%左右
  leftColumn: [
    // 原始第一列元素
    {
      type: "image",
      data: {
        id: "white",
        title: "WHITE",
        character: "yuuki",
        quote: "I believe we can see someday again",
        subQuote: "white eternity...",
        image: "/images/01.jpg",
      },
      style: "left-[10%] top-[15%]",
    },
    {
      type: "text",
      text: "Hello",
      style: `
      left-[5%] top-[5%] 
      text-5xl font-black 
      tracking-[0.2em]
      -rotate-12
      bg-clip-text text-transparent 
      bg-gradient-to-r from-gray-800 to-gray-400
      drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]
      border-b-[3px] border-gray-300
      px-4 py-2
      transition-all duration-300
    `,
      className:
        "hover:-translate-y-1 hover:scale-110 hover:border-transparent",
    },
    {
      type: "text",
      text: "KUKURI",
      style:
        "left-[8%] bottom-[15%] -rotate-90 text-2xl font-bold writing-vertical transition-all duration-300",
      className: "hover:rotate-0 hover:-translate-y-2",
    },
    {
      type: "decorative",
      element: "line",
      style:
        "left-[15%] top-[30%] w-[2px] h-[100px] bg-black/10 -rotate-45 transition-all duration-300",
      className: "hover:h-[150px] hover:bg-black/30",
    },
    // 可以添加更多左列元素...
  ],

  // 中列元素 - 约占屏幕宽度的33%左右
  middleColumn: [
    // 原始第二列元素
    {
      type: "image",
      data: {
        id: "butterfly",
        title: "BUTTERFLY",
        character: "shiraha",
        quote: "Before the Blue",
        subQuote: "The end of the story promise",
        image: "/images/02.jpg",
      },
      style: "left-[40%] top-[25%]",
    },
    {
      type: "text",
      text: "SUNFLOWER",
      style:
        "left-[35%] top-[65%] border border-black px-3 py-1 text-xl transition-all duration-300",
      className: "hover:bg-black hover:text-white hover:shadow-lg",
    },
    {
      type: "text",
      text: "PROMISE",
      style:
        "left-[25%] top-[60%] text-3xl font-black mix-blend-difference transition-all duration-300",
      className: "hover:scale-110 hover:text-white",
    },
    {
      type: "text",
      text: "HoWhite",
      style:
        "left-[40%] bottom-[25%] text-xl tracking-widest opacity-30 transition-all duration-500",
      className: "hover:opacity-100 hover:scale-110 hover:-translate-y-2",
    },
    {
      type: "decorative",
      element: "circle",
      style:
        "right-[45%] top-[15%] w-16 h-16 border border-black/20 rounded-full transition-all duration-500",
      className: "hover:scale-125 hover:border-black/50 hover:rotate-180",
    },
    // 可以添加更多中列元素...
  ],

  // 右列元素 - 约占屏幕宽度的33%左右
  rightColumn: [
    // 原始第三列元素
    {
      type: "image",
      data: {
        id: "letter",
        title: "LETTER",
        character: "sena",
        quote: "Our first promise and your words I wanted to express",
        subQuote: "und Im Thale blüht der Frühling auf",
        image: "/images/03.jpg",
      },
      style: "left-[70%] top-[20%]",
    },
    {
      type: "text",
      text: "EMOTION",
      style:
        "right-[5%] top-[15%] border-2 border-black px-4 py-2 text-xl transition-all duration-300",
      className: "hover:border-transparent hover:bg-black hover:text-white",
    },
    {
      type: "text",
      text: "SENA",
      style:
        "right-[30%] top-[40%] text-xl font-light tracking-[1em] opacity-20 transition-all duration-300",
      className: "hover:opacity-80 hover:tracking-[1.5em]",
    },
    {
      type: "text",
      text: "YUUKI",
      style:
        "right-[15%] bottom-[35%] text-2xl font-bold skew-y-12 transition-all duration-300",
      className: "hover:skew-y-0 hover:-translate-y-2",
    },
    // 可以添加更多右列元素...
  ],
};

// 辅助函数：生成新图片元素时的位置计算
export const generateImagePosition = (
  column: "left" | "middle" | "right",
  index: number
): string => {
  // 基础位置映射
  const basePositions = {
    left: { xBase: 10, yStart: 15, yIncrement: 70 },
    middle: { xBase: 40, yStart: 25, yIncrement: 70 },
    right: { xBase: 70, yStart: 20, yIncrement: 70 },
  };

  const { xBase, yStart, yIncrement } = basePositions[column];
  // 计算Y位置，每张图片增加固定高度，并添加一些随机偏移使布局更自然
  const yPos = yStart + index * yIncrement + Math.floor(Math.random() * 10 - 5);
  // 计算X位置，添加少量随机偏移
  const xPos = xBase + Math.floor(Math.random() * 6 - 3);

  return `left-[${xPos}%] top-[${yPos}%]`;
};

// 辅助函数：添加新图片到指定列
export const addImageToColumn = (
  column: "left" | "middle" | "right",
  image: Omit<GalleryImage, "id"> & { id?: string }
): GalleryElement => {
  const columnData = galleryColumns[`${column}Column`];
  const imageCount = columnData.filter((item) => item.type === "image").length;

  // 为图片生成ID（如果未提供）
  const id = image.id || `${column}-image-${imageCount + 1}`;

  // 生成位置样式
  const style = generateImagePosition(column, imageCount);

  return {
    type: "image",
    data: {
      id,
      title: image.title,
      character: image.character,
      quote: image.quote,
      subQuote: image.subQuote,
      image: image.image,
    },
    style,
  };
};

// 将所有元素组合到一个数组中，用于渲染
export const getAllElements = (): GalleryElement[] => {
  return [
    ...galleryColumns.leftColumn,
    ...galleryColumns.middleColumn,
    ...galleryColumns.rightColumn,
  ];
};
