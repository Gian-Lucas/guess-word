import { useGame } from "../../../../contexts/game";
import styles from "./styles.module.scss";

export function OkButton() {
  const { handleGuessWord } = useGame();

  return (
    <button onClick={handleGuessWord} className={styles.okButton}>
      enter
    </button>
  );
}
