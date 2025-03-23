import { useState } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import CSSStars from "./CSSStars";
import PerformanceDetector from "./PerformanceDetector";

/**
 * 背景组件
 * 根据设备性能选择合适的背景渲染方式
 */
function Background() {
  // 使用状态决定是使用3D渲染还是CSS备用方案
  const [use3D, setUse3D] = useState(true);

  // 处理性能检测结果
  const handlePerformanceDetected = (canUse3D: boolean) => {
    setUse3D(canUse3D);
  };

  // 根据状态选择渲染方式
  return (
    <>
      <PerformanceDetector onPerformanceDetected={handlePerformanceDetected} />
      {use3D ? <BackgroundCanvas /> : <CSSStars />}
    </>
  );
}

export default Background;
