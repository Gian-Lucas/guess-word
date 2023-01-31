import { useGame } from "../../contexts/game";
import styles from "./styles.module.scss";

export function ResetButton() {
  const { reset } = useGame();

  return (
    <button className={styles.resetButton} onClick={reset}>
      Jogar novamente
    </button>
  );
}
