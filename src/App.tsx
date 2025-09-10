import { useParams } from "react-router-dom";
import {
  Text,
  useCursor,
  ScrollControls,
  Scroll,
  MeshReflectorMaterial,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
  type ThreeEvent,
  useThree,
} from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { Group, Vector3, WebGLRenderTarget, PerspectiveCamera } from "three";

const GOLDENRATIO = 1.61803398875;

// Project attributes
const projectInfo: ProjectData[] = [
  {
    id: "0",
    position: [0, 2.4, 0.8],
    size: [3.2, 4.3],
    colour: "#37BEF9",
    title: "Simulating and Rendering the Aurora",
    technologies: "Tech: UE, compute shaders, git",
    keywords:
      "Keywords: Physics Simulation, Raymarching\n\nFinal Year Project and Dissertation. Achieved 75%. " +
      "Involved comprehensive research on Aurora physics and its makeup; physics simulations techniques " +
      "(Particle In Cell - PIC); GPU accelerated programming with compute shaders; rendering techniques " +
      "such as raymarching. The project was integrated into Unreal Engine 5 which provided an interface " +
      "to manage GPU execution and to control/render particles.\n",
    gapSize: 0.35,
    content: {
      type: "images",
      urls: [
        import.meta.env.BASE_URL + "/images/P1/1.png",
        import.meta.env.BASE_URL + "/images/P1/2.png",
        import.meta.env.BASE_URL + "/images/P1/3.png",
        import.meta.env.BASE_URL + "/images/P1/4.png",
      ],
      pos: [
        [-0.785, 1.06],
        [0.78, 1.06],
        [0.78, -1.06],
        [-0.785, -1.06],
      ],
    },
  },
  {
    id: "1",
    position: [0, 2.4, 0.8],
    size: [3.2, 4.3],
    colour: "#37BEF9",
    title: "SPH Fluid Simulation",
    technologies: "Tech: OpenGL, compute shaders, git",
    keywords: "Keywords: Fluid Simulation, Rendering",
    gapSize: 0.05,
    content: {
      type: "video_images",
      images: [import.meta.env.BASE_URL + "/images/P2/ig.png"],
      video: import.meta.env.BASE_URL + "/images/P2/sphvid.mp4",
    },
  },
  {
    id: "2",
    position: [0, 2.4, 0.8],
    size: [3.2, 4.3],
    colour: "#37BEF9",
    title: "Personal Website",
    technologies: "Tech: React, React Three Fiber",
    keywords: "Keywords: ",
    gapSize: 0.34,
    content: {
      type: "web",
    },
  },
  {
    id: "3",
    position: [0, 2.4, 0.8],
    size: [3.2, 4.3],
    colour: "#37BEF9",
    title: "Group Project",
    technologies: "Tech: React, React Three Fiber",
    keywords: "Keywords: ",
    gapSize: 0.34,
    content: {
      type: "web",
    },
  },
];

function App() {
  return (
    <Canvas dpr={[1, 2]} style={{ width: "100vw", height: "100vh" }}>
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
      <color attach="background" args={["#f7f7f7"]} />
      {/* <fog attach="fog" args={["#a79", 8.5, 12]} /> */}
      <ambientLight intensity={4} />
      {/* <directionalLight position={[10, 10, 10]} intensity={1} castShadow /> */}

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
            <meshStandardMaterial color="#efd2c4" />
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
              map={useTexture(
                import.meta.env.BASE_URL + "/images/LI-In-Bug.png",
              )}
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
              map={useTexture(
                import.meta.env.BASE_URL + "/images/github-mark.png",
              )}
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
          <group position={[0, -2.3, 0]}>
            <Projects xW={xW} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.5]}>
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
          {/* <Environment preset="sunset" /> */}
        </Scroll>
      </ScrollControls>
    </>
  );
}

