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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameidx = 0;
    let accum = 0;
    let lastTime = 0;
    let animationId: number;

    const images: HTMLImageElement[] = frames.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const FRAME_DURATION = 1000 / fps;

    const loop = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      accum += dt;

      while (accum >= FRAME_DURATION) {
        frameidx = (frameidx + 1) % images.length;
        accum -= FRAME_DURATION;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentImage = images[frameidx];
      if (currentImage.complete) {
        ctx.drawImage(currentImage, 0, 0);
      }

      animationId = requestAnimationFrame(loop);
    };
    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [fps]);

  return (
    <div>
      <canvas
        className="animation_frame"
        ref={canvasRef}
        width={2786}
        height={1422}
      />
    </div>
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
      </Route>
    </Routes>
  );
}
