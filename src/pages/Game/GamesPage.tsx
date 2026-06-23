import { useState } from "react";
import "./game.css";

const CONTENTS = [
  [
    "Practice Round ish",
    `Work together and find the missing word!\n\n Last team has to drink. First team gets to choose another team to drink`,
    "/images/gamenight/wordle.png",
    "https://www.nytimes.com/games/wordle/index.html",
  ],
  [
    "Round One",
    "1 person creates a geoguessr account and then play the 'dumb test' map.\n\n worst score drinks, best score chooses another team to drink",
    "/images/gamenight/geoguessr.jpg",
    "https://www.geoguessr.com/maps/57357d9f77abe957e8cfd15f",
  ],
  [
    "Round Two",
    "Go around the house and take the same photo\n\n bring back the photo copy to me for the next photo",
    "",
    "",
  ],
  [
    "Round Three",
    "guess the movie from the frame, if the team doesn't get it, pick a random from the archive to try again.\n drink if you don't get it",
    "/images/gamenight/framed.png",
    "https://framed.wtf/",
  ],
  [
    "Round Four",
    "\n\n\n Race to find this object in the house. Teams that didn't get it have to DRINK",
    "/images/gamenight/podgy.jpeg",
    "",
  ],
  [
    "Round Five",
    "Pick from geoguesser, framed, or mapguesser. \n\n just drink pls",
    "/images/gamenight/pickgame.png",
    "https://www.mapguesser.com/",
  ],
  [
    "Round Six",
    "Spelling bee! As a team, choose a word, definition, and example and write down. \n\n each team picks a random word from among ALL teams. Wrong = pushup + drink",
    "/images/gamenight/spellingbee.png",
    "",
  ],
  [
    "Round Seven",
    "Blind, Deaf, and Mute challenge: \n\n blind person draws image \n mute person sees prompt and gestures \n deaf person describes image to blind artist. \n \n ",
    "/images/gamenight/bdm.jpg",
    "",
  ],
  [
    "Round Eight: BLINDFOLD ROUND",
    "\n each team will nominate for a player for a blindfold round. \n\n first blindfold round is for guessing the correct snack/sweet",
    "/images/gamenight/blindfold.png",
    "",
  ],
  [
    "Round Nine: BLINDFOLD ROUND",
    "\n \n next blindfold round is getting the correct drink (diet coke, coke, coke zero, pepsi)",
    "/images/gamenight/blindfold.png",
    "",
  ],
  [
    "Round Ten: BLINDFOLD ROUND",
    "\n \n last blindfold round: one player must make it to the other side of the house while on facetime with teammates",
    "/images/gamenight/blindfold.png",
    "",
  ],
  [
    "Round Twelve: last round",
    "big house = hide and seek \n but this time the seekers are BLINDFOLDED and armed with pillows \n \n each team gets a chance to seek. seekers can take blindfold off for a sec but can't hit. get hit = out",
    "/images/gamenight/hidenseek.jpg",
    "",
  ],
];

export default function GamePage() {
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(CONTENTS.length).fill(false),
  );

  const handleReveal = (i: number) => {
    setRevealed((prev) => {
      if (i > 0 && !prev[i - 1]) return prev;
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div>
      <h1 className="header">GameNight</h1>

      <div className="flex-container">
        <div>
          <p>GLHF</p>
        </div>
        {CONTENTS.map((text, i) => {
          const isRevealed = revealed[i];
          const locked = i > 0 && !revealed[i - 1];
          return (
            <button
              key={i}
              type="button"
              className={`game-item ${isRevealed ? "revealed" : "hidden"}`}
              onClick={() => handleReveal(i)}
              disabled={locked}
              aria-pressed={isRevealed}
            >
              <div className="placeholder">{text[0]}</div>
              <div className="content">
                <div className="media">
                  <img className="image" src={text[2]} alt="" />
                </div>
                <div className="body">
                  {text[3]?.trim() && (
                    <>
                      <a href={text[3]} target="_blank" rel="noreferrer">
                        link
                      </a>
                      <br />
                      <br />
                    </>
                  )}
                  {text[1]}
                </div>
              </div>
            </button>
          );
        })}
        <br /> <br />
      </div>
    </div>
  );
}
