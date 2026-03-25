import { Link } from "react-router-dom";

export default function Week1Media() {
  return (
    <div>
      <Link to="/media" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Media </h1>
      </Link>
      <div className="contents">
        <h2>Youtube Videos</h2>
        <a
          href="https://www.youtube.com/watch?v=K71XefOlJh0&t=1s"
          target="_blank"
          rel="noopener noreferrer"
          className="footnote"
        >
          <h3>the best samples in history</h3>
        </a>
        Image?6
        <p></p>
      </div>
    </div>
  );
}