function Projects({ xW }: { xW: number }) {
  const scrollRef = useRef<Group | null>(null);
  const centerRef = useRef<Group | null>(null);
  const params = useParams<{ id: string }>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedId(params.id ?? null);
  }, [params.id]);

  useFrame(() => {
    if (!scrollRef.current || !centerRef.current) return;

    projectInfo.forEach((proj, i) => {
      const projGroup = centerRef.current!.children[i] as Group | undefined;
      if (!projGroup) return;
      const defaultZ = proj.position[2];
      const defaultY = proj.position[1];
      const targetZ = selectedId === proj.id ? defaultZ + 1 : defaultZ;
      const targetY = selectedId === proj.id ? defaultY + 0.05 : defaultY;
      projGroup.position.y += (targetY - projGroup.position.y) * 0.12;
      projGroup.position.z += (targetZ - projGroup.position.z) * 0.12;
    });
    if (selectedId) {
      const idx = projectInfo.findIndex((p) => p.id === selectedId);
      if (idx !== -1) {
        const projGroup = centerRef.current!.children[idx] as Group | undefined;
        if (!projGroup) return;

        const worldPos = new Vector3();
        projGroup.getWorldPosition(worldPos);

        centerRef.current!.position.x -= worldPos.x * 0.1;
      }
    } else {
      centerRef.current!.position.x +=
        (0 - centerRef.current!.position.x) * 0.12;
    }
  });

  return (
    <group ref={scrollRef}>
      <group ref={centerRef}>
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
            onClick={() =>
              setSelectedId(selectedId === proj.id ? null : proj.id)
            }
            content={proj.content}
          />
        ))}
      </group>
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
  const [showFeed, setShowFeed] = useState(false);
  useCursor(hovered);
  const allImageTextures = useTexture(
    content.type === "images"
      ? content.urls
      : content.type === "video_images"
        ? content.images
        : [],
  );

  // prettier-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const videoTexture = content.type === "video_images" && content.video ? useVideoTexture(content.video, { muted: true, loop: true, start: true })
      : null;

  return (
    <group name={id} position={position}>
      <group
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
        <mesh castShadow>
          <planeGeometry args={size} />
          <meshStandardMaterial
            color={colour}
            metalness={0.5}
            roughness={0.5}
            envMapIntensity={8}
          />
        </mesh>
        {content.type === "images" &&
          allImageTextures.map((tex, i) => (
            <mesh
              key={i}
              position={[content.pos[i][0], content.pos[i][1], 0.01]}
            >
              <planeGeometry
                args={[1.52, 1.47 / (tex.image.width / tex.image.height)]}
              />
              <meshBasicMaterial map={tex} toneMapped={false} />
            </mesh>
          ))}

        {content.type === "video_images" && (
          <>
            {allImageTextures.map((tex, i) => (
              <mesh key={`img-${i}`} position={[0.04, -1.12, 0.1]}>
                <planeGeometry
                  args={[2.91, 2.4 / (tex.image.width / tex.image.height)]}
                />
                <meshBasicMaterial map={tex} toneMapped={false} />
              </mesh>
            ))}
            {videoTexture && (
              <mesh position={[0.04, 0.935, 0.1]}>
                <planeGeometry args={[2.9, 2.15]} />
                <meshBasicMaterial map={videoTexture} toneMapped={false} />
              </mesh>
            )}
          </>
        )}
        {content.type === "web" && (
          <>
            <mesh
              position={[-0.85, 1.85, 0.1]}
              onClick={(e) => {
                e.stopPropagation();
                setShowFeed((prev) => !prev);
              }}
            >
              <planeGeometry args={[1.2, 0.25]} />
              <meshStandardMaterial color="#37BEF9" />
              <Text
                font="/fonts/garamond/GaramondRegular.ttf"
                fontSize={0.15}
                color="black"
              >
                Click for Live Feed
              </Text>
            </mesh>
            {showFeed && <CameraFeed />}
          </>
        )}
      </group>

      <>
        <Text
          font="/fonts/garamond/GaramondRegular.ttf"
          maxWidth={2.3}
          anchorX="left"
          anchorY="top"
          position={[-4.05, GOLDENRATIO + 0.2, 0]}
          fontSize={0.2}
          color="#0f2027"
        >
          {title}
        </Text>
        <Text
          font="/fonts/garamond/GaramondRegular.ttf"
          maxWidth={2.3}
          anchorX="left"
          anchorY="top"
          position={[-4.05, GOLDENRATIO - gapSize, 0]}
          fontSize={0.12}
          color="#0f2027"
        >
          {keywords}
        </Text>
        <Text
          font="/fonts/garamond/GaramondRegular.ttf"
          maxWidth={2.3}
          anchorX="left"
          anchorY="top"
          position={[1.75, GOLDENRATIO + 0.2, 0]}
          fontSize={0.13}
          color="#0f2027"
        >
          {technologies}
        </Text>
      </>
    </group>
  );
}

function CameraFeed() {
  const { gl, scene, size } = useThree();
  const renderTarget = useMemo(
    () => new WebGLRenderTarget(size.width, size.height),
    [size.width, size.height],
  );
  const cameraRef = useRef<PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;
    cameraRef.current.updateProjectionMatrix();

    gl.setRenderTarget(renderTarget);
    gl.render(scene, cameraRef.current);
    gl.setRenderTarget(null);
  });

  const aspect = size.width / size.height;
  const planeHeight = 1.7;
  let planeWidth = planeHeight * aspect;

  const maxWidth = 3;
  planeWidth = Math.min(planeWidth, maxWidth);

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        fov={40}
        near={0.1}
        far={50}
        aspect={aspect}
        position={[7, 5, 19]}
        rotation={[-0.2, 0.33, 0.05]}
      />
      <mesh position={[0, 0.75, 0.1]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial map={renderTarget.texture} toneMapped={false} />
      </mesh>
    </>
  );
}

type ProjectProps = ProjectData & {
  onClick: () => void;
};

type ProjectContent =
  | { type: "images"; urls: string[]; pos: number[][] }
  | { type: "video_images"; images: string[]; video: string }
  | { type: "web" };

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
