import { Link, Outlet, useMatch } from "react-router-dom";
import "./HomePage.css";

export default function BlogHomePage() {
  const isIndex = useMatch("/blog");

  return (
    <div>
      {isIndex && (
        <>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="header">Blog</h1>
          </Link>
          <div className="contents">
            {BlogInfo.map((blog) => (
              <div key={blog.id}>
                <Link to={blog.link}>
                  <h3>{blog.title}</h3>
                </Link>
                <p>{blog.date}</p>
                <p>{blog.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <Outlet />
    </div>
  );
}

type BlogData = {
  id: string;
  title: string;
  date: string;
  description: string;
  link: string;
};

const BlogInfo: BlogData[] = [
  {
    id: "1",
    title: "Trying to understand AI",
    date: "05/02/2026",
    description: "A dive into the basics of building Neural Networks",
    link: "/blog/AI",
  },
];
