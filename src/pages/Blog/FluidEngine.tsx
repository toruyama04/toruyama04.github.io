import { Link } from "react-router-dom";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import "../HomePage.css";
import "./Blog.css";

export default function FluidEquationsPage() {
  return (
    <div>
      <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Behind the Governing Equations</h1>
      </Link>
      <div className="contents">
        <p>
          My interest in Fluids didn't develop like your average simulation
          enthusiast, it looked kind of like: shaders
          <InlineMath math="\to" /> graphics programming
          <InlineMath math="\to" /> particles <InlineMath math="\to" />{" "}
          computational fluid dynamics. Although I picked up some of the main
          intuition through some minor projects, I still lacked the crucial
          understanding of the governing equations. I wanted to detail the
          intuition behind the essential equations used to model fluids.
        </p>
        <h2>Modelling the Fluid</h2>
        <p>image of fluid/gas with particles</p>
        <p>
          If you think back to early physics lessons, you would remember that
          fluids and gases are made up of molecules that zip around in all
          directions. The number of molecules, their speed and the rate at which
          they collide make up the properties of the fluid. We are unable to
          model fluids like they exist in reality and we instead model fluids
          more like an approximation of its general behaviour.
        </p>
        <p>
          For the following chapter on our first governing equation, I will
          model the fluid using an Eulerian viewpoint. This means to look at the
          fluid as being made up of discrete, fixed points in space where we
          measure fluid properties at these points. If we zoom into one of these
          points, we find them to be an infinitesimal control volume - a very
          small volume of our fluid.
        </p>
        {/* <p>image of eulerian/lagrangian viewpoints</p>
        <p>There are two main ways to model a fluid:</p>
        <strong>Eulerian:</strong> Our first viewpoint of a fluid is one where
        we focus on a specific point in the domain and measure the field values
        at this point only. <hr></hr>
        <strong>Lagrangian:</strong> The other viewpoint views the fluid as one
        made up of these 'fluid parcels', where you track the fluid field values
        like velocity for each of these fluid parcels through space and time.
        <hr></hr> */}
        <h3>Continuity Equation</h3>
        <p>
          This first equation describes how the mass of the fluid can be
          expressed for any volume of the fluid. Lets start with an arbitrary
          fixed volume of a fluid <InlineMath math="V" /> that has a surrounding
          boundary <InlineMath math="S" />. I will simply start with defining
          the mass at any point in time. You should be familiar with{" "}
          <InlineMath math="mass = density \times volume" />, so to calculate
          the mass of this volume, we need to define the density and the volume.
        </p>
        <p>
          image of fluid with highlighted volume V, then other image focuses in
          on the volume
        </p>
        <p>
          Remember that for an Eulerian viewpoint we focus in on differential
          control volumes that are fixed in position. So we break down the
          overall volume into these infinitesimal control volumes (
          <InlineMath math="dV" />
          ), each with a density (<InlineMath math="\rho" />
          ). The accumulation of all the differential control volumes with their
          density values will result in the total mass.
          <BlockMath math="m = \iiint_V \rho\ dV" /> We actually want to find
          the rate of change of the mass, this allows us to reason about how the
          mass of a fluid changes over time. To do so, we need a way to express
          the amount of mass leaving the volume at any point in time. Even
          though each differential control volume <InlineMath math="dV" /> has
          surfaces where mass flows in and out, we don't really care about the
          surfaces within the volume since any mass flowing through them won't
          affect the total mass of the volume. Therefore we define a new
          variable <InlineMath math="d\bold{S}" /> which defines the oriented
          area of an infinitesimal surface. This is a shorthand for{" "}
          <InlineMath math="\bold{n} dS" />, where{" "}
          <InlineMath math="\bold{n}" /> is the outward pointing unit normal of
          the surface <InlineMath math="dS" />. It is directed outward and
          encodes the surface area as part of its make-up. If we take the dot
          product of the vector at the fluid boundary with the oriented area and
          multiply by the density, we get the mass flow through this specific
          surface - <InlineMath math="\rho \bold{v} \cdot d\bold{S}" />
          . A positive value denotes particles leaving the volume and negative
          if they are entering. We then use it to evaluate the rate of change of
          the mass:
          <BlockMath math="\frac{d}{dt} \iiint_V \rho \ dV = -\oiint_S \rho \bold{v} \cdot d\bold{S}" />
          The circle inside the integral <InlineMath math="\oiint" /> means the
          surface we integrate over must be closed. If we take the mass flow of
          a specific surface and instead integrate over the entire outward
          boundary surface, it results in the total mass flow out of the volume.
          We take the negative as to only evaluate the mass changes inside the
          volume.<hr></hr> If you are unfamiliar with Gauss's theorem or the
          divergence theorem, I will explain it here but feel free to find a
          more in-depth explanation elsewhere. It states that "the surface
          integral of a vector field over a closed surface, otherwise known as
          the 'flux' through the surface, is equal to the volume integral of the
          divergence over the region enclosed by the surface". Given the volume{" "}
          <InlineMath math="V" /> with a boundary <InlineMath math="S" />,
          consider a continuously differentiable vector field{" "}
          <InlineMath math="\bold{F}" /> then:
          <BlockMath math="\oiint_S (\bold{F} \cdot \hat{n}) \ dS = \iiint_V (\nabla \cdot \bold{F})\ dV" />
          It should be a fairly simple step to take the current expression of
          the mass changes at any current time and convert it to the volume
          integral.
          <BlockMath math="-\oiint_S \rho \bold{v} \cdot d\bold{S} \xrightarrow{\text{Gauss}} -\iiint_V (\nabla \cdot \rho \bold{v})\ dV" />
          <hr></hr> If we apply Gauss's Divergence theorem:
          <BlockMath math="\frac{d}{dt} \iiint_V \rho \ dV = - \iiint_V (\nabla \cdot \rho \bold{v}) \ dV" />
          As the volume is constant, meaning the limits of integration are
          fixed, we can bring the time derivative to inside the integral. Then
          add both sides by the right side.
          <BlockMath math="\iiint_V \frac{\partial \rho}{\partial t} dV + \iiint_V (\nabla \cdot \rho\bold{v}) \ dV = 0" />
          <BlockMath math="\iiint_V [\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho\bold{v})]\ dV = 0" />
          The final step is to note that this is valid for any volume{" "}
          <InlineMath math="V" /> and so we are simply left with:
          <BlockMath math="\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \bold{v}) = 0" />
          This is known as the continuity or mass conservation equation. This
          one applies to any fluid, however it is common for us to make
          assumptions about a fluid we are simulating in order to simplify the
          governing equations. The first is the assumption of a{" "}
          <strong>steady flow</strong> which says that there is no time
          dependency of the flow. So for any property, here only density{" "}
          <InlineMath math="\rho" /> is time dependent, we say it won't have a
          local time rate of change or{" "}
          <InlineMath math="\frac{\partial \rho}{\partial t} = 0" />, leaving:
          <BlockMath math="\nabla \cdot (\rho\bold{v}) = 0" />
          The final assumption is that of an incompressible flow. This means
          that the density component is constant in time, meaning we take it out
          of the equation leaving:
          <BlockMath math="\nabla \cdot \bold{v} = 0" />
          Therefore, for incompressible flows, the continuity equation states
          that the divergence of the velocity must be 0. It implies that the
          velocity field for an incompressible flow is non-expanding. Any
          changes in a velocity component in its respective coordinate direction
          must be balanced by collective corresponding changes of each of the
          other coordinate velocity components, such that there is no local
          expansion/contraction of the fluid volume.
        </p>
        <h3>Momentum Equation (Navier-Stokes)</h3>
        <p>
          The most well known equation for modelling fluids, the momentum
          equation describes Newton's second law of motion for a fluid. To be
          complete, I will recall it to be{" "}
          <InlineMath math="\sum \bold{F} = m\bold{a}" />. To derive an
          expression for fluids, I will go through how we define each component
          of the expression applied to fluids: <InlineMath math="\bold{F}" />
          , <InlineMath math="m" />, and <InlineMath math="\bold{a}" />
          . I will start with deriving the total forces acting on the fluid
          <InlineMath math="\sum \bold{F}" />. I will split the total forces
          into surface forces and body forces.
        </p>
        <h4>Surface Forces</h4>
        <p>
          An important aspect with surface forces and what I will define first
          is what a <strong>stress</strong> is. It is such an important concept
          as we use it in the very definition of a fluid. At its core, a fluid
          is a substance that cannot sustain a <strong>shearing stress</strong>.
          I will provide definitions for stresses and its two different
          classifications.
        </p>
        <strong>Stress</strong> The internal force per unit area. Think of it as
        describing the intensity of internal forces at any point inside a
        substance. A cube with water inside at rest is undergoing virtually no
        stress; now imagine a spoon swirling the water, the internal forces are
        stronger now, due to an increase in stress. These forces try to resist
        the deformation (changing shape) and bring the fluid back to
        equilibrium.
        <hr></hr>
        <strong>
          Shear Stress <InlineMath math="\tau" />
        </strong>{" "}
        There are two types of stresses one can apply. A shear stress is a force
        applied tangentially to a surface of the fluid. To aid with explaining,
        I will introduce an example of a fluid namely that of a Couette flow.
        Shown below, we have a stationary boundary at the bottom, a moving
        boundary at the top and a fluid in between. Any fluids moving along a
        solid boundary will incur a shear stress at that boundary. Below, you
        can visualise the shear stress forces inside the fluid, tangent to the
        upper surface. Referring back to the definition of a fluid, the
        substance's reaction to a shearing stress allows it to be classified as
        a fluid.
        <p>Image of Couette flow and spoon in cup</p>
        <strong>
          Normal Stress <InlineMath math="\sigma" />
        </strong>{" "}
        A normal stress is a force applied perpendicular to the surface of the
        fluid. For water in a cube, at rest, the only stress would be the
        pressure acting on the surface of the cube. This applies similarly to
        compressed gas, where the fluid applies a normal stress on the gas
        container as it pushes perpendicular to the surface boundaries.
        <p>Image of pressure for cube and gas container pressure</p>
        <p>
          <strong>Modelling Surface forces for a differential element</strong>
        </p>
        <p>
          To analyse momentum changes across a fluid volume, we first define an
          infinitesimally small differential element for us to model the
          stresses.
        </p>
        <p>
          ||image of diff element show it as part of the bigger vol of fluid, 
          dont include stresses but show axis etc||
        </p>
        <p>
          The image shows the stress forces for an infinitesimally small element
          specifically for the x direction.
        </p>
        <p>||image of stress tensor and how it works||</p>
        <p>
          In order to define stresses, it is common to represent them using
          stress tensors. The first subscript represents the direction of the
          normal for the stress's surface, the second subscript is the direction
          of the stress.
        </p>
        <p>||of element with stress tensor with explanation of subscripts||</p>
        <p>||explain stresses||</p>
        <p>trauncated taylor series</p>
        <h4>Body Forces</h4>
        <p>Substitute into Newton's second law</p>
        <p>Expand stresses by relating to fluid rates of strain</p>
        <p>Derive expressions for acceleration and mass</p>
        <p>Substitute into equation to get final Navier-Stokes</p>
        <p>Image of fluid as liquid and gas</p>
        <h3>References</h3>
        <li id="fn-1">
          {" "}
          <a
            href="https://doi.org/10.1016/B978-0-323-93938-6.00019-1"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            Computational Fluid Dynamics, A Practical Approach{" "}
          </a>
          <a href="#ref-1" className="footnote">
            ↩
          </a>
        </li>
        <li id="fn-2">
          {" "}
          <a
            href="https://www.researchgate.net/publication/371938725_Introduction_to_Graduate_Fluid_Mechanics_Ed_IV_2023"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            Introduction to Graduate Fluid Mechanics{" "}
          </a>
          <a href="#ref-2" className="footnote">
            ↩
          </a>
        </li>
        <p> </p>
      </div>
    </div>
  );
}
