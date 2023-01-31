import { useGame } from "../../contexts/game";
import { Line } from "./Line";
import styles from "./styles.module.scss";

export function Attempts() {
  const { attempts } = useGame();

  return (
    <div className={styles.attempts}>
      {attempts.map((attempt, chanceIndex) => {
        return (
          <Line
            key={chanceIndex}
            lineIndex={chanceIndex}
            tried={attempt.tried}
            letters={attempt.letters}
          />
        );
      })}
    </div>
  );
}
