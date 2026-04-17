import { Routes, Route, Link } from "react-router-dom";
import ProjectsPage from "./Projects";
import InterestsPage from "./Interests";
import BlogHomePage from "./BlogHome";
import "./HomePage.css";
import { useEffect, useRef, useState } from "react";
import AIPage from "./Blog/AI.tsx";
import FluidEquationsPage from "./Blog/FluidEngine.tsx";
import MediaPage from "./MediaPage.tsx";
import Week1Media from "./Media/week1.tsx";
import Week2Media from "./Media/week2.tsx";

const frames = [
  "images/homepage/1.png",
  "images/homepage/2.png",
  "images/homepage/3.png",
  "images/homepage/4.png",
  "images/homepage/5.png",
  "images/homepage/6.png",
  "images/homepage/7.png",
  "images/homepage/8.png",
  "images/homepage/9.png",
  "images/homepage/10.png",
  "images/homepage/11.png",
  "images/homepage/12.png",
  "images/homepage/13.png",
  "images/homepage/14.png",
  "images/homepage/15.png",
  "images/homepage/16.png",
  "images/homepage/17.png",
  "images/homepage/18.png",
  "images/homepage/19.png",
  "images/homepage/20.png",
  "images/homepage/21.png",
  "images/homepage/22.png",
  "images/homepage/23.png",
  "images/homepage/24.png",
];

function HomeContent() {
  const [fps, setFps] = useState(12);
  return (
    <>
      <CanvasAnimation fps={fps} />
      <ul className="contents">
        <li>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="30"
              value={fps}
              onChange={(e) => setFps(Number(e.target.value))}
              className="slider"
            />
            <p className="fps-label">{fps} FPS</p>
          </div>
        </li>
        <p>
          Hi there, I'm a recent graduate of the University of Birmingham who
          studied Computer Science BSc. I will be joining the post-graduate
          course for{" "}
          <a href="https://www.imperial.ac.uk/study/courses/postgraduate-taught/computational-methods/">
            Advanced Computational Methods at Imperial College London
          </a>{" "}
          for 2026-2027. I'm interested in CFD, HPC, hardware, graphics and the
          intersection between those topics. I am also interested in their
          applications for aerospace, infrastructure, and media.
        </p>
        <p> </p>
        <li>
          <Link to="/projects">
            <button className="link-button">Projects</button>
          </Link>
        </li>
        <li>
          <Link to="/blog">
            <button className="link-button">Blog</button>
          </Link>
        </li>
        <li>
          <Link to="/media">
            <button className="link-button">Media</button>
          </Link>
        </li>
        <li>
          <Link to="/interests">
            <button className="link-button">Interests</button>
          </Link>
        </li>
      </ul>
    </>
  );
}

type CanvasAnimationProps = {
  fps: number;
};

export function CanvasAnimation({ fps }: CanvasAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    imagesRef.current = frames.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameIdx = 0;
    let lastFrameTime = 0;
    const frameDuration = 1000 / fps;

    const render = (time: number) => {
      if (!lastFrameTime) lastFrameTime = time;

      if (time - lastFrameTime >= frameDuration) {
        lastFrameTime = time;
        frameIdx = (frameIdx + 1) % imagesRef.current.length;

        const img = imagesRef.current[frameIdx];
        if (img.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }

      animationIdRef.current = requestAnimationFrame(render);
    };

    animationIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [fps]);

  return (
    <canvas
      ref={canvasRef}
      className="animation_frame"
      width={1200}
      height={612}
    />
  );
}

export default function HomePage() {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/interests" element={<InterestsPage />} />
      <Route path="/blog" element={<BlogHomePage />}>
        <Route path="Fluid" element={<FluidEquationsPage />} />
        <Route path="AI" element={<AIPage />} />
      </Route>
      <Route path="/media" element={<MediaPage />}>
        <Route path="w1" element={<Week1Media />} />
        <Route path="w2" element={<Week2Media />} />
      </Route>
    </Routes>
  );
}
