import { Canvas } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useEffect, useState } from "react";

// 简化版本的星星组件，减少计数来提高性能
function Stars() {
  const ref = useRef<any>();

  // 减少粒子数量以提高性能
  const stars = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  // 降低旋转速度以减少每帧计算量
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <Points ref={ref} positions={stars} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#000"
        size={0.003} // 增加点的大小，使用更少的点也能达到类似的视觉效果
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// 全局样式添加标志
let cssStarsStylesAdded = false;

// 添加备用的纯CSS背景
function CSSStars() {
  useEffect(() => {
    if (!cssStarsStylesAdded) {
      const style = document.createElement("style");
      style.innerHTML = `
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #000, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 120px 90px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 10px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 170px 60px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 210px 30px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 260px 70px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 300px 50px, #000, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 350px 20px, #000, rgba(0,0,0,0));
          background-size: 400px 400px;
          animation: moveStars 150s linear infinite;
          opacity: 0.3;
        }
        
        @keyframes moveStars {
          from { transform: translateY(0); }
          to { transform: translateY(-400px); }
        }
      `;
      document.head.appendChild(style);
      cssStarsStylesAdded = true;
    }
  }, []);

  return (
    <div className="absolute inset-0 bg-[#f8f8f8]">
      <div className="stars-container"></div>
    </div>
  );
}

function Background() {
  // 使用状态决定是使用3D渲染还是CSS备用方案
  const [use3D, setUse3D] = useState(true);

  // 检测设备性能，在低端设备上使用CSS方案
  useEffect(() => {
    // 简单性能检测 - 如果设备帧率低或是移动设备，使用CSS方案
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 尝试检测GPU性能
    if ("gpu" in navigator) {
      (navigator as any).gpu.requestAdapter().then((adapter: any) => {
        if (!adapter || isMobile) {
          setUse3D(false);
        }
      });
    } else if (isMobile) {
      setUse3D(false);
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
          setUse3D(false);
        }
      }

      if (use3D) {
        requestAnimationFrame(checkFrameRate);
      }
    }

    requestAnimationFrame(checkFrameRate);

    // 5秒后停止检测
    const timer = setTimeout(() => {
      frames = 0;
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // 根据状态选择渲染方式
  if (!use3D) {
    return <CSSStars />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["#f8f8f8"]} />
        <Stars />
      </Canvas>
    </div>
  );
}

export default Background;
