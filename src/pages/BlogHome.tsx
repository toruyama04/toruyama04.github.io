import { Link, Outlet, useMatch } from "react-router-dom";
import "./Homepage.css";

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
    id: "0",
    title: "ex1",
    date: "01/10/2025",
    description: "yeah",
    link: "/blog/ex1",
  },
  {
    id: "1",
    title: "ex2",
    date: "01/10/2025",
    description: "oh yeah",
    link: "/blog/ex2",
  },
];
