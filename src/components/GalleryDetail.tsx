import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./GalleryDetail.css";
import { useState } from "react";

function GalleryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  const detailData = {
    white: {
      title: "WHITE",
      character: "YUUKI",
      number: "1",
      image: "/images/01.jpg",
      quotes: ["I believe we can see someday again", "white eternity..."],
    },
    night: {
      title: "NIGHT",
      character: "KURO",
      number: "2",
      image: "/images/02.jpg",
      quotes: [
        "as the Reincarnation",
        "That night",
        "Thale",
        "Nicht",
        "der Frühling",
        "auf",
      ],
    },
    clover: {
      title: "CLOVER",
      character: "ANZU",
      number: "4",
      image: "/images/03.jpg",
      quotes: [
        "それは、恋ぶ想い",
        "それは、永遠の誓い",
        "それは、心からの願い",
        "それは、抱き続けた後悔",
        "そして、幼い日の約束",
      ],
    },
  };

  const data = detailData[id as keyof typeof detailData];

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <motion.div
      className="gallery-detail"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: isLeaving ? "-100%" : "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <button className="close-button" onClick={handleClose}>
        ×
      </button>

      <div className="detail-content">
        <div className="detail-image-container">
          <div className="number-circle">{data?.number}</div>
          <img
            src={data?.image}
            alt={data?.character}
            className="detail-image"
          />
          <div className="image-tag">{data?.title}</div>
        </div>

        <div className="detail-text">
          <h2 className="detail-character">{data?.character}</h2>
          <div className="quotes-container">
            {data?.quotes.map((quote, index) => (
              <p key={index} className="quote-line">
                {quote}
              </p>
            ))}
            <div className="quote-line-decoration">――</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GalleryDetail;
