import { Link, Outlet, useMatch } from "react-router-dom";
import "./HomePage.css";

export default function MediaPage() {
  const isIndex = useMatch("/media");

  return (
    <div>
      {isIndex && (
        <>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="header">Monthly Media</h1>
          </Link>
          <div className="contents">
            <p>
              Travel back in time and look through the media I have consumed.
              This includes music, movies, videos, books, websites, papers... I
              decided to do this in order to avoid mindless consumption and to
              further appreciate access to these cool things.
            </p>
            {MediaList.map((media) => (
              <div key={media.id}>
                <Link to={media.link}>
                  <h3>{media.date}</h3>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      <Outlet />
    </div>
  );
}

type MediaData = {
  id: string;
  date: string;
  link: string;
};

const MediaList: MediaData[] = [
  { id: "1", date: "March 2026", link: "/media/w1" },
];
