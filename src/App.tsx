import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import { Environment, Text, useCursor } from "@react-three/drei";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Quaternion, Vector3, Group, Object3D } from "three";
import { easing } from "maath";

const GOLDENRATIO = 1.61803398875;

// Project attributes
const projectInfo: ProjectData[] = [
  {
    id: "1",
    position: [-4.5, 2.5, -7],
    rotation: [0, 0, 0],
    size: [2.8, 3.8],
    colour: "#37BEF9",
    title: "Simulating and Rendering the Aurora",
    technologies: "Tech: UE, compute shaders, git",
    keywords:
      "Keywords: Physics Simulation, Raymarching\n\nFinal Year Project and Dissertation. Achieved 75%. Involved comprehensive research on Aurora physics and its makeup; physics simulations techniques (PIC); GPU accelerated programming with compute shaders; rendering techniques like raymarching. The project was integrated into Unreal Engine 5 which provided a basic interface to manage GPU execution and to render particles.\n",
    gapSize: 0.34,
  },
  {
    id: "2",
    position: [4.5, 2.5, -7],
    rotation: [0, 0, 0],
    size: [2.8, 3.8],
    colour: "#37BEF9",
    title: "SPH Fluid Simulation",
    technologies: "Tech: OpenGL, compute shaders, git",
    keywords: "Keywords: Fluid Simulation, Rendering",
    gapSize: 0.05,
  },
  {
    id: "3",
    position: [-13.5, 2.5, -7],
    rotation: [0, 0, 0],
    size: [2.8, 3.8],
    colour: "#37BEF9",
    title: "Personal Website",
    technologies: "Tech: React, React Three Fiber",
    keywords: "Keywords: ",
    gapSize: 0.34,
  },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Scene />} />
      <Route path="/projects/:id" element={<Scene />} />
    </Routes>
  );
}

// wraps the visuals: canvas, camera, project panels, floor
function Scene() {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 70, position: [0, 5, 15] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        {/*<fog attach="fog" args={["#a79", 8.5, 12]} />*/}
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <group position={[0, -1.5, 0]}>
          <Projects />
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[50, 30]} />
            <meshStandardMaterial color="#9bb8c5" roughness={0.9} />
          </mesh>
        </group>
        <Environment preset="sunset" />
      </Canvas>
    </>
  );
}

function Projects() {
  const q = useRef(new Quaternion()).current;
  const p = useRef(new Vector3()).current;
  const ref = useRef<Group | null>(null);
  const clicked = useRef<Object3D | null>(null);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  // we call this function whenever the URL parameter params.id changes
  // this will move the camera to the project's view
  useEffect(() => {
    if (!ref.current) return;
    const id = params.id ?? null;
    const obj = id ? ref.current.getObjectByName(id) : null;
    clicked.current = obj ?? null;
    if (clicked.current) {
      const worldPos = new Vector3();
      clicked.current.updateWorldMatrix(true, true);
      clicked.current.getWorldPosition(worldPos);
      const offset = new Vector3(0, GOLDENRATIO / 2 - 0.8, 3);
      const camPos = worldPos.clone().add(offset);
      p.copy(camPos);
    } else {
      p.set(0, 0.5, 0);
      q.identity();
    }
  }, [params.id, p, q]);

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  return (
    <group
      ref={ref}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const target = e.object.parent ?? e.object;
        navigate(`/projects/${target.name}`);
      }}
      onPointerMissed={() => navigate("/")}
    >
      {projectInfo.map((proj) => (
        <Project
          id={proj.id}
          key={proj.id}
          position={proj.position}
          rotation={proj.rotation}
          size={proj.size}
          colour={proj.colour}
          title={proj.title}
          keywords={proj.keywords}
          technologies={proj.technologies}
          selectedId={proj.id}
          gapSize={proj.gapSize}
        />
      ))}
    </group>
  );
}

function Project({
  id,
  position,
  rotation,
  size,
  colour,
  selectedId,
  title,
  keywords,
  technologies,
  gapSize,
}: ProjectProps) {
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedId === id;
  useCursor(hovered);

  return (
    <group name={id} position={position} rotation={rotation}>
      {/* <mesh
        ref={meshRef}
        name={id}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 2, 0.5]} />
        <meshStandardMaterial color={hovered ? "orange" : "skyblue"} />
      </mesh> */}
      <mesh
        castShadow
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <planeGeometry args={size} />
        <meshStandardMaterial color={colour} />
      </mesh>

      {isSelected && (
        <>
          <Text
            font="/fonts/garamond/GaramondRegular.ttf"
            maxWidth={2.14}
            anchorX="left"
            anchorY="top"
            position={[-3.6, GOLDENRATIO + 0.25, 0]}
            fontSize={0.2}
            color="#0f2027"
          >
            {title}
          </Text>
          <Text
            font="/fonts/garamond/GaramondRegular.ttf"
            maxWidth={2.14}
            anchorX="left"
            anchorY="top"
            position={[-3.6, GOLDENRATIO - gapSize, 0]}
            fontSize={0.12}
            color="#0f2027"
          >
            {keywords}
          </Text>
          <Text
            font="/fonts/garamond/GaramondRegular.ttf"
            maxWidth={2.14}
            anchorX="left"
            anchorY="top"
            position={[1.55, GOLDENRATIO + 0.25, 0]}
            fontSize={0.13}
            color="#0f2027"
          >
            {technologies}
          </Text>
        </>
      )}
    </group>
  );
}

type ProjectProps = ProjectData & {
  selectedId?: string;
};

/* Data and types for the projects */
type ProjectData = {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  colour: string;
  title: string;
  technologies: string;
  keywords: string;
  gapSize: number;
};

export default App;
