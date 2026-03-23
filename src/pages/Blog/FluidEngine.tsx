import katex from "katex";
import "katex/dist/katex.min.css";
import { Link } from "react-router-dom";
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
          intuition through some projects, I still lacked the crucial
          understanding of the governing equations. I wanted to detail the
          intuition behind the essential equations used to model fluids.
        </p>
        <h2>Modelling the Fluid</h2>
        <img
          src="/images/fluids/fluidgas.png"
          className="img"
          title="Simplified version of fluid makeup"
        />
        <p>
          If you think back to early physics lessons, you would remember that
          fluids (liquids or gases) are made up of molecules that zip around in
          all directions. The number of molecules, their speed, the rate at
          which they collide etc make up the properties of the fluid. Whilst a
          one to one model of a fluid, meaning we track every single particle
          and perfectly predict their behaviour, would produce absolute
          simulation accuracy, it's far beyond our ability to model and solve
          fluids at that level. We are unable to model fluids like they exist in
          reality as we know it to be and we instead go for more of an
          approximation of its general behaviour. You will find that in the
          following chapters, that for the equations, they rely on this
          approximation and similarly make various assumptions about the fluid.
        </p>
        {/*<p>
          For the following chapter on our first governing equation, I will
          model the fluid using an Eulerian viewpoint. This means to look at the
          fluid as being made up of discrete, fixed points in space where we
          measure fluid properties at these points. If we zoom into one of these
          points, we find them to be an infinitesimal control volume - a very
          small volume of our fluid.
        </p>
         <p>image of eulerian/lagrangian viewpoints</p>
        <p>There are two main ways to model a fluid:</p>
        <strong>Eulerian:</strong> Our first viewpoint of a fluid is one where
        we focus on a specific point in the domain and measure the field values
        at this point only. <hr></hr>
        <strong>Lagrangian:</strong> The other viewpoint views the fluid as one
        made up of these 'fluid parcels', where you track the fluid field values
        like velocity for each of these fluid parcels through space and time.
        <hr></hr> */}
        <h3>Continuity Equation</h3>
        <h5>* Rewrite several parts here</h5>
        <h5>* add labels to images</h5>
        <p>
          Our first governing equation describes how the mass of a fluid can be
          expressed for any volume of that fluid. Consider an arbitrary fixed
          volume of a fluid <InlineMath math="V" /> that has a surrounding
          boundary surface <InlineMath math="S" />. To simply define the mass at
          any point in time, we will derive the fluid version of{" "}
          <InlineMath math="mass = density \times volume" />. Here, if we define
          the density and volume, it will enable us to find our first expression
          for the mass of a fluid.
        </p>
        <img
          src="/images/fluids/fluidvolumecontinuity.png"
          className="img"
          title="Arbitrary volume of fluid (not to size!)"
        />
        <p>
          In the image, I have shown a possible example of a volume of fluid.
          Although it is shown as a cube, this can really be any shape and while
          it can be a small chunk of a fluid, it can also be the entire fluid
          itself - the equation is volume independent. To evaluate the mass of 
          this volume, you can't just say that{" "}
          <InlineMath math="m = \rho \times V" />, where{" "}
          <InlineMath math="\rho" /> is a density value. This is because the
          density isn't identical throughout the volume. We know it's impossible
          to sum the density of every single particle, instead we break up the
          volume into differential control volumes - region in space with its
          size shrinked to zero. By summing the mass of each differential
          control volume element <InlineMath math="\rho d\bold{V}" />, over the
          region yields the total mass.
          <BlockMath math="m = \iiint_V \rho\ dV" /> Whilst finding an
          expression for the total mass is useful, we are more interested in
          defining how the mass changes over time. I introduced the variable for
          the volume's outer surface <InlineMath math="S" /> and it's very
          reasonable to say that the mass change over time depends on the amount
          of mass leaving and entering this volume. For this expression, I first
          define a variable for the control surface that is perpendicular to the
          outer boundary and pointing outwards <InlineMath math="d\bold{S}" />.
          This is a shorthand for <InlineMath math="\bold{n} dS" />, where{" "}
          <InlineMath math="\bold{n}" /> is the outward pointing unit normal of
          the surface <InlineMath math="dS" />. The crucial evaluation to make
          is that taking the dot product of the velocity vector{" ("}
          <InlineMath math="\bold{v}" />) at the position{" "}
          <InlineMath math="d\bold{S}" /> and multiplying that with the density
          at that point, we derive an expression for the mass leaving the volume
          at a specific control surface :{" "}
          <InlineMath math="\rho \bold{v} \cdot d\bold{S}" />
        </p>
        <img
          src="/images/fluids/diffvolumesurface.png"
          className="img"
          title="simplified visual of dV and dS"
        />
        <p>
          <BlockMath math="\frac{d}{dt} \iiint_V \rho \ dV = -\oiint_S \rho \bold{v} \cdot d\bold{S}" />
          The next evaluation to make is to relate the time rate of change of
          the total mass to be equal to the negative sum of the masses that
          leave and enter every control surface facing outward on the boundary
          The circle inside the integral <InlineMath math="\oiint" /> means the
          surface we integrate over must be closed. We take the negative as to
          only evaluate the mass changes inside the volume. <hr></hr> The next
          step involves the use of the Gauss Divergence theorem. If you are
          unfamiliar with Gauss's theorem, I will explain it here but feel free
          to find a more in-depth explanation elsewhere. It states that "the
          surface integral of a vector field over a closed surface, otherwise
          known as the 'flux' through the surface, is equal to the volume
          integral of the divergence over the region enclosed by the surface".
          Given the volume <InlineMath math="V" />, with a boundary{" "}
          <InlineMath math="S" />, consider a continuously differentiable vector
          field <InlineMath math="\bold{F}" /> then the theorem states:
          <BlockMath math="\oiint_S (\bold{F} \cdot \hat{n}) \ dS = \iiint_V (\nabla \cdot \bold{F})\ dV" />
          I hope you see the resemblence of the left-hand side of Gauss's
          theorem to the right-hand side of the current expression we have,
          shown before. I show it here explicitly:
          <BlockMath math="-\oiint_S \rho \bold{v} \cdot d\bold{S} \xrightarrow{\text{Gauss}} -\iiint_V (\nabla \cdot \rho \bold{v})\ dV" />
          If you are unsure about mathematical symbols such as the 'del'
          operator <InlineMath math="\nabla" />, divergence{" "}
          <InlineMath math="\nabla \cdot\bold{F}" /> and gradient{" "}
          <InlineMath math="\nabla f" /> it would be beneficial. I will attach
          some resources that may provide a good introduction to them{" "}
          <a href="#ap-math" id="mathref" className="footnote">
            here
          </a>
          <hr></hr> If we apply Gauss's Divergence theorem:
          <BlockMath math="\frac{d}{dt} \iiint_V \rho \ dV = - \iiint_V (\nabla \cdot \rho \bold{v}) \ dV" />
          As the volume is constant, meaning the limits of integration are
          fixed, we can bring the time derivative to inside the integral. Then
          take the right side and bring over to the left and simplify.
          <BlockMath math="\iiint_V \frac{\partial \rho}{\partial t} dV + \iiint_V (\nabla \cdot \rho\bold{v}) \ dV = 0" />
          <BlockMath math="\iiint_V [\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho\bold{v})]\ dV = 0" />
          The final step is to infer that whilst we have clearly stated the
          volume here, this expression is valid for any volume{" "}
          <InlineMath math="V" /> and therefore we can simplify the expression
          to:
          <BlockMath math="\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \bold{v}) = 0" />
          This is known as the continuity or mass conservation equation. This
          one applies to any fluid however, like I mentioned before, it is
          common to make certain assumptions about a fluid in order to simplify
          the equation. The first is the assumption of a{" "}
          <strong>steady flow</strong> which says that there is no time
          dependency of the flow. It means for any property, here only density{" "}
          <InlineMath math="\rho" />, it will be time independent and so we say
          it won't have a local time rate of change or that{" "}
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
          expansion/contraction of the fluid volume. Whilst it may not seem
          sensible to reduce the type of fluid this equation can only apply to,
          it is very common in industry to work only with incompressible fluids
          such that simplifying the governing equations, such as this one, is an
          invaluable evaluation to make.
        </p>
        <p>
          If you are happy with this chapter and want to learn a little more or
          in the opposite direction found it tough, I would recommend checking
          out the appendix for a different derivation of the continuity
          equation. The current method follows an Eulerian viewpoint of the
          fluid whilst this other derivation follows a Lagrangian viewpoint. If
          these new words seem interesting or you want to learn more, check out
          the appendix{" "}
          <a href="#ap-1" id="apref-1" className="footnote">
            here
          </a>{" "}
          to find out more!
        </p>
        <h3>Momentum Equation (Navier-Stokes)</h3>
        <p>
          The most well known equation for modelling fluids, the momentum
          equation describes Newton's second law of motion for a fluid. To be
          complete, I will recall it to be{" "}
          <InlineMath math="\sum \bold{F} = m\bold{a}" />. To derive an
          expression for fluids, I will go through how we define each component
          of the expression applied to fluids at the differential level:{" "}
          <InlineMath math="d\bold{F}" />
          , <InlineMath math="dm" />, and <InlineMath math="d\bold{a}" />. I
          will start with deriving the total forces acting on a differential
          fluid element <InlineMath math="\sum \bold{F}" />. I will split the
          total forces into surface forces and body forces.
        </p>
        <h4>Surface Forces</h4>
        <p>
          Surface forces are forces acting on the respective bounding surfaces
          of the differential element. An important aspect with surface forces
          and what I will define first is what a <strong>stress</strong> is
          since they are used in defining surface forces. It turns out to be
          such an important concept that it is used in the very definition of a
          fluid. At its core, a fluid is a substance that cannot sustain a{" "}
          <strong>shearing stress</strong> (type of stress). I will provide
          definitions for stresses and its two different classifications.
        </p>
        <strong>Stress</strong> The internal force per unit area. Think of it as
        describing the intensity of internal forces at any point inside a
        substance. A cube with water inside at rest is undergoing virtually no
        stress; now imagine a spoon swirling the water, the internal forces are
        stronger now, due to an increase in stress. These forces try to resist
        the deformation (changing shape) and bring the fluid back to equilibrium
        however, by its definition a fluid will continuously deform if put under
        a shear stress.
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
        upper surface. Note that the tau operator next to the shear stress
        lable, we use it to represent a shear stress.
        <img
          src="/images/fluids/couetteflow.png"
          className="imgC"
          title="Couette flow"
        />
        <strong>
          Normal Stress <InlineMath math="\sigma" />
        </strong>{" "}
        A normal stress is a force applied perpendicular to the surface of the
        fluid. For water in a cube, at rest, the only stress would be the
        pressure acting on the surface of the cube. This applies similarly to
        compressed gas, where the fluid applies a normal stress on the gas
        container as it pushes perpendicular to the surface boundaries.
        <hr></hr>
        <p>
          <strong>Modelling Surface forces for a differential element</strong>
        </p>
        <p>
          To model all the surface forces (stresses) for our fluid, we must
          first define the fluid to be analysed. Just like our continuity
          equation derivation, we will continue to use the control volume model.
          To begin, I will draw out the relevant stresses that make up the
          surface forces. I will separate them by direction for now, because the
          derivation is easier when focusing on a specific direction, but they
          are all part of the same set of surface forces and will be integrated
          together in the final form of the momentum equation.
        </p>
        <img
          src="/images/fluids/diffelementstress.png"
          className="imgC"
          title="stresses for each direction"
        />
        <p>
          The volume <InlineMath math="dxdydz" /> contains stresses for each
          direction and for each surface. The shear stresses are the forces that
          are tangent to the surfaces (in red) and the normal stresses are
          perpendicular (in green). For the following sections, I will only run
          through the derivation for the <InlineMath math="x" /> direction.
          However, it will all apply to the other directions.
        </p>
        <img
          src="/images/fluids/elementwithstresses.png"
          className="img"
          title="stresses for x-direction with stress tensors"
        />
        <p>
          In order to define stresses, it is common to represent them using
          stress tensors. We use the <InlineMath math="\sigma" /> variable to
          represent normal stresses and <InlineMath math="\tau" /> to represent
          shear stresses. To explain the stress tensor, the first subscript{" "}
          <InlineMath math="i" /> represents the direction of the normal of the
          stress's surface. For <InlineMath math="\sigma_{xx}" /> the first
          subscript is <InlineMath math="x" /> because the normal to the left
          and right faces is in the x direction. The second subscript is the
          direction of the stress so every stress in this image would have{" "}
          <InlineMath math="x" /> as the second subscript. You would have
          noticed that the stresses in the positive direction of x have an extra
          component (i.e.{" "}
          <InlineMath math="\frac{\partial \sigma_{xx}}{\partial x} dx" />
          ). This is because those stresses include their spatial variation
          across the differential element. This is characterised with the
          truncated Taylor series. In order to characterise the stresses with
          their respective surfaces, we multiply them by their corresponding
          surface area. So for the stress <InlineMath math="\sigma_{xx}" /> it
          will be multiplied by <InlineMath math="dydz" /> since that is the
          surface area of the left/right faces. <hr></hr> If you are unfamiliar
          with the truncated Taylor series, I will give a brief explanation
          here. Assume that we know the value of a function, say{" "}
          <InlineMath math="F(x,y,z)" />, at a specific spatial location{" "}
          <InlineMath math="(x,y,z)" />, we should be able to determine the
          value of the function at a differential distance, say{" "}
          <InlineMath math="\Delta x" />, to be:
          <BlockMath math="F(x + \Delta x, y,z) =F(x,y,z) + \frac{\partial F}{\partial x} \Delta x + \frac{1}{2!} \frac{\partial^2 F}{\partial x^2}(\Delta x)^2 + \frac{1}{3!} \frac{\partial^3 F}{\partial x^3}(\Delta x)^3 + ..." />
          We use the logic that if <InlineMath math="\Delta x" /> is very small,
          then higher powers <InlineMath math="\Delta x^2" />,{" "}
          <InlineMath math="\Delta x^3" /> etc will be so much smaller such that
          they can be considered negligible compared to{" "}
          <InlineMath math="\Delta x" />. This means that when we let{" "}
          <InlineMath math="\Delta x \to 0" />, such that{" "}
          <InlineMath math="\Delta x \rArr dx" />, we ignore higher order terms.
          Therefore, we can approximate that:
          <BlockMath math="\lim\limits_{\Delta x \to 0} F(x + \Delta x, y, z) = F(x + dx, y, z) \cong F(x,y,z) + \frac{\partial F}{\partial x}dx" />
          This is the truncated Taylor series and is applicable in the limit of
          an infinitesimal differential element. It should become clear how this
          is used for expanding stresses across the differential distances of
          the surfaces of the cube. For example if we wanted to expand{" "}
          <InlineMath math="\sigma_{xx}" /> across the differential distance{" "}
          <InlineMath math="dx" />, it would result in{" "}
          <InlineMath math="\sigma_{xx} + \frac{\partial \sigma_{xx}}{\partial x}dx" />{" "}
          where we substitute <InlineMath math="\sigma_{xx}" /> as the function{" "}
          <InlineMath math="F" />. <hr></hr> Now that we have determined all the
          surface forces for a fluid (given we added the stress tensors for the
          other directions as well), It is time to move onto defining the
          fluid's body forces.
        </p>
        <h4>Body Forces</h4>
        <p>
          Body forces are much simpler compared to surface forces in that they
          are forces that are applied to the entirety of the differential
          volume. Think gravity, magnetic fields, or an electric field as
          examples. To simplify the forces, we accumulate them into a single
          directional force field <InlineMath math="\bar{\beta}_x" /> that
          represents all the body forces in the x direction. We multiply this by
          the density and volume of the differential control volume.
        </p>
        <img
          src="/images/fluids/surface+bodyforces.png"
          className="imgC"
          title="stresses for x-direction with stress tensors"
        />
        <p>
          Here I have shown the calculation for the total forces for the x
          direction. I hope it clearly shows how the stresses are being summed
          and by multiplying by the surface area we cover the entire
          differential control volume. Lets simplify this expression, for the
          surface pairs, we can expand and cancel out terms, shown below for the
          x direction:
          <BlockMath math="\sout{\sigma_{xx}dydz} + \frac{\partial \sigma_{xx}}{\partial x}dxdydz \sout{- \sigma_{xx}dydz}" />
          If you apply this simplification to the entire expression:
          <BlockMath math="dF_x = \rho\bar{\beta}_x dxdydz + \frac{\partial \sigma_{xx}}{\partial x} dxdydz + \frac{\tau_{yx}}{\partial y}dydxdz + \frac{\tau_{zx}}{\partial z}dzdydx" />
          <BlockMath math="dF_x = \lfloor\rho\bar{\beta}_x+ \frac{\partial \sigma_{xx}}{\partial x}+ \frac{\tau_{yx}}{\partial y} + \frac{\tau_{zx}}{\partial z}\rfloor dxdydz" />
          And for the other directions:
          <BlockMath math="dF_y = \lfloor\rho\bar{\beta}_y+ \frac{\partial \tau_{xy}}{\partial x}+ \frac{\sigma_{yy}}{\partial y} + \frac{\tau_{zy}}{\partial z}\rfloor dxdydz" />
          <BlockMath math="dF_z = \lfloor\rho\bar{\beta}_z+ \frac{\partial \tau_{xz}}{\partial x}+ \frac{\tau_{yz}}{\partial y} + \frac{\sigma_{zz}}{\partial z}\rfloor dxdydz" />
        </p>
        <h4>Progress</h4>
        <p>
          <BlockMath math="\lfloor\rho\bar{\beta}_x+ \frac{\partial \sigma_{xx}}{\partial x}+ \frac{\tau_{yx}}{\partial y} + \frac{\tau_{zx}}{\partial z}\rfloor dxdydz = m\vec{a}_x" />
          We have defined the differential forces for the fluid. When
          substituted into Newton's second law, we can obtain the equation
          above, again for the x direction only. Although this isn't actually
          the final state for the left-side, I will expand the right{" "}
          <InlineMath math="m\vec{a}" /> first because, when combined with the
          current total force expression, it results in the general momentum
          equation for all fluids.
        </p>
        <p>
          The differential mass <InlineMath math="dm" /> is just the mass of a
          differential volume so <InlineMath math="\rho dxdydz" />. The
          acceleration is derived from something called the material derivative.
          In order to grasp its derivation, I will start by discussing the two
          ways to view fluids. The first is the Eulerian viewpoint.
        </p>
        <strong>Eulerian Viewpoint</strong>
        This views the fluid with fixed locations in space, meaning if we wanted
        to observe the behaviour of a fluid, you would view fixed points in the
        fluid and measure its data at those points. This is actually how we have
        viewed the fluid for all the previous work. Recall that I modelled a
        fluid as being made up of differential control volumes and that I never
        mentioned these control volumes moving within the fluid. This fits the
        description of a fluid. Below I have shown two ways to visualise the
        Eulerian viewpoint. Firstly are the fixed differential control volumes
        (which are enlarged for visual purposes) that stay fixed in the cube.
        The second is a flow where a little camera observes the fluid at a fixed
        location.
        <hr></hr>
        <img
          src="/images/fluids/Eulerian.png"
          className="imgC"
          title="stresses for x-direction with stress tensors"
        />
        <hr></hr>
        <strong>Lagrangian Viewpoint</strong>
        The other viewpoint views the fluid as being made up of moving 'fluid
        parcels' that follow a similar trajectory to the fluid. It may be easier
        to view fluids with the lagrangian viewpoint since I think its a more
        natural interpretation of reality. I have again show the two ways of
        visualising the lagrangian viewpoint below. Remember these 'fluid
        parcels' are just approximations of fluid dynamics behaviour and by no
        means are a reflection of reality.
        <hr></hr>
        <img
          src="/images/fluids/Lagrangian.png"
          className="imgC"
          title="stresses for x-direction with stress tensors"
        />
        <p>
          The reason I introduce this concept is to help with the derivation of
          the material derivative, ultimately to help derive an expression for
          the acceleration for the Navier-Stokes equation.
        </p>
        <strong>Material Derivative</strong>
        <p>
          Let's start by using the Lagrangian viewpoint and assume that at any
          time we can query the particle's position as{" "}
          <InlineMath math="\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}" />. This
          particle is a part of an Eulerian velocity field that will move the
          particle. We can then say after an infinitesimal amount of time, the
          particle attains a new position given by:
          <BlockMath math="\vec{r} + \Delta \vec{r} = (x + \Delta x)\hat{i} + (y + \Delta y)\hat{j} + (z + \Delta z)\hat{k}" />
          Since the particle moved due to the velocity field, we can attribute
          the velocity of the particle to be <InlineMath math="\vec{V}_p" />.
          Therefore to calculate the change in velocity over the time change{" "}
          <InlineMath math="\Delta t" />, we do:
          <BlockMath math="\Delta \vec{V}_p = \vec{V}_p \biggm\vert_{t+\Delta} - \vec{V}_p \biggm\vert_{t}" />
          <BlockMath math="\Delta \vec{V}_p = \vec{V}(x + \Delta x, y + \Delta y, z + \Delta z,t + \Delta t) - \vec{V}(x,y,z,t)" />
          We apply the chain rule of differential calculus to get us:
          <BlockMath math="\Delta \vec{V}_p =\frac{\partial \vec{V}}{\partial x} \Delta x_p + \frac{\partial \vec{V}}{\partial y}\Delta y_p + \frac{\partial \vec{V}}{\partial z}\Delta z_p + \frac{\partial \vec{V}}{\partial t} \Delta t" />
          Each of the differential displacement components are composed of the
          product of the local velocity component and{" "}
          <InlineMath math="\Delta t" />. Lets expand each one:
          <BlockMath math="\Delta \vec{V}_p =\frac{\partial \vec{V}}{\partial x} u\Delta t + \frac{\partial \vec{V}}{\partial y}v\Delta t + \frac{\partial \vec{V}}{\partial z}w\Delta t + \frac{\partial \vec{V}}{\partial t} \Delta t" />
          <BlockMath math="\Delta \vec{V}_p =(\frac{\partial \vec{V}}{\partial x} u + \frac{\partial \vec{V}}{\partial y}v + \frac{\partial \vec{V}}{\partial z}w + \frac{\partial \vec{V}}{\partial t})\Delta t" />
          <BlockMath math="\frac{\Delta \vec{V}_p}{\Delta t} =\frac{\partial \vec{V}}{\partial x} u + \frac{\partial \vec{V}}{\partial y}v + \frac{\partial \vec{V}}{\partial z}w + \frac{\partial \vec{V}}{\partial t}" />
          After dividing by the differential time change, take its limit as:{" "}
          <InlineMath math="\Delta t \to 0" />
          <BlockMath math="\lim\limits_{\Delta t \to 0}\frac{\Delta \vec{V}_p}{\Delta t} =\frac{\partial \vec{V}}{\partial x} u + \frac{\partial \vec{V}}{\partial y}v + \frac{\partial \vec{V}}{\partial z}w + \frac{\partial \vec{V}}{\partial t}" />
          This expression is the same as evaluating the{" "}
          <strong>acceleration</strong> of the particle:
          <BlockMath math="\vec{a}_p =\frac{\partial \vec{V}}{\partial x} u + \frac{\partial \vec{V}}{\partial y}v + \frac{\partial \vec{V}}{\partial z}w + \frac{\partial \vec{V}}{\partial t}" />
          Although we have finished deriving the acceleration which will be used
          in the Navier-Stokes derivation, this equation can be generalised. If
          you replace the velocity field with another property of the material,
          we get the material derivative:
          <BlockMath math="\frac{DF}{Dt}=\frac{\partial F}{\partial x} u + \frac{\partial F}{\partial y}v + \frac{\partial F}{\partial z}w + \frac{\partial F}{\partial t}" />
          <BlockMath math="\frac{DF}{Dt} = (\vec{V} \cdot \nabla)F + \frac{\partial F}{\partial t}" />
          Here <InlineMath math="F" /> is representative of a property of the
          material and I have also included the vector form. It is now possible
          to insert a property of the fluid into the material derivative in
          order to establish its temporal changes.
        </p>
        <h5>* relating stresses to strain rates, newtonian fluids</h5>
        <h5>* deriving rate-of-strain tensor in terms of spatial variations</h5>
        <p>
          Therefore, the stress equations for a Newtonian fluid are:
          <BlockMath math="\sigma_{xx} = -p + 2\mu\dot{\epsilon}_{xx} + \lambda(\dot{\epsilon}_{xx} + \dot{\epsilon}_{yy} + \dot{\epsilon_{zz}})" />
          <BlockMath math="\sigma_{yy} = -p + 2\mu\dot{\epsilon}_{yy} + \lambda(\dot{\epsilon}_{xx} + \dot{\epsilon}_{yy} + \dot{\epsilon_{zz}})" />
          <BlockMath math="\sigma_{zz} = -p + 2\mu\dot{\epsilon}_{zz} + \lambda(\dot{\epsilon}_{xx} + \dot{\epsilon}_{yy} + \dot{\epsilon_{zz}})" />
          <BlockMath math="\tau_{xy} = 2\mu\dot{\epsilon}_{xy}" />
          <BlockMath math="\tau_{yz} = 2\mu\dot{\epsilon}_{yz}" />
          <BlockMath math="\tau_{zx} = 2\mu\dot{\epsilon}_{zx}" />
          And After substituting the spatial variations for the rate-of-strain
          tensors we get:
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial u}{\partial x} + \lambda (\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z})" />
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial v}{\partial y} + \lambda (\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z})" />
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial w}{\partial z} + \lambda (\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z})" />
          <BlockMath math="\tau_{xy} = \mu(\frac{\partial u}{\partial y} + \frac{\partial v}{\partial x}) = \tau_{yx}" />
          <BlockMath math="\tau_{yz} = \mu(\frac{\partial v}{\partial z} + \frac{\partial w}{\partial y}) = \tau_{zx}" />
          <BlockMath math="\tau_{zx} = \mu(\frac{\partial w}{\partial x} + \frac{\partial u}{\partial z}) = \tau_{zy}" />
          To simplify, I use the divergence symbol where{" "}
          <InlineMath math="\nabla \cdot \vec{V} = \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z}" />
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial u}{\partial x} + \lambda \nabla \cdot \vec{V}" />
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial v}{\partial y} + \lambda \nabla \cdot \vec{V}" />
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial w}{\partial z} + \lambda \nabla \cdot \vec{V}" />
          <strong>Stokes Hypothesis</strong>
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial u}{\partial x} - \frac{2}{3} \mu \nabla \cdot \vec{V}" />
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial v}{\partial y} - \frac{2}{3} \mu \nabla \cdot \vec{V}" />
          <BlockMath math="\sigma_{xx} = -p + 2\mu\frac{\partial w}{\partial z} - \frac{2}{3} \mu \nabla \cdot \vec{V}" />
          Now we are able to substitute these Stokes simplified stress models.
          Starting with the x direction:
          <BlockMath math="\rho\beta_x + \frac{\partial}{\partial x} (-p + 2\mu \frac{\partial u}{\partial x} - \frac{2}{3} \mu \nabla \cdot \vec{V}) + \frac{\partial}{\partial y}[\mu(\frac{\partial v}{\partial x} + \frac{\partial u}{\partial y})] + \frac{\partial}{\partial z}[\mu(\frac{\partial u}{\partial z} + \frac{\partial w}{\partial x})]" />
          Restric the fluid to one of constant viscosity,{" "}
          <InlineMath math="\mu = " /> constant giving:
          <BlockMath math="\rho\beta_x - \frac{\partial p}{\partial x} + \mu \frac{\partial}{\partial x}(2\frac{\partial u}{\partial x} - \frac{2}{3}\nabla \cdot \vec{V})+\mu\frac{\partial}{\partial y}(\frac{\partial v}{\partial x} + \frac{\partial u}{\partial y}) + \mu\frac{\partial}{\partial z}(\frac{\partial u}{\partial z} + \frac{\partial w}{\partial x})" />
          Expand the brackets and re-arrange
          <BlockMath math="\rho\beta_x - \frac{\partial p}{\partial x} + 2\mu\frac{\partial^2u}{\partial x^2} - \frac{2\mu}{3}\frac{\partial}{\partial x} (\nabla \cdot \vec{V}) + \mu \frac{\partial^2 v}{\partial y \partial x} + \mu \frac{\partial^2 u}{\partial y^2} + \mu \frac{\partial^2 u}{\partial z^2} + \mu\frac{\partial^2 w}{\partial z \partial x}" />
          Group and simplify terms
          <BlockMath math="\rho\beta_x - \frac{\partial p}{\partial x} + \mu[\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}] + \mu\frac{\partial}{\partial x}[\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z}] - \frac{2}{3}\mu \frac{\partial}{\partial x}(\nabla \cdot \vec{V})" />
          We can simplify with the Laplacian and divergence operators:
          <BlockMath math="\rho\beta_x -\frac{\partial p}{\partial x} + \mu \nabla^2 u + \frac{1}{3}\mu \frac{\partial}{\partial x} (\nabla \cdot \vec{V}) = \rho a_x" />
          <BlockMath math="\rho\beta_y -\frac{\partial p}{\partial y} + \mu \nabla^2 v + \frac{1}{3}\mu \frac{\partial}{\partial y} (\nabla \cdot \vec{V}) = \rho a_y" />
          <BlockMath math="\rho\beta_z -\frac{\partial p}{\partial z} + \mu \nabla^2 w + \frac{1}{3}\mu \frac{\partial}{\partial z} (\nabla \cdot \vec{V}) = \rho a_z" />
          Combine the three directions
          <BlockMath math="\rho \vec{\beta} - \nabla p + \mu\nabla^2 \vec{V} + \frac{1}{3}\mu \nabla (\nabla \cdot \vec{V}) = \rho \vec{a}" />
          Expand the right side - the material derivative for the acceleration
          <BlockMath math="\rho \vec{\beta} - \nabla p + \mu\nabla^2 \vec{V} + \frac{1}{3}\mu \nabla (\nabla \cdot \vec{V}) = \rho \frac{D\vec{V}}{Dt} " />
          We can go further if we make more assumptions about the fluid. By
          assuming an incompressible fluid, we know that from the continuity
          equation reduced to <InlineMath math="\nabla \cdot \vec{V} = 0" />.
          <BlockMath math="\rho \vec{\beta} - \nabla p + \mu \nabla^2 \vec{V} = \rho \frac{D\vec{V}}{Dt}" />
          An incompressible flow means the density is constant. The equation
          usually divides through by the density component:
          <BlockMath math="\vec{\beta} - \frac{\nabla p}{\rho} + \nu \nabla^2 \vec{V} = \frac{D\vec{V}}{Dt}" />
          We use <InlineMath math="\nu" /> as a shorthand for{" "}
          <InlineMath math="\frac{\mu}{\rho}" />.
        </p>
        <p>
          There are various other versions that you may see that are equivalent.
          <BlockMath math="\frac{\partial v}{\partial t} + (v \cdot \nabla)v = -\frac{1}{\rho}\nabla p + \nu \nabla^2 v + g" />
          This expands the material derivative, re-arranges the equation, and
          sets the body force variable to gravity.
        </p>
        <p>
          many fluids ar enot newtonian - no direct proportionality between
          stresses and strain rates. this is the case for suspensions, or
          mixtures containing solid particles (muddy water, dust in air, or
          blood), the study of the relation between a stress applied on a
          material and the resulting strains and strain rates is called rheology
          3 reasons: 1. relation is non-linear: shampoo, wall paint, ketchup -
          where the viscosity decreases when shear rate increases. 2. when shear
          rate and stress depends on time. 3. mixture of viscous and elastic
          responses.
        </p>
        <h3>Appendix</h3>
        <p id="ap-math">
          To help with the mathematics used in fluid modelling, I would
          recommend Chapter 2 in the textbook "Intro to Grad Fluid Mechanics"
          found{" "}
          <a
            href="https://www.researchgate.net/publication/371938725_Introduction_to_Graduate_Fluid_Mechanics_Ed_IV_2023"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            here
          </a>
          {". "}
          Other great resources include many of the videos by 3Blue1Brown like
          this{" "}
          <a
            href="https://youtu.be/rB83DpBJQsE?si=I0A5fCQRXENXiehM"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            video on divergence and curl
          </a>{" "}
          and his incredible{" "}
          <a
            href="https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&si=yPdE6zF-XR5CXpao"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            series on linear algebra
          </a>
          {". "}
          To me these resources have been great, but there are many other fluid
          and mathematics textbooks out there. It is imperative that these
          concepts are understood as they are fundamental to understanding fluid
          mechanics and for computational fluid dynamics.
        </p>
        <a href="#mathref" className="footnote">
          ↩
        </a>
        <p id="ap-1">
          The current view of the fluid is that of an Eulerian viewpoint. This
          means
        </p>
        <a href="#apref-1" className="footnote">
          ↩
        </a>
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
