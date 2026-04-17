import { Link } from "react-router-dom";
import "../Media/media.css";

export default function Week2Media() {
  return (
    <div>
      <Link to="/media" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Media </h1>
      </Link>
      <div className="contents">
        <div className="divider" />
        <div className="row">
          <h2>Music</h2>
          <img
            src="/images/media/media icons/spotify.png"
            className="imgSlogo"
          />
        </div>
        {musiclist.map((music, i) => (
          <div key={i} className="video-section">
            <a href={music.url} target="_blank" rel="noopener noreferrer">
              <h3>{music.title}</h3>
            </a>

            <img src={music.img} className="imgSpotify" />

            <p>{music.description}</p>
          </div>
        ))}
        <div className="divider" />
        <div className="row">
          <h2>Sites ⛏️</h2>
        </div>
        {Sites.map((site, i) => (
          <div key={i} className="video-section">
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              <h3>{site.title}</h3>
            </a>
            <p>by {site.author}</p>
            <p>{site.description}</p>
          </div>
        ))}
        <div className="divider" />
        <div className="row">
          <h2>Movie 🍿</h2>
        </div>
        {movielist.map((movie, i) => (
          <div key={i} className="video-section">
            <h3>{movie.title}</h3>
            <img src={movie.img} className="imgO" />
            <p>{movie.description}</p>
          </div>
        ))}
        <p>For all the movies I watched add me on Letterboxd!</p>
        <div className="divider" />
        <div className="row">
          <h2>Show 📺</h2>
        </div>
        {showlist.map((show, i) => (
          <div key={i} className="video-section">
            <h3>{show.title}</h3>
            <img src={show.img} className="imgO" />
            <p>{show.description}</p>
          </div>
        ))}
        <div className="divider" />
        <div className="row">
          <h2>Youtube Videos</h2>
          <img src="/images/media/media icons/yt.png" className="imgLogo" />
        </div>
        {ytvids.map((video, i) => (
          <div key={i} className="video-section">
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <h3>{video.title}</h3>
            </a>

            <img src={video.img} className="imgO" />

            <p>{video.description}</p>
          </div>
        ))}
        <div className="divider" />
      </div>
    </div>
  );
}

const ytvids = [
  {
    title: "the best samples in history",
    url: "https://www.youtube.com/watch?v=K71XefOlJh0&t=1s",
    img: "/images/media/yt1.webp",
    description: `A`,
  },
];

const Sites = [
  {
    title: "Notes on Computational Fluid Dynamics",
    author: "",
    url: "",
    description: `T`,
  },
];

const musiclist = [
  {
    title: "Good Luck",
    url: "https://open.spotify.com/artist/4QQgXkCYTt3BlENzhyNETg?si=inPwLDufRYueQxZosEiRRw",
    img: "",
    description: `Bladee + Mechatok `,
  },
];

const movielist = [
  {
    title: "happend?",
    img: "/images/media/movie1.png",
    description: `W`,
  },
];

const showlist = [
  {
    title: "Jujutsu Kaisen S3",
    img: "/images/media/show1.webp",
    description: `H`,
  },
];
