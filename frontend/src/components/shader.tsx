import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { ShaderMaterial, Vector2 } from "three";
import vertexShader from "./sphere.vertex.glsl?raw";
import fragmenShader from "./sphere.fragment.glsl?raw";

type ShaderInput = {
  speed: number;
};

function ShaderPlane({ speed }: ShaderInput) {
  const meshRef = useRef<ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.uniforms.u_time.value = state.clock.elapsedTime * speed;
      meshRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  const postcardAspect = 148 / 105;
  const canvasAspect = size.width / size.height;
  let planeWidth, planeHeight;
  if (canvasAspect > postcardAspect) {
    planeHeight = 2;
    planeWidth = planeHeight * canvasAspect;
  } else {
    planeWidth = 2;
    planeHeight = planeWidth / canvasAspect;
  }

  return (
    <mesh>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <shaderMaterial
        ref={meshRef}
        vertexShader={vertexShader}
        fragmentShader={fragmenShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ThreeCanvas({ speed }: Readonly<ShaderInput>) {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
      <ShaderPlane speed={speed} />
    </Canvas>
  );
}
