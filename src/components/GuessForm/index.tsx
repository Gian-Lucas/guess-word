import { useGame } from "../../contexts/game";
import styles from "./styles.module.scss";

export function GuessForm() {
  const { guess, updateGuess, word, handleGuessWord } = useGame();

  return (
    <div className={styles.form}>
      <input
        maxLength={word.length}
        value={guess}
        onChange={(e) => updateGuess(e.target.value.trim())}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleGuessWord();
          }
        }}
        placeholder="Digite aqui.."
      />
    </div>
  );
}
