import { useGame } from "../../../../contexts/game";
import styles from "./styles.module.scss";

interface LetterProps {
  letter: string;
}

export function Letter({ letter }: LetterProps) {
  const { guess, updateGuess } = useGame();

  function handleClick() {
    if (guess.length === 5) return;

    updateGuess(guess + letter.toLowerCase());
  }

  return (
    <button className={styles.letter} onClick={handleClick}>
      {letter}
    </button>
  );
}
