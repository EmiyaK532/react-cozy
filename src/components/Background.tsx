import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color } from "three";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

function Stars() {
  const ref = useRef<any>();
  const stars = useMemo(() => {
    return new Float32Array(5000).fill(0).map(() => (Math.random() - 0.5) * 50);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={stars} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#000"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={["#f8f8f8"]} />
        <Stars />
      </Canvas>
    </div>
  );
}

export default Background; 