import { useParams } from "react-router-dom";
import {
  Environment,
  Text,
  useCursor,
  ScrollControls,
  Scroll,
  MeshReflectorMaterial,
  useTexture,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
  type ThreeEvent,
  useThree,
} from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

const GOLDENRATIO = 1.61803398875;

// Project attributes
const projectInfo: ProjectData[] = [
  {
    id: "1",
    position: [0, 2, 0.8],
    size: [2.8, 3.8],
    colour: "#37BEF9",
    title: "Simulating and Rendering the Aurora",
    technologies: "Tech: UE, compute shaders, git",
    keywords:
      "Keywords: Physics Simulation, Raymarching\n\nFinal Year Project and Dissertation. Achieved 75%. " +
      "Involved comprehensive research on Aurora physics and its makeup; physics simulations techniques " +
      "(Particle In Cell - PIC); GPU accelerated programming with compute shaders; rendering techniques " +
      "such as raymarching. The project was integrated into Unreal Engine 5 which provided an interface " +
      "to manage GPU execution and to control/render particles.\n",
    gapSize: 0.3,
    content: {
      type: "images",
      urls: [
        "/images/P1/1.tiff",
        "/images/P1/2.tiff",
        "/images/P1/3.tiff",
        "/images/P1/4.tiff",
      ],
    },
  },
  {
    id: "2",
    position: [0, 2, 0.8],
    size: [2.8, 3.8],
    colour: "#37BEF9",
    title: "SPH Fluid Simulation",
    technologies: "Tech: OpenGL, compute shaders, git",
    keywords: "Keywords: Fluid Simulation, Rendering",
    gapSize: 0.05,
    content: {
      type: "images",
      urls: [
        "/images/P1/1.tiff",
        "/images/P1/2.tiff",
        "/images/P1/3.tiff",
        "/images/P1/4.tiff",
      ],
    },
  },
  {
    id: "3",
    position: [0, 2, 0.8],
    size: [2.8, 3.8],
    colour: "#37BEF9",
    title: "Personal Website",
    technologies: "Tech: React, React Three Fiber",
    keywords: "Keywords: ",
    gapSize: 0.34,
    content: {
      type: "images",
      urls: [
        "/images/P1/1.tiff",
        "/images/P1/2.tiff",
        "/images/P1/3.tiff",
        "/images/P1/4.tiff",
      ],
    },
  },
];

function App() {
  return (
    <Canvas shadows dpr={[1, 2]} style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </Canvas>
  );
}

// wraps the visuals: canvas, camera, project panels, floor
function Scene({ w = 2.8, gap = 7 }) {
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  const { viewport } = useThree();

  return (
    <>
      <ScrollControls
        horizontal
        pages={(width - xW + projectInfo.length * xW) / width}
        distance={0.7}
      >
        {/* Links to linkedin, github etc */}
        <group
          position={[viewport.width / 2 - 0.7, viewport.height / 2 - 0.4, 0]}
        >
          {/* Background */}
          <mesh>
            <planeGeometry args={[0.8, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>
          {/* LinkedIn icon */}
          <mesh
            position={[-0.18, -0.01, 0.01]}
            onClick={() => window.open("https://www.linkedin.com/in/toru04")}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <planeGeometry args={[0.3528, 0.3]} />
            <meshBasicMaterial
              transparent
              map={useTexture("/images/LI-In-Bug.png")}
            />
          </mesh>
          {/* GitHub icon */}
          <mesh
            position={[0.16, 0, 0.01]}
            onClick={() => window.open("https://github.com/toruyama04")}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <planeGeometry args={[0.3, 0.3]} />
            <meshBasicMaterial
              transparent
              map={useTexture("/images/github-mark.png")}
            />
          </mesh>
        </group>

        {/* my name */}
        <Text
          position={[-viewport.width / 2 + 1, viewport.height / 2 - 0.45, 0]}
          font="/fonts/garamond/GaramondRegular.ttf"
          fontSize={0.2}
          color="#0f2027"
        >
          Toru Yamaguchi
        </Text>

        {/* main area: projects, floor */}
        <Scroll>
          <fog attach="fog" args={["#a79", 8.5, 12]} />
          <color attach="background" args={["#ffffff"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <group position={[0, -2, 0]}>
            <Projects xW={xW} />
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
              position={[0, 0, 1.5]}
            >
              <planeGeometry args={[100, 4]} />
              <MeshReflectorMaterial
                roughness={0.9}
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.2}
              /> 
            </mesh>
          </group>
          <Environment preset="sunset" />
        </Scroll>
      </ScrollControls>
    </>
  );
}

function Projects({ xW }: { xW: number }) {
  const scrollRef = useRef<Group | null>(null);
  const params = useParams<{ id: string }>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // whenever the id changes
  useEffect(() => {
    setSelectedId(params.id ?? null);
  }, [params.id]);

  // go through each project and find the 3D group its attached to
  useFrame(() => {
    if (!scrollRef.current) return;

    projectInfo.forEach((proj, i) => {
      const projMesh = scrollRef.current?.children[i] as Group;
      if (!projMesh) return;
      const defaultZ = proj.position[2];
      const defaultY = proj.position[1];
      const targetZ = selectedId === proj.id ? defaultZ + 1 : defaultZ;
      const targetY = selectedId === proj.id ? defaultY + 0.05 : defaultY;
      projMesh.position.y += (targetY - projMesh.position.y) * 0.1;
      projMesh.position.z += (targetZ - projMesh.position.z) * 0.1;
    });
  });

  return (
    <group ref={scrollRef}>
      {projectInfo.map((proj, i) => (
        <Project
          id={proj.id}
          key={proj.id}
          position={[i * xW, proj.position[1], proj.position[2]]}
          size={proj.size}
          colour={proj.colour}
          title={proj.title}
          keywords={proj.keywords}
          technologies={proj.technologies}
          gapSize={proj.gapSize}
          onClick={() => setSelectedId(selectedId === proj.id ? null : proj.id)}
          content={proj.content}
        />
      ))}
    </group>
  );
}

function Project({
  id,
  position,
  size,
  colour,
  title,
  keywords,
  technologies,
  gapSize,
  onClick,
  content,
}: ProjectProps) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group name={id} position={position}>
      <mesh
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
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
        <meshStandardMaterial
          color={colour}
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={8}
        />
      </mesh>

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
    </group>
  );
}

type ProjectProps = ProjectData & {
  onClick: () => void;
};

type ProjectContent =
  | { type: "images"; urls: string[] }
  | { type: "video_images"; images: string[]; video: string };

/* Data and types for the projects */
type ProjectData = {
  id: string;
  position: [number, number, number];
  size: [number, number];
  colour: string;
  title: string;
  technologies: string;
  keywords: string;
  gapSize: number;
  content: ProjectContent;
};

export default App;
