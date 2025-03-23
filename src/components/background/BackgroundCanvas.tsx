import { Canvas } from "@react-three/fiber";
import Stars from "./Stars";

/**
 * 3D背景画布组件
 * 使用Three.js渲染星星背景
 */
function BackgroundCanvas() {
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

export default BackgroundCanvas;
