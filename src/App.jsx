import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const buttonRef = React.useRef(null);

  var gameWon = false;

  if (
    dice.every((die) => die.isHeld) &&
    dice.every((die) => dice[0].value === die.value)
  ) {
    console.log("Game Won");
    gameWon = true;
  }

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function hold(tabId) {
    const new_array = dice.map((ele) => {
      if (ele.id === tabId) {
        return { ...ele, isHeld: !ele.isHeld }; // yahan return kara aur toggle bhi correct
      } else {
        return ele; // baaki values as it is
      }
    });
    setDice(new_array); // ab new array set ho raha hai properly
  }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      const newArray = dice.map((ele) => {
        if (ele.isHeld === true) {
          return ele;
        } else {
          return { ...ele, value: Math.ceil(Math.random() * 6) };
        }
      });
      setDice(newArray);
    } else {
      setDice(generateAllNewDice());
    }
  }

  let diceElements = dice.map((dieObj) => (
    <Die
      id={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      onButtonClick={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti numberOfPieces={350} recycle={false} />}
      <div aria-live="polite">
        {gameWon && (
          <p className="sr-only">
            Congratulations you won ! Press "New Game" to start new game.
          </p>
        )}
      </div>
      <div className="title">Tenzies</div>
      <div className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </div>
      <div className="grid-container">{diceElements}</div>
      <button ref={buttonRef} onClick={rollDice} className="roll-button">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
