import { Routes, Route, Link } from "react-router-dom";
import ProjectsPage from "./Projects";
import InterestsPage from "./Interests";
import BlogHomePage from "./BlogHome";
import "./HomePage.css";
import { useEffect, useRef, useState } from "react";
import AIPage from "./Blog/AI.tsx";
import FluidEquationsPage from "./Blog/FluidEngine.tsx";
import MediaPage from "./MediaPage.tsx";
import March26Media from "./Media/March26.tsx";
import April26Media from "./Media/April26.tsx";

const frames = Array.from({ length: 24 }, (_, i) => {
  return `/images/homepage/${i + 1}.webp`;
});

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
            max="24"
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
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const fpsRef = useRef(fps);
  const animationIdRef = useRef<number | null>(null);
  const frameIdxRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const isPageVisibleRef = useRef(true);
  const isInViewRef = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fpsRef.current = fps;
  }, [fps]);

  useEffect(() => {
    let cancelled = false;

    imagesRef.current = frames.map(() => null);

    frames.forEach((src, index) => {
      const img = new Image();
      img.src = src;

      img.onload = async () => {
        if (cancelled) return;

        try {
          await img.decode();
        } catch {
          // ignore decode failures
        }

        if (cancelled) return;

        imagesRef.current[index] = img;

        if (index === 0) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      };
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        isInViewRef.current = !!entries[0]?.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observerRef.current.observe(canvas);

    const render = (time: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = time;
      }
      const shouldAnimate = isPageVisibleRef.current && isInViewRef.current;

      if (shouldAnimate) {
        const frameDuration = 1000 / fpsRef.current;

        if (time - lastFrameTimeRef.current >= frameDuration) {
          lastFrameTimeRef.current = time;
          const nextIndex = (frameIdxRef.current + 1) % frames.length;
          const nextImage = imagesRef.current[nextIndex];

          if (nextImage) {
            frameIdxRef.current = nextIndex;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(nextImage, 0, 0, canvas.width, canvas.height);
          }
        }
      }
      animationIdRef.current = requestAnimationFrame(render);
    };
    animationIdRef.current = requestAnimationFrame(render);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animation_frame"
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
        <Route path="Fluid" element={<FluidEquationsPage />} />
        <Route path="AI" element={<AIPage />} />
      </Route>
      <Route path="/media" element={<MediaPage />}>
        <Route path="w1" element={<March26Media />} />
        <Route path="w2" element={<April26Media />} />
      </Route>
    </Routes>
  );
}
