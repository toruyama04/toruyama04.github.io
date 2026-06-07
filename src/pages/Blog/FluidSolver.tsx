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
          solve the lid-driven cavity problem for an incompressible, inviscid
          flow. This is a good benchmark for a solver to pass as it has a long
          history of use and documentation.
        </p>
        <p>
          This blog is largely split into 2 parts. The first includes the theory
          and the corresponding simulation code and the second part is the
          rendering and graphics side to the project. To me they are both very
          important and intertwine with each other but feel free to choose what
          parts of the project to go through.
        </p>
        <h1>Theory and The Solver</h1>
        The theory section will not go through a deep dive into the derivations
        of the governing equations nor try to build the intuition behind them.
        If that is something you're interested in, have a look at one of my
        previous posts about the governing equations. What I will cover here
        will be all the equations required for solving and what methods I will
        use to do so.
        <h2>Overview</h2>
        <p> image of list of equation names and methods maybe</p>
        It's important to know the limitations of this project and that I won't
        be solving many different types of fluids but will start with the
        assumptions that it is incompressible and inviscid.
        <h2>Starting the Solver</h2>
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
          all the data and functions for the simulation are kept. I will start
        </p>
        <img
          src="/images/fluidsolver/8.png"
          className="imgLarge"
          title="Overview"
        />
        <h3>Assign Parameter values</h3>
        <img
          src="/images/fluidsolver/9.png"
          className="imgC"
          title="Khronos Vulkan Tutorial"
        />
        <p>
          I will define the simulation parameters inside a struct called FVMData
          (Finite-Volume data). The data mostly has default data that fits an
          implementation of the lid-driven cavity problem with some values that
          require user input. Many of the variables will be explained further on
          but you may recognise some of them from the theory section. The 'ulid'
          variable specifically defines the moving velocity of the lid which is
          specific to the problem I will solve. On the left I have started the
          main Sim class which contains an instance of the FVMData struct. It is
          public because it will be assigned from outside the class in the
          Application class.
        </p>
        <h3>Allocate Memory</h3>
        The solver will be CPU based so we will be using the vector data
        structure to store the fluid data such as velocity and pressure. I will
        create a wrapper for the vector so that it can handle separate x y, and
        y, and z coordinates whilst being implemented as a flattened 1D array.
        <p></p>
        <img
          src="/images/fluidsolver/field.png"
          className="img"
          title="Khronos Vulkan Tutorial"
        />
        <p>
          Whilst not necessary here, we make it a template struct in order to
          allow for different data types for the vector. Note that when we
          initialise the vector, we increase each dimension by 2 to account for
          the ghost cells on either side of the domain. This is important to
          remember as it affects any loop that goes over any of the fields or
          fluid properties.
        </p>
        <img
          src="/images/fluidsolver/3.png"
          className="img"
          title="Khronos Vulkan Tutorial"
        />
        <p>
          I extend the Sim class to include the different fluid properties,
          defined as Fields. I also wrote a function that initialises the fields
          with the size of the cells. It contains other initialisations but I
          will cover those later.
        </p>
        <h3>Initialise Solution</h3>A lot of the initialisation of the solution
        has been done when filling in the FVMData struct mentioned at the
        beginning. It contains a lot of the different parameters used in a
        solution but what I haven't included are the boundary conditions.
        Letting the user choose the boundary conditions is something I will be
        implementing, however for now I will use the preset of the lid-driven
        cavity problem and its specific boundary conditions.
        <p></p>
        <img
          src="/images/fluidsolver/6.png"
          className="img"
          title="Khronos Vulkan Tutorial"
        />
        <p>
          Whilst the boundary conditions are pre-determined I will still allow
          for a variety of different types for extensibility. Each wall in the
          domain will be given a BoundaryPatch each with specific settings about
          its effect on the simulation. The velocityValue here is only used if
          we have a moving wall that requires a velocity and the pressure type
          at each wall is set to symmetric by default.
        </p>
        <img
          src="/images/fluidsolver/7.png"
          className="imgLarge"
          title="Khronos Vulkan Tutorial"
        />
        <p>
          The start of the initialise solution function may be slightly
          confusing. Currently, the user will be given a set choice between the
          lid-driven cavity problem in 2D and 3D. The user's choice is passed
          into this function as an integer, type-casted to the SOLUTIONTYPE enum
          equivalent, and follows the necessary initialisation. In the end the
          initialisation for both the 2D and 3D cases are exactly the same, as
          the 2D case is still compatible here. Note that all walls except for
          the North wall use NoSlip and we have that MovingWall as well. The
          next stage is to pre-emptively apply the boundary conditions to the
          initial solution and fix the pressure at some location which was
          explained in the theory section.
        </p>
        <p> boundary conditions functions blah</p>
        <h3>Precompute Timestep</h3>
        <p>
          The last important part before we start the actual solver loop is to
          compute the time step. This is actually done at the start of each
          loop, however I will involve Von Neumann's stability analysis in order
          to have an initial timestep cap we can use.
        </p>
        <p>
          You will notice that 'implement preconditioners' is the last step in
          the pre-processing stage, however since it ties heavily with a
          specific part in the solver loop I will save its implementation till
          then.
        </p>
        <h2>Solver Loop</h2>
        We have reached the start of the solver loop which entails a warning
        that this is where the real meat of the solver lies. Every loop of the
        solver is a step in time and it requires successfully maintaining the
        governing equations with every step. Lets start by preventing fluid
        motion that could produce divergence and unphysical results -
        recomputing the timestep.
        <h3>Re-compute Timestep</h3>
        <p>
          This has to be done with every loop because a timestep too large can
          effectively allow for fluid motion to pass through grid cells between
          steps if their velocity is high enough. I will have to limit the time
          step to prevent this happening. CFL etc
        </p>
        <p>The next step involves re-applying the boundary conditions?</p>
        <h3>Compute Intermediate Velocity</h3>
        <h3>Solve Pressure Correction</h3>
        <h3>Correct Pressure and Velocity</h3>
        <h3>Check for Convergence</h3>
        <h3>Upload data to Shared Buffer</h3>
        <h2>Post-processing</h2>
        <h3>Validation of Solver</h3>
        <h3>Cleanup</h3>
        If you aren't particularly interested in the rendering side of the
        project, this will mark the end of the theory and code required to write
        a simple fluid solver. There are some useful concepts coming up that are
        useful for anyone interested in rendering but also specifically tied to
        rendering fluids. There is also a dive into asynchronous execution, how
        to implement a simple GUI, and maintaining a running simulation.
        <h1>Part 2: Rendering and Graphics</h1>A fluid solver doesn't
        necessarily require special attention given to its rendering, since
        validation is based on data and not visual clarity, however as someone
        who has an interest in graphics programming it was important and
        interesting for me to implement some level of rendering without
        hindering the solver accuracy. I decided to finally venture into Vulkan,
        which would be an upgrade from my use of OpenGL to render my previous
        simulation projects. This was exciting but required a lot more work and
        a hell of a lot more code.
        <p></p>
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
          techniques for another time.
        </p>
        <h3>Software</h3>
        <h3>Application and Asynchronous execution</h3>
        <p>
          <InlineMath math="V" />
        </p>
        <BlockMath math="\frac{d}{dt} \iiint_V \rho \ dV = -\oiint_S \rho \bold{v} \cdot d\bold{S}" />
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
