import { useParams, useNavigate } from "react-router-dom";
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

function ProjectsPage() {
  return (
    <Canvas dpr={[1, 2]} style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </Canvas>
  );
}

// wraps the visuals: canvas, camera, project panels, floor
function Scene({ w = 2.8, gap = 7 }) {
  const { width } = useThree((state) => state.viewport);
  const projWidth = w + gap;
  const { viewport } = useThree();
  const navigate = useNavigate();

  return (
    <>
      <color attach="background" args={["#e8e8e8"]} />
      <ambientLight intensity={4} />

      <ScrollControls
        horizontal
        pages={(width - projWidth + projectInfo.length * projWidth) / width}
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
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
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
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
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
          onClick={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            navigate("/");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Toru Yamaguchi
        </Text>

        {/* main area: projects, floor */}
        <Scroll>
          <group position={[0, -2.3, 0]}>
            <Projects projWidth={projWidth} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.5]}>
              <planeGeometry args={[100, 4]} />
              <MeshReflectorMaterial
                resolution={1024}
                mixStrength={80}
                depthScale={1.2}
                minDepthThreshold={0.4}
                color="#050505"
              />
            </mesh>
          </group>
        </Scroll>
      </ScrollControls>
    </>
  );
}

function Projects({ projWidth }: { projWidth: number }) {
  // separate center and scroll refs so centering doesn't affect scrollbar
  const scrollRef = useRef<Group | null>(null);
  const centerRef = useRef<Group | null>(null);
  const params = useParams<{ id: string }>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // upon id changing, we change the selectedId (for centering)
    setSelectedId(params.id ?? null);
  }, [params.id]);

  useFrame(() => {
    if (!scrollRef.current || !centerRef.current) return;

    // for each project, move forward if selected
    projectInfo.forEach((proj, i) => {
      const projGroup = centerRef.current!.children[i] as Group | undefined;
      if (!projGroup) return;

      const ogZ = proj.position[2];
      const ogY = proj.position[1];
      const targetZ = selectedId === proj.id ? ogZ + 1 : ogZ;
      const targetY = selectedId === proj.id ? ogY + 0.05 : ogY;
      // * 0.1 allows smooth movement
      projGroup.position.y += (targetY - projGroup.position.y) * 0.1;
      projGroup.position.z += (targetZ - projGroup.position.z) * 0.1;
    });

    if (selectedId) {
      // find selected project, center components on selected project
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
        (0 - centerRef.current!.position.x) * 0.1;
    }
  });

  return (
    <group ref={scrollRef}>
      <group ref={centerRef}>
        {projectInfo.map((proj, i) => (
          <Project
            id={proj.id}
            key={proj.id}
            position={[i * projWidth, proj.position[1], proj.position[2]]}
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
        <mesh>
          <planeGeometry args={size} />
          <meshStandardMaterial color={colour} envMapIntensity={8} />
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
              <mesh key={i} position={[-0.0, -1.16, 0]}>
                <planeGeometry
                  args={[3.05, 2.5 / (tex.image.width / tex.image.height)]}
                />
                <meshBasicMaterial map={tex} toneMapped={false} />
              </mesh>
            ))}
            {videoTexture && (
              <mesh position={[0, 0.95, 0]}>
                <planeGeometry args={[3.05, 2.25]} />
                <meshBasicMaterial map={videoTexture} toneMapped={false} />
              </mesh>
            )}
          </>
        )}
        {content.type === "web" && (
          <>
            <planeGeometry args={[1.2, 0.25]} />
            <meshStandardMaterial color="#37BEF9" />
            <CameraFeed />
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
  const planeHeight = 1.95;
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
      <mesh position={[0, 1.08, 0]}>
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

// each project's attributes
const projectInfo: ProjectData[] = [
  {
    id: "0",
    position: [0, 2.4, 0.8],
    size: [3.2, 4.3],
    colour: "#42607f",
    title: "Simulating and Rendering the Aurora",
    technologies: "Tech: UE, compute shaders, git",
    keywords:
      "Keywords: Physics Simulation, Raymarching\n\nFinal Year Project. Achieved 75%. " +
      "\nInvolved comprehensive research on Aurora physics and its makeup; physics simulations techniques " +
      "(Particle In Cell); GPU accelerated programming with compute shaders; rendering techniques " +
      "such as raymarching. The project was integrated into Unreal Engine 5 which provided an interface " +
      "to manage GPU execution and to control/render particles.\n",
    gapSize: 0.35,
    content: {
      type: "images",
      urls: [
        "/images/P1/1.png",
        "/images/P1/2.png",
        "/images/P1/3.png",
        "/images/P1/4.png",
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
    colour: "#42607f",
    title: "SPH Fluid Simulation",
    technologies: "Tech: OpenGL, compute shaders, git",
    keywords:
      "Keywords: Fluid Simulation, Kernels, Rendering\n\nBuilt with OpenGL rendering and executed fully on the GPU " +
      "by using compute shaders. This project required research into kernel functions, boundary handling, and " +
      "neighbourhood searching techniques. The other side to the project involved visualisation, this was done by " +
      "integrating OpenGL. GPU acceleration was done with compute shaders supported by OpenGL and storing data in " +
      "Shader-Storage-Buffer-Objects (SSBOs) accessible by the shaders.",
    gapSize: 0.1,
    content: {
      type: "video_images",
      images: ["/images/P2/ig.png"],
      video: "/images/P2/sphvid.mp4",
    },
  },
  {
    id: "2",
    position: [0, 2.4, 0.8],
    size: [3.2, 4.3],
    colour: "#42607f",
    title: "Personal Website",
    technologies:
      "Tech: React, React Three Fiber, TailwindCSS, Prettier, ESLint",
    keywords:
      "Keywords: React, Three.js, TypeScript\n\nA simple portfolio website built with a frontend focused on " +
      "displaying my projects in a 3D environment. This project integrated CI methods with git, linting, and code " +
      "formatting. For more visit the github repository.",
    gapSize: 0.15,
    content: {
      type: "web",
    },
  },
  // {
  //   id: "3",
  //   position: [0, 2.4, 0.8],
  //   size: [3.2, 4.3],
  //   colour: "#37BEF9",
  //   title: "Group Project",
  //   technologies: "Tech: ",
  //   keywords: "Keywords: ",
  //   gapSize: 0.34,
  //   content: {
  //     type: "web",
  //   },
  // },
];

export default ProjectsPage;
