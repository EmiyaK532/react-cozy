import { DetailData } from "@/types/gallery.types";

/**
 * 画廊详情静态数据
 */
export const galleryDetails: Record<string, DetailData> = {
  white: {
    id: "white",
    number: "01",
    title: "WHITE",
    character: "HOWHITE",
    mainQuote: "I believe we can see someday again",
    subQuotes: [
      "white eternity...",
      "The first promise",
      "Looking forward to spring",
    ],
    image: "/images/01.jpg",
  },
  butterfly: {
    id: "butterfly",
    number: "02",
    title: "BUTTERFLY",
    character: "SHIRAHA",
    mainQuote: "Before the Blue",
    subQuotes: [
      "The end of the story promise",
      "Butterfly effect",
      "Wings of change",
    ],
    image: "/images/02.jpg",
  },
  letter: {
    id: "letter",
    number: "03",
    title: "LETTER",
    character: "SENA",
    mainQuote: "Our first promise and your words I wanted to express",
    subQuotes: [
      "und Im Thale blüht der Frühling auf",
      "Letters from the past",
      "Memories in ink",
    ],
    image: "/images/03.jpg",
  },
};
