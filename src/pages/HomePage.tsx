import { Routes, Route, Link } from "react-router-dom";
import ProjectsPage from "./Projects";
import InterestsPage from "./Interests";
import BlogHomePage from "./BlogHome";
import "./Homepage.css";
import Ex1Page from "./Blog/ex1";
import Ex2Page from "./Blog/Ex2";

function HomeContent() {
  return (
    <>
      <h1 className="header"> Toru Yamaguchi</h1>
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

export default function HomePage() {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/interests" element={<InterestsPage />} />
      <Route path="/blog" element={<BlogHomePage />}>
        <Route path="ex1" element={<Ex1Page />} />
        <Route path="ex2" element={<Ex2Page />} />
      </Route>
    </Routes>
  );
}
