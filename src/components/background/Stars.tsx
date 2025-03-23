import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

/**
 * 简化版本的星星组件，减少计数来提高性能
 */
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

export default Stars;
