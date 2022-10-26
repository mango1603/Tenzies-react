import Dice from "./Dice";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Tracker from "./Tracker";

export default function Game() {
  const [dices, setDices] = React.useState(getDices());
  const [tenzies, setTenzies] = React.useState(false);
  const [finishTime, setFinishTime] = React.useState(0);
  const [moveCount, setMoveCount] = React.useState(0);
  const [winHistory, setWinHistory] = React.useState<
    { id: string; finishTime: number; moveCount: number }[]
  >([]);

  React.useEffect(() => {
    setTenzies(checkCondition());
  }, [dices]);

  React.useEffect(() => {
    if (tenzies) {
      setWinHistory((prevWinHistory) => {
        prevWinHistory.push({
          id: nanoid(),
          finishTime: finishTime,
          moveCount: moveCount,
        });
        return prevWinHistory;
      });

      localStorage.setItem("winHistory", JSON.stringify(winHistory));

      console.log(getWinHistory());
    }
  }, [tenzies]);

  function getWinHistory() {
    const strStorage = localStorage.getItem("winHistory");

    if (strStorage) {
      return JSON.parse(strStorage);
    } else {
      return null;
    }
  }

  function updateFinishTime(timeCount: number) {
    setFinishTime(timeCount);
  }

  function checkCondition() {
    const isAllHeld = dices.every((dice) => dice.isHeld);
    const isAllEqual = dices.every((dice) => dice.value === dices[0].value);
    return isAllEqual && isAllHeld;
  }

  function generateNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function getDices() {
    const diceArr = [];

    for (let i = 0; i < 10; i++) {
      diceArr.push(generateNewDice());
    }

    return diceArr;
  }

  function reroll() {
    setDices((prevDice) => {
      return prevDice.map((dice) => {
        return dice.isHeld ? dice : generateNewDice();
      });
    });
  }

  function newGame() {
    setDices(getDices());

    setFinishTime(0);
    setMoveCount(0);
  }

  function holdDice(id: string) {
    setDices((prevDices) => {
      return prevDices.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : { ...dice };
      });
    });

    setMoveCount((prevMoveCount) => {
      return prevMoveCount + 1;
    });
  }

  const diceElement = dices.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <div className='game-screen'>
      <div className='introduction'>
        <h1 className='title-text'>Tenzies</h1>
        <h2 className='description-text'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls
        </h2>
      </div>
      <Tracker
        tenzies={tenzies}
        updateFinishTime={() => updateFinishTime}
      />
      <div className='move-count'>{moveCount}</div>
      <div className='game-play'>
        <div className='dices'>{diceElement}</div>
        <button
          onClick={tenzies ? newGame : reroll}
          className='button'
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
      {tenzies && <Confetti />}
    </div>
  );
}
