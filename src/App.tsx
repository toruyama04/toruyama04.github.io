// import { Routes, Route } from "react-router-dom";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";

function App() {
  return (
    <>
      <Canvas 
        dpr={[1,2]} 
        camera={{ fov: 70, position: [0, 2, 15] }}
        style={{ width: "100vw", height: "100vh" }}
        >
        <color attach="background" args={["#ffffff"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <group position={[0, -1.5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50,50]} />
            <meshStandardMaterial
              color="#71787b"
              roughness={0.9}
            />
          </mesh>
        </group>
        <Environment preset="sunset" />
      </Canvas>
    </>
  );
}




export default App;
