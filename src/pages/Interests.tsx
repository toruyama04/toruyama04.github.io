import { Link } from "react-router-dom";
import "./HomePage.css";

export default function InterestsPage() {
  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Interests</h1>
      </Link>

      <div className="contents">
        <p>updated 18/10/25</p>
        <h3 className="sub-header">Topics</h3>
        <ul>
          <li>Fluid Simulation</li>
          <li>HPC with GPU</li>
        </ul>

        <h3 className="sub-header">Hobbies</h3>
        <ul>
          <li>Tennis</li>
          <li>Games</li>
          <ul>
            <li>League of Legends</li>
            <li>Overwatch</li>
            <li>Pokemon</li>
            <li>Cyberpunk 2077</li>
            <li>Cities: Skylines</li>
            <li>Town of Salem</li>
          </ul>
        </ul>

        <h3 className="sub-header">Cool Sites</h3>
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="sub-header">Recent Books</h3>
        <ul>
          <li>(in-progress) The Brothers Karamazov</li>
          <li>Ametora</li>
          <li>City of Darkness</li>
          <li>The Art and Soul of Dune</li>
          <li>A little life</li>
          <li>Lessons in Stoicism</li>
          <li>Brave New World</li>
          <li>The Sirens of Titan</li>
          <li>The Picture of Dorian Gray</li>
        </ul>

        <h3 className="sub-header">Media</h3>
        <ul>
          <li>Anime</li>
          <ul>
            <li>Mob Psycho 100💎</li>
            <li>Neon Genesis Evangelion</li>
            <li>Attack on Titan</li>
            <li>Jujutsu Kaisen</li>
            <li>Gintama</li>
            <li>Skip and Loafer</li>
            <li>Food Wars</li>
          </ul>
          <li>Film</li>
          <ul>
            <li>Dune</li>
            <li>Mind Game</li>
            <li>Soul</li>
          </ul>
          <li>Show</li>
          <ul>
            <li>Community</li>
            <li>The Good Place</li>
            <li>Severance</li>
          </ul>
        </ul>

        <h3 className="sub-header">Countries</h3>
        <ul>
          <li>Japan💎</li>
          <li>United Kingdom📍</li>
          <li>Denmark</li>
          <li>Norway</li>
          <li>Sweden</li>
          <li>Belgium</li>
          <li>Croatia</li>
          <li>France</li>
          <li>Germany</li>
          <li>Greece</li>
          <li>Italy</li>
          <li>Netherlands</li>
          <li>Spain</li>
          <li>United States of America</li>
        </ul>

        <h3 className="sub-header">Quotes</h3>
        <ul>
          <li>
            I would rather have questions that can't be answered than answers
            that can't be questioned - Richard Feynman
          </li>
          <p></p>
        </ul>
      </div>
    </>
  );
}

const links = [
  {
    label: "Astronomy Picture of the Day Archive",
    url: "https://apod.nasa.gov/apod/archivepix.html",
  },
  { label: "Film Scripts", url: "https://www.simplyscripts.com/" },
  { label: "Easing Functions", url: "https://easings.net/" },
  { label: "Free Media", url: "https://fmhy.pages.dev/" },
  { label: "Pokedex", url: "https://rotomlabs.net/dex" },
  { label: "PCards", url: "https://pokemoncard.io/card-database/" },
  { label: "Disassembler", url: "https://disasm.pro/" },
  {
    label: "Free Programming Books",
    url: "https://ebookfoundation.github.io/free-programming-books-search/",
  },
  {
    label: "Maxime Heckel - blog",
    url: "https://blog.maximeheckel.com/#articles",
  },
  {
    label: "Real-Time Rendering - blog",
    url: "https://www.realtimerendering.com/blog/",
  },
  { label: "Fabien Sanglard - blog", url: "https://fabiensanglard.net/" },
  { label: "Rama Karl Hoetzlein - blog", url: "https://ramakarl.com/" },
  { label: "Bartosz Ciechanowski - blog", url: "https://ciechanow.ski/" },
  { label: "Sakuga Archive", url: "https://www.sakugabooru.com/" },
];
