import { useGame } from "../../../../contexts/game";
import styles from "./styles.module.scss";

export function DelButton() {
  const { guess, updateGuess } = useGame();

  function handleClick() {
    updateGuess(guess.substring(0, guess.length - 1));
  }

  return (
    <button onClick={handleClick} className={styles.delButton}>
      del
    </button>
  );
}
