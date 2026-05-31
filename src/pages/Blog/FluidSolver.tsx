import katex from "katex";
import "katex/dist/katex.min.css";
import { Link } from "react-router-dom";
import "../HomePage.css";
import "./Blog.css";

export default function FluidSolverPage() {
  return (
    <div>
      <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Writing My First Solver</h1>
      </Link>
      <div className="contents">
        <h2>Introduction</h2>
        <p>
          One project that is essential for anyone interested in computational
          fluid dynamics is to write your own fluid solver. This involves diving
          into the theory of solving the general equations and to convert it
          into code that can be validated. I have already written a fluid
          simulation using the popular lagrangian technique - Smoothed Particle
          Hydrodynamics (SPH), however most commercial solvers opt for using an
          eulerian grid-based method which usually allows for a higher accuracy
          accuracy and performance threshold. My initial solver will attempt to
          solve the lid-driven cavity problem for an incompressible
          two-dimensional flow. This is a good benchmark for a solver to pass as
          it has a large history of use and documentation.
        </p>
        <h4>Overview</h4>
        <img
          src="/images/fluidsolver/2.png"
          className="imgLarge"
          title="Overview"
        />
        <p>
          I have made a simplified overview of how the fluid solver is
          structured. What you should get from the visual is that there are two
          threads each in charge of handling separate tasks. We have the main
          render thread which handles anything we see on the screen, user input,
          and controls when the simulation starts and stops. If the user decides
          to start the simulation, the render thread spawns a simulation thread
          which handles all the computation of the solver. By separating the
          threads, we reduce interference and enable higher throughput for the
          solver.
        </p>
        {/* <h2>Theory</h2>
        <p> </p> */}
        <h2>The Solver</h2>
        <p>
          The solver is fully handled by the simulation thread and is mostly
          contained within a class which I will simply call "Sim". This is where
          all the data and functions for the simulation are kept.
        </p>
        <h4>Data Structures</h4>
        <p></p>
        <h2>GUI and Rendering with Vulkan and imgui</h2>
        <p>
          Skip to (link) if you are only interested in how I wrote the code for
          the fluid simulation. However, everything in between will run through
          the rendering, setup, and theory that goes behind writing a solver.
        </p>
        <p>
          A fluid solver doesn't necessarily require special attention given to
          its rendering, since validation is based on data and not visual
          clarity, however as someone who has an interest in graphics
          programming it was important and interesting for me to implement some
          level of rendering without hindering the solver accuracy. I decided to
          finally venture into Vulkan, which would be an upgrade from my use of
          OpenGL to render my previous simulation codes. This was exciting but
          required a lot more work and a hell of a lot more code.
        </p>
        <img
          src="/images/fluidsolver/1.png"
          className="img"
          title="Khronos Vulkan Tutorial"
        />
        <p>
          Introducing the super tutorial that provided the much needed helpful
          start to the rendering process. This tutorial does an excellent job at
          describing the mechanisms that Vulkan implements and requires from the
          developer. Vulkan is notoriously challenging to wrap your head around
          as it leaves much of the configuration to the user, however I will try
          to consolidate the main mechanisms it uses without diving too deep
          into the code. As it is my first Vulkan application, it may not be
          perfect and use the most optimal features, however this project is
          mostly focused on the solver so I will leave advanced rendering
          techniques for my next project.
        </p>
        <h3>Software</h3>
        <h2>Application and Asynchronous execution</h2>
        <h2>Fluid Solver</h2>
        <h3>Theory</h3>
        <h4></h4>
        <h3>Implementation</h3>
        <h4>Pre-Processing</h4>
        <h4>Solving</h4>
        <h3>Testing and Validation</h3>
        <p>
          Stufff <InlineMath math="V" />
        </p>
        <BlockMath math="\frac{d}{dt} \iiint_V \rho \ dV = -\oiint_S \rho \bold{v} \cdot d\bold{S}" />
        <img
          src="/images/fluidsolver/1.png"
          className="img"
          title="Khronos Vulkan Tutorial"
        />
      </div>
    </div>
  );
}

type MathProps = {
  math: string;
  errorColor?: string;
};

export function InlineMath({ math, errorColor = "#cc0000" }: MathProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    errorColor,
    displayMode: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ math, errorColor = "#cc0000" }: MathProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    errorColor,
    displayMode: true,
  });

  return (
    <div
      style={{ margin: "1rem 0" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
