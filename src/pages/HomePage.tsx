import { Routes, Route, Link } from "react-router-dom";
import ProjectsPage from "./Projects";
import InterestsPage from "./Interests";
import BlogHomePage from "./BlogHome";
import "./HomePage.css";
import Ex2Page from "./Blog/Ex2.tsx";
import B1Page from "./Blog/B1.tsx";
import { useEffect, useRef } from "react";

const frames = [
  "public/images/homepage/1.png",
  "public/images/homepage/2.png",
  "public/images/homepage/3.png",
  "public/images/homepage/4.png",
  "public/images/homepage/5.png",
  "public/images/homepage/6.png",
  "public/images/homepage/7.png",
  "public/images/homepage/8.png",
  "public/images/homepage/9.png",
  "public/images/homepage/10.png",
  "public/images/homepage/11.png",
  "public/images/homepage/12.png",
  "public/images/homepage/13.png",
  "public/images/homepage/14.png",
  "public/images/homepage/15.png",
  "public/images/homepage/16.png",
  "public/images/homepage/17.png",
  "public/images/homepage/18.png",
  "public/images/homepage/19.png",
  "public/images/homepage/20.png",
  "public/images/homepage/21.png",
  "public/images/homepage/22.png",
  "public/images/homepage/23.png",
  "public/images/homepage/24.png",

];
const FPS = 12;
const FRAME_DURATION = 1000 / FPS;

function HomeContent() {
  return (
    <>
      {/* <h1 className="header">Toru Yamaguchi</h1>
      <p className="header2">透 山口</p> */}
      <CanvasAnimation />
      <ul className="contents">
        <li>
          <Link to="/projects">
            <button className="link-button">Projects</button>
          </Link>
        </li>
        <li>
          <Link to="/interests">
            <button className="link-button">Interests</button>
          </Link>
        </li>
        <li>
          🚧
          <button className="incomplete-button"> Blog </button>
          🚧
        </li>
      </ul>
    </>
  );
}

export function CanvasAnimation() {
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
  }, []);

  return (
    <canvas
      className="animation_frame"
      ref={canvasRef}
      width={2786}
      height={1422}
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
        <Route path="b1" element={<B1Page />} />
        <Route path="ex2" element={<Ex2Page />} />
      </Route>
    </Routes>
  );
}
