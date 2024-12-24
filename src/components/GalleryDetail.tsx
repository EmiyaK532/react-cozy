import { useParams } from "react-router-dom";

function GalleryDetail() {
  const { id } = useParams();

  return (
    <div className="gallery-detail">
      <h1>Gallery Detail {id}</h1>
      {/* 在这里添加详情页的内容 */}
    </div>
  );
}

export default GalleryDetail;
