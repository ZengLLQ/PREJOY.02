import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, MeshDistortMaterial } from "@react-three/drei";

const SilkBlob = ({ position, color, colorB, scale, speed, distort, drift, scrollRef }) => {
  const ref = useRef();
  const mat = useRef();
  const cA = useRef(new THREE.Color(color)).current;
  const cB = useRef(new THREE.Color(colorB)).current;
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.z = t * 0.04 * drift;
    ref.current.rotation.x = Math.sin(t * 0.08) * 0.25;
    ref.current.position.y = position[1] + Math.sin(t * 0.15 * drift) * 0.4;
    if (mat.current) mat.current.color.copy(cA).lerp(cB, scrollRef.current);
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={mat}
        color={color}
        speed={speed}
        distort={distort}
        roughness={0.15}
        metalness={0.55}
      />
    </mesh>
  );
};

const Rig = ({ scrollRef }) => {
  useFrame((state) => {
    const p = scrollRef.current;
    const targetX = state.pointer.x * 0.7;
    const targetY = -state.pointer.y * 0.5 - p * 1.2;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.06;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.06;
    state.camera.position.z = 6 - Math.sin(p * Math.PI) * 1.3;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene = ({ scrollRef }) => {
  const group = useRef();
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.z = scrollRef.current * 0.5;
    group.current.rotation.y = scrollRef.current * 0.9;
    group.current.rotation.x = scrollRef.current * 0.25;
  });
  return (
    <>
      <Rig scrollRef={scrollRef} />
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={26} color="#C4B5FD" />
      <pointLight position={[-5, -2, 2]} intensity={16} color="#A78BFA" />
      <directionalLight position={[0, 5, 5]} intensity={1} color="#E9D5FF" />
      <group ref={group}>
        <SilkBlob position={[2.6, -1.6, -2]} color="#7C6AE8" colorB="#C084FC" scale={3.4} speed={1.4} distort={0.45} drift={1} scrollRef={scrollRef} />
        <SilkBlob position={[-3.2, 1.8, -3.5]} color="#9B8CF0" colorB="#A78BFA" scale={2.6} speed={1.1} distort={0.5} drift={-0.8} scrollRef={scrollRef} />
        <SilkBlob position={[0.4, -3.4, -4.5]} color="#5B4FC0" colorB="#8B5CF6" scale={3.8} speed={0.9} distort={0.38} drift={0.6} scrollRef={scrollRef} />
        <Sparkles count={160} scale={[14, 14, 8]} size={2.6} speed={0.35} opacity={0.75} color="#EDE9FE" />
        <Sparkles count={60} scale={[10, 12, 6]} size={5} speed={0.2} opacity={0.45} color="#DDD6FE" />
      </group>
    </>
  );
};

export const AuroraBackground = () => {
  const scrollRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true" data-testid="aurora-background">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#0A0716" }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(10,7,22,0.55) 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(10,7,22,0.8), transparent)" }} />
    </div>
  );
};
