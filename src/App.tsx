import { useParams, useNavigate } from "react-router-dom";
import { Environment } from "@react-three/drei";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3, Group, Object3D } from "three";
import { easing } from "maath";

const GOLDENRATIO = 1.61803398875;

const projects = [
  {
    id: "1",
    position: [0, 0, -7.5],
    rotation: [0, 0, 0],
    mesh: (
      <mesh>
        <planeGeometry args={[2.8, 7]} />
        <meshStandardMaterial color="#37BEF9" />
      </mesh>
    ),
  },
  {
    id: "2",
    position: [6, 0, -7.5],
    rotation: [0, 0, 0],
    mesh: (
      <mesh>
        <planeGeometry args={[2.8, 7]} />
        <meshStandardMaterial color="#37BEF9" />
      </mesh>
    ),
  },
];

function App() {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 70, position: [0, 10, 15] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <color attach="background" args={["#ffffff"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <group position={[0, -1.5, 0]}>
          <Projects />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 25]} />
            <meshStandardMaterial color="#71787b" roughness={0.9} />
          </mesh>
        </group>
        <Environment preset="sunset" />
      </Canvas>
      {/*<Routes> 
          <Route path="/projects/:id" element={<Projects />} />
         </Routes> */}
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
  useEffect(() => {
    // from the URL, we search through projects and set it as current
    clicked.current = ref.current?.getObjectByName(params?.id ?? "") ?? null;
    // if object is clicked, we store the group to be able to move to the project
    if (clicked.current?.parent) {
      const parent = clicked.current.parent;
      parent.updateWorldMatrix(true, true);
      parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      parent.getWorldQuaternion(q);
    } else {
      p.set(0, 10, 10);
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
      {projects.map((proj) => (
        <group
          key={proj.id}
          name={proj.id}
          position={proj.position as [number, number, number]}
          rotation={proj.rotation as [number, number, number]}
        >
          {proj.mesh}
        </group>
      ))}
    </group>
  );
}


export default App;
