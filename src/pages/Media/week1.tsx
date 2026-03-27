import { Link } from "react-router-dom";
import "../Media/media.css";

export default function Week1Media() {
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
    description: `An incredible video by Synthet with a runtime of just over 10 minutes.
          I think his editing style is one of the best currently, it seemlessly
          blends background music with the samples used in the video culminating
          into one cohesive soundtrack. It is so refreshing and unique to watch
          and listen, making it an instant classic for any fans of music
          especially those in production. You can vibe to the music whilst
          learning about the rich history of sampling, awesome!`,
  },
  {
    title: "Korea: the world's most polarized society",
    url: "https://www.youtube.com/watch?v=b1fKG1t3gDs",
    img: "/images/media/yt2.jpg",
    description: `An interesting and in-depth analysis of korean culture. J.J has a more
          of a refreshing take into korean culture that isn't just kpop, chaebols, and
          kimchi. A thoughtful insight into Korean history with its language and political
          state.`,
  },
  {
    title: "I Spent 200 Hours Mastering The 4 Most FORGOTTEN Champions",
    url: "https://www.youtube.com/watch?v=wt7GZEoEvDY",
    img: "/images/media/yt3.webp",
    description: `I revisited this video by Hoompty on a whim. Actually fun and unique
          combos for some neglected champions. The ryze one is so sick.`,
  },
  {
    title: "Tina Fey Monologue | SNL UK",
    url: "https://www.youtube.com/watch?v=712AlPYYDNE",
    img: "/images/media/yt4.jpg",
    description: `The first monologue for SNL UK. Actually quite funny, I think I have
          a hopeful and optimistic view because it will be embarrassing if the UK version
          does badly.`,
  },
  {
    title: "first sunny day of the year",
    url: "https://www.youtube.com/watch?v=1GnpFCaxJSA",
    img: "/images/media/yt6.jpg",
    description: `Bit of a strange one. There is a quintessential british vibe here that
          is hard to show without experiencing it.`,
  },
  {
    title: "The 2026 Oscars (Review)",
    url: "https://www.youtube.com/watch?v=zmXf8vqXXMw",
    img: "/images/media/yt5.jpg",
    description: `I think these were pretty good overall. Although the video puts it well in
          saying that the Oscars are by no means the most accurate gauge for good movies. It's 
          made by a specific group of people all from Hollywood which obviously means theres is
          a clear priority on rewarding certain themes and aspects. All in all not bad at all :)`,
  },
];

const Sites = [
  {
    title: "Physically based rendering from first principles",
    author: "Imad Rahmoune",
    url: "https://imadrahmoune.com/pbr/",
    description: `This is quite an incredible blog post, I really appreciate how in-depth it is
          and its interactivity. This is the quality I want my blog posts to have. I am also
          inspired by Imad's website in general and how clean it looks.`,
  },
];

const musiclist = [
  {
    title: "Earth, Wind & Fire",
    url: "https://open.spotify.com/artist/4QQgXkCYTt3BlENzhyNETg?si=inPwLDufRYueQxZosEiRRw",
    img: "/images/media/spotify1.jpg",
    description: `Boogie Wonderland, Let's Groove... this band has that magical touch. There is
          something so uplifting and fun with their songs.`,
  },
  {
    title: "Marty Supreme soundtrack",
    url: "https://open.spotify.com/album/4ACAVXXQYUTmlZgdg0aG8U?si=Wp-JwYWaQZ2hvBkkRhjWAA",
    img: "/images/media/spotify2.jpg",
    description: `The Call, The Humbling, Holocaust Honey, The Scape, The Real Game, I Love you
          Tokyo, Endo's Game, and Motherstone are my picks for this brilliant soundtrack. OPN
          is at the top of his game.`,
  },
  {
    title: "Enjoy the Silence",
    url: "https://open.spotify.com/track/6WK9dVrRABMkUXFLNlgWFh?si=806229d8b2224eaa",
    img: "/images/media/spotify3.jpg",
    description: `Just the single song for now before I listen to the rest of the discography
          of Depeche Mode. Super fun and a great song.`,
  },
];

const movielist = [
  {
    title: "Tsukiji Wonderland",
    img: "/images/media/movie1.png",
    description: `Watched this on Mother's day. What started as a wholesome look into the daily
          lives of seafood wholesalers turned into highlighting the importance of teaching the
          younger generation about this craft, taking an unexpected emotional twist. I do think
          this was a documentary that was slightly longer than necessary but it was a great one
          nonetheless`,
  },
  {
    title: "HyperNormalisation",
    img: "/images/media/movie2.jpg",
    description: `An incredibly eye-opening and incredibly long documentary. An editing style that
          felt like it had a personality. Honestly not sure what kind of take aways you can have with
          this film aside from how polarising and unempathetic society has become. The woman at the end
          tearing up at how Britain has changed was the most striking part. It was just the raw level
          of disappointment and loss of innocence that can cause such an upsetting response.`,
  },
];

const showlist = [
  {
    title: "Jujutsu Kaisen S3",
    img: "/images/media/show1.webp",
    description: `Having just finished the last episode (12), I am on a high as that was a bloody
          great episode. I always wondered how they would manage to animate some of the trickier
          cursed techniques such as Uro's sky warping abilities. Instead it was one of the
          highlights of the episode, showcasing unique combat skills and keeping the battlefield dynamics.
          Yuta felt very strong in this episode, copying techniques and constantly healing himself made
          it look like he didn't drop a sweat. I adore the fluidity and sharpness of the animation, the
          cg was utilised fantastically as well. Overall the season was strong, the direction went so
          incredibly hard. I felt this season had a stylistic edge that the other seasons didn't, whether
          it was the composition of a scene, camera angles and movements, or use of different brush effects.
          Story-wise its hard to point out if this arc has as much punch and impact as previous ones, I of
          course have read ahead and already know the direction the story takes so it's all about enjoying
          the ride till then.`,
  },
];
