import { useState } from "react";
import "./game.css";

const CONTENTS = [
  [
    "Practice Round",
    `Work together and find the missing word!\n\n Last team has to drink. First team gets to choose another team to drink`,
    "/images/gamenight/wordle.png",
  ],
  ["Practice Round", "conteeeeeeeeeeeeeents"],
  ["Practice Round", "conteeeeeeeeeeeeeents"],
];

export default function GamePage() {
  // tracks revealed items, start with false
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(CONTENTS.length).fill(false),
  );

  const handleReveal = (i: number) => {
    setRevealed((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div>
      <h1 className="header">GameNight</h1>

      <div className="flex-container">
        {CONTENTS.map((text, i) => {
          const isRevealed = revealed[i];
          return (
            <button
              key={i}
              type="button"
              className={`game-item ${isRevealed ? "revealed" : "hidden"}`}
              onClick={() => handleReveal(i)}
              aria-pressed={isRevealed}
            >
              <div className="placeholder">{text[0]}</div>
              <div className="content">
                <div className="media">
                  <img className="image" src={text[2]} alt="" />
                </div>
                <div className="body">
                  <a href="https://www.nytimes.com/games/wordle/index.html">
                    link
                  </a>
                  <br />
                  <br />
                  {text[1]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
