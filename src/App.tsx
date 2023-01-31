import "./global.scss";
import styles from "./App.module.scss";
import { Keyboard } from "./components/Keyboard";
import { Attempts } from "./components/Attempts";
import { GuessForm } from "./components/GuessForm";
import { useGame } from "./contexts/game";
import { ResetButton } from "./components/ResetButton";

export function App() {
  const { winner, currentChance, playerChances, word } = useGame();

  return (
    <div className={styles.container}>
      <h1>
        {currentChance === playerChances
          ? `A palavra era "${word}"`
          : "Adivinhe a palavra"}
      </h1>
      <Attempts />

      {winner || currentChance === playerChances ? (
        <ResetButton />
      ) : (
        <GuessForm />
      )}

      <Keyboard />
    </div>
  );
}
