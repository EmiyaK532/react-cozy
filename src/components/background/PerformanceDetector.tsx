import { useState, useEffect } from "react";

interface PerformanceDetectorProps {
  onPerformanceDetected: (use3D: boolean) => void;
}

/**
 * 性能检测组件
 * 检测设备性能并决定使用哪种渲染方式
 */
function PerformanceDetector({
  onPerformanceDetected,
}: PerformanceDetectorProps) {
  useEffect(() => {
    // 简单性能检测 - 如果设备帧率低或是移动设备，使用CSS方案
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 尝试检测GPU性能
    if ("gpu" in navigator) {
      (navigator as any).gpu.requestAdapter().then((adapter: any) => {
        if (!adapter || isMobile) {
          onPerformanceDetected(false);
        }
      });
    } else if (isMobile) {
      onPerformanceDetected(false);
    }

    // 添加帧率检测
    let lastTime = performance.now();
    let frames = 0;

    function checkFrameRate() {
      frames++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = frames;
        frames = 0;
        lastTime = currentTime;

        // 如果帧率低于45，使用CSS方案
        if (fps < 45) {
          onPerformanceDetected(false);
        }
      }

      requestAnimationFrame(checkFrameRate);
    }

    requestAnimationFrame(checkFrameRate);

    // 5秒后停止检测
    const timer = setTimeout(() => {
      frames = 0;
    }, 5000);

    return () => clearTimeout(timer);
  }, [onPerformanceDetected]);

  return null; // 这个组件不渲染任何内容
}

export default PerformanceDetector;
