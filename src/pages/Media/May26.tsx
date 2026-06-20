import { Link } from "react-router-dom";
import "../Media/media.css";

export default function May26Media() {
  return (
    <div>
      <Link to="/media" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Media</h1>
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
        <p>
          The following songs are newer ones to change it up a bit. Yet some of
          these songs do reminds me of older ones but with slightly more modern
          production. I'm sure you will enjoy any of these!
        </p>
        <div className="music-grid">
          {musiclist.map((music, i) => (
            <div key={i}>
              <a href={music.url} target="_blank" rel="noopener noreferrer">
                <h3>{music.title}</h3>
              </a>
              <img src={music.img} className="imgSpotify" />
            </div>
          ))}
        </div>

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
        <div className="divider" />
        {/* <div className="row">
          <h2>Show 📺</h2>
        </div>
        {showlist.map((show, i) => (
          <div key={i} className="video-section">
            <h3>{show.title}</h3>
            <img src={show.img} className="imgO" />
            <p>{show.description}</p>
          </div>
        ))}
        <div className="divider" /> */}
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
    title: "24 hours to eat a skateboard",
    url: "https://www.youtube.com/watch?v=0iQHspTH1bA",
    img: "/images/media/May26/yt1.jpg",
    description: `Season 1 of Bunch of Friends finishes off with this spectacle. 
        It's like they brought creativity back to youtube!`,
  },
  {
    title: "Stuck in the Renaissance Era...AGAIN",
    url: "https://www.youtube.com/watch?v=KjQ7qAesEl8",
    img: "/images/media/May26/yt2.webp",
    description: `This was just wild`,
  },
];

const Sites = [
  {
    title: "CFD university",
    author: "Tom-Robin Teschner",
    url: "https://cfd.university/",
    description: `A great resource for CFD knowledge`,
  },
];

const musiclist = [
  {
    title: "lighters",
    url: "https://open.spotify.com/track/4RalUNj0mtp9K3imqmzO4h?si=6a2e4ac931e14bdc",
    img: "/images/media/May26/spotify1.png",
  },
  {
    title: "Liar",
    url: "https://open.spotify.com/track/4RalUNj0mtp9K3imqmzO4h?si=6a2e4ac931e14bdc",
    img: "/images/media/May26/spotify2.png",
  },
  {
    title: "Passerine",
    url: "https://open.spotify.com/track/4RalUNj0mtp9K3imqmzO4h?si=6a2e4ac931e14bdc",
    img: "/images/media/May26/spotify3.jpg",
  },
  {
    title: "Child's Play",
    url: "https://open.spotify.com/track/4RalUNj0mtp9K3imqmzO4h?si=6a2e4ac931e14bdc",
    img: "/images/media/May26/spotify4.jpg",
  },
  {
    title: "brave2",
    url: "https://open.spotify.com/track/65Lfg7gOR3BZQzVD4d7JJY?si=9aa49bb62bd84b39",
    img: "/images/media/May26/spotify5.png",
  },
  {
    title: "Musicflirte",
    url: "https://open.spotify.com/track/0MQIUD4TmPkF96xPqaNr7O?si=d6878d3bba234c35",
    img: "/images/media/May26/spotify6.png",
  },
];

const movielist = [
  {
    title: "Dead Leaves",
    img: "/images/media/May26/movie1.jpg",
    description: `Conceptually insane with some crazy characters. This movie had me locked in
    for its entire duration, you don't want to take ur eyes off of this one. The animation alone
    is inspiringly dynamic and just incredibly cool.`,
  },
  {
    title: "Nobody Knows",
    img: "/images/media/May26/movie2.jpg",
    description: `This film was incredible, it truly didn't feel like they were shooting on some set, every
      scene and angle felt natural, purposeful, and built a vividly real atmosphere. The child actors, all
      of them, were astounding and it surprised me how much depth they can bring. I think culturally this film 
      shows how kids in unfortunate situations navigate life in a society that demands staying in line. One that
      would rip apart the kids as that would be the most cost-effective solution. My favourite parts of the film
      are the different social aspects of being a kid and wanting to fit in. Akira desparately trying to hold onto
      his 'friends' and also how they adopt the companion of a girl who offers a different social reflection of
      the society.`,
  },
];
