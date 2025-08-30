import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { ShaderMaterial, Vector2 } from "three";
import vertexShader from "./shaders/test.vertex.glsl?raw";
import fragmentShader from "./shaders/test.fragment.glsl?raw";
import fragShad1 from "./shaders/1.fragment.glsl?raw";
import fragShad2 from "./shaders/2.fragment.glsl?raw";

type ShaderInput = {
  speed: number;
  shaderNr: number;
  color: number;
};

let shaders = [fragShad1, fragShad2];

function ShaderPlane({ speed, shaderNr, color }: Readonly<ShaderInput>) {
  const meshRef = useRef<ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_color: { value: 10 },
      u_resolution: { value: new Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  const selectedFragmentShader = useMemo(() => {
    return shaders[shaderNr] || shaders[0];
  }, [shaderNr]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.uniforms.u_time.value =
        state.clock.elapsedTime * (speed || 1);
      meshRef.current.uniforms.u_color.value = color || 10;
      meshRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  const vfov = (75 * Math.PI) / 180; // camera.fov in radians
  const height = 2 * Math.tan(vfov / 2);
  const width = height * (size.width / size.height);

  return (
    <mesh key={`${size.width}-${size.height}`}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        key={`shader-${shaderNr}`} // Force recreation when shader changes
        ref={meshRef}
        vertexShader={vertexShader}
        fragmentShader={selectedFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ThreeCanvas({
  speed,
  shaderNr,
  color,
}: Readonly<ShaderInput>) {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
      <ShaderPlane speed={speed} shaderNr={shaderNr} color={color} />
    </Canvas>
  );
}
