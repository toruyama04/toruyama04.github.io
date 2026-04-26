import { Link } from "react-router-dom";
import "../Media/media.css";

export default function April26Media() {
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
    title: "V-035: Fish Schooling at Scale",
    url: "https://youtu.be/h6_W3GW2G7g?si=3s7Xvyi5crHquCKs",
    img: "/images/media/April26/yt1.jpg",
    description: `Such an interesting video, but I can't find the paper :(`,
  },
  {
    title: "TIP2TIP China",
    url: "https://www.youtube.com/live/LTP0NjPrXv0?si=nsZqBLpSXazQDTZA",
    img: "/images/media/April26/yt2.jpg",
    description: `Finally another tip2tip, this time in China! This is a 16 part vlog style series
          where Ludwig and Michael travel from one side of a country to the other without using their
          phone, maps, or highways. As you can imagine, they would require a lot of help and they indeed
          found a lot of it during their experience. I found it to be super fun and funny whilst
          getting to learn more about Chinese culture and the exploration of more rural areas.`,
  },
  {
    title: "Radiohead - In Rainbows From the Basement (April 2008)",
    url: "https://youtu.be/DWuAn6C8Mfc?si=wV1vY_r_WDJHCgeT",
    img: "/images/media/April26/yt3.jpg",
    description: `So apparently this is one of highest rated on Letterboxd and I was curious since I
          have liked a lot of the popular songs from Radiohead. I feel this set was a culmination of
          talent that you rarely get to see, each artist putting their highest effort for an hour straight.
          It was really quite beautiful.`,
  },
];

const Sites = [
  {
    title: "Radiance Fields.com",
    author: "Michael Rubloff",
    url: "https://radiancefields.com/",
    description: `radiancefields.com was a website I picked up when I travelled along the pipeline on Gaussian
          Splatting. This technology is really incredible and has insane potential for the future. I want to
          have a go and use it and learn more about it and this website is an incredible resource
          for that.`,
  },
];

const musiclist = [
  {
    title: "The Cruel Angel's Thesis (Director's Edit Version",
    url: "https://open.spotify.com/track/3x4378ztiLvFmm2nuzEI0C?si=deb2c84807054996",
    img: "/images/media/April26/spotify2.jpg",
    description: `Saw a clip of the Weekend sampling this song for a transition between his songs at one
          of his concerts. It sounded heavenly and reminded me of how legendary this opening is.`,
  },
  {
    title: "WOR$T GIRL IN AMERICA",
    url: "https://open.spotify.com/album/5siV9C6eK0NpAqER2FfCVA?si=Hu1XOJQfQleIv5CMJSkPyg",
    img: "/images/media/April26/spotify3.jpg",
    description: `Some absolute bangers in this album, heavy on the great production and the energy it
          induces when listening. YES GODDD, CRANK, CANNIBALISM!, BEAT UP CHANEL$, DANCE... are all
          certified amazing songs.`,
  },
  {
    title: "Good Luck",
    url: "https://open.spotify.com/album/7cTvVOSXLgMm0RtT7uXWGY?si=HAtnQBGnR5m45JE-l4T9QQ",
    img: "/images/media/April26/spotify1.jpg",
    description: `By Bladee and MechaTok, this album has some really awesome songs with great production
          like Rainbow, Into One, and Sun. Go check it out!`,
  },
];

const movielist = [
  {
    title: "The Drama",
    img: "/images/media/April26/movie2.jpg",
    description: `I went to watch this film with a couple friends I had little idea with what to expect
          other than there was some heated discussion with the subject manner. What transpired was one
          of the most interesting films I have watched recently with a clear open invitation to an open
          ended discussion of the characters, their actions, and how it would play out in real life. The
          film was also really funny with a ton of awkward gags that worked really well on me. After the
          film, we decided to go to the pub and just sit and talk about the film for hours. `,
  },
  {
    title: "Happyend",
    img: "/images/media/April26/movie1.jpg",
    description: `This film felt like it was clearly made by a massive film nerd. That has its pros in
          that the shot composition throughout was really nice but I also felt the film lacked actual
          substance. It focused too much on the aesthetic of the scene but it also meant I felt somewhat
          disconnected with the characters. The actors themselves were all pretty good and it was an
          interesting departure from the regular Tokyo style film.`,
  },
];

