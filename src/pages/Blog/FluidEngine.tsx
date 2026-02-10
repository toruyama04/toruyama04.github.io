import { Link } from "react-router-dom";
import "../HomePage.css";
import "./Blog.css";

export default function FluidEnginePage() {
  return (
    <div>
      <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Creating a Fluid Engine</h1>
      </Link>
      <div className="contents">
        <p>hello world</p>
      </div>
    </div>
  );
}
