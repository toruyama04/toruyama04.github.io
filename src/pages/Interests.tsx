import { Link } from "react-router-dom";
import "./HomePage.css";

export default function InterestsPage() {
  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="header">Interests</h1>
      </Link>

      <div className="contents">
        <p>updated 25/03/26</p>
        <h3 className="sub-header">Topics</h3>
        <ul>
          <li>Computational Fluid Dynamics</li>
          <li>High Performance Computing</li>
          <li>Hardware - GPU</li>
          <li>Graphics Programming</li>
        </ul>

        <h3 className="sub-header">Hobbies</h3>
        <ul>
          <li>Tennis</li>
          <li>Philosophy</li>
          <li>Games</li>
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

        <h3 className="sub-header">Media</h3>
        <ul>
          <li>Anime</li>
          <ul>
            <li>Mob Psycho 100💎</li>
            <li>Neon Genesis Evangelion</li>
            <li>Attack on Titan💎</li>
            <li>Gintama</li>
            <li>Vinland Saga</li>
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
          <li>USA</li>
          <li>Hong Kong</li>
          <li>South Korea</li>
        </ul>

        <h3 className="sub-header">Recent Books</h3>
        <ul>
          <li>(In progress) Before the coffee gets cold</li>
          <li>(In progress) Crime and Punishment</li>
          <li>The Brothers Karamazov</li>
          <li>Lessons in Stoicism</li>
          <li>Brave New World</li>
          <li>The Sirens of Titan</li>
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
  {
    label: "Naoki Honjo",
    url: "https://napgallery.jp/en/artists/naoki-honjo/",
  },
  { label: "Easing Functions", url: "https://easings.net/" },
  { label: "Free Media", url: "https://fmhy.pages.dev/" },
  { label: "Pokedex", url: "https://rotomlabs.net/dex" },
  { label: "Disassembler", url: "https://disasm.pro/" },
  {
    label: "Free Programming Books",
    url: "https://ebookfoundation.github.io/free-programming-books-search/",
  },
  { label: "Fabien Sanglard - blog", url: "https://fabiensanglard.net/" },
  { label: "Bartosz Ciechanowski - blog", url: "https://ciechanow.ski/" },
];
